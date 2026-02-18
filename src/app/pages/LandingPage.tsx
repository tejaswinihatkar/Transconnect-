import { Link } from "react-router";
import { Shield, Lock, UserCheck, Heart, MessageSquare, BookOpen, Stethoscope } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { motion } from "motion/react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar isPublic={true} />
      <CrisisButton />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl text-[#1e1b4b] mb-6">
              Your Identity,
              <br />
              <span className="bg-gradient-to-r from-[#f472b6] to-[#38bdf8] bg-clip-text text-transparent">
                Your Safe Space
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              India's verified community for trans individuals. Connect with mentors, access resources, and find
              support on your journey.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <UserCheck className="w-5 h-5 text-[#7c3aed]" />
                <span className="text-sm text-[#1e1b4b]">Verified Mentors</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Lock className="w-5 h-5 text-[#7c3aed]" />
                <span className="text-sm text-[#1e1b4b]">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Shield className="w-5 h-5 text-[#7c3aed]" />
                <span className="text-sm text-[#1e1b4b]">Anonymous</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-3.5 rounded-full transition-all shadow-lg"
              >
                Join Community
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-[#1e1b4b] px-8 py-3.5 rounded-full border border-gray-300 transition-all"
              >
                Log In
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1580471260419-99745668af23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91bmclMjBJbmRpYW4lMjBwZW9wbGUlMjBjb25uZWN0aW5nJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MTEzODkxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Diverse Indian community connecting"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-gradient-to-br from-[#f472b6] to-[#38bdf8] rounded-3xl opacity-20"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#1e1b4b] mb-4">Everything You Need, All in One Place</h2>
            <p className="text-gray-600">Comprehensive support for your journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#f472b6]/10 to-[#38bdf8]/10 p-6 rounded-3xl"
            >
              <div className="w-12 h-12 bg-[#7c3aed] rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">Find Mentors</h3>
              <p className="text-sm text-gray-600">
                Connect with verified mentors who understand your journey and can guide you.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-[#7c3aed]/10 to-[#f472b6]/10 p-6 rounded-3xl"
            >
              <div className="w-12 h-12 bg-[#38bdf8] rounded-2xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">Safe Community</h3>
              <p className="text-sm text-gray-600">
                Join encrypted chat groups and connect with others in a judgment-free space.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-[#38bdf8]/10 to-[#7c3aed]/10 p-6 rounded-3xl"
            >
              <div className="w-12 h-12 bg-[#f472b6] rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">Resources</h3>
              <p className="text-sm text-gray-600">
                Access guides on HRT, legal name change, mental health, and more.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#f472b6]/10 to-[#38bdf8]/10 p-6 rounded-3xl"
            >
              <div className="w-12 h-12 bg-[#7c3aed] rounded-2xl flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1e1b4b] mb-2">Healthcare</h3>
              <p className="text-sm text-gray-600">
                Find trans-friendly doctors and healthcare providers near you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] rounded-3xl p-8 lg:p-12 text-center"
        >
          <h2 className="text-3xl text-white mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of trans individuals across India who have found support, friendship, and guidance on
            TransConnect.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white hover:bg-gray-100 text-[#7c3aed] px-8 py-3.5 rounded-full transition-all shadow-lg"
          >
            Get Started - It's Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e1b4b] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/80">
            © 2026 TransConnect. Your identity, your safe space. All communications are encrypted.
          </p>
        </div>
      </footer>
    </div>
  );
}
