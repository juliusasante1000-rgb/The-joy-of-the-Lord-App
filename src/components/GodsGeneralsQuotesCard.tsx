import React, { useState } from "react";
import {
  Quote,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Image as ImageIcon
} from "lucide-react";
import {
  GODS_GENERALS_QUOTES,
  FAMOUS_AUTHORS_LIST,
  FAMOUS_CATEGORIES_LIST,
  FamousChristianQuote
} from "../data/godsGeneralsQuotesData";
import { QuotePictureItem } from "./QuotePictureModal";

interface GodsGeneralsQuotesCardProps {
  onToggleBookmark?: (item: any) => void;
  isBookmarked?: (targetId: string, type?: string) => boolean;
  onShareItem?: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  onNavigateToQuotesTab?: () => void;
  onOpenQuotePictureModal?: (item: QuotePictureItem) => void;
}

export const GodsGeneralsQuotesCard: React.FC<GodsGeneralsQuotesCardProps> = ({
  onToggleBookmark,
  isBookmarked,
  onShareItem,
  onToggleSpeak,
  isSpeaking = false,
  onNavigateToQuotesTab,
  onOpenQuotePictureModal
}) => {
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [selectedCategory, setSelectedCategory] = useState("All Themes");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Filter quotes
  const filtered = GODS_GENERALS_QUOTES.filter((q) => {
    const matchAuthor = selectedAuthor === "All Authors" || q.author === selectedAuthor;
    const matchCat = selectedCategory === "All Themes" || q.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      q.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchAuthor && matchCat && matchSearch;
  });

  const activeQuote: FamousChristianQuote =
    filtered[currentIndex % Math.max(1, filtered.length)] || GODS_GENERALS_QUOTES[0];

  const handleNext = () => {
    if (filtered.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    if (filtered.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const handleRandom = () => {
    if (filtered.length <= 1) return;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filtered.length);
    } while (randomIndex === currentIndex && filtered.length > 1);
    setCurrentIndex(randomIndex);
  };

  const handleCopy = () => {
    const textToCopy = `"${activeQuote.quote}"\n— ${activeQuote.author} (${activeQuote.title})\nBiblical Anchor: ${activeQuote.biblicalAnchor}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePictureExport = () => {
    if (onOpenQuotePictureModal) {
      onOpenQuotePictureModal({
        quote: activeQuote.quote,
        author: activeQuote.author,
        title: activeQuote.title,
        reference: activeQuote.biblicalAnchor,
        category: activeQuote.category,
        reflection: `From "${activeQuote.title}" on the theme of ${activeQuote.category}.`
      });
    }
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-amber-50/40 border border-purple-200/80 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#9333EA] text-white text-xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-serif font-bold text-[#16235A]">
              God's Generals & Christian Classics Quotes
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Timeless wisdom from John Wesley, Spurgeon, Moody, Teresa of Ávila & church pioneers
          </p>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={handlePrev}
            disabled={filtered.length <= 1}
            className="p-1.5 rounded-xl border border-purple-200 hover:bg-purple-100 disabled:opacity-40 text-purple-900 transition-colors cursor-pointer"
            title="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleRandom}
            className="px-2.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Surprise / Random quote"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Random</span>
          </button>
          <button
            onClick={handleNext}
            disabled={filtered.length <= 1}
            className="p-1.5 rounded-xl border border-purple-200 hover:bg-purple-100 disabled:opacity-40 text-purple-900 transition-colors cursor-pointer"
            title="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {onNavigateToQuotesTab && (
            <button
              onClick={onNavigateToQuotesTab}
              className="ml-2 text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-0.5 cursor-pointer"
            >
              All Quotes →
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            placeholder="Search keywords, authors..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-purple-200 text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <select
          value={selectedAuthor}
          onChange={(e) => {
            setSelectedAuthor(e.target.value);
            setCurrentIndex(0);
          }}
          className="p-2 rounded-xl bg-white border border-purple-200 text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500/20"
        >
          {FAMOUS_AUTHORS_LIST.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentIndex(0);
          }}
          className="p-2 rounded-xl bg-white border border-purple-200 text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500/20"
        >
          {FAMOUS_CATEGORIES_LIST.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Quote Display Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-purple-100 shadow-2xs space-y-4 relative overflow-hidden">
        <div className="absolute top-2 right-4 text-purple-100 select-none pointer-events-none">
          <Quote className="w-16 h-16 opacity-40" />
        </div>

        <blockquote className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed relative z-10">
          "{activeQuote.quote}"
        </blockquote>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 relative z-10 text-xs">
          <div>
            <p className="font-bold text-[#16235A] text-sm">
              {activeQuote.author}
            </p>
            <p className="text-purple-700 font-medium text-[11px]">
              {activeQuote.title} • <span className="text-slate-500">{activeQuote.category}</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[11px] text-[#B48C35] font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              {activeQuote.biblicalAnchor}
            </span>

            {/* Read aloud */}
            {onToggleSpeak && (
              <button
                onClick={() =>
                  onToggleSpeak(
                    `"${activeQuote.quote}" by ${activeQuote.author}, ${activeQuote.title}. Scriptural Anchor: ${activeQuote.biblicalAnchor}`
                  )
                }
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Read aloud"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Create High-Resolution Branded Picture */}
            {onOpenQuotePictureModal && (
              <button
                onClick={handlePictureExport}
                className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Generate HD Quote Picture / Wallpaper"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#9333EA]" />
                <span className="hidden sm:inline">Picture</span>
              </button>
            )}

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Copy quote"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Bookmark */}
            {onToggleBookmark && (
              <button
                onClick={() =>
                  onToggleBookmark({
                    id: activeQuote.id,
                    title: `Quote by ${activeQuote.author}`,
                    snippet: activeQuote.quote,
                    reference: activeQuote.biblicalAnchor,
                    type: "quote",
                    targetId: activeQuote.id
                  })
                }
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Bookmark quote"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isBookmarked && isBookmarked(activeQuote.id, "quote") ? "fill-purple-600 text-purple-600" : ""
                  }`}
                />
              </button>
            )}

            {/* Share */}
            {onShareItem && (
              <button
                onClick={() =>
                  onShareItem(
                    `Quote by ${activeQuote.author}`,
                    `"${activeQuote.quote}"`,
                    activeQuote.biblicalAnchor,
                    `— ${activeQuote.author} (${activeQuote.title})`
                  )
                }
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Share quote"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
