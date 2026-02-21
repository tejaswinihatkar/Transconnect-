import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  MessageSquare,
  Users,
  CheckCircle,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Bell,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";

export function MentorDashboardPage() {
  const navigate = useNavigate();
  const [mentorName, setMentorName] = useState("Mentor");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const meta = user.user_metadata;
      setMentorName(meta?.chosen_name || "Mentor");

      const { data } = await supabase
        .from("mentors")
        .select("is_verified, verified")
        .eq("name", meta?.chosen_name)
        .limit(1)
        .single();

      if (data) {
        setIsVerified(data.is_verified || data.verified || false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const stats = [
    { label: "Mentees Connected", value: "0", icon: Users, color: "from-[#7c3aed] to-[#a78bfa]" },
    { label: "Messages", value: "0", icon: MessageSquare, color: "from-[#38bdf8] to-[#0ea5e9]" },
    { label: "Rating", value: "--", icon: Star, color: "from-[#f472b6] to-[#ec4899]" },
    { label: "Response Rate", value: "--", icon: TrendingUp, color: "from-[#10b981] to-[#34d399]" },
  ];

  const quickActions = [
    { icon: MessageSquare, label: "View Messages", link: "/chat", gradient: "from-[#7c3aed] to-[#38bdf8]" },
    { icon: Users, label: "Browse Community", link: "/mentors", gradient: "from-[#38bdf8] to-[#f472b6]" },
    { icon: Shield, label: "My Profile", link: "/profile", gradient: "from-[#f472b6] to-[#7c3aed]" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#7c3aed] via-[#7c3aed] to-[#38bdf8] rounded-3xl shadow-xl p-8 lg:p-10 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl text-white font-semibold">
                Welcome, {mentorName}
              </h1>
              {isVerified && (
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Mentor
                </span>
              )}
            </div>
            <p className="text-white/80 text-lg">
              Thank you for making a difference in the community.
            </p>
          </div>
        </motion.div>

        {/* Verification Pending Banner */}
        {!isVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3"
          >
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium text-sm">
                Verification Pending
              </p>
              <p className="text-amber-700 text-sm">
                Your mentor profile is being reviewed by our team. You'll be
                notified once verified and visible in the mentor directory.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-semibold text-[#1e1b4b]">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-[#1e1b4b] mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} to={action.link} className="group">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + index * 0.1 }}
                    className={`bg-gradient-to-br ${action.gradient} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105`}
                  >
                    <Icon className="w-8 h-8 text-white mb-3" />
                    <h3 className="text-white font-medium">{action.label}</h3>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Notifications Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#7c3aed]" />
            </div>
            <h2 className="text-xl text-[#1e1b4b]">Recent Activity</h2>
          </div>

          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 mb-1">No activity yet</p>
            <p className="text-gray-400 text-sm">
              When mentees reach out to you, their messages will appear here.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
