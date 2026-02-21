import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Shield,
  Heart,
  MessageSquare,
  BookOpen,
  Briefcase,
  Users,
  UserCheck,
  GraduationCap,
  MapPin,
  Languages,
  Tags,
  FileText,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";

const topicOptions = [
  "Medical Transition",
  "Coming Out",
  "Career",
  "Legal",
  "Mental Health",
  "Family Support",
  "Non-binary Identity",
  "Documentation",
];

export function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"user" | "mentor">("user");
  const [formData, setFormData] = useState({
    chosenName: "",
    pronouns: "",
    customPronouns: "",
    identities: [] as string[],
    email: "",
    password: "",
    lookingFor: [] as string[],
    // Mentor-specific fields
    city: "",
    languages: "",
    topics: [] as string[],
    bio: "",
  });

  const pronounOptions = ["She/Her", "He/Him", "They/Them", "Ze/Hir", "Custom"];

  const identityOptions = [
    "Trans Woman",
    "Trans Man",
    "Non-binary",
    "Questioning",
    "Genderfluid",
    "Agender",
  ];

  const lookingForOptions = [
    { id: "mentorship", label: "Mentorship", icon: Heart },
    { id: "medical", label: "Medical Info", icon: BookOpen },
    { id: "legal", label: "Legal Help", icon: Shield },
    { id: "friends", label: "Friends", icon: Users },
    { id: "career", label: "Career Support", icon: Briefcase },
    { id: "community", label: "Community", icon: MessageSquare },
  ];

  const handleIdentityToggle = (identity: string) => {
    setFormData((prev) => ({
      ...prev,
      identities: prev.identities.includes(identity)
        ? prev.identities.filter((i) => i !== identity)
        : [...prev.identities, identity],
    }));
  };

  const handleLookingForToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(option)
        ? prev.lookingFor.filter((i) => i !== option)
        : [...prev.lookingFor, option],
    }));
  };

  const handleTopicToggle = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const totalSteps = role === "mentor" ? 3 : 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }
    if (role === "mentor" && step === 2) {
      setStep(3);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const resolvedPronouns =
      formData.pronouns === "Custom"
        ? formData.customPronouns
        : formData.pronouns;

    const userMetadata: Record<string, unknown> = {
      chosen_name: formData.chosenName,
      pronouns: resolvedPronouns,
      identities: formData.identities,
      role,
    };

    if (role === "user") {
      userMetadata.looking_for = formData.lookingFor;
    } else {
      userMetadata.city = formData.city;
      userMetadata.languages = formData.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);
      userMetadata.topics = formData.topics;
      userMetadata.bio = formData.bio;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: userMetadata },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: data.user!.id,
          email: formData.email,
          chosen_name: formData.chosenName,
          pronouns: resolvedPronouns,
          identities: formData.identities,
          looking_for: role === "user" ? formData.lookingFor : [],
          role,
        });

      if (profileError) {
        console.warn("Profile upsert failed:", profileError.message);
      }

      if (role === "mentor") {
        const initials = formData.chosenName
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        const gradients = [
          { from: "#f472b6", to: "#7c3aed" },
          { from: "#7c3aed", to: "#38bdf8" },
          { from: "#38bdf8", to: "#f472b6" },
        ];
        const gradient = gradients[Math.floor(Math.random() * gradients.length)];

        await supabase.from("mentors").insert({
          name: formData.chosenName,
          pronouns: resolvedPronouns,
          city: formData.city,
          languages: formData.languages
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean),
          topics: formData.topics,
          bio: formData.bio,
          initials,
          gradientFrom: gradient.from,
          gradientTo: gradient.to,
          verified: false,
          is_verified: false,
        });
      }

      navigate(role === "mentor" ? "/mentor-dashboard" : "/dashboard");
    } else {
      setShowConfirmation(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f472b6]/10 via-[#f8fafc] to-[#38bdf8]/10">
      <Navbar isPublic={true} />
      <CrisisButton />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          {showConfirmation ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl text-[#1e1b4b] mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a confirmation link to{" "}
                <strong>{formData.email}</strong>. Please click the link to
                activate your account, then log in.
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-3 rounded-full transition-all shadow-lg"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {/* Role Selector */}
              <div className="flex gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setRole("user");
                    if (step > 2) setStep(2);
                  }}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    role === "user"
                      ? "border-[#7c3aed] bg-[#7c3aed]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      role === "user"
                        ? "bg-[#7c3aed] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-medium text-sm ${
                        role === "user" ? "text-[#7c3aed]" : "text-[#1e1b4b]"
                      }`}
                    >
                      I'm a User
                    </p>
                    <p className="text-xs text-gray-500">Seeking support</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("mentor");
                    if (step > 2) setStep(2);
                  }}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    role === "mentor"
                      ? "border-[#7c3aed] bg-[#7c3aed]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      role === "mentor"
                        ? "bg-[#7c3aed] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-medium text-sm ${
                        role === "mentor" ? "text-[#7c3aed]" : "text-[#1e1b4b]"
                      }`}
                    >
                      I'm a Mentor
                    </p>
                    <p className="text-xs text-gray-500">Providing guidance</p>
                  </div>
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl text-[#1e1b4b] mb-2">
                  {step === 1
                    ? role === "mentor"
                      ? "Welcome, Future Mentor"
                      : "Welcome to TransConnect"
                    : step === 2
                      ? role === "mentor"
                        ? "Your Mentor Profile"
                        : "Tell Us About You"
                      : "Almost There"}
                </h1>
                <p className="text-gray-600">
                  {step === 1
                    ? "Let's get to know you"
                    : role === "mentor"
                      ? step === 2
                        ? "Tell us how you'd like to help"
                        : "Review and create your account"
                      : "What are you looking for?"}
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-16 rounded-full transition-all ${
                        step >= i + 1 ? "bg-[#7c3aed]" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 1: Basic Info (same for both roles) */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        Chosen Name{" "}
                        <span className="text-sm text-gray-500">
                          (not legal name)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.chosenName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chosenName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                        placeholder="The name you'd like to be called"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        Pronouns
                      </label>
                      <select
                        value={formData.pronouns}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pronouns: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                        required
                      >
                        <option value="">Select your pronouns</option>
                        {pronounOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.pronouns === "Custom" && (
                      <div>
                        <label className="block text-[#1e1b4b] mb-2">
                          Custom Pronouns
                        </label>
                        <input
                          type="text"
                          value={formData.customPronouns}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customPronouns: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                          placeholder="e.g., xe/xem"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        Identity (select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {identityOptions.map((identity) => (
                          <button
                            key={identity}
                            type="button"
                            onClick={() => handleIdentityToggle(identity)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                              formData.identities.includes(identity)
                                ? "bg-[#7c3aed] text-white"
                                : "bg-gray-100 text-[#1e1b4b] hover:bg-gray-200"
                            }`}
                          >
                            {identity}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        Email (Private)
                        <span className="ml-2 inline-flex items-center gap-1 text-xs text-gray-500">
                          <Shield className="w-3 h-3" />
                          We never share your email
                        </span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                        placeholder="Create a strong password"
                        required
                        minLength={8}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-full transition-all shadow-lg"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 2 (USER): Looking For */}
                {step === 2 && role === "user" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 text-center mb-6">
                      Select all that interest you to personalize your
                      experience
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {lookingForOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleLookingForToggle(option.id)}
                            className={`p-6 rounded-2xl border-2 transition-all text-left ${
                              formData.lookingFor.includes(option.id)
                                ? "border-[#7c3aed] bg-[#7c3aed]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 mb-3 ${
                                formData.lookingFor.includes(option.id)
                                  ? "text-[#7c3aed]"
                                  : "text-gray-400"
                              }`}
                            />
                            <h3 className="text-[#1e1b4b]">{option.label}</h3>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1e1b4b] py-3.5 rounded-full transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white py-3.5 rounded-full transition-all shadow-lg"
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 (MENTOR): Mentor Profile */}
                {step === 2 && role === "mentor" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#7c3aed]" />
                          City
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                        placeholder="e.g., Mumbai, Delhi, Bangalore"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        <span className="inline-flex items-center gap-2">
                          <Languages className="w-4 h-4 text-[#7c3aed]" />
                          Languages (comma-separated)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.languages}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            languages: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                        placeholder="e.g., Hindi, English, Tamil"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        <span className="inline-flex items-center gap-2">
                          <Tags className="w-4 h-4 text-[#7c3aed]" />
                          Topics You Can Help With
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {topicOptions.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => handleTopicToggle(topic)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                              formData.topics.includes(topic)
                                ? "bg-[#7c3aed] text-white"
                                : "bg-gray-100 text-[#1e1b4b] hover:bg-gray-200"
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#1e1b4b] mb-2">
                        <span className="inline-flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#7c3aed]" />
                          Short Bio
                        </span>
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white resize-none"
                        rows={4}
                        placeholder="Tell people about yourself and how you can help..."
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1e1b4b] py-3.5 rounded-full transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-full transition-all shadow-lg"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 (MENTOR): Review & Submit */}
                {step === 3 && role === "mentor" && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#7c3aed]/5 to-[#38bdf8]/5 rounded-2xl p-6 space-y-4">
                      <h3 className="text-[#1e1b4b] font-medium">
                        Review Your Mentor Profile
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Name</p>
                          <p className="text-[#1e1b4b]">
                            {formData.chosenName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Pronouns</p>
                          <p className="text-[#1e1b4b]">
                            {formData.pronouns === "Custom"
                              ? formData.customPronouns
                              : formData.pronouns}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">City</p>
                          <p className="text-[#1e1b4b]">{formData.city}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Languages</p>
                          <p className="text-[#1e1b4b]">
                            {formData.languages}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Topics</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.topics.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-full text-xs bg-[#7c3aed]/10 text-[#7c3aed]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Bio</p>
                        <p className="text-[#1e1b4b] text-sm">{formData.bio}</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                      <p className="text-xs text-amber-800">
                        <strong>Note:</strong> Your mentor profile will be
                        reviewed by our team before it appears in the directory.
                        You'll be notified once verified.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1e1b4b] py-3.5 rounded-full transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white py-3.5 rounded-full transition-all shadow-lg"
                      >
                        {loading
                          ? "Creating Account..."
                          : "Create Mentor Account"}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-4">
                  <p className="text-xs text-red-800">{errorMsg}</p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#7c3aed] hover:underline"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
