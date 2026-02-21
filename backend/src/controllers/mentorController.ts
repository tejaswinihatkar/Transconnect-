import { Request, Response } from "express";
import { supabaseAdmin } from "../supabase";

export const getAllMentors = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("mentors")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data || []);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch mentors.";
    res.status(500).json({ error: message });
  }
};

export const getMentorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("mentors")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      res.status(404).json({ error: "Mentor not found." });
      return;
    }

    res.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch mentor.";
    res.status(500).json({ error: message });
  }
};

export const searchMentors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query, topic } = req.query;

    let queryBuilder = supabaseAdmin.from("mentors").select("*");

    if (typeof query === "string" && query.trim()) {
      const search = query.trim().toLowerCase();
      queryBuilder = queryBuilder.or(
        `name.ilike.%${search}%,city.ilike.%${search}%`
      );
    }

    if (typeof topic === "string" && topic.trim()) {
      queryBuilder = queryBuilder.contains("topics", [topic.trim()]);
    }

    const { data, error } = await queryBuilder.order("name", {
      ascending: true,
    });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data || []);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Search failed.";
    res.status(500).json({ error: message });
  }
};

export const getVerifiedMentors = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("mentors")
      .select("*")
      .or("verified.eq.true,is_verified.eq.true")
      .order("name", { ascending: true });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data || []);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch verified mentors.";
    res.status(500).json({ error: message });
  }
};
