import { and, count, desc, eq } from "drizzle-orm";
import { voteRecords, VoteRecordInsert } from "../db/schema/bills/vote-Record";
import { votes } from "../db/schema/bills/votes";
import { bills } from "../db/schema/bills/bills";
import { Database } from "../db/types";

const create = async (database: Database, voteRecord: VoteRecordInsert) => {
  const [created] = await database
    .insert(voteRecords)
    .values(voteRecord)
    .returning();
  return created;
};

const update = async (
  database: Database,
  existingRecordId: string,
  voteRecord: Partial<VoteRecordInsert>
) => {
  const [updated] = await database
    .update(voteRecords)
    .set(voteRecord)
    .where(eq(voteRecords.id, existingRecordId))
    .returning();

  return updated;
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

// For frontend
const getPoliticianVoteRecords = async (
  database: Database,
  politicianId: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const [{ total }] = await database
    .select({ total: count() })
    .from(voteRecords)
    .innerJoin(
      votes,
      eq(voteRecords.voteId, votes.id)
    )
    .where(eq(voteRecords.politicianId, politicianId));

  const records = await database
    .select({
      id: voteRecords.id,
      vote: voteRecords.vote,
      voteId: votes.id,
      congress: votes.congress,
      chamber: votes.chamber,
      voteDate: votes.voteDate,
      question: votes.question,
      result: votes.result,
      billId: bills.id,
      billType: bills.billType,
      billNumber: bills.billNumber,
      billTitle: bills.title,
    })
    .from(voteRecords)
    .innerJoin(
      votes,
      eq(voteRecords.voteId, votes.id)
    )
    .innerJoin(
      bills,
      eq(votes.billId, bills.id)
    )
    .where(eq(voteRecords.politicianId, politicianId))
    .orderBy(desc(votes.voteDate), desc(voteRecords.id))
    .limit(limit)
    .offset(offset);

  return {
    records,
    total
  }
};

export const voteRecordRepository = {
  create,
  update,
  getByDefinition,
  getPoliticianVoteRecords,
};
