import React from "react";
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
  HeartHandshake,
  Sparkles,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark,
  Calendar,
  Layers,
  MapPin,
  Download,
  CheckCircle2
} from "lucide-react";
import { TabType } from "../types";

interface AppSidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isFounderLoggedIn: boolean;
  isInstalled?: boolean;
  onOpenInstallModal?: () => void;
}

interface NavItem {
  id: TabType;
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  badge?: string;
  highlight?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  isFounderLoggedIn,
  isInstalled = false,
  onOpenInstallModal
}) => {
  const mainNavItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      sublabel: "Verse of the Day",
      icon: Home
    },
    {
      id: "bible",
      label: "Holy Bible",
      sublabel: "6 Major Translations",
      icon: BookOpen,
      badge: "6 Ver."
    },
    {
      id: "spiritual_places",
      label: "Spiritual Places",
      sublabel: "Scripture Sanctuaries",
      icon: Compass,
      badge: "Places"
    },
    {
      id: "apostle_math",
      label: "ApostleMath",
      sublabel: "Mathematical Analogies",
      icon: Calculator,
      badge: "Axioms"
    },
    {
      id: "mathema_sermons",
      label: "MathemaSermons",
      sublabel: "Homiletics & Pulpit Series",
      icon: Mic,
      badge: "Sermons"
    },
    {
      id: "rhema",
      label: "Rhema Word",
      sublabel: "Now Word of God",
      icon: Zap,
      badge: "Living"
    },
    {
      id: "joy_overcoming",
      label: "Joy of the Lord",
      sublabel: "Overcoming Challenges",
      icon: Flame,
      badge: "Strength"
    },
    {
      id: "hymnals",
      label: "Christian Hymnals",
      sublabel: "Old Spirituals & Classics",
      icon: Music,
      badge: "Hymns"
    },
    {
      id: "library",
      label: "Christian Library",
      sublabel: "Books, Classics & Audio",
      icon: Library
    },
    {
      id: "prayer",
      label: "Prayer Studio",
      sublabel: "Devotions & AI Prayers",
      icon: HeartHandshake
    },
    {
      id: "quotes",
      label: "Quotes & Wisdom",
      sublabel: "Nehemiah 8:10 & Principles",
      icon: Sparkles,
      badge: "Wisdom"
    },
    {
      id: "doctrines",
      label: "Doctrinal Pillars",
      sublabel: "Grounded Apostolic Truth",
      icon: Layers,
      badge: "Truth"
    }
  ];

  const handleItemClick = (tabId: TabType) => {
    onSelectTab(tabId);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#16235A] text-white border-r border-[#24357D] select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div
          onClick={() => handleItemClick("home")}
          className="flex items-center gap-3 cursor-pointer overflow-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B48C35] to-[#DCC398] flex items-center justify-center text-[#16235A] font-serif font-black text-lg shadow-md shrink-0">
            ✝
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="font-serif font-bold text-sm tracking-wide text-white leading-tight truncate">
                The Joy of the Lord
              </h1>
              <p className="text-[10px] text-[#DCC398] font-mono tracking-wider truncate">
                by Bismark Twum
              </p>
            </div>
          )}
        </div>

        {/* Mobile close button / Desktop collapse button */}
        <div className="flex items-center">
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation Links Scroll Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-white/20">
        {!isCollapsed && (
          <div className="px-2 pt-2 pb-1 text-[10px] font-mono font-bold tracking-widest text-[#DCC398] uppercase">
            Spiritual Pillars & Navigation
          </div>
        )}

        {mainNavItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer group ${
                isActive
                  ? "bg-gradient-to-r from-[#B48C35] to-[#996515] text-white shadow-md font-semibold"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-slate-300 group-hover:text-[#DCC398] group-hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-xs font-serif leading-tight truncate">{item.label}</p>
                    {item.sublabel && (
                      <p
                        className={`text-[10px] truncate ${
                          isActive ? "text-amber-100" : "text-slate-400"
                        }`}
                      >
                        {item.sublabel}
                      </p>
                    )}
                  </div>
                  {item.badge && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase shrink-0 ${
                        isActive
                          ? "bg-black/25 text-white"
                          : "bg-white/10 text-[#DCC398]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Install App Trigger & Founder / About Creator Bottom Section */}
      <div className="p-3 border-t border-white/10 bg-black/20 space-y-1.5">
        {onOpenInstallModal && (
          <button
            onClick={onOpenInstallModal}
            title={isCollapsed ? (isInstalled ? "App Installed" : "Install App") : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              isInstalled
                ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/20"
                : "bg-gradient-to-r from-[#B48C35]/30 to-[#996515]/30 text-amber-200 hover:bg-white/10 hover:text-white border border-[#B48C35]/40"
            }`}
          >
            <div className="p-1.5 rounded-lg bg-white/10 text-white shrink-0">
              {isInstalled ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Download className="w-4 h-4 text-[#DCC398]" />
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-bold font-serif truncate">
                  {isInstalled ? "App Installed ✓" : "Install App"}
                </p>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  {isInstalled ? "Standalone Mode Active" : "iOS • Android • Windows • Mac"}
                </p>
              </div>
            )}
          </button>
        )}

        <button
          onClick={() => handleItemClick("creator")}
          title={isCollapsed ? (isFounderLoggedIn ? "Admin Portal Active" : "About Creator") : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
            currentTab === "creator"
              ? "bg-[#B48C35] text-white font-bold"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
            {isFounderLoggedIn ? <User className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#FBBF24]" />}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <p className="text-xs font-serif font-bold truncate">
                  {isFounderLoggedIn ? "Admin Portal Active" : "About Creator"}
                </p>
                {isFounderLoggedIn && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                Bismark Twum
              </p>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Vertical Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 ease-in-out h-screen sticky top-0 z-30 ${
          isCollapsed ? "w-18" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
