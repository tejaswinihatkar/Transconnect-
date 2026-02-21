import { Router } from "express";
import {
  getMessages,
  sendMessage,
  deleteMessage,
} from "../controllers/messageController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, getMessages);
router.post("/", authenticateToken, sendMessage);
router.delete("/:id", authenticateToken, deleteMessage);

export default router;
