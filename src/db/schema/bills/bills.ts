import { pgTable, uuid, varchar, integer, text, date, timestamp, index, unique } from "drizzle-orm/pg-core";
import { InferInsertModel } from "drizzle-orm";

export const bills = pgTable(
  "bills",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    congress: integer("congress").notNull(),

    billType: varchar("bill_type", { length: 10 }).notNull(),

    billNumber: integer("bill_number").notNull(),

    title: text("title").notNull(),

    introducedDate: date("introduced_date"),

    status: varchar("status", { length: 100 }),

    originChamber: varchar("origin_chamber", { length: 50 }),

    sourceId: varchar("source_id", { length: 100 }),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    billUnique: unique("bill_unique").on(
      table.congress,
      table.billType,
      table.billNumber
    ),
    titleIdx: index("bills_title_idx").on(table.title),
  })
);

export type BillInsert = InferInsertModel<typeof bills>;
