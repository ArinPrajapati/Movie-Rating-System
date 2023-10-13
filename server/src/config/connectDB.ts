import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_STRING; // Update with your MongoDB connection string
const dbName = process.env.DB_NAME; // Update with your database name

export async function connectToDatabase() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    console.log("Connected to MongoDB");
    console.log(db.databaseName);
    console.log(db.admin);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToDatabase;
