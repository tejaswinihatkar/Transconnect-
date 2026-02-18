import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Heart, MessageSquare, BookOpen, Briefcase, Users } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { motion } from "motion/react";

export function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    chosenName: "",
    pronouns: "",
    customPronouns: "",
    identities: [] as string[],
    email: "",
    password: "",
    lookingFor: [] as string[],
  });

  const pronounOptions = [
    "She/Her",
    "He/Him",
    "They/Them",
    "Ze/Hir",
    "Custom",
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Simulate signup
      localStorage.setItem("transconnect_user", JSON.stringify({
        name: formData.chosenName,
        pronouns: formData.pronouns === "Custom" ? formData.customPronouns : formData.pronouns,
      }));
      navigate("/dashboard");
    }
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#1e1b4b] mb-2">
              {step === 1 ? "Welcome to TransConnect" : "Tell Us About You"}
            </h1>
            <p className="text-gray-600">
              {step === 1 ? "Let's get to know you" : "What are you looking for?"}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <div className={`h-2 w-20 rounded-full ${step >= 1 ? "bg-[#7c3aed]" : "bg-gray-200"}`} />
              <div className={`h-2 w-20 rounded-full ${step >= 2 ? "bg-[#7c3aed]" : "bg-gray-200"}`} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                {/* Chosen Name */}
                <div>
                  <label className="block text-[#1e1b4b] mb-2">
                    Chosen Name <span className="text-sm text-gray-500">(not legal name)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.chosenName}
                    onChange={(e) => setFormData({ ...formData, chosenName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                    placeholder="The name you'd like to be called"
                    required
                  />
                </div>

                {/* Pronouns */}
                <div>
                  <label className="block text-[#1e1b4b] mb-2">Pronouns</label>
                  <select
                    value={formData.pronouns}
                    onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
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

                {/* Custom Pronouns */}
                {formData.pronouns === "Custom" && (
                  <div>
                    <label className="block text-[#1e1b4b] mb-2">Custom Pronouns</label>
                    <input
                      type="text"
                      value={formData.customPronouns}
                      onChange={(e) => setFormData({ ...formData, customPronouns: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                      placeholder="e.g., xe/xem"
                      required
                    />
                  </div>
                )}

                {/* Identity */}
                <div>
                  <label className="block text-[#1e1b4b] mb-2">Identity (select all that apply)</label>
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

                {/* Email */}
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[#1e1b4b] mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            ) : (
              <div className="space-y-6">
                <p className="text-gray-600 text-center mb-6">
                  Select all that interest you to personalize your experience
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
                            formData.lookingFor.includes(option.id) ? "text-[#7c3aed]" : "text-gray-400"
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
                    className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-full transition-all shadow-lg"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#7c3aed] hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
