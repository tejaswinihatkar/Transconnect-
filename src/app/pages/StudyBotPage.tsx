import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Briefcase,
  Clock,
  Search,
  Share2,
  Sparkles,
  Youtube,
  Bot,
  User,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { useLanguage } from "../i18n/LanguageContext";

interface StudyResource {
  title: string;
  youtubeUrl: string;
  summary: string;
  duration: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  resources?: StudyResource[];
}

interface JobPortal {
  name: string;
  url: string;
  focus: string;
}

interface JobOpportunity {
  title: string;
  org: string;
  location: string;
  tag: string;
  applyUrl: string;
}

const categories = ["Engineering", "UPSC", "Career Opportunities"];
const historyKey = "astitva_studybot_history";
const legacyHistoryKey = "transconnect_studybot_history";

const jobPortals: JobPortal[] = [
  {
    name: "Naukri",
    url: "https://www.naukri.com",
    focus: "Mainstream jobs with diversity filters",
  },
  {
    name: "LinkedIn Jobs",
    url: "https://www.linkedin.com/jobs",
    focus: "Inclusive companies and professional networking",
  },
  {
    name: "Indeed",
    url: "https://in.indeed.com",
    focus: "Large job pool across roles and cities",
  },
  {
    name: "Apna",
    url: "https://apna.co",
    focus: "Entry-level and growth opportunities",
  },
];

const communityOpportunities: JobOpportunity[] = [
  {
    title: "Community Support Associate",
    org: "InclusiveCare Foundation",
    location: "Remote / India",
    tag: "Trans Friendly",
    applyUrl: "https://www.linkedin.com/jobs",
  },
  {
    title: "Frontend Developer (Diversity Hiring)",
    org: "OpenTech Labs",
    location: "Bangalore",
    tag: "Tech",
    applyUrl: "https://www.naukri.com",
  },
  {
    title: "Career Counselor - LGBTQIA+ Program",
    org: "PridePath Initiative",
    location: "Mumbai",
    tag: "Social Impact",
    applyUrl: "https://in.indeed.com",
  },
  {
    title: "Content Creator - Trans Career Series",
    org: "SafeVoice Media",
    location: "Hybrid",
    tag: "Creator Economy",
    applyUrl: "https://apna.co",
  },
];

export function StudyBotPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Engineering");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<StudyResource[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text:
        "Hi! I am your AI Study Bot. Ask me for JEE, UPSC, interview prep, or trans-career guidance. I will fetch relevant videos and concise notes.",
    },
  ]);
  const [history, setHistory] = useState<string[]>(() => {
    const raw = localStorage.getItem(historyKey);
    const legacy = localStorage.getItem(legacyHistoryKey);
    const parsed = raw ? JSON.parse(raw) : legacy ? JSON.parse(legacy) : [];
    if (!raw && legacy) {
      localStorage.setItem(historyKey, JSON.stringify(parsed));
      localStorage.removeItem(legacyHistoryKey);
    }
    return parsed;
  });

  const promptExamples = useMemo(
    () => [
      "JEE Maths limits and continuity",
      "UPSC polity basics",
      "Aptitude for placement interviews",
      "Best coding roadmap for beginners",
    ],
    []
  );

  const saveHistory = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    const next = [clean, ...history.filter((h) => h !== clean)].slice(0, 8);
    setHistory(next);
    localStorage.setItem(historyKey, JSON.stringify(next));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setResults([]);

    try {
      const response = await fetch("http://localhost:5000/api/study-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `${query} (${selectedCategory})`,
        }),
      });

      if (!response.ok) {
        throw new Error("Study API not available. Start backend on port 5000.");
      }

      const data = (await response.json()) as StudyResource[];
      setResults(data);
      saveHistory(query);

      const userMessage: ChatMessage = {
        id: `${Date.now()}-u`,
        role: "user",
        text: query,
      };

      const botMessage: ChatMessage = {
        id: `${Date.now()}-b`,
        role: "bot",
        text: `Here are the most useful study materials I found for "${query}" in ${selectedCategory}.`,
        resources: data,
      };

      setChatMessages((prev) => [...prev, userMessage, botMessage]);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Failed to fetch study resources.");
    } finally {
      setLoading(false);
    }
  };

  const shareResults = async () => {
    const shareText = results
      .slice(0, 2)
      .map((r) => `${r.title} - ${r.youtubeUrl}`)
      .join("\n");

    if (navigator.share) {
      await navigator.share({
        title: "Astitva AI Study Bot Results",
        text: shareText,
      });
      return;
    }

    await navigator.clipboard.writeText(shareText);
    alert("Results copied to clipboard.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#7c3aed] to-[#38bdf8] rounded-3xl shadow-xl p-8 text-white mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Perplexity-style Study Assistant
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">{t("studybot.title")}</h1>
          <p className="text-white/85 max-w-3xl">
            Your personal chatbot for finding relevant study material fast. Ask anything and get
            curated YouTube resources + concise notes in seconds.
          </p>
        </motion.div>

        <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-[#7c3aed] text-white"
                    : "bg-gray-100 text-[#1e1b4b] hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("studybot.askPlaceholder")}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 rounded-2xl disabled:opacity-50"
            >
              {loading ? t("studybot.searching") : t("studybot.ask")}
            </button>
          </div>
        </form>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-800">
                {errorMsg}
              </div>
            )}

            {!loading && chatMessages.length <= 1 && !errorMsg && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <p className="text-[#1e1b4b] mb-3">Try these prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {promptExamples.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => setQuery(example)}
                      className="px-3 py-1.5 rounded-full text-sm bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl shadow-lg p-5 ${
                  message.role === "bot"
                    ? "bg-white border border-[#7c3aed]/15"
                    : "bg-[#7c3aed] text-white ml-6"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.role === "bot"
                        ? "bg-[#7c3aed]/10 text-[#7c3aed]"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {message.role === "bot" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        message.role === "bot" ? "text-[#1e1b4b]" : "text-white"
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                </div>

                {message.resources && message.resources.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {message.resources.map((item) => (
                      <div
                        key={item.youtubeUrl}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-4"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-sm text-[#1e1b4b]">{item.title}</h3>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                            <Clock className="w-3.5 h-3.5" />
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{item.summary}</p>
                        <a
                          href={item.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[#7c3aed] hover:underline text-xs"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          Watch on YouTube
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {results.length > 0 && (
              <button
                type="button"
                onClick={shareResults}
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-[#7c3aed] text-[#1e1b4b] px-4 py-2 rounded-full text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share results
              </button>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 h-fit">
            <h3 className="text-[#1e1b4b] mb-3 inline-flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#7c3aed]" />
              Recent Searches
            </h3>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">No history yet.</p>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 text-[#1e1b4b]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-[#7c3aed]" />
            <h2 className="text-2xl text-[#1e1b4b]">Career Opportunities Hub</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Merged jobs + trans-career section with trusted job portals and inclusive opportunities
            for our community.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {jobPortals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:border-[#7c3aed]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[#1e1b4b]">{portal.name}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600">{portal.focus}</p>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-[#1e1b4b] mb-4">Featured Inclusive Roles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {communityOpportunities.map((job) => (
                <div key={job.title} className="border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm text-[#1e1b4b]">{job.title}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-[#7c3aed]">
                      {job.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {job.org} • {job.location}
                  </p>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#7c3aed] hover:underline inline-flex items-center gap-1"
                  >
                    Apply via portal
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
