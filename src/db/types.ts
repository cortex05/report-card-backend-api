import { db } from "./index";
import type { PgTransaction } from "drizzle-orm/pg-core";

export type Database = typeof db | PgTransaction<any, any, any>;