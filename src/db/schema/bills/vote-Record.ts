import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { votes } from "./votes";
import { politicians } from "../politicians/politicians";
import { relations } from "drizzle-orm/relations";
import { InferInsertModel } from "drizzle-orm";
import { voteValueEnum } from "../enums";

export const voteRecords = pgTable("vote_records", {
  id: uuid("id").primaryKey().defaultRandom(),

  voteId: uuid("vote_id").notNull().references(() => votes.id),

  politicianId: uuid("politician_id").notNull().references(() => politicians.id),

  vote: voteValueEnum("vote").notNull(),
},
  (table) => ({
    voteRecordUnique: unique("vote_record_unique").on(
      table.voteId,
      table.politicianId
    )
  })
);

export const voteRecordRelations = relations(voteRecords, ({ one }) => ({
  vote: one(votes, {
    fields: [voteRecords.voteId],
    references: [votes.id],
  }),
  politician: one(politicians, {
    fields: [voteRecords.politicianId],
    references: [politicians.id],
  }),
}));

export type VoteRecordInsert = InferInsertModel<typeof voteRecords>;
