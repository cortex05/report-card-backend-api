import { db } from "../../db";
import { billRepository } from "../../repositories/billRepository";
import { politicianOfficeRepository } from "../../repositories/politicianOfficeRepository";
import { politicianRepository } from "../../repositories/politicianRepository";
import { voteRecordRepository } from "../../repositories/voteRecordRepository";
import dotenv from "dotenv";

dotenv.config();

const SAMPLE_ID = process.env.SAMPLE_POLITICIAN_ID;

if (!SAMPLE_ID) {
  throw new Error("Missing environment variable: SAMPLE_POLITICIAN_ID");
}

const getSamplePolitician = async () => {
  return politicianRepository.getById(db, SAMPLE_ID);
};

const getPoliticianById = async (id: string) => {
  return politicianRepository.getById(db, id);
};

const getPoliticianBillSponorships = async (id: string, page: number, limit: number) => {
  const sponsorsResponse = await billRepository.getPoliticianBillSponsorships(db, id, page, limit);

  const totalPages = Math.ceil(sponsorsResponse.total / limit);
  
  return {
    data: sponsorsResponse.sponsorships,
    pagination: {
      page,
      limit,
      total: sponsorsResponse.total,
      totalPages
    }
  }
}

const getOnePoliticiansOffices = async (id: string) => {
  return politicianOfficeRepository.getAllOnePoliticianOffices(db, id)
}

const getPoliticianVoteRecords = async (id: string, page: number, limit: number) => {
  const voteRecordsResponse = await voteRecordRepository.getPoliticianVoteRecords(db, id, page, limit);

  const totalPages = Math.ceil(voteRecordsResponse.total / limit);

  return {
    data: voteRecordsResponse.records,
    pagination: {
      page,
      limit,
      total: voteRecordsResponse.total,
      totalPages
    }
  }
}

export const politicianReadService = {
  getSamplePolitician,
  getPoliticianById,
  getPoliticianBillSponorships,
  getOnePoliticiansOffices,
  getPoliticianVoteRecords
};