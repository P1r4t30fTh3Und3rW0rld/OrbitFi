import Database from "@tauri-apps/plugin-sql";

let dbInstance: Database | null = null;

export async function getDb() {
    if (!dbInstance) {
        dbInstance = await Database.load("sqlite:orbitfi.db");
    }

    return dbInstance;
}