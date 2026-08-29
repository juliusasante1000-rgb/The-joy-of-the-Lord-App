import React, { useState } from "react";
import {
  Sunrise,
  Sun,
  Moon,
  Sparkles,
  Clock,
  Bookmark,
  Flame,
  RotateCcw,
  Menu,
  Download,
  CheckCircle2,
  WifiOff,
  Volume2,
  VolumeX,
  Zap
} from "lucide-react";
import { TimeScheduleState, DevotionEdition } from "../types";
import { AppLogo } from "./AppLogo";
import { getIsFastMode, setIsFastMode } from "../utils/aiStreaming";

interface HeaderProps {
  scheduleState: TimeScheduleState;
  onSelectEditionPreview: (edition: DevotionEdition) => void;
  onResetTime: () => void;
  streakDays: number;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenScheduleModal: () => void;
  onOpenMobileMenu?: () => void;
  isInstalled?: boolean;
  isOnline?: boolean;
  onOpenInstallModal?: () => void;
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  scheduleState,
  onSelectEditionPreview,
  onResetTime,
  streakDays,
  bookmarksCount,
  onOpenBookmarks,
  onOpenScheduleModal,
  onOpenMobileMenu,
  isInstalled = false,
  isOnline = true,
  onOpenInstallModal,
  isSpeaking = false,
  onStopSpeaking
}) => {
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [isFast, setIsFast] = useState(() => getIsFastMode());
  const { activeEdition, activeBadge, formattedTime, isSimulatedTime } = scheduleState;

  const handleToggleFastMode = () => {
    const nextVal = !isFast;
    setIsFast(nextVal);
    setIsFastMode(nextVal);
  };

  const getBadgeIcon = () => {
    switch (activeEdition) {
      case "morning":
        return <Sunrise className="w-3.5 h-3.5 text-white" />;
      case "afternoon":
        return <Sun className="w-3.5 h-3.5 text-white" />;
      case "evening":
        return <Moon className="w-3.5 h-3.5 text-white" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#16235A] text-white shadow-lg transition-colors border-b border-[#24357D]">
      {/* Brand Triple Gradient Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Mobile Drawer Trigger & Custom Personal Brand Logo */}
        <div className="flex items-center gap-2 min-w-0">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Open vertical menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <AppLogo variant="compact-header" />
        </div>

        {/* Right: Install App, Time Preview, Bookmarks & Streak */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Active Audio Synthesis Waveform & Pause Indicator */}
          {isSpeaking && (
            <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-[#DB2777]/20 border border-[#DB2777]/50 text-pink-200 text-xs font-bold animate-pulse">
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-2 bg-pink-300 rounded-full animate-ping" />
                <span className="w-0.5 h-3 bg-pink-300 rounded-full" />
                <span className="w-0.5 h-1.5 bg-pink-300 rounded-full" />
              </span>
              <span className="hidden md:inline text-[11px] font-mono">Audio Active</span>
              {onStopSpeaking && (
                <button
                  onClick={onStopSpeaking}
                  className="p-0.5 hover:bg-white/20 rounded cursor-pointer transition-colors"
                  title="Stop audio reading"
                >
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                </button>
              )}
            </div>
          )}

          {/* Offline Indicator if connection lost */}
          {!isOnline && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold font-mono animate-pulse"
              title="Offline Mode Active — Cached Scripture & Devotions Available"
            >
              <WifiOff className="w-3 h-3" />
              <span className="hidden sm:inline">Offline</span>
            </div>
          )}

          {/* Fast Mode Anointed Speed Toggle */}
          <button
            id="header-fast-mode-toggle"
            onClick={handleToggleFastMode}
            className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border ${
              isFast
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-amber-400/20 font-extrabold"
                : "bg-white/10 text-slate-300 border-white/20 hover:bg-white/20"
            }`}
            title={isFast ? "Anointed Fast Mode is ON (Instant generation, 0.3 temp)" : "Deep Mode is ON (Full theological depth). Click for Fast Mode"}
          >
            <Zap className={`w-3.5 h-3.5 ${isFast ? "text-slate-950 fill-slate-950" : "text-amber-300"}`} />
            <span className="hidden sm:inline text-[11px] font-mono uppercase">
              {isFast ? "⚡ Fast" : "Deep"}
            </span>
          </button>

          {/* Cross-Platform Install App Trigger Button */}
          {onOpenInstallModal && (
            <button
              id="header-install-pwa-btn"
              onClick={onOpenInstallModal}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isInstalled
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30"
                  : "bg-gradient-to-r from-[#B48C35] to-[#996515] text-white hover:brightness-110 border border-amber-300/30"
              }`}
              title={isInstalled ? "Application installed & synced" : "Install 'The Joy of the Lord' on your device"}
            >
              {isInstalled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline font-mono text-[11px]">Installed</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-amber-100" />
                  <span className="hidden xs:inline font-mono text-[11px]">Install App</span>
                </>
              )}
            </button>
          )}

          {/* Active Session Badge with dropdown */}
          <div className="relative">
            <button
              id="active-session-badge-btn"
              onClick={() => setShowTimeMenu(!showTimeMenu)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-sm"
              title="Click to view time schedule or preview editions"
            >
              {getBadgeIcon()}
              <span className="hidden xs:inline">{activeBadge.label}</span>
              {isSimulatedTime && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>

            {/* Time / Edition Selector Dropdown */}
            {showTimeMenu && (
              <div className="absolute right-0 mt-2 w-72 p-3.5 bg-[#0D1638] text-white rounded-2xl shadow-2xl border-2 border-[#C026D3]/60 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F472B6]" /> Local Time: <span className="font-mono text-[#FDFBFE]">{formattedTime}</span>
                    </p>
                    <p className="text-[10px] text-slate-300">
                      Editorial auto-scheduled engine
                    </p>
                  </div>
                  {isSimulatedTime && (
                    <button
                      onClick={() => {
                        onResetTime();
                        setShowTimeMenu(false);
                      }}
                      className="p-1 rounded text-xs text-[#F472B6] hover:bg-white/10"
                      title="Reset to real local time"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F472B6] mb-2">
                  Devotion Editions
                </p>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      onSelectEditionPreview("morning");
                      setShowTimeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      activeEdition === "morning"
                        ? "bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white font-bold"
                        : "hover:bg-white/10 text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Sunrise className="w-3.5 h-3.5 text-[#FBBF24]" /> Morning Edition
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">12 AM - 12 PM</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectEditionPreview("afternoon");
                      setShowTimeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      activeEdition === "afternoon"
                        ? "bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white font-bold"
                        : "hover:bg-white/10 text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#FBBF24]" /> Afternoon Edition
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">12 PM - 5 PM</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectEditionPreview("evening");
                      setShowTimeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      activeEdition === "evening"
                        ? "bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white font-bold"
                        : "hover:bg-white/10 text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-[#818CF8]" /> Evening Prayer
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">5 PM - 12 AM</span>
                  </button>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-300">
                  <p>✨ Daily Scripture synchronizes once every 24h at <strong className="text-[#F472B6]">12:00 PM</strong>.</p>
                </div>
              </div>
            )}
          </div>

          {/* Spiritual Streak Badge */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FDFBFE] text-xs font-bold font-mono"
            title={`${streakDays} days spiritual devotion streak`}
          >
            <Flame className="w-3.5 h-3.5 text-[#DB2777] fill-[#DB2777]" />
            <span>{streakDays}d</span>
          </div>

          {/* Bookmarks quick button */}
          <button
            id="header-bookmarks-btn"
            onClick={onOpenBookmarks}
            className="p-2 rounded-full text-slate-200 hover:bg-white/10 hover:text-white transition-colors relative"
            title="Saved Scriptures & Notes"
          >
            <Bookmark className="w-4 h-4 text-[#F472B6]" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#DB2777] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

