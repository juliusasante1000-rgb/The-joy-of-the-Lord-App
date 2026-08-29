import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Upload,
  Sparkles,
  Clock,
  Bookmark,
  Share2,
  Volume2,
  Trash2,
  Tag,
  ArrowRight,
  BookMarked,
  Filter,
  CheckCircle2
} from "lucide-react";
import { Book, BookmarkItem } from "../types";
import { INITIAL_BOOKS } from "../data/booksData";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookForReading, setSelectedBookForReading] = useState<Book | null>(null);
  const [readingChapterIndex, setReadingChapterIndex] = useState(0);
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
        const matchChapter = book.chapters.some(c => c.title.toLowerCase().includes(query) || c.content.toLowerCase().includes(query));
        return matchTitle || matchAuthor || matchDesc || matchTags || matchChapter;
      }

      return true;
    });
  }, [allBooks, selectedCategory, searchQuery]);

  const handleAddCustomBook = (newBook: Book) => {
    const updated = [newBook, ...customBooks];
    setCustomBooks(updated);
    try {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    // Open the new book immediately for reading
    setSelectedBookForReading(newBook);
    setReadingChapterIndex(0);
  };

  const handleDeleteCustomBook = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this uploaded book from your library?")) {
      const updated = customBooks.filter(b => b.id !== bookId);
      setCustomBooks(updated);
      try {
        localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const signatureBook = INITIAL_BOOKS[0];

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1A2A44] via-[#243B5A] to-[#0F172A] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B48C35]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#E5D5BC]">
            <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" />
            Christian Library & E-Books Reader
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#FDFBF7]">
                Spiritual Books & Living Classics
              </h1>
              <p className="text-xs sm:text-sm text-[#E5D5BC]/80 leading-relaxed font-light">
                Read sound Christian spiritual classics, explore doctrinal treatises, and study inspirational biblical publications anytime.
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

      {/* Featured Signature Companion Work (The Joy of the Lord is Our Strength) */}
      {selectedCategory === "All" && !searchQuery && (
        <div className="rounded-3xl border border-[#B48C35]/30 bg-gradient-to-br from-[#FAF6EE] to-[#F3ECE0] p-5 sm:p-7 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            {/* Book Spine / Cover Preview */}
            <div className={`w-full sm:w-40 h-52 sm:h-56 rounded-2xl bg-gradient-to-br ${signatureBook.coverColor} p-4 text-white flex flex-col justify-between shadow-xl shrink-0 border border-white/20 relative group hover:scale-[1.02] transition-transform`}>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 border border-white/20 inline-block">
                  Signature Book
                </span>
                <h4 className="text-sm font-bold font-serif leading-tight pt-1">
                  {signatureBook.title}
                </h4>
              </div>
              <div className="border-t border-white/20 pt-2 text-[10px] text-white/80 flex items-center justify-between">
                <span>{signatureBook.author}</span>
                <span>{signatureBook.totalChapters} Chs</span>
              </div>
            </div>

            {/* Book Info & Fast Start Action */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#B48C35]/15 text-[#B48C35] text-[11px] font-bold">
                  {signatureBook.category}
                </span>
                <span className="text-xs text-[#1A2A44]/50">•</span>
                <span className="text-xs text-[#1A2A44]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~35 min total read
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1A2A44]">
                {signatureBook.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#1A2A44]/80 leading-relaxed font-serif">
                {signatureBook.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {signatureBook.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#E5D5BC] text-[11px] font-medium text-[#1A2A44]/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedBookForReading(signatureBook);
                    setReadingChapterIndex(0);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1A2A44] hover:bg-[#243B5A] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-[#B48C35]" />
                  <span>Start Reading Book</span>
                </button>

                <button
                  onClick={() => {
                    onShareItem(
                      signatureBook.title,
                      signatureBook.description,
                      `By ${signatureBook.author}`,
                      "The Joy of the Lord Companion Library"
                    );
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E5D5BC] text-xs font-bold text-[#1A2A44]/80 hover:bg-[#FAF6EE] transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Book</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#1A2A44]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books by title, author, keyword, or chapter content..."
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

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
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

      {/* Books Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-serif text-[#1A2A44] flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[#B48C35]" />
            Books Collection ({filteredBooks.length})
          </h2>
          <span className="text-xs text-[#1A2A44]/60">
            {customBooks.length} uploaded by you
          </span>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-white border border-[#E5D5BC] space-y-3">
            <BookOpen className="w-10 h-10 text-[#B48C35]/50 mx-auto" />
            <p className="text-sm font-bold text-[#1A2A44]">No books match your search</p>
            <p className="text-xs text-[#1A2A44]/60 max-w-sm mx-auto">
              Try adjusting your search terms or upload a new Christian book or sermon document!
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B48C35] text-white text-xs font-bold shadow-md hover:bg-[#9E6E1E] transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Book Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredBooks.map((book) => {
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
                  className="rounded-2xl bg-white border border-[#E5D5BC] hover:border-[#B48C35]/60 hover:shadow-lg transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Spine Badge & Year */}
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${book.coverColor} shadow-md flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform`}>
                        <BookOpen className="w-5 h-5 text-white/90" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C35] truncate">
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
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A2A44]/40">
                        Table of Contents ({book.chapters.length} Chapters):
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
                            +{book.chapters.length - 2} more chapters
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Duration & Read Button */}
                  <div className="pt-4 mt-3 border-t border-[#E5D5BC]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[#1A2A44]/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B48C35]" />
                      ~{totalEstMinutes}m total
                    </span>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#B48C35] group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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
