import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Volume2,
  Share2,
  Copy,
  Check,
  X,
  Edit3,
  Bookmark,
  ExternalLink,
  Layers,
  HelpCircle,
  Flame,
  ArrowRight,
  RefreshCw,
  Sliders
} from "lucide-react";
import {
  VerseCommentary,
  ChapterCommentary,
  CommentarySource,
  getCommentaryForVerse,
  getChapterCommentary
} from "../data/bibleCommentaryData";
import { streamAiContent, getIsFastMode, setIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";
import { BibleInterlinearView } from "./BibleInterlinearView";

interface BibleCommentaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: string;
  chapter: number;
  verse?: number;
  verseText: string;
  version: string;
  onSaveToNotes?: (verseKey: string, noteContent: string) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak: (text: string) => void;
  onToggleBookmark?: (item: any) => void;
  isBookmarked?: (targetId: string, type?: string) => boolean;
}

export const BibleCommentaryModal: React.FC<BibleCommentaryModalProps> = ({
  isOpen,
  onClose,
  book,
  chapter,
  verse,
  verseText,
  version,
  onSaveToNotes,
  onShareItem,
  onToggleSpeak,
  onToggleBookmark,
  isBookmarked
}) => {
  if (!isOpen) return null;

  const currentVerse = verse || 1;
  const verseKey = `${book}-${chapter}-${currentVerse}`;
  const isChapterView = !verse;

  const [activeTab, setActiveTab] = useState<CommentarySource>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedToNotesMsg, setSavedToNotesMsg] = useState(false);

  // Dynamic AI Deep Commentary State
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(30);
  const [aiStreamingText, setAiStreamingText] = useState("");
  const [aiCustomCommentary, setAiCustomCommentary] = useState<string | null>(null);

  // Base Curated & Synthesized Commentary
  const verseCommentary: VerseCommentary = getCommentaryForVerse(book, chapter, currentVerse, verseText);
  const chapterCommentary: ChapterCommentary = getChapterCommentary(book, chapter);

  const handleCopy = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleSaveNote = (content: string) => {
    if (onSaveToNotes) {
      onSaveToNotes(verseKey, `[Commentary Study on ${book} ${chapter}:${currentVerse} (${version})]\n\n${content}`);
      setSavedToNotesMsg(true);
      setTimeout(() => setSavedToNotesMsg(false), 2500);
    }
  };

  // Generate Deep Expository AI Commentary using high-speed streaming
  const handleGenerateAiDeepCommentary = () => {
    setIsAiGenerating(true);
    setAiProgress(20);
    setAiStreamingText("");
    setAiCustomCommentary(null);

    const promptRef = `${book} ${chapter}:${currentVerse}`;
    const cacheKey = `bible_commentary_${book}_${chapter}_${currentVerse}`;

    streamAiContent({
      actionType: "commentary",
      scriptureReference: promptRef,
      scriptureText: verseText,
      scriptureTheme: `${book} Expository Commentary`,
      fastMode: getIsFastMode(),
      storageKey: cacheKey,
      onProgress: (p) => setAiProgress(p),
      onChunk: (_chunk, accumulated) => {
        setAiStreamingText(accumulated);
      },
      onComplete: (fullText, data) => {
        setIsAiGenerating(false);
        if (data) {
          const item = data.data || data;
          const formatted = `${item.title || `Expository Commentary on ${promptRef}`}\n\n` +
            `KEY THEME: ${item.keyTheme || verseCommentary.keyTheme || "Covenant Faith & Truth"}\n\n` +
            `HISTORICAL CONTEXT:\n${item.historicalContext || chapterCommentary.historicalContext || ""}\n\n` +
            `MATTHEW HENRY EXEGESIS:\n${item.matthewHenryInsight || item.matthewHenry || verseCommentary.matthewHenry || ""}\n\n` +
            `SPURGEON DEVOTIONAL INSIGHT:\n${item.spurgeonInsight || item.spurgeon || verseCommentary.spurgeon || ""}\n\n` +
            `APOSTOLIC RHEMA & PROPHETIC DECREE:\n${item.apostolicRhema || verseCommentary.apostolicRhema || ""}\n\n` +
            `ORIGINAL GREEK/HEBREW WORD STUDY:\n${item.originalLanguageInsight || item.originalLanguageWordStudy || verseCommentary.originalLanguageNote || ""}\n\n` +
            `DOCTRINAL FOUNDATION:\n${item.theologicalDoctrine || item.doctrinalMeaning || ""}\n\n` +
            `LIFE APPLICATION:\n${item.lifeApplication || item.lifeTransformation || ""}`;
          setAiCustomCommentary(formatted);
        } else if (fullText) {
          setAiCustomCommentary(fullText);
        } else {
          setAiCustomCommentary(
            `Deep Expository Commentary on ${promptRef} (${version}):\n\n"${verseText}"\n\n` +
            `1. Historical Context: This passage emphasizes God's sovereign covenant loyalty.\n` +
            `2. Expository Meaning: In Christ, every promise of this scripture is yes and amen.\n` +
            `3. Apostolic Rhema: Declare this verse boldly in prayer to break limitations.`
          );
        }
      },
      onError: () => {
        setIsAiGenerating(false);
        setAiCustomCommentary(
          `Commentary on ${promptRef}:\n\n"${verseText}"\n\n` +
          `Matthew Henry: The Word of God in ${promptRef} serves as an unshakeable foundation for faith.\n\n` +
          `Charles Spurgeon: Rest your soul upon this divine promise; God's covenant never fails.\n\n` +
          `Apostolic Rhema: The anointing in this verse activates victory and supernatural fruitfulness in your life.`
        );
      }
    });
  };

  const fullCommentaryToRead = [
    `${book} Chapter ${chapter}, Verse ${currentVerse}. ${verseText}.`,
    `Commentary Overview: ${verseCommentary.keyTheme || ""}.`,
    `Matthew Henry Exposition: ${verseCommentary.matthewHenry || ""}`,
    `Spurgeon Insight: ${verseCommentary.spurgeon || ""}`,
    `Apostolic Rhema: ${verseCommentary.apostolicRhema || ""}`
  ].join(" ");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#16235A] via-[#24357D] to-[#B48C35] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 text-amber-300 border border-white/20">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                  Holy Scripture Commentary
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#B48C35] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                  {book} {chapter}:{currentVerse} ({version})
                </span>
              </div>
              <p className="text-xs text-slate-200 font-serif italic">
                Matthew Henry • Charles Spurgeon • Apostolic Rhema • Original Language Exegesis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSpeak(fullCommentaryToRead)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Listen to Commentary"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close Commentary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verse Reference Banner */}
        <div className="p-4 bg-[#FDFBF7] border-b border-[#E5D5BC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-[#B48C35] uppercase tracking-wider">
                {book} {chapter}:{currentVerse}
              </span>
              <span className="text-[11px] text-slate-500 font-serif">
                ({version} Translation)
              </span>
            </div>
            <p className="font-serif text-sm sm:text-base italic text-[#16235A] leading-relaxed">
              "{verseText}"
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              onClick={handleGenerateAiDeepCommentary}
              disabled={isAiGenerating}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6B21A8] hover:from-[#7E22CE] hover:to-[#581C87] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              title="Generate Deep AI Exegetical Commentary"
            >
              <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isAiGenerating ? "animate-spin" : ""}`} />
              <span>{isAiGenerating ? "Expositing..." : "✨ Deep AI Commentary"}</span>
            </button>

            <button
              onClick={() => handleCopy(`"${verseText}" — ${book} ${chapter}:${currentVerse}\n\n${verseCommentary.matthewHenry || ""}`, "verse-header")}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Copy Scripture & Commentary"
            >
              {copiedKey === "verse-header" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Source Navigation Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-slate-200 overflow-x-auto bg-slate-50 text-xs scrollbar-thin">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mr-1 hidden sm:inline">
            Commentary View:
          </span>

          {[
            { id: "all", label: "All Commentaries" },
            { id: "matthewHenry", label: "Matthew Henry" },
            { id: "spurgeon", label: "Charles Spurgeon" },
            { id: "apostolicRhema", label: "Apostolic Rhema" },
            { id: "originalLanguage", label: "Greek & Hebrew Word Study" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CommentarySource)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#16235A] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* AI Fast Loading View */}
          {isAiGenerating && (
            <AiFastLoadingView
              title={`Generating Deep Expository Commentary on ${book} ${chapter}:${currentVerse}`}
              actionType="Scripture Commentary"
              progress={aiProgress}
              streamingText={aiStreamingText}
              isStreaming={true}
              onCancel={() => setIsAiGenerating(false)}
            />
          )}

          {/* AI Custom Generated Output (if exists) */}
          {aiCustomCommentary && !isAiGenerating && (
            <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 border border-purple-500/40 shadow-lg space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-xs font-mono">
                    Deep Exegetical Commentary (AI Accelerated)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveNote(aiCustomCommentary)}
                    className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <Edit3 className="w-3 h-3" /> Save to Notes
                  </button>
                  <button
                    onClick={() => handleCopy(aiCustomCommentary, "ai-commentary")}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                    title="Copy"
                  >
                    {copiedKey === "ai-commentary" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-line leading-relaxed text-slate-200 font-serif">
                {aiCustomCommentary}
              </p>
            </div>
          )}

          {/* 1. CHAPTER THEOLOGICAL OVERVIEW */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 to-amber-100/40 border border-[#E5D5BC] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#B48C35]">
                Chapter Context & Setting: {book} {chapter}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Canonical Structure</span>
            </div>
            <h4 className="font-serif font-bold text-base text-[#16235A]">
              {chapterCommentary.title}
            </h4>
            <p className="text-slate-700 leading-relaxed font-serif">
              {chapterCommentary.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E5D5BC]/60">
              <div>
                <span className="font-bold text-[#16235A] block">Historical Backdrop:</span>
                <span className="text-slate-600">{chapterCommentary.historicalContext}</span>
              </div>
              <div>
                <span className="font-bold text-[#16235A] block">Central Theological Theme:</span>
                <span className="text-slate-600">{chapterCommentary.theologicalTheme}</span>
              </div>
            </div>
          </div>

          {/* 2. MATTHEW HENRY COMMENTARY SECTION */}
          {(activeTab === "all" || activeTab === "matthewHenry") && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16235A]/40 transition-all shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h4 className="font-bold text-[#16235A] text-sm">
                    Matthew Henry's Concise Commentary
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                    Classic Exegesis
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(verseCommentary.matthewHenry || "", "mh")}
                    className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                    title="Copy Matthew Henry Commentary"
                  >
                    {copiedKey === "mh" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onToggleSpeak(verseCommentary.matthewHenry || "")}
                    className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="font-serif leading-relaxed text-slate-800 text-sm sm:text-base">
                {verseCommentary.matthewHenry}
              </p>
            </div>
          )}

          {/* 3. CHARLES SPURGEON DEVOTIONAL COMMENTARY SECTION */}
          {(activeTab === "all" || activeTab === "spurgeon") && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/40 transition-all shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <h4 className="font-bold text-[#16235A] text-sm">
                    Charles H. Spurgeon's Treasury & Insights
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold">
                    Devotional Grace
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(verseCommentary.spurgeon || "", "spurgeon")}
                    className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                    title="Copy Spurgeon Commentary"
                  >
                    {copiedKey === "spurgeon" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onToggleSpeak(verseCommentary.spurgeon || "")}
                    className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="font-serif leading-relaxed text-slate-800 text-sm sm:text-base italic">
                "{verseCommentary.spurgeon}"
              </p>
            </div>
          )}

          {/* 4. APOSTOLIC RHEMA & KINGDOM PRINCIPLE */}
          {(activeTab === "all" || activeTab === "apostolicRhema") && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16235A]/5 to-[#B48C35]/10 border border-[#B48C35]/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#B48C35]/20 pb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#B48C35]" />
                  <h4 className="font-bold text-[#16235A] text-sm">
                    Apostolic Rhema & Prophetic Revelation
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#B48C35]/15 text-[#B48C35] text-[10px] font-bold uppercase">
                    Kingdom Authority
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(verseCommentary.apostolicRhema || "", "rhema")}
                    className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                    title="Copy Apostolic Rhema"
                  >
                    {copiedKey === "rhema" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onToggleSpeak(verseCommentary.apostolicRhema || "")}
                    className="p-1 rounded text-slate-500 hover:text-[#16235A]"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="font-serif leading-relaxed text-[#16235A] text-sm sm:text-base font-medium">
                {verseCommentary.apostolicRhema}
              </p>
            </div>
          )}

          {/* 5. ORIGINAL LANGUAGE INTERLINEAR & CROSS REFERENCES */}
          {(activeTab === "all" || activeTab === "originalLanguage") && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-[#B48C35]/30 space-y-3">
                <div className="flex items-center justify-between border-b border-[#B48C35]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B48C35]" />
                    <h4 className="font-bold text-[#16235A] text-sm">
                      Authentic Hebrew & Greek Interlinear Word Study
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#B48C35]/15 text-[#16235A] text-[10px] font-bold">
                      Original Script + English Gloss + Strong's Concordance
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed font-serif text-xs sm:text-sm">
                  {verseCommentary.originalLanguageNote}
                </p>
              </div>

              {/* Comprehensive Interlinear Component */}
              <BibleInterlinearView
                book={book}
                chapter={chapter}
                verse={verse || 1}
                verseText={verseText}
                version={version}
                onSaveToNotes={onSaveToNotes}
                onShareItem={onShareItem}
                onToggleSpeak={onToggleSpeak}
              />

              {verseCommentary.crossReferences && verseCommentary.crossReferences.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 block text-xs">
                    Scriptural Cross-References:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {verseCommentary.crossReferences.map((ref, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-mono font-bold text-[11px] text-[#16235A]"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {savedToNotesMsg ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1 animate-in fade-in">
                <Check className="w-4 h-4" /> Saved to your personal Study Notes!
              </span>
            ) : (
              <button
                onClick={() =>
                  handleSaveNote(
                    `Matthew Henry: ${verseCommentary.matthewHenry}\n\nSpurgeon: ${verseCommentary.spurgeon}\n\nApostolic Rhema: ${verseCommentary.apostolicRhema}`
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#B48C35]" />
                <span>Save Commentary to Notes</span>
              </button>
            )}

            <button
              onClick={() =>
                onShareItem(
                  `Commentary on ${book} ${chapter}:${currentVerse}`,
                  `"${verseText}"\n\nMatthew Henry: ${verseCommentary.matthewHenry}\n\nSpurgeon: ${verseCommentary.spurgeon}`,
                  `${book} ${chapter}:${currentVerse} (${version})`
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Commentary</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#16235A] hover:bg-[#24357D] text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
