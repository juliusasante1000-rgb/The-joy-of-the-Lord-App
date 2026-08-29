import React, { useState, useEffect } from "react";
import { Sparkles, Zap, BrainCircuit, BookOpen, Flame, CheckCircle2 } from "lucide-react";
import { getIsFastMode, setIsFastMode } from "../utils/aiStreaming";

interface AiFastLoadingViewProps {
  progress?: number;
  title?: string;
  actionType?: string;
  streamingText?: string;
  isStreaming?: boolean;
  onCancel?: () => void;
}

const MEDITATION_JOKES = [
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
  actionType = "Devotion",
  streamingText = "",
  isStreaming = true,
  onCancel
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [fastMode, setFastModeState] = useState(() => getIsFastMode());

  // Track elapsed generation time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cycle meditation thoughts every 3.5s when meditating (>5s)
  useEffect(() => {
    if (elapsedSeconds >= 5) {
      const jokeTimer = setInterval(() => {
        setJokeIndex((prev) => (prev + 1) % MEDITATION_JOKES.length);
      }, 3500);
      return () => clearInterval(jokeTimer);
    }
  }, [elapsedSeconds]);

  const handleToggleFastMode = () => {
    const next = !fastMode;
    setFastModeState(next);
    setIsFastMode(next);
  };

  const isMeditating = elapsedSeconds >= 5;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300">
      {/* Top Animated Smooth Progress Bar */}
      <div className="w-full bg-indigo-50 dark:bg-slate-800 h-1.5 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 transition-all duration-300 ease-out relative"
          style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
        >
          {/* Shimmer on progress bar */}
          <div className="absolute inset-0 bg-white/30 animate-[shimmer_1.5s_infinite] -skew-x-12" />
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-5">
        {/* Header Bar with Action Type & Fast Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg">
                  {title}
                </h3>
                {/* Typing Dots */}
                <span className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" />
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Streaming {actionType} in real-time ({elapsedSeconds}s)
              </p>
            </div>
          </div>

          {/* Fast Mode Toggle Pill */}
          <button
            type="button"
            onClick={handleToggleFastMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-xs cursor-pointer ${
              fastMode
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
            }`}
            title="Fast Mode sets temperature to 0.3 & tokens to 500 for swift anointed responses"
          >
            <Zap className={`w-3.5 h-3.5 ${fastMode ? "text-amber-500 animate-pulse" : "text-slate-400"}`} />
            <span>FAST MODE {fastMode ? "ON ⚡" : "OFF"}</span>
          </button>
        </div>

        {/* Dynamic State: If > 5 seconds, show "AI is meditating 🤔" with animated mascot */}
        {isMeditating ? (
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/20 animate-fade-in flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* Animated Meditating Mascot Illustration */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              {/* Outer glowing halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-500 opacity-30 blur-md animate-spin [animation-duration:8s]" />
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-500/40 shadow-inner flex items-center justify-center text-2xl">
                🤔
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] shadow-sm animate-bounce">
                ✨
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-slate-800 dark:text-amber-300 text-sm sm:text-base">
                  AI is meditating on the Word 🤔
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium">
                  Deep Rhema
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic transition-all duration-500">
                "{MEDITATION_JOKES[jokeIndex]}"
              </p>
            </div>
          </div>
        ) : null}

        {/* Live Streaming Partial Text Stream (if available) */}
        {streamingText && streamingText.trim().length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                Live Revelation Stream:
              </span>
              <span className="text-slate-400">{streamingText.length} characters</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 max-h-56 overflow-y-auto text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed shadow-inner">
              {streamingText}
              <span className="inline-block w-2 h-4 ml-1 bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            </div>
          </div>
        ) : (
          /* Animated Skeleton Screen (Mimics Structured Card) */
          <div className="space-y-4 animate-pulse">
            {/* Skeleton Header Block */}
            <div className="space-y-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
              <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/2" />
            </div>

            {/* Skeleton Scripture Quote Box */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6" />
            </div>

            {/* Skeleton Main Paragraph Lines */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-full" />
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-11/12" />
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-4/5" />
            </div>

            {/* Skeleton Action/Prayer Section */}
            <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-200 dark:bg-indigo-800/50 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 bg-indigo-200 dark:bg-indigo-800/50 rounded w-1/3" />
                <div className="h-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded w-2/3" />
              </div>
            </div>
          </div>
        )}

        {/* Footer info & Optional Cancel Button */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" />
            Gemini 3.7 Flash Engine
          </span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
