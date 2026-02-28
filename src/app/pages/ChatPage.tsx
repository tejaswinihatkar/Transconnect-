import { useState, useEffect } from "react";
import { Send, Paperclip, Smile, Lock, Users, Plus, ShieldAlert } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CrisisButton } from "../components/CrisisButton";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";
import { useLanguage } from "../i18n/LanguageContext";

interface Message {
  id: string;
  sender_id: string;
  text: string;
  created_at: string;
}

interface Community {
  id: string;
  emoji: string;
  name: string;
  description: string;
  weeklySearches?: string;
  members?: string;
  moderated?: boolean;
}

const communityStorageKey = "astitva_custom_communities";
const joinedStorageKey = "astitva_joined_communities";
const legacyCommunityStorageKey = "transconnect_custom_communities";
const legacyJoinedStorageKey = "transconnect_joined_communities";

const defaultCommunities: Community[] = [
  {
    id: "hrt-support",
    emoji: "🏥",
    name: "HRT Support",
    description: "Hormone therapy questions, side effects, and emotional support.",
    weeklySearches: "500+ weekly searches",
    members: "2.4k",
  },
  {
    id: "exam-prep",
    emoji: "🎓",
    name: "Exam Prep",
    description: "JEE, UPSC, SSC, and other exam strategy discussions.",
    weeklySearches: "High activity",
    members: "1.8k",
  },
  {
    id: "job-hunting",
    emoji: "💼",
    name: "Job Hunting",
    description: "Resume help, interviews, openings, and career support.",
    weeklySearches: "Growing fast",
    members: "1.2k",
  },
  {
    id: "coming-out-stories",
    emoji: "🌈",
    name: "Coming Out Stories",
    description: "Share experiences and learn from the community journey.",
    weeklySearches: "Popular",
    members: "2.9k",
  },
  {
    id: "family-issues",
    emoji: "🏠",
    name: "Family Issues",
    description: "Safe discussions around family acceptance and boundaries.",
    weeklySearches: "Support focused",
    members: "1.5k",
  },
  {
    id: "legal-help",
    emoji: "💊",
    name: "Legal Help (Name Change)",
    description: "Documentation, name/gender marker updates, and rights support.",
    weeklySearches: "Steady demand",
    members: "1.1k",
  },
  {
    id: "talent-showcase",
    emoji: "🎨",
    name: "Talent Showcase",
    description: "Creators, freelancers, and portfolio sharing for visibility.",
    weeklySearches: "Creator hub",
    members: "900",
  },
  {
    id: "crisis-support",
    emoji: "🚨",
    name: "Crisis Support",
    description: "Emergency emotional support room with moderation priority.",
    weeklySearches: "Sensitive room",
    members: "700",
    moderated: true,
  },
];

