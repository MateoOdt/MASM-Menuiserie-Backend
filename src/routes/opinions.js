import { Router } from "express";
import { getOpinions, createOpinion } from "../controllers/opinionController.js";

const router = Router();

router.get("/", getOpinions);
router.post("/", createOpinion);

export default router;
