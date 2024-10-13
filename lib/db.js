import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: false,
    }
});

export const connectToDatabase = async () => {
    try {
        // Ensure the client is connected
        await client.connect();
        
        // Get the database
        const db = client.db(process.env.DB_NAME);
        return { db };  // Return the db object
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Could not connect to the database');
    }
};
