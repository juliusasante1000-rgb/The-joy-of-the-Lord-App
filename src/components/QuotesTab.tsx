import React, { useState, useMemo } from "react";
import {
  Quote,
  Search,
  Volume2,
  Share2,
  Bookmark,
  Copy,
  Check,
  Sparkles,
  Shuffle,
  Tag,
  BookOpen,
  Filter,
  Flame,
  Lightbulb,
  Award,
  Crown,
  Image as ImageIcon
} from "lucide-react";
import { PERSONAL_QUOTES, PersonalQuote, AUTHOR_FAVOURITE_SCRIPTURES, AuthorFavouriteScripture, getRandomQuote } from "../data/quotesData";
import { GODS_GENERALS_QUOTES, FAMOUS_AUTHORS_LIST, FAMOUS_CATEGORIES_LIST, FamousChristianQuote } from "../data/godsGeneralsQuotesData";
import { AppLogo } from "./AppLogo";
import { QuotePictureItem } from "./QuotePictureModal";

interface QuotesTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak: (text: string) => void;
  onOpenQuotePictureModal?: (item: QuotePictureItem) => void;
}

export const QuotesTab: React.FC<QuotesTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  onToggleSpeak,
  onOpenQuotePictureModal
}) => {
  const [activeTab, setActiveTab] = useState<"author" | "generals">("author");
  const [authorSubTab, setAuthorSubTab] = useState<"all" | "scriptures" | "quotes">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTestament, setSelectedTestament] = useState<"All" | "Old Testament" | "New Testament" | "New">("All");
  const [visibleScripturesCount, setVisibleScripturesCount] = useState<number>(36);
  const [selectedGeneralAuthor, setSelectedGeneralAuthor] = useState<string>("All Authors");
  const [selectedGeneralTheme, setSelectedGeneralTheme] = useState<string>("All Themes");
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [featuredQuote, setFeaturedQuote] = useState<PersonalQuote>(PERSONAL_QUOTES[0]);
  const [featuredGeneralQuote, setFeaturedGeneralQuote] = useState<FamousChristianQuote>(GODS_GENERALS_QUOTES[0]);

  const otFavCount = useMemo(() => AUTHOR_FAVOURITE_SCRIPTURES.filter(s => s.testament === "Old Testament").length, []);
  const ntFavCount = useMemo(() => AUTHOR_FAVOURITE_SCRIPTURES.filter(s => s.testament === "New Testament").length, []);
  const newFavCount = useMemo(() => AUTHOR_FAVOURITE_SCRIPTURES.filter(s => s.isNew).length, []);

  const categories = [
    "All",
    "Destiny & Decisions",
    "Purpose & Calling",
    "Wisdom & Relationships",
    "Grit & Endurance",
    "Divine Favor & Joy",
    "Mindset & Growth"
  ];

  const filteredQuotes = useMemo(() => {
    return PERSONAL_QUOTES.filter((q) => {
      const matchCat = selectedCategory === "All" || q.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        q.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.keyPrinciple.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.biblicalAnchor && q.biblicalAnchor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const filteredFavouriteScriptures = useMemo(() => {
    return AUTHOR_FAVOURITE_SCRIPTURES.filter((s) => {
      const matchCat = selectedCategory === "All" || s.category === selectedCategory;
      const matchTestament =
        selectedTestament === "All" ||
        (selectedTestament === "Old Testament" && s.testament === "Old Testament") ||
        (selectedTestament === "New Testament" && s.testament === "New Testament") ||
        (selectedTestament === "New" && s.isNew);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.text.toLowerCase().includes(q) ||
        s.reference.toLowerCase().includes(q) ||
        s.book.toLowerCase().includes(q) ||
        s.theme.toLowerCase().includes(q) ||
        s.authorReflection.toLowerCase().includes(q) ||
        s.keyDeclaration.toLowerCase().includes(q) ||
        `#${s.num}` === q ||
        `${s.num}` === q ||
        s.tags.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchTestament && matchSearch;
    });
  }, [selectedCategory, selectedTestament, searchQuery]);

  const filteredGeneralsQuotes = useMemo(() => {
    return GODS_GENERALS_QUOTES.filter((q) => {
      const matchAuthor = selectedGeneralAuthor === "All Authors" || q.author === selectedGeneralAuthor;
      const matchTheme = selectedGeneralTheme === "All Themes" || q.category === selectedGeneralTheme;
      const matchSearch =
        !searchQuery ||
        q.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.biblicalAnchor && q.biblicalAnchor.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchAuthor && matchTheme && matchSearch;
    });
  }, [selectedGeneralAuthor, selectedGeneralTheme, searchQuery]);

  const handleCopyQuote = async (q: PersonalQuote) => {
    const full = `"${q.quote}"\n\n— Key Principle: ${q.keyPrinciple}${q.biblicalAnchor ? `\n— Scriptural Anchor: ${q.biblicalAnchor}` : ""}\nFrom "The Joy of the Lord"`;
    try {
      await navigator.clipboard.writeText(full);
      setCopiedQuoteId(q.id);
      setTimeout(() => setCopiedQuoteId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyScripture = async (s: AuthorFavouriteScripture) => {
    const full = `"${s.text}"\n\n— ${s.reference} (KJV)\nTheme: ${s.theme}\nDeclaration: "${s.keyDeclaration}"\nReflection: ${s.authorReflection}\nFrom "The Joy of the Lord" by Bismark Twum`;
    try {
      await navigator.clipboard.writeText(full);
      setCopiedQuoteId(s.id);
      setTimeout(() => setCopiedQuoteId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyGeneralQuote = async (q: FamousChristianQuote) => {
    const full = `"${q.quote}"\n\n— ${q.author} (${q.title})\nTheme: ${q.category}\nAnchor: ${q.biblicalAnchor}\nFrom "The Joy of the Lord" (God's Generals Wisdom)`;
    try {
      await navigator.clipboard.writeText(full);
      setCopiedQuoteId(q.id);
      setTimeout(() => setCopiedQuoteId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleShuffleFeatured = () => {
    if (activeTab === "author") {
      setFeaturedQuote(getRandomQuote());
    } else {
      const randIdx = Math.floor(Math.random() * GODS_GENERALS_QUOTES.length);
      setFeaturedGeneralQuote(GODS_GENERALS_QUOTES[randIdx]);
    }
  };

  const handleOpenAuthorQuotePicture = (q: PersonalQuote) => {
    if (onOpenQuotePictureModal) {
      onOpenQuotePictureModal({
        quote: q.quote,
        author: "Bismark Twum",
        title: q.keyPrinciple,
        reference: q.biblicalAnchor,
        principle: q.keyPrinciple,
        reflection: q.reflectionNote,
        category: q.category
      });
    }
  };

  const handleOpenScripturePicture = (s: AuthorFavouriteScripture) => {
    if (onOpenQuotePictureModal) {
      onOpenQuotePictureModal({
        quote: s.text,
        author: "Holy Scripture (KJV)",
        title: s.theme,
        reference: s.reference,
        principle: s.keyDeclaration,
        reflection: s.authorReflection,
        category: s.category
      });
    }
  };

  const handleOpenGeneralQuotePicture = (g: FamousChristianQuote) => {
    if (onOpenQuotePictureModal) {
      onOpenQuotePictureModal({
        quote: g.quote,
        author: g.author,
        title: g.title,
        reference: g.biblicalAnchor,
        category: g.category,
        reflection: `From "${g.title}" on the theme of ${g.category}.`
      });
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Top Banner & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#16235A] via-[#24357D] to-[#4A1D96] text-white shadow-md border border-[#24357D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              Quotes, Scriptures & Generals Archive
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
            Timeless Christian wisdom from author Bismark Twum and over 1,000 famous quotes by God's Generals & Church Fathers
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/10 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("author")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "author"
                ? "bg-[#B48C35] text-white shadow-md"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Author Wisdom ({PERSONAL_QUOTES.length + AUTHOR_FAVOURITE_SCRIPTURES.length})
          </button>
          <button
            onClick={() => setActiveTab("generals")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "generals"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>God's Generals (1,000+)</span>
          </button>
        </div>
      </div>

      {activeTab === "generals" ? (
        /* ======================================================== */
        /* GOD'S GENERALS & FAMOUS CHRISTIANS (1,000 QUOTES)        */
        /* ======================================================== */
        <div className="space-y-6">
          {/* Featured Generals Quote */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#2E1065] via-[#3B0764] to-[#1E1B4B] text-white border-2 border-purple-400/40 shadow-lg relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-purple-600 text-white">
                  <Crown className="w-4 h-4 text-amber-300" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Featured General's Wisdom
                </span>
              </div>

              <button
                onClick={handleShuffleFeatured}
                className="flex items-center gap-1 text-xs text-[#DCC398] hover:text-white font-bold uppercase tracking-wider transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                title="Randomize Quote"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              "{featuredGeneralQuote.quote}"
            </blockquote>

            <div className="space-y-2 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-base text-amber-300">
                  {featuredGeneralQuote.author} — <span className="text-sm font-normal text-purple-200">{featuredGeneralQuote.title}</span>
                </span>
                <span className="text-amber-200/90 font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  {featuredGeneralQuote.biblicalAnchor}
                </span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSpeak(`"${featuredGeneralQuote.quote}" by ${featuredGeneralQuote.author}. ${featuredGeneralQuote.title}. Scripture: ${featuredGeneralQuote.biblicalAnchor}`)}
                  className="py-1.5 px-3.5 rounded bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>

                {onOpenQuotePictureModal && (
                  <button
                    onClick={() => handleOpenGeneralQuotePicture(featuredGeneralQuote)}
                    className="py-1.5 px-3 rounded bg-purple-500/40 hover:bg-purple-500/70 border border-purple-300/40 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Generate Branded Picture"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
                    <span>Picture</span>
                  </button>
                )}

                <button
                  onClick={() => handleCopyGeneralQuote(featuredGeneralQuote)}
                  className="py-1.5 px-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedQuoteId === featuredGeneralQuote.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#DCC398]" />
                  )}
                  <span>{copiedQuoteId === featuredGeneralQuote.id ? "Copied" : "Copy"}</span>
                </button>

                <button
                  onClick={() =>
                    onShareItem(
                      `Quote by ${featuredGeneralQuote.author}`,
                      `"${featuredGeneralQuote.quote}"`,
                      featuredGeneralQuote.biblicalAnchor,
                      `— ${featuredGeneralQuote.author} (${featuredGeneralQuote.title})`
                    )
                  }
                  className="py-1.5 px-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#DCC398]" />
                  <span>Share</span>
                </button>
              </div>

              <button
                onClick={() =>
                  onToggleBookmark({
                    type: "quote",
                    title: `Quote by ${featuredGeneralQuote.author}`,
                    reference: featuredGeneralQuote.biblicalAnchor,
                    snippet: featuredGeneralQuote.quote,
                    targetId: featuredGeneralQuote.id
                  })
                }
                className={`p-2 rounded border transition-colors cursor-pointer ${
                  isBookmarked(featuredGeneralQuote.id, "quote")
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
                title="Bookmark Quote"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(featuredGeneralQuote.id, "quote") ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="p-6 rounded-2xl bg-white border border-purple-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#16235A] flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600" /> 1,000 Quotes of God's Generals & Famous Christians
                </h3>
                <p className="text-xs text-slate-500">
                  Search across 1,000 quotes from Smith Wigglesworth, Kathryn Kuhlman, Spurgeon, Tozer, George Müller, and other revivalists
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 w-fit">
                {filteredGeneralsQuotes.length} / {GODS_GENERALS_QUOTES.length} Quotes
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search quotes by text, general's name, or theme (e.g. 'faith', 'prayer', 'Spurgeon', 'Wigglesworth')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-purple-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-700 font-bold uppercase cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Filter by Author / General
                </label>
                <select
                  value={selectedGeneralAuthor}
                  onChange={(e) => setSelectedGeneralAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-purple-200 text-xs font-semibold text-slate-800 focus:outline-hidden"
                >
                  {FAMOUS_AUTHORS_LIST.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Filter by Revival Theme
                </label>
                <select
                  value={selectedGeneralTheme}
                  onChange={(e) => setSelectedGeneralTheme(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-purple-200 text-xs font-semibold text-slate-800 focus:outline-hidden"
                >
                  {FAMOUS_CATEGORIES_LIST.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Generals Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGeneralsQuotes.map((q) => {
              const isSaved = isBookmarked(q.id, "quote");
              const isCopied = copiedQuoteId === q.id;

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-all shadow-xs space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-purple-50 pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                        {q.category}
                      </span>
                      <span className="text-xs font-bold font-mono text-[#B48C35] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        {q.biblicalAnchor}
                      </span>
                    </div>

                    <blockquote className="text-base sm:text-lg font-serif italic text-[#16235A] leading-relaxed">
                      "{q.quote}"
                    </blockquote>

                    <div>
                      <h4 className="text-sm font-bold text-[#16235A]">
                        {q.author}
                      </h4>
                      <p className="text-xs text-purple-700 font-medium">
                        {q.title}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Toolbar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() =>
                        onToggleSpeak(
                          `"${q.quote}" by ${q.author}, ${q.title}. Scriptural Anchor: ${q.biblicalAnchor}`
                        )
                      }
                      className="p-2 rounded-lg text-slate-500 hover:text-[#16235A] hover:bg-purple-50 transition-colors flex items-center gap-1 font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                      title="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Audio</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {onOpenQuotePictureModal && (
                        <button
                          onClick={() => handleOpenGeneralQuotePicture(q)}
                          className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Generate Picture"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                          <span className="hidden sm:inline">Picture</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleCopyGeneralQuote(q)}
                        className="p-2 rounded-lg text-slate-500 hover:text-[#16235A] hover:bg-purple-50 transition-colors cursor-pointer"
                        title="Copy Quote"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() =>
                          onShareItem(
                            `Quote by ${q.author}`,
                            `"${q.quote}"`,
                            q.biblicalAnchor,
                            `— ${q.author} (${q.title})`
                          )
                        }
                        className="p-2 rounded-lg text-slate-500 hover:text-[#16235A] hover:bg-purple-50 transition-colors cursor-pointer"
                        title="Share Card"
                      >
                        <Share2 className="w-3.5 h-3.5 text-purple-600" />
                      </button>

                      <button
                        onClick={() =>
                          onToggleBookmark({
                            type: "quote",
                            title: `Quote by ${q.author}`,
                            reference: q.biblicalAnchor,
                            snippet: q.quote,
                            targetId: q.id
                          })
                        }
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          isSaved
                            ? "text-purple-600 bg-purple-100"
                            : "text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                        title="Bookmark Quote"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* AUTHOR'S PERSONAL QUOTES (Bismark Twum)                  */
        /* ======================================================== */
        <div className="space-y-6">
          {/* Featured Author Quote */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#0F172A] text-white border-2 border-[#B48C35] shadow-lg relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-[#B48C35] text-white">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#DCC398]">
                  Featured Wisdom & Author Quote
                </span>
              </div>

              <button
                onClick={handleShuffleFeatured}
                className="flex items-center gap-1 text-xs text-[#DCC398] hover:text-white font-bold uppercase tracking-wider transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                title="Randomize Quote"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              "{featuredQuote.quote}"
            </blockquote>

            <div className="space-y-2 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#B48C35]">
                  {featuredQuote.keyPrinciple}
                </span>
                {featuredQuote.biblicalAnchor && (
                  <span className="text-slate-300 font-mono text-[11px] italic">
                    {featuredQuote.biblicalAnchor}
                  </span>
                )}
              </div>

              {featuredQuote.reflectionNote && (
                <p className="text-xs sm:text-sm text-slate-300 bg-white/5 p-3.5 rounded-lg border border-white/10 leading-relaxed font-serif">
                  {featuredQuote.reflectionNote}
                </p>
              )}
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSpeak(`${featuredQuote.quote}. Principle: ${featuredQuote.keyPrinciple}. ${featuredQuote.reflectionNote || ""}`)}
                  className="py-1.5 px-3.5 rounded bg-[#B48C35] hover:bg-[#996515] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>

                {onOpenQuotePictureModal && (
                  <button
                    onClick={() => handleOpenAuthorQuotePicture(featuredQuote)}
                    className="py-1.5 px-3 rounded bg-amber-500/30 hover:bg-amber-500/50 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Generate Branded Picture"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
                    <span>Picture</span>
                  </button>
                )}

                <button
                  onClick={() => handleCopyQuote(featuredQuote)}
                  className="py-1.5 px-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedQuoteId === featuredQuote.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#DCC398]" />
                  )}
                  <span>{copiedQuoteId === featuredQuote.id ? "Copied" : "Copy"}</span>
                </button>

                <button
                  onClick={() =>
                    onShareItem(
                      featuredQuote.keyPrinciple,
                      featuredQuote.quote,
                      featuredQuote.biblicalAnchor,
                      featuredQuote.reflectionNote
                    )
                  }
                  className="py-1.5 px-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#DCC398]" />
                  <span>Share</span>
                </button>
              </div>

              <button
                onClick={() =>
                  onToggleBookmark({
                    type: "scripture",
                    title: featuredQuote.keyPrinciple,
                    reference: featuredQuote.biblicalAnchor || "Author Wisdom",
                    snippet: featuredQuote.quote,
                    targetId: featuredQuote.id
                  })
                }
                className={`p-2 rounded border transition-colors cursor-pointer ${
                  isBookmarked(featuredQuote.id, "scripture")
                    ? "bg-[#B48C35] text-white border-[#B48C35]"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
                title="Bookmark Quote"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(featuredQuote.id, "scripture") ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="p-6 rounded-lg bg-white border border-[#E5D5BC] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#B48C35]" /> Daily Wisdom, Personal Quotes & Favourite Scriptures
                </h3>
                <p className="text-xs text-[#64748B]">
                  Explore all {PERSONAL_QUOTES.length} life principles and {AUTHOR_FAVOURITE_SCRIPTURES.length} anchor scriptures on decisions, destiny, grit, purpose & divine favor
                </p>
              </div>

              {/* Sub-tab view selector */}
              <div className="flex items-center gap-1 bg-[#FDFBF7] p-1 rounded-lg border border-[#E5D5BC] self-start sm:self-auto">
                <button
                  onClick={() => setAuthorSubTab("all")}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    authorSubTab === "all"
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All ({PERSONAL_QUOTES.length + AUTHOR_FAVOURITE_SCRIPTURES.length})
                </button>
                <button
                  onClick={() => setAuthorSubTab("scriptures")}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    authorSubTab === "scriptures"
                      ? "bg-[#B48C35] text-white shadow-xs"
                      : "text-[#B48C35] hover:bg-[#F1E6D2]"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Favourite Scriptures ({AUTHOR_FAVOURITE_SCRIPTURES.length})</span>
                </button>
                <button
                  onClick={() => setAuthorSubTab("quotes")}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    authorSubTab === "quotes"
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Quotes ({PERSONAL_QUOTES.length})
                </button>
              </div>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#B48C35] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search quotes & favourite scriptures (e.g. 'Nehemiah 8:10', 'Romans 8:28', 'desperation', 'time', 'grit')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] placeholder:text-slate-400 focus:outline-hidden focus:border-[#B48C35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#B48C35] hover:text-[#0F172A] font-bold uppercase cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category & Testament Pills */}
            <div className="space-y-2 pt-1 border-t border-[#E5D5BC]/60">
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="font-bold text-[#0F172A] flex items-center gap-1 text-[11px] uppercase tracking-wider">
                  <Tag className="w-3 h-3 text-[#B48C35]" /> Filter by Category:
                </span>
                <span className="text-[11px] text-slate-500">
                  {selectedCategory !== "All" && <span className="font-semibold text-[#B48C35]">{selectedCategory} · </span>}
                  {filteredFavouriteScriptures.length} Scripture{filteredFavouriteScriptures.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#0F172A] text-white shadow-xs"
                        : "bg-[#FDFBF7] border border-[#E5D5BC] text-[#1A2A44] hover:bg-[#F1E6D2]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Testament Filter Bar */}
              {(authorSubTab === "all" || authorSubTab === "scriptures") && (
                <div className="flex items-center gap-1.5 pt-2 overflow-x-auto scrollbar-none">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pr-1">Testament:</span>
                  {[
                    { key: "All", label: "All Scriptures", count: AUTHOR_FAVOURITE_SCRIPTURES.length },
                    { key: "Old Testament", label: "Old Testament", count: otFavCount },
                    { key: "New Testament", label: "New Testament", count: ntFavCount },
                    { key: "New", label: "New Added", count: newFavCount }
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => {
                        setSelectedTestament(t.key as any);
                        setVisibleScripturesCount(36);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                        selectedTestament === t.key
                          ? "bg-[#B48C35] text-white shadow-xs"
                          : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{t.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedTestament === t.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {t.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FAVOURITE SCRIPTURES SECTION */}
          {(authorSubTab === "all" || authorSubTab === "scriptures") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-mono flex-wrap gap-2">
                <span className="font-bold text-[#0F172A] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#B48C35]" /> Author's Loaded Favourite Scriptures ({filteredFavouriteScriptures.length})
                </span>
                <span className="text-[11px]">
                  Showing {Math.min(visibleScripturesCount, filteredFavouriteScriptures.length)} of {filteredFavouriteScriptures.length}
                </span>
              </div>

              {filteredFavouriteScriptures.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-white border border-[#E5D5BC] space-y-3">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No scriptures match your filter criteria.</p>
                  <p className="text-xs text-slate-500">Try changing the category or clearing the search query.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedTestament("All");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredFavouriteScriptures.slice(0, visibleScripturesCount).map((s) => {
                      const isSaved = isBookmarked(s.id, "scripture");
                      const isCopied = copiedQuoteId === s.id;

                      return (
                        <div
                          key={s.id}
                          className="p-6 rounded-xl bg-gradient-to-br from-white to-[#FDFBF7] border-2 border-[#DCC398] hover:border-[#B48C35] transition-all shadow-xs space-y-4 flex flex-col justify-between group"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-[#E5D5BC]/60 pb-2 flex-wrap">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-[#0F172A] text-amber-300">
                                  #{s.num}
                                </span>
                                {s.isNew && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                                    New
                                  </span>
                                )}
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  {s.testament === "Old Testament" ? "OT" : "NT"}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1">
                                  <Tag className="w-3 h-3" /> {s.category}
                                </span>
                              </div>

                              <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#16235A] text-amber-300">
                                {s.reference}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-[#0F172A] font-serif">
                                {s.theme}
                              </h4>
                            </div>

                            <blockquote className="text-base sm:text-lg font-serif italic text-[#1A2A44] leading-relaxed border-l-4 border-[#B48C35] pl-3 py-0.5 bg-[#F1E6D2]/30 rounded-r">
                              "{s.text}"
                            </blockquote>

                            <div className="p-3 rounded-lg bg-[#FAF5E8] border border-[#E5D5BC] text-xs text-[#0F172A] space-y-1.5">
                              <p className="font-bold text-[#B48C35] text-[11px] uppercase tracking-wider flex items-center gap-1">
                                <Flame className="w-3.5 h-3.5" /> Faith Declaration:
                              </p>
                              <p className="italic font-medium text-slate-800">
                                "{s.keyDeclaration}"
                              </p>
                            </div>

                            <div className="text-xs text-[#475569] leading-relaxed bg-white p-3 rounded border border-slate-200">
                              <p className="font-bold text-[#16235A] mb-1">Author's Reflection:</p>
                              <p>{s.authorReflection}</p>
                            </div>

                            <div className="flex flex-wrap gap-1 pt-1">
                              {s.tags.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-[#FDFBF7] text-[#64748B] text-[10px] border border-[#E5D5BC]"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Action Toolbar */}
                          <div className="pt-3 border-t border-[#E5D5BC] flex items-center justify-between gap-2 text-xs">
                            <button
                              onClick={() => onToggleSpeak(`${s.reference}. ${s.text}. Theme: ${s.theme}. Declaration: ${s.keyDeclaration}. Reflection: ${s.authorReflection}`)}
                              className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors flex items-center gap-1 font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                              title="Audio"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-[#B48C35]" />
                              <span>Audio</span>
                            </button>

                            <div className="flex items-center gap-1.5">
                              {onOpenQuotePictureModal && (
                                <button
                                  onClick={() => handleOpenScripturePicture(s)}
                                  className="px-2 py-1 rounded bg-[#FAF5E8] hover:bg-[#F1E6D2] border border-[#DCC398] text-[#B48C35] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                  title="Generate Scripture Picture"
                                >
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Picture</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleCopyScripture(s)}
                                className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                                title="Copy Scripture"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>

                              <button
                                onClick={() =>
                                  onShareItem(
                                    `${s.reference} — ${s.theme}`,
                                    s.text,
                                    `Declaration: "${s.keyDeclaration}"`,
                                    s.authorReflection
                                  )
                                }
                                className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                                title="Share Card"
                              >
                                <Share2 className="w-3.5 h-3.5 text-[#B48C35]" />
                              </button>

                              <button
                                onClick={() =>
                                  onToggleBookmark({
                                    type: "scripture",
                                    title: `${s.reference} (${s.theme})`,
                                    reference: s.reference,
                                    snippet: s.text,
                                    targetId: s.id
                                  })
                                }
                                className={`p-2 rounded transition-colors cursor-pointer ${
                                  isSaved
                                    ? "text-[#B48C35] bg-[#F1E6D2]"
                                    : "text-slate-400 hover:text-[#B48C35] hover:bg-[#FDFBF7]"
                                }`}
                                title="Bookmark Scripture"
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Load More & Show All Buttons */}
                  {visibleScripturesCount < filteredFavouriteScriptures.length && (
                    <div className="pt-4 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setVisibleScripturesCount((prev) => prev + 36)}
                        className="px-6 py-2.5 rounded-lg bg-[#B48C35] hover:bg-[#96742A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        Load More ({filteredFavouriteScriptures.length - visibleScripturesCount} remaining)
                      </button>
                      <button
                        onClick={() => setVisibleScripturesCount(filteredFavouriteScriptures.length)}
                        className="px-4 py-2.5 rounded-lg bg-white border border-[#DCC398] hover:bg-[#FAF5E8] text-[#16235A] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Show All ({filteredFavouriteScriptures.length})
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}


          {/* Quotes Cards Grid */}
          {(authorSubTab === "all" || authorSubTab === "quotes") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-mono">
                <span className="font-bold text-[#0F172A] flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#B48C35]" /> Faith & Life Principles ({filteredQuotes.length})
                </span>
                <span>Category: {selectedCategory}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuotes.map((q) => {
                  const isSaved = isBookmarked(q.id, "scripture");
                  const isCopied = copiedQuoteId === q.id;

                  return (
                    <div
                      key={q.id}
                      className="p-6 rounded-lg bg-white border border-[#E5D5BC] hover:border-[#B48C35] transition-all shadow-xs space-y-4 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-[#E5D5BC]/60 pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {q.category}
                          </span>

                          <span className="text-xs font-bold font-serif text-[#0F172A]">
                            {q.keyPrinciple}
                          </span>
                        </div>

                        <blockquote className="text-base sm:text-lg font-serif italic text-[#1A2A44] leading-relaxed">
                          "{q.quote}"
                        </blockquote>

                        {q.biblicalAnchor && (
                          <div className="p-2.5 rounded bg-[#F1E6D2] border border-[#DCC398] text-xs font-mono text-[#0F172A] flex items-start gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#B48C35] shrink-0 mt-0.5" />
                            <span>{q.biblicalAnchor}</span>
                          </div>
                        )}

                        {q.reflectionNote && (
                          <p className="text-xs text-[#475569] leading-relaxed italic">
                            {q.reflectionNote}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1 pt-1">
                          {q.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#FDFBF7] text-[#64748B] text-[10px] border border-[#E5D5BC]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Card Action Toolbar */}
                      <div className="pt-3 border-t border-[#E5D5BC] flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => onToggleSpeak(`${q.quote}. Principle: ${q.keyPrinciple}. ${q.reflectionNote || ""}`)}
                          className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors flex items-center gap-1 font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                          title="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#B48C35]" />
                          <span>Audio</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {onOpenQuotePictureModal && (
                            <button
                              onClick={() => handleOpenAuthorQuotePicture(q)}
                              className="px-2 py-1 rounded bg-[#FAF5E8] hover:bg-[#F1E6D2] border border-[#DCC398] text-[#B48C35] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Generate Quote Picture"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Picture</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleCopyQuote(q)}
                            className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                            title="Copy Quote"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() =>
                              onShareItem(
                                q.keyPrinciple,
                                q.quote,
                                q.biblicalAnchor,
                                q.reflectionNote
                              )
                            }
                            className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                            title="Share Card"
                          >
                            <Share2 className="w-3.5 h-3.5 text-[#B48C35]" />
                          </button>

                          <button
                            onClick={() =>
                              onToggleBookmark({
                                type: "scripture",
                                title: q.keyPrinciple,
                                reference: q.biblicalAnchor || "Wisdom Quote",
                                snippet: q.quote,
                                targetId: q.id
                              })
                            }
                            className={`p-2 rounded transition-colors cursor-pointer ${
                              isSaved
                                ? "text-[#B48C35] bg-[#F1E6D2]"
                                : "text-slate-400 hover:text-[#B48C35] hover:bg-[#FDFBF7]"
                            }`}
                            title="Bookmark Quote"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
