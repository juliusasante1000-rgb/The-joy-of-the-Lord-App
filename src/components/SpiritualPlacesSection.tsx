import React, { useState } from "react";
import {
  Sparkles,
  ChevronRight,
  Compass,
  BookOpen,
  Info,
  Layers,
  Search,
  Filter,
  ArrowRight
} from "lucide-react";
import { SpiritualPlace } from "../types";
import { getAllSpiritualPlaces } from "../data/spiritualPlacesData";

interface SpiritualPlacesSectionProps {
  onSelectPlace: (place: SpiritualPlace) => void;
  onNavigateToPlacesTab?: () => void;
}

export const SpiritualPlacesSection: React.FC<SpiritualPlacesSectionProps> = ({
  onSelectPlace,
  onNavigateToPlacesTab
}) => {
  const [places] = useState<SpiritualPlace[]>(() =>
    getAllSpiritualPlaces().filter((p) => p.isPublished)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterCategories = [
    { id: "all", label: "All Spiritual Places" },
    { id: "rest", label: "🌿 Rest & Provision" },
    { id: "prayer", label: "🔥 Prayer & Holy Spirit" },
    { id: "encounter", label: "✨ Encounter & Transformation" },
    { id: "guidance", label: "🌊 Guidance & Journey" },
    { id: "victory", label: "🏆 Breakthrough & Victory" }
  ];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.spiritualMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.themes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === "all") return true;
    if (selectedFilter === "rest")
      return (
        place.id === "brook-cherith" ||
        place.id === "the-valley" ||
        place.id === "nazareth" ||
        place.themes.some((t) => t.toLowerCase().includes("rest") || t.toLowerCase().includes("provision"))
      );
    if (selectedFilter === "prayer")
      return (
        place.id === "upper-room" ||
        place.id === "house-of-prayer" ||
        place.id === "gethsemane" ||
        place.id === "mount-of-olives" ||
        place.themes.some((t) => t.toLowerCase().includes("prayer") || t.toLowerCase().includes("spirit"))
      );
    if (selectedFilter === "encounter")
      return (
        place.id === "peniel" ||
        place.id === "bethel" ||
        place.id === "emmaus" ||
        place.id === "patmos" ||
        place.themes.some((t) => t.toLowerCase().includes("encounter") || t.toLowerCase().includes("revelation"))
      );
    if (selectedFilter === "guidance")
      return (
        place.id === "fair-havens" ||
        place.id === "wilderness" ||
        place.id === "galilee" ||
        place.themes.some((t) => t.toLowerCase().includes("direction") || t.toLowerCase().includes("journey"))
      );
    if (selectedFilter === "victory")
      return (
        place.id === "jericho" ||
        place.id === "mount-carmel" ||
        place.id === "cave-of-adullam" ||
        place.id === "mount-zion" ||
        place.themes.some((t) => t.toLowerCase().includes("victory") || t.toLowerCase().includes("breakthrough"))
      );

    return true;
  });

  return (
    <section
      id="spiritual-places-section"
      className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800 space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide uppercase border border-amber-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Where Are You Today?
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Secondary Interactive Sanctuary
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16235A] dark:text-white tracking-tight">
            SPIRITUAL PLACES
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-serif italic mt-0.5">
            “Where Scripture meets your journey.”
          </p>
        </div>

        {/* Quick Search & Explore Tab Button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search places or themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-hidden focus:border-amber-500 transition-colors"
            />
          </div>
          {onNavigateToPlacesTab && (
            <button
              onClick={onNavigateToPlacesTab}
              className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 dark:text-amber-300 border border-amber-500/30 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Full Tab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Theological Safeguard & Context Note */}
      <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">
            Devotional Metaphor & Biblical Reflection
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The titles and themes in Spiritual Places are devotional illustrations derived from biblical narratives, encouraging contemplation and personal application. Always examine the full Scripture in its historical and biblical context.
          </p>
        </div>
      </div>

      {/* Quick Place Pill Selector (Horizontally scrollable for swift picking) */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Choose a place for today's Scripture:
        </p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
          {places.slice(0, 12).map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPlace(p)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer active:scale-95 group"
            >
              <span className="text-base">{p.icon}</span>
              <span>{p.name}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === cat.id
                ? "bg-[#16235A] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Spiritual Places Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Badge & Icon */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200/60 dark:border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
                  {place.icon}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800/60">
                    {place.scriptureCountDisplay}
                  </span>
                  <span className="text-[10px] text-slate-400 font-serif italic">
                    {place.biblicalReference}
                  </span>
                </div>
              </div>

              {/* Name & Subtitle */}
              <h3 className="text-lg font-serif font-bold text-[#16235A] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {place.name}
              </h3>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300/90 mb-2">
                {place.subtitle}
              </p>

              {/* Spiritual Meaning */}
              <blockquote className="text-xs text-slate-600 dark:text-slate-300 italic border-l-2 border-amber-400/80 pl-2.5 py-0.5 my-2.5 bg-slate-50 dark:bg-slate-950/50 rounded-r-lg">
                "{place.spiritualMeaning}"
              </blockquote>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* Themes & Action Button */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex flex-wrap gap-1">
                {place.themes.slice(0, 3).map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]"
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
                onClick={() => onSelectPlace(place)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#16235A] dark:bg-slate-800 dark:hover:bg-amber-500 text-white dark:text-slate-100 dark:hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md transition-all cursor-pointer"
              >
                <span>Enter {place.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
