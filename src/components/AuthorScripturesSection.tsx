import React, { useState, useMemo } from "react";
import {
  Sparkles,
  BookOpen,
  Search,
  Zap,
  Flame,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Volume2,
  ChevronRight,
  Filter,
  Bookmark
} from "lucide-react";
import {
  AUTHOR_FAVOURITE_SCRIPTURES,
  AUTHOR_FAVOURITES_COUNT,
  AuthorFavouriteScripture
} from "../data/authorFavouriteScriptures";

interface AuthorScripturesSectionProps {
  onNavigateTab: (tabId: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
  onShareItem?: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

type TestamentFilter = "All" | "Old Testament" | "New Testament" | "New";

export const AuthorScripturesSection: React.FC<AuthorScripturesSectionProps> = ({
  onNavigateTab,
  onNavigateToBible,
  onShareItem,
  onToggleSpeak,
  isSpeaking
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [testamentFilter, setTestamentFilter] = useState<TestamentFilter>("All");
  const [selectedBook, setSelectedBook] = useState<string>("All");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(36);

  // Derive unique books for the book filter dropdown
  const uniqueBooks = useMemo(() => {
    const books = Array.from(
      new Set(AUTHOR_FAVOURITE_SCRIPTURES.map((s) => s.book))
    ).sort();
    return books;
  }, []);

  const otCount = useMemo(
    () =>
      AUTHOR_FAVOURITE_SCRIPTURES.filter(
        (s) => s.testament === "Old Testament"
      ).length,
    []
  );

  const ntCount = useMemo(
    () =>
      AUTHOR_FAVOURITE_SCRIPTURES.filter(
        (s) => s.testament === "New Testament"
      ).length,
    []
  );

  const newCount = useMemo(
    () => AUTHOR_FAVOURITE_SCRIPTURES.filter((s) => s.isNew).length,
    []
  );

  const filteredScriptures = useMemo(() => {
    return AUTHOR_FAVOURITE_SCRIPTURES.filter((item) => {
      // Filter by testament
      if (testamentFilter === "Old Testament" && item.testament !== "Old Testament") {
        return false;
      }
      if (testamentFilter === "New Testament" && item.testament !== "New Testament") {
        return false;
      }
      if (testamentFilter === "New" && !item.isNew) {
        return false;
      }

      // Filter by book
      if (selectedBook !== "All" && item.book !== selectedBook) {
        return false;
      }

      // Filter by query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesRef = item.reference.toLowerCase().includes(q);
        const matchesBook = item.book.toLowerCase().includes(q);
        const matchesTheme = item.theme.toLowerCase().includes(q);
        const matchesText = item.text.toLowerCase().includes(q);
        const matchesNum = `#${item.num}` === q || `${item.num}` === q;
        return matchesRef || matchesBook || matchesTheme || matchesText || matchesNum;
      }

      return true;
    });
  }, [testamentFilter, selectedBook, searchQuery]);

  const handleCopy = (item: AuthorFavouriteScripture) => {
    const copyText = `"${item.text}"\n— ${item.reference} (${item.theme})`;
    navigator.clipboard.writeText(copyText);
    setCopiedIndex(item.num);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleShare = (item: AuthorFavouriteScripture) => {
    if (onShareItem) {
      onShareItem(
        `Author's Favourite Scripture: ${item.reference}`,
        `"${item.text}"\n\nTheme: ${item.theme}\nTestament: ${item.testament}`,
        item.reference
      );
    }
  };

  const handleOpenBible = (item: AuthorFavouriteScripture) => {
    if (onNavigateToBible) {
      onNavigateToBible(item.book, item.chapter);
    } else {
      onNavigateTab("bible");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#16235A] via-slate-900 to-[#2A164D] text-white shadow-xl relative overflow-hidden border border-amber-400/20">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold font-mono tracking-wider uppercase border border-amber-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Foundational Faith Pillars
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono">
              {AUTHOR_FAVOURITES_COUNT} Curated Scriptures
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight">
              Author's {AUTHOR_FAVOURITES_COUNT} Favourite Scriptures
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-serif italic mt-2 max-w-3xl leading-relaxed">
              Curated by Bismark Twum as the bedrock of prophetic vision, joyful perseverance, and victorious faith.
              Every scripture powers an anchored <strong className="text-amber-300 font-normal">Rhema Now-Word</strong> and an overcoming <strong className="text-amber-300 font-normal">Joy Blueprint</strong> across the entire 1,000-message repository.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Total Pillars</p>
              <p className="text-xl sm:text-2xl font-bold font-serif text-amber-300">{AUTHOR_FAVOURITES_COUNT}</p>
              <p className="text-[10px] text-slate-400">Genesis to Revelation</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Old Testament</p>
              <p className="text-xl sm:text-2xl font-bold font-serif text-sky-300">{otCount}</p>
              <p className="text-[10px] text-slate-400">Covenant & Promise</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">New Testament</p>
              <p className="text-xl sm:text-2xl font-bold font-serif text-emerald-300">{ntCount}</p>
              <p className="text-[10px] text-slate-400">Grace & Victory</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Linked Blueprints</p>
              <p className="text-xl sm:text-2xl font-bold font-serif text-purple-300">1,000</p>
              <p className="text-[10px] text-slate-400">Rhema & Joy Blueprints</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(36);
              }}
              placeholder="Search reference, theme, or text (e.g. Genesis 1:28)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            />
          </div>

          {/* Book Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Book:</label>
            <select
              value={selectedBook}
              onChange={(e) => {
                setSelectedBook(e.target.value);
                setVisibleCount(36);
              }}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="All">All Books ({uniqueBooks.length})</option>
              {uniqueBooks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Testament Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              setTestamentFilter("All");
              setVisibleCount(36);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              testamentFilter === "All"
                ? "bg-[#16235A] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Curated ({AUTHOR_FAVOURITE_SCRIPTURES.length})
          </button>
          <button
            onClick={() => {
              setTestamentFilter("Old Testament");
              setVisibleCount(36);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              testamentFilter === "Old Testament"
                ? "bg-[#16235A] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Old Testament ({otCount})
          </button>
          <button
            onClick={() => {
              setTestamentFilter("New Testament");
              setVisibleCount(36);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              testamentFilter === "New Testament"
                ? "bg-[#16235A] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            New Testament ({ntCount})
          </button>
          {newCount > 0 && (
            <button
              onClick={() => {
                setTestamentFilter("New");
                setVisibleCount(36);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                testamentFilter === "New"
                  ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                  : "bg-amber-100 text-amber-900 hover:bg-amber-200"
              }`}
            >
              Newly Added ({newCount})
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#16235A]">
          Showing {Math.min(visibleCount, filteredScriptures.length)} of {filteredScriptures.length} Scripture Pillars
        </span>
        <span className="text-[11px] text-slate-500 font-serif italic">
          Click buttons on any card to read Rhema, Overcoming Blueprint, or full Bible passage
        </span>
      </div>

      {/* Scripture Grid */}
      {filteredScriptures.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-slate-300">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No scriptures match your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search or testament filter.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setTestamentFilter("All");
              setSelectedBook("All");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#16235A] text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredScriptures.slice(0, visibleCount).map((item) => {
            const isOt = item.testament === "Old Testament";
            return (
              <div
                key={item.num}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all hover:shadow-md flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-2.5">
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#16235A] text-amber-300 font-mono text-[10px] font-bold">
                        #{item.num}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isOt
                            ? "bg-sky-100 text-sky-800 border border-sky-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {item.testament}
                      </span>
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black uppercase">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 font-mono">
                      {item.book}
                    </span>
                  </div>

                  {/* Reference & Theme */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-[#16235A] group-hover:text-amber-600 transition-colors">
                      {item.reference}
                    </h3>
                    <p className="text-xs font-bold text-amber-600 font-sans mt-0.5">
                      {item.theme}
                    </p>
                  </div>

                  {/* Scripture Text */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                </div>

                {/* Bottom Action Ribbons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {/* Primary Nav Buttons */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onNavigateTab("rhema")}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Read Rhema Now-Word"
                    >
                      <Zap className="w-3 h-3 text-purple-600" />
                      <span>Rhema Word</span>
                    </button>

                    <button
                      onClick={() => onNavigateTab("joy_overcoming")}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Read Joy Overcoming Blueprint"
                    >
                      <Flame className="w-3 h-3 text-amber-600" />
                      <span>Joy Blueprint</span>
                    </button>
                  </div>

                  {/* Secondary Quick Action Tools */}
                  <div className="flex items-center justify-between text-slate-500 pt-1">
                    <button
                      onClick={() => handleOpenBible(item)}
                      className="text-[11px] font-bold text-[#16235A] hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Bible</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1">
                      {onToggleSpeak && (
                        <button
                          onClick={() => onToggleSpeak(`${item.reference}. ${item.text}`)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#16235A] cursor-pointer"
                          title="Listen to Scripture"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleCopy(item)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#16235A] cursor-pointer"
                        title="Copy Scripture"
                      >
                        {copiedIndex === item.num ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {onShareItem && (
                        <button
                          onClick={() => handleShare(item)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#16235A] cursor-pointer"
                          title="Share Scripture"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination / Load More */}
      {visibleCount < filteredScriptures.length && (
        <div className="pt-4 flex justify-center">
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + 36, filteredScriptures.length)
              )
            }
            className="px-6 py-2.5 rounded-2xl bg-[#16235A] hover:bg-[#24357D] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.02]"
          >
            <span>
              Load More Scripture Pillars ({filteredScriptures.length - visibleCount} remaining)
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
