import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Maximize2,
  Minimize2,
  FileText,
  Calculator,
  HeartHandshake,
  Flame,
  HelpCircle,
  X,
  Edit3,
  Save,
  Trash2,
  Sun,
  Moon,
  Type,
  Columns3,
  Layers,
  ArrowLeftRight,
  MessageSquare,
  Zap,
  Info
} from "lucide-react";
import { BIBLE_BOOKS_CATALOG } from "../data/bibleData";
import { BibleBook, BibleVerse, BibleVersionCode } from "../types";
import {
  BIBLE_VERSIONS,
  getTranslatedVerseText,
  getParallelTranslations
} from "../data/bibleTranslationsData";
import { getChapterVerses } from "../utils/bibleVerseEngine";
import { streamAiContent, getIsFastMode, setIsFastMode } from "../utils/aiStreaming";
import {
  getCommentaryForVerse,
  getChapterCommentary
} from "../data/bibleCommentaryData";
import { BibleCommentaryModal } from "./BibleCommentaryModal";
import { AiFastLoadingView } from "./AiFastLoadingView";

interface BibleTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  targetBookName?: string;
  targetChapter?: number;
  targetVerse?: number;
  onExploreMathemaSermon?: (reference?: string) => void;
  onExploreApostleMath?: (reference?: string) => void;
}

type ReaderTheme = "parchment" | "light" | "night";
type FontSize = "sm" | "md" | "lg" | "xl";
type ReaderWidth = "narrow" | "normal" | "wide";

interface VerseNote {
  verseKey: string;
  note: string;
  updatedAt: string;
}

