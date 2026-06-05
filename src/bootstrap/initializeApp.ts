import runMigrations from "../database/migrationRunner";

export async function initializeApp() {
	try {
		await runMigrations();
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("App initialization error:", e);
	}
}

export default initializeApp;
