import { Router } from "express";
import { politicianController } from "../controllers/politicianController";

const router = Router();

// sample page
router.get("/sample", politicianController.getSamplePolitician);

// POLITICIAN PAGE
router.get("/:id", politicianController.getPoliticianById);
router.get("/:id/bills", politicianController.getPoliticianBillsSponsor);
router.get("/:id/offices", politicianController.getOnePoliticianOffices)

// GET /politicians/:id/offices
// GET /politicians/:id/votes

export default router;