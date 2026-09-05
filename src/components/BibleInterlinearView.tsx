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
  isOldTestamentBook,
  decodePcStudyBibleMorphology
} from "../data/bibleOriginalLanguageData";
import { getStrongsWordStudy } from "../data/strongsLexiconData";
import { streamAiContent, getIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";
import { InterlinearWordStudyBottomSheet } from "./InterlinearWordStudyBottomSheet";
import { Monitor } from "lucide-react";

interface BibleInterlinearViewProps {
  book: string;
  chapter: number;
  verse: number;
  verseText: string;
  version?: string;
  onSaveToNotes?: (verseKey: string, noteContent: string) => void;
  onShareItem?: (title: string, content: string, ref: string) => void;
  onToggleSpeak?: (text: string) => void;
  onVerseClick?: (verseRef: string) => void;
}

export const BibleInterlinearView: React.FC<BibleInterlinearViewProps> = ({
  book,
  chapter,
  verse,
  verseText,
  version = "KJV",
  onSaveToNotes,
  onShareItem,
  onToggleSpeak,
  onVerseClick
}) => {
  const [viewMode, setViewMode] = useState<"pcStudyBible" | "grid" | "flow" | "table">("pcStudyBible");
  const [sublinearDisplay, setSublinearDisplay] = useState<"gloss" | "literal" | "both" | "translit">("both");
  const [selectedWord, setSelectedWord] = useState<InterlinearWord | null>(null);
  const [showMorphologyHelp, setShowMorphologyHelp] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [authenticOriginalScript, setAuthenticOriginalScript] = useState<string>("");

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

  // Fetch authentic Hebrew (WLC) or Greek (TR) script from backend
  React.useEffect(() => {
    let active = true;
    fetch(`/api/bible/original?book=${encodeURIComponent(book)}&chapter=${chapter}&verse=${verse}`)
      .then((res) => res.json())
      .then((data) => {
        if (active && data && data.originalText) {
          setAuthenticOriginalScript(data.originalText);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [book, chapter, verse]);

  // Active word list: Enriched dynamically when AI Lexicon is generated
  const activeWords: InterlinearWord[] = React.useMemo(() => {
    if (aiLexiconResult && Array.isArray(aiLexiconResult.words) && aiLexiconResult.words.length > 0) {
      return aiLexiconResult.words.map((w: any, idx: number) => {
        const rawOrig = w.originalScript || w.originalText || w.word || "";
        const rawGloss = w.englishGloss || w.gloss || "";
        const rawStrongs = w.strongsNumber || w.strongs || (isHebrew ? `H${idx + 1000}` : `G${idx + 2000}`);
        const study = getStrongsWordStudy(rawStrongs, rawOrig, w.transliteration || rawGloss, `${book} ${chapter}:${verse}`);

        return {
          id: `ai-word-${idx + 1}`,
          order: Number(w.wordOrder || w.order || idx + 1),
          originalText: rawOrig,
          transliteration: w.transliteration || study.transliteration || "",
          pronunciation: w.pronunciation || study.pronunciation || (w.transliteration ? w.transliteration.toLowerCase() : ""),
          englishGloss: rawGloss,
          strongsNumber: rawStrongs,
          lemma: w.lemma || study.word || rawOrig,
          partOfSpeech: w.partOfSpeech || w.pos || study.partOfSpeech || "Noun",
          grammaticalParsing: w.grammaticalParsing || w.morphology || study.morphology || "Parsed form",
          literalMeaning: w.literalMeaning || w.literal || study.shortDef || "Literal rendering",
          rootEtymology: w.rootEtymology || study.root || "Primitive root",
          lexicalDefinition: w.lexicalDefinition || study.fullDef || "Full lexical definition",
          theologicalSignificance: w.theologicalSignificance || study.application || "Theological kingdom significance",
          root: study.root,
          shortDefinition: study.shortDef,
          fullDefinition: study.fullDef,
          englishVsOriginal: study.englishVsOriginal,
          alsoUsedIn: study.alsoUsedIn,
          wordChoice: study.wordChoice,
          culturalContext: study.culture,
          application: study.application
        };
      });
    }
    return interlinearData.words;
  }, [aiLexiconResult, interlinearData.words, isHebrew, book, chapter, verse]);

  // Display texts (prefers authentic script if available)
  const displayOriginalScript = authenticOriginalScript || aiLexiconResult?.originalScriptFull || interlinearData.originalScriptFull;
  const displayTransliteration = aiLexiconResult?.transliterationFull || interlinearData.transliterationFull;
  const displayLiteralEnglish = aiLexiconResult?.literalEnglishFull || interlinearData.literalEnglishFull;

  // Filtered words for search
  const filteredWords = activeWords.filter((w) => {
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

  const handlePronounce = (w: InterlinearWord) => {
    if (onToggleSpeak) {
      onToggleSpeak(`${w.transliteration || w.originalText}. Meaning: ${w.englishGloss}`);
    }
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

  const fullInterlinearCopyText = activeWords
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
          <div className="flex items-center justify-between text-xs text-amber-200/80 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                Authentic {interlinearData.language} Text:
              </span>
              {authenticOriginalScript && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  WLC / TR Source Verified
                </span>
              )}
              {aiLexiconResult && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI Lexicon Active
                </span>
              )}
            </div>
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
            {displayOriginalScript}
          </div>

          <div className="text-xs text-slate-300 font-serif italic flex items-center gap-2 pt-0.5">
            <span className="text-[#DCC398] font-sans font-bold text-[11px] uppercase tracking-wider not-italic">
              Phonetic Transliteration:
            </span>
            <span className="text-slate-200">{displayTransliteration}</span>
          </div>

          <div className="text-xs text-slate-200 font-serif flex items-start gap-2 pt-1 border-t border-white/10">
            <span className="text-amber-300 font-sans font-bold text-[11px] uppercase tracking-wider shrink-0 mt-0.5">
              Literal English:
            </span>
            <span className="leading-relaxed">"{displayLiteralEnglish}"</span>
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

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setViewMode("pcStudyBible")}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors text-xs ${
                viewMode === "pcStudyBible"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
              }`}
              title="PC Study Bible 5 Style Workstation (Dual-pane columns + Strong's Inspector)"
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span>PC Study Bible</span>
            </button>

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
      {/* MODE 0: PC STUDY BIBLE 5 WORKSTATION (Left: Original/Morphology/English/Strong's/Phonetics Columns; Right: Strong's Window) */}
      {viewMode === "pcStudyBible" && (
        <div className="space-y-4">
          {/* Top Status & Legend Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#16235A] text-white text-[11px]">
                {isHebrew ? "OT Hebrew" : "NT Greek"}
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                PC Study Bible 5 Workstation • {book} {chapter}:{verse} ({version})
              </span>
            </div>
            <button
              onClick={() => setShowMorphologyHelp(!showMorphologyHelp)}
              className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-800/60 text-amber-900 dark:text-amber-200 font-medium flex items-center gap-1.5 cursor-pointer text-[11px] transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Morphology Reference</span>
            </button>
          </div>

          {/* Morphology Guide Reference Table */}
          {showMorphologyHelp && (
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center justify-between">
                <span>PC Study Bible Morphology Reference Table</span>
                <button
                  onClick={() => setShowMorphologyHelp(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">ncfsa:</span> Noun Common Fem Sing Abs
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">ncmpa:</span> Noun Common Masc Plur Abs
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">vqp3ms:</span> Verb Qal Perf 3ms
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">vppfsa:</span> Verb Piel Participle fsa
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">Pp:</span> Preposition Prefix
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">Pa:</span> Article Prefix ('the')
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">Pc:</span> Conjunction Prefix ('and')
                </div>
                <div className="bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-amber-100 dark:border-slate-800">
                  <span className="font-bold text-[#16235A] dark:text-amber-300">Po:</span> Direct Object Particle ('et')
                </div>
              </div>
            </div>
          )}

          {/* Main Dual-Pane Workstation Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Pane: Authentic Interlinear Text Columns */}
            <div className="lg:col-span-7 xl:col-span-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider">
                  Interlinear Columns ({scriptDirection === "rtl" ? "Hebrew R-to-L" : "Greek L-to-R"})
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Tap word column to inspect in Strong's
                </span>
              </div>

              <div
                dir={scriptDirection}
                className="flex flex-wrap items-start gap-3 py-2 overflow-x-auto"
              >
                {filteredWords.map((word) => {
                  const isSelected = (selectedWord?.id === word.id) || (!selectedWord && word.order === 1);
                  const morphCode = word.pcStudyBibleMorphology || (word.grammaticalParsing ? word.grammaticalParsing.slice(0, 10) : "");
                  const decodedMorph = decodePcStudyBibleMorphology(word.pcStudyBibleMorphology || "");

                  return (
                    <div
                      key={word.id}
                      onClick={() => setSelectedWord(word)}
                      className={`group flex flex-col items-center p-3 rounded-xl border transition-all cursor-pointer min-w-[125px] max-w-[155px] text-center ${
                        isSelected
                          ? "bg-amber-50/90 dark:bg-slate-800/90 border-[#B48C35] ring-2 ring-emerald-500 shadow-md"
                          : "bg-slate-50/70 dark:bg-slate-800/50 hover:bg-amber-50/40 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80"
                      }`}
                    >
                      {/* 1. Original Hebrew / Greek Script */}
                      <span className="font-serif font-bold text-2xl sm:text-3xl text-[#16235A] dark:text-amber-100 group-hover:text-[#B48C35] leading-relaxed my-1 select-all">
                        {word.originalText}
                      </span>

                      {/* 2. PC Study Bible Morphology Code */}
                      <div
                        className="my-1 px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[10px] truncate max-w-full"
                        title={decodedMorph || word.grammaticalParsing}
                      >
                        {morphCode}
                      </div>

                      {/* 3. English Translation Gloss */}
                      <div className="font-sans font-bold text-xs text-slate-800 dark:text-slate-100 my-1 leading-tight line-clamp-2">
                        {word.englishGloss}
                      </div>

                      {/* 4. Strong's Number (Emerald badge matching PC Study Bible 5) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWord(word);
                        }}
                        className={`mt-1.5 px-2.5 py-1 rounded font-mono font-bold text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400 scale-105"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                        }`}
                        title="View Strong's Lexicon"
                      >
                        {word.strongsNumber}
                      </button>

                      {/* 5. PC Study Bible Transliteration */}
                      <span className="mt-1 text-[10px] font-serif italic text-slate-500 dark:text-slate-400">
                        {word.pcStudyBibleTranslit || word.transliteration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Pane: PC Study Bible Strong's Lexicon Window */}
            <div className="lg:col-span-5 xl:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-600/30 dark:border-emerald-500/40 shadow-md space-y-4 lg:sticky lg:top-20">
              {(() => {
                const activeWord = selectedWord || filteredWords[0];
                if (!activeWord) return null;
                const activeStudy = getStrongsWordStudy(
                  activeWord.strongsNumber,
                  activeWord.originalText,
                  activeWord.englishGloss,
                  `${book} ${chapter}:${verse}`
                );

                return (
                  <>
                    {/* Header Bar matching PC Study Bible 5 */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs shadow-xs">
                          {isHebrew ? "OT" : "NT"}:{activeWord.strongsNumber.replace(/^[HG]/i, "")} (Strong's)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {onToggleSpeak && (
                          <button
                            onClick={() => onToggleSpeak(`${activeWord.originalText}. ${activeStudy.shortDef}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                            title="Pronounce Word"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleCopy(`${activeWord.originalText} (${activeWord.strongsNumber}): ${activeStudy.shortDef}`, activeWord.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                          title="Copy Word Study"
                        >
                          {copiedKey === activeWord.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleSaveWordNote(activeWord)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                          title="Save to Notes"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Word Title & Phonetics */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {isHebrew ? "OT" : "NT"}:{activeWord.strongsNumber.replace(/^[HG]/i, "")}
                        </span>
                        <span className="font-serif font-bold text-2xl text-[#16235A] dark:text-amber-100">
                          {activeWord.originalText}
                        </span>
                        <span className="font-serif italic text-sm text-slate-600 dark:text-slate-300">
                          {activeWord.pcStudyBibleTranslit || activeStudy.transliteration}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-serif italic">
                        {activeStudy.pronunciation}
                      </div>
                    </div>

                    {/* Root & Derivation */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1">
                      <div className="font-bold text-slate-700 dark:text-slate-200">
                        Derivation & Grammar:
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeStudy.root}
                      </div>
                      {activeWord.pcStudyBibleMorphology && (
                        <div className="pt-1 text-[11px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold">
                          Parsing: {decodePcStudyBibleMorphology(activeWord.pcStudyBibleMorphology)}
                        </div>
                      )}
                    </div>

                    {/* Definition */}
                    <div className="space-y-1.5 text-xs">
                      <div className="font-bold text-slate-700 dark:text-slate-200">
                        Lexical Definition:
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-amber-50/40 dark:bg-slate-800/40 p-2.5 rounded-lg border border-amber-100 dark:border-slate-800">
                        {activeStudy.shortDef}
                      </div>
                    </div>

                    {/* Full Study Sheet Trigger */}
                    <button
                      onClick={() => setSelectedWord(activeWord)}
                      className="w-full py-2 px-3 rounded-xl bg-[#16235A] hover:bg-[#1f307a] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Full Theological Lexicon Sheet</span>
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

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

      {/* 4. RICH 3-LAYER INTERLINEAR WORD STUDY BOTTOM SHEET (OSHB / MorphHB / Berean / BDB / Thayer / Strong's) */}
      <InterlinearWordStudyBottomSheet
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        word={selectedWord}
        contextRef={`${book} ${chapter}:${verse}`}
        onSaveToNotes={onSaveToNotes}
        onToggleSpeak={onToggleSpeak}
        onVerseClick={onVerseClick}
      />
    </div>
  );
};
