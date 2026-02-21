import { Response } from "express";
import { supabaseAdmin } from "../supabase";
import { AuthRequest } from "../middleware/auth";

export const getMessages = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required." });
      return;
    }

    const { mentorId } = req.query;

    let queryBuilder = supabaseAdmin
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (typeof mentorId === "string" && mentorId.trim()) {
      queryBuilder = queryBuilder.eq("mentor_id", mentorId);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data || []);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch messages.";
    res.status(500).json({ error: message });
  }
};

export const sendMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required." });
      return;
    }

    const { text, mentorId } = req.body;

    if (!text || !text.trim()) {
      res.status(400).json({ error: "Message text is required." });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("messages")
      .insert({
        sender_id: req.user.id,
        text: text.trim(),
        mentor_id: mentorId || null,
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(201).json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to send message.";
    res.status(500).json({ error: message });
  }
};

export const deleteMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required." });
      return;
    }

    const { id } = req.params;

    // Only allow deleting own messages
    const { data: message } = await supabaseAdmin
      .from("messages")
      .select("sender_id")
      .eq("id", id)
      .single();

    if (!message || message.sender_id !== req.user.id) {
      res
        .status(403)
        .json({ error: "You can only delete your own messages." });
      return;
    }

    const { error } = await supabaseAdmin
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete message.";
    res.status(500).json({ error: message });
  }
};
