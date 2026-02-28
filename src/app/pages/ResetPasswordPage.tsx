import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { KeyRound } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { supabase } from "../../supabaseClient";
import { useLanguage } from "../i18n/LanguageContext";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkRecoverySession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (data.session) {
        setHasRecoverySession(true);
        setCheckingSession(false);
        return;
      }
      setCheckingSession(false);
    };

    checkRecoverySession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === "PASSWORD_RECOVERY" || session) {
        setHasRecoverySession(true);
      }
      setCheckingSession(false);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setSuccessMsg("Password updated successfully. Redirecting to login...");
    setLoading(false);
    setTimeout(() => navigate("/login"), 1400);
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
            <KeyRound className="w-7 h-7 text-[#7c3aed]" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#1e1b4b] mb-2">Set New Password</h1>
            <p className="text-gray-600">Choose a strong password for your account.</p>
          </div>

          {checkingSession ? (
            <p className="text-sm text-gray-600 text-center">Verifying recovery link...</p>
          ) : !hasRecoverySession ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs text-amber-800 mb-3">
                Invalid or expired reset link. Please request a new password reset email.
              </p>
              <Link to="/forgot-password" className="text-sm text-[#7c3aed] hover:underline">
                Request New Reset Link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
              <label className="block text-[#1e1b4b] mb-2">{t("common.password")}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-[#1e1b4b] mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
                  placeholder="Re-enter your password"
                  required
                />
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
                {loading ? t("common.loading") : "Update Password"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#7c3aed] hover:underline">
              {t("auth.backToLogin")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
