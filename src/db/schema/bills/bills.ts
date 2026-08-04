import { pgTable, uuid, varchar, integer, text, date, timestamp, index, unique } from "drizzle-orm/pg-core";
import { InferInsertModel } from "drizzle-orm";

export const bills = pgTable(
  "bills",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    congress: integer("congress").notNull(),

    billType: varchar("bill_type", { length: 20 }).notNull(),

    billNumber: integer("bill_number").notNull(),

    title: text("title").notNull(),

    introducedDate: date("introduced_date"),

    status: varchar("status", { length: 100 }),

    originChamber: varchar("origin_chamber", { length: 50 }),

    summary: text("summary"),

    policyArea: varchar("policy_area", { length: 100 }),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    lastSyncedAt: timestamp("last_synced_at").defaultNow(),
  },
  (table) => ({
    // sourceUnique: unique().on(table.sourceId),
    billUnique: unique("bill_unique").on(
      table.congress,
      table.billType,
      table.billNumber
    ),
  })
);

export type Bill = InferInsertModel<typeof bills>;
export type BillInsert = InferInsertModel<typeof bills>;