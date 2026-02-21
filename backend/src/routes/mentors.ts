import { Router } from "express";
import {
  getAllMentors,
  getMentorById,
  searchMentors,
  getVerifiedMentors,
} from "../controllers/mentorController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, getAllMentors);
router.get("/search", authenticateToken, searchMentors);
router.get("/verified", authenticateToken, getVerifiedMentors);
router.get("/:id", authenticateToken, getMentorById);

export default router;
