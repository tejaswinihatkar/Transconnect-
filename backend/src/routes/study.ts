import { Router } from "express";
import { getStudyResources } from "../controllers/studyController";

const router = Router();

router.post("/study-resources", getStudyResources);

export default router;
