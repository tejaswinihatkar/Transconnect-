import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, BookOpen, MessageSquare, Stethoscope, Lightbulb, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { resources } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

export function DashboardPage() {
  const { t } = useLanguage();
  const [userName, setUserName] = useState("Friend");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const userStorageKey = "astitva_user";
  const legacyUserStorageKey = "transconnect_user";

  useEffect(() => {
    const user = localStorage.getItem(userStorageKey) || localStorage.getItem(legacyUserStorageKey);
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || "Friend");
      if (!localStorage.getItem(userStorageKey)) {
        localStorage.setItem(userStorageKey, user);
        localStorage.removeItem(legacyUserStorageKey);
      }
    }
  }, []);

  const moods = [
    { emoji: "😊", label: "Great", value: "great" },
    { emoji: "😌", label: "Good", value: "good" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😔", label: "Not Good", value: "notgood" },
  ];

  const quickActions = [
    { icon: Search, label: "AI Study Bot", link: "/study-bot", gradient: "from-[#f472b6] to-[#7c3aed]" },
    { icon: BookOpen, label: "Resources", link: "/resources", gradient: "from-[#7c3aed] to-[#38bdf8]" },
    { icon: MessageSquare, label: "Community Chat", link: "/chat", gradient: "from-[#38bdf8] to-[#f472b6]" },
    { icon: Stethoscope, label: "Doctors", link: "/healthcare", gradient: "from-[#f472b6] to-[#38bdf8]" },
  ];

  const studyTip = {
    title: "Break Big Goals into 25-minute Focus Blocks",
    description:
      "Use Pomodoro: 25 minutes deep work, 5 minutes break. Repeat 4 times, then take a longer break.",
    actionLabel: "Open AI Study Bot",
    actionLink: "/study-bot",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl text-[#1e1b4b] mb-2">
            {t("dashboard.welcomeHome")} {userName} 👋
          </h1>
          <p className="text-gray-600">{t("dashboard.howAreYouToday")}</p>
        </motion.div>

        {/* Mood Check-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-[#1e1b4b] mb-4">How are you feeling today?</h2>
          <div className="flex gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex-1 py-4 rounded-2xl transition-all ${
                  selectedMood === mood.value
                    ? "bg-[#7c3aed] text-white shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-gray-100 text-[#1e1b4b]"
                }`}
              >
                <div className="text-3xl mb-1">{mood.emoji}</div>
                <div className="text-sm">{mood.label}</div>
              </button>
            ))}
          </div>
          {selectedMood && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-gray-600 text-center"
            >
              Thank you for sharing. Remember, we're here for you always. 💜
            </motion.p>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-[#1e1b4b] mb-4">{t("dashboard.quickActions")}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.link}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`bg-gradient-to-br ${action.gradient} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105`}
                  >
                    <Icon className="w-8 h-8 text-white mb-3" />
                    <h3 className="text-white">{action.label}</h3>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Study Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#1e1b4b]">{t("dashboard.studyTip")}</h2>
            <Link to="/study-bot" className="text-[#7c3aed] hover:underline text-sm">
              Open Study Bot
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#7c3aed]/10 to-[#38bdf8]/10 rounded-3xl shadow-lg p-6"
            >
              <div className="w-12 h-12 bg-[#7c3aed] rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">{studyTip.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{studyTip.description}</p>
              <Link
                to={studyTip.actionLink}
                className="inline-flex items-center gap-2 text-[#7c3aed] hover:underline text-sm"
              >
                <Sparkles className="w-4 h-4" />
                {studyTip.actionLabel}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-[#7c3aed] rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">Trending Resource</h3>
              <h4 className="text-[#1e1b4b] mb-3">{resources[0].title}</h4>
              <p className="text-sm text-gray-600 mb-4">{resources[0].description}</p>
              <Link
                to="/resources"
                className="text-[#7c3aed] hover:underline text-sm inline-flex items-center gap-1"
              >
                Read More
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