export const BibleTab: React.FC<BibleTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  targetBookName,
  targetChapter,
  targetVerse,
  onExploreMathemaSermon,
  onExploreApostleMath
}) => {
  // Version Selection State
  const [selectedVersion, setSelectedVersion] = useState<BibleVersionCode>("KJV");
  const [compareModalVerse, setCompareModalVerse] = useState<{
    book: string;
    chapter: number;
    verse: number;
    baseText: string;
  } | null>(null);

  // Navigation State
  const [selectedTestament, setSelectedTestament] = useState<"All" | "Old Testament" | "New Testament">("All");
  const [selectedBookName, setSelectedBookName] = useState<string>(targetBookName || "Genesis");
  const [selectedChapter, setSelectedChapter] = useState<number>(targetChapter || 1);
  const [highlightedVerse, setHighlightedVerse] = useState<number | undefined>(targetVerse);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Reading Experience Preferences
  const [theme, setTheme] = useState<ReaderTheme>("parchment");
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [readerWidth, setReaderWidth] = useState<ReaderWidth>("normal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Bible Commentary State
  const [selectedCommentaryVerse, setSelectedCommentaryVerse] = useState<{
    book: string;
    chapter: number;
    verse?: number;
    text: string;
    initialFullscreen?: boolean;
  } | null>(null);
  const [showInlineCommentary, setShowInlineCommentary] = useState(false);
  const [expandedInlineCommentaries, setExpandedInlineCommentaries] = useState<Record<string, boolean>>({});

  // Verse Action Menu & AI Modal State (High-Speed Streaming)
  const [activeVerseMenu, setActiveVerseMenu] = useState<{
    book: string;
    chapter: number;
    verse: number;
    text: string;
  } | null>(null);
  const [aiModalAction, setAiModalAction] = useState<string | null>(null);
  const [aiModalContent, setAiModalContent] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(25);
  const [aiStreamingText, setAiStreamingText] = useState("");

  // Private Personal Notes State
  const [verseNotes, setVerseNotes] = useState<Record<string, VerseNote>>(() => {
    try {
      const saved = localStorage.getItem("sir_bismark_bible_notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [activeNoteEditing, setActiveNoteEditing] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState("");

  // Copied indicator
  const [copiedVerseId, setCopiedVerseId] = useState<string | null>(null);

  // Respond to target changes from props (e.g. from Daily Scripture "Read Full Chapter")
  useEffect(() => {
    if (targetBookName) {
      setSelectedBookName(targetBookName);
    }
    if (targetChapter) {
      setSelectedChapter(targetChapter);
    }
    if (targetVerse) {
      setHighlightedVerse(targetVerse);
    }
  }, [targetBookName, targetChapter, targetVerse]);

  // Current Book and Chapter
  const currentBook: BibleBook = useMemo(() => {
    return BIBLE_BOOKS_CATALOG.find((b) => b.name === selectedBookName) || BIBLE_BOOKS_CATALOG[0];
  }, [selectedBookName]);

  // Full chapter range for every book (e.g. 1..50 for Genesis, 1..150 for Psalms)
  const availableChapters = useMemo(() => {
    const total = currentBook.chapterCount || 1;
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [currentBook]);

  // Ensure chapter is valid
  useEffect(() => {
    if (!availableChapters.includes(selectedChapter)) {
      setSelectedChapter(1);
    }
  }, [availableChapters, selectedChapter]);

  // Asynchronous full chapter verses engine
  const [loadedVerses, setLoadedVerses] = useState<BibleVerse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingVerses(true);

    // If current book has local pre-cached chapter, load instantly
    if (currentBook.chapters && currentBook.chapters[selectedChapter]) {
      const immediate = currentBook.chapters[selectedChapter].map((v) => ({
        verse: v.verse,
        text: getTranslatedVerseText(v.text, currentBook.name, selectedChapter, v.verse, selectedVersion),
        isRedLetter: v.isRedLetter
      }));
      setLoadedVerses(immediate);
    }

    getChapterVerses(currentBook.name, selectedChapter, selectedVersion)
      .then((verses) => {
        if (isMounted) {
          setLoadedVerses(verses);
          setIsLoadingVerses(false);
        }
      })
      .catch((err) => {
        console.error("Error loading chapter verses:", err);
        if (isMounted) setIsLoadingVerses(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentBook.name, selectedChapter, selectedVersion]);

  const currentChapterVerses = useMemo(() => {
    if (loadedVerses.length > 0) {
      return loadedVerses;
    }
    if (currentBook.chapters && currentBook.chapters[selectedChapter]) {
      return currentBook.chapters[selectedChapter].map((v) => ({
        verse: v.verse,
        text: getTranslatedVerseText(v.text, currentBook.name, selectedChapter, v.verse, selectedVersion),
        isRedLetter: v.isRedLetter
      }));
    }
    return [];
  }, [loadedVerses, currentBook, selectedChapter, selectedVersion]);

  const filteredBooks = useMemo(() => {
    if (selectedTestament === "All") return BIBLE_BOOKS_CATALOG;
    return BIBLE_BOOKS_CATALOG.filter((b) => b.testament === selectedTestament);
  }, [selectedTestament]);

  // Global Search Engine across the Bible Catalog
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: { book: string; chapter: number; verse: number; text: string }[] = [];

    for (const book of BIBLE_BOOKS_CATALOG) {
      for (const [chStr, verses] of Object.entries(book.chapters)) {
        const chNum = Number(chStr);
        for (const v of verses) {
          const renderedText = getTranslatedVerseText(v.text, book.name, chNum, v.verse, selectedVersion);
          if (
            renderedText.toLowerCase().includes(query) ||
            v.text.toLowerCase().includes(query) ||
            `${book.name} ${chNum}:${v.verse}`.toLowerCase().includes(query)
          ) {
            results.push({
              book: book.name,
              chapter: chNum,
              verse: v.verse,
              text: renderedText
            });
            if (results.length >= 80) return results;
          }
        }
      }
    }
    return results;
  }, [searchQuery, selectedVersion]);

  // Chapter Navigation across all books and all chapters
  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
      setHighlightedVerse(undefined);
    } else {
      const bookIndex = BIBLE_BOOKS_CATALOG.findIndex((b) => b.name === currentBook.name);
      if (bookIndex > 0) {
        const prevBook = BIBLE_BOOKS_CATALOG[bookIndex - 1];
        setSelectedBookName(prevBook.name);
        setSelectedChapter(prevBook.chapterCount || 1);
        setHighlightedVerse(undefined);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < (currentBook.chapterCount || 1)) {
      setSelectedChapter(selectedChapter + 1);
      setHighlightedVerse(undefined);
    } else {
      const bookIndex = BIBLE_BOOKS_CATALOG.findIndex((b) => b.name === currentBook.name);
      if (bookIndex < BIBLE_BOOKS_CATALOG.length - 1) {
        const nextBook = BIBLE_BOOKS_CATALOG[bookIndex + 1];
        setSelectedBookName(nextBook.name);
        setSelectedChapter(1);
        setHighlightedVerse(undefined);
      }
    }
  };

  // Copy verse handler
  const handleCopyVerse = async (book: string, chapter: number, verse: number, text: string) => {
    const formatted = `"${text}" — ${book} ${chapter}:${verse} (${selectedVersion})`;
    try {
      await navigator.clipboard.writeText(formatted);
      const key = `${book}-${chapter}-${verse}`;
      setCopiedVerseId(key);
      setTimeout(() => setCopiedVerseId(null), 2000);
    } catch {
      // ignore
    }
  };

  // Read Chapter Aloud
  const handleReadChapterAloud = () => {
    if (currentChapterVerses.length === 0) return;
    const textToRead = `${currentBook.name} Chapter ${selectedChapter}, ${selectedVersion} translation. ` +
      currentChapterVerses.map((v) => {
        const t = getTranslatedVerseText(v.text, currentBook.name, selectedChapter, v.verse, selectedVersion);
        return `Verse ${v.verse}. ${t}`;
      }).join(" ");
    onToggleSpeak(textToRead);
  };

  // AI Actions on Verse (High-Speed Streaming with 0ms Cache)
  const handleRunAiVerseAction = (action: string) => {
    if (!activeVerseMenu) return;
    setAiModalAction(action);
    setAiModalContent(null);
    setIsAiLoading(true);
    setAiProgress(25);
    setAiStreamingText("");

    const ref = `${activeVerseMenu.book} ${activeVerseMenu.chapter}:${activeVerseMenu.verse}`;
    const cacheKey = `ai_bible_stream_${activeVerseMenu.book}_${activeVerseMenu.chapter}_${activeVerseMenu.verse}_${action}`;

    streamAiContent({
      actionType: action,
      scriptureReference: ref,
      scriptureText: activeVerseMenu.text,
      scriptureTheme: `${activeVerseMenu.book} Exegesis`,
      fastMode: getIsFastMode(),
      storageKey: cacheKey,
      onProgress: (p) => setAiProgress(p),
      onChunk: (_chunk, accumulated) => {
        setAiStreamingText(accumulated);
      },
      onComplete: (fullText, data) => {
        setIsAiLoading(false);
        if (data) {
          const item = data.data || data;
          if (action.includes("Prayer") && !action.includes("Points")) {
            const prayerText = `${item.title || "Prayer of Faith"}\n\n` +
              `ADORATION:\n${item.adoration || item.sections?.adoration || ""}\n\n` +
              `CONFESSION & SURRENDER:\n${item.confession || item.confessionAndSurrender || item.sections?.confessionAndSurrender || ""}\n\n` +
              `THANKSGIVING:\n${item.thanksgiving || item.sections?.thanksgiving || ""}\n\n` +
              `PETITION:\n${item.petition || item.sections?.petition || ""}\n\n` +
              `WARFARE AUTHORITY:\n${item.warfareDeclaration || item.spiritualWarfare || item.sections?.spiritualWarfare || ""}\n\n` +
              `${item.closing || item.declarationInJesusName || "In Jesus' mighty Name, Amen."}`;
            setAiModalContent(prayerText);
          } else if (action.includes("Points") || action.includes("Prayer Points")) {
            const points = (item.prayerPoints || []).map((p: any) => `${p.pointNumber}. ${p.focus}\nPromise: ${p.scripturePromise}\nDeclaration: ${p.prayerDeclaration}`).join("\n\n");
            const pointsText = `${item.title || "Strategic Prayer Points"}\n\n${item.introduction || ""}\n\n${points}\n\nPROPHETIC DECREE:\n${item.propheticDecree || ""}`;
            setAiModalContent(pointsText);
          } else if (action.includes("MathemaSermon")) {
            const mathText = `${item.title || "MathemaSermon Insight"}\n` +
              `Mathematical Concept: ${item.mathematicalConcept || "Geometric Alignment"}\n` +
              (item.formula ? `Formula: ${item.formula}\n\n` : "\n") +
              `ANALOGY & EXEGESIS:\n${item.mathematicalAnalogy || item.reflection || ""}\n\n` +
              `HOMILETIC REVELATION:\n${item.homileticApplication || ""}\n\n` +
              `ALTAR CALL PRAYER:\n${item.altarCallPrayer || "In Jesus' Name, Amen."}`;
            setAiModalContent(mathText);
          } else if (action.includes("Explain") || action.includes("Exposition") || action.includes("Context")) {
            const refs = (item.crossReferences || []).map((r: any) => typeof r === "string" ? `• ${r}` : `• ${r.reference}: ${r.connection}`).join("\n");
            const exposText = `${item.title || "Expository Analysis"}\n\n` +
              `HISTORICAL CONTEXT:\n${item.historicalContext || ""}\n\n` +
              `ORIGINAL LANGUAGE INSIGHT:\n${item.originalLanguageInsight || item.originalLanguageWordStudy || ""}\n\n` +
              `DOCTRINAL MEANING:\n${item.doctrinalMeaning || item.theologicalDoctrine || ""}\n\n` +
              (refs ? `CROSS REFERENCES:\n${refs}\n\n` : "") +
              `LIFE TRANSFORMATION:\n${item.lifeTransformation || item.lifeApplication || ""}`;
            setAiModalContent(exposText);
          } else {
            // Devotion or general reflection
            const dev = item.devotion || item;
            const devText = `${dev.title || "Daily Devotion"}\n\n` +
              `${dev.reflection || ""}\n\n` +
              `Practical Application: ${dev.practicalApplication || ""}\n\n` +
              `Guided Prayer: ${dev.guidedPrayer || ""}\n\n` +
              `Action Step: ${dev.actionStep || ""}`;
            setAiModalContent(devText);
          }
        } else if (fullText) {
          setAiModalContent(fullText);
        } else {
          setAiModalContent(`Scripture Exposition on ${activeVerseMenu.book} ${activeVerseMenu.chapter}:${activeVerseMenu.verse} (${selectedVersion}):\n\n"${activeVerseMenu.text}"\n\nThis passage emphasizes God's sovereign covenant, holy love, and eternal faithfulness.`);
        }
      },
      onError: () => {
        setIsAiLoading(false);
        // Fallback gracefully to instant theological commentary
        const comm = getCommentaryForVerse(activeVerseMenu.book, activeVerseMenu.chapter, activeVerseMenu.verse, activeVerseMenu.text);
        setAiModalContent(
          `Scripture Exposition on ${activeVerseMenu.book} ${activeVerseMenu.chapter}:${activeVerseMenu.verse} (${selectedVersion}):\n\n"${activeVerseMenu.text}"\n\n` +
          `Matthew Henry: ${comm.matthewHenry}\n\n` +
          `Spurgeon: "${comm.spurgeon}"\n\n` +
          `Apostolic Rhema: ${comm.apostolicRhema}`
        );
      }
    });
  };

  // Notes handling
  const handleSaveNote = (verseKey: string) => {
    if (!tempNoteText.trim()) return;
    const updated = {
      ...verseNotes,
      [verseKey]: {
        verseKey,
        note: tempNoteText.trim(),
        updatedAt: new Date().toLocaleDateString()
      }
    };
    setVerseNotes(updated);
    try {
      localStorage.setItem("sir_bismark_bible_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setActiveNoteEditing(null);
    setTempNoteText("");
  };

  const handleDeleteNote = (verseKey: string) => {
    const updated = { ...verseNotes };
    delete updated[verseKey];
    setVerseNotes(updated);
    try {
      localStorage.setItem("sir_bismark_bible_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Styling classes for themes
  const themeClasses = {
    parchment: "bg-[#FDFBF7] text-[#16235A] border-[#E5D5BC]",
    light: "bg-white text-slate-900 border-slate-200",
    night: "bg-[#0B1120] text-slate-100 border-slate-800"
  };

  const fontSizeClasses = {
    sm: "text-sm sm:text-base leading-relaxed",
    md: "text-base sm:text-lg leading-relaxed",
    lg: "text-lg sm:text-xl leading-loose",
    xl: "text-xl sm:text-2xl leading-loose"
  };

  const readerWidthClasses = {
    narrow: "max-w-2xl mx-auto",
    normal: "max-w-4xl mx-auto",
    wide: "w-full"
  };

  const currentVersionInfo = BIBLE_VERSIONS.find((v) => v.code === selectedVersion) || BIBLE_VERSIONS[0];

  return (
    <div className={`space-y-6 pb-28 animate-in fade-in duration-150 ${isFullscreen ? "fixed inset-0 z-50 bg-[#FDFBF7] p-6 overflow-y-auto" : ""}`}>
      {/* 1. Header Banner & Translation Selector Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#16235A] via-[#24357D] to-[#16235A] text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#B48C35] text-white shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                  The Holy Bible
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#B48C35] text-white text-[11px] font-mono font-black uppercase tracking-wider shadow-xs">
                  {selectedVersion}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-serif italic">
                {currentVersionInfo.name} ({currentVersionInfo.badge}) • Old & New Testaments (66 Books)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadChapterAloud}
              className="px-3 py-1.5 rounded-xl bg-[#B48C35] hover:bg-[#996515] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? "Stop" : `Listen (${selectedVersion})`}</span>
            </button>

            <button
              onClick={() => setShowControls(!showControls)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Reader Settings"
            >
              <Sliders className="w-4 h-4 text-[#DCC398]" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reader"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Multi-Version Translation Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1 text-xs text-slate-300 font-semibold">
            <span className="hidden sm:inline">Version:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {BIBLE_VERSIONS.map((ver) => {
              const isActive = selectedVersion === ver.code;
              return (
                <button
                  key={ver.code}
                  onClick={() => setSelectedVersion(ver.code)}
                  title={`${ver.name}: ${ver.description}`}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-[#16235A] shadow-md ring-2 ring-[#B48C35]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {ver.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#DCC398] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search all 66 books by word, phrase, topic (e.g. 'joy of the Lord', 'faith', 'righteousness', 'John 3:16')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#B48C35]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#DCC398] hover:text-white font-bold uppercase cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Reader Preferences Bar (Collapsible) */}
        {showControls && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-in fade-in">
            {/* Theme */}
            <div>
              <span className="text-slate-400 font-bold block mb-1.5">Theme:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: "parchment", label: "Parchment", bg: "bg-[#FDFBF7] text-[#16235A]" },
                  { id: "light", label: "Clean Light", bg: "bg-white text-slate-900" },
                  { id: "night", label: "Sanctuary Night", bg: "bg-slate-950 text-white" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as ReaderTheme)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      theme === t.id ? "border-[#B48C35] ring-2 ring-[#B48C35]" : "border-white/20"
                    } ${t.bg}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <span className="text-slate-400 font-bold block mb-1.5">Font Size:</span>
              <div className="flex items-center gap-1.5">
                {(["sm", "md", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                      fontSize === s ? "bg-[#B48C35] text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Width */}
            <div>
              <span className="text-slate-400 font-bold block mb-1.5">Reading Column:</span>
              <div className="flex items-center gap-1.5">
                {(["narrow", "normal", "wide"] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setReaderWidth(w)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                      readerWidth === w ? "bg-[#B48C35] text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. SEARCH RESULTS VIEW                                   */}
      {/* ======================================================== */}
      {searchQuery ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#16235A] font-bold uppercase tracking-wider px-1">
            <span>{searchResults.length} verse(s) found for "{searchQuery}" ({selectedVersion})</span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#9333EA] hover:underline font-bold cursor-pointer"
            >
              Return to Reader
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E8E0F0] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#B48C35] opacity-60" />
              <p className="font-serif font-bold text-base text-[#16235A]">
                No Scripture verses found matching "{searchQuery}".
              </p>
              <p className="text-xs text-slate-500">
                Try searching for words like 'joy', 'armor', 'faith', 'righteousness', or specific chapters.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {searchResults.map((res, idx) => {
                const verseKey = `${res.book}-${res.chapter}-${res.verse}`;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#E8E0F0] hover:border-[#B48C35] transition-all space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <button
                        onClick={() => {
                          setSelectedBookName(res.book);
                          setSelectedChapter(res.chapter);
                          setHighlightedVerse(res.verse);
                          setSearchQuery("");
                        }}
                        className="text-xs font-bold uppercase tracking-widest text-[#B48C35] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                      >
                        <span>{res.book} {res.chapter}:{res.verse} ({selectedVersion})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyVerse(res.book, res.chapter, res.verse, res.text)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#16235A] hover:bg-slate-100 cursor-pointer"
                          title="Copy"
                        >
                          {copiedVerseId === verseKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() =>
                            onShareItem(
                              `${res.book} ${res.chapter}:${res.verse}`,
                              res.text,
                              `${res.book} ${res.chapter}:${res.verse} (${selectedVersion})`
                            )
                          }
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#16235A] hover:bg-slate-100 cursor-pointer"
                          title="Share"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-base font-serif italic text-[#16235A] leading-relaxed">
                      "{res.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ======================================================== */
        /* 3. PRIMARY BIBLE READER INTERFACE                        */
        /* ======================================================== */
        <div className="space-y-4">
          {/* Testament & Book Selector Controls */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E0F0] shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Testament Filters */}
              <div className="flex items-center gap-1.5">
                {(["All", "Old Testament", "New Testament"] as const).map((t) => {
                  const count = t === "All" ? 66 : t === "Old Testament" ? 39 : 27;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTestament(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        selectedTestament === t
                          ? "bg-[#16235A] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span>{t}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedTestament === t ? "bg-[#B48C35] text-white" : "bg-slate-200 text-slate-700"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Jump to Book Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Book:
                </label>
                <select
                  value={currentBook.name}
                  onChange={(e) => {
                    const target = e.target.value;
                    setSelectedBookName(target);
                    const book = BIBLE_BOOKS_CATALOG.find((b) => b.name === target);
                    if (book) {
                      setSelectedChapter(1);
                      setHighlightedVerse(undefined);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-serif font-bold text-[#16235A]"
                >
                  {filteredBooks.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name} ({b.testament === "Old Testament" ? "OT" : "NT"} • {b.group})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Carousel of Books */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filteredBooks.map((b) => {
                const isSelected = selectedBookName === b.name;
                return (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBookName(b.name);
                      setSelectedChapter(1);
                      setHighlightedVerse(undefined);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-[#B48C35] text-white border-[#B48C35] shadow-xs"
                        : "bg-white border-slate-200 text-[#16235A] hover:border-[#B48C35]"
                    }`}
                  >
                    <span>{b.name}</span>
                    <span className="text-[10px] opacity-75 font-normal ml-1">({b.group})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Selector Grid */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E0F0] shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#16235A]">
                {currentBook.name} Chapters ({availableChapters.length})
              </span>
              <span className="text-xs text-slate-500 font-serif italic">
                {currentBook.summary}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 max-h-28 overflow-y-auto pr-1">
              {availableChapters.map((ch) => (
                <button
                  key={ch}
                  onClick={() => {
                    setSelectedChapter(ch);
                    setHighlightedVerse(undefined);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center cursor-pointer ${
                    selectedChapter === ch
                      ? "bg-[#16235A] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Verses Reading Container */}
          <div className={`p-6 sm:p-10 rounded-2xl shadow-sm border transition-colors space-y-6 ${themeClasses[theme]} ${readerWidthClasses[readerWidth]}`}>
            {/* Chapter Header with Navigation Arrows */}
            <div className="flex items-center justify-between border-b border-current/10 pb-4">
              <button
                onClick={handlePrevChapter}
                className="px-3 py-1.5 rounded-xl bg-current/5 hover:bg-current/10 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                    {currentBook.name} {selectedChapter}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#B48C35] text-white text-xs font-mono font-bold">
                    {selectedVersion}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-widest opacity-75 font-mono">
                  {currentBook.testament} • {currentBook.group}
                </span>
              </div>

              <button
                onClick={handleNextChapter}
                className="px-3 py-1.5 rounded-xl bg-current/5 hover:bg-current/10 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Commentary Quick Bar for Chapter */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B48C35]" />
                <span className="font-serif font-bold text-[#16235A] dark:text-amber-200">
                  {currentBook.name} Chapter {selectedChapter} Commentary
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  (Matthew Henry, Spurgeon & Apostolic Rhema)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setSelectedCommentaryVerse({
                      book: currentBook.name,
                      chapter: selectedChapter,
                      verse: 1,
                      text: currentChapterVerses[0]?.text || "",
                      initialFullscreen: false
                    })
                  }
                  className="px-3 py-1 rounded-lg bg-[#B48C35] hover:bg-[#996515] text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  title="Open Chapter Commentary"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Commentary</span>
                </button>

                <button
                  onClick={() =>
                    setSelectedCommentaryVerse({
                      book: currentBook.name,
                      chapter: selectedChapter,
                      verse: 1,
                      text: currentChapterVerses[0]?.text || "",
                      initialFullscreen: true
                    })
                  }
                  className="px-3 py-1 rounded-lg bg-[#16235A] hover:bg-[#24357D] text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  title="Open Full-Screen Commentary Studio"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Full-Screen Studio</span>
                </button>

                <button
                  onClick={() => setShowInlineCommentary(!showInlineCommentary)}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors border ${
                    showInlineCommentary
                      ? "bg-[#16235A] text-white border-[#16235A]"
                      : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B48C35]" />
                  <span>{showInlineCommentary ? "Hide Inline" : "Inline Notes"}</span>
                </button>
              </div>
            </div>

            {/* List of Verses */}
            <div className="space-y-4">
              {currentChapterVerses.map((v) => {
                const verseKey = `${currentBook.name}-${selectedChapter}-${v.verse}`;
                const isSaved = isBookmarked(verseKey, "bible");
                const hasNote = !!verseNotes[verseKey];
                const isTargetHighlighted = highlightedVerse === v.verse;
                const isInlineCommentaryActive = showInlineCommentary || !!expandedInlineCommentaries[verseKey];
                const renderedVerseText = getTranslatedVerseText(
                  v.text,
                  currentBook.name,
                  selectedChapter,
                  v.verse,
                  selectedVersion
                );
                const comm = getCommentaryForVerse(currentBook.name, selectedChapter, v.verse, renderedVerseText);

                return (
                  <div
                    key={`${currentBook.name}-${selectedChapter}-${v.verse}`}
                    id={`verse-${v.verse}`}
                    className={`group p-3.5 rounded-xl transition-all space-y-2 border ${
                      isTargetHighlighted
                        ? "bg-amber-100/60 border-[#B48C35] ring-2 ring-[#B48C35]"
                        : "border-transparent hover:bg-current/5 hover:border-current/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B48C35]/15 text-[#B48C35] text-xs font-mono font-bold flex items-center justify-center mt-0.5">
                        {v.verse}
                      </span>

                      <p className={`flex-1 font-serif leading-relaxed ${fontSizeClasses[fontSize]}`}>
                        {renderedVerseText}
                      </p>
                    </div>

                    {/* Inline Verse Commentary Preview (when toggled) */}
                    {isInlineCommentaryActive && (
                      <div className="ml-9 p-3.5 rounded-xl bg-amber-50/80 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-500/30 text-xs space-y-2 animate-in fade-in transition-all">
                        <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-slate-800 pb-1.5">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" />
                            <span className="font-bold text-[#16235A] dark:text-amber-300 text-[11px] uppercase tracking-wider">
                              Verse {v.verse} Commentary Insights
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setSelectedCommentaryVerse({
                                book: currentBook.name,
                                chapter: selectedChapter,
                                verse: v.verse,
                                text: renderedVerseText
                              })
                            }
                            className="text-[#B48C35] hover:text-[#996515] dark:text-amber-400 font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Open Full Commentary</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="space-y-1.5 text-slate-700 dark:text-slate-200">
                          {comm.matthewHenry && (
                            <p className="font-serif leading-relaxed line-clamp-2">
                              <strong className="text-[#16235A] dark:text-amber-200 font-sans">Matthew Henry: </strong>
                              {comm.matthewHenry}
                            </p>
                          )}
                          {comm.spurgeon && (
                            <p className="font-serif italic leading-relaxed line-clamp-2 text-slate-600 dark:text-slate-300">
                              <strong className="text-amber-800 dark:text-amber-400 font-sans not-italic">Spurgeon: </strong>
                              "{comm.spurgeon}"
                            </p>
                          )}
                          {comm.apostolicRhema && (
                            <p className="font-serif leading-relaxed line-clamp-2 text-[#16235A] dark:text-slate-200">
                              <strong className="text-[#B48C35] font-sans">Apostolic Rhema: </strong>
                              {comm.apostolicRhema}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Private Personal Note Display (if exists) */}
                    {hasNote && (
                      <div className="ml-9 p-3 rounded-xl bg-[#FDF5E6] border border-[#E5D5BC] text-xs text-[#16235A] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1 text-[#B48C35]">
                            <Edit3 className="w-3.5 h-3.5" /> Study Note ({verseNotes[verseKey].updatedAt}):
                          </span>
                          <button
                            onClick={() => handleDeleteNote(verseKey)}
                            className="text-slate-400 hover:text-red-600"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="italic">{verseNotes[verseKey].note}</p>
                      </div>
                    )}

                    {/* Inline Note Editor (if open) */}
                    {activeNoteEditing === verseKey && (
                      <div className="ml-9 p-3 rounded-xl bg-white border border-slate-300 space-y-2 text-xs">
                        <textarea
                          rows={2}
                          value={tempNoteText}
                          onChange={(e) => setTempNoteText(e.target.value)}
                          placeholder="Type your personal revelation, prayer, or study note..."
                          className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setActiveNoteEditing(null)}
                            className="px-2 py-1 rounded bg-slate-100 text-slate-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(verseKey)}
                            className="px-3 py-1 rounded bg-[#16235A] text-white font-bold flex items-center gap-1"
                          >
                            <Save className="w-3.5 h-3.5" /> Save Note
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center justify-end gap-2 text-xs opacity-75 group-hover:opacity-100 transition-opacity pt-1">
                      {/* Commentary Button */}
                      <button
                        onClick={() =>
                          setSelectedCommentaryVerse({
                            book: currentBook.name,
                            chapter: selectedChapter,
                            verse: v.verse,
                            text: renderedVerseText
                          })
                        }
                        className="px-2 py-1 rounded-lg bg-[#16235A]/10 hover:bg-[#16235A]/20 text-[#16235A] dark:text-white font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                        title="Open Matthew Henry, Spurgeon & Apostolic Commentary"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" />
                        <span>Commentary</span>
                      </button>

                      {/* Compare Translations Button */}
                      <button
                        onClick={() =>
                          setCompareModalVerse({
                            book: currentBook.name,
                            chapter: selectedChapter,
                            verse: v.verse,
                            baseText: v.text
                          })
                        }
                        className="px-2 py-1 rounded-lg bg-[#B48C35]/15 hover:bg-[#B48C35]/25 text-[#B48C35] font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                        title="Compare across 6 translations"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        <span>Compare Versions</span>
                      </button>

                      {/* Ask AI / Explore Menu */}
                      <button
                        onClick={() =>
                          setActiveVerseMenu({
                            book: currentBook.name,
                            chapter: selectedChapter,
                            verse: v.verse,
                            text: renderedVerseText
                          })
                        }
                        className="px-2 py-1 rounded-lg bg-[#9333EA]/10 hover:bg-[#9333EA]/20 text-[#9333EA] font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI</span>
                      </button>

                      {/* Add Note Button */}
                      <button
                        onClick={() => {
                          setActiveNoteEditing(verseKey);
                          setTempNoteText(verseNotes[verseKey]?.note || "");
                        }}
                        className="px-2 py-1 rounded-lg hover:bg-current/10 text-current font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{hasNote ? "Edit Note" : "Note"}</span>
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => handleCopyVerse(currentBook.name, selectedChapter, v.verse, renderedVerseText)}
                        className="px-2 py-1 rounded-lg hover:bg-current/10 text-current font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {copiedVerseId === verseKey ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedVerseId === verseKey ? "Copied" : "Copy"}</span>
                      </button>

                      {/* Share */}
                      <button
                        onClick={() =>
                          onShareItem(
                            `${currentBook.name} ${selectedChapter}:${v.verse}`,
                            renderedVerseText,
                            `${currentBook.name} ${selectedChapter}:${v.verse} (${selectedVersion})`
                          )
                        }
                        className="px-2 py-1 rounded-lg hover:bg-current/10 text-current font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() =>
                          onToggleBookmark({
                            type: "bible",
                            title: `${currentBook.name} ${selectedChapter}:${v.verse} (${selectedVersion})`,
                            reference: `${currentBook.name} ${selectedChapter}:${v.verse}`,
                            snippet: renderedVerseText,
                            targetId: verseKey
                          })
                        }
                        className={`px-2 py-1 rounded-lg hover:bg-current/10 font-semibold flex items-center gap-1 text-[11px] cursor-pointer ${
                          isSaved ? "text-[#B48C35] font-bold" : "text-current"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                      </button>

                      {/* Audio */}
                      <button
                        onClick={() => onToggleSpeak(`${currentBook.name} Chapter ${selectedChapter}, Verse ${v.verse}: ${renderedVerseText}`)}
                        className="px-2 py-1 rounded-lg hover:bg-current/10 text-current font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Audio</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Chapter Navigation Bar */}
            <div className="flex items-center justify-between border-t border-current/10 pt-6">
              <button
                onClick={handlePrevChapter}
                className="px-4 py-2 rounded-xl bg-current/10 hover:bg-current/15 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={handleNextChapter}
                className="px-4 py-2 rounded-xl bg-[#16235A] text-white hover:bg-[#24357D] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PARALLEL TRANSLATIONS COMPARISON MODAL                */}
      {/* ======================================================== */}
      {compareModalVerse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-[#16235A] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
            <div className="p-4 bg-gradient-to-r from-[#16235A] to-[#B48C35] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ArrowLeftRight className="w-5 h-5 text-amber-300" />
                <div>
                  <h4 className="font-serif font-bold text-base sm:text-lg">
                    Parallel Bible Translations Comparison
                  </h4>
                  <p className="text-xs text-slate-200 font-mono">
                    {compareModalVerse.book} {compareModalVerse.chapter}:{compareModalVerse.verse}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCompareModalVerse(null)}
                className="p-1 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3.5">
              {BIBLE_VERSIONS.map((ver) => {
                const text = getTranslatedVerseText(
                  compareModalVerse.baseText,
                  compareModalVerse.book,
                  compareModalVerse.chapter,
                  compareModalVerse.verse,
                  ver.code
                );

                return (
                  <div
                    key={ver.code}
                    className={`p-4 rounded-xl border transition-all space-y-1.5 ${
                      selectedVersion === ver.code
                        ? "bg-amber-50/70 border-[#B48C35] ring-1 ring-[#B48C35]"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#16235A] text-white font-mono font-bold text-xs">
                          {ver.code}
                        </span>
                        <span className="font-bold text-xs text-[#16235A]">{ver.name}</span>
                        <span className="text-[10px] text-slate-500 hidden sm:inline">({ver.badge})</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyVerse(compareModalVerse.book, compareModalVerse.chapter, compareModalVerse.verse, text)}
                          className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                          title="Copy this translation"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVersion(ver.code);
                            setCompareModalVerse(null);
                          }}
                          className="text-[11px] font-bold text-[#B48C35] hover:underline ml-1"
                        >
                          Read in {ver.code}
                        </button>
                      </div>
                    </div>

                    <p className="font-serif text-sm text-slate-800 italic leading-relaxed">
                      "{text}"
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 italic">
                Comparing all 6 Major Authorized and Modern English Translations
              </span>
              <button
                onClick={() => setCompareModalVerse(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. VERSE ACTIONS & AI EXPLORATION MODAL                  */}
      {/* ======================================================== */}
      {activeVerseMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-[#16235A] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-[#16235A] to-[#9333EA] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <div>
                  <h4 className="font-serif font-bold text-base">
                    Scripture Actions & AI Tools
                  </h4>
                  <p className="text-xs text-slate-200 font-mono">
                    {activeVerseMenu.book} {activeVerseMenu.chapter}:{activeVerseMenu.verse} ({selectedVersion})
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveVerseMenu(null);
                  setAiModalAction(null);
                  setAiModalContent(null);
                }}
                className="p-1 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Verse Reference Card */}
              <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E5D5BC] space-y-1">
                <span className="font-mono font-bold text-[#B48C35]">
                  {activeVerseMenu.book} {activeVerseMenu.chapter}:{activeVerseMenu.verse} ({selectedVersion})
                </span>
                <p className="font-serif text-sm italic text-slate-800 leading-relaxed">
                  "{activeVerseMenu.text}"
                </p>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleRunAiVerseAction("Explain This Verse")}
                  className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Explain This Verse</span>
                </button>

                <button
                  onClick={() => handleRunAiVerseAction("Context & Historical Background")}
                  className="p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Historical Context</span>
                </button>

                <button
                  onClick={() => handleRunAiVerseAction("Create Devotion from Verse")}
                  className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Create Devotion</span>
                </button>

                <button
                  onClick={() => handleRunAiVerseAction("Create Guided Prayer")}
                  className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Create Prayer</span>
                </button>

                <button
                  onClick={() => handleRunAiVerseAction("Explore with MathemaSermon")}
                  className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Calculator className="w-4 h-4 text-amber-600" />
                  <span>MathemaSermon Analogy</span>
                </button>

                <button
                  onClick={() => {
                    const v = activeVerseMenu;
                    setActiveVerseMenu(null);
                    setSelectedCommentaryVerse({
                      book: v.book,
                      chapter: v.chapter,
                      verse: v.verse,
                      text: v.text
                    });
                  }}
                  className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#B48C35]" />
                  <span>Theological Commentary (Matthew Henry & Spurgeon)</span>
                </button>

                <button
                  onClick={() => handleRunAiVerseAction("The Joy of the Lord (Encouragement)")}
                  className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 font-bold text-left flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span>The Joy of the Lord</span>
                </button>
              </div>

              {/* Fast Streaming AI Loading State */}
              {isAiLoading && (
                <AiFastLoadingView
                  title={`Generating ${aiModalAction} for ${activeVerseMenu.book} ${activeVerseMenu.chapter}:${activeVerseMenu.verse}`}
                  actionType={aiModalAction || "Verse Exegesis"}
                  progress={aiProgress}
                  streamingText={aiStreamingText}
                  isStreaming={true}
                  onCancel={() => setIsAiLoading(false)}
                />
              )}

              {/* AI Content Output */}
              {aiModalContent && !isAiLoading && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-[#B48C35]/50 space-y-3 animate-in fade-in shadow-lg">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 flex-wrap gap-2">
                    <span className="font-mono font-bold text-[#DCC398] uppercase text-xs">
                      ✨ {aiModalAction}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const vKey = `${activeVerseMenu.book}-${activeVerseMenu.chapter}-${activeVerseMenu.verse}`;
                          const updated = {
                            ...verseNotes,
                            [vKey]: {
                              verseKey: vKey,
                              note: `[AI ${aiModalAction}]\n\n${aiModalContent}`,
                              updatedAt: new Date().toLocaleDateString()
                            }
                          };
                          setVerseNotes(updated);
                          try {
                            localStorage.setItem("sir_bismark_bible_notes", JSON.stringify(updated));
                          } catch {
                            // ignore
                          }
                          setCopiedVerseId("ai-note-saved");
                          setTimeout(() => setCopiedVerseId(null), 2000);
                        }}
                        className="text-xs text-amber-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{copiedVerseId === "ai-note-saved" ? "Saved to Notes!" : "Save to Notes"}</span>
                      </button>

                      <button
                        onClick={() => onToggleSpeak(aiModalContent)}
                        className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        title="Listen to AI Exposition"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Audio
                      </button>

                      <button
                        onClick={() => handleCopyVerse(activeVerseMenu.book, activeVerseMenu.chapter, activeVerseMenu.verse, aiModalContent)}
                        className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        title="Copy text"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </button>

                      <button
                        onClick={() =>
                          onShareItem(
                            `${aiModalAction} • ${activeVerseMenu.book} ${activeVerseMenu.chapter}:${activeVerseMenu.verse}`,
                            aiModalContent,
                            `${activeVerseMenu.book} ${activeVerseMenu.chapter}:${activeVerseMenu.verse} (${selectedVersion})`
                          )
                        }
                        className="text-xs text-[#DCC398] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Share
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 whitespace-pre-line leading-relaxed font-serif">
                    {aiModalContent}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setActiveVerseMenu(null);
                  setAiModalAction(null);
                  setAiModalContent(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. BIBLE THEOLOGICAL COMMENTARY MODAL                    */}
      {/* ======================================================== */}
      {selectedCommentaryVerse && (
        <BibleCommentaryModal
          isOpen={!!selectedCommentaryVerse}
          onClose={() => setSelectedCommentaryVerse(null)}
          book={selectedCommentaryVerse.book}
          chapter={selectedCommentaryVerse.chapter}
          verse={selectedCommentaryVerse.verse}
          verseText={selectedCommentaryVerse.text}
          version={selectedVersion}
          initialFullscreen={selectedCommentaryVerse.initialFullscreen}
          onShareItem={onShareItem}
          onToggleSpeak={onToggleSpeak}
          onToggleBookmark={onToggleBookmark}
          isBookmarked={isBookmarked}
          onSaveToNotes={(vKey, noteContent) => {
            const updated = {
              ...verseNotes,
              [vKey]: {
                verseKey: vKey,
                note: noteContent,
                updatedAt: new Date().toLocaleDateString()
              }
            };
            setVerseNotes(updated);
            try {
              localStorage.setItem("sir_bismark_bible_notes", JSON.stringify(updated));
            } catch {
              // ignore
            }
          }}
        />
      )}
    </div>
  );
};

