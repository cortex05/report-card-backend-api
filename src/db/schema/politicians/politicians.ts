import { pgTable, uuid, varchar, timestamp, index, integer, boolean } from "drizzle-orm/pg-core";
import { politicianOffices } from "./politician-Offices";
import { relations } from "drizzle-orm/relations";

export const politicians = pgTable(
  "politicians",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    bioguideId: varchar("bioguide_id", { length: 20 }).unique(),

    firstName: varchar("first_name", { length: 100 }).notNull(),

    lastName: varchar("last_name", { length: 100 }).notNull(),

    birthYear: integer("birth_year"),

    currentMember: boolean("current_member").default(false).notNull(),

    stateCode: varchar("state", { length: 2 }),

    imageUrl: varchar("image_url", { length: 255 }),

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