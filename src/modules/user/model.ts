import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

export const findAllUsers = async () => {
  const db = getDB();
  return await db.collection("users").find().toArray();
};

export const findUserById = async (id: string) => {
  const db = getDB();
  return await db.collection("users").findOne({ _id: new ObjectId(id) }); // แปลง id เป็น ObjectId
};

export const createUser = async (name: string, email: string) => {
  const db = getDB();
  const result = await db.collection("users").insertOne({ name, email });
  return { id: result.insertedId, name, email };
};

export const updateUser = async (id: string, name: string, email: string) => {
  const db = getDB();
  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, email } }
  );
  return result.matchedCount > 0;
}

