import { Db } from "mongodb";

export const up = async (db: Db) => {
    await db.createCollection("products", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price"],
                properties: {
                    name: { bsonType: "string" },
                    price: { bsonType: "double", minimum: 0 }
                }
            }
        }
    });
    console.log("✅ Collection 'products' created");
};

export const down = async (db: Db) => {
    await db.collection("products").drop();
    console.log("✅ Collection 'products' dropped");
};
