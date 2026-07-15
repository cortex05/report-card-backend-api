import { pgTable, uuid } from "drizzle-orm/pg-core";
import { politicians } from "./politicians";
import { offices } from "./offices";

export const politicianOffices = pgTable("politicianOffices", {
  id: uuid("id").primaryKey().defaultRandom(),

  politicianId: uuid("politician_id").notNull().references(() => politicians.id),

  officeId: uuid("office_id").notNull().references(() => offices.id),
});