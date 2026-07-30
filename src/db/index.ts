import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./client";
import * as databaseSchema from "./schema"; 

// Drizzle database connection source
export const db = drizzle(pool, { schema: databaseSchema });