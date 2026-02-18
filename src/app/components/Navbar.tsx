import { Link, useLocation } from "react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isPublic?: boolean;
}

export function Navbar({ isPublic = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f472b6] to-[#38bdf8] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-semibold text-[#1e1b4b]">TransConnect</span>
          </Link>

          {/* Desktop Navigation */}
          {isPublic ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-[#1e1b4b] hover:text-[#7c3aed] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-full transition-all"
              >
                Join Community
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
                Home
              </Link>
              <Link
                to="/mentors"
                className={`text-sm ${
                  location.pathname === "/mentors"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                Mentors
              </Link>
              <Link
                to="/resources"
                className={`text-sm ${
                  location.pathname === "/resources"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                Resources
              </Link>
              <Link
                to="/healthcare"
                className={`text-sm ${
                  location.pathname === "/healthcare"
                    ? "text-[#7c3aed]"
                    : "text-[#1e1b4b] hover:text-[#7c3aed]"
                } transition-colors`}
              >
                Healthcare
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
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="block bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Community
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/mentors"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mentors
                  </Link>
                  <Link
                    to="/resources"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link
                    to="/healthcare"
                    className="block text-[#1e1b4b] hover:text-[#7c3aed] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Healthcare
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
