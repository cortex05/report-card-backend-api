import { pgTable, uuid, varchar, date, timestamp, index } from "drizzle-orm/pg-core";
import { politicianOffices } from "./politician-Offices";
import { relations } from "drizzle-orm/relations";

export const politicians = pgTable(
  "politicians",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    bioguideId: varchar("bioguide_id", { length: 20 }).unique(),

    firstName: varchar("first_name", { length: 100 }).notNull(),

    lastName: varchar("last_name", { length: 100 }).notNull(),

    dateOfBirth: date("date_of_birth"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    lastNameIdx: index("politicians_last_name_idx").on(table.lastName),
  })
);

export const politicianRelations = relations(politicians, ({ many }) => ({
  offices: many(politicianOffices),
}));