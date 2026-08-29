import React, { useState } from "react";
import {
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  BookOpen,
  Check,
  Copy,
  Flame,
  Shield,
  HeartHandshake,
  RefreshCw,
  Sun,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
  ExternalLink
} from "lucide-react";
import { JoyOvercomingChallenge, Devotion } from "../types";

interface JoySanctuaryModalProps {
  challenge: JoyOvercomingChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: Devotion) => void;
  onNavigateTab?: (tab: string) => void;
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onSelectNextChallenge?: () => void;
  onSelectPrevChallenge?: () => void;
  hasNextChallenge?: boolean;
  hasPrevChallenge?: boolean;
}

export const JoySanctuaryModal: React.FC<JoySanctuaryModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onNavigateToBible,
  onOpenDevotion,
  onNavigateTab,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onSelectNextChallenge,
  onSelectPrevChallenge,
  hasNextChallenge = true,
  hasPrevChallenge = true
}) => {
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"sanctuary" | "strategy" | "scriptures" | "prayer">("sanctuary");
  const [isFullOverlap, setIsFullOverlap] = useState(false);

  if (!isOpen || !challenge) return null;

  const currentVerse = challenge.anchorVerses[activeVerseIndex] || challenge.anchorVerses[0];
  const isSaved = isBookmarked(challenge.id, "joy_overcoming");

  const handleNextVerse = () => {
    setActiveVerseIndex((prev) => (prev + 1) % challenge.anchorVerses.length);
  };

  const handleCopy = () => {
    const textToCopy = `☀️ THE JOY OF THE LORD: ${challenge.challengeTitle.toUpperCase()}\n\nCategory: ${challenge.category}\nKey Scripture: "${currentVerse?.text}" — ${currentVerse?.reference}\n\nTruth: ${challenge.scripturalTruth}\n\nFortress Declaration:\n${challenge.fortressDeclaration}\n\nDeliverance Prayer:\n${challenge.deliverancePrayer}\n\n— The Joy of the Lord Sanctuary`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadChapter = () => {
    if (!currentVerse || !onNavigateToBible) return;
    onClose();
    // Parse book and chapter if possible, e.g. "Nehemiah 8:10 (KJV)" -> book: "Nehemiah", chapter: 8, verse: 10
    const match = currentVerse.reference.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):?(\d+)?/);
    if (match) {
      const book = match[1].trim();
      const chapter = parseInt(match[2], 10);
      const verse = match[3] ? parseInt(match[3], 10) : 1;
      onNavigateToBible(book, chapter, verse);
    } else {
      onNavigateToBible("Nehemiah", 8, 10);
    }
  };

  const handleCreateDevotion = () => {
    onClose();
    if (onOpenDevotion) {
      const syntheticDevotion: Devotion = {
        id: `dev-joy-${challenge.id}-${Date.now()}`,
        edition: "morning",
        editionLabel: `The Joy of the Lord: ${challenge.category}`,
        title: challenge.challengeTitle,
        keyScripture: `${currentVerse?.reference} - "${currentVerse?.text}"`,
        passageText: currentVerse?.text || challenge.scripturalTruth,
        reflection: `THE BATTLEGROUND: ${challenge.rootDeception}\n\nDIVINE TRUTH: ${challenge.scripturalTruth}\n\nIn every trial, the joy of the Lord is not an emotion to be manufactured, but a supernatural spiritual weapon forged in the presence of the Holy Spirit. Stand firm upon the promises of God and enforce Christ's victory over every challenge.`,
        practicalApplication: challenge.joyStrategySteps.join("\n• "),
        guidedPrayer: challenge.deliverancePrayer,
        actionStep: challenge.praisePrescription,
        theme: challenge.category,
        category: "Joy of the Lord",
        readTimeMinutes: 5
      };
      onOpenDevotion(syntheticDevotion);
    } else if (onNavigateTab) {
      onNavigateTab("home");
    }
  };

  return (
    <div
      id="joy-sanctuary-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isFullOverlap
          ? "p-0 bg-slate-950/98 backdrop-blur-lg"
          : "p-3 sm:p-5 bg-black/80 backdrop-blur-md"
      } animate-in fade-in`}
    >
      <div
        className={`bg-slate-900 text-slate-100 flex flex-col overflow-hidden transition-all duration-200 ${
          isFullOverlap
            ? "w-screen h-screen max-w-none max-h-none rounded-none border-0"
            : "w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-amber-500/30"
        }`}
      >
        {/* 1. Header Banner */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#16235A] via-amber-950/80 to-[#16235A] border-b border-white/10 relative overflow-hidden shrink-0">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner shrink-0">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 text-amber-300 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30">
                    {challenge.category}
                  </span>
                  {challenge.isAuthorFavourite && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold tracking-wider uppercase border border-amber-300 flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                      Author's Favourite
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-400/30">
                    {challenge.anchorVerses.length} Anchor Scriptures
                  </span>
                  <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                    Anchor: {currentVerse?.reference}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide truncate">
                  {challenge.challengeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic mt-0.5 line-clamp-1">
                  "For the joy of the LORD is your strength." — Nehemiah 8:10
                </p>
              </div>
            </div>

            {/* Top Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsFullOverlap(!isFullOverlap)}
                className={`p-2 sm:p-2.5 rounded-2xl transition-colors cursor-pointer ${
                  isFullOverlap
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/30"
                    : "bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                }`}
                title={isFullOverlap ? "Exit Full Page" : "Expand to Full Page Overlap"}
                aria-label="Toggle Full Page"
              >
                {isFullOverlap ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Navigation Subtabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-2">
            {[
              { id: "sanctuary", label: "🌟 Victory Sanctuary" },
              { id: "strategy", label: "🛡️ Joy Protocols" },
              { id: "scriptures", label: "📖 Scripture Vault" },
              { id: "prayer", label: "🙏 Deliverance Prayer" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#B48C35] text-white shadow-md"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(onSelectPrevChallenge || onSelectNextChallenge) && (
            <div className="flex items-center gap-1.5 shrink-0">
              {onSelectPrevChallenge && (
                <button
                  onClick={onSelectPrevChallenge}
                  disabled={!hasPrevChallenge}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    hasPrevChallenge
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "opacity-40 cursor-not-allowed text-slate-500 bg-white/5"
                  }`}
                  title="Previous Victory Fortress"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
              )}

              {onSelectNextChallenge && (
                <button
                  onClick={onSelectNextChallenge}
                  disabled={!hasNextChallenge}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    hasNextChallenge
                      ? "bg-amber-600 hover:bg-amber-500 text-white shadow-xs"
                      : "opacity-40 cursor-not-allowed text-slate-500 bg-white/5"
                  }`}
                  title="Next Victory Fortress"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* 3. Main Sanctuary Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 font-sans">
          {activeTab === "sanctuary" && (
            <div className="space-y-5">
              {/* Guided Sanctuary Prayer Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-amber-950/40 border border-purple-400/30 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-purple-300" />
                    Guided Sanctuary Prayer
                  </span>
                  <button
                    onClick={() => onToggleSpeak(challenge.deliverancePrayer)}
                    className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{isSpeaking ? "Pause" : "Listen"}</span>
                  </button>
                </div>
                <p className="text-sm sm:text-base font-serif italic text-slate-100 leading-relaxed">
                  "{challenge.deliverancePrayer}"
                </p>
              </div>

              {/* Active Anchor Scripture Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-[#B48C35]/40 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <BookOpen className="w-4 h-4" />
                    Anchor Scripture ({activeVerseIndex + 1} of {challenge.anchorVerses.length})
                  </span>
                  <span className="bg-[#B48C35]/30 px-2 py-0.5 rounded border border-[#B48C35]/40">
                    {currentVerse.version}
                  </span>
                </div>
                <blockquote className="text-base sm:text-lg font-serif font-semibold text-amber-100 leading-relaxed border-l-2 border-[#B48C35] pl-4 italic">
                  "{currentVerse.text}"
                </blockquote>
                <div className="text-right text-xs font-mono font-bold text-slate-300">
                  — {currentVerse.reference}
                </div>
              </div>

              {/* Fortress Declaration */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Spiritual Fortress Declaration
                </span>
                <p className="text-sm sm:text-base font-serif font-bold text-amber-100 leading-relaxed">
                  "{challenge.fortressDeclaration}"
                </p>
              </div>

              {/* Root Deception vs. Scriptural Truth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Root Deception & Lie
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {challenge.rootDeception}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" />
                    Divine Scriptural Truth
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-serif">
                    {challenge.scripturalTruth}
                  </p>
                </div>
              </div>

              {/* Praise Prescription & Testimony */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase">
                    💊 Praise Prescription
                  </span>
                  <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                    {challenge.praisePrescription}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-amber-300 uppercase">
                    🏆 Victory Testimony
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{challenge.testimonyOfVictory}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "strategy" && (
            <div className="space-y-4">
              <h4 className="text-base font-serif font-bold text-amber-200 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Step-by-Step Victory Protocols & Holy Action Steps
              </h4>
              <p className="text-xs text-slate-400">
                Put these strategic spiritual instructions into active practice today to dismantle every stronghold of the enemy.
              </p>
              <div className="space-y-3">
                {challenge.joyStrategySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5 hover:border-amber-400/40 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#B48C35] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-md">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-100 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "scriptures" && (
            <div className="space-y-4">
              <h4 className="text-base font-serif font-bold text-amber-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                All Covenant Anchor Scriptures
              </h4>
              <div className="space-y-3">
                {challenge.anchorVerses.map((verse, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#B48C35]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                      <span className="font-bold">{verse.reference}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px]">
                        {verse.version}
                      </span>
                    </div>
                    <p className="text-sm font-serif text-slate-100 italic leading-relaxed">
                      "{verse.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "prayer" && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-900/40 to-slate-900 border border-purple-400/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Apostolic Deliverance Prayer
                  </span>
                  <button
                    onClick={() => onToggleSpeak(challenge.deliverancePrayer)}
                    className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{isSpeaking ? "Pause" : "Listen"}</span>
                  </button>
                </div>
                <p className="text-base font-serif italic text-purple-100 leading-relaxed">
                  "{challenge.deliverancePrayer}"
                </p>
              </div>

              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  Decree Aloud in Faith:
                </span>
                <p className="text-sm font-serif font-bold text-amber-100">
                  "{challenge.fortressDeclaration}"
                </p>
              </div>
            </div>
          )}

          {/* Finished Reading: Next/Previous Challenge Navigation Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            {onSelectPrevChallenge ? (
              <button
                onClick={onSelectPrevChallenge}
                disabled={!hasPrevChallenge}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasPrevChallenge
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "opacity-40 cursor-not-allowed bg-white/5 text-slate-500"
                }`}
              >
                <ArrowLeft className="w-4 h-4 text-amber-300" />
                <span>Previous Fortress</span>
              </button>
            ) : (
              <div />
            )}

            <span className="text-[11px] font-mono text-amber-300">
              🌟 Completed Message
            </span>

            {onSelectNextChallenge ? (
              <button
                onClick={onSelectNextChallenge}
                disabled={!hasNextChallenge}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasNextChallenge
                    ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-slate-950 font-bold shadow-md shadow-amber-500/30"
                    : "opacity-40 cursor-not-allowed bg-white/5 text-slate-500"
                }`}
              >
                <span>Next Fortress</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* 4. Action Buttons Toolbar (Bottom) */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* Cycle Another Verse */}
            {challenge.anchorVerses.length > 1 && (
              <button
                onClick={handleNextVerse}
                className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Another Verse</span>
              </button>
            )}

            {/* Read Chapter */}
            <button
              onClick={handleReadChapter}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Read Chapter</span>
            </button>

            {/* Create Devotion */}
            <button
              onClick={handleCreateDevotion}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-400/30 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Create Devotion</span>
            </button>

            {/* Share */}
            <button
              onClick={() =>
                onShareItem(
                  challenge.challengeTitle,
                  `${challenge.scripturalTruth}\n\nKey Scripture: "${currentVerse.text}" (${currentVerse.reference})\n\nDeclaration: ${challenge.fortressDeclaration}`,
                  currentVerse.reference
                )
              }
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Word</span>
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() =>
                onToggleBookmark({
                  type: "joy_overcoming",
                  title: challenge.challengeTitle,
                  reference: currentVerse?.reference,
                  snippet: challenge.fortressDeclaration,
                  targetId: challenge.id
                })
              }
              className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                isSaved ? "bg-[#B48C35] text-white" : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Save"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Prominent DONE Close Button */}
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/10 ml-auto"
          >
            Done Reading & Close
          </button>
        </div>
      </div>
    </div>
  );
};
