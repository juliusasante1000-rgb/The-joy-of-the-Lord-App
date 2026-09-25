import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Upload,
  Sparkles,
  Clock,
  Bookmark,
  Share2,
  Trash2,
  ArrowRight,
  BookMarked,
  Layers,
  Star,
  ChevronRight,
  X,
  Compass,
  FileText,
  Shield,
  Award,
  FileDown
} from "lucide-react";
import { Book } from "../types";
import {
  INITIAL_BOOKS,
  MASTER_TEXTBOOK_JOY_OF_THE_LORD,
  BOOK_1_JOY_OF_THE_LORD,
  BOOK_2_WELLS_OF_SALVATION
} from "../data/booksData";
import { downloadBookAsWordDoc } from "../utils/wordBookExporter";
import { UploadBookModal } from "./UploadBookModal";
import { BookReaderModal } from "./BookReaderModal";

interface BooksTabProps {
  isBookmarked: (targetId: string, type: string) => boolean;
  onToggleBookmark: (item: {
    type: "book";
    title: string;
    reference?: string;
    snippet: string;
    targetId: string;
  }) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string, onEnd?: () => void) => void;
  isAdmin?: boolean;
}

const STORAGE_KEY_BOOKS = "the_joy_of_the_lord_custom_books_v1";

export const BooksTab: React.FC<BooksTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  isAdmin = false,
}) => {
  // Custom books stored in localStorage
  const [customBooks, setCustomBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeFilterMode, setActiveFilterMode] = useState<"all" | "master" | "classics" | "messages">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookForReading, setSelectedBookForReading] = useState<Book | null>(null);
  const [readingChapterIndex, setReadingChapterIndex] = useState(0);
  const [viewingOutlineBook, setViewingOutlineBook] = useState<Book | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Combine initial curated books with user uploaded books
  const allBooks = useMemo(() => {
    return [...customBooks, ...INITIAL_BOOKS];
  }, [customBooks]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    allBooks.forEach(b => {
      if (b.category) cats.add(b.category);
    });
    if (customBooks.length > 0) {
      cats.add("My Uploaded Books");
    }
    return Array.from(cats);
  }, [allBooks, customBooks]);

  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      // Filter mode check
      if (activeFilterMode === "master") {
        if (book.id !== MASTER_TEXTBOOK_JOY_OF_THE_LORD.id) return false;
      } else if (activeFilterMode === "classics") {
        if (
          book.id !== MASTER_TEXTBOOK_JOY_OF_THE_LORD.id &&
          book.id !== BOOK_1_JOY_OF_THE_LORD.id &&
          book.id !== BOOK_2_WELLS_OF_SALVATION.id
        ) {
          return false;
        }
      } else if (activeFilterMode === "messages") {
        if (
          book.id === MASTER_TEXTBOOK_JOY_OF_THE_LORD.id ||
          book.id === BOOK_1_JOY_OF_THE_LORD.id ||
          book.id === BOOK_2_WELLS_OF_SALVATION.id
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory === "My Uploaded Books") {
        if (!book.isCustomUpload) return false;
      } else if (selectedCategory !== "All" && book.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);
        const matchDesc = book.description.toLowerCase().includes(query);
        const matchTags = book.tags?.some(t => t.toLowerCase().includes(query));
        const matchChapter = book.chapters.some(
          c => c.title.toLowerCase().includes(query) || c.content.toLowerCase().includes(query)
        );
        return matchTitle || matchAuthor || matchDesc || matchTags || matchChapter;
      }

      return true;
    });
  }, [allBooks, selectedCategory, activeFilterMode, searchQuery]);

  const handleAddCustomBook = (newBook: Book) => {
    const updated = [newBook, ...customBooks];
    setCustomBooks(updated);
    try {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setSelectedBookForReading(newBook);
    setReadingChapterIndex(0);
  };

  const handleDeleteCustomBook = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this uploaded publication from your library?")) {
      const updated = customBooks.filter(b => b.id !== bookId);
      setCustomBooks(updated);
      try {
        localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1A2A44] via-[#243B5A] to-[#0F172A] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B48C35]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#E5D5BC]">
            <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" />
            Complete Christian Library • 500-Page Master Textbook + 200 Expository Messages
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#FDFBF7]">
                The Christian Library & Master Textbook
              </h1>
              <p className="text-xs sm:text-sm text-[#E5D5BC]/85 leading-relaxed font-light">
                Study the definitive 500-page comprehensive textbook uniting the full revelation of Divine Joy, Nehemiah 8:10 (Chedvah & Ma'oz), the Seven Wells of Salvation, and the 40-Day Drawing Challenge, accompanied by 200 distinct 5-page expository messages.
              </p>
            </div>

            {/* Upload Book Action Button - Restricted Exclusively to Authenticated Admin */}
            {isAdmin && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#B48C35] to-[#9E6E1E] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Admin: Upload Publication</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CROWN JEWEL: 15-CHAPTER MASTER TEXTBOOK SHOWCASE (>400 PAGES IN WORD) */}
      {!searchQuery && selectedCategory === "All" && activeFilterMode !== "messages" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#B48C35]" />
                The 15-Chapter Master Textbook (Over 400 Pages • &gt;25 Pages Per Chapter)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1A2A44]">
                The Joy of the Lord is My Strength — Complete Master Textbook
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-[#B48C35]/15 text-[#B48C35] border border-[#B48C35]/30">
              <Star className="w-3.5 h-3.5 fill-current" />
              15 Chapters • 400+ Pages in MS Word
            </span>
          </div>

          {/* MASTER TEXTBOOK HERO CARD */}
          <div className="rounded-3xl border-2 border-[#B48C35] bg-gradient-to-br from-[#FAF6EE] via-[#F4EBD8] to-[#EAE0C7] p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#B48C35]/15 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

            <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 relative z-10">
              
              {/* Grand 3D-Style Hardcover Book Spine */}
              <div className="w-full sm:w-56 h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-[#78350F] via-[#451A03] to-[#1C1917] p-5 text-white flex flex-col justify-between shadow-2xl shrink-0 border-4 border-[#D97706]/40 relative group-hover:scale-[1.02] transition-transform">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#B48C35] text-white inline-block">
                      Master Textbook
                    </span>
                    <span className="text-[9px] text-amber-200 font-mono">400+ Pgs</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold font-serif leading-tight pt-2 text-[#FDFBF7]">
                    The Joy of the Lord is My Strength
                  </h4>
                  <p className="text-[10px] text-amber-200/90 font-serif italic">
                    The Complete Master Textbook on Divine Joy, Spiritual Warfare, ApostleMath, and the Wells of Salvation
                  </p>
                </div>

                <div className="border-t border-amber-500/30 pt-2 text-[10px] text-amber-100/90 flex items-center justify-between">
                  <span className="font-semibold">By Bismark Twum</span>
                  <span className="font-mono">15 Chapters</span>
                </div>
              </div>

              {/* Book Details and 15 Chapters Overview */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#B48C35] text-white text-xs font-bold shadow-sm">
                    15-Chapter Master Textbook
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-[#B48C35]/40 text-[#1A2A44] text-xs font-bold">
                    &gt;25 Pages Per Chapter • Over 400 Pages in Word
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#1A2A44] text-amber-300 text-xs font-bold">
                    Times New Roman 12pt • 1.5 Spacing
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1A2A44] leading-snug">
                    {MASTER_TEXTBOOK_JOY_OF_THE_LORD.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1A2A44]/80 leading-relaxed font-serif">
                    {MASTER_TEXTBOOK_JOY_OF_THE_LORD.description}
                  </p>
                </div>

                {/* 3 Main Parts & 15 Chapters Architecture Grid */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#B48C35] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>The 15 Master Chapters (&gt;25 Pages Each in Word Exposition):</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-[#1A2A44]">
                    <div className="bg-white/90 p-2.5 rounded-xl border border-[#B48C35]/30 space-y-0.5">
                      <span className="font-bold text-[#B48C35] text-[10px] block">PART I: UNDERSTANDING JOY (Ch 1–4)</span>
                      <p className="text-[11px] text-[#1A2A44]/75">Ch 1: Happiness vs Joy (John 15:11) • Ch 2: Nehemiah 8:10 Decoded (Chedvah &amp; Ma'oz) • Ch 3: The True Source (Psalm 16:11) • Ch 4: Slaying the 4 Thieves.</p>
                    </div>

                    <div className="bg-white/90 p-2.5 rounded-xl border border-[#B48C35]/30 space-y-0.5">
                      <span className="font-bold text-[#B48C35] text-[10px] block">PART II: JOY IN HARD SEASONS (Ch 5–8)</span>
                      <p className="text-[11px] text-[#1A2A44]/75">Ch 5: Joy in Suffering (Job, Paul, Jesus Heb 12:2) • Ch 6: Joy in Night Seasons (Psalm 30:5) • Ch 7: Pneumatic Joy Fruit • Ch 8: The Discipline of Joy.</p>
                    </div>

                    <div className="bg-white/90 p-2.5 rounded-xl border border-[#B48C35]/30 space-y-0.5">
                      <span className="font-bold text-[#B48C35] text-[10px] block">PART III: LIVING JOY &amp; WELLS (Ch 9–15)</span>
                      <p className="text-[11px] text-[#1A2A44]/75">Ch 9: Worship Warfare • Ch 10: Community • Ch 11: ApostleMath • Ch 12: Enduring Joy • Ch 13: Rhema • Ch 14: Joy As A Fetcher (Isaiah 12:3) • Ch 15: The 7 Wells &amp; 40-Day Blueprint.</p>
                    </div>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="pt-4 border-t border-[#B48C35]/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedBookForReading(MASTER_TEXTBOOK_JOY_OF_THE_LORD);
                        setReadingChapterIndex(0);
                      }}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B48C35] to-[#8C6218] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl transition-all active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-5 h-5 text-amber-200" />
                      <span>Read 15-Chapter Master Textbook</span>
                    </button>

                    {/* Prominent Download MS Word Version Button */}
                    <button
                      onClick={() => downloadBookAsWordDoc(MASTER_TEXTBOOK_JOY_OF_THE_LORD)}
                      className="px-5 py-3 rounded-2xl bg-[#1A2A44] hover:bg-[#243B5A] text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg border border-[#B48C35]/60 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      title="Download MS Word (.doc) version: 15 chapters, each over 25 pages, rendered in Times New Roman 12pt, 1.5 line spacing (over 400 pages total)"
                    >
                      <FileDown className="w-5 h-5 text-[#D4AF37]" />
                      <span>Download MS Word (.doc) — Over 400 Pages</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewingOutlineBook(MASTER_TEXTBOOK_JOY_OF_THE_LORD)}
                      className="px-4 py-2.5 rounded-xl bg-white border border-[#B48C35] text-xs font-bold text-[#1A2A44] hover:bg-[#FAF6EE] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-[#B48C35]" />
                      <span>Browse 15 Chapters</span>
                    </button>

                    <button
                      onClick={() => {
                        onShareItem(
                          MASTER_TEXTBOOK_JOY_OF_THE_LORD.title,
                          MASTER_TEXTBOOK_JOY_OF_THE_LORD.description,
                          `By ${MASTER_TEXTBOOK_JOY_OF_THE_LORD.author}`,
                          "15-Chapter Master Textbook • Over 400 Pages in MS Word"
                        );
                      }}
                      className="p-2.5 rounded-xl bg-white border border-[#B48C35]/50 text-[#1A2A44]/80 hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                      title="Share Master Textbook"
                    >
                      <Share2 className="w-4 h-4 text-[#B48C35]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INDIVIDUAL STUDY COMPANION VOLUMES */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A44]/70">
                Individual Study Editions (Volumes 1 & 2):
              </span>
              <span className="text-[11px] text-[#1A2A44]/50">
                Available as standalone 15-chapter editions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Volume 1 */}
              <div
                onClick={() => {
                  setSelectedBookForReading(BOOK_1_JOY_OF_THE_LORD);
                  setReadingChapterIndex(0);
                }}
                className="p-4 rounded-2xl bg-white border border-[#E5D5BC] hover:border-[#B48C35] hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${BOOK_1_JOY_OF_THE_LORD.coverColor} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    <BookOpen className="w-5 h-5 text-amber-200" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#B48C35]">Volume 1</span>
                    <h4 className="text-xs sm:text-sm font-bold font-serif text-[#1A2A44] truncate group-hover:text-[#B48C35] transition-colors">
                      {BOOK_1_JOY_OF_THE_LORD.title}
                    </h4>
                    <p className="text-[11px] text-[#1A2A44]/60 truncate">
                      15 Chapters • Understanding Joy, Hard Seasons & Living Joy
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B48C35] shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Volume 2 */}
              <div
                onClick={() => {
                  setSelectedBookForReading(BOOK_2_WELLS_OF_SALVATION);
                  setReadingChapterIndex(0);
                }}
                className="p-4 rounded-2xl bg-white border border-[#E5D5BC] hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${BOOK_2_WELLS_OF_SALVATION.coverColor} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    <BookOpen className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700">Volume 2</span>
                    <h4 className="text-xs sm:text-sm font-bold font-serif text-[#1A2A44] truncate group-hover:text-indigo-700 transition-colors">
                      {BOOK_2_WELLS_OF_SALVATION.title}
                    </h4>
                    <p className="text-[11px] text-[#1A2A44]/60 truncate">
                      15 Chapters • The Seven Wells & 40-Day Drawing Blueprint
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter Controls */}
      <div className="space-y-3 pt-2">
        <div className="relative">
          <Search className="w-4 h-4 text-[#1A2A44]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textbook and all 200 messages by title, author, keyword, scripture, or content..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E5D5BC] text-xs sm:text-sm text-[#1A2A44] placeholder:text-[#1A2A44]/40 focus:outline-none focus:border-[#B48C35] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1A2A44]/50 hover:text-[#1A2A44]"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode Pills (All / Master / Classics / Messages) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl bg-[#FAF6EE] border border-[#E5D5BC] p-1 gap-1">
            <button
              onClick={() => setActiveFilterMode("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilterMode === "all"
                  ? "bg-[#1A2A44] text-white shadow-sm"
                  : "text-[#1A2A44]/70 hover:text-[#1A2A44]"
              }`}
            >
              All Library ({allBooks.length})
            </button>

            <button
              onClick={() => setActiveFilterMode("master")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeFilterMode === "master"
                  ? "bg-[#B48C35] text-white shadow-sm"
                  : "text-[#B48C35] hover:bg-[#B48C35]/10"
              }`}
            >
              <Award className="w-3 h-3 fill-current" />
              Master Textbook (500 Pgs)
            </button>

            <button
              onClick={() => setActiveFilterMode("classics")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeFilterMode === "classics"
                  ? "bg-[#1A2A44] text-white shadow-sm"
                  : "text-[#1A2A44]/70 hover:text-[#1A2A44]"
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              Global Classics (3 Master Works)
            </button>

            <button
              onClick={() => setActiveFilterMode("messages")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilterMode === "messages"
                  ? "bg-[#1A2A44] text-white shadow-sm"
                  : "text-[#1A2A44]/70 hover:text-[#1A2A44]"
              }`}
            >
              200 Expository Messages (5 Pgs Each)
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#B48C35] text-white shadow-sm"
                    : "bg-white border border-[#E5D5BC] text-[#1A2A44]/70 hover:bg-[#FAF6EE]"
                }`}
              >
                <span>{cat}</span>
                {cat === "My Uploaded Books" && (
                  <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">
                    {customBooks.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Books Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-serif text-[#1A2A44] flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[#B48C35]" />
            Library Collection ({filteredBooks.length})
          </h2>
          <span className="text-xs text-[#1A2A44]/60">
            {customBooks.length > 0 ? `${customBooks.length} custom uploaded` : "Complete Canon"}
          </span>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-white border border-[#E5D5BC] space-y-3">
            <BookOpen className="w-10 h-10 text-[#B48C35]/50 mx-auto" />
            <p className="text-sm font-bold text-[#1A2A44]">No publications match your search</p>
            <p className="text-xs text-[#1A2A44]/60 max-w-sm mx-auto">
              Try adjusting your search terms or upload a new Christian book or sermon document!
            </p>
            {isAdmin && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B48C35] text-white text-xs font-bold shadow-md hover:bg-[#9E6E1E] transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Book Now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredBooks.map((book) => {
              const isMaster = book.id === MASTER_TEXTBOOK_JOY_OF_THE_LORD.id;
              const isVolume = book.id === BOOK_1_JOY_OF_THE_LORD.id || book.id === BOOK_2_WELLS_OF_SALVATION.id;
              const totalEstMinutes = book.chapters.reduce(
                (acc, c) => acc + (c.estimatedMinutes || 5),
                0
              );

              return (
                <div
                  key={book.id}
                  onClick={() => {
                    setSelectedBookForReading(book);
                    setReadingChapterIndex(0);
                  }}
                  className={`rounded-2xl bg-white border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                    isMaster
                      ? "border-2 border-[#B48C35] shadow-lg hover:shadow-2xl bg-gradient-to-br from-amber-50/60 to-white ring-2 ring-[#B48C35]/20"
                      : isVolume
                      ? "border-2 border-[#B48C35]/60 shadow-md hover:shadow-xl bg-gradient-to-br from-amber-50/20 to-white"
                      : "border-[#E5D5BC] hover:border-[#B48C35]/60 hover:shadow-lg"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Spine Badge & Year */}
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${book.coverColor} shadow-md flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform border border-white/20`}>
                        {isMaster ? <Award className="w-5 h-5 text-amber-200" /> : <BookOpen className="w-5 h-5 text-white/90" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${
                            isMaster ? "text-[#B48C35] flex items-center gap-1" : "text-[#B48C35]"
                          }`}>
                            {isMaster && <Star className="w-2.5 h-2.5 fill-current" />}
                            {book.coverBadge || book.category}
                          </span>
                          {book.year && (
                            <span className="text-[10px] text-[#1A2A44]/40 font-mono">
                              {book.year}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-bold font-serif text-[#1A2A44] leading-snug group-hover:text-[#B48C35] transition-colors truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#1A2A44]/60 truncate">
                          {book.author}
                        </p>
                      </div>

                      {book.isCustomUpload && (
                        <button
                          onClick={(e) => handleDeleteCustomBook(book.id, e)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0 cursor-pointer"
                          title="Delete Uploaded Book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Book Summary */}
                    <p className="text-xs text-[#1A2A44]/75 line-clamp-3 font-serif leading-relaxed">
                      {book.description}
                    </p>

                    {/* Chapter Pill List Preview */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A2A44]/40 flex items-center justify-between">
                        <span>Table of Contents ({book.chapters.length} {book.totalChapters >= 10 ? "Chapters" : "Pages"}):</span>
                      </p>
                      <div className="space-y-1">
                        {book.chapters.slice(0, 2).map((ch) => (
                          <div
                            key={ch.id}
                            className="text-[11px] text-[#1A2A44]/70 flex items-center justify-between bg-[#FDFBF7] px-2 py-1 rounded-md border border-[#E5D5BC]/60 truncate"
                          >
                            <span className="truncate">
                              {ch.chapterNumber}. {ch.title}
                            </span>
                            <span className="text-[10px] text-[#1A2A44]/40 shrink-0 ml-1">
                              ~{ch.estimatedMinutes || 5}m
                            </span>
                          </div>
                        ))}
                        {book.chapters.length > 2 && (
                          <span className="text-[10px] text-[#B48C35] font-semibold block px-1">
                            +{book.chapters.length - 2} more {book.totalChapters >= 10 ? "chapters" : "pages"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Duration & Read Button & Word Download */}
                  <div className="pt-4 mt-3 border-t border-[#E5D5BC]/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#1A2A44]/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B48C35]" />
                      ~{totalEstMinutes}m total
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadBookAsWordDoc(book);
                        }}
                        className="p-1.5 rounded-lg border border-[#B48C35]/30 text-[#B48C35] hover:bg-[#B48C35] hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
                        title="Download MS Word (.doc) formatted in Times New Roman 12pt, 1.5 spacing"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold hidden sm:inline">Word</span>
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#B48C35] group-hover:translate-x-0.5 transition-transform cursor-pointer"
                      >
                        <span>Read {book.totalChapters >= 10 ? (isMaster ? "Master Textbook" : "Book") : "Message"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CHAPTER OUTLINE BROWSER MODAL */}
      {viewingOutlineBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5D5BC] overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#1A2A44] to-[#243B5A] text-white flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C35] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Table of Contents • {viewingOutlineBook.totalChapters} Comprehensive Chapters
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif">
                  {viewingOutlineBook.title}
                </h3>
                <p className="text-xs text-white/70">
                  By {viewingOutlineBook.author}
                </p>
              </div>

              <button
                onClick={() => setViewingOutlineBook(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapters List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
              {viewingOutlineBook.chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  onClick={() => {
                    setSelectedBookForReading(viewingOutlineBook);
                    setReadingChapterIndex(idx);
                    setViewingOutlineBook(null);
                  }}
                  className="p-3.5 rounded-2xl border border-[#E5D5BC] hover:border-[#B48C35] hover:bg-[#FAF6EE] transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-[#1A2A44] text-[#B48C35] font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#B48C35] group-hover:text-white transition-colors">
                      {ch.chapterNumber}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold font-serif text-[#1A2A44] group-hover:text-[#B48C35] transition-colors truncate">
                        {ch.title}
                      </h4>
                      {ch.subtitle && (
                        <p className="text-[11px] text-[#1A2A44]/60 truncate font-serif italic">
                          {ch.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-[#1A2A44]/50">
                      ~{ch.estimatedMinutes || 20}m
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#B48C35] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#FAF6EE] border-t border-[#E5D5BC] flex flex-wrap items-center justify-between gap-3 text-xs text-[#1A2A44]/70 shrink-0">
              <span className="hidden sm:inline">Click any chapter to start reading instantly</span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadBookAsWordDoc(viewingOutlineBook)}
                  className="px-4 py-2 rounded-xl bg-[#1A2A44] hover:bg-[#243B5A] text-amber-300 border border-[#B48C35]/50 font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  title="Download complete book in MS Word (.doc) format (Times New Roman 12pt, 1.5 spacing)"
                >
                  <FileDown className="w-4 h-4 text-amber-300" />
                  <span>Download MS Word (.doc)</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedBookForReading(viewingOutlineBook);
                    setReadingChapterIndex(0);
                    setViewingOutlineBook(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#B48C35] text-white font-bold hover:bg-[#9E6E1E] transition-all cursor-pointer shadow-sm"
                >
                  Read from Chapter 1
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Book Modal */}
      <UploadBookModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddBook={handleAddCustomBook}
      />

      {/* Book Reader Modal */}
      <BookReaderModal
        book={selectedBookForReading}
        initialChapterIndex={readingChapterIndex}
        isOpen={!!selectedBookForReading}
        onClose={() => {
          setSelectedBookForReading(null);
        }}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
        onShareExcerpt={onShareItem}
        isSpeaking={isSpeaking}
        onToggleSpeak={onToggleSpeak}
      />
    </div>
  );
};
