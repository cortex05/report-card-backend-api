import { db } from "../../db";
import { billRepository } from "../../repositories/billRepository";
import { politicianRepository } from "../../repositories/politicianRepository";
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

  const totalPage = Math.ceil(sponsorsResponse.total / limit);
  
  return {
    data: sponsorsResponse.sponsorships,
    pagination: {
      page,
      limit,
      total: sponsorsResponse.total,
      totalPage
    }
  }
}

export const politicianReadService = {
  getSamplePolitician,
  getPoliticianById,
  getPoliticianBillSponorships
};