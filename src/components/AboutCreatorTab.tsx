import React, { useState } from "react";
import {
  User,
  Heart,
  BookOpen,
  Sparkles,
  Award,
  Mail,
  Phone,
  MapPin,
  Compass,
  GraduationCap,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Quote,
  Target,
  Flame,
  ShieldCheck,
  Send,
  Library,
  Lightbulb,
  ArrowRight,
  BookMarked,
  Globe2,
  KeyRound,
  LogOut,
  Zap
} from "lucide-react";
import { CreatorProfile, FounderSession } from "../types";
import { AppLogo } from "./AppLogo";
import { FOUNDER_PRIMARY_EMAIL } from "../data/creatorData";
import { ProfileSectionKey } from "./EditCreatorProfileModal";
import { AuthorScripturesSection } from "./AuthorScripturesSection";
import { AUTHOR_FAVOURITES_COUNT } from "../data/authorFavouriteScriptures";

interface AboutCreatorTabProps {
  profile: CreatorProfile;
  founderSession: FounderSession | null;
  onOpenEditModal: (section?: ProfileSectionKey) => void;
  onOpenFounderLogin: () => void;
  onFounderLogout: () => void;
  onNavigateTab: (tabId: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
  onShareItem?: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

type SubSection =
  | "about"
  | "message"
  | "vision"
  | "platform"
  | "faith"
  | "work"
  | "principles"
  | "scriptures"
  | "contact";

export const AboutCreatorTab: React.FC<AboutCreatorTabProps> = ({
  profile,
  founderSession,
  onOpenEditModal,
  onOpenFounderLogin,
  onFounderLogout,
  onNavigateTab,
  onNavigateToBible,
  onShareItem,
  onToggleSpeak,
  isSpeaking
}) => {
  const [activeSubSection, setActiveSubSection] = useState<SubSection>("about");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const isFounder = !!(founderSession && founderSession.isAuthenticated);
  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean })?.standalone === true);

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      contactSubject || "Message from The Joy of the Lord User"
    )}&body=${encodeURIComponent(contactMessage)}`;
    window.location.href = mailtoUrl;
    setContactSent(true);
    setTimeout(() => setContactSent(false), 4000);
  };

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-200">
      {/* Top Founder Sync Status Banner (Active When Logged In) */}
      {isFounder ? (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white border border-emerald-500/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="relative">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <p className="text-xs font-bold font-mono text-emerald-300 flex items-center justify-center sm:justify-start gap-1.5">
                <Globe2 className="w-3.5 h-3.5" /> FOUNDER MODE ACTIVE • GLOBAL SYNC ENABLED
              </p>
              <p className="text-[11px] text-slate-300">
                Authenticated as <span className="font-bold text-white">{founderSession?.founderEmail}</span>. Any profile changes sync live for all users worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="founder-edit-profile-btn"
              onClick={() => onOpenEditModal("general")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#DB2777] hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit & Live Sync</span>
            </button>
            <button
              onClick={onFounderLogout}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              title="Sign out of Founder Mode"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* 1. Hero Creator Profile Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[#16235A] via-[#1E293B] to-[#24357D] text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#24357D]">
        {/* Background decorative watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
          <AppLogo variant="icon-only" className="w-full h-full" />
        </div>

        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          {/* Creator Portrait Photo */}
          <div className="relative shrink-0 text-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#2563EB] via-[#9333EA] to-[#DB2777] shadow-xl mx-auto overflow-hidden">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover bg-slate-800"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <div className="inline-flex items-center gap-1 mt-2.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[#FBBF24] text-[11px] font-bold tracking-wider uppercase font-mono">
              <Sparkles className="w-3 h-3" /> Official Creator
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#DB2777]" /> {profile.location}
              </span>

              {/* Admin Portal (Only visible for founder/admin) */}
              {isFounder ? (
                <button
                  id="admin-dashboard-btn"
                  onClick={onOpenFounderLogin}
                  className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-amber-400/30"
                  title="Open Admin Dashboard & Settings"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Admin Dashboard
                </button>
              ) : null}
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-sm sm:text-base text-[#F472B6] font-medium mt-0.5">
                {profile.professionalTitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 italic max-w-2xl">
              "{profile.tagline}"
            </p>

            {/* Role Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
              {profile.roleBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-[11px] font-medium border border-white/10 tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 text-xs">
              <a
                href={`mailto:${profile.email}`}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F472B6]" /> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FBBF24]" /> {profile.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="p-1.5 rounded-2xl bg-white border border-[#E8E0F0] shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubSection("about")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "about"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          About Bismark
        </button>
        <button
          onClick={() => setActiveSubSection("message")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "message"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          Founder's Message
        </button>
        <button
          onClick={() => setActiveSubSection("vision")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "vision"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          Our Vision
        </button>
        <button
          onClick={() => setActiveSubSection("platform")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "platform"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          About The Platform
        </button>
        <button
          onClick={() => setActiveSubSection("faith")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "faith"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          Christian Faith
        </button>
        <button
          onClick={() => setActiveSubSection("work")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "work"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          Work & Books
        </button>
        <button
          onClick={() => setActiveSubSection("principles")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "principles"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          Power Principles
        </button>
        <button
          onClick={() => setActiveSubSection("scriptures")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubSection === "scriptures"
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Author's {AUTHOR_FAVOURITES_COUNT} Scriptures</span>
          <span className="px-1.5 py-0.5 bg-amber-400/40 text-amber-950 rounded-full text-[10px]">{AUTHOR_FAVOURITES_COUNT}</span>
        </button>
        <button
          onClick={() => setActiveSubSection("contact")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeSubSection === "contact"
              ? "bg-[#16235A] text-white shadow-xs"
              : "text-[#5B6B8A] hover:bg-slate-100"
          }`}
        >
          Contact & Connect
        </button>
      </div>

      {/* 3. Section Content Panels */}

      {/* SECTION: About Bismark Twum */}
      {activeSubSection === "about" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-5">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Biography & Profile
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                About {profile.name}
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-[#1E293B] space-y-4 font-serif">
              {profile.biography.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* 4 Core Pillars */}
            <div className="pt-4 border-t border-[#E8E0F0] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">
                The Four Foundational Pillars
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#FAF8FD] to-white border border-[#E8E0F0]">
                  <span className="text-lg">✝️</span>
                  <p className="text-xs font-bold text-[#16235A] mt-1">Faith in God</p>
                  <p className="text-[10px] text-slate-500">Unshakable foundation</p>
                </div>
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#FAF8FD] to-white border border-[#E8E0F0]">
                  <span className="text-lg">🎯</span>
                  <p className="text-xs font-bold text-[#16235A] mt-1">Focus on Purpose</p>
                  <p className="text-[10px] text-slate-500">Unyielding clarity</p>
                </div>
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#FAF8FD] to-white border border-[#E8E0F0]">
                  <span className="text-lg">⚙️</span>
                  <p className="text-xs font-bold text-[#16235A] mt-1">Discipline in Action</p>
                  <p className="text-[10px] text-slate-500">Consistent execution</p>
                </div>
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#FAF8FD] to-white border border-[#E8E0F0]">
                  <span className="text-lg">⭐</span>
                  <p className="text-xs font-bold text-[#16235A] mt-1">Destined to Impact</p>
                  <p className="text-[10px] text-slate-500">Kingdom transformation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Founder's Message */}
      {activeSubSection === "message" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6 relative overflow-hidden">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Personal Welcome
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                A Message from the Creator
              </h2>
            </div>

            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#FAF8FD] border border-[#E8E0F0]">
              <Quote className="w-12 h-12 text-[#9333EA]/20 absolute top-4 left-4 -scale-x-100" />
              <div className="relative z-10 space-y-4">
                <p className="text-base sm:text-lg font-serif italic text-[#16235A] leading-relaxed">
                  "{profile.welcomeMessage}"
                </p>

                <div className="pt-4 border-t border-[#E8E0F0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#9333EA]"
                    />
                    <div>
                      <p className="text-xs font-bold font-serif text-[#16235A]">{profile.name}</p>
                      <p className="text-[11px] text-[#5B6B8A]">{profile.professionalTitle}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#DB2777] font-bold">Nehemiah 8:10</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-[#16235A] mb-1">📖 Grow in Scripture</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Daily passages updated every 24 hours to ground your mind in God's eternal Word.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-[#16235A] mb-1">🙏 Deepen Prayer Life</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Liturgical, biblical adoration, confession, thanksgiving, and declaration frameworks.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-[#16235A] mb-1">📚 Theological Depth</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Classic Christian heritage literature and foundational doctrinal summaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Our Vision */}
      {activeSubSection === "vision" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Kingdom Direction
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                Our Vision & Mission
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#16235A] to-[#24357D] text-white space-y-4">
              <div className="flex items-center gap-2 text-[#FBBF24]">
                <Compass className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">The Core Vision</span>
              </div>
              <p className="text-base sm:text-lg font-serif leading-relaxed text-slate-100 italic">
                "{profile.vision}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-[#16235A] flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#9333EA]" /> Technology for Kingdom Growth
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Leveraging modern digital architecture, offline-capable progressive technologies, and thoughtful design to make spiritual study frictionless.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-[#16235A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DB2777]" /> Uncompromised Doctrinal Purity
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ensuring every prayer, devotion, quote, and commentary remains unswervingly anchored in orthodox Christian biblical truth.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: About The Platform */}
      {activeSubSection === "platform" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Architecture & Features
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                About This Platform
              </h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#16235A]">
                Why Was This Platform Created?
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#1E293B] font-serif">
                {profile.whyCreated}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E8E0F0]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#16235A]">
                Core Modules & How It Works
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
                  <div className="flex items-center gap-2 text-[#9333EA] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> Three-Phase Daily Devotions
                  </div>
                  <p className="text-xs text-[#16235A] leading-relaxed">
                    Auto-scheduled morning (12 AM–12 PM), afternoon (12 PM–5 PM), and evening (5 PM–12 AM) devotions synchronized with your local time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
                  <div className="flex items-center gap-2 text-[#DB2777] font-bold text-xs uppercase tracking-wider">
                    <Library className="w-4 h-4" /> Christian Classics Library
                  </div>
                  <p className="text-xs text-[#16235A] leading-relaxed">
                    Read seminal books by John Bunyan, St. Augustine, Brother Lawrence, and upload custom e-books and study resources.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
                  <div className="flex items-center gap-2 text-[#2563EB] font-bold text-xs uppercase tracking-wider">
                    <BookMarked className="w-4 h-4" /> Structured Biblical Prayers
                  </div>
                  <p className="text-xs text-[#16235A] leading-relaxed">
                    Pray through Adoration, Confession, Thanksgiving, Scripture Promises, Petitions, Spiritual Warfare, and Declarations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24] font-bold text-xs uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-[#B48C35]" /> Full Holy Bible & Doctrines
                  </div>
                  <p className="text-xs text-[#16235A] leading-relaxed">
                    Complete chapter-by-chapter Scripture reader with cross-references, study notes, highlights, and systematic theological overviews.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-4 border-t border-[#E8E0F0] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#5B6B8A] font-medium">
                Ready to explore the platform resources?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateTab("home")}
                  className="px-3.5 py-1.5 rounded-xl bg-[#16235A] text-white text-xs font-bold hover:bg-[#24357D] transition-colors cursor-pointer"
                >
                  Go to Home Devotion
                </button>
                <button
                  onClick={() => onNavigateTab("library")}
                  className="px-3.5 py-1.5 rounded-xl bg-[#9333EA] text-white text-xs font-bold hover:bg-[#7C3AED] transition-colors cursor-pointer"
                >
                  Explore Library
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: My Christian Faith */}
      {activeSubSection === "faith" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Ministry & Beliefs
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                My Christian Faith & Statement of Faith
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-[#1E293B] space-y-4 font-serif">
              {profile.christianFaith.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Scripture Anchors Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#16235A] to-[#24357D] text-white space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] font-mono">
                Key Scriptural Anchors
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                  <p className="text-xs font-bold text-[#F472B6]">Philippians 4:13</p>
                  <p className="text-xs italic mt-1 opacity-90">
                    "I can do all things through Christ who strengthens me."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                  <p className="text-xs font-bold text-[#FBBF24]">Nehemiah 8:10</p>
                  <p className="text-xs italic mt-1 opacity-90">
                    "For the joy of the Lord is your strength."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                  <p className="text-xs font-bold text-[#9333EA]">Proverbs 16:3</p>
                  <p className="text-xs italic mt-1 opacity-90">
                    "Commit your work to the Lord, and your plans will be established."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: My Work & Books */}
      {activeSubSection === "work" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Pedagogy & Research
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                My Work, Research & Publications
              </h2>
            </div>

            <div className="text-sm sm:text-base leading-relaxed text-[#1E293B] font-serif">
              <p>{profile.myWork}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8E0F0]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#9333EA]" /> Books & Curricular Works
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {profile.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] flex flex-col justify-between space-y-3 hover:border-[#9333EA] transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#9333EA]/10 text-[#9333EA]">
                        {pub.status}
                      </span>
                      <h4 className="text-base font-bold font-serif text-[#16235A] mt-2">
                        {pub.title}
                      </h4>
                      <p className="text-xs font-medium text-[#DB2777] mt-0.5">{pub.field}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {pub.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-[#5B6B8A]">
                      Authored by Bismark Twum
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Power Principles & Daily Focus */}
      {activeSubSection === "principles" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Guiding Philosophy
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                Power Principles & Daily Focus
              </h2>
            </div>

            {/* Daily Focus Strip */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#16235A] to-[#24357D] text-white space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] font-mono">
                Daily Focus Disciplines
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {profile.dailyFocus.map((focus, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles Cards */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#16235A]">
                Key Principles for Kingdom Excellence
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(profile.powerPrinciples || []).map((prin) => (
                  <div
                    key={prin.id}
                    className="p-5 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2 hover:border-[#9333EA] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold font-serif text-[#16235A]">{prin.title}</h4>
                      {prin.scripture && (
                        <span className="text-[11px] font-mono text-[#9333EA] font-semibold">
                          {prin.scripture}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{prin.description}</p>
                    {prin.bulletPoints && prin.bulletPoints.length > 0 && (
                      <ul className="text-xs text-slate-500 list-disc list-inside space-y-1 pt-1">
                        {prin.bulletPoints.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Contact & Connect */}
      {activeSubSection === "contact" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-6">
            <div className="border-b border-[#E8E0F0] pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9333EA]">
                Get In Touch
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A]">
                Connect with Bismark Twum
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direct Info */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Have a question, feedback on the devotions, educational inquiry, or prayer request? Reach out directly using the details below or send a quick email message.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#9333EA]/10 text-[#9333EA]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-mono">Email</p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-xs sm:text-sm font-bold text-[#16235A] hover:underline"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#DB2777]/10 text-[#DB2777]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-mono">Phone / WhatsApp</p>
                      <a
                        href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                        className="text-xs sm:text-sm font-bold text-[#16235A] hover:underline"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-mono">Location</p>
                      <p className="text-xs sm:text-sm font-bold text-[#16235A]">{profile.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Composer Form */}
              <form onSubmit={handleSendContact} className="space-y-4 p-5 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
                  Send a Direct Message
                </h4>

                <div>
                  <label className="block text-xs font-bold text-[#5B6B8A] mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Prayer Request, Feedback, Inquiry..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B6B8A] mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your note or prayer request..."
                    required
                    className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Email Client & Send</span>
                </button>

                {contactSent && (
                  <p className="text-xs text-emerald-600 font-bold text-center">
                    ✓ Opening email client with your message...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Author's 307 Favourite Scriptures */}
      {activeSubSection === "scriptures" && (
        <AuthorScripturesSection
          onNavigateTab={onNavigateTab}
          onNavigateToBible={onNavigateToBible}
          onShareItem={onShareItem}
          onToggleSpeak={onToggleSpeak}
          isSpeaking={isSpeaking}
        />
      )}
    </div>
  );
};
