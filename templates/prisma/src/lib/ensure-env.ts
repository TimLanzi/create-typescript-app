export function ensureEnv() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Environment variable DATABASE_URL is required but not provided");
  }
}