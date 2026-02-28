import { useMemo, useState } from "react";
import {
  MapPin,
  Star,
  Search,
  Phone,
  Clock,
  Filter,
  Heart,
  ChevronDown,
  ChevronUp,
  Navigation,
  MessageCircle,
  CalendarDays,
  X,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

interface Clinic {
  id: string;
  clinicName: string;
  doctorName: string;
  specialty: "HRT" | "Endocrinology" | "Surgery" | "Therapy";
  rating: number;
  verified: boolean;
  lat: number;
  lng: number;
  distanceKm: number;
  phone: string;
  whatsapp: string;
}

const clinics: Clinic[] = [
  {
    id: "c1",
    clinicName: "Sahara Gender Care Center",
    doctorName: "Dr. Meera Sharma",
    specialty: "HRT",
    rating: 4.9,
    verified: true,
    lat: 19.0821,
    lng: 72.8416,
    distanceKm: 2.1,
    phone: "+91-9876543210",
    whatsapp: "919876543210",
  },
  {
    id: "c2",
    clinicName: "Harmony Endocrine Clinic",
    doctorName: "Dr. Vikram Singh",
    specialty: "Endocrinology",
    rating: 4.7,
    verified: true,
    lat: 19.0648,
    lng: 72.8353,
    distanceKm: 3.4,
    phone: "+91-9988776655",
    whatsapp: "919988776655",
  },
  {
    id: "c3",
    clinicName: "AffirmCare Surgery Unit",
    doctorName: "Dr. Anil Verma",
    specialty: "Surgery",
    rating: 4.5,
    verified: false,
    lat: 19.1023,
    lng: 72.8854,
    distanceKm: 5.8,
    phone: "+91-9123456780",
    whatsapp: "919123456780",
  },
  {
    id: "c4",
    clinicName: "SafeMind Therapy Collective",
    doctorName: "Dr. Sneha Gupta",
    specialty: "Therapy",
    rating: 4.8,
    verified: true,
    lat: 19.0481,
    lng: 72.8192,
    distanceKm: 6.2,
    phone: "+91-9090909090",
    whatsapp: "919090909090",
  },
];

export function HealthcarePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    "All" | "HRT" | "Endocrinology" | "Surgery" | "Therapy"
  >("All");
  const [ratingFilter, setRatingFilter] = useState<"All" | "4+" | "3+">("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [within10Km, setWithin10Km] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.8777 });
  const [zoom, setZoom] = useState(12);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(clinics[0].id);
  const [showModal, setShowModal] = useState(false);
  const [bookingClinic, setBookingClinic] = useState<Clinic | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    name: "",
    contact: "",
  });

  const timeSlots = ["10:00 AM", "11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"];
  const specialties = ["All", "HRT", "Endocrinology", "Surgery", "Therapy"] as const;

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        clinic.clinicName.toLowerCase().includes(q) ||
        clinic.doctorName.toLowerCase().includes(q) ||
        clinic.specialty.toLowerCase().includes(q);
      const matchSpecialty =
        selectedSpecialty === "All" || clinic.specialty === selectedSpecialty;
      const matchRating =
        ratingFilter === "All" ||
        (ratingFilter === "4+" && clinic.rating >= 4) ||
        (ratingFilter === "3+" && clinic.rating >= 3);
      const matchVerified = !verifiedOnly || clinic.verified;
      const matchDistance = !within10Km || clinic.distanceKm <= 10;
      return (
        matchSearch &&
        matchSpecialty &&
        matchRating &&
        matchVerified &&
        matchDistance
      );
    });
  }, [ratingFilter, searchQuery, selectedSpecialty, verifiedOnly, within10Km]);

  const selectedClinic =
    filteredClinics.find((c) => c.id === selectedClinicId) || filteredClinics[0] || null;

  const mapSrc = selectedClinic
    ? `https://www.google.com/maps?q=${selectedClinic.lat},${selectedClinic.lng}&z=${zoom}&output=embed`
    : `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${zoom}&output=embed`;

  const handleMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMapCenter(next);
        setSelectedClinicId(null);
      },
      () => {
        alert("Unable to access your location. Showing Mumbai by default.");
      }
    );
  };

  const openBooking = (clinic: Clinic) => {
    setBookingClinic(clinic);
    setShowModal(true);
    setBookingData({
      date: "",
      time: "",
      name: "",
      contact: "",
    });
    setAnonymous(false);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingClinic) return;
    alert(
      `Appointment request sent to ${bookingClinic.clinicName}.\n\nDoctor: ${bookingClinic.doctorName}\nDate: ${bookingData.date}\nTime: ${bookingData.time}`
    );
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#7c3aed] via-[#7c3aed] to-[#38bdf8] rounded-3xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Google Maps + Appointment Booking
          </div>
          <h1 className="text-3xl font-semibold mb-2">{t("healthcare.title")}</h1>
          <p className="text-white/85 max-w-3xl">
            Find nearby trans-friendly clinics, compare verified providers, and send appointment
            requests in one flow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-3xl shadow-lg p-5 mb-6"
        >
          <div className="grid lg:grid-cols-[1fr,auto] gap-4 items-end">
            <div>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search: HRT clinics near me..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white shadow-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mr-2">
                  <Filter className="w-4 h-4" />
                  Filters:
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value as typeof selectedSpecialty)}
                  className="px-3 py-2 rounded-full border border-gray-300 text-sm"
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s === "All" ? "All Specialties" : s}
                    </option>
                  ))}
                </select>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value as typeof ratingFilter)}
                  className="px-3 py-2 rounded-full border border-gray-300 text-sm"
                >
                  <option value="All">All Ratings</option>
                  <option value="4+">4+ ⭐</option>
                  <option value="3+">3+ ⭐</option>
                </select>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 text-sm bg-white">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  Verified Only
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 text-sm bg-white">
                  <input
                    type="checkbox"
                    checked={within10Km}
                    onChange={(e) => setWithin10Km(e.target.checked)}
                  />
                  Within 10km
                </label>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleMyLocation}
                className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2.5 rounded-full text-sm"
              >
                <Navigation className="w-4 h-4" />
                My Location
              </button>
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-[#1e1b4b] px-4 py-2.5 rounded-full text-sm"
              >
                Clinic List
                {sidebarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6 items-start">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Map View • {filteredClinics.length} clinic{filteredClinics.length !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setZoom((z) => Math.min(18, z + 1))}
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(6, z - 1))}
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                >
                  -
                </button>
              </div>
            </div>
            <div className="relative h-[500px] lg:h-[620px]">
              <iframe
                title="Healthcare Map"
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 right-3 flex gap-2 overflow-x-auto">
                {filteredClinics.map((clinic) => (
                  <button
                    key={clinic.id}
                    onClick={() => setSelectedClinicId(clinic.id)}
                    className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full border ${
                      selectedClinicId === clinic.id
                        ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                        : clinic.verified
                          ? "bg-white text-[#1e1b4b] border-green-200"
                          : "bg-white text-[#1e1b4b] border-red-200"
                    }`}
                  >
                    {clinic.verified ? "🟢" : "🔴"} {clinic.clinicName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`${sidebarOpen ? "block" : "hidden lg:block"} bg-white rounded-3xl shadow-lg lg:sticky lg:top-24`}
          >
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-[#1e1b4b] text-lg">Nearby Clinics</h2>
                <span className="text-xs text-gray-500">
                  {filteredClinics.length} result{filteredClinics.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[68vh] overflow-y-auto">
              {filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className={`rounded-2xl border p-4 ${
                    selectedClinicId === clinic.id
                      ? "border-violet-200 bg-violet-50/40 ring-1 ring-violet-100"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-[#1e1b4b] text-sm leading-tight">{clinic.clinicName}</h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        clinic.verified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {clinic.verified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {clinic.doctorName} • {clinic.specialty}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {clinic.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {clinic.distanceKm} km away
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedClinicId(clinic.id);
                        setMapCenter({ lat: clinic.lat, lng: clinic.lng });
                      }}
                      className="text-xs px-3 py-2 rounded-xl border border-gray-300 hover:border-[#7c3aed]"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => openBooking(clinic)}
                      className="inline-flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-xl bg-[#1e1b4b] text-white hover:bg-[#111031]"
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      Book
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2.5">
                    <a
                      href={`tel:${clinic.phone}`}
                      className="inline-flex items-center justify-center gap-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs px-3 py-2 rounded-xl"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${clinic.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-xl"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-br from-[#f472b6]/10 to-[#38bdf8]/10 rounded-3xl p-6 border border-[#7c3aed]/15"
        >
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#7c3aed] mt-0.5" />
            <div>
              <h3 className="text-[#1e1b4b] mb-1">Community Safety Note</h3>
              <p className="text-sm text-gray-600">
                Verified clinics are reviewed by our community. For urgent emergencies, call 112
                or your nearest hospital.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {showModal && bookingClinic && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] p-4 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl text-[#1e1b4b]">Book Appointment</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Doctor Name</label>
                <input
                  value={bookingClinic.doctorName}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-gray-50"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Time</label>
                  <select
                    required
                    value={bookingData.time}
                    onChange={(e) =>
                      setBookingData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                Book anonymously
              </label>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  required={!anonymous}
                  disabled={anonymous}
                  value={anonymous ? "Anonymous" : bookingData.name}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl disabled:bg-gray-50"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone or Email</label>
                <input
                  required
                  value={bookingData.contact}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, contact: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                  placeholder="For confirmation"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-full inline-flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
