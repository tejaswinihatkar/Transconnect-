import { Link, useLocation } from "react-router";
import { Menu, X, UserCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import brandLogo from "../assets/astitva-logo.svg";

interface NavbarProps {
  isPublic?: boolean;
}

export function Navbar({ isPublic = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={brandLogo} alt="Astitva logo" className="w-10 h-10 rounded-full object-cover" />
            <span className="text-xl font-semibold text-[#1e1b4b]">Astitva</span>
          </Link>

          {/* Desktop Navigation */}
          {isPublic ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-[#1e1b4b] hover:text-[#7c3aed] transition-colors"
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/signup"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-full transition-all"
              >
                {t("nav.joinCommunity")}
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/dashboard"
                className={`text-sm ${
                  location.pathname === "/dashboard"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/study-bot"
                className={`text-sm ${
                  location.pathname === "/study-bot"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                {t("nav.studyBot")}
              </Link>
              <Link
                to="/resources"
                className={`text-sm ${
                  location.pathname === "/resources"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                {t("nav.resources")}
              </Link>
              <Link
                to="/talent"
                className={`text-sm ${
                  location.pathname === "/talent" || location.pathname.startsWith("/talent/")
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors inline-flex items-center gap-1`}
              >
                <Sparkles className="w-4 h-4" />
                {t("nav.talent")}
              </Link>
              <Link
                to="/healthcare"
                className={`text-sm ${
                  location.pathname === "/healthcare"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                {t("nav.healthcare")}
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-1 text-sm ${
                  location.pathname === "/profile"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                <UserCircle className="w-5 h-5" />
                {t("nav.profile")}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1e1b4b]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {isPublic ? (
                <>
                  <Link
                    to="/login"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="block bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.joinCommunity")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                  <Link
                    to="/study-bot"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.studyBot")}
                  </Link>
                  <Link
                    to="/resources"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.resources")}
                  </Link>
                  <Link
                    to="/talent"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.talentShowcase")}
                  </Link>
                  <Link
                    to="/healthcare"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.healthcare")}
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.profile")}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
