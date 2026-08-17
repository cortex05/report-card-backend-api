import { and, eq } from "drizzle-orm";
import { voteRecords, VoteRecordInsert } from "../db/schema/bills/vote-Record";
import { Database } from "../db/types";

const create = async (database: Database, voteRecord: VoteRecordInsert) => {
  const [created] = await database
    .insert(voteRecords)
    .values(voteRecord)
    .returning();
  return created;
};

const getByDefinition = async (
  database: Database,
  voteId: string,
  politicianId: string
) => {
  const [existing] = await database
    .select()
    .from(voteRecords)
    .where(
      and(
        eq(voteRecords.voteId, voteId),
        eq(voteRecords.politicianId, politicianId)
      )
    )
    .limit(1);

  return existing;
};

export const voteRecordRepository = {
  create,
  getByDefinition,
};
