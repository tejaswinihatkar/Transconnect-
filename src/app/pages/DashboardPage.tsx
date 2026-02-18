import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, BookOpen, MessageSquare, Stethoscope, Smile, Meh, Frown, Heart } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { mentors, resources } from "../data/mockData";

export function DashboardPage() {
  const [userName, setUserName] = useState("Friend");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("transconnect_user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || "Friend");
    }
  }, []);

  const moods = [
    { emoji: "😊", label: "Great", value: "great" },
    { emoji: "😌", label: "Good", value: "good" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😔", label: "Not Good", value: "notgood" },
  ];

  const quickActions = [
    { icon: Search, label: "Find Mentor", link: "/mentors", gradient: "from-[#f472b6] to-[#7c3aed]" },
    { icon: BookOpen, label: "Resources", link: "/resources", gradient: "from-[#7c3aed] to-[#38bdf8]" },
    { icon: MessageSquare, label: "Community", link: "/chat", gradient: "from-[#38bdf8] to-[#f472b6]" },
    { icon: Stethoscope, label: "Doctors", link: "/healthcare", gradient: "from-[#f472b6] to-[#38bdf8]" },
  ];

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
            Welcome home, {userName} 👋
          </h1>
          <p className="text-gray-600">How are you doing today?</p>
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
          <h2 className="text-[#1e1b4b] mb-4">Quick Actions</h2>
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

        {/* Recommended For You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#1e1b4b]">Recommended For You</h2>
            <Link to="/mentors" className="text-[#7c3aed] hover:underline text-sm">
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mentor Cards */}
            {mentors.slice(0, 2).map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl"
                    style={{
                      background: `linear-gradient(135deg, ${mentor.gradientFrom}, ${mentor.gradientTo})`,
                    }}
                  >
                    {mentor.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#1e1b4b]">{mentor.name}</h3>
                      {mentor.verified && (
                        <span className="text-xs bg-[#7c3aed]/10 text-[#7c3aed] px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{mentor.pronouns}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.topics.slice(0, 2).map((topic) => (
                    <span key={topic} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {mentor.languages.join(", ")} • {mentor.city}
                </p>
                <Link
                  to={`/chat/${mentor.id}`}
                  className="block w-full text-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2.5 rounded-full transition-all"
                >
                  Request Chat
                </Link>
              </motion.div>
            ))}

            {/* Trending Resource */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#f472b6]/10 to-[#38bdf8]/10 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-[#7c3aed] rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">Trending Article</h3>
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
