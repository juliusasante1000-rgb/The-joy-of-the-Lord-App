import React, { useState } from "react";
import {
  X,
  Volume2,
  Share2,
  Bookmark,
  Edit3,
  Sparkles,
  Layers,
  BookOpen,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Check,
  Search,
  ExternalLink,
  Languages
} from "lucide-react";
import { BibleInterlinearView } from "./BibleInterlinearView";
import { isOldTestamentBook } from "../data/bibleOriginalLanguageData";

interface BibleInterlinearModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: string;
  chapter: number;
  verse: number;
  verseText: string;
  version?: string;
  onShareItem?: (title: string, content: string, ref: string) => void;
  onToggleSpeak?: (text: string) => void;
  onToggleBookmark?: (id: string, type: string, title: string, subtitle?: string) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  onSaveToNotes?: (verseKey: string, noteContent: string) => void;
  onNavigateVerse?: (direction: "prev" | "next") => void;
}

export const BibleInterlinearModal: React.FC<BibleInterlinearModalProps> = ({
  isOpen,
  onClose,
  book,
  chapter,
  verse,
  verseText,
  version = "KJV",
  onShareItem,
  onToggleSpeak,
  onToggleBookmark,
  isBookmarked,
  onSaveToNotes,
  onNavigateVerse
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const isHebrew = isOldTestamentBook(book);
  const languageName = isHebrew ? "Biblical Hebrew" : "Koine Greek";
  const testamentName = isHebrew ? "Old Testament" : "New Testament";
  const verseRef = `${book} ${chapter}:${verse}`;
  const verseKey = `${book}-${chapter}-${verse}`;
  const bookmarked = isBookmarked ? isBookmarked(verseKey, "bible") : false;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(`${verseRef} (${version}): "${verseText}"`);
    setCopiedKey("copied-ref");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-white dark:bg-slate-900 rounded-3xl border border-[#B48C35]/50 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen
            ? "w-full h-full max-w-none rounded-none"
            : "w-full max-w-5xl max-h-[92vh] h-[92vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#16235A] via-[#1E2E72] to-[#0A1230] text-white border-b border-[#B48C35]/30 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B48C35] to-[#996515] text-white flex items-center justify-center font-serif font-bold text-xl shadow-md shrink-0">
              {isHebrew ? "ע" : "Ω"}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                  Original {languageName} Interlinear & Lexicon
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#B48C35] text-white text-[11px] font-mono font-bold">
                  {testamentName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-amber-200 text-[11px] font-mono font-bold">
                  {verseRef}
                </span>
              </div>
              <p className="text-xs text-amber-200/80 font-serif italic mt-0.5">
                Authentic ancient script with English literal glosses and exhaustive lexical word study
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleSpeak && (
              <button
                onClick={() =>
                  onToggleSpeak(
                    `Original ${languageName} interlinear reading for ${verseRef}. ${verseText}`
                  )
                }
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-colors cursor-pointer"
                title="Listen to Verse Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}

            {onToggleBookmark && (
              <button
                onClick={() =>
                  onToggleBookmark(
                    verseKey,
                    "bible",
                    `${book} ${chapter}:${verse}`,
                    verseText
                  )
                }
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  bookmarked
                    ? "bg-[#B48C35] text-white"
                    : "bg-white/10 hover:bg-white/20 text-amber-200"
                }`}
                title={bookmarked ? "Bookmarked" : "Bookmark Verse"}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}

            {onShareItem && (
              <button
                onClick={() =>
                  onShareItem(
                    `Original ${languageName} Interlinear • ${verseRef}`,
                    `${verseText}\n\n[Original Language Interlinear Breakdown for ${verseRef}]`,
                    verseRef
                  )
                }
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors cursor-pointer"
                title="Share Interlinear"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden sm:flex"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer ml-1"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* VERSE CONTEXT BAR */}
        <div className="px-5 py-3 bg-[#FBF8F2] dark:bg-slate-800/90 border-b border-[#E8DFC8] dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#16235A] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              {verse}
            </span>
            <p className="font-serif text-sm sm:text-base text-slate-800 dark:text-slate-100 italic">
              "{verseText}"
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateVerse && (
              <div className="flex items-center gap-1 bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 p-1">
                <button
                  onClick={() => onNavigateVerse("prev")}
                  className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-xs text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1 cursor-pointer"
                  title="Previous Verse"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={() => onNavigateVerse("next")}
                  className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-xs text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1 cursor-pointer"
                  title="Next Verse"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MODAL BODY (Scrollable Interlinear Content) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950">
          <BibleInterlinearView
            book={book}
            chapter={chapter}
            verse={verse}
            verseText={verseText}
            version={version}
            onSaveToNotes={onSaveToNotes}
            onShareItem={onShareItem}
            onToggleSpeak={onToggleSpeak}
          />
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 py-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Languages className="w-4 h-4 text-[#B48C35]" />
            <span>
              Tap any Hebrew/Greek word card to inspect full Strong's Concordance, lemma, root etymology, and literal meaning.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyRef}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedKey === "copied-ref" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied Scripture!</span>
                </>
              ) : (
                <>
                  <span>Copy Reference</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-5 py-1.5 rounded-xl bg-[#16235A] hover:bg-[#0A1230] text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
            >
              Close Interlinear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
