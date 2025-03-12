import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";

export const roleResolvers = {
  Query: {
    users: async (_: any, { page = 1, limit = 10, sort = "name" }: any) => {
      const db = getDB();
      const skip = (page - 1) * limit;
      return await db.collection("users")
        .find()
        .sort({ [sort]: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();
    },
    user: async (_: any, { id }: { id: string }) => {
      const db = getDB();
      return await db.collection("users").findOne({ _id: new ObjectId(id) });
    },
  },
  Mutation: {
    createUser: async (_: any, { name, email }: { name: string; email: string }) => {
      const db = getDB();
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) throw new Error("Email already exists");

      const result = await db.collection("users").insertOne({ name, email, roles: [] });
      return { _id: result.insertedId, name, email, roles: [] };
    },
    updateUser: async (_: any, { id, name, email }: any) => {
      const db = getDB();
      const updateFields: any = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;

      const result = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: "after" }
      );

      if (!result) throw new Error("User not found");
      return result.value;
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      const db = getDB();
      const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    },
  },
};
