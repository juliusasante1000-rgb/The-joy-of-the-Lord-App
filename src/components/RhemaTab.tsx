import React, { useState, useMemo } from "react";
import {
  Zap,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Check,
  Copy,
  Send,
  ExternalLink,
  BookOpen,
  Calendar,
  Flame,
  Radio,
  Quote,
  Search,
  Maximize2
} from "lucide-react";
import { RHEMA_CATALOG, RHEMA_SEASONS } from "../data/rhemaData";
import { RhemaWordItem, Devotion } from "../types";
import { RhemaSanctuaryModal } from "./RhemaSanctuaryModal";
import { fetchAiWithRetry } from "../utils/aiClient";
import { useSyncedContent } from "../utils/useSyncedContent";

interface RhemaTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: Devotion) => void;
  onNavigateTab?: (tab: string) => void;
}

export const RhemaTab: React.FC<RhemaTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onNavigateToBible,
  onOpenDevotion,
  onNavigateTab
}) => {
  const { items: allWords } = useSyncedContent<RhemaWordItem>("rhema", RHEMA_CATALOG);
  const [selectedWordId, setSelectedWordId] = useState<string>(allWords[0]?.id || RHEMA_CATALOG[0].id);
  const [selectedSeason, setSelectedSeason] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightPulse, setHighlightPulse] = useState<boolean>(false);

  // Sanctuary Reader Modal State
  const [modalWord, setModalWord] = useState<RhemaWordItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Interactive Rhema Generator
  const [customNeed, setCustomNeed] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiRhemaWord, setAiRhemaWord] = useState<RhemaWordItem | null>(null);

  const activeWord = useMemo(() => {
    if (aiRhemaWord && selectedWordId === aiRhemaWord.id) return aiRhemaWord;
    return allWords.find((w) => w.id === selectedWordId) || allWords[0] || RHEMA_CATALOG[0];
  }, [selectedWordId, aiRhemaWord, allWords]);

  const computedSeasons = useMemo(() => {
    const authorFavCount = allWords.filter((w) => w.isAuthorFavourite).length;
    const seasonsSet = new Set(allWords.map((item) => item.seasonCategory));
    return [
      { id: "All", label: `All Now Words (${allWords.length})`, count: allWords.length },
      ...(authorFavCount > 0
        ? [{ id: "Author Favourites", label: `Author's Favourites (${authorFavCount})`, count: authorFavCount }]
        : []),
      ...Array.from(seasonsSet).map((season) => ({
        id: season,
        label: season,
        count: allWords.filter((item) => item.seasonCategory === season).length
      }))
    ];
  }, [allWords]);

  const filteredWords = useMemo(() => {
    return allWords.filter((w) => {
      const matchesSeason =
        selectedSeason === "All" ||
        (selectedSeason === "Author Favourites" ? w.isAuthorFavourite : w.seasonCategory === selectedSeason);
      const matchesSearch =
        searchQuery.trim() === "" ||
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.nowWordText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.propheticDeclaration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.scriptureAnchor.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.scriptureAnchor.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeason && matchesSearch;
    });
  }, [allWords, selectedSeason, searchQuery]);

  const handleOpenSanctuary = (word: RhemaWordItem) => {
    setSelectedWordId(word.id);
    setModalWord(word);
    setIsModalOpen(true);
  };

  const currentModalIndex = useMemo(() => {
    if (!modalWord) return -1;
    return filteredWords.findIndex((w) => w.id === modalWord.id);
  }, [modalWord, filteredWords]);

  const handleNextWord = () => {
    if (currentModalIndex >= 0 && currentModalIndex < filteredWords.length - 1) {
      const next = filteredWords[currentModalIndex + 1];
      setSelectedWordId(next.id);
      setModalWord(next);
    } else if (filteredWords.length > 0) {
      const next = filteredWords[0];
      setSelectedWordId(next.id);
      setModalWord(next);
    }
  };

  const handlePrevWord = () => {
    if (currentModalIndex > 0) {
      const prev = filteredWords[currentModalIndex - 1];
      setSelectedWordId(prev.id);
      setModalWord(prev);
    } else if (filteredWords.length > 0) {
      const prev = filteredWords[filteredWords.length - 1];
      setSelectedWordId(prev.id);
      setModalWord(prev);
    }
  };

  const handleSelectRhema = (id: string) => {
    const word = RHEMA_CATALOG.find((w) => w.id === id);
    if (word) {
      handleOpenSanctuary(word);
    }
  };

  const isSaved = isBookmarked(activeWord.id, "rhema");

  const handleCopyRhema = async (word: RhemaWordItem) => {
    const text = `⚡ RHEMA — NOW WORD OF GOD: ${word.title.toUpperCase()}\n\nProphetic Declaration: ${word.propheticDeclaration}\n\nRhema Word:\n${word.nowWordText}\n\nAnchor Scripture: "${word.scriptureAnchor.text}" — ${word.scriptureAnchor.reference}\n\nAction of Faith: ${word.actionCommandment}\n\nProphetic Decree:\n${word.propheticDecree}\n\n— The Joy of the Lord Rhema Sanctuary | Bismark Twum`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(word.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleGenerateAiRhema = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNeed.trim()) return;
    setIsGeneratingAi(true);
    setAiError(null);

    try {
      const res = await fetchAiWithRetry<any>(
        "/api/generate-rhema",
        {
          seasonCategory: selectedSeason !== "All" ? selectedSeason : "Breakthrough",
          focusNeed: customNeed
        },
        {
          maxRetries: 2,
          retryDelayMs: 1500,
          storageKey: "ai_rhema_history"
        }
      );

      if (res.success && res.data && res.data.title) {
        const data = res.data;
        const generated: RhemaWordItem = {
          id: data.id || `ai-rhema-${Date.now()}`,
          seasonCategory: data.seasonCategory || (selectedSeason !== "All" ? selectedSeason : "Fresh Oil"),
          title: data.title,
          propheticDeclaration: data.propheticDeclaration || "The Lord is declaring a season of sudden turnaround and victory.",
          spiritualAtmosphere: data.spiritualAtmosphere || "Open Heavens & Fresh Grace",
          scriptureAnchor: data.scriptureAnchor || {
            reference: "Isaiah 43:19",
            text: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert.",
            version: "KJV"
          },
          nowWordText: data.nowWordText || "Hear the voice of the Lord: every delayed harvest is being released. Stand in steadfast faith and rejoice.",
          dailyActivationGuide: data.dailyActivationGuide || [
            "1. Meditate on the scripture anchor in morning stillness.",
            "2. Proclaim the prophetic declaration aloud over your family and work.",
            "3. Execute the Holy commandment of faith boldly today."
          ],
          actionCommandment: data.actionCommandment || "Speak the Word out loud 3 times daily and sow a seed of thanksgiving.",
          propheticDecree: data.propheticDecree || "I decree and declare that every closed door is opened now in Jesus' Name!"
        };

        setAiRhemaWord(generated);
        setSelectedWordId(generated.id);
        setCustomNeed("");
        handleOpenSanctuary(generated);
      } else {
        setAiError("Unable to discern Rhema word at this moment. Please try again.");
      }
    } catch (err) {
      console.warn("Error generating AI Rhema:", err);
      setAiError("Network connection issue. Please check your connection and retry.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-150">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-[#16235A] to-indigo-950 text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shadow-xs">
              <Zap className="w-6 h-6 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                  Rhema Words of God
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-400/30">
                  {RHEMA_CATALOG.length} Season Revelations
                </span>
              </div>
              <p className="text-xs text-purple-200 font-serif italic">
                Living, Active, and Sharp Now-Words Spoken Directly to Your Present Season
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenSanctuary(activeWord)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Open Sanctuary Tab</span>
            </button>
            <button
              onClick={() =>
                onToggleSpeak(
                  `Rhema Word: ${activeWord.title}. Prophetic Declaration: ${activeWord.propheticDeclaration}. Spoken Word: ${activeWord.nowWordText}. Decree: ${activeWord.propheticDecree}`
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? "Stop" : "Listen Rhema"}</span>
            </button>
          </div>
        </div>

        {/* Search & Seasons Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(36);
              }}
              placeholder="Search 1,000 prophetic Rhema now-words, scriptures..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
            {computedSeasons.map((season) => (
              <button
                key={season.id}
                onClick={() => {
                  setSelectedSeason(season.id);
                  setVisibleCount(36);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedSeason === season.id
                    ? "bg-amber-400 text-slate-950 shadow-xs font-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {season.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Rhema Grid Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16235A]">
            Season Declarations ({filteredWords.length})
          </span>
          <span className="text-[11px] text-slate-500 font-serif italic">
            Click any Rhema to open the immersive Sanctuary Tab reader
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredWords.slice(0, visibleCount).map((word) => {
            const isCurrent = activeWord.id === word.id;
            return (
              <div
                key={word.id}
                onClick={() => handleOpenSanctuary(word)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-3 cursor-pointer group hover:shadow-lg hover:-translate-y-0.5 ${
                  isCurrent
                    ? "bg-gradient-to-br from-purple-950 to-[#16235A] text-white border-amber-400/50 shadow-md ring-2 ring-amber-400"
                    : "bg-white text-slate-800 border-slate-200 hover:border-amber-400"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono uppercase mb-1.5 gap-1">
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        isCurrent ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-purple-100 text-purple-800"
                      }`}>
                        {word.seasonCategory}
                      </span>
                      {word.isAuthorFavourite && (
                        <span className="px-1.5 py-0.5 rounded-full font-bold bg-amber-400 text-slate-950 flex items-center gap-0.5 text-[9px] shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                          Author's Fav
                        </span>
                      )}
                    </div>
                    <span className={isCurrent ? "text-slate-300" : "text-slate-500"}>
                      {word.scriptureAnchor.reference}
                    </span>
                  </div>
                  <h4 className={`font-serif font-bold text-sm leading-snug line-clamp-2 ${
                    isCurrent ? "text-white" : "text-slate-900 group-hover:text-purple-900"
                  }`}>
                    {word.title}
                  </h4>
                  <p className={`text-xs mt-1.5 line-clamp-2 ${isCurrent ? "text-purple-200" : "text-slate-500"}`}>
                    "{word.propheticDeclaration}"
                  </p>
                </div>
                <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Now Word
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Tab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < filteredWords.length && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 36, filteredWords.length))}
              className="px-5 py-2 rounded-xl bg-[#16235A] hover:bg-[#24357D] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <span>Load More Declarations ({filteredWords.length - visibleCount} remaining)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Deep Rhema Word Workspace */}
      <div
        id="rhema-reader"
        tabIndex={-1}
        className={`p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6 transition-all duration-500 outline-none ${
          highlightPulse ? "ring-4 ring-amber-400/60 shadow-xl border-amber-400" : ""
        }`}
      >
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-[#16235A] text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                {activeWord.seasonCategory} • {activeWord.spiritualAtmosphere}
              </span>
              {activeWord.isAuthorFavourite && (
                <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 fill-slate-950 text-slate-950" />
                  Author's Favourite Scripture
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenSanctuary(activeWord)}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Sanctuary Tab</span>
              </button>

              <button
                onClick={() => handleCopyRhema(activeWord)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                title="Copy Rhema Word"
              >
                {copiedId === activeWord.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === activeWord.id ? "Copied" : "Copy Word"}</span>
              </button>

              <button
                onClick={() =>
                  onShareItem(
                    activeWord.title,
                    `Rhema: ${activeWord.nowWordText}\n\nDecree: ${activeWord.propheticDecree}\n\nScripture: ${activeWord.scriptureAnchor.reference}`,
                    activeWord.scriptureAnchor.reference
                  )
                }
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              <button
                onClick={() =>
                  onToggleBookmark({
                    type: "rhema",
                    title: activeWord.title,
                    reference: activeWord.scriptureAnchor.reference,
                    snippet: activeWord.propheticDecree,
                    targetId: activeWord.id
                  })
                }
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                  isSaved
                    ? "bg-[#B48C35] text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#16235A]">
            {activeWord.title}
          </h3>
          <p className="text-sm font-serif italic text-purple-700">
            "{activeWord.propheticDeclaration}"
          </p>
        </div>

        {/* The Spoken Now-Word Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-[#FAF8FD] to-amber-50/50 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold font-mono text-purple-900 uppercase">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              The Spoken Voice of the Lord for Your Present Season
            </span>
            <span className="text-amber-700">{activeWord.spiritualAtmosphere}</span>
          </div>
          <p className="text-base sm:text-lg font-serif italic text-slate-900 leading-relaxed">
            "{activeWord.nowWordText}"
          </p>
        </div>

        {/* Scriptural Anchor */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold font-mono text-[#16235A]">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-600" />
              Scripture Anchor: {activeWord.scriptureAnchor.reference} ({activeWord.scriptureAnchor.version})
            </span>
            {onNavigateToBible && (
              <button
                onClick={() => {
                  const match = activeWord.scriptureAnchor.reference.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):?(\d+)?/);
                  if (match) {
                    onNavigateToBible(match[1].trim(), parseInt(match[2], 10), match[3] ? parseInt(match[3], 10) : 1);
                  } else {
                    onNavigateToBible("Isaiah", 43, 19);
                  }
                }}
                className="text-xs text-[#2563EB] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                Read Chapter <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
          <blockquote className="text-sm font-serif text-slate-800 italic border-l-2 border-[#16235A] pl-3">
            "{activeWord.scriptureAnchor.text}"
          </blockquote>
        </div>

        {/* Action of Faith & Warfare Decree */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold font-mono text-amber-900 uppercase flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              Action of Faith (Holy Commandment)
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed font-semibold">
              {activeWord.actionCommandment}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-purple-900 to-[#16235A] text-white space-y-2">
            <h4 className="text-xs font-bold font-mono text-amber-300 uppercase flex items-center gap-1.5">
              <Quote className="w-4 h-4" />
              Prophetic Decree (Decree Aloud)
            </h4>
            <p className="text-xs font-serif italic text-purple-100 leading-relaxed">
              "{activeWord.propheticDecree}"
            </p>
          </div>
        </div>
      </div>

      {/* 4. AI Interactive Rhema Generator */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#16235A] to-slate-900 text-white border border-amber-400/40 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h4 className="text-base font-bold font-serif">
            Spirit-Led Prophetic Rhema Receptor (Interactive AI)
          </h4>
        </div>
        <p className="text-xs text-slate-300">
          Seek a targeted now-word of God for your exact spiritual crossroad, decision, or breakthrough need.
        </p>

        <form onSubmit={handleGenerateAiRhema} className="space-y-2">
          {aiError && (
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between">
              <span>{aiError}</span>
              <button
                type="button"
                onClick={() => setAiError(null)}
                className="text-amber-200 hover:text-white font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customNeed}
              onChange={(e) => setCustomNeed(e.target.value)}
              placeholder="e.g. Guidance for career transition, financial breakthrough, or healing in family..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isGeneratingAi || !customNeed.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGeneratingAi ? (
                <span>Generating...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Receive Rhema</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 5. Dedicated Rhema Sanctuary Tab Modal */}
      <RhemaSanctuaryModal
        word={modalWord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigateToBible={onNavigateToBible}
        onOpenDevotion={onOpenDevotion}
        onNavigateTab={onNavigateTab}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
        onShareItem={onShareItem}
        isSpeaking={isSpeaking}
        onToggleSpeak={onToggleSpeak}
        onNextWord={handleNextWord}
        onPrevWord={handlePrevWord}
        hasNextWord={currentModalIndex < filteredWords.length - 1}
        hasPrevWord={currentModalIndex > 0}
      />
    </div>
  );
};
