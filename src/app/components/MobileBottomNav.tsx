import { Link, useLocation } from "react-router";
import { Home, Search, MessageSquare, BookOpen, Stethoscope } from "lucide-react";

export function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Search, label: "Mentors", path: "/mentors" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: BookOpen, label: "Resources", path: "/resources" },
    { icon: Stethoscope, label: "Doctors", path: "/healthcare" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-padding-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-[#7c3aed]" : "text-gray-500"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
