
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

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

export const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle({ client: pool, schema });