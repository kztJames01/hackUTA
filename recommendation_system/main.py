from pymongo import MongoClient
import pandas as pd
import time
import os
import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer


def get_pets_info_df():
    mongo_uri = "mongodb+srv://danjes002:eWzpIgBxbsv40s04@cluster0.avntp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    CACHE_FILE = "/home/daniel/Projects/hackUTA/recommendation_system/cache.pkl"
    CACHE_EXPIRY = 2 * 60 * 60  # 2 hours in seconds

    def load_cache():
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, "rb") as f:
                cache = pickle.load(f)
                if time.time() - cache["timestamp"] < CACHE_EXPIRY:
                    return cache["data"]
        return None

    def save_cache(data):
        with open(CACHE_FILE, "wb") as f:
            cache = {"timestamp": time.time(), "data": data}
            pickle.dump(cache, f)

    # Load data from cache if available
    cached_data = load_cache()
    if cached_data:
        _, petsInfo_df = cached_data
    else:
        client = MongoClient(mongo_uri)
        db = client.get_database("adopt-me")

        petsInfo_collection = db.get_collection("petsInfo")

        # Convert MongoDB collection to DataFrame
        petsInfo_df = pd.DataFrame(list(petsInfo_collection.find()))

        # Save data to cache
        save_cache((None, petsInfo_df))

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
    mongo_uri = "mongodb+srv://danjes002:eWzpIgBxbsv40s04@cluster0.avntp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
