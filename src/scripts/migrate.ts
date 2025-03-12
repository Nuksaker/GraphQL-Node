import { connectDB, getDB, closeDB } from "../config/db";
import * as fs from "fs";
import * as path from "path";

const MIGRATIONS_DIR = path.join(__dirname, "../migrations");

const runMigrations = async (action: "up" | "down") => {
    try {
        await connectDB();
        const db = getDB();

        const migrationFiles = fs.readdirSync(MIGRATIONS_DIR).sort();

        for (const file of migrationFiles) {
            const migration = require(path.join(MIGRATIONS_DIR, file));
            console.log(`Running ${action} on migration: ${file}`);
            await migration[action](db);
        }

        console.log(`✅ All migrations (${action}) completed`);
    } catch (error) {
        console.error(`❌ Migration failed:`, error);
    } finally {
        await closeDB();
    }
};

const action = process.argv[2]; // รับ argument เช่น "up" หรือ "down"
if (!["up", "down"].includes(action)) {
    console.error("❌ Please specify 'up' or 'down'");
    process.exit(1);
}

runMigrations(action as "up" | "down");
