export function ensureEnv() {
  /**
   * Add checks for any required environment variables.
   */

  if (!process.env.DATABASE_URL) {
    throw new Error("Environment variable DATABASE_URL is required but not provided");
  }
}