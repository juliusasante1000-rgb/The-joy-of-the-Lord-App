import React, { useState, useEffect } from "react";
import {
  X,
  Volume2,
  Bookmark,
  Share2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  FileText,
  Compass,
  ArrowRight,
  Database
} from "lucide-react";
import { InterlinearWord } from "../data/bibleOriginalLanguageData";
import {
  getStrongsWordStudy,
  StrongsWordStudy,
  STRONGS_DATABASE
} from "../data/strongsLexiconData";

interface InterlinearWordStudyBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  word: InterlinearWord | null;
  contextRef: string;
  onSaveToNotes?: (verseKey: string, noteContent: string) => void;
  onToggleSpeak?: (text: string) => void;
  onVerseClick?: (verseRef: string) => void;
}

export const InterlinearWordStudyBottomSheet: React.FC<InterlinearWordStudyBottomSheetProps> = ({
  isOpen,
  onClose,
  word,
  contextRef,
  onSaveToNotes,
  onToggleSpeak,
  onVerseClick
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "layer1" | "layer2" | "layer3">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [studyData, setStudyData] = useState<StrongsWordStudy | null>(null);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);

  useEffect(() => {
    if (!word) {
      setStudyData(null);
      return;
    }

    // 1. Pull immediate definition from Strong's JSON / Lexicon
    const initial = getStrongsWordStudy(
      word.strongsNumber,
      word.originalText,
      word.englishGloss,
      contextRef
    );

    // Merge any existing word properties
    const merged: StrongsWordStudy = {
      ...initial,
      word: word.originalText || initial.word,
      strongs: word.strongsNumber || initial.strongs,
      transliteration: word.transliteration || initial.transliteration,
      pronunciation: word.pronunciation || initial.pronunciation,
      root: word.root || word.rootEtymology || initial.root,
      morphology: word.morphology || word.grammaticalParsing || word.partOfSpeech || initial.morphology,
      partOfSpeech: word.partOfSpeech || initial.partOfSpeech,
      shortDef: word.shortDefinition || initial.shortDef,
      fullDef: word.fullDefinition || word.lexicalDefinition || initial.fullDef,
      englishVsOriginal: word.englishVsOriginal || initial.englishVsOriginal,
      alsoUsedIn: (word.alsoUsedIn && word.alsoUsedIn.length > 0) ? word.alsoUsedIn : initial.alsoUsedIn,
      wordChoice: word.wordChoice || initial.wordChoice,
      culture: word.culturalContext || initial.culture,
      application: word.application || word.theologicalSignificance || initial.application
    };

    setStudyData(merged);

    // 2. Fetch live deep enhancement if available
    let isMounted = true;
    const fetchLiveStudy = async () => {
      try {
        const res = await fetch("/api/strongs-word-study", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            strongsNumber: word.strongsNumber,
            word: word.originalText,
            transliteration: word.transliteration,
            scriptureRef: contextRef,
            englishGloss: word.englishGloss
          })
        });

        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json && json.data) {
          const d = json.data;
          setStudyData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              shortDef: d.layer2?.shortDef || prev.shortDef,
              fullDef: d.layer2?.fullDef || prev.fullDef,
              englishVsOriginal: d.layer2?.englishVsOriginal || prev.englishVsOriginal,
              alsoUsedIn: (d.layer2?.alsoUsedIn && d.layer2.alsoUsedIn.length > 0) ? d.layer2.alsoUsedIn : prev.alsoUsedIn,
              wordChoice: d.layer3?.wordChoice || prev.wordChoice,
              culture: d.layer3?.culture || prev.culture,
              application: d.layer3?.application || prev.application
            };
          });
        }
      } catch {
        // Fallback already active from Strong's JSON
      }
    };

    fetchLiveStudy();

    return () => {
      isMounted = false;
    };
  }, [word, contextRef]);

  if (!isOpen || !word || !studyData) return null;

  const isHebrew = word.strongsNumber.startsWith("H") || /[\u0590-\u05FF]/.test(word.originalText);
  const languageName = isHebrew ? "Biblical Hebrew (OSHB / MorphHB)" : "Koine Greek (Berean / NA28)";

  const handleCopyAll = () => {
    const text = `WORD STUDY: ${studyData.word} (${studyData.transliteration}) [${studyData.strongs}]\n` +
      `Context: ${contextRef}\n\n` +
      `=== LAYER 1: DATA ===\n` +
      `Word: ${studyData.word}\n` +
      `Strong's: ${studyData.strongs}\n` +
      `Transliteration: ${studyData.transliteration}\n` +
      `Pronunciation: ${studyData.pronunciation}\n` +
      `Root: ${studyData.root} (${studyData.rootOccurrences})\n` +
      `Morphology: ${studyData.morphology}\n\n` +
      `=== LAYER 2: MEANING ===\n` +
      `Short Def: ${studyData.shortDef}\n` +
      `Full Def:\n${studyData.fullDef}\n` +
      `English vs Original: ${studyData.englishVsOriginal}\n` +
      `Also used in:\n${studyData.alsoUsedIn.join("\n")}\n\n` +
      `=== LAYER 3: INSIGHT ===\n` +
      `Word Choice: ${studyData.wordChoice}\n` +
      `Culture: ${studyData.culture}\n` +
      `Application: ${studyData.application}`;

    navigator.clipboard.writeText(text);
    setCopiedKey("copied-all");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveToNotes = () => {
    if (!onSaveToNotes) return;
    const noteText = `[Word Study: ${studyData.word} - ${studyData.strongs}]\n` +
      `Transliteration: ${studyData.transliteration} (${studyData.pronunciation})\n` +
      `Morphology: ${studyData.morphology}\n` +
      `Definition: ${studyData.shortDef}\n` +
      `Nuance: ${studyData.englishVsOriginal}\n` +
      `Devotional Application: ${studyData.application}`;
    onSaveToNotes(contextRef, noteText);
    setCopiedKey("saved-notes");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to dismiss */}
      <div className="flex-1 w-full" onClick={onClose} />

      {/* BOTTOM SHEET CONTAINER */}
      <div
        className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-t-3xl border-t border-[#B48C35]/50 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* DRAG HANDLE */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full hover:bg-slate-400 transition-colors" />
        </div>

        {/* HEADER */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white ${
                isHebrew ? "font-serif text-right" : ""
              }`}
              dir={isHebrew ? "rtl" : "ltr"}
            >
              {studyData.word}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-[#B48C35]/15 text-[#B48C35] dark:text-amber-400 font-mono font-bold text-xs">
                  {studyData.strongs}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 italic">
                  {studyData.transliteration}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {studyData.pronunciation}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {languageName} • {contextRef}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleSpeak && (
              <button
                onClick={() =>
                  onToggleSpeak(
                    `${studyData.word}. Transliterated as ${studyData.transliteration}. Pronounced ${studyData.pronunciation}. ${studyData.shortDef}. Devotional application: ${studyData.application}`
                  )
                }
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-100 hover:text-amber-800 transition-colors cursor-pointer"
                title="Audio Pronunciation & Study"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}

            {onSaveToNotes && (
              <button
                onClick={handleSaveToNotes}
                className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                title="Save Word Study to Notes"
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {copiedKey === "saved-notes" ? "Saved!" : "Save"}
                </span>
              </button>
            )}

            <button
              onClick={handleCopyAll}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Copy Word Study"
            >
              {copiedKey === "copied-all" ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LAYER TABS SWITCHER */}
        <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 3 Layers</span>
            </button>

            <button
              onClick={() => setActiveTab("layer1")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "layer1"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Layer 1: Data</span>
            </button>

            <button
              onClick={() => setActiveTab("layer2")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "layer2"
                  ? "bg-[#B48C35] text-white shadow-sm"
                  : "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Layer 2: Meaning</span>
            </button>

            <button
              onClick={() => setActiveTab("layer3")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "layer3"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Layer 3: Insight</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden md:inline">
            Strong's Concordance + BDB / Thayer
          </span>
        </div>

        {/* SCROLLABLE CONTENT BODY */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* =========================================================================
              LAYER 1: DATA
             ========================================================================= */}
          {(activeTab === "all" || activeTab === "layer1") && (
            <section className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-blue-900 dark:text-blue-300 font-mono">
                    LAYER 1: DATA (Morphology & Concordance)
                  </h4>
                </div>
                <span className="text-[11px] text-blue-700 dark:text-blue-400 font-mono">
                  {isHebrew ? "OSHB + MorphHB" : "Berean / Robinson"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/30 space-y-1">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase font-mono">
                    Word (Original Script)
                  </div>
                  <div
                    className={`text-2xl font-bold text-slate-900 dark:text-white ${
                      isHebrew ? "text-right" : ""
                    }`}
                    dir={isHebrew ? "rtl" : "ltr"}
                  >
                    {studyData.word}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/30 space-y-1">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase font-mono">
                    Strong's Concordance #
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                      {studyData.strongs}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">
                      ({studyData.partOfSpeech})
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/30 space-y-1">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase font-mono">
                    Transliteration & Pronunciation
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    <span className="italic">{studyData.transliteration}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-mono">
                      [{studyData.pronunciation}]
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/30 space-y-1">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase font-mono">
                    Root Word & Frequency
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    <span>{studyData.root}</span>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      {studyData.rootOccurrences}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/30 space-y-1">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase font-mono">
                    Morphology & Grammatical Parsing
                  </div>
                  <div className="text-sm font-mono font-medium text-slate-900 dark:text-white bg-blue-50/80 dark:bg-blue-950/40 px-3 py-1.5 rounded-lg border border-blue-200/50 dark:border-blue-900/30 inline-block">
                    {studyData.morphology}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              LAYER 2: MEANING
             ========================================================================= */}
          {(activeTab === "all" || activeTab === "layer2") && (
            <section className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#B48C35] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-amber-900 dark:text-amber-300 font-mono">
                    LAYER 2: MEANING (Lexicon & Translation Nuances)
                  </h4>
                </div>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                  {isHebrew ? "BDB + Strong's JSON" : "Thayer's + Strong's JSON"}
                </span>
              </div>

              {/* Short Def */}
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-100 dark:border-amber-900/30 space-y-1">
                <div className="text-[11px] font-bold text-[#B48C35] dark:text-amber-400 uppercase font-mono">
                  Short Definition ({isHebrew ? "Strong's / BDB" : "Strong's / Thayer's"})
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {studyData.shortDef}
                </p>
              </div>

              {/* Full Def */}
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-100 dark:border-amber-900/30 space-y-2">
                <div className="text-[11px] font-bold text-[#B48C35] dark:text-amber-400 uppercase font-mono">
                  Full Definition & Range of Meanings
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {studyData.fullDef}
                </div>
              </div>

              {/* English vs Original */}
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-100 dark:border-amber-900/30 space-y-2">
                <div className="text-[11px] font-bold text-[#B48C35] dark:text-amber-400 uppercase font-mono flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>English vs. Original (Nuance Lost in Translation)</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {studyData.englishVsOriginal}
                </p>
              </div>

              {/* Also used in */}
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-100 dark:border-amber-900/30 space-y-2">
                <div className="text-[11px] font-bold text-[#B48C35] dark:text-amber-400 uppercase font-mono flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Also Used In (Concordance Cross-References)</span>
                </div>
                <div className="space-y-1.5">
                  {studyData.alsoUsedIn.map((ref, idx) => (
                    <div
                      key={idx}
                      onClick={() => onVerseClick && onVerseClick(ref)}
                      className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/50 dark:border-amber-900/30 text-xs font-serif text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{ref}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              LAYER 3: INSIGHT
             ========================================================================= */}
          {(activeTab === "all" || activeTab === "layer3") && (
            <section className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-emerald-900 dark:text-emerald-300 font-mono">
                    LAYER 3: INSIGHT (Theology, Culture & Devotional Application)
                  </h4>
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                  Apostolic Exegesis
                </span>
              </div>

              {/* Word Choice */}
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-900/30 space-y-1.5">
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono">
                  Word Choice: Why this word and not a similar one?
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {studyData.wordChoice}
                </p>
              </div>

              {/* Culture */}
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-900/30 space-y-1.5">
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono">
                  {isHebrew ? "Ancient Hebrew & Near Eastern Culture" : "Greco-Roman & Apostolic Culture"}
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {studyData.culture}
                </p>
              </div>

              {/* Application (1-sentence Devotional Insight) */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Devotional Application</span>
                </div>
                <p className="text-sm sm:text-base font-serif font-medium leading-relaxed italic">
                  "{studyData.application}"
                </p>
              </div>
            </section>
          )}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-mono">
            Tapped: <span className="font-bold text-slate-900 dark:text-white">{studyData.transliteration}</span> [{studyData.strongs}]
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey === "copied-all" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy 3 Layers</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#B48C35] hover:bg-[#996515] text-white text-xs font-bold shadow transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
