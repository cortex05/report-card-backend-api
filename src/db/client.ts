import "dotenv/config";

import { Pool } from "pg";

// ONE CONNECTION
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});