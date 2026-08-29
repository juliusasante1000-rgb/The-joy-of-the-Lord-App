import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Compass,
  Calculator,
  Mic,
  Zap,
  Flame,
  Music,
  Library,
  User,
  HeartHandshake,
  Sparkles,
  Layers,
  Menu,
  X
} from "lucide-react";
import { TabType } from "../types";

export type NavTab = TabType;

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenMore?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, onOpenMore }) => {
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  // Primary mobile bottom navigation items
  const primaryTabs = [
    { id: "home" as TabType, label: "Home", icon: Home },
    { id: "bible" as TabType, label: "Bible", icon: BookOpen },
    { id: "spiritual_places" as TabType, label: "Places", icon: Compass },
    { id: "apostle_math" as TabType, label: "Math", icon: Calculator },
    { id: "hymnals" as TabType, label: "Hymns", icon: Music },
  ];

  // Overflow tabs accessible via More button
  const overflowTabs = [
    { id: "mathema_sermons" as TabType, label: "MathemaSermons", sublabel: "Pulpit Series", icon: Mic },
    { id: "rhema" as TabType, label: "Rhema Word", sublabel: "Living Revelation", icon: Zap },
    { id: "joy_overcoming" as TabType, label: "Joy of the Lord", sublabel: "Overcoming Trials", icon: Flame },
    { id: "prayer" as TabType, label: "Prayer Studio", sublabel: "Devotions & Altar", icon: HeartHandshake },
    { id: "library" as TabType, label: "Christian Library", sublabel: "Books & Classics", icon: Library },
    { id: "quotes" as TabType, label: "Daily Quotes", sublabel: "Spiritual Wisdom", icon: Sparkles },
    { id: "doctrines" as TabType, label: "Doctrinal Pillars", sublabel: "Apostolic Truth", icon: Layers },
    { id: "creator" as TabType, label: "About Founder", sublabel: "Bismark Twum", icon: User },
  ];

  const isPrimaryActive = primaryTabs.some((t) => {
    return activeTab === t.id ||
      (t.id === "spiritual_places" && activeTab === "places") ||
      (t.id === "apostle_math" && activeTab === "math");
  });

  const isOverflowActive = !isPrimaryActive;

  const handleMoreClick = () => {
    if (onOpenMore) {
      onOpenMore();
    } else {
      setIsMoreSheetOpen(true);
    }
  };

  const handleSelectTab = (tabId: TabType) => {
    onTabChange(tabId);
    setIsMoreSheetOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Quick More Bottom Sheet Modal (Fallback if drawer not open) */}
      {isMoreSheetOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="flex-1"
            onClick={() => setIsMoreSheetOpen(false)}
          />
          <div className="bg-[#16235A] text-white rounded-t-3xl border-t border-[#B48C35]/40 shadow-2xl p-5 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B48C35] animate-pulse" />
                <h3 className="font-serif font-bold text-base text-white tracking-wide">
                  Spiritual Pillars & Navigation
                </h3>
              </div>
              <button
                onClick={() => setIsMoreSheetOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {overflowTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id ||
                  (tab.id === "library" && activeTab === "books") ||
                  (tab.id === "creator" && activeTab === "about");

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#B48C35] to-[#996515] text-white font-bold shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-slate-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-white/10 text-[#DCC398]"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-serif leading-tight truncate">{tab.label}</p>
                      <p className={`text-[10px] truncate ${isActive ? "text-amber-100" : "text-slate-400"}`}>
                        {tab.sublabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Ergonomic Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E0F0] transition-colors pb-safe shadow-lg">
        <div className="max-w-md mx-auto px-2 py-1 flex items-center justify-around h-15">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              activeTab === tab.id ||
              (tab.id === "spiritual_places" && activeTab === "places") ||
              (tab.id === "apostle_math" && activeTab === "math");

            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer select-none ${
                  isActive ? "text-[#16235A]" : "text-slate-500 hover:text-[#16235A]"
                }`}
              >
                <div className={`relative px-3 py-1 rounded-full transition-all duration-150 ${
                  isActive ? "bg-[#B48C35]/15 text-[#16235A]" : "text-slate-500"
                }`}>
                  <Icon
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isActive ? "scale-110 stroke-[2.4] text-[#B48C35]" : "stroke-[1.8]"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B48C35]" />
                  )}
                </div>

                <span
                  className={`text-[10px] tracking-tight text-center font-medium leading-none ${
                    isActive ? "text-[#16235A] font-bold" : "text-slate-500"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* More / Menu Button */}
          <button
            id="nav-tab-more"
            onClick={handleMoreClick}
            className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer select-none ${
              isOverflowActive ? "text-[#16235A]" : "text-slate-500 hover:text-[#16235A]"
            }`}
            title="Explore all modules and pillars"
          >
            <div className={`relative px-3 py-1 rounded-full transition-all duration-150 ${
              isOverflowActive ? "bg-[#B48C35]/15 text-[#16235A]" : "text-slate-500"
            }`}>
              <Menu
                className={`w-4 h-4 transition-transform duration-150 ${
                  isOverflowActive ? "scale-110 stroke-[2.4] text-[#B48C35]" : "stroke-[1.8]"
                }`}
              />
              {isOverflowActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B48C35]" />
              )}
            </div>

            <span
              className={`text-[10px] tracking-tight text-center font-medium leading-none ${
                isOverflowActive ? "text-[#16235A] font-bold" : "text-slate-500"
              }`}
            >
              {isOverflowActive ? "Pillars" : "More"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

