import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";
import { useLanguage } from "../i18n/LanguageContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setErrorMsg(
          "Your email hasn't been confirmed yet. Please check your inbox for the confirmation link."
        );
      } else {
        setErrorMsg(`${t("auth.loginFailed")} ${error.message}`);
      }
      setLoading(false);
      return;
    }

    if (data.user) {
      const meta = data.user.user_metadata;
      if (meta?.chosen_name) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          chosen_name: meta.chosen_name,
          pronouns: meta.pronouns,
          identities: meta.identities,
          looking_for: meta.looking_for,
          role: "user",
        });
      }

      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f472b6]/10 via-[#f8fafc] to-[#38bdf8]/10">
      <Navbar isPublic={true} />
      <CrisisButton />

      <div className="max-w-md mx-auto px-4 py-12 min-h-[calc(100vh-64px)] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-3xl shadow-xl p-8 lg:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#1e1b4b] mb-2">{t("auth.welcomeBack")}</h1>
            <p className="text-gray-600">{t("auth.loginSubtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#1e1b4b] mb-2">{t("common.email")}</label>
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
              <label className="block text-[#1e1b4b] mb-2">{t("common.password")}</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                />
                <span className="text-sm text-gray-600">{t("auth.rememberMe")}</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#7c3aed] hover:underline"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs text-amber-800">
                <strong>Safety Tip:</strong> "Remember me" is OFF by default
                for your safety on shared devices.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-xs text-red-800">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white py-3.5 rounded-full transition-all shadow-lg"
            >
              {loading ? t("auth.loggingIn") : t("nav.login")}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">{t("common.or")}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {t("auth.noAccount")}{" "}
              <Link to="/signup" className="text-[#7c3aed] hover:underline">
                {t("auth.joinTransConnect")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
