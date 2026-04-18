const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function createDatabase(dbName) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Create a new database
        const db = client.db(dbName);

        console.log(`Database created: ${db.databaseName}`);
        // Optionally create a collection to ensure the database is created
        await db.createCollection("exampleCollection");
        console.log("Collection created in the database.");
        
    } catch (error) {
        console.error("Error creating database:", error);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

// Replace 'yourDatabaseName' with your desired database name
createDatabase('yourDatabaseName');
