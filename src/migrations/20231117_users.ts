import { Db } from "mongodb";

export const up = async (db: Db) => {
    await db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "email"],
                properties: {
                    name: { bsonType: "string" },
                    email: { bsonType: "string", pattern: "^.+@.+$" },
                    age: { bsonType: "int", minimum: 18 }
                }
            }
        }
    });
    console.log("✅ Collection 'users' created");
};

export const down = async (db: Db) => {
    await db.collection("users").drop();
    console.log("✅ Collection 'users' dropped");
};
