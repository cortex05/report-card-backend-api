import { db } from "../db";
import { voteClient } from "../clients/voteClient";
import { importBill } from "./billImportService";
import { mapHouseRollCallToVoteInsert } from "../mappers/voteMapper";
import { mapHouseRollCallMemberToVoteRecord } from "../mappers/voteRecordMapper";
import { mapHouseRollCallMemberToPolitician } from "../mappers/politicianMapper";
import { voteRepository } from "../repositories/voteRepository";
import { voteRecordRepository } from "../repositories/voteRecordRepository";
import { politicianRepository } from "../repositories/politicianRepository";

export const importHouseRollCall = async (
  congress: number,
  session: number,
  rollCallNumber: number
) => {
  const rollCallResponse = await voteClient.getHouseRollCall(congress, session, rollCallNumber);
  const membersResponse = await voteClient.getHouseRollCallMembers(congress, session, rollCallNumber);
  // console.log("MEMBERS RESPONSE: ", membersResponse);
  const rollCall = rollCallResponse.houseRollCallVote;

  // Ensure the referenced bill exists first (its own transaction, idempotent)
  // so the vote's notNull bill_id can be satisfied.
  const bill = await importBill(
    rollCall.congress,
    rollCall.legislationType.toLowerCase(),
    Number.parseInt(rollCall.legislationNumber, 10)
  );

  return db.transaction(async (tx) => {
    const voteInsert = mapHouseRollCallToVoteInsert(bill.id, rollCallResponse);

    const existingVote = await voteRepository.getByDefinition(
      tx,
      voteInsert.congress,
      voteInsert.chamber,
      voteInsert.sourceId! // always set by the mapper
    );

    const vote = existingVote
      ? await voteRepository.update(tx, existingVote.id, voteInsert)
      : await voteRepository.create(tx, voteInsert);

    for (const member of membersResponse.houseRollCallVoteMemberVotes.results) {
      const existingPolitician = await politicianRepository.getByBioguideId(tx, member.bioguideID);
      const politician = existingPolitician ?? await politicianRepository.create(
        tx,
        mapHouseRollCallMemberToPolitician(member)
      );

      const voteRecord = mapHouseRollCallMemberToVoteRecord(vote.id, politician.id, member);
      const existingRecord = await voteRecordRepository.getByDefinition(tx, vote.id, politician.id);

      if (!existingRecord) {
        await voteRecordRepository.create(tx, voteRecord);
      }
    }

    return vote;
  });
};
