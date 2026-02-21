import { Router } from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);

export default router;