export function ChatPage() {
  const { t } = useLanguage();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [communities, setCommunities] = useState<Community[]>(defaultCommunities);
  const [activeCommunityId, setActiveCommunityId] = useState(defaultCommunities[0].id);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDescription, setNewCommunityDescription] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  useEffect(() => {
    const customRaw = localStorage.getItem(communityStorageKey);
    const joinedRaw = localStorage.getItem(joinedStorageKey);
    const legacyCustomRaw = localStorage.getItem(legacyCommunityStorageKey);
    const legacyJoinedRaw = localStorage.getItem(legacyJoinedStorageKey);
    const finalCustomRaw = customRaw || legacyCustomRaw;
    const finalJoinedRaw = joinedRaw || legacyJoinedRaw;

    if (!customRaw && legacyCustomRaw) {
      localStorage.setItem(communityStorageKey, legacyCustomRaw);
      localStorage.removeItem(legacyCommunityStorageKey);
    }
    if (!joinedRaw && legacyJoinedRaw) {
      localStorage.setItem(joinedStorageKey, legacyJoinedRaw);
      localStorage.removeItem(legacyJoinedStorageKey);
    }

    if (finalCustomRaw) {
      const custom = JSON.parse(finalCustomRaw) as Community[];
      setCommunities([...defaultCommunities, ...custom]);
    }
    if (finalJoinedRaw) {
      setJoinedCommunities(JSON.parse(finalJoinedRaw));
    }
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

  const activeCommunity = communities.find((c) => c.id === activeCommunityId) || communities[0];
  const isJoined = joinedCommunities.includes(activeCommunity.id);
  const roomTag = `[${activeCommunity.name}]`;
  const roomMessages = messages.filter((message) => message.text.startsWith(roomTag));

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !isJoined) return;

    await supabase.from("messages").insert([
      {
        sender_id: currentUserId ?? "user",
        text: `${roomTag} ${messageText.trim()}`,
      },
    ]);
    setMessageText("");
  };

  const handleJoinCommunity = () => {
    if (isJoined) return;
    const updated = [...joinedCommunities, activeCommunity.id];
    setJoinedCommunities(updated);
    localStorage.setItem(joinedStorageKey, JSON.stringify(updated));
  };

  const handleCreateCommunity = () => {
    if (!newCommunityName.trim()) return;
    const customCommunity: Community = {
      id: `custom-${Date.now()}`,
      emoji: "🧩",
      name: newCommunityName.trim(),
      description:
        newCommunityDescription.trim() || "Community created by members for shared support.",
      weeklySearches: "New",
      members: "1",
    };

    const updated = [...communities, customCommunity];
    setCommunities(updated);
    const customOnly = updated.filter((c) => c.id.startsWith("custom-"));
    localStorage.setItem(communityStorageKey, JSON.stringify(customOnly));
    setActiveCommunityId(customCommunity.id);
    setShowCreateForm(false);
    setNewCommunityName("");
    setNewCommunityDescription("");
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
        <div className="hidden lg:block w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[#1e1b4b]">{t("chat.communities")}</h2>
              <button
                onClick={() => setShowCreateForm((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs text-[#7c3aed] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                {t("chat.addCommunity")}
              </button>
            </div>
            {showCreateForm && (
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 space-y-2">
                <input
                  value={newCommunityName}
                  onChange={(e) => setNewCommunityName(e.target.value)}
                  placeholder="Community name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <textarea
                  value={newCommunityDescription}
                  onChange={(e) => setNewCommunityDescription(e.target.value)}
                  placeholder="Short description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] resize-none"
                />
                <button
                  onClick={handleCreateCommunity}
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2 rounded-xl text-sm"
                >
                  {t("common.create")} {t("chat.communities")}
                </button>
              </div>
            )}
          </div>
          <div className="divide-y divide-gray-200">
            {communities.map((community) => (
              <button
                key={community.id}
                onClick={() => setActiveCommunityId(community.id)}
                className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                  community.id === activeCommunityId ? "bg-[#7c3aed]/5" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br from-[#7c3aed] to-[#38bdf8]">
                    <span className="text-lg">{community.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[#1e1b4b] text-sm truncate">{community.name}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{community.members}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{community.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {community.weeklySearches && (
                        <span className="text-[10px] text-gray-500">{community.weeklySearches}</span>
                      )}
                      {community.moderated && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          Moderated
                        </span>
                      )}
                    </div>
                  </div>
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-[#7c3aed] to-[#38bdf8]">
                <span className="text-lg">{activeCommunity.emoji}</span>
              </div>
              <div>
                <h2 className="text-[#1e1b4b]">
                  {activeCommunity.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">
                    {isJoined ? "Joined community" : "Not joined yet"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">End-to-End Encrypted</span>
            </div>
          </div>

          <div className="lg:hidden px-4 py-3 border-b border-gray-200 bg-white">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowCreateForm((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs text-[#7c3aed]"
              >
                <Plus className="w-3.5 h-3.5" />
                {t("chat.addCommunity")}
              </button>
            </div>
            {showCreateForm && (
              <div className="mb-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 space-y-2">
                <input
                  value={newCommunityName}
                  onChange={(e) => setNewCommunityName(e.target.value)}
                  placeholder="Community name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <textarea
                  value={newCommunityDescription}
                  onChange={(e) => setNewCommunityDescription(e.target.value)}
                  placeholder="Short description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] resize-none"
                />
                <button
                  onClick={handleCreateCommunity}
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2 rounded-xl text-sm"
                >
                  {t("common.create")} {t("chat.communities")}
                </button>
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {communities.map((community) => (
                <button
                  key={community.id}
                  onClick={() => setActiveCommunityId(community.id)}
                  className={`whitespace-nowrap px-3 py-2 rounded-full text-xs transition-all ${
                    community.id === activeCommunityId
                      ? "bg-[#7c3aed] text-white"
                      : "bg-gray-100 text-[#1e1b4b]"
                  }`}
                >
                  {community.emoji} {community.name}
                </button>
              ))}
            </div>
          </div>

          {!isJoined && (
            <div className="px-6 py-4 border-b border-gray-200 bg-amber-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-amber-900">
                    Join <strong>{activeCommunity.name}</strong> to start chatting.
                  </p>
                  {activeCommunity.moderated && (
                    <p className="text-xs text-amber-700 inline-flex items-center gap-1 mt-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      This room is actively moderated for safety.
                    </p>
                  )}
                </div>
                <button
                  onClick={handleJoinCommunity}
                  className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-full text-sm"
                >
                  {t("chat.joinCommunity")}
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {roomMessages.map((message) => {
              const isOwnMessage = message.sender_id === currentUserId || message.sender_id === "user";
              const displayText = message.text.replace(`${roomTag} `, "");
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
                    <p className="text-sm">{displayText}</p>
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
            {roomMessages.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500">No messages yet in this room. Start the conversation.</p>
              </div>
            )}
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
                placeholder={
                  isJoined
                    ? `Message ${activeCommunity.name}...`
                    : `Join ${activeCommunity.name} to chat`
                }
                disabled={!isJoined}
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
                disabled={!messageText.trim() || !isJoined}
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
