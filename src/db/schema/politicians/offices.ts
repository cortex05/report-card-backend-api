import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const offices = pgTable("offices", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 100 }).notNull(),

  level: varchar("level", { length: 50 }).notNull(),

  branch: varchar("branch", { length: 50 }).notNull(),

  chamber: varchar("chamber", { length: 50 }).notNull(),
});