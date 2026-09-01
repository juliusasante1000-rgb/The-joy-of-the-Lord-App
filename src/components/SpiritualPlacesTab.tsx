import React, { useState } from "react";
import {
  Compass,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
  Layers,
  ChevronRight,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Star
} from "lucide-react";
import { SpiritualPlace } from "../types";
import { getAllSpiritualPlaces } from "../data/spiritualPlacesData";
import { SpiritualPlaceSanctuaryModal } from "./SpiritualPlaceSanctuaryModal";

interface SpiritualPlacesTabProps {
  onNavigateToBibleChapter?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: any) => void;
  onNavigateTab?: (tab: string) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  onToggleBookmark?: (item: any) => void;
  onShareItem?: (item: any) => void;
  isSpeaking?: boolean;
  onToggleSpeak?: (text: string) => void;
}

export const SpiritualPlacesTab: React.FC<SpiritualPlacesTabProps> = ({
  onNavigateToBibleChapter,
  onOpenDevotion,
  onNavigateTab,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak
}) => {
  const [places] = useState<SpiritualPlace[]>(() =>
    getAllSpiritualPlaces().filter((p) => p.isPublished)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSanctuaryPlace, setActiveSanctuaryPlace] = useState<SpiritualPlace | null>(null);

  const [visibleLimit, setVisibleLimit] = useState<number>(36);

  const categories = [
    { id: "all", label: "All Spiritual Places" },
    { id: "rest", label: "🌿 Rest & Provision" },
    { id: "prayer", label: "🔥 Prayer & Holy Spirit" },
    { id: "encounter", label: "✨ Encounter & Revelation" },
    { id: "guidance", label: "🌊 Guidance & Calling" },
    { id: "victory", label: "🏆 Breakthrough & Victory" }
  ];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.spiritualMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.themes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "rest")
      return (
        place.id === "brook-cherith" ||
        place.id === "the-valley" ||
        place.id === "nazareth" ||
        place.themes.some((t) => t.toLowerCase().includes("rest") || t.toLowerCase().includes("provision"))
      );
    if (selectedCategory === "prayer")
      return (
        place.id === "upper-room" ||
        place.id === "house-of-prayer" ||
        place.id === "gethsemane" ||
        place.id === "mount-of-olives" ||
        place.themes.some((t) => t.toLowerCase().includes("prayer") || t.toLowerCase().includes("spirit"))
      );
    if (selectedCategory === "encounter")
      return (
        place.id === "peniel" ||
        place.id === "bethel" ||
        place.id === "emmaus" ||
        place.id === "patmos" ||
        place.themes.some((t) => t.toLowerCase().includes("encounter") || t.toLowerCase().includes("revelation"))
      );
    if (selectedCategory === "guidance")
      return (
        place.id === "fair-havens" ||
        place.id === "wilderness" ||
        place.id === "galilee" ||
        place.themes.some((t) => t.toLowerCase().includes("direction") || t.toLowerCase().includes("journey") || t.toLowerCase().includes("calling"))
      );
    if (selectedCategory === "victory")
      return (
        place.id === "jericho" ||
        place.id === "mount-carmel" ||
        place.id === "cave-of-adullam" ||
        place.id === "mount-zion" ||
        place.themes.some((t) => t.toLowerCase().includes("victory") || t.toLowerCase().includes("breakthrough"))
      );

    return true;
  });

  const handleNextPlace = () => {
    if (!activeSanctuaryPlace || filteredPlaces.length === 0) return;
    const currentIndex = filteredPlaces.findIndex((p) => p.id === activeSanctuaryPlace.id);
    const nextIndex = currentIndex >= 0 && currentIndex < filteredPlaces.length - 1 ? currentIndex + 1 : 0;
    setActiveSanctuaryPlace(filteredPlaces[nextIndex] || filteredPlaces[0]);
  };

  const handlePrevPlace = () => {
    if (!activeSanctuaryPlace || filteredPlaces.length === 0) return;
    const currentIndex = filteredPlaces.findIndex((p) => p.id === activeSanctuaryPlace.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredPlaces.length - 1;
    setActiveSanctuaryPlace(filteredPlaces[prevIndex] || filteredPlaces[0]);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#16235A] via-[#1E2E72] to-[#9333EA] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5 backdrop-blur-xs">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Biblical Spiritual Sanctuaries
            </span>
            <span className="text-xs text-indigo-200/80 hidden sm:inline">
              Scripture categorized by biblical journeys & encounters
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            SPIRITUAL PLACES
          </h1>

          <p className="text-base sm:text-lg text-amber-200/90 font-serif italic max-w-2xl">
            “Where Scripture meets your journey.”
          </p>

          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl leading-relaxed">
            Select any biblical sanctuary to enter a consecrated devotional atmosphere. Receive weighted, relevant Scripture verses, meditation reflections, and flow them directly into your daily walk with God.
          </p>
        </div>
      </div>

      {/* Theological Distinction Notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950 shadow-2xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-900">
            Biblical Devotional Illustration Notice
          </p>
          <p className="text-slate-600 leading-relaxed">
            The titles and themes in Spiritual Places are devotional illustrations derived from biblical narratives, encouraging contemplation and personal application. Always examine the full Scripture in its historical and biblical context.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by place name, theme, or meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-hidden focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>

          <span className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
            Showing <strong>{filteredPlaces.length}</strong> of {places.length} Spiritual Places
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#16235A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Place Selection Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Sanctuary Select:
          </p>
          <span className="text-[11px] text-slate-400 font-medium">
            Scroll horizontally for more places
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {places.slice(0, 50).map((place) => (
            <button
              key={place.id}
              onClick={() => setActiveSanctuaryPlace(place)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all shrink-0 cursor-pointer active:scale-95 group"
            >
              <span>{place.icon}</span>
              <span>{place.name}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Spiritual Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlaces.slice(0, visibleLimit).map((place) => (
          <div
            key={place.id}
            className="group bg-white border border-[#E8E0F0] hover:border-amber-500/80 rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Top Row: Icon, Scripture Count, Biblical Reference */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
                  {place.icon}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                    {place.scriptureCountDisplay}
                  </span>
                  <span className="text-[10px] text-slate-400 font-serif italic">
                    {place.biblicalReference}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-bold text-[#16235A] group-hover:text-amber-700 transition-colors">
                  {place.name}
                </h3>
                {place.isFeatured && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-amber-700 mb-2">
                {place.subtitle}
              </p>

              {/* Spiritual Meaning */}
              <blockquote className="text-xs text-slate-600 italic border-l-2 border-amber-400 pl-2.5 py-1 my-2.5 bg-[#FAF8FD] rounded-r-lg">
                "{place.spiritualMeaning}"
              </blockquote>

              {/* Description & Full Narrative */}
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                {place.description}
              </p>
            </div>

            {/* Bottom: Themes & Enter Action */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap gap-1">
                {place.themes.slice(0, 3).map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                  >
                    {theme}
                  </span>
                ))}
                {place.themes.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400">
                    +{place.themes.length - 3}
                  </span>
                )}
              </div>

              <button
                onClick={() => setActiveSanctuaryPlace(place)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#16235A] hover:bg-[#24357D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md transition-all cursor-pointer"
              >
                <span>Enter {place.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Pagination */}
      {visibleLimit < filteredPlaces.length && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setVisibleLimit((prev) => Math.min(prev + 48, filteredPlaces.length))}
            className="px-6 py-3 rounded-2xl bg-[#16235A] hover:bg-[#24357D] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Load More Sanctuaries (+48)</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setVisibleLimit(filteredPlaces.length)}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            Show All ({filteredPlaces.length})
          </button>
        </div>
      )}

      {/* Spiritual Place Sanctuary Modal */}
      <SpiritualPlaceSanctuaryModal
        place={activeSanctuaryPlace}
        isOpen={!!activeSanctuaryPlace}
        onClose={() => setActiveSanctuaryPlace(null)}
        onNavigateToBibleChapter={onNavigateToBibleChapter}
        onOpenDevotion={onOpenDevotion}
        onNavigateTab={onNavigateTab}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
        onShareItem={onShareItem}
        isSpeaking={isSpeaking}
        onToggleSpeak={onToggleSpeak}
        onSelectNextPlace={handleNextPlace}
        onSelectPrevPlace={handlePrevPlace}
        hasNextPlace={filteredPlaces.length > 1}
        hasPrevPlace={filteredPlaces.length > 1}
      />
    </div>
  );
};
