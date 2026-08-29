import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  List,
  Search,
  Type,
  Sun,
  Moon,
  Palette,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  Plus
} from "lucide-react";
import { Book, BookChapter, BookNote } from "../types";

interface BookReaderModalProps {
  book: Book | null;
  initialChapterIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: (targetId: string, type: string) => boolean;
  onToggleBookmark: (item: {
    type: "book";
    title: string;
    reference?: string;
    snippet: string;
    targetId: string;
  }) => void;
  onShareExcerpt: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string, onEnd?: () => void) => void;
  onUpdateProgress?: (bookId: string, chapterId: string, chapterNumber: number, scrollPct: number) => void;
}

type ReaderTheme = "parchment" | "sepia" | "light" | "twilight" | "night";
type ReaderFont = "serif" | "sans" | "cinzel";

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  initialChapterIndex = 0,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onShareExcerpt,
  isSpeaking,
  onToggleSpeak,
  onUpdateProgress,
}) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(initialChapterIndex);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [theme, setTheme] = useState<ReaderTheme>("parchment");
  const [fontFamily, setFontFamily] = useState<ReaderFont>("serif");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [notes, setNotes] = useState<BookNote[]>(() => {
    try {
      const saved = localStorage.getItem(`the_joy_notes_${book?.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book && initialChapterIndex >= 0 && initialChapterIndex < book.chapters.length) {
      setCurrentChapterIdx(initialChapterIndex);
    }
  }, [book, initialChapterIndex]);

  useEffect(() => {
    if (book) {
      try {
        localStorage.setItem(`the_joy_notes_${book.id}`, JSON.stringify(notes));
      } catch (e) {
        console.error(e);
      }
    }
  }, [notes, book]);

  // Scroll to top on chapter change & record progress
  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (book && book.chapters[currentChapterIdx]) {
      const ch = book.chapters[currentChapterIdx];
      onUpdateProgress?.(book.id, ch.id, ch.chapterNumber, 0);
    }
  }, [currentChapterIdx, book, onUpdateProgress]);

  const currentChapter: BookChapter | undefined = book?.chapters?.[currentChapterIdx] || book?.chapters?.[0];

  const filteredParagraphs = useMemo(() => {
    if (!currentChapter?.content) return [];
    const paragraphs = currentChapter.content.split(/\n\s*\n/);
    return paragraphs;
  }, [currentChapter?.content]);

  if (!isOpen || !book || !currentChapter) return null;

  const themeClasses: Record<ReaderTheme, { bg: string; text: string; header: string; border: string; accent: string }> = {
    parchment: {
      bg: "bg-[#FAF6EE]",
      text: "text-[#2B2317]",
      header: "bg-[#F3ECE0]/90",
      border: "border-[#E5D5BC]",
      accent: "text-[#B48C35]"
    },
    sepia: {
      bg: "bg-[#F4ECD8]",
      text: "text-[#3D2E1E]",
      header: "bg-[#EAE0C7]/90",
      border: "border-[#D8C7A5]",
      accent: "text-[#9E6E1E]"
    },
    light: {
      bg: "bg-[#FFFFFF]",
      text: "text-[#1F2937]",
      header: "bg-[#F9FAFB]/90",
      border: "border-[#E5E7EB]",
      accent: "text-[#B48C35]"
    },
    twilight: {
      bg: "bg-[#1E293B]",
      text: "text-[#E2E8F0]",
      header: "bg-[#0F172A]/90",
      border: "border-[#334155]",
      accent: "text-[#F59E0B]"
    },
    night: {
      bg: "bg-[#121214]",
      text: "text-[#D4D4D8]",
      header: "bg-[#18181B]/90",
      border: "border-[#27272A]",
      accent: "text-[#EAB308]"
    }
  };

  const fontSizes: Record<"sm" | "md" | "lg" | "xl", string> = {
    sm: "text-sm sm:text-base leading-relaxed sm:leading-loose",
    md: "text-base sm:text-lg leading-relaxed sm:leading-loose",
    lg: "text-lg sm:text-xl leading-loose sm:leading-[2.2rem]",
    xl: "text-xl sm:text-2xl leading-loose sm:leading-[2.5rem]"
  };

  const fontFamilies: Record<ReaderFont, string> = {
    serif: "font-serif",
    sans: "font-sans",
    cinzel: "font-['Cinzel',serif]"
  };

  const activeTheme = themeClasses[theme];

  const handleNextChapter = () => {
    if (currentChapterIdx < book.chapters.length - 1) {
      setCurrentChapterIdx(prev => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx(prev => prev - 1);
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const noteObj: BookNote = {
      id: `note-${Date.now()}`,
      bookId: book.id,
      chapterId: currentChapter.id,
      note: newNoteText.trim(),
      createdAt: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })
    };
    setNotes(prev => [noteObj, ...prev]);
    setNewNoteText("");
    setIsAddingNote(false);
  };

  const bookmarked = isBookmarked(currentChapter.id, "book");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl h-full sm:h-[94vh] sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden ${activeTheme.bg} ${activeTheme.text} transition-colors duration-200 border ${activeTheme.border}`}>
        
        {/* Top Control Bar */}
        <header className={`px-4 sm:px-6 py-3 border-b ${activeTheme.border} ${activeTheme.header} backdrop-blur-md flex items-center justify-between z-10 shrink-0`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`p-2 rounded-xl border ${activeTheme.border} hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0`}
              title="Table of Contents"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Contents</span>
            </button>

            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-bold truncate">
                {book.title}
              </h2>
              <p className="text-[11px] opacity-60 truncate">
                Chapter {currentChapter.chapterNumber} of {book.totalChapters}: {currentChapter.title}
              </p>
            </div>
          </div>

          {/* Quick Actions (Audio, Typography, Bookmark, Share, Close) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Audio Narration TTS */}
            <button
              onClick={() => {
                const fullTextToRead = `${book.title}. ${currentChapter.title}. ${currentChapter.subtitle || ""}. ${currentChapter.content}`;
                onToggleSpeak(fullTextToRead);
              }}
              className={`p-2 rounded-xl transition-all ${
                isSpeaking
                  ? "bg-[#B48C35] text-white animate-pulse"
                  : `border ${activeTheme.border} hover:bg-black/5 dark:hover:bg-white/5`
              }`}
              title={isSpeaking ? "Pause Narration" : "Listen to Chapter (Audio)"}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark Chapter */}
            <button
              onClick={() => {
                onToggleBookmark({
                  type: "book",
                  title: `${book.title} - ${currentChapter.title}`,
                  reference: `${book.author} (Ch. ${currentChapter.chapterNumber})`,
                  snippet: currentChapter.content.slice(0, 150) + "...",
                  targetId: currentChapter.id
                });
              }}
              className={`p-2 rounded-xl border ${activeTheme.border} transition-all ${
                bookmarked ? "text-[#B48C35] bg-[#B48C35]/15" : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
              }`}
              title="Bookmark Chapter"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-[#B48C35]" : ""}`} />
            </button>

            {/* Share Excerpt */}
            <button
              onClick={() => {
                onShareExcerpt(
                  `${book.title} — ${currentChapter.title}`,
                  currentChapter.content.slice(0, 280) + "...",
                  `By ${book.author}`,
                  "The Joy of the Lord Companion Library"
                );
              }}
              className={`p-2 rounded-xl border ${activeTheme.border} hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 transition-colors`}
              title="Create Shareable Quote Card"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Search within Book */}
            <button
              onClick={() => setIsSearching(!isSearching)}
              className={`p-2 rounded-xl border ${activeTheme.border} hover:bg-black/5 dark:hover:bg-white/5 ${
                isSearching ? "bg-[#B48C35]/15 text-[#B48C35]" : "opacity-70 hover:opacity-100"
              } transition-colors`}
              title="Search Book"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border ${activeTheme.border} hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 transition-colors ml-1`}
              title="Close Reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Secondary Toolbar: Theme, Font Size, Search Drawer */}
        <div className={`px-4 sm:px-6 py-2 border-b ${activeTheme.border} flex flex-wrap items-center justify-between gap-2 text-xs opacity-90`}>
          {/* Theme Palette Chooser */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] opacity-60 mr-1 hidden sm:inline">Theme:</span>
            {(["parchment", "sepia", "light", "twilight", "night"] as ReaderTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  theme === t
                    ? "bg-[#B48C35] text-white shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Font Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[11px] opacity-60 mr-1 hidden sm:inline">Size:</span>
              {(["sm", "md", "lg", "xl"] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`w-6 h-6 rounded-md text-[11px] font-bold uppercase transition-all flex items-center justify-center ${
                    fontSize === sz
                      ? "bg-[#B48C35] text-white"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-current opacity-20" />

            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontFamily("serif")}
                className={`px-2 py-0.5 rounded text-[11px] font-serif ${
                  fontFamily === "serif" ? "bg-[#B48C35] text-white" : "opacity-70 hover:opacity-100"
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily("sans")}
                className={`px-2 py-0.5 rounded text-[11px] font-sans ${
                  fontFamily === "sans" ? "bg-[#B48C35] text-white" : "opacity-70 hover:opacity-100"
                }`}
              >
                Sans
              </button>
            </div>
          </div>
        </div>

        {/* In-Book Search Input */}
        {isSearching && (
          <div className={`px-4 sm:px-6 py-2.5 border-b ${activeTheme.border} bg-black/5 dark:bg-white/5 flex items-center gap-2 animate-in slide-in-from-top-2 duration-150`}>
            <Search className="w-4 h-4 opacity-50 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words or phrases in this book..."
              className="w-full bg-transparent text-xs sm:text-sm focus:outline-none placeholder:opacity-50"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-xs opacity-60 hover:opacity-100">
                Clear
              </button>
            )}
          </div>
        )}

        {/* Main Reader View with optional TOC Sidebar */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Table of Contents Drawer */}
          {isTocOpen && (
            <div className={`w-72 sm:w-80 border-r ${activeTheme.border} ${activeTheme.bg} flex flex-col z-20 shrink-0 shadow-lg animate-in slide-in-from-left duration-200`}>
              <div className={`p-4 border-b ${activeTheme.border} flex items-center justify-between`}>
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" />
                  Chapters ({book.chapters.length})
                </h3>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="p-1 rounded text-current opacity-60 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {book.chapters.map((ch, idx) => {
                  const isCurrent = idx === currentChapterIdx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setCurrentChapterIdx(idx);
                        setIsTocOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                        isCurrent
                          ? "bg-[#B48C35] text-white font-bold shadow-sm"
                          : "hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                        isCurrent ? "bg-white text-[#B48C35]" : "bg-black/10 dark:bg-white/10"
                      }`}>
                        {ch.chapterNumber}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{ch.title}</p>
                        {ch.subtitle && (
                          <p className={`text-[10px] truncate ${isCurrent ? "text-white/80" : "opacity-60"}`}>
                            {ch.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Book Content Column */}
          <div
            ref={contentContainerRef}
            className="flex-1 overflow-y-auto px-5 sm:px-12 py-8 sm:py-12 space-y-6 max-w-3xl mx-auto w-full"
          >
            {/* Chapter Header */}
            <div className="text-center space-y-2 pb-6 border-b border-current/10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35]">
                Chapter {currentChapter.chapterNumber} of {book.totalChapters}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                {currentChapter.title}
              </h1>
              {currentChapter.subtitle && (
                <p className="text-sm sm:text-base opacity-75 font-serif italic max-w-lg mx-auto">
                  {currentChapter.subtitle}
                </p>
              )}
              <div className="flex items-center justify-center gap-4 text-xs opacity-60 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{currentChapter.estimatedMinutes || 5} min read
                </span>
                <span>•</span>
                <span>{book.author}</span>
              </div>
            </div>

            {/* Paragraphs with Typography Styling */}
            <div className={`space-y-6 ${fontSizes[fontSize]} ${fontFamilies[fontFamily]}`}>
              {filteredParagraphs.map((para, pIdx) => {
                const isMatch = searchQuery.trim() && para.toLowerCase().includes(searchQuery.toLowerCase());
                return (
                  <p
                    key={pIdx}
                    className={`leading-relaxed text-justify selection:bg-[#B48C35]/30 ${
                      isMatch ? "bg-amber-300/30 p-2 rounded-lg" : ""
                    }`}
                  >
                    {para}
                  </p>
                );
              })}
            </div>

            {/* End of Chapter Card & Study Notes Section */}
            <div className="pt-10 border-t border-current/10 space-y-6">
              <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#B48C35]">
                    <Sparkles className="w-4 h-4" />
                    Chapter Study Reflections & Notes
                  </h4>
                  <button
                    onClick={() => setIsAddingNote(!isAddingNote)}
                    className="text-xs font-bold text-[#B48C35] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Note
                  </button>
                </div>

                {isAddingNote && (
                  <div className="space-y-2 pt-2 animate-in fade-in duration-150">
                    <textarea
                      rows={3}
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Write your spiritual reflections or revelations from this chapter..."
                      className={`w-full p-3 rounded-xl border ${activeTheme.border} bg-white/70 dark:bg-black/30 text-xs focus:outline-none`}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsAddingNote(false)}
                        className="px-3 py-1 text-xs opacity-70 hover:opacity-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNote}
                        className="px-3 py-1 rounded-lg bg-[#B48C35] text-white text-xs font-bold"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                {/* Saved Notes for this chapter */}
                {notes.filter(n => n.chapterId === currentChapter.id).length > 0 ? (
                  <div className="space-y-2">
                    {notes
                      .filter(n => n.chapterId === currentChapter.id)
                      .map((note) => (
                        <div
                          key={note.id}
                          className="p-3 rounded-xl bg-white/60 dark:bg-black/20 text-xs border border-current/10"
                        >
                          <p className="font-serif leading-relaxed">{note.note}</p>
                          <span className="text-[10px] opacity-50 block mt-1">{note.createdAt}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-xs opacity-50 italic">
                    No notes recorded yet for this chapter. Tap "Add Note" to write down key insights.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Progress Bar */}
        <footer className={`px-4 sm:px-6 py-3 border-t ${activeTheme.border} ${activeTheme.header} flex items-center justify-between shrink-0`}>
          <button
            onClick={handlePrevChapter}
            disabled={currentChapterIdx === 0}
            className={`px-3 py-1.5 rounded-xl border ${activeTheme.border} text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentChapterIdx === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Chapter Progress */}
          <div className="text-center">
            <span className="text-xs font-semibold">
              {currentChapterIdx + 1} / {book.totalChapters}
            </span>
            <div className="w-24 sm:w-36 h-1.5 bg-current/15 rounded-full overflow-hidden mx-auto mt-1">
              <div
                className="h-full bg-[#B48C35] rounded-full transition-all duration-300"
                style={{ width: `${((currentChapterIdx + 1) / book.totalChapters) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleNextChapter}
            disabled={currentChapterIdx === book.chapters.length - 1}
            className={`px-3 py-1.5 rounded-xl border ${activeTheme.border} text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentChapterIdx === book.chapters.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};
