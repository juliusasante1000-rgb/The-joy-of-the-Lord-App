import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Share2,
  Search,
  Layers,
  ArrowLeftRight,
  Info,
  Edit3,
  X,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import {
  InterlinearWord,
  VerseInterlinear,
  getInterlinearForVerse,
  isOldTestamentBook
} from "../data/bibleOriginalLanguageData";
import { streamAiContent, getIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";

interface BibleInterlinearViewProps {
  book: string;
  chapter: number;
  verse: number;
  verseText: string;
  version?: string;
  onSaveToNotes?: (verseKey: string, noteContent: string) => void;
  onShareItem?: (title: string, content: string, ref: string) => void;
  onToggleSpeak?: (text: string) => void;
}

export const BibleInterlinearView: React.FC<BibleInterlinearViewProps> = ({
  book,
  chapter,
  verse,
  verseText,
  version = "KJV",
  onSaveToNotes,
  onShareItem,
  onToggleSpeak
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "flow" | "table">("grid");
  const [sublinearDisplay, setSublinearDisplay] = useState<"gloss" | "literal" | "both" | "translit">("both");
  const [selectedWord, setSelectedWord] = useState<InterlinearWord | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  // AI Deep Lexicon Streaming
  const [isAiStreaming, setIsAiStreaming] = useState(false);
  const [aiProgress, setAiProgress] = useState(25);
  const [aiStreamingText, setAiStreamingText] = useState("");
  const [aiLexiconResult, setAiLexiconResult] = useState<any>(null);

  // Load curated or structured interlinear
  const interlinearData: VerseInterlinear = React.useMemo(() => {
    return getInterlinearForVerse(book, chapter, verse, verseText);
  }, [book, chapter, verse, verseText]);

  const isHebrew = interlinearData.language.includes("Hebrew") || isOldTestamentBook(book);
  const scriptDirection = isHebrew ? "rtl" : "ltr";

  // Filtered words for search
  const filteredWords = interlinearData.words.filter((w) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      w.originalText.toLowerCase().includes(q) ||
      w.transliteration.toLowerCase().includes(q) ||
      w.englishGloss.toLowerCase().includes(q) ||
      w.strongsNumber.toLowerCase().includes(q) ||
      w.literalMeaning.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveWordNote = (w: InterlinearWord) => {
    if (!onSaveToNotes) return;
    const vKey = `${book}-${chapter}-${verse}`;
    const noteText = `[ORIGINAL LANGUAGE WORD STUDY: ${w.originalText} (${w.transliteration})]\n` +
      `Scripture: ${book} ${chapter}:${verse}\n` +
      `Strong's: ${w.strongsNumber} (${w.partOfSpeech})\n` +
      `Literal English Gloss: "${w.englishGloss}"\n` +
      `Literal Meaning: ${w.literalMeaning}\n` +
      `Root & Etymology: ${w.rootEtymology}\n` +
      `Lexical Definition: ${w.lexicalDefinition}\n` +
      `Theological Significance: ${w.theologicalSignificance}`;

    onSaveToNotes(vKey, noteText);
    setSavedNoteSuccess(true);
    setTimeout(() => setSavedNoteSuccess(false), 2500);
  };

  // Run AI deep interlinear exegesis
  const handleDeepAiExegesis = () => {
    setIsAiStreaming(true);
    setAiProgress(20);
    setAiStreamingText("");
    setAiLexiconResult(null);

    const ref = `${book} ${chapter}:${verse}`;
    streamAiContent({
      actionType: "interlinear",
      scriptureReference: ref,
      scriptureText: verseText,
      scriptureTheme: `${isHebrew ? "Biblical Hebrew" : "Koine Greek"} Lexical Exegesis`,
      fastMode: getIsFastMode(),
      storageKey: `ai_interlinear_${book}_${chapter}_${verse}`,
      onProgress: (p) => setAiProgress(p),
      onChunk: (_chunk, accumulated) => {
        setAiStreamingText(accumulated);
      },
      onComplete: (_fullText, data) => {
        setIsAiStreaming(false);
        if (data) {
          setAiLexiconResult(data.data || data);
        }
      },
      onError: () => {
        setIsAiStreaming(false);
      }
    });
  };

  const fullInterlinearCopyText = interlinearData.words
    .map((w) => `${w.order}. ${w.originalText} (${w.transliteration}) [${w.strongsNumber}] -> English: "${w.englishGloss}" | Literal: ${w.literalMeaning}`)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* 1. LANGUAGE & SCRIPTURE HEADER BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#16235A] to-[#0A1230] text-white border border-[#B48C35]/40 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-[#B48C35] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xs">
              {interlinearData.language}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-amber-200 text-xs font-semibold">
              {interlinearData.testament} • {isHebrew ? "Right-to-Left (RTL)" : "Left-to-Right (LTR)"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                onToggleSpeak &&
                onToggleSpeak(
                  `Original ${interlinearData.language} for ${book} ${chapter}:${verse}. ${interlinearData.literalEnglishFull}`
                )
              }
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-colors cursor-pointer"
              title="Listen to Interlinear Reading"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleCopy(fullInterlinearCopyText, "full-interlinear")}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              title="Copy Full Interlinear Word-for-Word"
            >
              {copiedKey === "full-interlinear" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied Interlinear!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Interlinear</span>
                </>
              )}
            </button>

            <button
              onClick={handleDeepAiExegesis}
              disabled={isAiStreaming}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isAiStreaming ? "animate-spin" : ""}`} />
              <span>{isAiStreaming ? "Analyzing..." : "Deep AI Lexicon"}</span>
            </button>
          </div>
        </div>

        {/* Full Original Script Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-200/80">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Authentic {interlinearData.language} Text:
            </span>
            <span className="text-[11px] font-mono text-slate-300">
              {book} {chapter}:{verse}
            </span>
          </div>

          <div
            dir={scriptDirection}
            className={`p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 text-lg sm:text-2xl font-serif leading-relaxed text-amber-100 selection:bg-[#B48C35] selection:text-white ${
              isHebrew ? "text-right tracking-wide" : "text-left"
            }`}
          >
            {interlinearData.originalScriptFull}
          </div>

          <div className="text-xs text-slate-300 font-serif italic flex items-center gap-2 pt-0.5">
            <span className="text-[#DCC398] font-sans font-bold text-[11px] uppercase tracking-wider not-italic">
              Phonetic Transliteration:
            </span>
            <span className="text-slate-200">{interlinearData.transliterationFull}</span>
          </div>

          <div className="text-xs text-slate-200 font-serif flex items-start gap-2 pt-1 border-t border-white/10">
            <span className="text-amber-300 font-sans font-bold text-[11px] uppercase tracking-wider shrink-0 mt-0.5">
              Literal English:
            </span>
            <span className="leading-relaxed">"{interlinearData.literalEnglishFull}"</span>
          </div>
        </div>
      </div>

      {/* AI Streaming Loading View */}
      {isAiStreaming && (
        <AiFastLoadingView
          title={`Generating Deep Lexical Exegesis on ${book} ${chapter}:${verse}`}
          actionType="Greek & Hebrew Lexicon"
          progress={aiProgress}
          streamingText={aiStreamingText}
          isStreaming={true}
          onCancel={() => setIsAiStreaming(false)}
        />
      )}

      {/* AI Deep Lexicon Result (if generated) */}
      {aiLexiconResult && !isAiStreaming && (
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-purple-500/40 shadow-lg space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-bold text-amber-300 uppercase tracking-wider text-xs font-mono">
                Scholarly Expository Word Study (AI Synthesized)
              </span>
            </div>
            <button
              onClick={() => {
                if (onSaveToNotes) {
                  onSaveToNotes(
                    `${book}-${chapter}-${verse}`,
                    `[AI EXPOSITORY WORD STUDY: ${book} ${chapter}:${verse}]\n\n${aiLexiconResult.expositoryWordStudy || aiStreamingText}`
                  );
                  setSavedNoteSuccess(true);
                  setTimeout(() => setSavedNoteSuccess(false), 2000);
                }
              }}
              className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{savedNoteSuccess ? "Saved to Notes!" : "Save Word Study"}</span>
            </button>
          </div>

          {aiLexiconResult.expositoryWordStudy && (
            <div className="space-y-2 text-xs sm:text-sm text-slate-200 font-serif leading-relaxed whitespace-pre-line">
              <p>{aiLexiconResult.expositoryWordStudy}</p>
            </div>
          )}

          {aiLexiconResult.apostolicRhema && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 font-serif">
              <strong className="text-amber-400 font-sans block mb-1 uppercase tracking-wider text-[11px]">
                Apostolic Rhema & Prophetic Decree:
              </strong>
              {aiLexiconResult.apostolicRhema}
            </div>
          )}
        </div>
      )}

      {/* 2. INTERLINEAR CONTROLS & VIEW SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search words, Strong's #, English gloss..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#B48C35]"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sublinear Under-Word Option */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 hidden md:inline">
              Under Word:
            </span>
            <button
              onClick={() => setSublinearDisplay("both")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                sublinearDisplay === "both"
                  ? "bg-[#B48C35] text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              title="Show English Gloss + Real Literal Meaning"
            >
              English + Literal
            </button>
            <button
              onClick={() => setSublinearDisplay("literal")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                sublinearDisplay === "literal"
                  ? "bg-[#16235A] text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              title="Show Exact Real / Literal Meaning directly beneath"
            >
              Real / Literal
            </button>
            <button
              onClick={() => setSublinearDisplay("gloss")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                sublinearDisplay === "gloss"
                  ? "bg-[#16235A] text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              title="Show English Translation Gloss"
            >
              English Gloss
            </button>
            <button
              onClick={() => setSublinearDisplay("translit")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                sublinearDisplay === "translit"
                  ? "bg-[#16235A] text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              title="Show Phonetics & Transliteration"
            >
              Phonetics
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors text-xs ${
                viewMode === "grid"
                  ? "bg-[#16235A] text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
              }`}
              title="Interlinear Word Cards (English beneath Original Text)"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => setViewMode("flow")}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors text-xs ${
                viewMode === "flow"
                  ? "bg-[#16235A] text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
              }`}
              title="Sublinear Reading Flow"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Flow</span>
            </button>

            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors text-xs ${
                viewMode === "table"
                  ? "bg-[#16235A] text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
              }`}
              title="Full Lexical Master Table"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lexicon Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. INTERLINEAR CONTENT DISPLAY */}
      {/* MODE A: WORD CARDS GRID (Original Script on top, English beneath, Strong's badge, clickable for real meaning) */}
      {viewMode === "grid" && (
        <div
          dir={scriptDirection}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filteredWords.map((word) => {
            const isSelected = selectedWord?.id === word.id;
            return (
              <div
                key={word.id}
                onClick={() => setSelectedWord(word)}
                className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-amber-50 dark:bg-slate-800 border-[#B48C35] ring-2 ring-[#B48C35]/30 shadow-md"
                    : "bg-white dark:bg-slate-900 hover:bg-amber-50/50 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800 hover:border-[#B48C35]/60 shadow-2xs"
                }`}
              >
                {/* Word Order & Strong's Pill */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">
                    #{word.order}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#16235A]/10 dark:bg-amber-500/20 text-[#16235A] dark:text-amber-300 font-mono font-bold text-[10px]">
                      {word.strongsNumber}
                    </span>
                    {onToggleSpeak && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSpeak(`${word.originalText}. ${word.literalMeaning}`);
                        }}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-[#B48C35] transition-colors cursor-pointer"
                        title="Pronounce word"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. Real Original Hebrew / Greek Script */}
                <div className="text-center my-1.5">
                  <span
                    className={`font-serif font-bold text-2xl sm:text-3xl text-[#16235A] dark:text-amber-100 group-hover:text-[#B48C35] transition-colors leading-relaxed block ${
                      isHebrew ? "tracking-wide" : ""
                    }`}
                  >
                    {word.originalText}
                  </span>
                </div>

                {/* 2. Transliteration / Phonetic */}
                <div className="text-center text-[11px] font-serif italic text-slate-500 dark:text-slate-400 mb-1">
                  {word.transliteration} <span className="text-[10px] text-slate-400 font-mono">({word.pronunciation})</span>
                </div>

                {/* 3. LITERAL MEANING & ENGLISH BENEATH ACCORDING TO USER TOGGLE */}
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-center">
                  {(sublinearDisplay === "gloss" || sublinearDisplay === "both") && (
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block text-left">
                        English Gloss:
                      </span>
                      <div className="inline-block px-2.5 py-1 rounded-lg bg-[#16235A] text-white dark:bg-amber-400/20 dark:text-amber-200 font-bold text-xs shadow-2xs w-full truncate">
                        "{word.englishGloss}"
                      </div>
                    </div>
                  )}

                  {(sublinearDisplay === "literal" || sublinearDisplay === "both") && (
                    <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-500/20 text-left">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#B48C35] block">
                        Real / Literal Meaning:
                      </span>
                      <p className="text-[11px] text-slate-800 dark:text-slate-200 font-serif leading-tight line-clamp-2">
                        {word.literalMeaning}
                      </p>
                    </div>
                  )}

                  {sublinearDisplay === "translit" && (
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono text-left">
                      {word.pronunciation} • {word.grammaticalParsing}
                    </div>
                  )}
                </div>

                {/* Part of Speech Pill & Tap to Inspect */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/50">
                  <span className="truncate max-w-[75px]" title={word.partOfSpeech}>
                    {word.partOfSpeech.split(",")[0]}
                  </span>
                  <span className="text-[#B48C35] font-bold flex items-center gap-0.5 group-hover:underline">
                    <span>Deep Meaning</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE B: SUBLINEAR READING FLOW (Continuous text with English directly below each word) */}
      {viewMode === "flow" && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Sublinear Reading Flow (Tap any word for deep lexical & literal definition):
          </div>

          <div
            dir={scriptDirection}
            className="flex flex-wrap items-end gap-x-5 gap-y-7 pt-2"
          >
            {filteredWords.map((word) => {
              const isSelected = selectedWord?.id === word.id;
              return (
                <button
                  key={word.id}
                  onClick={() => setSelectedWord(word)}
                  className={`group flex flex-col items-center p-2.5 rounded-xl border transition-all cursor-pointer text-center max-w-[140px] ${
                    isSelected
                      ? "bg-amber-100 dark:bg-slate-800 border-[#B48C35] ring-2 ring-[#B48C35]/40 shadow-sm"
                      : "bg-slate-50/80 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {/* Original Word */}
                  <span className="font-serif font-bold text-xl sm:text-2xl text-[#16235A] dark:text-amber-100 group-hover:text-[#B48C35] leading-normal">
                    {word.originalText}
                  </span>

                  {/* Transliteration */}
                  <span className="text-[10px] font-serif italic text-slate-500 dark:text-slate-400">
                    {word.transliteration}
                  </span>

                  {/* Strong's */}
                  <span className="text-[9px] font-mono text-purple-700 dark:text-purple-300 font-bold mt-0.5">
                    {word.strongsNumber}
                  </span>

                  {/* English Gloss Directly Beneath */}
                  <span className="mt-1.5 px-2 py-0.5 rounded bg-[#16235A] text-white dark:bg-amber-300/20 dark:text-amber-200 font-bold text-[11px] shadow-2xs w-full truncate">
                    {word.englishGloss}
                  </span>

                  {/* Literal meaning subscript */}
                  <span className="mt-1 text-[9px] text-[#B48C35] font-serif italic line-clamp-1 w-full" title={word.literalMeaning}>
                    {word.literalMeaning}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE C: FULL LEXICAL MASTER TABLE */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-3 w-10 text-center">#</th>
                <th className="p-3">Strong's</th>
                <th className="p-3 font-serif">Original Script</th>
                <th className="p-3">Transliteration</th>
                <th className="p-3 font-bold text-[#16235A] dark:text-amber-300">English Gloss</th>
                <th className="p-3">Grammar & Parsing</th>
                <th className="p-3">Literal Meaning</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredWords.map((word) => (
                <tr
                  key={word.id}
                  onClick={() => setSelectedWord(word)}
                  className={`hover:bg-amber-50/60 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                    selectedWord?.id === word.id ? "bg-amber-50 dark:bg-slate-800 font-semibold" : ""
                  }`}
                >
                  <td className="p-3 text-center font-mono text-slate-400 font-bold">{word.order}</td>
                  <td className="p-3 font-mono text-[#16235A] dark:text-purple-300 font-bold">
                    {word.strongsNumber}
                  </td>
                  <td className="p-3 font-serif text-base sm:text-lg font-bold text-[#16235A] dark:text-amber-100">
                    {word.originalText}
                  </td>
                  <td className="p-3 font-serif italic text-slate-600 dark:text-slate-300">
                    {word.transliteration}
                  </td>
                  <td className="p-3 font-bold text-[#16235A] dark:text-amber-200">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {word.englishGloss}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 max-w-[150px] truncate" title={word.grammaticalParsing}>
                    {word.grammaticalParsing}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 max-w-[220px] truncate" title={word.literalMeaning}>
                    {word.literalMeaning}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWord(word);
                      }}
                      className="px-2.5 py-1 rounded bg-[#B48C35] hover:bg-[#996515] text-white font-bold text-[10px] cursor-pointer shadow-2xs"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. INTERACTIVE WORD LEXICON INSPECTOR MODAL / CARD */}
      {selectedWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-[#B48C35]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#16235A] to-[#25367D] text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#B48C35] flex items-center justify-center text-white shadow-sm font-serif font-bold text-lg">
                  {isHebrew ? "ע" : "Ω"}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                      Original Language Lexicon Inspector
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#B48C35] text-white text-[10px] font-mono font-bold">
                      {selectedWord.strongsNumber}
                    </span>
                  </div>
                  <p className="text-xs text-amber-200 font-serif italic">
                    Word #{selectedWord.order} in {book} {chapter}:{verse}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onToggleSpeak &&
                    onToggleSpeak(
                      `${selectedWord.originalText}. Transliterated as ${selectedWord.transliteration}. English gloss: ${selectedWord.englishGloss}. Literal meaning: ${selectedWord.literalMeaning}.`
                    )
                  }
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-colors cursor-pointer"
                  title="Pronounce & Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close Inspector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Word Main Banner */}
            <div className="p-5 bg-[#FDFBF7] dark:bg-slate-800/80 border-b border-[#E5D5BC] dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-[#16235A] dark:text-amber-100">
                    {selectedWord.originalText}
                  </span>
                  <span className="text-sm font-serif italic text-slate-600 dark:text-slate-300">
                    ({selectedWord.transliteration})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-[#B48C35]">Pronunciation:</span>
                  <span className="font-mono">{selectedWord.pronunciation}</span>
                  <span>•</span>
                  <span className="font-bold text-purple-700 dark:text-purple-300">Lemma:</span>
                  <span className="font-serif font-semibold">{selectedWord.lemma}</span>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  English Literal Gloss:
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#16235A] text-white dark:bg-amber-400 dark:text-slate-900 font-bold text-sm shadow-xs">
                  "{selectedWord.englishGloss}"
                </span>
              </div>
            </div>

            {/* Scrollable Details Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              {/* 1. Real / Literal Meaning Card */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/90 border border-amber-200 dark:border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-[#16235A] dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4 text-[#B48C35]" />
                  <span>Real Meaning & Literal Translation:</span>
                </div>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-[#16235A] dark:text-amber-100 font-medium">
                  {selectedWord.literalMeaning}
                </p>
              </div>

              {/* 2. Root Word & Etymology */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Root Word & Etymological Derivation:</span>
                </div>
                <p className="font-serif leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedWord.rootEtymology}
                </p>
              </div>

              {/* 3. Grammatical Parsing & Part of Speech */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Part of Speech
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    {selectedWord.partOfSpeech}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Morphological Parsing
                  </span>
                  <span className="font-mono text-purple-700 dark:text-purple-300 font-bold text-xs">
                    {selectedWord.grammaticalParsing}
                  </span>
                </div>
              </div>

              {/* 4. Full Lexical Definition (Thayer / BDB / Strong's) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Exhaustive Concordance & Lexical Semantic Range:
                </span>
                <p className="font-serif leading-relaxed text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                  {selectedWord.lexicalDefinition}
                </p>
              </div>

              {/* 5. Theological & Kingdom Significance */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Theological & Kingdom Revelation:</span>
                </div>
                <p className="font-serif leading-relaxed text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm">
                  {selectedWord.theologicalSignificance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                {savedNoteSuccess ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Saved Word Study to Notes!
                  </span>
                ) : (
                  <button
                    onClick={() => handleSaveWordNote(selectedWord)}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#B48C35]" />
                    <span>Save Word Study to Notes</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    handleCopy(
                      `${selectedWord.originalText} (${selectedWord.transliteration}) [${selectedWord.strongsNumber}]\n` +
                        `English Gloss: "${selectedWord.englishGloss}"\n` +
                        `Literal Meaning: ${selectedWord.literalMeaning}\n` +
                        `Root: ${selectedWord.rootEtymology}\n` +
                        `Definition: ${selectedWord.lexicalDefinition}`,
                      "word-modal-copy"
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "word-modal-copy" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Lexicon</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="px-4 py-1.5 rounded-xl bg-[#16235A] hover:bg-[#0A1230] text-white font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
