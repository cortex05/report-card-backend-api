import { Router } from "express";
import { politicianController } from "../controllers/politicianController";

const router = Router();

// sample page
router.get("/sample", politicianController.getSamplePolitician);

// POLITICIAN PAGE
router.get("/:id", politicianController.getPoliticianById);

// GET /politicians/:id/bills
// GET /politicians/:id/offices
// GET /politicians/:id/votes

export default router;