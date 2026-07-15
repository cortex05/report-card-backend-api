import { pgTable, uuid, varchar, date, timestamp } from "drizzle-orm/pg-core";

export const politicians = pgTable("politicians", {
  id: uuid("id").primaryKey().defaultRandom(),

  bioguideId: varchar("bioguide_id", { length: 20 }).unique(),

  firstName: varchar("first_name", { length: 100 }).notNull(),

  lastName: varchar("last_name", { length: 100 }).notNull(),

  dateOfBirth: date("date_of_birth").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})