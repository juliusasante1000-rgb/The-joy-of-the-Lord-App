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
  Zap,
  Flame,
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
  ExternalLink,
  Image as ImageIcon,
  FileText
} from "lucide-react";
import { RhemaWordItem, Devotion } from "../types";
import { DevotionPictureModal } from "./DevotionPictureModal";
import { printDevotionOnePageDocument } from "../utils/devotionDocumentExporter";

interface RhemaSanctuaryModalProps {
  word: RhemaWordItem | null;
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
  onNextWord?: () => void;
  onPrevWord?: () => void;
  hasNextWord?: boolean;
  hasPrevWord?: boolean;
}

export const RhemaSanctuaryModal: React.FC<RhemaSanctuaryModalProps> = ({
  word,
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
  onNextWord,
  onPrevWord,
  hasNextWord = true,
  hasPrevWord = true
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"revelation" | "decree" | "scripture">("revelation");
  const [isFullOverlap, setIsFullOverlap] = useState(false);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);

  if (!isOpen || !word) return null;

  const isSaved = isBookmarked(word.id, "rhema");

  const getRhemaDevotion = (): Devotion => {
    return {
      id: `dev-rhema-${word.id}`,
      edition: "morning",
      editionLabel: `RHEMA SANCTUARY • ${word.seasonCategory.toUpperCase()}`,
      title: word.title,
      keyScripture: `${word.scriptureAnchor.reference} - "${word.scriptureAnchor.text}"`,
      passageText: word.nowWordText,
      reflection: `PROPHETIC DECLARATION FOR YOUR SPIRIT:\n${word.propheticDeclaration}\n\nNOW RHEMA WORD OF GOD:\n${word.nowWordText}\n\nPROPHETIC DECREE & WARFARE:\n${word.propheticDecree}`,
      practicalApplication: word.actionCommandment,
      guidedPrayer: `Lord Jesus, I receive this living Rhema word into the soil of my spirit. Let every obstacle crumble before this divine decree. In Jesus' Name, Amen.`,
      actionStep: word.actionCommandment,
      theme: word.seasonCategory,
      category: "Rhema Word",
      readTimeMinutes: 4
    };
  };

  const handleCopy = () => {
    const textToCopy = `⚡ RHEMA WORD OF GOD: ${word.title.toUpperCase()}\n\nSeason: ${word.seasonCategory}\nDeclaration: ${word.propheticDeclaration}\n\nRhema Word:\n${word.nowWordText}\n\nAnchor Scripture: "${word.scriptureAnchor.text}" — ${word.scriptureAnchor.reference}\n\nProphetic Decree:\n${word.propheticDecree}\n\n— The Joy of the Lord Rhema Sanctuary`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadChapter = () => {
    if (!word.scriptureAnchor || !onNavigateToBible) return;
    onClose();
    const match = word.scriptureAnchor.reference.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):?(\d+)?/);
    if (match) {
      const book = match[1].trim();
      const chapter = parseInt(match[2], 10);
      const verse = match[3] ? parseInt(match[3], 10) : 1;
      onNavigateToBible(book, chapter, verse);
    } else {
      onNavigateToBible("Isaiah", 43, 19);
    }
  };

  const handleCreateDevotion = () => {
    onClose();
    if (onOpenDevotion) {
      const syntheticDevotion: Devotion = {
        id: `dev-rhema-${word.id}-${Date.now()}`,
        edition: "morning",
        editionLabel: `Rhema Word: ${word.seasonCategory}`,
        title: word.title,
        keyScripture: `${word.scriptureAnchor.reference} - "${word.scriptureAnchor.text}"`,
        passageText: word.nowWordText,
        reflection: `PROPHETIC DECLARATION: ${word.propheticDeclaration}\n\nNOW WORD FOR YOUR SEASON: ${word.nowWordText}\n\nWhen God speaks a Rhema word, Heaven's resources are deployed to manifest what was decreed. Align your faith and confession with this word today.`,
        practicalApplication: word.actionCommandment,
        guidedPrayer: `Lord Jesus, I receive this living Rhema word into the soil of my spirit. Let every obstacle crumble before this divine decree. In Jesus' Name, Amen.`,
        actionStep: word.actionCommandment,
        theme: word.seasonCategory,
        category: "Rhema Word",
        readTimeMinutes: 4
      };
      onOpenDevotion(syntheticDevotion);
    } else if (onNavigateTab) {
      onNavigateTab("home");
    }
  };

  return (
    <div
      id="rhema-sanctuary-modal"
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
        {/* Header Banner */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-950 via-[#16235A] to-indigo-950 border-b border-white/10 relative overflow-hidden shrink-0">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-400/10 blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/20 backdrop-blur-md border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-inner shrink-0">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 fill-purple-400 text-purple-300 animate-bounce" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 text-[11px] font-bold tracking-wider uppercase border border-purple-400/30">
                    {word.seasonCategory}
                  </span>
                  {word.isAuthorFavourite && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold tracking-wider uppercase border border-amber-300 flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                      Author's Favourite
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono border border-amber-400/30">
                    Now Word
                  </span>
                  <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                    Anchor: {word.scriptureAnchor.reference}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide truncate">
                  {word.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/90 font-serif italic mt-0.5 line-clamp-1">
                  "{word.propheticDeclaration}"
                </p>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsFullOverlap(!isFullOverlap)}
                className={`p-2 sm:p-2.5 rounded-2xl transition-colors cursor-pointer ${
                  isFullOverlap
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
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

        {/* Subtabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-2">
            {[
              { id: "revelation", label: "⚡ Prophetic Word" },
              { id: "decree", label: "🔥 Prophetic Decree" },
              { id: "scripture", label: "📖 Scripture Anchor" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(onPrevWord || onNextWord) && (
            <div className="flex items-center gap-1.5 shrink-0">
              {onPrevWord && (
                <button
                  onClick={onPrevWord}
                  disabled={!hasPrevWord}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    hasPrevWord
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "opacity-40 cursor-not-allowed text-slate-500 bg-white/5"
                  }`}
                  title="Previous Rhema Word"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
              )}

              {onNextWord && (
                <button
                  onClick={onNextWord}
                  disabled={!hasNextWord}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    hasNextWord
                      ? "bg-purple-600 hover:bg-purple-500 text-white shadow-xs"
                      : "opacity-40 cursor-not-allowed text-slate-500 bg-white/5"
                  }`}
                  title="Next Rhema Word"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-200 font-sans">
          {activeTab === "revelation" && (
            <div className="space-y-5">
              {/* Audio Listen Bar */}
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-400/30 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-300" />
                  Spoken Rhema Audio Stream
                </span>
                <button
                  onClick={() =>
                    onToggleSpeak(
                      `${word.title}. Prophetic Declaration: ${word.propheticDeclaration}. Now Word: ${word.nowWordText}. Decree: ${word.propheticDecree}`
                    )
                  }
                  className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{isSpeaking ? "Pause" : "Listen Rhema"}</span>
                </button>
              </div>

              {/* Rhema Word Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-purple-400/40 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  The Spoken Word for Your Spirit:
                </span>
                <p className="text-base sm:text-lg font-serif text-slate-100 leading-relaxed italic whitespace-pre-line">
                  "{word.nowWordText}"
                </p>
              </div>

              {/* Action of Faith */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  ⚡ Apostolic Action of Faith:
                </span>
                <p className="text-sm sm:text-base font-serif font-bold text-amber-100 leading-relaxed">
                  {word.actionCommandment}
                </p>
              </div>
            </div>
          )}

          {activeTab === "decree" && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-900/50 to-slate-900 border border-purple-400/40 space-y-3">
                <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-widest block">
                  ⚔️ Warfare & Prophetic Decree (Speak Aloud):
                </span>
                <p className="text-lg sm:text-xl font-serif font-bold text-amber-200 leading-relaxed">
                  "{word.propheticDecree}"
                </p>
              </div>
            </div>
          )}

          {activeTab === "scripture" && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                  <span className="font-bold text-sm">{word.scriptureAnchor.reference}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Anchor Text</span>
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic text-amber-100 leading-relaxed border-l-2 border-amber-400 pl-4">
                  "{word.scriptureAnchor.text}"
                </blockquote>
              </div>
            </div>
          )}

          {/* Finished Reading: Next/Previous Rhema Word Navigation Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            {onPrevWord ? (
              <button
                onClick={onPrevWord}
                disabled={!hasPrevWord}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasPrevWord
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "opacity-40 cursor-not-allowed bg-white/5 text-slate-500"
                }`}
              >
                <ArrowLeft className="w-4 h-4 text-purple-300" />
                <span>Previous Rhema Word</span>
              </button>
            ) : (
              <div />
            )}

            <span className="text-[11px] font-mono text-purple-300">
              ⚡ Completed Word
            </span>

            {onNextWord ? (
              <button
                onClick={onNextWord}
                disabled={!hasNextWord}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasNextWord
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white shadow-md shadow-purple-500/30"
                    : "opacity-40 cursor-not-allowed bg-white/5 text-slate-500"
                }`}
              >
                <span>Next Rhema Word</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPictureDevotion(getRhemaDevotion())}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              title="Download Picture Image"
            >
              <ImageIcon className="w-4 h-4 text-amber-300" />
              <span>Download Picture</span>
            </button>

            <button
              onClick={() => printDevotionOnePageDocument(getRhemaDevotion())}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-white/10"
              title="Download / Print 1-Page PDF Document"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>1-Page PDF</span>
            </button>

            <button
              onClick={handleReadChapter}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Read Chapter</span>
            </button>

            <button
              onClick={handleCreateDevotion}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-400/30 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Create Devotion</span>
            </button>

            <button
              onClick={() =>
                onShareItem(
                  word.title,
                  `Rhema: ${word.nowWordText}\n\nDecree: ${word.propheticDecree}\n\nScripture: ${word.scriptureAnchor.reference}`,
                  word.scriptureAnchor.reference
                )
              }
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() =>
                onToggleBookmark({
                  type: "rhema",
                  title: word.title,
                  reference: word.scriptureAnchor.reference,
                  snippet: word.propheticDecree,
                  targetId: word.id
                })
              }
              className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                isSaved ? "bg-purple-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Save"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Prominent Done / Close button */}
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/10 ml-auto"
          >
            Done Reading & Close
          </button>
        </div>
      </div>

      {pictureDevotion && (
        <DevotionPictureModal
          devotion={pictureDevotion}
          isOpen={Boolean(pictureDevotion)}
          onClose={() => setPictureDevotion(null)}
        />
      )}
    </div>
  );
};
