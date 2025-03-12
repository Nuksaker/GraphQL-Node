import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

export const findAllProducts = async () => {
  const db = getDB();
  return await db.collection("products").find().toArray();
};

export const findProductById = async (id: string) => {
  const db = getDB();
  return await db.collection("products").findOne({ _id: new ObjectId(id) });
};

export const createProduct = async (name: string, price: number) => {
  const db = getDB();
  const result = await db.collection("products").insertOne({ name, price });
  return { id: result.insertedId, name, price };
};
