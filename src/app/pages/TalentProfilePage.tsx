import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, MapPin, Users, Sparkles, Briefcase, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { supabase } from "../../supabaseClient";
import { useLanguage } from "../i18n/LanguageContext";

interface TalentProfile {
  id: string;
  user_id: string;
  chosen_name: string;
  pronouns: string;
  initials: string;
  bio: string;
  city: string;
  skills: string[];
  portfolio_links: Record<string, string> | null;
  followers: number;
  created_at: string;
}

export function TalentProfilePage() {
  const { t } = useLanguage();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [talent, setTalent] = useState<TalentProfile | null>(null);

  useEffect(() => {
    const fetchTalentProfile = async () => {
      if (!userId) {
        setErrorMsg("Invalid profile id.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("talent_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        setErrorMsg("Unable to load this profile.");
        setLoading(false);
        return;
      }

      setTalent(data as TalentProfile);
      setLoading(false);
    };

    fetchTalentProfile();
  }, [userId]);

  const portfolioEntries = useMemo(() => {
    if (!talent?.portfolio_links) return [];
    return Object.entries(talent.portfolio_links).filter(
      ([, value]) => typeof value === "string" && value.length > 0
    );
  }, [talent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
        <Navbar isPublic={false} />
        <CrisisButton />
        <MobileBottomNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600">Loading talent profile...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !talent) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
        <Navbar isPublic={false} />
        <CrisisButton />
        <MobileBottomNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <p className="text-gray-700 mb-4">{errorMsg || "Profile not found."}</p>
            <button
              onClick={() => navigate("/talent")}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-full transition-all"
            >
              Back to Talent Showcase
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/talent")}
          className="inline-flex items-center gap-2 text-sm text-[#7c3aed] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("common.back")} {t("talent.title")}
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#7c3aed] via-[#7c3aed] to-[#f472b6] rounded-3xl shadow-xl p-8 text-white relative overflow-hidden mb-8"
        >
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center text-3xl font-semibold">
              {talent.initials || talent.chosen_name?.slice(0, 2).toUpperCase() || "TC"}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold mb-1">{talent.chosen_name}</h1>
              <p className="text-white/80 mb-2">{talent.pronouns || "Pronouns not set"}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {talent.city || "Location hidden"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {talent.followers || 0} followers
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#7c3aed]" />
            <h2 className="text-xl text-[#1e1b4b]">About</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {talent.bio || "No bio added yet."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-xl text-[#1e1b4b] mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(talent.skills || []).length > 0 ? (
              talent.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm bg-[#7c3aed]/10 text-[#7c3aed]"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills listed yet.</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <h2 className="text-xl text-[#1e1b4b] mb-4">Portfolio & Links</h2>
          {portfolioEntries.length > 0 ? (
            <div className="space-y-3">
              {portfolioEntries.map(([platform, link]) => (
                <a
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-200 hover:border-[#7c3aed] transition-all"
                >
                  <span className="text-[#1e1b4b] capitalize">{platform}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-5">No portfolio links added yet.</p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/chat"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 rounded-full transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Connect in Chat
            </Link>
            <button
              className="flex-1 bg-white border border-gray-300 hover:border-[#7c3aed] text-[#1e1b4b] py-3 rounded-full transition-all"
              type="button"
            >
              Follow Creator
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
