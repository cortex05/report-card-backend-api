import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./client";  

// Drizzle database connection source
export const db = drizzle(pool);