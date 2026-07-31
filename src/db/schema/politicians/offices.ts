import { pgTable, uuid, varchar, timestamp, unique } from "drizzle-orm/pg-core";
import { InferInsertModel } from "drizzle-orm";

export const offices = pgTable("offices", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 100 }).notNull(),

  level: varchar("level", { length: 50 }).notNull(),

  branch: varchar("branch", { length: 50 }).notNull(),

  chamber: varchar("chamber", { length: 50 }),
},
  (table) => ({
    officeUnique: unique("office_unique").on(
      table.name,
      table.level,
      table.branch,
      table.chamber
    ),
  }));

export type OfficeInsert = InferInsertModel<typeof offices>;