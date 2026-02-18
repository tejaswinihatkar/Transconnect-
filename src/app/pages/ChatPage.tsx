import { useState } from "react";
import { useParams } from "react-router";
import { Send, Paperclip, Smile, Lock } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { mentors } from "../data/mockData";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export function ChatPage() {
  const { mentorId } = useParams();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: mentorId || "1",
      text: "Hi! Thanks for reaching out. How can I help you today?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      senderId: "user",
      text: "Hi! I'm looking for guidance on starting HRT. I'm not sure where to begin.",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      senderId: mentorId || "1",
      text: "That's a great question! I'd be happy to share my experience. First, have you consulted with an endocrinologist?",
      timestamp: "10:33 AM",
    },
  ]);

  const activeMentor = mentors.find((m) => m.id === mentorId) || mentors[0];

  const chats = [
    { ...mentors[0], lastMessage: "That sounds great! Let's connect tomorrow.", time: "2m ago", unread: 2 },
    { ...mentors[1], lastMessage: "Thank you for your help!", time: "1h ago", unread: 0 },
    { ...mentors[2], lastMessage: "I'll send you those resources.", time: "3h ago", unread: 0 },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "user",
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessageText("");

      // Simulate mentor response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: mentorId || "1",
          text: "I understand. Let me share some resources that might help you.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, response]);
      }, 1500);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] pb-16 md:pb-0">
      <Navbar isPublic={false} />
      <CrisisButton />
      <MobileBottomNav />

      <div className="flex-1 overflow-hidden flex">
        {/* Chat List - Desktop */}
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[#1e1b4b]">Messages</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {chats.map((chat) => (
              <button
                key={chat.id}
                className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                  chat.id === mentorId ? "bg-[#7c3aed]/5" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${chat.gradientFrom}, ${chat.gradientTo})`,
                    }}
                  >
                    {chat.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[#1e1b4b] text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-[#7c3aed] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white">{chat.unread}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{
                  background: `linear-gradient(135deg, ${activeMentor.gradientFrom}, ${activeMentor.gradientTo})`,
                }}
              >
                {activeMentor.initials}
              </div>
              <div>
                <h2 className="text-[#1e1b4b]">{activeMentor.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">End-to-End Encrypted</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.senderId === "user"
                      ? "bg-[#7c3aed] text-white"
                      : "bg-gray-100 text-[#1e1b4b]"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.senderId === "user" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-white"
              />
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
