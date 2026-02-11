import { defineConfig } from "drizzle-kit";

// Use a dummy URL for build process if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || "postgresql://localhost:5432/dummy";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
