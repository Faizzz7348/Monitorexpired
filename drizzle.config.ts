import { defineConfig } from "drizzle-kit";

const env = process.env.NODE_ENV || "development";
let dbUrl = process.env.DATABASE_URL;

if (env === "production" && process.env.DATABASE_URL_PROD) {
  dbUrl = process.env.DATABASE_URL_PROD;
} else if (env === "development" && process.env.DATABASE_URL_DEV) {
  dbUrl = process.env.DATABASE_URL_DEV;
}

if (!dbUrl) {
  throw new Error("Database URL not set for the current environment");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
