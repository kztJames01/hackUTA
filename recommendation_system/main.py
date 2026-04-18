from pymongo import MongoClient
import pandas as pd
import time
import os
import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

try:
    import redis as redis_lib
except ImportError:
    redis_lib = None

# redis key for pickled (None, petsInfo_df) — TTL handles expiry
REDIS_CACHE_KEY = os.getenv("REDIS_PETS_CACHE_KEY", "recommendation:pets_info:v1")
CACHE_EXPIRY = int(os.getenv("CACHE_EXPIRY_SECONDS", str(2 * 60 * 60)))


def _get_redis_client():
    if redis_lib is None:
        return None
    url = os.getenv("REDIS_URL", "").strip()
    if url:
        return redis_lib.from_url(url, decode_responses=False)
    host = os.getenv("REDIS_HOST", "").strip()
    if not host:
        return None
    port = int(os.getenv("REDIS_PORT", "6379"))
    db = int(os.getenv("REDIS_DB", "0"))
    pw = os.getenv("REDIS_PASSWORD") or None
    return redis_lib.Redis(host=host, port=port, db=db, password=pw, decode_responses=False)


def get_pets_info_df():
    mongo_uri = os.getenv("MONGODB_URI")
    cache_file = os.getenv("CACHE_FILE", "").strip()

    def load_from_redis(r):
        try:
            blob = r.get(REDIS_CACHE_KEY)
            if blob:
                return pickle.loads(blob)
        except Exception as e:
            print("redis cache read failed:", e)
        return None

    def save_to_redis(r, payload):
        try:
            r.setex(REDIS_CACHE_KEY, CACHE_EXPIRY, pickle.dumps(payload))
        except Exception as e:
            print("redis cache write failed:", e)

    def load_from_file():
        if not cache_file or not os.path.exists(cache_file):
            return None
        try:
            with open(cache_file, "rb") as f:
                cache = pickle.load(f)
                if time.time() - cache["timestamp"] < CACHE_EXPIRY:
                    return cache["data"]
        except Exception as e:
            print("file cache read failed:", e)
        return None

    def save_to_file(data):
        if not cache_file:
            return
        try:
            with open(cache_file, "wb") as f:
                pickle.dump({"timestamp": time.time(), "data": data}, f)
        except Exception as e:
            print("file cache write failed:", e)

    cached_data = None
    r = _get_redis_client()
    if r is not None:
        cached_data = load_from_redis(r)

    if cached_data is None:
        cached_data = load_from_file()

    if cached_data is not None:
        _, petsInfo_df = cached_data
        return petsInfo_df

    client = MongoClient(mongo_uri)
    db = client.get_database("adopt-me")
    petsInfo_collection = db.get_collection("petsInfo")
    petsInfo_df = pd.DataFrame(list(petsInfo_collection.find()))
    payload = (None, petsInfo_df)

    if r is not None:
        save_to_redis(r, payload)
    save_to_file(payload)

    return petsInfo_df


# Random Recommendation System
def random_recommendation(petsInfo_df, num_recommendations=10):
    return (
        petsInfo_df.sample(num_recommendations)
        .assign(_id=petsInfo_df["_id"].astype(str))
        .to_dict(orient="records")
    )


app = Flask(__name__)


@app.before_request
def before_request():
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    if request.method.lower() == "options":
        return jsonify(headers), 200


@app.route("/update_recommendations", methods=["POST"])
def update_recommendations():
    data = request.get_json()
    pets = data.get("pets")
    userid = data.get("userid")

    if not pets or not userid:
        return jsonify({"error": "Invalid input"}), 400

    recommendations = collaborative_filtering_recommendation(pets, get_pets_info_df())
    return jsonify(recommendations), 200


def update_user_recommendations(userid, pets):
    mongo_uri = os.getenv("MONGODB_URI")
    client = MongoClient(mongo_uri)
    db = client.get_database("adopt-me")
    user_recommendations_collection = db.get_collection("userRecommendations")

    user_recommendations_collection.update_one(
        {"userid": userid}, {"$set": {"pets": pets}}, upsert=True
    )


@app.route("/random_recommendation", methods=["GET"])
def get_random_recommendation():
    petsInfo_df = get_pets_info_df()
    recommendations = random_recommendation(petsInfo_df)
    return jsonify(recommendations)


def collaborative_filtering_recommendation(
    liked_pets, petsInfo_df, num_recommendations=10
):

    liked_pets_ids = [pet["_id"] for pet in liked_pets]

    # Filter petsInfo_df to exclude liked pets
    liked_pets_df = petsInfo_df.loc[petsInfo_df["_id"].astype(str).isin(liked_pets_ids)]
    filtered_pets_df = petsInfo_df.loc[
        ~petsInfo_df["_id"].astype(str).isin(liked_pets_ids)
    ]

    # Combine text features for TF-IDF vectorization
    liked_pets_df["combined_features"] = liked_pets_df.apply(
        lambda row: f"{row['Breed']} {row['Color']} {row['Pet Age']} {row['Pet Size']} {row['Sex']}",
        axis=1,
    )
    filtered_pets_df["combined_features"] = filtered_pets_df.apply(
        lambda row: f"{row['Breed']} {row['Color']} {row['Pet Age']} {row['Pet Size']} {row['Sex']}",
        axis=1,
    )

    # Vectorize the combined features
    vectorizer = TfidfVectorizer()
    if liked_pets_df.empty or filtered_pets_df.empty:
        print("No data available for liked pets or filtered pets.")
        return []

    vectorizer.fit(
        pd.concat(
            [liked_pets_df["combined_features"], filtered_pets_df["combined_features"]]
        )
    )
    filtered_tfidf_matrix = vectorizer.transform(filtered_pets_df["combined_features"])
    liked_pets_tfidf_matrix = vectorizer.transform(liked_pets_df["combined_features"])

    # Ensure the TF-IDF matrices are not empty
    if liked_pets_tfidf_matrix.shape[0] == 0 or filtered_tfidf_matrix.shape[0] == 0:
        print("TF-IDF matrices are empty.")
        return []

    # Calculate cosine similarity between liked pets and all pets

    similarity_matrix = cosine_similarity(
        liked_pets_tfidf_matrix, filtered_tfidf_matrix
    )

    # Get the top recommendations
    similarity_scores = similarity_matrix.mean(axis=0)
    top_indices = similarity_scores.argsort()[-num_recommendations:][::-1]
    recommended_pets = filtered_pets_df.iloc[top_indices]

    return recommended_pets.assign(_id=recommended_pets["_id"].astype(str)).to_dict(
        orient="records"
    )


CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
