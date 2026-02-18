import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { mentors } from "../data/mockData";

export function MentorDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = ["Medical Transition", "Coming Out", "Career", "Legal", "Mental Health", "Family Support"];

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters =
      selectedFilters.length === 0 || selectedFilters.some((filter) => mentor.topics.includes(filter));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl text-[#1e1b4b] mb-2">Find Your Mentor</h1>
          <p className="text-gray-600">Connect with verified mentors who understand your journey</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, language, or topic..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white shadow-sm"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-5 h-5 text-[#1e1b4b]" />
            <h2 className="text-[#1e1b4b]">Filter by Topic</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedFilters.includes(filter)
                    ? "bg-[#7c3aed] text-white shadow-lg"
                    : "bg-white text-[#1e1b4b] border border-gray-300 hover:border-[#7c3aed]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          {selectedFilters.length > 0 && (
            <button
              onClick={() => setSelectedFilters([])}
              className="mt-3 text-sm text-[#7c3aed] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <p className="text-gray-600">
            Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Mentor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              {/* Avatar & Info */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${mentor.gradientFrom}, ${mentor.gradientTo})`,
                  }}
                >
                  {mentor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
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

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.topics.map((topic) => (
                  <span key={topic} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>

              {/* Languages & City */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Languages:</span> {mentor.languages.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {mentor.city}
                </p>
              </div>

              {/* Action Button */}
              <Link
                to={`/chat/${mentor.id}`}
                className="block w-full text-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Request Chat
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 mb-4">No mentors found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilters([]);
              }}
              className="text-[#7c3aed] hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
