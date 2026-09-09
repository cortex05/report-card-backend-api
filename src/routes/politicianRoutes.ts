import { Router } from "express";
import { politicianController } from "../controllers/politicianController";

const router = Router();

router.get("/sample", politicianController.getSamplePolitician);

export default router;