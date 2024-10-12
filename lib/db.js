
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; 
let client;
let db;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(process.env.DB_NAME); 
    }
    return { db, client };
};
