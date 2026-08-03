import { date, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { politicians } from "./politicians";
import { offices } from "./offices";
import { relations } from "drizzle-orm/relations";
import { InferInsertModel } from "drizzle-orm";

export const politicianOffices = pgTable("politician_offices", {
  id: uuid("id").primaryKey().defaultRandom(),

  politicianId: uuid("politician_id").notNull().references(() => politicians.id),

  officeId: uuid("office_id").notNull().references(() => offices.id),

  startDate: date("start_date").notNull(),

  endDate: date("end_date"),

  party: varchar("party", { length: 100 }),

  source: varchar("source", { length: 100 }),
  
  sourceId: varchar("source_id", { length: 100 }),
},
  (table) => ({
    polticianOfficeUnique: unique("politician_office_unique").on(
      table.politicianId,
      table.officeId,
      table.startDate
    )
  })
);

export const politicianOfficeRelations = relations(
  politicianOffices,
  ({ one }) => ({
    politician: one(politicians, {
      fields: [politicianOffices.politicianId],
      references: [politicians.id],
    }),
    office: one(offices, {
      fields: [politicianOffices.officeId],
      references: [offices.id],
    }),
  })
);

export type PoliticianOfficeInsert = InferInsertModel<typeof politicianOffices>;