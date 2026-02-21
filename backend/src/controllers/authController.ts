import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { supabase, supabaseAdmin } from "../supabase";
import { AuthRequest } from "../middleware/auth";

function generateToken(payload: {
  id: string;
  email: string;
  role: string;
}): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
      chosenName,
      pronouns,
      identities,
      role = "user",
      lookingFor,
      city,
      languages,
      topics,
      bio,
    } = req.body;

    if (!email || !password || !chosenName) {
      res
        .status(400)
        .json({ error: "Email, password, and chosen name are required." });
      return;
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { chosen_name: chosenName, pronouns, identities, role },
      },
    });

    if (authError) {
      res.status(400).json({ error: authError.message });
      return;
    }

    if (!authData.user) {
      res.status(500).json({ error: "User creation failed." });
      return;
    }

    // Create profile (using admin client to bypass RLS)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: authData.user.id,
        email,
        chosen_name: chosenName,
        pronouns,
        identities: identities || [],
        looking_for: role === "user" ? lookingFor || [] : [],
        role,
      });

    if (profileError) {
      console.error("Profile creation failed:", profileError.message);
    }

    // If mentor, create mentors table entry
    if (role === "mentor") {
      const initials = chosenName
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const gradients = [
        { from: "#f472b6", to: "#7c3aed" },
        { from: "#7c3aed", to: "#38bdf8" },
        { from: "#38bdf8", to: "#f472b6" },
      ];
      const gradient = gradients[Math.floor(Math.random() * gradients.length)];

      const parsedLanguages = Array.isArray(languages)
        ? languages
        : typeof languages === "string"
          ? languages
              .split(",")
              .map((l: string) => l.trim())
              .filter(Boolean)
          : [];

      await supabaseAdmin.from("mentors").insert({
        name: chosenName,
        pronouns,
        city: city || "",
        languages: parsedLanguages,
        topics: topics || [],
        bio: bio || "",
        initials,
        gradientFrom: gradient.from,
        gradientTo: gradient.to,
        verified: false,
        is_verified: false,
      });
    }

    const token = generateToken({
      id: authData.user.id,
      email,
      role,
    });

    res.status(201).json({
      token,
      user: {
        id: authData.user.id,
        email,
        chosen_name: chosenName,
        pronouns,
        role,
      },
      requiresEmailConfirmation: !authData.session,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Signup failed.";
    res.status(500).json({ error: message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        res.status(403).json({
          error:
            "Email not confirmed. Please check your inbox for the confirmation link.",
        });
        return;
      }
      res.status(401).json({ error: error.message });
      return;
    }

    // Fetch profile to get role
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    const role = profile?.role || data.user.user_metadata?.role || "user";

    const token = generateToken({
      id: data.user.id,
      email: data.user.email!,
      role,
    });

    res.json({
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        chosen_name: profile?.chosen_name || data.user.user_metadata?.chosen_name,
        pronouns: profile?.pronouns,
        role,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Login failed.";
    res.status(500).json({ error: message });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required." });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", req.user.id)
      .single();

    if (error) {
      res.status(404).json({ error: "Profile not found." });
      return;
    }

    res.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch profile.";
    res.status(500).json({ error: message });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required." });
      return;
    }

    const { chosen_name, pronouns, identities, looking_for } = req.body;

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ chosen_name, pronouns, identities, looking_for })
      .eq("id", req.user.id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile.";
    res.status(500).json({ error: message });
  }
};
