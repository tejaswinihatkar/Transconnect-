import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LogOut, Save, Shield, User, Mail, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";

interface Profile {
  id: string;
  email: string;
  chosen_name: string;
  pronouns: string;
  identities: string[];
  looking_for: string[];
}

const pronounOptions = ["She/Her", "He/Him", "They/Them", "Ze/Hir"];

const identityOptions = [
  "Trans Woman",
  "Trans Man",
  "Non-binary",
  "Questioning",
  "Genderfluid",
  "Agender",
];

const lookingForOptions = [
  "mentorship",
  "medical",
  "legal",
  "friends",
  "career",
  "community",
];

const lookingForLabels: Record<string, string> = {
  mentorship: "Mentorship",
  medical: "Medical Info",
  legal: "Legal Help",
  friends: "Friends",
  career: "Career Support",
  community: "Community",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    chosen_name: "",
    pronouns: "",
    identities: [] as string[],
    looking_for: [] as string[],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to load profile:", error.message);
      }

      if (data) {
        setProfile(data);
        setFormData({
          chosen_name: data.chosen_name || "",
          pronouns: data.pronouns || "",
          identities: data.identities || [],
          looking_for: data.looking_for || [],
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setSuccessMsg("");

    const { error } = await supabase
      .from("profiles")
      .update({
        chosen_name: formData.chosen_name,
        pronouns: formData.pronouns,
        identities: formData.identities,
        looking_for: formData.looking_for,
      })
      .eq("id", profile.id);

    if (error) {
      alert("Failed to save: " + error.message);
    } else {
      setProfile({ ...profile, ...formData });
      setEditing(false);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }

    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const toggleIdentity = (identity: string) => {
    setFormData((prev) => ({
      ...prev,
      identities: prev.identities.includes(identity)
        ? prev.identities.filter((i) => i !== identity)
        : [...prev.identities, identity],
    }));
  };

  const toggleLookingFor = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      looking_for: prev.looking_for.includes(option)
        ? prev.looking_for.filter((i) => i !== option)
        : [...prev.looking_for, option],
    }));
  };

  const initials = profile?.chosen_name
    ? profile.chosen_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading profile...</p>
          </div>
        ) : !profile ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No profile found. Please sign up first.</p>
          </div>
        ) : (
          <>
            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#7c3aed] via-[#7c3aed] to-[#38bdf8] rounded-3xl shadow-xl p-8 mb-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-3xl font-semibold flex-shrink-0">
                  {initials}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-3xl font-semibold mb-1">{profile.chosen_name}</h1>
                  <p className="text-white/80 text-lg mb-2">{profile.pronouns}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-white/70 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-full transition-all text-sm"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          chosen_name: profile.chosen_name || "",
                          pronouns: profile.pronouns || "",
                          identities: profile.identities || [],
                          looking_for: profile.looking_for || [],
                        });
                      }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-full transition-all text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Success Message */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6"
              >
                <p className="text-sm text-green-800 text-center">{successMsg}</p>
              </motion.div>
            )}

            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-[#7c3aed]" />
                </div>
                <h2 className="text-xl text-[#1e1b4b]">Personal Information</h2>
              </div>

              <div className="space-y-6">
                {/* Chosen Name */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Chosen Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.chosen_name}
                      onChange={(e) =>
                        setFormData({ ...formData, chosen_name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                    />
                  ) : (
                    <p className="text-[#1e1b4b] text-lg">{profile.chosen_name}</p>
                  )}
                </div>

                {/* Pronouns */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Pronouns</label>
                  {editing ? (
                    <select
                      value={formData.pronouns}
                      onChange={(e) =>
                        setFormData({ ...formData, pronouns: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                    >
                      <option value="">Select pronouns</option>
                      {pronounOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-[#1e1b4b] text-lg">{profile.pronouns}</p>
                  )}
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Email
                    <span className="ml-2 inline-flex items-center gap-1 text-xs">
                      <Shield className="w-3 h-3" /> Private
                    </span>
                  </label>
                  <p className="text-[#1e1b4b] text-lg">{profile.email}</p>
                </div>
              </div>
            </motion.div>

            {/* Identity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#f472b6]/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#f472b6]" />
                </div>
                <h2 className="text-xl text-[#1e1b4b]">Identity</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {editing
                  ? identityOptions.map((identity) => (
                      <button
                        key={identity}
                        type="button"
                        onClick={() => toggleIdentity(identity)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.identities.includes(identity)
                            ? "bg-[#7c3aed] text-white"
                            : "bg-gray-100 text-[#1e1b4b] hover:bg-gray-200"
                        }`}
                      >
                        {identity}
                      </button>
                    ))
                  : (profile.identities || []).length > 0
                    ? profile.identities.map((identity) => (
                        <span
                          key={identity}
                          className="px-4 py-2 rounded-full text-sm bg-[#7c3aed]/10 text-[#7c3aed]"
                        >
                          {identity}
                        </span>
                      ))
                    : <p className="text-gray-400 text-sm">No identities selected</p>}
              </div>
            </motion.div>

            {/* Looking For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#38bdf8]/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#38bdf8]" />
                </div>
                <h2 className="text-xl text-[#1e1b4b]">Looking For</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {editing
                  ? lookingForOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleLookingFor(option)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.looking_for.includes(option)
                            ? "bg-[#38bdf8] text-white"
                            : "bg-gray-100 text-[#1e1b4b] hover:bg-gray-200"
                        }`}
                      >
                        {lookingForLabels[option] || option}
                      </button>
                    ))
                  : (profile.looking_for || []).length > 0
                    ? profile.looking_for.map((option) => (
                        <span
                          key={option}
                          className="px-4 py-2 rounded-full text-sm bg-[#38bdf8]/10 text-[#38bdf8]"
                        >
                          {lookingForLabels[option] || option}
                        </span>
                      ))
                    : <p className="text-gray-400 text-sm">Nothing selected yet</p>}
              </div>
            </motion.div>

            {/* Save Button (edit mode) */}
            {editing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white py-4 rounded-full transition-all shadow-lg text-lg"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </motion.div>
            )}

            {/* Sign Out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-500 border border-red-200 py-4 rounded-full transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
