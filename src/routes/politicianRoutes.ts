import { Router } from "express";
import { politicianController } from "../controllers/politicianController";

const router = Router();

// sample page
router.get("/sample", politicianController.getSamplePolitician);

// POLITICIAN PAGE
router.get("/:id", politicianController.getPoliticianById);
router.get("/:id/bills", politicianController.getPoliticianBillsSponsor);
router.get("/:id/offices", politicianController.getOnePoliticianOffices)

router.get("/:id/votes", politicianController.getPoliticianVoteRecords);

export default router;