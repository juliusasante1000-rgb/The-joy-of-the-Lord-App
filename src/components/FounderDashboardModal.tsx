import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Sun,
  Calculator,
  Calendar,
  Save,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  Layers,
  Upload,
  Globe,
  Compass,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Star
} from "lucide-react";
import { FounderSession, CreatorProfile, Devotion, Book, SpiritualPlace, PlaceScripture } from "../types";
import { ScheduledVerse, ANNUAL_DAILY_VERSES } from "../data/dailyVerseData";
import {
  getAllSpiritualPlaces,
  saveSpiritualPlaces,
  saveCustomPlaceScripture
} from "../data/spiritualPlacesData";
import { safeFetchJson } from "../utils/aiClient";

interface FounderDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  founderSession: FounderSession | null;
  currentProfile: CreatorProfile;
  onSaveProfile: (profile: CreatorProfile) => void;
  onLogout: () => void;
  onNavigateTab?: (tab: string) => void;
}

type DashboardSubTab = "verses" | "devotions" | "prayers" | "spiritual_places" | "books" | "apostlemath" | "profile";

export const FounderDashboardModal: React.FC<FounderDashboardModalProps> = ({
  isOpen,
  onClose,
  founderSession,
  currentProfile,
  onSaveProfile,
  onLogout,
  onNavigateTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<DashboardSubTab>("verses");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Daily Verse Management state
  const [dailyVersesList, setDailyVersesList] = useState<ScheduledVerse[]>(ANNUAL_DAILY_VERSES);
  const [overrideDate, setOverrideDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [newVerseRef, setNewVerseRef] = useState("");
  const [newVerseText, setNewVerseText] = useState("");
  const [newVerseTheme, setNewVerseTheme] = useState("");
  const [newVerseReflection, setNewVerseReflection] = useState("");

  // Devotion Management state
  const [newDevEdition, setNewDevEdition] = useState<"morning" | "afternoon" | "evening">("morning");
  const [newDevTitle, setNewDevTitle] = useState("");
  const [newDevScripture, setNewDevScripture] = useState("");
  const [newDevReflection, setNewDevReflection] = useState("");
  const [newDevPrayer, setNewDevPrayer] = useState("");

  // Prayer Management state
  const [newPrayerTitle, setNewPrayerTitle] = useState("");
  const [newPrayerCategory, setNewPrayerCategory] = useState("Spiritual Warfare & Breakthrough");
  const [newPrayerScripture, setNewPrayerScripture] = useState("");
  const [newPrayerBody, setNewPrayerBody] = useState("");

  // Book Management state
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookCategory, setNewBookCategory] = useState("Theology & Christian Living");
  const [newBookSubtitle, setNewBookSubtitle] = useState("");
  const [newBookSynopsis, setNewBookSynopsis] = useState("");

  // Spiritual Places Management state
  const [placesList, setPlacesList] = useState<SpiritualPlace[]>(() => getAllSpiritualPlaces());
  const [editingPlace, setEditingPlace] = useState<SpiritualPlace | null>(null);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceSubtitle, setNewPlaceSubtitle] = useState("");
  const [newPlaceIcon, setNewPlaceIcon] = useState("🌿");
  const [newPlaceMeaning, setNewPlaceMeaning] = useState("");
  const [newPlaceDescription, setNewPlaceDescription] = useState("");
  const [newPlaceBiblicalRef, setNewPlaceBiblicalRef] = useState("");
  const [newPlaceThemes, setNewPlaceThemes] = useState("");
  const [newPlaceCountDisplay, setNewPlaceCountDisplay] = useState("500+ Scriptures");
  const [isPlacePublished, setIsPlacePublished] = useState(true);
  const [isPlaceFeatured, setIsPlaceFeatured] = useState(false);

  // Add Scripture to Place state
  const [targetPlaceId, setTargetPlaceId] = useState<string>("brook-cherith");
  const [customScRef, setCustomScRef] = useState("");
  const [customScText, setCustomScText] = useState("");
  const [customScTheme, setCustomScTheme] = useState("");
  const [customScReflection, setCustomScReflection] = useState("");
  const [customScScore, setCustomScScore] = useState(95);

  if (!isOpen) return null;

  const handleSaveVerseOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVerseRef || !newVerseText) return;

    setIsSaving(true);
    const updatedVerse: ScheduledVerse = {
      dateKey: overrideDate,
      reference: newVerseRef,
      book: newVerseRef.split(" ")[0] || "Scripture",
      chapter: parseInt(newVerseRef.split(" ")[1]?.split(":")[0] || "1", 10),
      verse: parseInt(newVerseRef.split(" ")[1]?.split(":")[1] || "1", 10),
      text: newVerseText,
      version: "KJV",
      theme: newVerseTheme || "Divine Encouragement",
      reflection: newVerseReflection || "Meditate on this Scripture throughout your day.",
      guidedPrayer: `Lord, let Your Word in ${newVerseRef} bring life and direction to my steps. Amen.`
    };

    setDailyVersesList((prev) => {
      const filtered = prev.filter((v) => v.dateKey !== overrideDate);
      return [updatedVerse, ...filtered];
    });

    // Post update to global server
    try {
      await safeFetchJson("/api/creator-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founderEmail: founderSession?.founderEmail,
          contentType: "daily-verse-override",
          data: updatedVerse
        })
      });
    } catch (e) {
      console.warn("Global server sync notice:", e);
    }

    setIsSaving(false);
    setSaveStatus(`✓ Successfully updated & published Daily Verse for ${overrideDate}!`);
    setTimeout(() => setSaveStatus(null), 3000);

    // Reset inputs
    setNewVerseRef("");
    setNewVerseText("");
    setNewVerseTheme("");
    setNewVerseReflection("");
  };

  const handlePublishCustomDevotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevTitle || !newDevScripture) return;

    setIsSaving(true);
    const newDev = {
      id: `dev-${Date.now()}`,
      title: newDevTitle,
      edition: newDevEdition,
      keyScripture: newDevScripture,
      reflection: newDevReflection,
      guidedPrayer: newDevPrayer,
      readTimeMinutes: 5,
      date: overrideDate
    };

    try {
      await safeFetchJson("/api/creator-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founderEmail: founderSession?.founderEmail,
          contentType: "devotion",
          data: newDev
        })
      });
    } catch (e) {
      console.warn("Global server sync notice:", e);
    }

    setIsSaving(false);
    setSaveStatus(`✓ Devotion "${newDevTitle}" published globally!`);
    setTimeout(() => setSaveStatus(null), 3000);

    setNewDevTitle("");
    setNewDevScripture("");
    setNewDevReflection("");
    setNewDevPrayer("");
  };

  const handlePublishCustomPrayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerTitle || !newPrayerBody) return;

    setIsSaving(true);
    const newPr = {
      id: `prayer-${Date.now()}`,
      title: newPrayerTitle,
      category: newPrayerCategory,
      keyScripture: newPrayerScripture,
      prayerText: newPrayerBody,
      author: "Bismark Twum"
    };

    try {
      await safeFetchJson("/api/creator-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founderEmail: founderSession?.founderEmail,
          contentType: "prayer",
          data: newPr
        })
      });
    } catch (e) {
      console.warn("Global server sync notice:", e);
    }

    setIsSaving(false);
    setSaveStatus(`✓ Guided Prayer "${newPrayerTitle}" published globally!`);
    setTimeout(() => setSaveStatus(null), 3000);

    setNewPrayerTitle("");
    setNewPrayerScripture("");
    setNewPrayerBody("");
  };

  // --- Spiritual Places Handlers ---
  const handleStartEditPlace = (place: SpiritualPlace) => {
    setEditingPlace(place);
    setNewPlaceName(place.name);
    setNewPlaceSubtitle(place.subtitle);
    setNewPlaceIcon(place.icon);
    setNewPlaceMeaning(place.spiritualMeaning);
    setNewPlaceDescription(place.description);
    setNewPlaceBiblicalRef(place.biblicalReference);
    setNewPlaceThemes(place.themes.join(", "));
    setNewPlaceCountDisplay(place.scriptureCountDisplay);
    setIsPlacePublished(place.isPublished);
    setIsPlaceFeatured(!!place.isFeatured);
  };

  const handleCancelEditPlace = () => {
    setEditingPlace(null);
    setNewPlaceName("");
    setNewPlaceSubtitle("");
    setNewPlaceIcon("🌿");
    setNewPlaceMeaning("");
    setNewPlaceDescription("");
    setNewPlaceBiblicalRef("");
    setNewPlaceThemes("");
    setNewPlaceCountDisplay("500+ Scriptures");
    setIsPlacePublished(true);
    setIsPlaceFeatured(false);
  };

  const handleSaveOrUpdatePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceName || !newPlaceMeaning) return;

    const parsedThemes = newPlaceThemes
      ? newPlaceThemes.split(",").map((t) => t.trim()).filter(Boolean)
      : ["Faith", "Prayer", "Transformation"];

    if (editingPlace) {
      // Update existing place
      const updated: SpiritualPlace = {
        ...editingPlace,
        name: newPlaceName,
        subtitle: newPlaceSubtitle || editingPlace.subtitle,
        icon: newPlaceIcon || editingPlace.icon,
        spiritualMeaning: newPlaceMeaning,
        description: newPlaceDescription || editingPlace.description,
        biblicalReference: newPlaceBiblicalRef || editingPlace.biblicalReference,
        themes: parsedThemes,
        scriptureCountDisplay: newPlaceCountDisplay || "500+ Scriptures",
        isPublished: isPlacePublished,
        isFeatured: isPlaceFeatured
      };

      const updatedList = placesList.map((p) => (p.id === updated.id ? updated : p));
      setPlacesList(updatedList);
      saveSpiritualPlaces(updatedList);
      handleCancelEditPlace();
      setSaveStatus(`✓ Updated Spiritual Place "${updated.name}" successfully!`);
    } else {
      // Create new place
      const placeId = newPlaceName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newPlace: SpiritualPlace = {
        id: placeId || `place-${Date.now()}`,
        name: newPlaceName,
        subtitle: newPlaceSubtitle || "Place of Encounter & Growth",
        icon: newPlaceIcon || "✨",
        spiritualMeaning: newPlaceMeaning,
        description: newPlaceDescription || "A devotional sanctuary for personal reflection.",
        biblicalReference: newPlaceBiblicalRef || "Scripture Anchor",
        themes: parsedThemes,
        scriptureCountDisplay: newPlaceCountDisplay || "500+ Scriptures",
        isPublished: isPlacePublished,
        isFeatured: isPlaceFeatured,
        displayOrder: placesList.length + 1,
        colorGradient: "from-indigo-950 via-slate-900 to-[#16235A]",
        badgeText: "Devotional Sanctuary"
      };

      const updatedList = [...placesList, newPlace];
      setPlacesList(updatedList);
      saveSpiritualPlaces(updatedList);
      handleCancelEditPlace();
      setSaveStatus(`✓ Created & Published new Spiritual Place "${newPlace.name}"!`);
    }
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleTogglePublishPlace = (id: string) => {
    const updated = placesList.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p));
    setPlacesList(updated);
    saveSpiritualPlaces(updated);
  };

  const handleToggleFeaturePlace = (id: string) => {
    const updated = placesList.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    setPlacesList(updated);
    saveSpiritualPlaces(updated);
  };

  const handleMovePlaceOrder = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === placesList.length - 1)) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const nextList = [...placesList];
    const temp = nextList[index];
    nextList[index] = nextList[targetIdx];
    nextList[targetIdx] = temp;
    nextList.forEach((p, idx) => (p.displayOrder = idx + 1));
    setPlacesList(nextList);
    saveSpiritualPlaces(nextList);
  };

  const handleDeletePlace = (id: string) => {
    if (confirm("Are you sure you want to remove this Spiritual Place?")) {
      const updated = placesList.filter((p) => p.id !== id);
      setPlacesList(updated);
      saveSpiritualPlaces(updated);
      setSaveStatus("✓ Removed Spiritual Place from registry.");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleAddCustomScripture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customScRef || !customScText) return;

    const parts = customScRef.split(" ");
    const book = parts.slice(0, -1).join(" ") || parts[0];
    const chVer = parts[parts.length - 1]?.split(":") || ["1", "1"];

    const newSc: PlaceScripture = {
      id: `custom-sc-${Date.now()}`,
      placeIds: [targetPlaceId],
      book,
      chapter: parseInt(chVer[0], 10) || 1,
      verse: parseInt(chVer[1]?.split("–")[0] || "1", 10) || 1,
      reference: customScRef,
      text: customScText,
      testament: ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Thessalonians", "Timothy", "Titus", "Philemon", "Hebrews", "James", "Peter", "John", "Jude", "Revelation"].some(b => book.includes(b)) ? "New Testament" : "Old Testament",
      theme: customScTheme || "Divine Direction & Encouragement",
      keywords: [targetPlaceId, ...customScTheme.toLowerCase().split(" ")],
      relevanceScore: Number(customScScore) || 95,
      devotionalReflection: customScReflection || "Meditate on this Scripture in light of your spiritual journey.",
      guidedPrayerPrompt: `Lord, let Your Word in ${customScRef} guide and sustain my steps today.`
    };

    saveCustomPlaceScripture(newSc);
    setSaveStatus(`✓ Added Scripture "${customScRef}" to Spiritual Place!`);
    setTimeout(() => setSaveStatus(null), 3000);

    setCustomScRef("");
    setCustomScText("");
    setCustomScTheme("");
    setCustomScReflection("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border-2 border-[#16235A] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#16235A] via-[#24357D] to-[#9333EA] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-bold text-white">
                  Founder Publishing Suite
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-400/30">
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-200">
                Logged in as <strong>{founderSession?.founderEmail || "twumbismark90@gmail.com"}</strong> • Global Content Authority
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold border border-red-400/30 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Sync Status Banner */}
        {saveStatus && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Navigation Tabs inside Modal */}
        <div className="flex items-center gap-1 p-2 bg-[#FAF8FD] border-b border-[#E8E0F0] overflow-x-auto text-xs font-semibold">
          {[
            { id: "verses" as DashboardSubTab, label: "Daily Verses", icon: Calendar },
            { id: "devotions" as DashboardSubTab, label: "Devotions", icon: Sun },
            { id: "prayers" as DashboardSubTab, label: "Prayers", icon: HeartHandshake },
            { id: "spiritual_places" as DashboardSubTab, label: "Spiritual Places", icon: Compass },
            { id: "books" as DashboardSubTab, label: "Books & Library", icon: BookOpen },
            { id: "apostlemath" as DashboardSubTab, label: "ApostleMath", icon: Calculator },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#16235A] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 text-sm text-[#16235A]">
          {/* TAB 1: DAILY VERSES */}
          {activeSubTab === "verses" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-600" />
                  Global Daily Verse Scheduler
                </p>
                <p>
                  Schedule or override the Daily Bible Verse for any calendar date. At 12:00 AM midnight, all devices worldwide will automatically display the configured Scripture.
                </p>
              </div>

              {/* Add / Override Verse Form */}
              <form onSubmit={handleSaveVerseOverride} className="p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-2xs space-y-4">
                <h4 className="text-sm font-bold font-serif text-[#16235A]">
                  Schedule or Override Verse for a Date
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Calendar Date (YYYY-MM-DD)
                    </label>
                    <input
                      type="date"
                      value={overrideDate}
                      onChange={(e) => setOverrideDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Scripture Reference (e.g. John 3:16)
                    </label>
                    <input
                      type="text"
                      value={newVerseRef}
                      onChange={(e) => setNewVerseRef(e.target.value)}
                      required
                      placeholder="e.g. Romans 8:28"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Daily Theme
                  </label>
                  <input
                    type="text"
                    value={newVerseTheme}
                    onChange={(e) => setNewVerseTheme(e.target.value)}
                    placeholder="e.g. God's Sovereign Purpose"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Authorized Scripture Text (KJV)
                  </label>
                  <textarea
                    rows={3}
                    value={newVerseText}
                    onChange={(e) => setNewVerseText(e.target.value)}
                    required
                    placeholder="And we know that all things work together for good to them that love God..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Short Reflection / Encouragement
                  </label>
                  <textarea
                    rows={2}
                    value={newVerseReflection}
                    onChange={(e) => setNewVerseReflection(e.target.value)}
                    placeholder="God works every circumstance for your good..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-2.5 rounded-xl bg-[#16235A] hover:bg-[#24357D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish & Sync Daily Verse</span>
                </button>
              </form>

              {/* Schedule List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Configured Verse Schedule
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {dailyVersesList.slice(0, 10).map((v) => (
                    <div key={v.dateKey} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[10px] mr-2">
                          {v.dateKey}
                        </span>
                        <strong className="text-[#16235A]">{v.reference}</strong>
                        <p className="text-slate-600 line-clamp-1 italic text-[11px] mt-0.5">"{v.text}"</p>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">Synchronized</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEVOTIONS */}
          {activeSubTab === "devotions" && (
            <form onSubmit={handlePublishCustomDevotion} className="p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-2xs space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#16235A]">
                Publish New Global Devotion
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Edition</label>
                  <select
                    value={newDevEdition}
                    onChange={(e) => setNewDevEdition(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  >
                    <option value="morning">Morning Devotion (12 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon Devotion (12 PM - 5 PM)</option>
                    <option value="evening">Evening Prayer (5 PM - 12 AM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Devotion Title</label>
                  <input
                    type="text"
                    value={newDevTitle}
                    onChange={(e) => setNewDevTitle(e.target.value)}
                    required
                    placeholder="e.g. Unshakable Joy in the Midst of Trials"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Key Scripture</label>
                <input
                  type="text"
                  value={newDevScripture}
                  onChange={(e) => setNewDevScripture(e.target.value)}
                  required
                  placeholder="e.g. Nehemiah 8:10"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Devotional Reflection</label>
                <textarea
                  rows={4}
                  value={newDevReflection}
                  onChange={(e) => setNewDevReflection(e.target.value)}
                  required
                  placeholder="Write the theological reflection and spiritual teaching..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Guided Prayer</label>
                <textarea
                  rows={2}
                  value={newDevPrayer}
                  onChange={(e) => setNewDevPrayer(e.target.value)}
                  placeholder="Lord, empower us with Your grace..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 rounded-xl bg-[#9333EA] hover:bg-[#7E22CE] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Publish Devotion Globally</span>
              </button>
            </form>
          )}

          {/* TAB 3: PRAYERS */}
          {activeSubTab === "prayers" && (
            <form onSubmit={handlePublishCustomPrayer} className="p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-2xs space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#16235A]">
                Publish New Guided Prayer
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Prayer Title</label>
                  <input
                    type="text"
                    value={newPrayerTitle}
                    onChange={(e) => setNewPrayerTitle(e.target.value)}
                    required
                    placeholder="e.g. Prayer for Divine Favor and Open Doors"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                  <select
                    value={newPrayerCategory}
                    onChange={(e) => setNewPrayerCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  >
                    <option value="Spiritual Warfare & Breakthrough">Spiritual Warfare & Breakthrough</option>
                    <option value="Healing, Restoration & Health">Healing, Restoration & Health</option>
                    <option value="Family, Marriage & Children">Family, Marriage & Children</option>
                    <option value="Financial Wisdom & Kingdom Abundance">Financial Wisdom & Kingdom Abundance</option>
                    <option value="Peace, Overcoming Anxiety & Rest">Peace, Overcoming Anxiety & Rest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Scriptural Anchor</label>
                <input
                  type="text"
                  value={newPrayerScripture}
                  onChange={(e) => setNewPrayerScripture(e.target.value)}
                  placeholder="e.g. Psalm 91:1-4"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Guided Prayer Content</label>
                <textarea
                  rows={4}
                  value={newPrayerBody}
                  onChange={(e) => setNewPrayerBody(e.target.value)}
                  required
                  placeholder="Heavenly Father, in the mighty name of Jesus Christ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Publish Prayer Globally</span>
              </button>
            </form>
          )}

          {/* TAB 4: MANAGE SPIRITUAL PLACES */}
          {activeSubTab === "spiritual_places" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Compass className="w-4 h-4 text-amber-600" />
                  Manage Spiritual Places & Scripture Sanctuaries
                </p>
                <p>
                  As Creator, you can create new biblical places (e.g. Nazareth, Jordan, Galilee, Damascus, Patmos), edit existing places, add custom scriptures with relevance scores, reorder display sequence, and publish/feature places across the app.
                </p>
              </div>

              {/* Create or Edit Place Form */}
              <form
                onSubmit={handleSaveOrUpdatePlace}
                className="p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-bold font-serif text-[#16235A]">
                    {editingPlace ? `Edit Place: ${editingPlace.name}` : "Create New Spiritual Place"}
                  </h4>
                  {editingPlace && (
                    <button
                      type="button"
                      onClick={handleCancelEditPlace}
                      className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Place Name (e.g. Nazareth)
                    </label>
                    <input
                      type="text"
                      value={newPlaceName}
                      onChange={(e) => setNewPlaceName(e.target.value)}
                      required
                      placeholder="e.g. Nazareth"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Subtitle / Spiritual Title
                    </label>
                    <input
                      type="text"
                      value={newPlaceSubtitle}
                      onChange={(e) => setNewPlaceSubtitle(e.target.value)}
                      required
                      placeholder="e.g. Place of Quiet Preparation"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Icon / Emoji (e.g. 🌿, 🔥, ✨, 🔨, 🌊)
                    </label>
                    <input
                      type="text"
                      value={newPlaceIcon}
                      onChange={(e) => setNewPlaceIcon(e.target.value)}
                      required
                      placeholder="e.g. 🔨"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Biblical Anchor Reference (e.g. Luke 4:16)
                    </label>
                    <input
                      type="text"
                      value={newPlaceBiblicalRef}
                      onChange={(e) => setNewPlaceBiblicalRef(e.target.value)}
                      required
                      placeholder="e.g. Luke 2:51–52; Luke 4:16"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Thematic Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newPlaceThemes}
                      onChange={(e) => setNewPlaceThemes(e.target.value)}
                      placeholder="e.g. Hidden Preparation, Obedience, Character"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Spiritual Meaning (Devotional Metaphor)
                  </label>
                  <input
                    type="text"
                    value={newPlaceMeaning}
                    onChange={(e) => setNewPlaceMeaning(e.target.value)}
                    required
                    placeholder="e.g. A devotional picture of quiet preparation and hidden growth before public fruitfulness."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Short Description / Narrative Context
                  </label>
                  <textarea
                    rows={2}
                    value={newPlaceDescription}
                    onChange={(e) => setNewPlaceDescription(e.target.value)}
                    placeholder="Describe the biblical background and historical significance..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPlacePublished}
                        onChange={(e) => setIsPlacePublished(e.target.checked)}
                        className="rounded text-indigo-600"
                      />
                      <span>Published (Visible in App)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPlaceFeatured}
                        onChange={(e) => setIsPlaceFeatured(e.target.checked)}
                        className="rounded text-amber-600"
                      />
                      <span>Featured Sanctuary</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#16235A] hover:bg-[#24357D] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>{editingPlace ? "Save Changes" : "Create Spiritual Place"}</span>
                  </button>
                </div>
              </form>

              {/* Add Custom Scripture to a Place */}
              <form
                onSubmit={handleAddCustomScripture}
                className="p-5 rounded-2xl bg-white border border-[#E8E0F0] shadow-xs space-y-4"
              >
                <h4 className="text-sm font-bold font-serif text-[#16235A] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Add Custom Scripture Passage to a Spiritual Place
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Target Spiritual Place
                    </label>
                    <select
                      value={targetPlaceId}
                      onChange={(e) => setTargetPlaceId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    >
                      {placesList.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.icon} {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Scripture Reference (e.g. Luke 2:52)
                    </label>
                    <input
                      type="text"
                      value={customScRef}
                      onChange={(e) => setCustomScRef(e.target.value)}
                      required
                      placeholder="e.g. Luke 2:52"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Theme / Topic
                    </label>
                    <input
                      type="text"
                      value={customScTheme}
                      onChange={(e) => setCustomScTheme(e.target.value)}
                      placeholder="e.g. Growth in Favor and Wisdom"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Scripture Passage Text (KJV)
                  </label>
                  <textarea
                    rows={2}
                    value={customScText}
                    onChange={(e) => setCustomScText(e.target.value)}
                    required
                    placeholder="And Jesus increased in wisdom and stature, and in favour with God and man."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Devotional Reflection for this Place
                  </label>
                  <input
                    type="text"
                    value={customScReflection}
                    onChange={(e) => setCustomScReflection(e.target.value)}
                    placeholder="Quiet preparation in the secret place yields lasting spiritual authority."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-[#16235A]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-600 font-semibold">
                      Relevance Score (1-100):
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={customScScore}
                      onChange={(e) => setCustomScScore(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded-lg border border-slate-300 text-xs text-center"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Attach Scripture to Place</span>
                  </button>
                </div>
              </form>

              {/* Active Places Management Table / List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Registered Spiritual Places ({placesList.length})
                </h4>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {placesList.map((place, idx) => (
                    <div
                      key={place.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{place.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#16235A] text-sm font-serif">
                              {place.name}
                            </strong>
                            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold">
                              {place.biblicalReference}
                            </span>
                            {place.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-0.5">
                                <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 italic line-clamp-1 mt-0.5">
                            "{place.spiritualMeaning}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleMovePlaceOrder(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-black disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMovePlaceOrder(idx, "down")}
                          disabled={idx === placesList.length - 1}
                          className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-black disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTogglePublishPlace(place.id)}
                          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer ${
                            place.isPublished
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-200 text-slate-500 border-slate-300"
                          }`}
                          title={place.isPublished ? "Unpublish" : "Publish"}
                        >
                          {place.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleFeaturePlace(place.id)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            place.isFeatured
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className={`w-3.5 h-3.5 ${place.isFeatured ? "fill-amber-500 text-amber-600" : ""}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartEditPlace(place)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePlace(place.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer"
                          title="Delete Place"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BOOKS & LIBRARY */}
          {activeSubTab === "books" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Creator Digital Library Manager
                </p>
                <p>
                  Manage the 12 classic Christian works and your custom publications by Bismark Twum.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-[#16235A]">Featured Author Catalog:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>The Joy of the Lord (Bismark Twum)</li>
                  <li>ApostleMath: Biblical Principles in Mathematical Illustrations</li>
                  <li>The Complete Works of E.M. Bounds on Prayer</li>
                  <li>Pilgrim's Progress (John Bunyan)</li>
                  <li>Spurgeon's Morning and Evening</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 5: APOSTLEMATH */}
          {activeSubTab === "apostlemath" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
                <p className="font-bold flex items-center gap-2 text-purple-300">
                  <Calculator className="w-4 h-4" />
                  ApostleMath & MathemaSermon Manager
                </p>
                <p className="text-slate-300">
                  All lessons adhere to the mandatory structure: Mathematical Principle $\to$ Example $\to$ Life Connection $\to$ Biblical Truth $\to$ MathemaSermon $\to$ Practical Application $\to$ Prayer.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-[#16235A]">Current Active Topics:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong>Simultaneous Equations</strong>: Faith & God's Plan (2 Cor 5:7)
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong>Quadratic Equations</strong>: Difficult Seasons & Solutions (Matt 19:26)
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong>Spiritual Gradient</strong>: Growth Direction (2 Pet 3:18)
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong>Set Theory</strong>: Belonging to Christ (1 Pet 2:9)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Global Server Synchronizer v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
