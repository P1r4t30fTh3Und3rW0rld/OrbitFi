import { getDb } from "./db";

export async function runMigrations() {
	const db = await getDb();

	const stmts = [
		`CREATE TABLE IF NOT EXISTS user_settings (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			key TEXT UNIQUE NOT NULL,
			value TEXT
		);`,

		`CREATE TABLE IF NOT EXISTS accounts (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			type TEXT,
			balance REAL DEFAULT 0,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP
		);`,

		`CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			parent_id INTEGER,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY(parent_id) REFERENCES categories(id)
		);`,
	];

	for (const s of stmts) {
		try {
			// plugin-sql exposes an `execute` method on the Database instance
			// which runs a SQL statement against the SQLite file.
			// We swallow errors for idempotency (IF NOT EXISTS).
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await db.execute(s);
		} catch (e) {
			// keep going on error
			// eslint-disable-next-line no-console
			console.error("Migration error:", e);
		}
	}

	// eslint-disable-next-line no-console
	console.log("Migrations completed");
}

export default runMigrations;
