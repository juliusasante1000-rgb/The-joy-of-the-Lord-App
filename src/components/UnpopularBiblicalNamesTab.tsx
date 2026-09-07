import React, { useState, useMemo } from "react";
import {
  Shield,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Check,
  Copy,
  ArrowRight,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  UserCheck,
  Users
} from "lucide-react";
import { UnpopularBiblicalName } from "../types";
import { UNPOPULAR_BIBLICAL_500_NAMES } from "../data/unpopularNames500Catalog";

interface UnpopularBiblicalNamesTabProps {
  onNavigateToBibleChapter?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  onToggleBookmark?: (item: any) => void;
  onShareItem?: (item: any) => void;
  isSpeaking?: boolean;
  onToggleSpeak?: (text: string) => void;
}

export const UnpopularBiblicalNamesTab: React.FC<UnpopularBiblicalNamesTabProps> = ({
  onNavigateToBibleChapter,
  onOpenDevotion,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPersonType, setSelectedPersonType] = useState<string>("all");
  const [activeModalPerson, setActiveModalPerson] = useState<UnpopularBiblicalName | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(36);

  const categories = useMemo(() => [
    { id: "all", label: "All 500 Figures" },
    { id: "Honor & Enlargement", label: "🏛️ Honor & Enlargement" },
    { id: "Divine Service & Favor", label: "🔥 Divine Service & Favor" },
    { id: "Wisdom & Enduring Strength", label: "🛡️ Wisdom & Strength" },
    { id: "Fruitfulness & Joy", label: "🍇 Fruitfulness & Joy" },
    { id: "Daughters of Beauty & Inheritance", label: "👑 Daughters of Beauty" },
    { id: "Everlasting Joy & Peace", label: "🕊️ Joy & Peace" }
  ], []);

  const personTypes = useMemo(() => [
    { id: "all", label: "All Roles" },
    { id: "Man of Blessing", label: "Men of Blessing" },
    { id: "Hero of Faith", label: "Heroes of Faith" },
    { id: "Royal & Levite Watchman", label: "Levites & Watchmen" },
    { id: "Woman of Blessing", label: "Women of Blessing" }
  ], []);

  const filteredList = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return UNPOPULAR_BIBLICAL_500_NAMES.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      const matchesType = selectedPersonType === "all" || item.personType === selectedPersonType;
      if (!matchesType) return false;

      if (!query) return true;

      return (
        item.name.toLowerCase().includes(query) ||
        item.originalScript.includes(query) ||
        item.transliteration.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.scriptureReference.toLowerCase().includes(query) ||
        item.historicalRole.toLowerCase().includes(query) ||
        item.personType.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory, selectedPersonType]);

  const handleCopy = (item: UnpopularBiblicalName) => {
    const text = `BIBLICAL HERO & BLESSING (#${item.id}):\n${item.name} - ${item.originalScript} (${item.transliteration})\nMeaning: ${item.meaning}\nRole: ${item.personType} - ${item.historicalRole}\nScripture: ${item.scriptureReference}\n\nBlessing Application:\n"${item.blessingApplication}"\n\n— From The Joy of the Lord platform`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleRandomPerson = () => {
    const random = filteredList[Math.floor(Math.random() * filteredList.length)] || UNPOPULAR_BIBLICAL_500_NAMES[0];
    setActiveModalPerson(random);
  };

  const handleNavigateScripture = (ref: string) => {
    if (!onNavigateToBibleChapter) return;
    const parts = ref.split(" ");
    let book = parts[0];
    let chapVerse = parts[1] || "";
    if (parts.length >= 3 && isNaN(Number(parts[1]))) {
      book = `${parts[0]} ${parts[1]}`;
      chapVerse = parts[2];
    }
    const [chapStr, verseStr] = chapVerse.split(":");
    const chapter = parseInt(chapStr, 10) || 1;
    const verse = verseStr ? parseInt(verseStr.split("-")[0], 10) : undefined;
    onNavigateToBibleChapter(book, chapter, verse);
  };

  const handleNextModal = () => {
    if (!activeModalPerson) return;
    const idx = filteredList.findIndex((p) => p.id === activeModalPerson.id);
    const nextIdx = idx >= 0 && idx < filteredList.length - 1 ? idx + 1 : 0;
    setActiveModalPerson(filteredList[nextIdx]);
  };

  const handlePrevModal = () => {
    if (!activeModalPerson) return;
    const idx = filteredList.findIndex((p) => p.id === activeModalPerson.id);
    const prevIdx = idx > 0 ? idx - 1 : filteredList.length - 1;
    setActiveModalPerson(filteredList[prevIdx]);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F2942] via-[#153E65] to-[#1E6B9B] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-400/30 flex items-center gap-1.5 backdrop-blur-xs">
              <Shield className="w-3.5 h-3.5 text-teal-300" />
              500 Unpopular Biblical Figures
            </span>
            <span className="text-xs text-sky-200/80">
              Hidden jewels of covenant heritage in Scripture
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
            HEROES OF BLESSING
            <span className="text-xl sm:text-2xl font-hebrew text-amber-300/90 font-normal">
              אַנְשֵׁי בְרָכָה
            </span>
          </h2>

          <p className="text-base sm:text-lg text-teal-200 font-serif italic max-w-3xl">
            “500 rare &amp; profound figures in Scripture whose names mean blessings, strength, and divine favor.”
          </p>

          <p className="text-xs sm:text-sm text-sky-100/90 max-w-3xl leading-relaxed">
            Beyond the famous names, the Holy Spirit preserved 500 remarkable men and women across Chronicles, Kings, Ezra, and the Gospels whose very names are prophetic prayers of increase, quiet endurance, sanctuary service, and miraculous breakthroughs.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="unpopular-random-btn"
              onClick={handleRandomPerson}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:bg-amber-300 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              Discover a Rare Biblical Champion
            </button>
            <span className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-medium text-sky-200 border border-white/10">
              Showing {filteredList.length} of {UNPOPULAR_BIBLICAL_500_NAMES.length} Figures
            </span>
          </div>
        </div>
      </div>

      {/* Search & Multi-Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E0EBF5] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="unpopular-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(36);
              }}
              placeholder="Search by name, Hebrew, meaning, role, or scripture..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Found <span className="font-bold text-sky-900">{filteredList.length}</span> biblical persons
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-sky-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`unpopular-cat-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(36);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-sky-950 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Person Type Sub-Filters */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Role:
          </span>
          {personTypes.map((type) => (
            <button
              key={type.id}
              id={`unpopular-type-${type.id}`}
              onClick={() => {
                setSelectedPersonType(type.id);
                setVisibleCount(36);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedPersonType === type.id
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "text-slate-600 bg-slate-50 hover:bg-slate-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 500 Figures */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3">
          <Users className="w-8 h-8 text-sky-400 mx-auto" />
          <h3 className="font-serif font-bold text-slate-700 text-lg">No biblical figures match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or reset the category and role filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedPersonType("all");
            }}
            className="px-4 py-2 bg-sky-100 text-sky-950 rounded-xl text-xs font-semibold hover:bg-sky-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredList.slice(0, visibleCount).map((item) => {
            const bookmarked = isBookmarked ? isBookmarked(String(item.id), "unpopular-biblical-name") : false;

            return (
              <div
                key={item.id}
                id={`unpopular-card-${item.id}`}
                className="rounded-2xl bg-white border border-[#E2ECF5] p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-950 text-[11px] font-bold flex items-center justify-center">
                        #{item.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[11px] font-semibold">
                        {item.personType}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {onToggleBookmark && (
                        <button
                          id={`unpopular-bookmark-btn-${item.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark({
                              id: String(item.id),
                              type: "unpopular-biblical-name",
                              title: `${item.name} (${item.originalScript})`,
                              subtitle: item.meaning,
                              scripture: item.scriptureReference,
                              category: item.category
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                          title="Bookmark Figure"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                        </button>
                      )}

                      <button
                        id={`unpopular-copy-btn-${item.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-sky-700 rounded-lg hover:bg-sky-50 transition-colors"
                        title="Copy Blessing"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {onToggleSpeak && (
                        <button
                          id={`unpopular-speak-btn-${item.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSpeak(`${item.name}. Hebrew: ${item.transliteration}. Meaning: ${item.meaning}. Scripture: ${item.scriptureReference}. Role: ${item.historicalRole}. ${item.blessingApplication}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-sky-700 rounded-lg hover:bg-sky-50 transition-colors"
                          title="Listen"
                        >
                          {isSpeaking ? <VolumeX className="w-4 h-4 text-sky-700" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Name & Original Script */}
                  <div className="pt-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-sky-950 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-2xl font-bold text-amber-900 font-hebrew dir-rtl tracking-wide">
                        {item.originalScript}
                      </span>
                    </div>
                    <p className="text-xs text-sky-700 italic font-medium">
                      {item.transliteration}
                    </p>
                  </div>

                  {/* Name Meaning Highlight */}
                  <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs">
                    <span className="font-bold text-sky-950 block text-[11px] uppercase tracking-wide">
                      Name Meaning &amp; Blessing
                    </span>
                    <p className="text-sky-950 font-serif text-sm font-semibold mt-0.5">
                      “{item.meaning}”
                    </p>
                  </div>

                  {/* Historical Role */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.historicalRole}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    id={`unpopular-scripture-btn-${item.id}`}
                    onClick={() => handleNavigateScripture(item.scriptureReference)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-950 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{item.scriptureReference}</span>
                  </button>

                  <button
                    id={`unpopular-view-detail-btn-${item.id}`}
                    onClick={() => setActiveModalPerson(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-950 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>View Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Pagination */}
      {visibleCount < filteredList.length && (
        <div className="text-center pt-4">
          <button
            id="unpopular-load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 36)}
            className="px-6 py-3 bg-sky-950 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-sky-900 transition-all"
          >
            Load Next 36 Biblical Figures ({filteredList.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sky-100 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-[#0F2942] to-[#1E6B9B] text-white relative rounded-t-3xl">
              <button
                onClick={() => setActiveModalPerson(null)}
                className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  Biblical Figure #{activeModalPerson.id}
                </span>
                <span className="text-xs text-sky-200">
                  {activeModalPerson.personType}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {activeModalPerson.name}
                </h3>
                <span className="text-3xl font-serif font-bold text-amber-300 font-hebrew dir-rtl">
                  {activeModalPerson.originalScript}
                </span>
              </div>
              <p className="text-sm text-sky-200 italic mt-1">
                Original Vocalization: {activeModalPerson.transliteration}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 flex-1">
              {/* Meaning */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider block">
                  Prophetic &amp; Etymological Meaning
                </span>
                <p className="text-xl font-serif font-bold text-sky-950 mt-1">
                  &quot;{activeModalPerson.meaning}&quot;
                </p>
              </div>

              {/* Scripture Reference */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <BookOpen className="w-4 h-4 text-sky-700" />
                  <span className="font-semibold">{activeModalPerson.scriptureReference}</span>
                </div>
                <button
                  onClick={() => {
                    handleNavigateScripture(activeModalPerson.scriptureReference);
                    setActiveModalPerson(null);
                  }}
                  className="text-xs font-bold text-sky-700 hover:text-sky-950 underline"
                >
                  Read Chapter in Bible →
                </button>
              </div>

              {/* Historical Role & Scriptural Legacy */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                  Biblical Record &amp; Historic Calling
                </span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed">
                  {activeModalPerson.historicalRole}
                </div>
              </div>

              {/* Blessing Application */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Prophetic Blessing Application
                  </span>
                  <button
                    onClick={() => handleCopy(activeModalPerson)}
                    className="text-xs font-medium text-sky-700 hover:text-sky-900 flex items-center gap-1"
                  >
                    {copiedId === activeModalPerson.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Blessing</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-sm font-serif text-amber-950 leading-relaxed italic">
                  &quot;{activeModalPerson.blessingApplication}&quot;
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevModal}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </button>
                <button
                  onClick={handleNextModal}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {onToggleSpeak && (
                  <button
                    onClick={() => onToggleSpeak(`${activeModalPerson.name}. ${activeModalPerson.meaning}. ${activeModalPerson.historicalRole}. ${activeModalPerson.blessingApplication}`)}
                    className="p-2.5 rounded-xl bg-sky-100 text-sky-950 hover:bg-sky-200 transition-colors"
                    title="Audio Vocalization"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                {onShareItem && (
                  <button
                    onClick={() => onShareItem({
                      title: `Biblical Figure: ${activeModalPerson.name}`,
                      text: `${activeModalPerson.name} (${activeModalPerson.originalScript}) - "${activeModalPerson.meaning}" (${activeModalPerson.scriptureReference}): ${activeModalPerson.blessingApplication}`
                    })}
                    className="p-2.5 rounded-xl bg-sky-100 text-sky-950 hover:bg-sky-200 transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setActiveModalPerson(null)}
                  className="px-5 py-2.5 rounded-xl bg-sky-950 text-white text-xs font-bold hover:bg-sky-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
