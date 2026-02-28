import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Shield } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { supabase } from "../../supabaseClient";
import { useLanguage } from "../i18n/LanguageContext";

export function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setSuccessMsg(
      "Password reset link sent. Check your email inbox (and spam folder)."
    );
    setLoading(false);
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
          <div className="w-14 h-14 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-[#7c3aed]" />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#1e1b4b] mb-2">Forgot Password</h1>
            <p className="text-gray-600">
              Enter your account email and we’ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#1e1b4b] mb-2">{t("common.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> For security reasons, reset links expire quickly. Open the
                latest email link only.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-xs text-red-800">{errorMsg}</p>
              </div>
            )}

            {successMsg && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-xs text-green-800">{successMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white py-3.5 rounded-full transition-all shadow-lg"
            >
              {loading ? t("auth.sending") : t("auth.sendResetLink")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#7c3aed] hover:underline">
              {t("auth.backToLogin")}
            </Link>
          </div>

          <div className="mt-6 flex items-start gap-2 bg-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-2xl p-3">
            <Shield className="w-4 h-4 text-[#7c3aed] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#1e1b4b]">
              If email links are not opening properly, ensure your Supabase project has
              `http://localhost:5173/reset-password` added under Authentication URL settings.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
