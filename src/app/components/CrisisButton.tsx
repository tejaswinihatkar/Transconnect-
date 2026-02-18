import { useState } from "react";
import { Phone, X, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function CrisisButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickExit = () => {
    window.location.replace("https://www.google.com");
  };

  return (
    <>
      {/* Floating Crisis Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AlertCircle className="w-5 h-5" />
        <span className="font-medium">Crisis</span>
      </motion.button>

      {/* Crisis Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl z-[70] p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#ef4444]/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#ef4444]" />
                </div>
                <div>
                  <h2 className="text-[#1e1b4b] text-xl">Crisis Support</h2>
                  <p className="text-sm text-gray-600">You're not alone. We're here to help.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Call iCall Helpline */}
                <a
                  href="tel:9152987821"
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-4 px-6 rounded-2xl flex items-center gap-3 transition-all shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  <div className="text-left flex-1">
                    <div className="font-medium">Call iCall Helpline</div>
                    <div className="text-sm opacity-90">9152987821</div>
                  </div>
                </a>

                {/* Emergency Services */}
                <a
                  href="tel:100"
                  className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white py-4 px-6 rounded-2xl flex items-center gap-3 transition-all shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  <div className="text-left flex-1">
                    <div className="font-medium">Emergency Services</div>
                    <div className="text-sm opacity-90">100</div>
                  </div>
                </a>

                {/* Crisis Bot */}
                <button className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white py-4 px-6 rounded-2xl flex items-center gap-3 transition-all shadow-lg">
                  <MessageSquare className="w-6 h-6" />
                  <div className="text-left flex-1">
                    <div className="font-medium">Chat with Crisis Bot</div>
                    <div className="text-sm opacity-90">Instant support</div>
                  </div>
                </button>
              </div>

              {/* Quick Exit */}
              <button
                onClick={quickExit}
                className="w-full mt-6 text-gray-600 hover:text-gray-800 py-2 text-sm underline"
              >
                Quick Exit (Leave site immediately)
              </button>

              {/* Info Text */}
              <p className="mt-4 text-xs text-gray-500 text-center">
                All calls and chats are confidential and secure
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
