import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Sparkles,
  Volume2,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Compass
} from "lucide-react";
import { getChapterSummary, ChapterSummary } from "../data/bibleChapterSummaries";

interface ChapterSummaryCardProps {
  book: string;
  chapter: number;
  chapterVerses?: { verse: number; text: string }[];
  onAskAi: (customPrompt?: string) => void;
  onToggleSpeak: (text: string) => void;
  onShare: (title: string, text: string) => void;
  onNavigateVerse?: (verseNum: number) => void;
  themeStyles?: {
    cardBg: string;
    border: string;
    text: string;
    subtext: string;
    accent: string;
  };
}

export const ChapterSummaryCard: React.FC<ChapterSummaryCardProps> = ({
  book,
  chapter,
  chapterVerses = [],
  onAskAi,
  onToggleSpeak,
  onShare,
  onNavigateVerse,
  themeStyles
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  // Retrieve and update summary with strict dependencies on book and chapter
  const [summaryData, setSummaryData] = useState<ChapterSummary>(() =>
    getChapterSummary(book, chapter, chapterVerses)
  );

  useEffect(() => {
    setSummaryData(getChapterSummary(book, chapter, chapterVerses));
    setSelectedQuestion(null);
    setCopied(false);
  }, [book, chapter, chapterVerses?.length]);

  const handleCopy = () => {
    const textToCopy = `📝 Chapter Summary: ${book} ${chapter}\n\n${summaryData.summary}\n\nKey Verse: ${summaryData.key_verses.join(", ")}\nTheme: ${summaryData.theme}\nKey Lesson: ${summaryData.lesson}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAudioRead = () => {
    const spokenText = `Chapter summary for ${book} chapter ${chapter}. ${summaryData.summary}. Key verse: ${summaryData.key_verses.join(", ")}. Key lesson: ${summaryData.lesson}.`;
    onToggleSpeak(spokenText);
  };

  const handleShareClick = () => {
    const shareText = `📝 Chapter Summary: ${book} ${chapter}\n\n${summaryData.summary}\n\nKey Verse: ${summaryData.key_verses.join(", ")}\n\nLesson: ${summaryData.lesson}`;
    onShare(`${book} Chapter ${chapter} Summary`, shareText);
  };

  const quickPrompts = [
    { label: "Deep Explanation", prompt: `Explain ${book} chapter ${chapter} in detail clause-by-clause, focusing on what happened and spiritual applications for a new believer.` },
    { label: "Spiritual Terms in Chapter", prompt: `Are there any technical spiritual terms or gifts (like Word of Knowledge, Word of Wisdom, Prophecy) in ${book} chapter ${chapter}? Explain them simply.` },
    { label: "Life Application & Prayers", prompt: `Give me 3 practical life applications and 3 targeted prayer declarations based on ${book} chapter ${chapter}.` }
  ];

  return (
    <div
      id={`chapter-summary-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`}
      className="mt-8 mb-6 rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm bg-[#B48C35]/5 dark:bg-[#B48C35]/10 border-[#B48C35]/30 text-current"
    >
      {/* Header Bar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-[#B48C35]/20 bg-[#B48C35]/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#B48C35]/20 flex items-center justify-center text-[#926F28] dark:text-[#E2C99D]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span>📝 Chapter Summary</span>
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#B48C35]/20 text-[#85631E] dark:text-[#E8D4B0]">
                {book} {chapter}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
              {summaryData.theme || `${book} Chapter ${chapter}`}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleAudioRead}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
            title="Listen to chapter summary"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
            title="Copy summary"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleShareClick}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
            title="Share summary"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
            title={isExpanded ? "Collapse summary" : "Expand summary"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body Content */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-4">
          {/* Main Summary Paragraph */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200 font-serif whitespace-pre-line">
              {summaryData.summary}
            </p>
          </div>

          {/* Key Verse & Theme Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-[#B48C35]/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#85631E] dark:text-[#E8D4B0] uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Key Verse</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 flex flex-wrap gap-1.5">
                {summaryData.key_verses.map((kv, i) => {
                  const verseNumMatch = kv.match(/:(\d+)/);
                  const vNum = verseNumMatch ? parseInt(verseNumMatch[1], 10) : null;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => vNum && onNavigateVerse?.(vNum)}
                      className="px-2 py-0.5 rounded-md bg-[#B48C35]/15 hover:bg-[#B48C35]/25 text-[#725213] dark:text-[#F3E2C4] cursor-pointer transition-colors text-xs font-bold"
                    >
                      {kv}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-[#B48C35]/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#85631E] dark:text-[#E8D4B0] uppercase tracking-wider mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Key Lesson</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-snug font-medium">
                {summaryData.lesson}
              </p>
            </div>
          </div>

          {/* Reflection Questions */}
          {summaryData.questions && summaryData.questions.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white/50 dark:bg-stone-900/40 border border-[#B48C35]/15 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#85631E] dark:text-[#E8D4B0] uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Reflection Questions</span>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                {summaryData.questions.map((q, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer hover:text-[#926F28] dark:hover:text-[#E2C99D] transition-colors"
                    onClick={() => {
                      setSelectedQuestion(q);
                      onAskAi(`Regarding ${book} chapter ${chapter}: ${q}`);
                    }}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Chapter Actions & Interactive Inquiry */}
          <div className="pt-2 border-t border-[#B48C35]/20 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onAskAi()}
                className="px-4 py-2.5 rounded-xl bg-[#16235A] hover:bg-[#1f307a] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Ask AI about this chapter</span>
              </button>

              <span className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                Ghana-friendly Bible teaching & pneumatic clarity
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">Quick inquiries:</span>
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onAskAi(qp.prompt)}
                  className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-stone-800/80 hover:bg-[#B48C35]/20 border border-[#B48C35]/20 text-[11px] font-medium text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
