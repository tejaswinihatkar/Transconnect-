import { useState } from "react";
import { MapPin, Star, Shield, Search } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { doctors } from "../data/mockData";

export function HealthcarePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl text-[#1e1b4b] mb-2">Healthcare Directory</h1>
          <p className="text-gray-600">Trans-friendly doctors and healthcare providers in India</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, specialty, or location..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white shadow-sm"
            />
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#7c3aed]/10 to-[#38bdf8]/10 rounded-3xl p-6 mb-8 border border-[#7c3aed]/20"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-[#7c3aed] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-[#1e1b4b] mb-1">All Verified Healthcare Providers</h3>
              <p className="text-sm text-gray-600">
                Every doctor listed here has been verified by our community and is committed to providing judgment-free,
                trans-friendly care.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <p className="text-gray-600">
            {filteredDoctors.length} provider{filteredDoctors.length !== 1 ? "s" : ""} found
          </p>
        </motion.div>

        {/* Doctor Cards */}
        <div className="space-y-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="grid md:grid-cols-[1fr,auto] gap-6">
                {/* Left Content */}
                <div>
                  {/* Doctor Info */}
                  <div className="mb-4">
                    <h2 className="text-[#1e1b4b] mb-1">{doctor.name}</h2>
                    <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 bg-[#7c3aed]/10 text-[#7c3aed] px-3 py-1 rounded-full text-sm"
                      >
                        <Shield className="w-3 h-3" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Review Snippet */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-600 italic">"{doctor.reviewSnippet}"</p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex md:flex-col gap-3 md:justify-center">
                  <button className="flex-1 md:flex-none bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3 rounded-full transition-all shadow-md whitespace-nowrap">
                    Book Appointment
                  </button>
                  <button className="flex-1 md:flex-none bg-white hover:bg-gray-50 text-[#1e1b4b] px-6 py-3 rounded-full border border-gray-300 transition-all whitespace-nowrap">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 mb-4">No healthcare providers found matching your search.</p>
            <button onClick={() => setSearchQuery("")} className="text-[#7c3aed] hover:underline">
              Clear search
            </button>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-[#f472b6] to-[#38bdf8] rounded-3xl p-8 text-center"
        >
          <h2 className="text-2xl text-white mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Help us grow our directory by suggesting trans-friendly healthcare providers in your area.
          </p>
          <button className="bg-white hover:bg-gray-100 text-[#7c3aed] px-8 py-3 rounded-full transition-all shadow-lg">
            Suggest a Provider
          </button>
        </motion.div>
      </div>
    </div>
  );
}
