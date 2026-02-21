import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Send, Paperclip, Smile, Lock } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";
import type { Mentor } from "../data/mockData";

interface Message {
  id: string;
  sender_id: string;
  text: string;
  created_at: string;
  mentor_id?: string;
}

export function ChatPage() {
  const { mentorId } = useParams();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMentor, setActiveMentor] = useState<Mentor | null>(null);
  const [chatMentors, setChatMentors] = useState<Mentor[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  useEffect(() => {
    const fetchMentor = async () => {
      if (!mentorId) return;
      const { data } = await supabase
        .from("mentors")
        .select("*")
        .eq("id", mentorId)
        .single();
      if (data) setActiveMentor(data);
    };
    fetchMentor();
  }, [mentorId]);

  useEffect(() => {
    const fetchChatMentors = async () => {
      const { data } = await supabase.from("mentors").select("*").limit(3);
      if (data) setChatMentors(data);
    };
    fetchChatMentors();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
    };
    getMessages();

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const chats = chatMentors.map((m, i) => ({
    ...m,
    lastMessage: i === 0 ? "That sounds great! Let's connect tomorrow." : i === 1 ? "Thank you for your help!" : "I'll send you those resources.",
    time: i === 0 ? "2m ago" : i === 1 ? "1h ago" : "3h ago",
    unread: i === 0 ? 2 : 0,
  }));

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    await supabase.from("messages").insert([
      {
        sender_id: currentUserId ?? "user",
        text: messageText,
        mentor_id: mentorId,
      },
    ]);
    setMessageText("");
  };

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
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
              {activeMentor ? (
                <>
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
                </>
              ) : (
                <div className="text-gray-400 text-sm">Loading...</div>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">End-to-End Encrypted</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => {
              const isOwnMessage = message.sender_id === currentUserId || message.sender_id === "user";
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      isOwnMessage
                        ? "bg-[#7c3aed] text-white"
                        : "bg-gray-100 text-[#1e1b4b]"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwnMessage ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.created_at)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
