import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Search, MapPin, Sparkles, Users, Briefcase, Palette } from "lucide-react";
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

export function TalentShowcasePage() {
  const { t } = useLanguage();
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

  useEffect(() => {
    const fetchTalents = async () => {
      const { data, error } = await supabase
        .from("talent_profiles")
        .select("*")
        .order("followers", { ascending: false });

      if (error) {
        if (error.message.includes("talent_profiles")) {
          setErrorMsg(
            "Talent Showcase table not found yet. Create the talent_profiles table in Supabase SQL Editor to enable this feature."
          );
        } else {
          setErrorMsg("Failed to load talent profiles: " + error.message);
        }
        setLoading(false);
        return;
      }

      setTalents((data as TalentProfile[]) || []);
      setLoading(false);
    };

    fetchTalents();
  }, []);

  const skillOptions = useMemo(() => {
    const allSkills = talents.flatMap((t) => t.skills || []);
    return ["All", ...Array.from(new Set(allSkills)).sort()];
  }, [talents]);

  const filteredTalents = useMemo(() => {
    return talents.filter((talent) => {
      const searchText = searchQuery.toLowerCase();
      const matchesSearch =
        !searchText ||
        talent.chosen_name?.toLowerCase().includes(searchText) ||
        talent.city?.toLowerCase().includes(searchText) ||
        talent.bio?.toLowerCase().includes(searchText) ||
        (talent.skills || []).some((skill) => skill.toLowerCase().includes(searchText));

      const matchesSkill =
        selectedSkill === "All" || (talent.skills || []).includes(selectedSkill);

      return matchesSearch && matchesSkill;
    });
  }, [talents, searchQuery, selectedSkill]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#7c3aed] via-[#7c3aed] to-[#f472b6] rounded-3xl shadow-xl p-8 lg:p-10 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Safe Space for Trans Creators
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold mb-3">{t("talent.title")}</h1>
            <p className="text-white/85 max-w-2xl">
              {t("talent.subtitle")} Celebrate talent, build visibility, and create opportunities.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, bio, or skills..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white shadow-sm"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedSkill === skill
                    ? "bg-[#7c3aed] text-white shadow-md"
                    : "bg-white border border-gray-300 text-[#1e1b4b] hover:border-[#7c3aed]"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </motion.div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading talent profiles...</p>
          </div>
        )}

        {!!errorMsg && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
            <p className="text-sm text-amber-900">{errorMsg}</p>
          </div>
        )}

        {!loading && !errorMsg && (
          <>
            <p className="text-gray-600 mb-4">
              Showing {filteredTalents.length} profile{filteredTalents.length !== 1 ? "s" : ""}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTalents.map((talent, index) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.04 }}
                  className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all border border-transparent hover:border-[#7c3aed]/20"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#7c3aed] to-[#f472b6] rounded-2xl text-white flex items-center justify-center text-xl font-semibold">
                      {talent.initials || talent.chosen_name?.slice(0, 2).toUpperCase() || "TC"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[#1e1b4b] text-lg truncate">{talent.chosen_name}</h3>
                      <p className="text-sm text-gray-500">{talent.pronouns || "Pronouns not set"}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{talent.city || "Location hidden"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 min-h-[1.8rem]">
                    {(talent.skills || []).slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-xs bg-[#7c3aed]/10 text-[#7c3aed]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 h-16 overflow-hidden">
                    {talent.bio || "This creator has not added a bio yet."}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {talent.followers || 0} followers
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      Open to work
                    </span>
                  </div>

                  <Link
                    to={`/talent/${talent.id}`}
                    className="block w-full text-center bg-gradient-to-r from-[#7c3aed] to-[#f472b6] text-white py-3 rounded-full hover:opacity-95 transition-all shadow-md"
                  >
                    View Profile
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredTalents.length === 0 && (
              <div className="text-center py-16">
                <Palette className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No talent profiles match your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSkill("All");
                  }}
                  className="text-[#7c3aed] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
