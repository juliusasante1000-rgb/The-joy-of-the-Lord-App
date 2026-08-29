import React, { useState } from "react";
import {
  HeartHandshake,
  Plus,
  CheckCircle2,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Sparkles,
  Shield,
  Sunrise,
  Sun,
  Moon,
  Clock,
  Send,
  RefreshCw,
  Trash2,
  Check,
  Play,
  Pause,
  Award,
  BookOpen,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { STRUCTURED_PRAYERS_CATALOG } from "../data/prayersData";
import { StructuredPrayer, PrayerJournalEntry, DevotionEdition, Devotion } from "../types";
import { DevotionPictureModal } from "./DevotionPictureModal";
import { printDevotionOnePageDocument } from "../utils/devotionDocumentExporter";
import { fetchAiWithRetry } from "../utils/aiClient";
import { streamAiContent, getIsFastMode, setIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";

interface PrayersTabProps {
  activeEdition: DevotionEdition;
  journal: PrayerJournalEntry[];
  onAddJournalEntry: (entry: Omit<PrayerJournalEntry, "id" | "date" | "isAnswered">) => void;
  onMarkAnswered: (id: string, testimony?: string) => void;
  onDeleteJournalEntry: (id: string) => void;
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
}

export const PrayersTab: React.FC<PrayersTabProps> = ({
  activeEdition,
  journal,
  onAddJournalEntry,
  onMarkAnswered,
  onDeleteJournalEntry,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak
}) => {
  const [activeTabSubView, setActiveTabSubView] = useState<"catalog" | "journal" | "ai">("catalog");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePrayerModal, setActivePrayerModal] = useState<StructuredPrayer | null>(null);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);

  const convertPrayerToDevotion = (prayer: StructuredPrayer): Devotion => {
    return {
      id: prayer.id,
      edition: prayer.edition || "morning",
      editionLabel: `PRAYER SANCTUARY • ${prayer.category.toUpperCase()}`,
      title: prayer.title,
      keyScripture: prayer.suggestedScriptures?.[0] || "1 Thessalonians 5:17",
      passageText: prayer.sections.scripturePromise || "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      reflection: `${prayer.sections.adoration}\n\n${prayer.sections.confessionAndSurrender}\n\n${prayer.sections.thanksgiving}\n\n${prayer.sections.spiritualWarfare}`,
      practicalApplication: prayer.subtitle || "Apostolic Prayer Sanctuary",
      guidedPrayer: `${prayer.sections.petition} ${prayer.sections.declarationInJesusName}`,
      actionStep: `Prayer Focus: ${prayer.sections.petition}`,
      theme: prayer.theme || prayer.category,
      category: prayer.category,
      readTimeMinutes: 3
    };
  };

  // Journal form state
  const [newRequestTitle, setNewRequestTitle] = useState("");
  const [newRequestCategory, setNewRequestCategory] = useState("Peace & Faith");
  const [newRequestText, setNewRequestText] = useState("");
  const [newRequestScriptures, setNewRequestScriptures] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [testimonyInputId, setTestimonyInputId] = useState<string | null>(null);
  const [testimonyText, setTestimonyText] = useState("");

  // AI Prayer Generator state
  const [aiNeed, setAiNeed] = useState("");
  const [aiCategory, setAiCategory] = useState("Personal Needs");
  const [isGeneratingPrayer, setIsGeneratingPrayer] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [generatedPrayerResult, setGeneratedPrayerResult] = useState<StructuredPrayer | null>(null);
  const [streamingAiPrayerText, setStreamingAiPrayerText] = useState("");
  const [streamingPrayerProgress, setStreamingPrayerProgress] = useState(20);

  // Filtered Prayers
  const filteredPrayers = STRUCTURED_PRAYERS_CATALOG.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const getEditionIcon = (edition?: string) => {
    switch (edition) {
      case "morning":
        return <Sunrise className="w-4 h-4 text-amber-600" />;
      case "afternoon":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "evening":
        return <Moon className="w-4 h-4 text-indigo-600" />;
      default:
        return <Shield className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleAddJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestTitle.trim() || !newRequestText.trim()) return;

    const scriptures = newRequestScriptures
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onAddJournalEntry({
      title: newRequestTitle.trim(),
      category: newRequestCategory,
      requestText: newRequestText.trim(),
      scripturePromises: scriptures.length > 0 ? scriptures : ["Philippians 4:6-7"]
    });

    setNewRequestTitle("");
    setNewRequestText("");
    setNewRequestScriptures("");
    setShowAddForm(false);
  };

  const handleGenerateAiPrayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiNeed.trim() || isGeneratingPrayer) return;

    setIsGeneratingPrayer(true);
    setAiError(null);
    setGeneratedPrayerResult(null);
    setStreamingAiPrayerText("");
    setStreamingPrayerProgress(15);

    try {
      const res = await streamAiContent<any>({
        need: aiNeed.trim(),
        category: aiCategory,
        fastMode: getIsFastMode(),
        storageKey: `ai_custom_prayers_history_${aiCategory}`,
        onProgress: (prog) => {
          setStreamingPrayerProgress(prog);
        },
        onChunk: (chunk, accText) => {
          setStreamingAiPrayerText(accText);
        },
        onComplete: (fullText, data) => {
          setStreamingPrayerProgress(100);
          const pData = data?.prayer || data || {};
          const adoration = pData.sections?.adoration || pData.adoration || "Almighty Father, Creator and Sustainer of life, we praise Your Holy Name.";
          const confession = pData.sections?.confessionAndSurrender || pData.confessionAndSurrender || pData.confession || `Lord Jesus, we surrender every anxiety regarding ${aiNeed} into Your hands.`;
          const thanksgiving = pData.sections?.thanksgiving || pData.thanksgiving || "Thank You, Father, for Your faithful promises that never fail.";
          const scripturePromise = pData.sections?.scripturePromise || pData.scripturePromise || pData.scriptureAnchor || "Philippians 4:19 - 'My God shall supply all your need.'";
          const petition = pData.sections?.petition || pData.petition || `Lord, we petition Your throne of grace for supernatural intervention in: ${aiNeed}.`;
          const warfare = pData.sections?.spiritualWarfare || pData.spiritualWarfare || pData.warfareDeclaration || "In the Name of Jesus Christ, we break every assignment of defeat and fear.";
          const closing = pData.sections?.declarationInJesusName || pData.declarationInJesusName || pData.closing || "We seal this prayer in the mighty Name of Jesus Christ. Amen.";

          const fullPrayer: StructuredPrayer = {
            id: `ai-pr-${Date.now()}`,
            title: pData.title || `Prayer for ${aiCategory}`,
            subtitle: pData.subtitle || `Targeted Intercession for ${aiNeed}`,
            category: aiCategory,
            theme: aiNeed,
            sections: {
              adoration,
              confessionAndSurrender: confession,
              thanksgiving,
              scripturePromise,
              petition,
              spiritualWarfare: warfare,
              declarationInJesusName: closing
            },
            suggestedScriptures: pData.suggestedScriptures || ["Philippians 4:6-7", "Psalm 91:1-2", "Isaiah 41:10"]
          };
          setGeneratedPrayerResult(fullPrayer);
          setActivePrayerModal(fullPrayer);
          setIsGeneratingPrayer(false);
        },
        onError: (err) => {
          console.warn("Failed to generate prayer via stream, falling back to scriptural pattern:", err);
          const fallbackPrayer: StructuredPrayer = {
            id: `ai-pr-${Date.now()}`,
            title: `Prayer of Faith for ${aiCategory}`,
            subtitle: `Intercession concerning ${aiNeed}`,
            category: aiCategory,
            theme: aiNeed,
            sections: {
              adoration: "Holy and Sovereign Father, You are the Alpha and Omega, our refuge and strength in every time of need.",
              confessionAndSurrender: `Lord Jesus, I surrender all worry, fatigue, and fear regarding ${aiNeed}. You are in complete control.`,
              thanksgiving: "Thank You, Lord, for hearing my prayer and for the victory already secured through the finished work of the Cross.",
              scripturePromise: "Philippians 4:6-7 - 'Be anxious for nothing; in everything by prayer let your requests be made known to God.'",
              petition: `Lord, concerning ${aiNeed}, release divine wisdom, open doors of breakthrough, and grant peace that surpasses all understanding.`,
              spiritualWarfare: `In the mighty Name of Jesus Christ, I decree that fear and confusion have no place in my life. The Lord is my shield!`,
              declarationInJesusName: "I decree and declare this prayer established in the authority of Jesus Christ. Amen."
            },
            suggestedScriptures: ["Philippians 4:6-7", "Psalm 91:1-2", "Isaiah 41:10"]
          };
          setGeneratedPrayerResult(fallbackPrayer);
          setActivePrayerModal(fallbackPrayer);
          setIsGeneratingPrayer(false);
        }
      });
    } catch (err: any) {
      console.warn("Exception in streaming prayer:", err);
      setIsGeneratingPrayer(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="p-6 rounded-lg bg-[#0F172A] text-white shadow-md border-b-4 border-[#B48C35] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#B48C35] text-white">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-serif tracking-tight text-white">
                Spiritual Warfare & Guided Prayers
              </h2>
              <p className="text-xs text-[#DCC398] font-serif italic">
                Pray with apostolic structure, biblical authority & personal journal
              </p>
            </div>
          </div>
        </div>

        {/* Sub-view Navigation Pills */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setActiveTabSubView("catalog")}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              activeTabSubView === "catalog"
                ? "bg-[#B48C35] text-white shadow-xs"
                : "bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            Structured Prayers ({STRUCTURED_PRAYERS_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveTabSubView("journal")}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              activeTabSubView === "journal"
                ? "bg-[#B48C35] text-white shadow-xs"
                : "bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            Prayer Journal ({journal.length})
          </button>
          <button
            onClick={() => setActiveTabSubView("ai")}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              activeTabSubView === "ai"
                ? "bg-[#B48C35] text-white shadow-xs"
                : "bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            AI Prayer Creator
          </button>
        </div>
      </div>

      {/* VIEW 1: STRUCTURED PRAYERS CATALOG */}
      {activeTabSubView === "catalog" && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {["All", "Spiritual Warfare", "Daily Hours", "Peace & Anxiety", "Healing & Health", "Family & Guidance"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded whitespace-nowrap font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "bg-white border border-[#E5D5BC] text-[#1A2A44] hover:bg-[#FDFBF7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Prayers List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPrayers.map((prayer) => {
              const isSaved = isBookmarked(prayer.id, "prayer");

              return (
                <div
                  key={prayer.id}
                  className="p-6 rounded-lg bg-white border border-[#E5D5BC] shadow-xs hover:border-[#B48C35] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#B48C35]">
                        {getEditionIcon(prayer.edition)}
                        <span>{prayer.category}</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            onToggleBookmark({
                              type: "prayer",
                              title: prayer.title,
                              reference: prayer.category,
                              snippet: prayer.subtitle,
                              targetId: prayer.id
                            })
                          }
                          className={`p-1.5 rounded transition-colors ${
                            isSaved
                              ? "text-[#B48C35] bg-[#F1E6D2]"
                              : "text-slate-400 hover:text-[#B48C35] hover:bg-[#FDFBF7]"
                          }`}
                          title="Bookmark Prayer"
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-serif text-[#0F172A]">
                      {prayer.title}
                    </h3>
                    <p className="text-xs text-[#334155] line-clamp-2">
                      {prayer.subtitle}
                    </p>

                    {/* Scripture anchor badge */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prayer.suggestedScriptures.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#FDFBF7] text-[#1A2A44] text-[10px] font-mono font-medium border border-[#E5D5BC]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Open Full Structured Prayer Room & Devotion Picture Card */}
                  <div className="pt-3 border-t border-[#E5D5BC] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActivePrayerModal(prayer)}
                      className="py-2 px-3 sm:px-4 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-[#DCC398]" />
                      <span>Enter Prayer Room</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPictureDevotion(convertPrayerToDevotion(prayer))}
                        className="py-1.5 px-2.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Turn into Devotion Picture Card & Download"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline">Devotion Picture</span>
                      </button>

                      <button
                        onClick={() =>
                          onShareItem(
                            prayer.title,
                            `${prayer.sections.adoration}\n\n${prayer.sections.petition}\n\n${prayer.sections.declarationInJesusName}`,
                            prayer.suggestedScriptures[0],
                            prayer.subtitle
                          )
                        }
                        className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4 text-[#B48C35]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: PRAYER JOURNAL & ANSWERED TESTIMONIES */}
      {activeTabSubView === "journal" && (
        <div className="space-y-4">
          {/* Top action bar */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/70 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B48C35]" /> Personal Prayer Journal & Petitions
            </h3>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="py-2 px-4 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Plus className="w-4 h-4 text-[#DCC398]" />
              <span>{showAddForm ? "Cancel" : "Add Request"}</span>
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddJournalSubmit}
              className="p-6 rounded-lg bg-white border border-[#B48C35] shadow-md space-y-4 animate-in fade-in duration-150"
            >
              <h4 className="text-base font-serif text-[#0F172A]">
                Record New Prayer Request Before God
              </h4>

              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Prayer Title (e.g., Peace for brother, Provision for job)..."
                  value={newRequestTitle}
                  onChange={(e) => setNewRequestTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] focus:outline-hidden focus:border-[#B48C35]"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newRequestCategory}
                    onChange={(e) => setNewRequestCategory(e.target.value)}
                    className="px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] focus:outline-hidden"
                  >
                    <option value="Peace & Faith">Peace & Faith</option>
                    <option value="Healing & Health">Healing & Health</option>
                    <option value="Spiritual Warfare">Spiritual Warfare</option>
                    <option value="Family & Salvation">Family & Salvation</option>
                    <option value="Wisdom & Career">Wisdom & Career</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Scripture Promises (e.g. Philippians 4:6, Psalm 91)"
                    value={newRequestScriptures}
                    onChange={(e) => setNewRequestScriptures(e.target.value)}
                    className="px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] focus:outline-hidden"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Pour out your petition, details, and faith declaration..."
                  value={newRequestText}
                  onChange={(e) => setNewRequestText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] focus:outline-hidden focus:border-[#B48C35]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="py-2 px-4 rounded border border-[#E5D5BC] text-[#1A2A44] text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest shadow-xs"
                >
                  Save to Prayer Altar
                </button>
              </div>
            </form>
          )}

          {/* Journal Entries List */}
          <div className="space-y-3">
            {journal.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-lg border border-[#E5D5BC] space-y-2">
                <HeartHandshake className="w-10 h-10 mx-auto text-[#B48C35] opacity-60 stroke-1" />
                <p className="text-sm font-serif font-bold text-[#0F172A]">Your Prayer Journal is currently empty.</p>
                <p className="text-xs text-[#64748B]">Record your personal petitions and watch how God answers!</p>
              </div>
            ) : (
              journal.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-5 sm:p-6 rounded-lg border transition-all space-y-3 ${
                    entry.isAnswered
                      ? "bg-[#F1E6D2] border-[#B48C35]"
                      : "bg-white border-[#E5D5BC] shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C35]">
                          {entry.category} • {entry.date}
                        </span>
                        {entry.isAnswered && (
                          <span className="px-2 py-0.5 rounded bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#DCC398]" /> Answered Prayer!
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-serif text-[#0F172A]">
                        {entry.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => onDeleteJournalEntry(entry.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-serif italic">
                    "{entry.requestText}"
                  </p>

                  {/* Scripture Promises */}
                  {entry.scripturePromises && entry.scripturePromises.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 font-medium">Standing On:</span>
                      {entry.scripturePromises.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#FDFBF7] text-[#1A2A44] text-[10px] font-mono font-semibold border border-[#E5D5BC]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Answered Testimony Banner */}
                  {entry.isAnswered && entry.testimony && (
                    <div className="p-4 rounded-lg bg-white border border-[#DCC398] text-xs space-y-1">
                      <span className="font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#B48C35]" /> Testimony of God's Faithfulness ({entry.answeredDate}):
                      </span>
                      <p className="italic text-[#1A2A44] font-serif">
                        "{entry.testimony}"
                      </p>
                    </div>
                  )}

                  {/* Mark answered action */}
                  {!entry.isAnswered && (
                    <div className="pt-2 border-t border-[#E5D5BC] flex items-center justify-between">
                      {testimonyInputId === entry.id ? (
                        <div className="w-full space-y-2">
                          <input
                            type="text"
                            placeholder="Describe how God answered this prayer..."
                            value={testimonyText}
                            onChange={(e) => setTestimonyText(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#B48C35] rounded text-xs"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setTestimonyInputId(null)}
                              className="px-3 py-1 rounded text-xs text-slate-500 uppercase font-bold"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                onMarkAnswered(entry.id, testimonyText);
                                setTestimonyInputId(null);
                                setTestimonyText("");
                              }}
                              className="px-4 py-1.5 rounded bg-[#0F172A] text-white text-xs font-bold uppercase tracking-widest"
                            >
                              Save Testimony
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setTestimonyInputId(entry.id)}
                          className="py-1.5 px-3 rounded bg-[#F1E6D2] hover:bg-[#DCC398] text-[#0F172A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        >
                          <Award className="w-3.5 h-3.5 text-[#B48C35]" />
                          <span>Mark as Answered with Testimony</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: AI GUIDED PRAYER GENERATOR */}
      {activeTabSubView === "ai" && (
        <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#E5D5BC] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#F1E6D2] text-[#B48C35] border border-[#DCC398]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif text-[#0F172A]">
                Apostolic AI Prayer Intercessor
              </h3>
              <p className="text-xs text-[#64748B]">
                Generate structured, powerful prayers with adoration, warfare authority, and biblical promises
              </p>
            </div>
          </div>

          {aiError && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
              <span>{aiError}</span>
              <button
                type="button"
                onClick={() => setAiError(null)}
                className="text-amber-600 hover:text-amber-900 font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Streaming Loading Indicator */}
          {isGeneratingPrayer && (
            <AiFastLoadingView
              progress={streamingPrayerProgress}
              title={`Composing Prayer for ${aiCategory}`}
              actionType="Prayer"
              streamingText={streamingAiPrayerText}
              isStreaming={true}
              onCancel={() => setIsGeneratingPrayer(false)}
            />
          )}

          <form onSubmit={handleGenerateAiPrayer} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                What situation or person are you lifting up in prayer?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Total peace and healing before medical test, restoring marriage harmony, breaking anxiety attacks..."
                value={aiNeed}
                onChange={(e) => setAiNeed(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] focus:outline-hidden focus:border-[#B48C35]"
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-bold uppercase text-[11px]">Prayer Focus:</span>
                {["Peace & Anxiety", "Healing", "Family", "Protection"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setAiCategory(f)}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                      aiCategory === f
                        ? "bg-[#0F172A] text-white"
                        : "bg-[#FDFBF7] border border-[#E5D5BC] text-[#1A2A44]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isGeneratingPrayer || !aiNeed.trim()}
                className="py-2.5 px-6 rounded bg-[#0F172A] hover:bg-[#B48C35] disabled:opacity-50 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                {isGeneratingPrayer ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#DCC398]" />
                    <span>Generate Structured Prayer</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FULL STRUCTURED PRAYER ROOM MODAL */}
      {activePrayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-xl shadow-2xl border-2 border-[#B48C35] max-h-[92vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5D5BC] flex items-center justify-between bg-[#0F172A] text-white">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DCC398] flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{activePrayerModal.category} • The Prayer Room</span>
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white truncate">
                  {activePrayerModal.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const fullText = `${activePrayerModal.title}. Adoration: ${activePrayerModal.sections.adoration}. Surrender: ${activePrayerModal.sections.confessionAndSurrender}. Thanksgiving: ${activePrayerModal.sections.thanksgiving}. Scripture Promise: ${activePrayerModal.sections.scripturePromise}. Petition: ${activePrayerModal.sections.petition}. Warfare Authority: ${activePrayerModal.sections.spiritualWarfare}. Declaration: ${activePrayerModal.sections.declarationInJesusName}`;
                    onToggleSpeak(fullText);
                  }}
                  className="p-2 rounded text-[#DCC398] hover:bg-white/10 transition-colors"
                  title="Pray Aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePrayerModal(null)}
                  className="p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Structured Prayer Sections Flow */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-[#1A2A44]">
              {/* 1. Adoration */}
              <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1">
                  1. Adoration & Praise of God's Holiness
                </span>
                <p className="text-base font-serif italic leading-relaxed text-[#0F172A]">
                  "{activePrayerModal.sections.adoration}"
                </p>
              </div>

              {/* 2. Confession & Surrender */}
              <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748B]">
                  2. Humility, Confession & Consecration
                </span>
                <p className="text-base font-serif italic leading-relaxed text-[#334155]">
                  "{activePrayerModal.sections.confessionAndSurrender}"
                </p>
              </div>

              {/* 3. Thanksgiving */}
              <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35]">
                  3. Thanksgiving & Remembrance of Grace
                </span>
                <p className="text-base font-serif italic leading-relaxed text-[#334155]">
                  "{activePrayerModal.sections.thanksgiving}"
                </p>
              </div>

              {/* 4. Scripture Promise */}
              <div className="p-5 rounded-lg bg-[#F1E6D2] border border-[#DCC398] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" /> 4. Standing on God's Infallible Promise
                </span>
                <blockquote className="text-base font-serif font-semibold text-[#0F172A]">
                  "{activePrayerModal.sections.scripturePromise}"
                </blockquote>
              </div>

              {/* 5. Petition & Supplication */}
              <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A]">
                  5. Specific Petitions & Intercession
                </span>
                <p className="text-base font-serif italic leading-relaxed text-[#1A2A44]">
                  "{activePrayerModal.sections.petition}"
                </p>
              </div>

              {/* 6. Spiritual Warfare */}
              <div className="p-4 rounded-lg bg-[#0F172A] text-white space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#DCC398] flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#DCC398]" /> 6. Spiritual Warfare & Authority in Christ
                </span>
                <p className="text-base font-serif italic leading-relaxed text-slate-100">
                  "{activePrayerModal.sections.spiritualWarfare}"
                </p>
              </div>

              {/* 7. Closing Declaration */}
              <div className="p-5 rounded-lg bg-[#F1E6D2] border-2 border-[#B48C35] space-y-1 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35]">
                  7. Victorious Closing in Jesus' Name
                </span>
                <p className="text-lg font-serif font-bold text-[#0F172A]">
                  "{activePrayerModal.sections.declarationInJesusName}"
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#E5D5BC] flex flex-wrap items-center justify-between gap-3 bg-white">
              <button
                onClick={() => setActivePrayerModal(null)}
                className="py-2.5 px-5 rounded border border-[#E5D5BC] text-[#1A2A44] text-xs font-bold uppercase tracking-wider"
              >
                Close Room
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const dev = convertPrayerToDevotion(activePrayerModal);
                    setPictureDevotion(dev);
                  }}
                  className="py-2.5 px-3.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                >
                  <ImageIcon className="w-4 h-4 text-slate-950" />
                  <span>Devotion Picture</span>
                </button>

                <button
                  onClick={() => {
                    const dev = convertPrayerToDevotion(activePrayerModal);
                    printDevotionOnePageDocument(dev);
                  }}
                  className="py-2.5 px-3.5 rounded bg-slate-900 text-amber-300 border border-amber-500/40 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>1-Page PDF</span>
                </button>

                <button
                  onClick={() => {
                    onShareItem(
                      activePrayerModal.title,
                      `${activePrayerModal.sections.adoration}\n\n${activePrayerModal.sections.scripturePromise}\n\n${activePrayerModal.sections.declarationInJesusName}`,
                      activePrayerModal.suggestedScriptures[0],
                      activePrayerModal.subtitle
                    );
                  }}
                  className="py-2.5 px-5 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-4 h-4 text-[#DCC398]" />
                  <span>Share Prayer Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Devotion Picture Export Modal */}
      {pictureDevotion && (
        <DevotionPictureModal
          devotion={pictureDevotion}
          isOpen={Boolean(pictureDevotion)}
          onClose={() => setPictureDevotion(null)}
        />
      )}
    </div>
  );
};
