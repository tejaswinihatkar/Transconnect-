import { Request, Response } from "express";

interface StudyItem {
  title: string;
  youtubeUrl: string;
  summary: string;
  duration: string;
}

const mockByCategory: Record<string, StudyItem[]> = {
  engineering: [
    {
      title: "JEE Maths: Limits and Continuity Crash Course",
      youtubeUrl: "https://www.youtube.com/results?search_query=JEE+Maths+Limits+and+Continuity",
      summary:
        "Covers core formulas, standard limit tricks, and exam-oriented problem patterns for JEE.",
      duration: "32 min",
    },
    {
      title: "Physics Mechanics for Competitive Exams",
      youtubeUrl: "https://www.youtube.com/results?search_query=JEE+Physics+Mechanics+one+shot",
      summary:
        "Conceptual revision with high-yield numericals on motion, forces, work, and energy.",
      duration: "45 min",
    },
    {
      title: "Coding Roadmap for Engineering Freshers",
      youtubeUrl: "https://www.youtube.com/results?search_query=engineering+coding+roadmap+for+beginners",
      summary:
        "Step-by-step roadmap for DSA, projects, and interview prep from first year onward.",
      duration: "28 min",
    },
  ],
  upsc: [
    {
      title: "UPSC Polity Basics (Laxmikanth Strategy)",
      youtubeUrl: "https://www.youtube.com/results?search_query=UPSC+Polity+basics+Laxmikanth",
      summary:
        "A beginner-friendly overview of the constitution and important polity chapters for prelims.",
      duration: "36 min",
    },
    {
      title: "UPSC Current Affairs: Daily Analysis Framework",
      youtubeUrl: "https://www.youtube.com/results?search_query=UPSC+current+affairs+daily+analysis",
      summary:
        "Shows how to convert daily news into mains-ready notes and short revision cards.",
      duration: "24 min",
    },
    {
      title: "UPSC Answer Writing: 10 Marker Masterclass",
      youtubeUrl: "https://www.youtube.com/results?search_query=UPSC+answer+writing+10+marker+strategy",
      summary:
        "Improves structure, intro-body-conclusion flow, and time management for mains answers.",
      duration: "30 min",
    },
  ],
  jobs: [
    {
      title: "Aptitude and Logical Reasoning for Placements",
      youtubeUrl: "https://www.youtube.com/results?search_query=placement+aptitude+logical+reasoning+prep",
      summary:
        "Quick prep on common aptitude question types asked in campus and off-campus tests.",
      duration: "40 min",
    },
    {
      title: "HR Interview Questions and Best Answers",
      youtubeUrl: "https://www.youtube.com/results?search_query=HR+interview+questions+best+answers",
      summary:
        "Practical response templates for strengths, weaknesses, and behavioral interview questions.",
      duration: "22 min",
    },
    {
      title: "Resume Building for Freshers (Job-Ready)",
      youtubeUrl: "https://www.youtube.com/results?search_query=resume+building+for+freshers",
      summary:
        "How to create ATS-friendly resumes with measurable impact and cleaner project descriptions.",
      duration: "18 min",
    },
  ],
  "trans careers": [
    {
      title: "Career Planning for LGBTQ+ Professionals",
      youtubeUrl: "https://www.youtube.com/results?search_query=LGBTQ+career+planning+India",
      summary:
        "Guidance on inclusive workplaces, networking strategies, and confidence in professional spaces.",
      duration: "27 min",
    },
    {
      title: "Building a Safe Professional Portfolio Online",
      youtubeUrl: "https://www.youtube.com/results?search_query=safe+online+portfolio+for+creators",
      summary:
        "Best practices for showcasing work while protecting privacy and personal safety.",
      duration: "19 min",
    },
    {
      title: "Scholarships and Opportunities for Trans Students",
      youtubeUrl: "https://www.youtube.com/results?search_query=transgender+student+scholarships+India",
      summary:
        "A starter list of scholarship, fellowship, and skill-building opportunities in India.",
      duration: "21 min",
    },
  ],
};

const fallback: StudyItem[] = [
  {
    title: "Focused Learning: Build a 7-Day Study Plan",
    youtubeUrl: "https://www.youtube.com/results?search_query=how+to+make+a+study+plan",
    summary:
      "A practical system to break complex goals into daily sessions and measurable outcomes.",
    duration: "20 min",
  },
];

export const getStudyResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = (req.body?.query || "").toString().toLowerCase();
    if (!query.trim()) {
      res.status(400).json({ error: "query is required" });
      return;
    }

    const matchedCategory =
      Object.keys(mockByCategory).find((category) => query.includes(category)) || "engineering";
    const baseItems = mockByCategory[matchedCategory] || fallback;

    const results = baseItems.map((item) => ({
      ...item,
      summary: `${item.summary} Query focus: ${req.body.query}.`,
    }));

    res.json(results);
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to fetch study resources.",
    });
  }
};
