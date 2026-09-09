import { Request, Response } from "express";
import { politicianReadService } from "../services/clientside/politicianReadService";

const getSamplePolitician = async (_req: Request, res: Response) => {
  const politician = await politicianReadService.getSamplePolitician();

  if (!politician) {
    return res.status(404).json({
      message: "Sample politician not found",
    });
  }

  return res.status(200).json(politician);
};

export const politicianController = {
  getSamplePolitician,
};