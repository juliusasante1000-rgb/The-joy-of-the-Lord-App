import React, { useState, useMemo } from "react";
import {
  Flame,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  ChevronRight,
  Shield,
  HeartHandshake,
  Check,
  Copy,
  Sparkles,
  Send,
  ExternalLink,
  BookOpen,
  Quote,
  Sun,
  ShieldAlert,
  Award,
  Search,
  Maximize2
} from "lucide-react";
import { JOY_OVERCOMING_CATALOG, JOY_CHALLENGES_CATEGORIES } from "../data/joyOvercomingData";
import { JoyOvercomingChallenge, Devotion } from "../types";
import { JoySanctuaryModal } from "./JoySanctuaryModal";
import { fetchAiWithRetry } from "../utils/aiClient";
import { useSyncedContent } from "../utils/useSyncedContent";

interface JoyOvercomingTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: Devotion) => void;
  onNavigateTab?: (tab: string) => void;
}

export const JoyOvercomingTab: React.FC<JoyOvercomingTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onNavigateToBible,
  onOpenDevotion,
  onNavigateTab
}) => {
  const { items: allChallenges } = useSyncedContent<JoyOvercomingChallenge>("joy_overcoming", JOY_OVERCOMING_CATALOG);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(allChallenges[0]?.id || JOY_OVERCOMING_CATALOG[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sanctuary Modal Reader State
  const [modalChallenge, setModalChallenge] = useState<JoyOvercomingChallenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // AI Interactive Overcoming Diagnostic
  const [customCrisis, setCustomCrisis] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedChallenge, setAiGeneratedChallenge] = useState<JoyOvercomingChallenge | null>(null);

  const activeChallenge = useMemo(() => {
    if (aiGeneratedChallenge && selectedChallengeId === aiGeneratedChallenge.id) return aiGeneratedChallenge;
    return allChallenges.find((c) => c.id === selectedChallengeId) || allChallenges[0] || JOY_OVERCOMING_CATALOG[0];
  }, [selectedChallengeId, aiGeneratedChallenge, allChallenges]);

  const computedCategories = useMemo(() => {
    const authorFavCount = allChallenges.filter((c) => c.isAuthorFavourite).length;
    const catSet = new Set(allChallenges.map((c) => c.category));
    return [
      { id: "All", label: `All Battlegrounds (${allChallenges.length})` },
      ...(authorFavCount > 0
        ? [{ id: "Author Favourites", label: `Author's Favourites (${authorFavCount})` }]
        : []),
      ...Array.from(catSet).map((cat) => ({
        id: cat,
        label: `${cat} (${allChallenges.filter((c) => c.category === cat).length})`
      }))
    ];
  }, [allChallenges]);

  const filteredChallenges = useMemo(() => {
    return allChallenges.filter((c) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Author Favourites" ? c.isAuthorFavourite : c.category === selectedCategory);
      const matchesSearch =
        searchQuery.trim() === "" ||
        c.challengeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.scripturalTruth.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.rootDeception.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.anchorVerses.some((v) =>
          v.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [allChallenges, selectedCategory, searchQuery]);

  const handleOpenSanctuaryModal = (challenge: JoyOvercomingChallenge) => {
    setSelectedChallengeId(challenge.id);
    setModalChallenge(challenge);
    setIsModalOpen(true);
  };

  const currentModalIndex = useMemo(() => {
    if (!modalChallenge) return -1;
    return filteredChallenges.findIndex((c) => c.id === modalChallenge.id);
  }, [modalChallenge, filteredChallenges]);

  const handleSelectNextModalChallenge = () => {
    if (!modalChallenge || filteredChallenges.length === 0) return;
    const nextIndex = currentModalIndex >= 0 && currentModalIndex < filteredChallenges.length - 1
      ? currentModalIndex + 1
      : 0;
    const nextChallenge = filteredChallenges[nextIndex] || filteredChallenges[0];
    setSelectedChallengeId(nextChallenge.id);
    setModalChallenge(nextChallenge);
  };

  const handleSelectPrevModalChallenge = () => {
    if (!modalChallenge || filteredChallenges.length === 0) return;
    const prevIndex = currentModalIndex > 0 ? currentModalIndex - 1 : filteredChallenges.length - 1;
    const prevChallenge = filteredChallenges[prevIndex] || filteredChallenges[0];
    setSelectedChallengeId(prevChallenge.id);
    setModalChallenge(prevChallenge);
  };

  const isSaved = isBookmarked(activeChallenge.id, "joy_overcoming");

  const handleCopyChallenge = async (challenge: JoyOvercomingChallenge) => {
    const text = `☀️ THE JOY OF THE LORD: OVERCOMING ${challenge.challengeTitle.toUpperCase()}\n\nRoot Deception: ${challenge.rootDeception}\n\nScriptural Truth: ${challenge.scripturalTruth}\n\nKey Scripture: "${challenge.anchorVerses[0]?.text}" — ${challenge.anchorVerses[0]?.reference}\n\nJoy Protocol / Action Steps:\n${challenge.joyStrategySteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nFortress Declaration:\n${challenge.fortressDeclaration}\n\nDeliverance Prayer:\n${challenge.deliverancePrayer}\n\n— The Joy of the Lord | Bismark Twum`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(challenge.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleGenerateAiBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCrisis.trim()) return;
    setIsGeneratingAi(true);

    try {
      const res = await fetchAiWithRetry<any>(
        "/api/generate-joy-battle",
        {
          category: selectedCategory !== "All" ? selectedCategory : "Anxiety & Fear",
          specificChallenge: customCrisis
        },
        {
          maxRetries: 2,
          retryDelayMs: 1500,
          storageKey: "ai_joy_overcoming_history"
        }
      );

      if (res.success && res.data && res.data.challengeTitle) {
        const data = res.data;
        const generated: JoyOvercomingChallenge = {
          id: data.id || `ai-joy-${Date.now()}`,
          challengeTitle: data.challengeTitle,
          category: data.category || (selectedCategory !== "All" ? selectedCategory : "Spiritual Warfare"),
          rootDeception: data.rootDeception || "The adversary whispers that you are isolated and defeated.",
          scripturalTruth: data.scripturalTruth || "The joy of the Lord is an impregnable spiritual fortress that dismantles demonic resistance.",
          anchorVerses: Array.isArray(data.anchorVerses) && data.anchorVerses.length > 0 ? data.anchorVerses : [
            {
              reference: "Nehemiah 8:10",
              text: "The joy of the Lord is your strength.",
              version: "KJV"
            },
            {
              reference: "Philippians 4:4",
              text: "Rejoice in the Lord always: and again I say, Rejoice.",
              version: "KJV"
            }
          ],
          joyStrategySteps: Array.isArray(data.joyStrategySteps) && data.joyStrategySteps.length > 0 ? data.joyStrategySteps : [
            "Acknowledge the trial truthfully before God while exalting His supreme authority.",
            "Offer high sacrificial praise in the midst of the challenge to break the spirit of heaviness.",
            "Speak the specific biblical promises out loud over your situation multiple times daily.",
            "Maintain an attitude of expectant thanksgiving, knowing that victory is guaranteed in Christ."
          ],
          fortressDeclaration: data.fortressDeclaration || "I declare that the joy of the Lord is my fortress! Every storm must bow before the Name of Jesus.",
          deliverancePrayer: data.deliverancePrayer || "Lord God, flood my spirit with Your supernatural joy and break every chain of fear and anxiety in Jesus' Name. Amen.",
          praisePrescription: "Praise the Lord continuously for 10 minutes with thanksgiving songs.",
          testimonyOfVictory: "Believers across generations have found that supernatural praise in deep trials opens prison doors and releases breakthrough."
        };

        setAiGeneratedChallenge(generated);
        setSelectedChallengeId(generated.id);
        setCustomCrisis("");
        handleOpenSanctuaryModal(generated);
      }
    } catch (err) {
      console.warn("Error generating Joy blueprint AI challenge:", err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-150">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#16235A] via-[#B48C35] to-[#16235A] text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-[#16235A] shadow-xs">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                  The Joy of the Lord
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  {JOY_OVERCOMING_CATALOG.length} Messages & Victory Blueprints
                </span>
              </div>
              <p className="text-xs text-slate-100 font-serif italic">
                Overcoming Every Crisis, Trial, and Warfare Through Divine Supernatural Joy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenSanctuaryModal(activeChallenge)}
              className="px-3.5 py-1.5 rounded-xl bg-white text-[#16235A] hover:bg-amber-100 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Open Sanctuary Tab</span>
            </button>
            <button
              onClick={() =>
                onToggleSpeak(
                  `The Joy of the Lord: Overcoming ${activeChallenge.challengeTitle}. Scriptural Truth: ${activeChallenge.scripturalTruth}. Anchor Verse: ${activeChallenge.anchorVerses[0]?.text}. Fortress Declaration: ${activeChallenge.fortressDeclaration}. Deliverance Prayer: ${activeChallenge.deliverancePrayer}`
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? "Stop" : "Listen Audio"}</span>
            </button>
          </div>
        </div>

        {/* Search and Categories Bar */}
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
              placeholder="Search 1,000 Joy battlegrounds, scriptures, playbooks..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 text-xs focus:outline-none focus:border-amber-300"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
            {computedCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(36);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-white text-[#16235A] shadow-xs font-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Challenge Selector Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16235A]">
            Life Battles & Overcoming Playbooks ({filteredChallenges.length})
          </span>
          <span className="text-[11px] text-slate-500 font-serif italic">
            Click any message to open the focused Sanctuary Tab reader
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredChallenges.slice(0, visibleCount).map((item) => {
            const isCurrent = activeChallenge.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenSanctuaryModal(item)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-3 cursor-pointer group hover:shadow-lg hover:-translate-y-0.5 ${
                  isCurrent
                    ? "bg-gradient-to-br from-[#16235A] to-[#24357D] text-white border-[#16235A] shadow-md ring-2 ring-[#B48C35]"
                    : "bg-white text-slate-800 border-slate-200 hover:border-[#B48C35]"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono uppercase mb-1.5 gap-1">
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        isCurrent ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-[#16235A]/10 text-[#16235A]"
                      }`}>
                        {item.category}
                      </span>
                      {item.isAuthorFavourite && (
                        <span className="px-1.5 py-0.5 rounded-full font-bold bg-amber-400 text-slate-950 flex items-center gap-0.5 text-[9px] shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                          Author's Fav
                        </span>
                      )}
                    </div>
                    <span className={isCurrent ? "text-slate-300" : "text-slate-500"}>
                      {item.anchorVerses[0]?.reference}
                    </span>
                  </div>
                  <h4 className={`font-serif font-bold text-sm leading-snug line-clamp-2 ${
                    isCurrent ? "text-white" : "text-slate-900 group-hover:text-[#16235A]"
                  }`}>
                    {item.challengeTitle}
                  </h4>
                  <p className={`text-xs mt-1.5 line-clamp-2 ${isCurrent ? "text-slate-200" : "text-slate-500"}`}>
                    {item.scripturalTruth}
                  </p>
                </div>
                <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    {item.anchorVerses.length} Scriptures
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

        {visibleCount < filteredChallenges.length && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 36, filteredChallenges.length))}
              className="px-5 py-2 rounded-xl bg-[#16235A] hover:bg-[#24357D] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <span>Load More Battlegrounds ({filteredChallenges.length - visibleCount} remaining)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Deep Victory Blueprint Workspace */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-[#16235A] text-[#DCC398] text-[11px] font-mono font-bold uppercase tracking-wider">
                {activeChallenge.category}
              </span>
              {activeChallenge.isAuthorFavourite && (
                <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 fill-slate-950 text-slate-950" />
                  Author's Favourite Scripture
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenSanctuaryModal(activeChallenge)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Sanctuary Tab</span>
              </button>

              <button
                onClick={() => handleCopyChallenge(activeChallenge)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                title="Copy Overcoming Strategy"
              >
                {copiedId === activeChallenge.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === activeChallenge.id ? "Copied" : "Copy"}</span>
              </button>

              <button
                onClick={() =>
                  onShareItem(
                    activeChallenge.challengeTitle,
                    `${activeChallenge.scripturalTruth}\n\nKey Scripture: ${activeChallenge.anchorVerses[0]?.text} (${activeChallenge.anchorVerses[0]?.reference})\n\nDeclaration: ${activeChallenge.fortressDeclaration}`,
                    activeChallenge.anchorVerses[0]?.reference
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
                    type: "joy_overcoming",
                    title: activeChallenge.challengeTitle,
                    reference: activeChallenge.anchorVerses[0]?.reference,
                    snippet: activeChallenge.fortressDeclaration,
                    targetId: activeChallenge.id
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
            {activeChallenge.challengeTitle}
          </h3>
          <p className="text-sm font-serif italic text-[#B48C35]">
            "For the joy of the LORD is your strength." — Nehemiah 8:10
          </p>
        </div>

        {/* Root Diagnostic vs Scriptural Truth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
            <h4 className="text-xs font-bold font-mono text-red-800 uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              1. Root Deception / Mental Stronghold
            </h4>
            <p className="text-xs text-red-950 leading-relaxed">
              {activeChallenge.rootDeception}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <h4 className="text-xs font-bold font-mono text-emerald-800 uppercase flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              2. Sovereign Scriptural Truth
            </h4>
            <p className="text-xs text-emerald-950 leading-relaxed font-semibold">
              {activeChallenge.scripturalTruth}
            </p>
          </div>
        </div>

        {/* Anchor Verses */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono text-[#16235A] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#B48C35]" /> Anchor Scriptures of Deliverance
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeChallenge.anchorVerses.map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#B48C35]">
                    {v.reference}
                  </span>
                  {onNavigateToBible && (
                    <button
                      onClick={() => {
                        const match = v.reference.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):?(\d+)?/);
                        if (match) {
                          onNavigateToBible(match[1].trim(), parseInt(match[2], 10), match[3] ? parseInt(match[3], 10) : 1);
                        } else {
                          onNavigateToBible("Nehemiah", 8, 10);
                        }
                      }}
                      className="text-[11px] text-[#2563EB] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      Read Chapter <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <blockquote className="text-xs font-serif italic text-slate-800">
                  "{v.text}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Joy Protocol / Action Steps */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold font-mono uppercase text-[#16235A] tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B48C35]" />
            Practical Joy Protocol (Steps to Overcome)
          </h4>
          <div className="space-y-3">
            {activeChallenge.joyStrategySteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#16235A] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fortress Declaration */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-[#16235A] to-[#24357D] text-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-300 uppercase tracking-wider">
            <Quote className="w-4 h-4" /> Overcomer's Fortress Declaration
          </div>
          <p className="text-sm font-serif italic leading-relaxed text-slate-100">
            "{activeChallenge.fortressDeclaration}"
          </p>
        </div>

        {/* Deliverance Prayer & Prescription */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
            <h4 className="text-xs font-bold font-mono text-[#16235A] uppercase flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#B48C35]" /> Deliverance Prayer
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              {activeChallenge.deliverancePrayer}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold font-mono text-amber-900 uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" /> Praise Prescription
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {activeChallenge.praisePrescription}
            </p>
          </div>
        </div>
      </div>

      {/* 4. AI Interactive Crisis Playbook Generator */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#16235A] to-slate-900 text-white border border-[#B48C35]/40 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#DCC398]" />
          <h4 className="text-base font-bold font-serif">
            Spirit-Led Overcoming Diagnostic (Interactive AI)
          </h4>
        </div>
        <p className="text-xs text-slate-300">
          Facing a unique battle or discouragement? Type your current struggle to receive an immediate scripture-grounded Joy Overcoming Playbook.
        </p>

        <form onSubmit={handleGenerateAiBlueprint} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customCrisis}
            onChange={(e) => setCustomCrisis(e.target.value)}
            placeholder="e.g. Dealing with sudden job loss, betrayal by friends, or fear of failure..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#B48C35]"
          />
          <button
            type="submit"
            disabled={isGeneratingAi || !customCrisis.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B48C35] to-[#DCC398] text-[#16235A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGeneratingAi ? (
              <span>Generating...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Generate Strategy</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 5. Dedicated Joy Sanctuary Tab Modal */}
      <JoySanctuaryModal
        challenge={modalChallenge}
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
        onSelectNextChallenge={handleSelectNextModalChallenge}
        onSelectPrevChallenge={handleSelectPrevModalChallenge}
        hasNextChallenge={filteredChallenges.length > 1}
        hasPrevChallenge={filteredChallenges.length > 1}
      />
    </div>
  );
};

