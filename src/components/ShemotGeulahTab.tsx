import React, { useState, useMemo } from "react";
import {
  Sparkles,
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
  Heart,
  Crown,
  Info
} from "lucide-react";
import { ShemotGeulahName } from "../types";
import { SHEMOT_GEULAH_500_NAMES } from "../data/shemotGeulah500Catalog";
import { RedemptiveNameSanctuaryModal } from "./RedemptiveNameSanctuaryModal";

interface ShemotGeulahTabProps {
  onNavigateToBibleChapter?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  onToggleBookmark?: (item: any) => void;
  onShareItem?: (item: any) => void;
  isSpeaking?: boolean;
  onToggleSpeak?: (text: string) => void;
  onOpenPictureStudio?: (options: {
    reference: string;
    text: string;
    theme: string;
    category?: string;
  }) => void;
  onDownloadDirectImage?: (options: {
    reference: string;
    text: string;
    theme: string;
    category?: string;
  }) => void;
}

export const ShemotGeulahTab: React.FC<ShemotGeulahTabProps> = ({
  onNavigateToBibleChapter,
  onOpenDevotion,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onOpenPictureStudio,
  onDownloadDirectImage
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalName, setActiveModalName] = useState<ShemotGeulahName | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(36);

  const categories = useMemo(() => [
    { id: "all", label: "All 500 Names" },
    { id: "New Identity", label: "👑 New Identity" },
    { id: "Grace & Belonging", label: "🕊️ Grace & Belonging" },
    { id: "Breakthrough & Restoration", label: "⚡ Breakthrough & Restoration" },
    { id: "Royal Garment & Glory", label: "✨ Royal Garment & Glory" },
    { id: "Royal Calling & Priesthood", label: "🕯️ Royal Calling & Priesthood" },
    { id: "Covenant & Treasured", label: "💎 Covenant & Treasured" },
    { id: "Redemption & Grace", label: "🩸 Redemption & Grace" },
    { id: "Beloved & Intimacy", label: "❤️ Beloved & Intimacy" },
    { id: "Everlasting Joy & Peace", label: "🌿 Everlasting Joy & Peace" },
    { id: "Spiritual Strength", label: "🛡️ Spiritual Strength" },
    { id: "Blessing & Favor", label: "🌾 Blessing & Favor" }
  ], []);

  const filteredNames = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SHEMOT_GEULAH_500_NAMES.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;

      return (
        item.name.toLowerCase().includes(query) ||
        item.hebrew.includes(query) ||
        item.transliteration.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.scriptureReference.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (item: ShemotGeulahName) => {
    const text = `SHEMOT GEULAH (Redemptive Name #${item.id}):\n${item.name} - ${item.hebrew} (${item.transliteration})\nMeaning: ${item.meaning}\nScripture: ${item.scriptureReference}\n\nProphetic Declaration:\n"${item.propheticDeclaration}"\n\n— From The Joy of the Lord platform`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleRandomName = () => {
    const random = filteredNames[Math.floor(Math.random() * filteredNames.length)] || SHEMOT_GEULAH_500_NAMES[0];
    setActiveModalName(random);
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
    if (!activeModalName) return;
    const idx = filteredNames.findIndex((n) => n.id === activeModalName.id);
    const nextIdx = idx >= 0 && idx < filteredNames.length - 1 ? idx + 1 : 0;
    setActiveModalName(filteredNames[nextIdx]);
  };

  const handlePrevModal = () => {
    if (!activeModalName) return;
    const idx = filteredNames.findIndex((n) => n.id === activeModalName.id);
    const prevIdx = idx > 0 ? idx - 1 : filteredNames.length - 1;
    setActiveModalName(filteredNames[prevIdx]);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2D1540] via-[#4A1D6B] to-[#7E22CE] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5 backdrop-blur-xs">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              שְׁמוֹת גְּאֻלָּה • 500 Names of Redemption
            </span>
            <span className="text-xs text-purple-200/80">
              Prophetic identity spoken by God over your life
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
            SHEMOT GEULAH
            <span className="text-xl sm:text-2xl font-hebrew text-amber-300/90 font-normal">
              שְׁמוֹת גְּאֻלָּה
            </span>
          </h2>

          <p className="text-base sm:text-lg text-amber-200 font-serif italic max-w-3xl">
            “Prophetic names God calls you, not what men called you.”
          </p>

          <p className="text-xs sm:text-sm text-purple-100/90 max-w-3xl leading-relaxed">
            From Isaiah 62, Hosea 2, the Psalms, and the Prophetic Scrolls: every title is an authentic Hebrew redemptive identity sealed in Scripture. Replace shame with honor, rejection with delight, and wear your royal covenant name before the Throne.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="shemot-random-prophetic-btn"
              onClick={handleRandomName}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-purple-950 font-bold text-xs sm:text-sm shadow-md hover:bg-amber-300 transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              Receive Random Prophetic Name
            </button>
            <span className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-medium text-purple-200 border border-white/10">
              Showing {filteredNames.length} of {SHEMOT_GEULAH_500_NAMES.length} Redemptive Names
            </span>
          </div>
        </div>
      </div>

      {/* Theological Safeguard & Context Note (Spiritual Places Format) */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950 shadow-xs">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900 tracking-wide uppercase text-[11px]">
            Theological Context &amp; Prophetic Revelation
          </p>
          <p className="text-slate-700 leading-relaxed">
            The titles in <em>Shemot Geulah</em> are redemptive identities spoken by the Living God in Scripture (Isaiah 62, Hosea 2, Psalms, and the Prophets). Each name replaces former rejection and sorrow with divine belonging, righteousness, and covenant favor. Meditate on each name in conjunction with its biblical narrative.
          </p>
        </div>
      </div>

      {/* Search & Category Filtering */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="shemot-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(36);
              }}
              placeholder="Search by Hebrew, name, meaning, or Isaiah reference..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
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
            Found <span className="font-bold text-purple-800">{filteredNames.length}</span> prophetic names
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-purple-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`shemot-cat-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(36);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-purple-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 500 Names */}
      {filteredNames.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="font-serif font-bold text-slate-700 text-lg">No redemptive names match your search</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try searching for another term such as &quot;Delight&quot;, &quot;Hephzibah&quot;, &quot;Isaiah 62&quot;, &quot;Crown&quot;, or reset your filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 bg-purple-100 text-purple-900 rounded-xl text-xs font-semibold hover:bg-purple-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredNames.slice(0, visibleCount).map((item) => {
            const bookmarked = isBookmarked ? isBookmarked(String(item.id), "shemot-geulah") : false;

            return (
              <div
                key={item.id}
                id={`shemot-card-${item.id}`}
                className="rounded-2xl bg-white border border-[#EBE4F3] p-5 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Top Badge & Category */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold flex items-center justify-center">
                        #{item.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[11px] font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {onToggleBookmark && (
                        <button
                          id={`shemot-bookmark-btn-${item.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark({
                              id: String(item.id),
                              type: "shemot-geulah",
                              title: `${item.name} (${item.hebrew})`,
                              subtitle: item.meaning,
                              scripture: item.scriptureReference,
                              category: item.category
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                          title="Bookmark Redemptive Name"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                        </button>
                      )}

                      <button
                        id={`shemot-copy-btn-${item.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                        title="Copy Prophetic Declaration"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {onToggleSpeak && (
                        <button
                          id={`shemot-speak-btn-${item.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSpeak(`${item.name}. Hebrew: ${item.transliteration}. Meaning: ${item.meaning}. Scripture: ${item.scriptureReference}. Declaration: ${item.propheticDeclaration}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                          title="Listen to Pronunciation"
                        >
                          {isSpeaking ? <VolumeX className="w-4 h-4 text-purple-700" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hebrew Display */}
                  <div className="pt-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-2xl font-bold text-amber-900 font-hebrew dir-rtl tracking-wide">
                        {item.hebrew}
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 italic font-medium">
                      {item.transliteration}
                    </p>
                  </div>

                  {/* Meaning Highlight (Spiritual Places Quoted Style) */}
                  <blockquote className="text-xs text-slate-700 italic border-l-2 border-purple-500 pl-3 py-1 bg-purple-50/60 rounded-r-lg">
                    “{item.meaning}”
                  </blockquote>

                  {/* Brief Expository Explanation (Spiritual Places Format) */}
                  <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-purple-950 text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>Spiritual Significance &amp; Revelation</span>
                    </div>
                    <p className="line-clamp-3 text-slate-600">
                      {item.biblicalContext || `An authentic Hebrew prophetic title from ${item.scriptureReference} declaring covenant restoration, divine delight, and God's sovereign protection over your destiny.`}
                    </p>
                  </div>

                  {/* Prophetic Declaration Snippet */}
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50 text-xs text-amber-950 leading-relaxed">
                    <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wider mb-0.5">
                      Prophetic Decree
                    </span>
                    <p className="italic font-serif">
                      &quot;{item.propheticDeclaration}&quot;
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    id={`shemot-scripture-btn-${item.id}`}
                    onClick={() => handleNavigateScripture(item.scriptureReference)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-950 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{item.scriptureReference}</span>
                  </button>

                  <button
                    id={`shemot-view-detail-btn-${item.id}`}
                    onClick={() => setActiveModalName(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-900 hover:text-purple-950 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Declare</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Load More */}
      {visibleCount < filteredNames.length && (
        <div className="text-center pt-4">
          <button
            id="shemot-load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 36)}
            className="px-6 py-3 bg-purple-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-purple-800 transition-all"
          >
            Load Next 36 Redemptive Names ({filteredNames.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Universal Rich Sanctuary Modal for Redemptive Names */}
      {activeModalName && (
        <RedemptiveNameSanctuaryModal
          item={activeModalName}
          onClose={() => setActiveModalName(null)}
          onOpenScripture={(ref) => {
            handleNavigateScripture(ref);
            setActiveModalName(null);
          }}
          onCreateDevotion={(dev) => {
            if (onOpenDevotion) onOpenDevotion(dev);
            setActiveModalName(null);
          }}
          onOpenPictureStudio={onOpenPictureStudio}
          onDownloadDirectImage={onDownloadDirectImage}
          onToggleSpeak={onToggleSpeak}
          isSpeaking={isSpeaking}
          onPreviousName={handlePrevModal}
          onNextName={handleNextModal}
          hasPrevious={filteredNames.findIndex((n) => n.id === activeModalName.id) > 0}
          hasNext={filteredNames.findIndex((n) => n.id === activeModalName.id) < filteredNames.length - 1}
          currentIndex={filteredNames.findIndex((n) => n.id === activeModalName.id)}
          totalCount={filteredNames.length}
        />
      )}
    </div>
  );
};
