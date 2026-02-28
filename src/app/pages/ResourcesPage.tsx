import { Pill, Scale, Heart, Briefcase, Users, Book, Mic, Calendar, Bookmark, Search } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { resources } from "../data/mockData";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const iconMap: Record<string, any> = {
  pill: Pill,
  scale: Scale,
  heart: Heart,
  briefcase: Briefcase,
  users: Users,
  book: Book,
  mic: Mic,
  calendar: Calendar,
};

export function ResourcesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [savedResources, setSavedResources] = useState<string[]>([]);

  const categories = ["All", "Medical", "Legal", "Wellness", "Career", "Support", "Community"];

  const filteredResources =
    selectedCategory === "All"
      ? resources
      : resources.filter((resource) => resource.category === selectedCategory);

  const toggleSave = (id: string) => {
    setSavedResources((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl text-[#1e1b4b] mb-2">{t("resources.title")}</h1>
          <p className="text-gray-600">{t("resources.subtitle")}</p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-[#7c3aed] text-white shadow-lg"
                    : "bg-white text-[#1e1b4b] border border-gray-300 hover:border-[#7c3aed]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#7c3aed] to-[#38bdf8] rounded-3xl p-8 mb-8 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Featured</span>
          </div>
          <h2 className="text-2xl mb-2">Complete Guide to Transgender Rights in India</h2>
          <p className="mb-6 text-white/90">
            Understanding the NALSA judgment, Transgender Persons Act 2019, and your legal protections.
          </p>
          <button className="bg-white hover:bg-gray-100 text-[#7c3aed] px-6 py-3 rounded-full transition-all shadow-lg">
            Read Full Guide
          </button>
        </motion.div>

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const Icon = iconMap[resource.icon] || Book;
            const isSaved = savedResources.includes(resource.id);

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all group"
              >
                {/* Icon & Category */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-[#f472b6] to-[#38bdf8] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <button
                    onClick={() => toggleSave(resource.id)}
                    className={`p-2 rounded-full transition-all ${
                      isSaved
                        ? "bg-[#7c3aed] text-white"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                  </button>
                </div>

                {/* Category Badge */}
                <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-3">
                  {resource.category}
                </span>

                {/* Title & Description */}
                <h3 className="text-[#1e1b4b] mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>

                {/* Action */}
                <button className="text-[#7c3aed] hover:underline text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More
                  <span>→</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 mb-4">No resources found in this category.</p>
            <button onClick={() => setSelectedCategory("All")} className="text-[#7c3aed] hover:underline">
              View all resources
            </button>
          </motion.div>
        )}

        {/* Saved Resources Section */}
        {savedResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-[#1e1b4b] mb-4">
              Your Saved Resources ({savedResources.length})
            </h2>
            <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#38bdf8]/10 rounded-3xl p-6">
              <p className="text-sm text-gray-600">
                Access your saved resources anytime from your profile.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-3xl shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl text-[#1e1b4b] mb-3">Looking for Something Specific?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you need? Let us know what resources would be helpful for you.
          </p>
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-3 rounded-full transition-all shadow-lg">
            Request a Resource
          </button>
        </motion.div>
      </div>
    </div>
  );
}
