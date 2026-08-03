import { date, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { bills } from "./bills";
import { politicians } from "../politicians/politicians";
import { relations } from "drizzle-orm/relations";
import { InferInsertModel } from "drizzle-orm";

export const billSponsors = pgTable("bill_sponsors", {
  id: uuid("id").primaryKey().defaultRandom(),

  billId: uuid("bill_id").notNull().references(() => bills.id),

  politicianId: uuid("politician_id").notNull().references(() => politicians.id),

  role: varchar("role", { length: 50 }).notNull(),

  source: varchar("source", { length: 100 }),

  dateAdded: date("date_added"),
},
  (table) => ({
    billSponsorUnique: unique("bill_sponsor_unique").on(
      table.billId,
      table.politicianId,
      table.role
    )
  })
);

export const billSponsorRelations = relations(billSponsors, ({ one }) => ({
  bill: one(bills, {
    fields: [billSponsors.billId],
    references: [bills.id],
  }),
  politician: one(politicians, {
    fields: [billSponsors.politicianId],
    references: [politicians.id],
  }),
}));

export type BillSponsorInsert = InferInsertModel<typeof billSponsors>;
