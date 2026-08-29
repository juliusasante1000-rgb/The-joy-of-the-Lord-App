import React, { useState, useEffect, useRef } from "react";
import {
  Music,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Square,
  Bookmark,
  Share2,
  Copy,
  Check,
  History,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Heart,
  Sliders,
  Radio,
  FileText,
  Type,
  Mic2,
  RefreshCw,
  Send
} from "lucide-react";
import { HYMNALS_COLLECTION, HYMN_CATEGORIES } from "../data/hymnalsData";
import { HymnItem } from "../types";
import { fetchAiWithRetry } from "../utils/aiClient";

interface HymnalsTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
}

// Frequency map for Web Audio API melody playback
const NOTE_FREQUENCIES: Record<string, number> = {
  C4: 261.63,
  "C#4": 277.18,
  Db4: 277.18,
  D4: 293.66,
  "D#4": 311.13,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  Gb4: 369.99,
  G4: 392.0,
  "G#4": 415.3,
  Ab4: 415.3,
  A4: 440.0,
  "A#4": 466.16,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  Db5: 554.37,
  D5: 587.33,
  "D#5": 622.25,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  "F#5": 739.99,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77
};

export const HymnalsTab: React.FC<HymnalsTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onNavigateToBible
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jumpInput, setJumpInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedHymnId, setSelectedHymnId] = useState<string>(HYMNALS_COLLECTION[0].id);
  const [activeViewMode, setActiveViewMode] = useState<"lyrics" | "story" | "theology" | "details">("lyrics");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [readerPulse, setReaderPulse] = useState(false);
  const hymnReaderRef = useRef<HTMLDivElement | null>(null);

  // Web Audio Synth Melody State
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [activeMelodyIndex, setActiveMelodyIndex] = useState<number>(-1);
  const [melodyDurationMode, setMelodyDurationMode] = useState<"single" | "verses4" | "meditation10" | "continuous">("verses4");
  const [melodyInstrument, setMelodyInstrument] = useState<"organ" | "piano" | "celestial">("organ");
  const [melodyLoopCycle, setMelodyLoopCycle] = useState(1);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // AI Devotional Hymn Reflection State
  const [aiTopic, setAiTopic] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const selectedHymn =
    HYMNALS_COLLECTION.find((h) => h.id === selectedHymnId) || HYMNALS_COLLECTION[0];

  const currentHymnIndex = HYMNALS_COLLECTION.findIndex((h) => h.id === selectedHymn.id);

  const selectAndFocusHymn = (id: string) => {
    setSelectedHymnId(id);
    setReaderPulse(true);
    setTimeout(() => setReaderPulse(false), 2000);

    setTimeout(() => {
      if (hymnReaderRef.current) {
        hymnReaderRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const el = document.getElementById("active-hymn-sanctuary");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 50);
  };

  const handleJumpToHymnNumber = (numStr: string) => {
    const parsed = parseInt(numStr.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(parsed) && parsed > 0) {
      const match = HYMNALS_COLLECTION.find((h) => h.hymnNumber === parsed);
      if (match) {
        selectAndFocusHymn(match.id);
        setJumpInput("");
      }
    }
  };

  const handlePrevHymn = () => {
    if (currentHymnIndex > 0) {
      selectAndFocusHymn(HYMNALS_COLLECTION[currentHymnIndex - 1].id);
    }
  };

  const handleNextHymn = () => {
    if (currentHymnIndex < HYMNALS_COLLECTION.length - 1) {
      selectAndFocusHymn(HYMNALS_COLLECTION[currentHymnIndex + 1].id);
    }
  };

  // Stop synth when hymn changes
  useEffect(() => {
    stopMelody();
  }, [selectedHymnId]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopMelody();
    };
  }, []);

  const stopMelody = () => {
    synthTimeoutsRef.current.forEach((t) => clearTimeout(t));
    synthTimeoutsRef.current = [];
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setIsPlayingMelody(false);
    setActiveMelodyIndex(-1);
  };

  const playHymnMelody = () => {
    if (isPlayingMelody) {
      stopMelody();
      return;
    }

    const notes = selectedHymn.melodyNotes;
    if (!notes || notes.length === 0) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;
      setIsPlayingMelody(true);
      setMelodyLoopCycle(1);

      // Determine repetition cycles based on duration mode
      // single = 1 verse, verses4 = 4 verses (~2.5 min), meditation10 = 12 verses (~10 min), continuous = 60 cycles (~45 min)
      const maxCycles =
        melodyDurationMode === "single"
          ? 1
          : melodyDurationMode === "verses4"
          ? 4
          : melodyDurationMode === "meditation10"
          ? 14
          : 60;

      let currentTime = ctx.currentTime + 0.1;
      const tempo = 0.65; // Seconds per beat (reverent hymn tempo)

      for (let cycle = 0; cycle < maxCycles; cycle++) {
        const cycleNum = cycle + 1;
        
        // Schedule loop cycle UI update
        const cycleDelayMs = Math.max(0, (currentTime - ctx.currentTime) * 1000);
        const tCycle = setTimeout(() => {
          setMelodyLoopCycle(cycleNum);
        }, cycleDelayMs);
        synthTimeoutsRef.current.push(tCycle);

        notes.forEach((item, index) => {
          const freq = NOTE_FREQUENCIES[item.note] || 440;
          const durationSec = item.duration * tempo;

          // Schedule visual indicator
          const visualDelay = (currentTime - ctx.currentTime) * 1000;
          const tVis = setTimeout(() => {
            setActiveMelodyIndex(index);
          }, Math.max(0, visualDelay));
          synthTimeoutsRef.current.push(tVis);

          if (melodyInstrument === "organ") {
            // Cathedral Organ: Fundamental Sine + 8' Octave Triangle + Sub-Bass
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = "sine";
            osc1.frequency.setValueAtTime(freq, currentTime);

            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = "triangle";
            osc2.frequency.setValueAtTime(freq * 2, currentTime);

            const oscSub = ctx.createOscillator();
            const gainSub = ctx.createGain();
            oscSub.type = "sine";
            oscSub.frequency.setValueAtTime(freq * 0.5, currentTime);

            gain1.gain.setValueAtTime(0, currentTime);
            gain1.gain.linearRampToValueAtTime(0.20, currentTime + 0.05);
            gain1.gain.exponentialRampToValueAtTime(0.001, currentTime + durationSec - 0.02);

            gain2.gain.setValueAtTime(0, currentTime);
            gain2.gain.linearRampToValueAtTime(0.08, currentTime + 0.05);
            gain2.gain.exponentialRampToValueAtTime(0.001, currentTime + durationSec - 0.02);

            gainSub.gain.setValueAtTime(0, currentTime);
            gainSub.gain.linearRampToValueAtTime(0.06, currentTime + 0.05);
            gainSub.gain.exponentialRampToValueAtTime(0.001, currentTime + durationSec - 0.02);

            osc1.connect(gain1);
            osc2.connect(gain2);
            oscSub.connect(gainSub);
            gain1.connect(ctx.destination);
            gain2.connect(ctx.destination);
            gainSub.connect(ctx.destination);

            osc1.start(currentTime);
            osc1.stop(currentTime + durationSec);
            osc2.start(currentTime);
            osc2.stop(currentTime + durationSec);
            oscSub.start(currentTime);
            oscSub.stop(currentTime + durationSec);
          } else if (melodyInstrument === "piano") {
            // Classical Hymnal Piano: Triangle fundamental with quick percussive attack and warm decay
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, currentTime);

            gain.gain.setValueAtTime(0, currentTime);
            gain.gain.linearRampToValueAtTime(0.28, currentTime + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + durationSec * 1.2);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(currentTime);
            osc.stop(currentTime + durationSec * 1.25);
          } else {
            // Celestial Sanctuary Pad: Warm soft sine wave with gentle chorus detuning
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = "sine";
            osc2.type = "sine";
            osc1.frequency.setValueAtTime(freq, currentTime);
            osc2.frequency.setValueAtTime(freq * 1.004, currentTime); // subtle shimmer

            gain.gain.setValueAtTime(0, currentTime);
            gain.gain.linearRampToValueAtTime(0.18, currentTime + 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + durationSec + 0.1);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(currentTime);
            osc1.stop(currentTime + durationSec + 0.15);
            osc2.start(currentTime);
            osc2.stop(currentTime + durationSec + 0.15);
          }

          currentTime += durationSec;
        });

        // 1.4s gentle interlude pause between verses
        currentTime += 1.4;
      }

      // Schedule end of melody
      const totalTimeMs = (currentTime - ctx.currentTime + 0.5) * 1000;
      const tEnd = setTimeout(() => {
        stopMelody();
      }, totalTimeMs);
      synthTimeoutsRef.current.push(tEnd);
    } catch (e) {
      console.warn("Audio playback error:", e);
      stopMelody();
    }
  };

  // Filtered hymnal collection
  const filteredHymns = HYMNALS_COLLECTION.filter((hymn) => {
    const matchesCategory =
      selectedCategory === "All" || hymn.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesNumber = hymn.hymnNumber.toString() === q || `hymn ${hymn.hymnNumber}` === q;
    const matchesTitle = hymn.title.toLowerCase().includes(q);
    const matchesAuthor = hymn.author.toLowerCase().includes(q);
    const matchesTune = (hymn.tuneName || "").toLowerCase().includes(q);
    const matchesLyrics = hymn.stanzas.some((s) => s.text.toLowerCase().includes(q));
    const matchesTags = hymn.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && (matchesNumber || matchesTitle || matchesAuthor || matchesTune || matchesLyrics || matchesTags);
  });

  const handleCopyLyrics = () => {
    const fullLyrics = `${selectedHymn.title} (Hymn #${selectedHymn.hymnNumber})
Author: ${selectedHymn.author} (${selectedHymn.year || "Traditional"})
Tune: ${selectedHymn.tuneName || "Traditional"} | Key: ${selectedHymn.keySignature || "Standard"}

${selectedHymn.stanzas
  .map((s) => `[Stanza ${s.number}]\n${s.text}`)
  .join("\n\n")}

${selectedHymn.chorus ? `[Refrain/Chorus]\n${selectedHymn.chorus}\n\n` : ""}
Scripture Anchor: ${selectedHymn.scriptureAnchor.reference}
"${selectedHymn.scriptureAnchor.text}"
`;
    navigator.clipboard.writeText(fullLyrics);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2000);
  };

  const handleGenerateAiHymnDevotional = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);
    setAiResult(null);

    try {
      const prompt = `You are a reverent Christian hymnologist and pastoral theologian.
Generate an inspirational, soul-stirring devotional reflection exploring the profound spiritual legacy of traditional Christian hymnals and spiritual songs, specifically connecting to the user's topic: "${aiTopic}".
Include:
1. Spiritual Foundation & Biblical Anchor (cite relevant KJV/NKJV scriptures)
2. Hymnic Heritage & Old Spiritual Analogy (mention how saints and early revivalists found power through songs in the night)
3. Three Practical Stanzas of Faith (actionable steps for worship in trials)
4. Pastoral Closing Prayer & Benediction.
Keep the tone deeply reverent, majestic, and grounded in the Lord Jesus Christ.`;

      const res = await fetchAiWithRetry<any>(
        "/api/generate",
        {
          prompt,
          systemInstruction: "You are an apostolic Christian theologian and hymnologist.",
        },
        {
          maxRetries: 2,
          retryDelayMs: 1200,
          storageKey: `ai_hymn_devotion_${aiTopic.trim().toLowerCase().slice(0, 40)}`
        }
      );

      if (res.success && res.text) {
        setAiResult(res.text);
      } else if (res.success && res.data && typeof res.data === "string") {
        setAiResult(res.data);
      } else {
        setAiResult(
          `Grace to You: In the midnight hour of trial, remember that Paul and Silas sang hymns in prison and the foundations shook (Acts 16:25). Whatever storm you face with "${aiTopic}", lift your voice in praise. The Lord inhabits the praises of His people!`
        );
      }
    } catch (err: any) {
      console.warn("AI generation note:", err);
      setAiResult(
        `Grace to You: In the midnight hour of trial, remember that Paul and Silas sang hymns in prison and the foundations shook (Acts 16:25). Whatever storm you face with "${aiTopic}", lift your voice in praise. The Lord inhabits the praises of His people!`
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const fontSizeClass = {
    sm: "text-xs leading-relaxed",
    md: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-loose",
    xl: "text-lg sm:text-xl leading-loose font-medium"
  }[fontSize];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16235A] via-[#1E2E6E] to-[#24357D] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-radial from-[#B48C35]/30 to-transparent blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DCC398] text-xs font-mono font-bold tracking-wider uppercase">
              <Music className="w-3.5 h-3.5" /> Sacred Christian Hymnody & Old Spirituals
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Christian Hymnals & Spiritual Songs
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Timeless hymns, old African American spirituals, and revival anthems that have anchored the Church across centuries. Complete with stanzas, audio melody chimes, historical origins, and theological insights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B48C35] to-[#DCC398] text-[#16235A] font-bold text-xs flex items-center gap-2 shadow-md hover:brightness-105 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#16235A]" /> Hymn Devotional AI
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills & Search & Quick Jump */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Main Keyword Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 505 hymns by title, author, lyrics snippet, or meter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-[#16235A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B48C35]/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Jump to Hymn Number Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJumpToHymnNumber(jumpInput);
            }}
            className="flex items-center gap-1.5 shrink-0"
          >
            <div className="relative w-28 sm:w-32">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-amber-700">#</span>
              <input
                type="text"
                placeholder="Hymn No."
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-full pl-7 pr-2 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-xs font-mono font-bold text-[#16235A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B48C35]"
              />
            </div>
            <button
              type="submit"
              disabled={!jumpInput.trim()}
              className="px-3 py-2.5 rounded-xl bg-[#B48C35] hover:bg-[#996515] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-40"
            >
              Go to Hymn
            </button>
          </form>

          <div className="text-xs font-mono text-slate-500 shrink-0 px-1 hidden lg:block">
            {filteredHymns.length} Hymns
          </div>
        </div>

        {/* Famous Hymns Quick Jump Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold shrink-0 mr-1">
            Quick Jump:
          </span>
          {[
            { num: 1, name: "Holy, Holy, Holy" },
            { num: 2, name: "Amazing Grace" },
            { num: 3, name: "How Great Thou Art" },
            { num: 4, name: "Blessed Assurance" },
            { num: 100, name: "Great Is Thy Faithfulness" },
            { num: 120, name: "Rock of Ages" },
            { num: 200, name: "Crown Him with Many Crowns" },
            { num: 505, name: "A Mighty Fortress" }
          ].map((qh) => (
            <button
              key={qh.num}
              onClick={() => handleJumpToHymnNumber(qh.num.toString())}
              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0"
            >
              #{qh.num} {qh.name}
            </button>
          ))}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {HYMN_CATEGORIES.map((cat) => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  isSel
                    ? "bg-[#16235A] text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Interface: Left Hymn Index, Right Hymn Reader & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Hymn Selector List */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredHymns.map((hymn) => {
            const isSelected = hymn.id === selectedHymn.id;
            return (
              <div
                key={hymn.id}
                onClick={() => selectAndFocusHymn(hymn.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none group ${
                  isSelected
                    ? "bg-gradient-to-r from-[#FAF6ED] to-white border-[#B48C35] shadow-sm ring-2 ring-[#B48C35]/60"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#B48C35] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 group-hover:bg-[#16235A] group-hover:text-white"
                      }`}
                    >
                      #{hymn.hymnNumber}
                    </span>
                    <div className="min-w-0">
                      <h4
                        className={`text-xs sm:text-sm font-serif font-bold truncate leading-tight ${
                          isSelected ? "text-[#16235A]" : "text-slate-900"
                        }`}
                      >
                        {hymn.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-sans truncate">
                        {hymn.author} {hymn.year ? `(${hymn.year})` : ""}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                    {hymn.category.split(" ")[0]}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-1 italic mt-1.5 pl-9 font-serif">
                  "{hymn.stanzas[0]?.text.split("\n")[0]}..."
                </p>
              </div>
            );
          })}

          {filteredHymns.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              <p className="text-sm font-serif">No hymns found matching your query.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2 text-xs text-[#2563EB] font-bold underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Active Hymn Sanctuary Sanctuary View */}
        <div
          id="active-hymn-sanctuary"
          ref={hymnReaderRef}
          className={`lg:col-span-8 space-y-4 transition-all duration-500 rounded-3xl ${
            readerPulse ? "ring-4 ring-amber-400/80 shadow-2xl scale-[1.005]" : ""
          }`}
        >
          {/* Top Control Bar of Selected Hymn */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#B48C35]/15 text-[#996515] font-mono font-bold text-xs">
                    HYMN #{selectedHymn.hymnNumber} OF {HYMNALS_COLLECTION.length}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs">
                    {selectedHymn.category}
                  </span>
                  {selectedHymn.keySignature && (
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-mono text-xs">
                      Key: {selectedHymn.keySignature}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16235A]">
                  {selectedHymn.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-sans">
                  Words: <strong className="text-slate-700">{selectedHymn.author}</strong> {selectedHymn.year ? `(${selectedHymn.year})` : ""}
                  {selectedHymn.tuneName ? ` • Tune: ${selectedHymn.tuneName}` : ""}
                  {selectedHymn.meter ? ` • Meter: ${selectedHymn.meter}` : ""}
                </p>
              </div>

              {/* Prev / Next & Action Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Prev / Next Hymn Switcher */}
                <div className="flex items-center gap-1 mr-1">
                  <button
                    onClick={handlePrevHymn}
                    disabled={currentHymnIndex <= 0}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1"
                    title="Previous Hymn"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    onClick={handleNextHymn}
                    disabled={currentHymnIndex >= HYMNALS_COLLECTION.length - 1}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1"
                    title="Next Hymn"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                {/* Audio Melody Synthesizer Button & Settings */}
                {selectedHymn.melodyNotes && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={playHymnMelody}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                        isPlayingMelody
                          ? "bg-rose-600 text-white animate-pulse"
                          : "bg-gradient-to-r from-amber-500 to-[#B48C35] text-white hover:brightness-105"
                      }`}
                      title="Play sacred organ melody tone"
                    >
                      {isPlayingMelody ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" /> Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" /> Play Melody
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowAudioSettings(!showAudioSettings)}
                      className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                        showAudioSettings
                          ? "bg-[#16235A] text-white border-[#16235A]"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                      title="Melody Length & Instrument Settings"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Vocal TTS Button */}
                <button
                  onClick={() => {
                    const recitation = `${selectedHymn.title}, Hymn Number ${selectedHymn.hymnNumber}. Written by ${selectedHymn.author}.\n\n` +
                      selectedHymn.stanzas.map(s => `Stanza ${s.number}: ${s.text}`).join("\n\n") +
                      (selectedHymn.chorus ? `\n\nRefrain: ${selectedHymn.chorus}` : "");
                    onToggleSpeak(recitation);
                  }}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                    isSpeaking
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  title="Recite Hymn Text aloud"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() =>
                    onToggleBookmark({
                      id: selectedHymn.id,
                      title: `${selectedHymn.title} (Hymn #${selectedHymn.hymnNumber})`,
                      snippet: selectedHymn.stanzas[0]?.text.slice(0, 100) + "...",
                      reference: selectedHymn.scriptureAnchor.reference,
                      type: "hymn",
                      targetId: selectedHymn.id
                    })
                  }
                  className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                    isBookmarked(selectedHymn.id, "hymn")
                      ? "bg-amber-50 border-amber-300 text-[#B48C35]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  title="Bookmark Hymn"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked(selectedHymn.id, "hymn") ? "fill-current" : ""
                    }`}
                  />
                </button>

                {/* Share Button */}
                <button
                  onClick={() =>
                    onShareItem(
                      `${selectedHymn.title} (Hymn #${selectedHymn.hymnNumber})`,
                      selectedHymn.stanzas.map((s) => `[${s.number}] ${s.text}`).join("\n\n"),
                      selectedHymn.scriptureAnchor.reference,
                      `by ${selectedHymn.author} (${selectedHymn.year || "Traditional"})`
                    )
                  }
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs transition-all cursor-pointer"
                  title="Share Hymn"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Copy Lyrics Button */}
                <button
                  onClick={handleCopyLyrics}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs transition-all cursor-pointer"
                  title="Copy full lyrics"
                >
                  {copiedLyrics ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Audio Settings Popover / Panel */}
            {showAudioSettings && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
                    🎵 Melody Duration & Timbre Engine
                  </span>
                  <button
                    onClick={() => setShowAudioSettings(false)}
                    className="text-xs text-slate-400 hover:text-slate-700"
                  >
                    Done
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Duration / Repetitions:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: "single", label: "1 Stanza (~30s)" },
                        { id: "verses4", label: "4 Verses (~2.5m)" },
                        { id: "meditation10", label: "10 Min Meditation" },
                        { id: "continuous", label: "Continuous Long-Play" }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMelodyDurationMode(m.id as any)}
                          className={`p-1.5 px-2 rounded-lg text-left font-medium transition-all ${
                            melodyDurationMode === m.id
                              ? "bg-[#16235A] text-white"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Instrument Timbre:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: "organ", label: "Cathedral Organ" },
                        { id: "piano", label: "Hymn Piano" },
                        { id: "celestial", label: "Celestial Pad" }
                      ].map((inst) => (
                        <button
                          key={inst.id}
                          onClick={() => setMelodyInstrument(inst.id as any)}
                          className={`p-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                            melodyInstrument === inst.id
                              ? "bg-[#B48C35] text-white"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {inst.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Mode Tabs (Lyrics, Historical Story, Theology, Scripture) */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveViewMode("lyrics")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeViewMode === "lyrics"
                      ? "bg-white text-[#16235A] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  📖 Full Stanzas & Sing-Along
                </button>
                <button
                  onClick={() => setActiveViewMode("story")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeViewMode === "story"
                      ? "bg-white text-[#16235A] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  📜 Historical Story
                </button>
                <button
                  onClick={() => setActiveViewMode("theology")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeViewMode === "theology"
                      ? "bg-white text-[#16235A] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ✝ Theology & Prayer
                </button>
              </div>

              {/* Font Sizer (for Sing-Along & Reading) */}
              {activeViewMode === "lyrics" && (
                <div className="flex items-center gap-1 text-xs font-mono text-slate-500">
                  <Type className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Size:</span>
                  {(["sm", "md", "lg", "xl"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`px-2 py-0.5 rounded uppercase font-bold cursor-pointer ${
                        fontSize === sz
                          ? "bg-[#16235A] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE VIEW CONTENT */}
          {activeViewMode === "lyrics" && (
            <div className="p-6 sm:p-8 bg-[#FAF9F6] rounded-3xl border border-amber-200/60 shadow-md space-y-6">
              {/* Melody Live Progress Bar if playing */}
              {isPlayingMelody && (
                <div className="p-3 bg-gradient-to-r from-amber-500/15 via-[#B48C35]/15 to-purple-500/10 border border-amber-400/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#996515] shadow-xs">
                  <div className="flex items-center gap-2 font-mono font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <span>
                      Playing {melodyInstrument.toUpperCase()} Melody • Cycle {melodyLoopCycle}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-sans font-semibold">
                      {melodyDurationMode === "single" ? "Single Stanza" : melodyDurationMode === "verses4" ? "4 Verses Loop" : melodyDurationMode === "meditation10" ? "10m Deep Meditation" : "Continuous Sanctuary"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span>Note {activeMelodyIndex + 1} / {selectedHymn.melodyNotes?.length}</span>
                    <button
                      onClick={stopMelody}
                      className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 hover:bg-rose-200 font-sans font-bold cursor-pointer"
                    >
                      Stop
                    </button>
                  </div>
                </div>
              )}

              {/* Stanzas Display */}
              <div className="space-y-6 font-serif">
                {selectedHymn.stanzas.map((stanza) => (
                  <div
                    key={stanza.number}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#B48C35]/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-[#FAF6ED] text-[#B48C35] font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-[#B48C35]/30">
                        {stanza.number}
                      </span>
                      <div className={`flex-1 text-slate-800 ${fontSizeClass}`}>
                        {stanza.text.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className="tracking-wide">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Chorus / Refrain Highlight Card */}
                {selectedHymn.chorus && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#92400E]">
                      <Music className="w-4 h-4" /> Refrain / Chorus
                    </div>
                    <div className={`text-[#78350F] italic font-serif ${fontSizeClass}`}>
                      {selectedHymn.chorus.split("\n").map((line, cIdx) => (
                        <p key={cIdx} className="leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scripture Anchor Bar at Bottom of Lyrics */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#9333EA] block">
                    Scriptural Anchor
                  </span>
                  <p className="font-serif italic text-slate-800">
                    "{selectedHymn.scriptureAnchor.text}"
                  </p>
                  <p className="font-mono font-bold text-slate-500">
                    — {selectedHymn.scriptureAnchor.reference}
                  </p>
                </div>
                {onNavigateToBible && (
                  <button
                    onClick={() =>
                      onNavigateToBible(
                        selectedHymn.scriptureAnchor.book,
                        selectedHymn.scriptureAnchor.chapter,
                        selectedHymn.scriptureAnchor.verse
                      )
                    }
                    className="px-3 py-2 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1 shrink-0 hover:bg-[#1D4ED8] cursor-pointer transition-all shadow-xs"
                  >
                    Open in Bible <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {activeViewMode === "story" && (
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#B48C35]">
                  <History className="w-4 h-4" /> The Story Behind the Song
                </div>
                <h3 className="text-xl font-serif font-bold text-[#16235A]">
                  How "{selectedHymn.title}" Was Born
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-slate-800 font-serif leading-relaxed text-sm sm:text-base">
                {selectedHymn.historicalStory}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                    Author / Lyricist
                  </span>
                  <strong className="text-slate-800 text-sm">{selectedHymn.author}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                    Tune Name & Meter
                  </span>
                  <strong className="text-slate-800 text-sm">
                    {selectedHymn.tuneName || "Traditional"} ({selectedHymn.meter || "Standard"})
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                    Year Penned
                  </span>
                  <strong className="text-slate-800 text-sm">{selectedHymn.year || "Historic"}</strong>
                </div>
              </div>
            </div>
          )}

          {activeViewMode === "theology" && (
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#9333EA]">
                  <BookOpen className="w-4 h-4" /> Theological Insight & Biblical Exposition
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
                  {selectedHymn.theologicalInsight}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#16235A] to-[#24357D] rounded-3xl text-white shadow-md space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#DCC398]">
                  <Sparkles className="w-4 h-4" /> Devotional & Consecration Prayer
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-serif italic leading-relaxed">
                  "{selectedHymn.devotionalPrayer}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Devotional Hymn Reflection Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#B48C35] to-[#DCC398] text-[#16235A]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#16235A]">
                    AI Hymn Devotional Companion
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Discover spiritual reflections on hymns tailored to your current life season.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold font-mono text-slate-700 uppercase">
                What spiritual season or need are you seeking songs for?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Overcoming sudden grief, strength in financial trials, midnight deliverance..."
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateAiHymnDevotional()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B48C35]/50"
                />
                <button
                  onClick={handleGenerateAiHymnDevotional}
                  disabled={isGeneratingAi || !aiTopic.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#16235A] text-white font-bold text-xs flex items-center gap-2 disabled:opacity-50 hover:bg-[#24357D] cursor-pointer transition-all shadow-md shrink-0"
                >
                  {isGeneratingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Composing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Generate
                    </>
                  )}
                </button>
              </div>

              {/* Sample Topic Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {["Peace in Storms", "Overcoming Grief", "Salvation & Grace", "Deliverance in Trials"].map(
                  (sample) => (
                    <button
                      key={sample}
                      onClick={() => setAiTopic(sample)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium cursor-pointer transition-colors"
                    >
                      {sample}
                    </button>
                  )
                )}
              </div>
            </div>

            {aiResult && (
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-amber-200/80 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-[#B48C35] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Devotional Revelation
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiResult);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line">
                  {aiResult}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
