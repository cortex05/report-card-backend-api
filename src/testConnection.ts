import "dotenv/config";

import { sql } from "drizzle-orm";
import { db } from "./db";

async function testConnection() {
  try {
    const result = await db.execute(sql`SELECT version();`);

    console.log(result);

    process.exit(0);
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

testConnection();