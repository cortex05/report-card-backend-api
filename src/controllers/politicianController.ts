import { Request, Response } from "express";
import { politicianReadService } from "../services/clientside/politicianReadService";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const getSamplePolitician = async (_req: Request, res: Response) => {
  const politician = await politicianReadService.getSamplePolitician();

  if (!politician) {
    return res.status(404).json({
      message: "Sample politician not found",
    });
  }

  return res.status(200).json(politician);
};

const getPoliticianById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !UUID_PATTERN.test(id)) {
    return res.status(400).json({
      message: "Invalid politician id",
    });
  }

  const politician = await politicianReadService.getPoliticianById(id);

  if (!politician) {
    return res.status(404).json({
      message: "Politician not found",
    });
  }

  return res.status(200).json(politician);
};

const getPoliticianBillsSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !UUID_PATTERN.test(id)) {
    return res.status(400).json({
      message: "Invalid politician id",
    });
  }

  const sponsorShips = await politicianReadService.getPoliticianBillSponorships(id);

  if (!sponsorShips) {
    return res.status(404).json({
      message: "No bill sponsorships found for this politician",
    });
  }

  return res.status(200).json(sponsorShips);
};

export const politicianController = {
  getSamplePolitician,
  getPoliticianById,
  getPoliticianBillsSponsor
};