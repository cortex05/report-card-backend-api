import { pgEnum } from "drizzle-orm/pg-core";

export const voteValueEnum = pgEnum("vote_value", [
  "yea",
  "nay",
  "present",
  "not_voting",
]);