import { date, integer, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { bills } from "./bills";
import { relations } from "drizzle-orm/relations";
import { InferInsertModel } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";

export const votes = pgTable("votes", {
  id: uuid("id").primaryKey().defaultRandom(),

  billId: uuid("bill_id").references(() => bills.id).notNull(),

  congress: integer("congress").notNull(),

  chamber: varchar("chamber", { length: 50 }).notNull(),

  voteDate: date("vote_date"),

  question: text("question"),

  result: varchar("result", { length: 50 }),

  sourceId: varchar("source_id", { length: 100 }),
},
  (table) => ({
    voteUnique: unique("vote_unique").on(
      table.congress,
      table.chamber,
      table.sourceId
    )
  })
);

export const voteRelations = relations(votes, ({ one }) => ({
  bill: one(bills, {
    fields: [votes.billId],
    references: [bills.id],
  }),
}));

export type VoteInsert = InferInsertModel<typeof votes>;
