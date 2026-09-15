import React, { useState, useEffect } from "react";
import { Sparkles, Zap, BrainCircuit, BookOpen, Flame, Shield, Heart } from "lucide-react";
import { getIsFastMode, setIsFastMode, safeJsonParse } from "../utils/aiStreaming";

interface AiFastLoadingViewProps {
  progress?: number;
  title?: string;
  actionType?: string;
  streamingText?: string;
  isStreaming?: boolean;
  onCancel?: () => void;
}

const MEDITATION_THOUGHTS = [
  "Pondering the depths of Scripture...",
  "Unrolling ancient parchment scrolls in the library of Heaven...",
  "Calculating celestial equations and spiritual vectors...",
  "Searching the apostolic commentaries for maximum revelation...",
  "Gathering the sweetest honey from the Rock...",
  "Formulating anointed prayer decrees for your breakthrough...",
  "Consulting the Hebrew & Greek lexicons of glory..."
];

export const AiFastLoadingView: React.FC<AiFastLoadingViewProps> = ({
  progress = 40,
  title = "Generating Divine Revelation",
  actionType = "Prayer",
  streamingText = "",
  isStreaming = true,
  onCancel
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [fastMode, setFastModeState] = useState(() => getIsFastMode());

  // Track elapsed generation time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cycle meditation thoughts every 3.5s when meditating (>4s)
  useEffect(() => {
    if (elapsedSeconds >= 4) {
      const thoughtTimer = setInterval(() => {
        setThoughtIndex((prev) => (prev + 1) % MEDITATION_THOUGHTS.length);
      }, 3500);
      return () => clearInterval(thoughtTimer);
    }
  }, [elapsedSeconds]);

  const handleToggleFastMode = () => {
    const next = !fastMode;
    setFastModeState(next);
    setIsFastMode(next);
  };

  const isMeditating = elapsedSeconds >= 4;

  // Pretty parse partial JSON if available so user doesn't see raw brackets
  const parsedData = streamingText ? safeJsonParse(streamingText) : null;
  const isRawJson = streamingText.trim().startsWith("{") || streamingText.trim().startsWith("```");

  return (
    <div className="w-full bg-[#FDFBF7] dark:bg-[#0F172A] rounded-2xl border-2 border-[#B48C35] shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in duration-300">
      {/* Top Animated Royal Gold Progress Bar */}
      <div className="w-full bg-[#B48C35]/20 dark:bg-slate-800 h-2.5 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#996515] via-[#DCC398] to-[#B48C35] transition-all duration-300 ease-out relative"
          style={{ width: `${Math.min(100, Math.max(12, progress))}%` }}
        >
          {/* Divine Light Shimmer on progress bar */}
          <div className="absolute inset-0 bg-white/40 animate-[shimmer_1.5s_infinite] -skew-x-12" />
        </div>
      </div>

      {/* Header Bar: Royal Sanctuary Palette */}
      <div className="bg-[#0F172A] text-white px-5 sm:px-7 py-4 border-b-2 border-[#B48C35]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B48C35] to-[#996515] flex items-center justify-center text-white shadow-lg shadow-amber-500/25 animate-pulse shrink-0 border border-[#DCC398]/50">
            <Sparkles className="w-5 h-5 shrink-0 text-[#FFF7ED]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-serif font-bold text-white text-base sm:text-lg tracking-wide">
                {title}
              </h3>
              {/* Sacred Typing Pulsars */}
              <span className="inline-flex items-center gap-1 font-bold text-[#DCC398]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCC398] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCC398] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCC398] animate-bounce" />
              </span>
            </div>
            <p className="text-xs text-[#DCC398]/90 font-sans flex items-center gap-2 mt-0.5">
              <span>Sacred {actionType} in real-time</span>
              <span className="w-1 h-1 rounded-full bg-[#B48C35]" />
              <span className="font-mono text-[11px] text-amber-200">{elapsedSeconds}s elapsed</span>
            </p>
          </div>
        </div>

        {/* Fast Mode Toggle Pill */}
        <button
          type="button"
          onClick={handleToggleFastMode}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-sm cursor-pointer ${
            fastMode
              ? "bg-[#B48C35] text-white border-[#DCC398] hover:bg-[#996515]"
              : "bg-white/10 text-[#E5D5BC] border-white/20 hover:bg-white/20"
          }`}
          title="Toggle between instant responses or deep apostolic composition"
        >
          <Zap className={`w-3.5 h-3.5 shrink-0 ${fastMode ? "text-amber-200 animate-pulse" : "text-slate-300"}`} />
          <span className="tracking-wider uppercase text-[10px] font-bold">Fast Mode: {fastMode ? "ON" : "OFF"}</span>
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-5 bg-[#FAF7F0] dark:bg-[#0B1120]">
        {/* Dynamic Meditation State (>4s) */}
        {isMeditating ? (
          <div className="p-4 sm:p-4.5 rounded-xl bg-[#F4EBD9] dark:bg-[#162238] border border-[#DCC398] dark:border-[#B48C35]/40 animate-in fade-in flex items-center gap-4 text-left shadow-sm">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 to-[#B48C35] opacity-30 blur-sm animate-spin [animation-duration:8s]" />
              <div className="relative w-10 h-10 rounded-xl bg-[#0F172A] text-amber-300 border border-[#B48C35] flex items-center justify-center shadow-md">
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>

            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-[#0F172A] dark:text-[#FAF7F0] text-sm sm:text-base">
                  Meditating on the Holy Word
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#B48C35]/20 text-[#854D0E] dark:text-amber-200 font-bold border border-[#B48C35]/30">
                  Rhema Flow
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 italic font-serif truncate">
                "{MEDITATION_THOUGHTS[thoughtIndex]}"
              </p>
            </div>
          </div>
        ) : null}

        {/* Live Streaming Content Section */}
        {streamingText && streamingText.trim().length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#854D0E] dark:text-[#DCC398]">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse shrink-0" />
                Live Anointed Stream:
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{streamingText.length} chars</span>
            </div>

            {/* If JSON is detected, pretty format sections so user sees an anointed prayer, not code */}
            {isRawJson && parsedData ? (
              <div className="p-5 rounded-xl bg-white dark:bg-[#151F38] border-2 border-[#DCC398] dark:border-[#B48C35]/60 max-h-72 overflow-y-auto space-y-3 font-serif shadow-inner">
                {parsedData.title && (
                  <h4 className="text-base font-bold text-[#0F172A] dark:text-white border-b border-[#E5D5BC] dark:border-slate-700 pb-2">
                    {parsedData.title}
                  </h4>
                )}
                {(parsedData.scriptureAnchor || parsedData.scripturePromise) && (
                  <div className="p-2.5 rounded bg-[#FDFBF7] dark:bg-[#0F172A] border-l-3 border-[#B48C35] text-xs text-[#1A2A44] dark:text-[#E2E8F0] italic">
                    {parsedData.scriptureAnchor || parsedData.scripturePromise}
                  </div>
                )}
                {(parsedData.adoration || parsedData.sections?.adoration) && (
                  <div className="text-xs sm:text-sm text-[#334155] dark:text-slate-200">
                    <strong className="text-[#0F172A] dark:text-amber-300 block mb-0.5">Adoration & Praise:</strong>
                    {parsedData.adoration || parsedData.sections?.adoration}
                  </div>
                )}
                {(parsedData.petition || parsedData.sections?.petition) && (
                  <div className="text-xs sm:text-sm text-[#334155] dark:text-slate-200">
                    <strong className="text-[#0F172A] dark:text-amber-300 block mb-0.5">Petition & Supplication:</strong>
                    {parsedData.petition || parsedData.sections?.petition}
                  </div>
                )}
                {(parsedData.spiritualWarfare || parsedData.warfareDeclaration || parsedData.sections?.spiritualWarfare) && (
                  <div className="text-xs sm:text-sm text-[#334155] dark:text-slate-200">
                    <strong className="text-[#0F172A] dark:text-amber-300 block mb-0.5">Spiritual Warfare & Decree:</strong>
                    {parsedData.spiritualWarfare || parsedData.warfareDeclaration || parsedData.sections?.spiritualWarfare}
                  </div>
                )}
                {(parsedData.declarationInJesusName || parsedData.closing || parsedData.sections?.declarationInJesusName) && (
                  <div className="text-xs font-semibold text-[#854D0E] dark:text-amber-200 pt-1">
                    {parsedData.declarationInJesusName || parsedData.closing || parsedData.sections?.declarationInJesusName}
                  </div>
                )}
                <span className="inline-block w-2 h-4 ml-1 bg-[#B48C35] animate-pulse align-middle" />
              </div>
            ) : (
              <div className="p-4.5 rounded-xl bg-white dark:bg-[#151F38] border-2 border-[#DCC398] dark:border-[#B48C35]/60 max-h-64 overflow-y-auto text-sm text-[#1A2A44] dark:text-slate-100 whitespace-pre-wrap font-serif leading-relaxed shadow-inner">
                {streamingText.replace(/```json/gi, "").replace(/```/g, "").replace(/^[{\[\s]+/g, "")}
                <span className="inline-block w-2 h-4 ml-1 bg-[#B48C35] animate-pulse align-middle" />
              </div>
            )}
          </div>
        ) : (
          /* Animated Skeleton Screen */
          <div className="space-y-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-5 bg-[#B48C35]/25 dark:bg-slate-700 rounded-lg w-3/4" />
              <div className="h-3.5 bg-[#B48C35]/15 dark:bg-slate-800 rounded-lg w-1/2" />
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-[#DCC398] dark:border-slate-700/50 space-y-2">
              <div className="h-3 bg-[#B48C35]/20 dark:bg-slate-700 rounded-md w-full" />
              <div className="h-3 bg-[#B48C35]/20 dark:bg-slate-700 rounded-md w-5/6" />
            </div>

            <div className="space-y-2 pt-1">
              <div className="h-3.5 bg-[#E5D5BC]/60 dark:bg-slate-700 rounded-md w-full" />
              <div className="h-3.5 bg-[#E5D5BC]/60 dark:bg-slate-700 rounded-md w-11/12" />
              <div className="h-3.5 bg-[#E5D5BC]/60 dark:bg-slate-700 rounded-md w-4/5" />
            </div>

            <div className="p-3 rounded-lg bg-[#F4EBD9] dark:bg-[#16235A]/30 border border-[#DCC398] dark:border-indigo-900/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#B48C35]/30 dark:bg-indigo-800/50 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 bg-[#B48C35]/25 dark:bg-indigo-800/50 rounded w-1/3" />
                <div className="h-2.5 bg-[#B48C35]/15 dark:bg-indigo-900/40 rounded w-2/3" />
              </div>
            </div>
          </div>
        )}

        {/* Footer info & Cancel Button */}
        <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400 pt-3 border-t border-[#DCC398]/60 dark:border-slate-800">
          <span className="flex items-center gap-1.5 font-serif text-[#854D0E] dark:text-[#DCC398] font-medium">
            <BrainCircuit className="w-4 h-4 text-[#B48C35] shrink-0" />
            Apostolic Inspiration Engine
          </span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-[#64748B] hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
