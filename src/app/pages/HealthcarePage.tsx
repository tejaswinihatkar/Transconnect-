import { useState } from "react";
import {
  MapPin,
  Star,
  Shield,
  Search,
  Stethoscope,
  Phone,
  Clock,
  CheckCircle,
  Filter,
  ChevronRight,
  Heart,
  Award,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { doctors } from "../data/mockData";

const specialtyColors: Record<string, { bg: string; text: string; gradient: string }> = {
  Endocrinologist: { bg: "bg-violet-100", text: "text-violet-700", gradient: "from-[#7c3aed] to-[#a78bfa]" },
  Psychiatrist: { bg: "bg-sky-100", text: "text-sky-700", gradient: "from-[#0ea5e9] to-[#38bdf8]" },
  "General Physician": { bg: "bg-emerald-100", text: "text-emerald-700", gradient: "from-[#10b981] to-[#34d399]" },
  "Plastic Surgeon": { bg: "bg-pink-100", text: "text-pink-700", gradient: "from-[#ec4899] to-[#f472b6]" },
  Psychologist: { bg: "bg-amber-100", text: "text-amber-700", gradient: "from-[#f59e0b] to-[#fbbf24]" },
};

const defaultColor = { bg: "bg-gray-100", text: "text-gray-700", gradient: "from-[#7c3aed] to-[#38bdf8]" };

function getInitials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function HealthcarePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = ["All", ...Array.from(new Set(doctors.map((d) => d.specialty)))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  const stats = [
    { value: `${doctors.length}+`, label: "Verified Providers", icon: CheckCircle },
    { value: `${new Set(doctors.map((d) => d.location.split(",")[1]?.trim())).size}+`, label: "States Covered", icon: MapPin },
    { value: `${specialties.length - 1}`, label: "Specialties", icon: Stethoscope },
    { value: "4.8", label: "Avg Rating", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#7c3aed] via-[#7c3aed] to-[#38bdf8] rounded-3xl shadow-xl p-8 lg:p-10 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative grid lg:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-white/80 bg-white/10 px-3 py-1 rounded-full">
                  Community Verified
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl text-white font-semibold mb-3">
                Healthcare Directory
              </h1>
              <p className="text-white/80 text-lg max-w-xl">
                Find trans-friendly doctors and healthcare providers across India,
                verified by our community for judgment-free care.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[120px]"
                  >
                    <Icon className="w-5 h-5 text-white/70 mx-auto mb-1" />
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">
                In a medical emergency, call 112 or go to your nearest hospital.
              </p>
              <p className="text-xs text-red-600">
                Vandrevala Foundation Helpline: 1860-2662-345 (24/7)
              </p>
            </div>
          </div>
          <a
            href="tel:112"
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition-all flex-shrink-0"
          >
            Call 112
          </a>
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
              placeholder="Search by doctor name, specialty, or location..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white shadow-sm"
            />
          </div>
        </motion.div>

        {/* Specialty Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-5 h-5 text-[#1e1b4b]" />
            <h2 className="text-[#1e1b4b]">Filter by Specialty</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedSpecialty === specialty
                    ? "bg-[#7c3aed] text-white shadow-lg"
                    : "bg-white text-[#1e1b4b] border border-gray-300 hover:border-[#7c3aed]"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
          {selectedSpecialty !== "All" && (
            <button
              onClick={() => setSelectedSpecialty("All")}
              className="mt-3 text-sm text-[#7c3aed] hover:underline"
            >
              Clear filter
            </button>
          )}
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#7c3aed]/5 to-[#38bdf8]/5 border border-[#7c3aed]/15 rounded-2xl p-5 mb-8 flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-[#7c3aed]" />
          </div>
          <div>
            <h3 className="text-[#1e1b4b] font-medium mb-1">All Providers Are Community Verified</h3>
            <p className="text-sm text-gray-600">
              Every healthcare provider listed has been reviewed by our community and is committed
              to providing respectful, judgment-free, trans-affirming care.
            </p>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            {filteredDoctors.length} provider{filteredDoctors.length !== 1 ? "s" : ""} found
            {selectedSpecialty !== "All" && (
              <span className="text-[#7c3aed]"> in {selectedSpecialty}</span>
            )}
          </p>
        </motion.div>

        {/* Doctor Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor, index) => {
            const colors = specialtyColors[doctor.specialty] || defaultColor;
            const initials = getInitials(doctor.name);

            return (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header: Avatar + Info */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xl font-semibold flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h2 className="text-lg text-[#1e1b4b] font-medium">{doctor.name}</h2>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                          {doctor.specialty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-[#1e1b4b]">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 bg-[#7c3aed]/8 text-[#7c3aed] px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        <Award className="w-3 h-3" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Review */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-3.5 h-3.5 text-[#f472b6]" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Community Review
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "{doctor.reviewSnippet}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 rounded-full transition-all shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      Book Appointment
                    </button>
                    <button className="flex-1 bg-white hover:bg-gray-50 text-[#1e1b4b] py-3 rounded-full border border-gray-300 hover:border-[#7c3aed] transition-all text-sm font-medium flex items-center justify-center gap-2">
                      View Profile
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2 text-lg">No providers found</p>
            <p className="text-gray-400 text-sm mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("All");
              }}
              className="text-[#7c3aed] hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-br from-[#f472b6] to-[#38bdf8] rounded-3xl p-8 lg:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2 translate-x-1/3" />

          <div className="relative">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-white font-semibold mb-3">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Help us grow our directory by suggesting trans-friendly healthcare
              providers in your area. Every contribution makes a difference.
            </p>
            <button className="bg-white hover:bg-gray-100 text-[#7c3aed] px-8 py-3.5 rounded-full transition-all shadow-lg font-medium">
              Suggest a Provider
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
