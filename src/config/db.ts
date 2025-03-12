import { MongoClient, Db } from "mongodb";

const MONGO_URI = "mongodb://localhost:27017";
let client: MongoClient;
let db: Db;

export const connectDB = async () => {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db("my_database");
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("✅ MongoDB connection closed.");
  }
};
