import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  RotateCcw,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  BookOpen,
  Heart,
  Briefcase,
  Layers,
  Check,
  Plus,
  Trash2,
  Globe2,
  ShieldCheck,
  Award,
  Zap
} from "lucide-react";
import { CreatorProfile, CreatorPublication, PowerPrinciple, FounderSession } from "../types";
import { resetCreatorProfile, FOUNDER_PRIMARY_EMAIL } from "../data/creatorData";

export type ProfileSectionKey =
  | "general"
  | "bio"
  | "message"
  | "vision"
  | "platform"
  | "faith"
  | "work"
  | "publications"
  | "principles";

interface EditCreatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: CreatorProfile;
  founderSession: FounderSession | null;
  initialSection?: ProfileSectionKey;
  onSaveProfile: (updatedProfile: CreatorProfile) => Promise<boolean> | void;
}

export const EditCreatorProfileModal: React.FC<EditCreatorProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  founderSession,
  initialSection = "general",
  onSaveProfile
}) => {
  const [profile, setProfile] = useState<CreatorProfile>({ ...currentProfile });
  const [activeSection, setActiveSection] = useState<ProfileSectionKey>(initialSection);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProfile({ ...currentProfile });
      if (initialSection) {
        setActiveSection(initialSection);
      }
    }
  }, [isOpen, currentProfile, initialSection]);

  if (!isOpen) return null;

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile((prev) => ({
            ...prev,
            photoUrl: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveProfile(profile);
      setSaveSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(false);
        onClose();
      }, 1000);
    } catch (e) {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore the default creator profile details?")) {
      const def = resetCreatorProfile();
      setProfile(def);
      onSaveProfile(def);
    }
  };

  const handleAddRoleBadge = () => {
    const newBadge = prompt("Enter new role badge title (e.g. 'Keynote Speaker', 'Author'):");
    if (newBadge && newBadge.trim()) {
      setProfile((prev) => ({
        ...prev,
        roleBadges: [...prev.roleBadges, newBadge.trim()]
      }));
    }
  };

  const handleRemoveRoleBadge = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      roleBadges: prev.roleBadges.filter((_, i) => i !== index)
    }));
  };

  const handleAddPublication = () => {
    const newPub: CreatorPublication = {
      id: `pub-${Date.now()}`,
      title: "New Book / Research Project",
      field: "Education & Faith",
      description: "Comprehensive study and devotional writing.",
      status: "Published"
    };
    setProfile((prev) => ({
      ...prev,
      publications: [...prev.publications, newPub]
    }));
  };

  const handleRemovePublication = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      publications: prev.publications.filter((p) => p.id !== id)
    }));
  };

  const handleAddPrinciple = () => {
    const newP: PowerPrinciple = {
      id: `prin-${Date.now()}`,
      title: "Divine Principle",
      description: "Description of this foundational truth and application.",
      scripture: "Philippians 4:13",
      bulletPoints: ["Key aspect 1", "Key aspect 2"]
    };
    setProfile((prev) => ({
      ...prev,
      powerPrinciples: [...(prev.powerPrinciples || []), newP]
    }));
  };

  const handleRemovePrinciple = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      powerPrinciples: (prev.powerPrinciples || []).filter((p) => p.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBFE] w-full max-w-4xl rounded-2xl shadow-2xl border-2 border-[#16235A] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 bg-[#16235A] text-white flex items-center justify-between border-b border-[#24357D]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#DB2777] shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif">
                  Edit Creator Profile, Vision & Content
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold font-mono">
                  <Globe2 className="w-3 h-3" /> Live App Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Any changes made here sync across the entire app and all devices in real time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setActiveSection("general")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "general"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Profile Header & Photo
          </button>
          <button
            onClick={() => setActiveSection("bio")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "bio"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            About & Biography
          </button>
          <button
            onClick={() => setActiveSection("message")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "message"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Founder's Message
          </button>
          <button
            onClick={() => setActiveSection("vision")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "vision"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Our Vision
          </button>
          <button
            onClick={() => setActiveSection("platform")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "platform"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            About The Platform
          </button>
          <button
            onClick={() => setActiveSection("faith")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "faith"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Christian Faith
          </button>
          <button
            onClick={() => setActiveSection("work")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "work"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Work & Daily Focus
          </button>
          <button
            onClick={() => setActiveSection("publications")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "publications"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Work & Books ({profile.publications?.length || 0})
          </button>
          <button
            onClick={() => setActiveSection("principles")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeSection === "principles"
                ? "bg-[#16235A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Power Principles ({profile.powerPrinciples?.length || 0})
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-sm text-[#16235A]">
          {/* 1. General Header Info & Photo */}
          {activeSection === "general" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-white border border-[#E8E0F0]">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#2563EB] via-[#9333EA] to-[#DB2777] shadow-md overflow-hidden">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover bg-slate-100"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">
                    Official Profile Photo (Avatar)
                  </label>
                  <p className="text-xs text-slate-500">
                    Upload a portrait photo or enter an image URL
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 flex items-center gap-1.5 shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={profile.photoUrl}
                      onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                      placeholder="Or enter Image URL..."
                      className="flex-1 min-w-[200px] px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                    Full Name (Header)
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Professional Title (Subheading)
                </label>
                <input
                  type="text"
                  value={profile.professionalTitle}
                  onChange={(e) => setProfile({ ...profile, professionalTitle: e.target.value })}
                  placeholder="e.g. Christian | Mathematics Educator | Researcher | Writer"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Tagline / Motto (Header Quote)
                </label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  placeholder='e.g. "Empowering Minds. Transforming Education. Building Tomorrow."'
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                />
              </div>

              {/* Role Badges */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">
                    Role Badges (Header Tags)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRoleBadge}
                    className="px-2.5 py-1 rounded bg-[#16235A] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Badge
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-white border border-[#E8E0F0] rounded-xl">
                  {profile.roleBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      <span>{badge}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRoleBadge(idx)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                    Primary Email (Header Chip)
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                    Phone / WhatsApp (Header Chip)
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. Biography */}
          {activeSection === "bio" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  About {profile.name} (Full Biography & Academic Background)
                </label>
                <textarea
                  rows={12}
                  value={profile.biography}
                  onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] leading-relaxed font-sans text-sm"
                  placeholder="Write your comprehensive biography, educational journey, research, and calling..."
                />
              </div>
            </div>
          )}

          {/* 3. Founder's Message */}
          {activeSection === "message" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Founder's Message & Pastoral Welcome
                </label>
                <textarea
                  rows={10}
                  value={profile.welcomeMessage}
                  onChange={(e) => setProfile({ ...profile, welcomeMessage: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] leading-relaxed font-sans text-sm"
                  placeholder="A personal welcome message and greeting to all readers and believers..."
                />
              </div>
            </div>
          )}

          {/* 4. Our Vision */}
          {activeSection === "vision" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Our Vision (Ministry & Academic Vision)
                </label>
                <textarea
                  rows={6}
                  value={profile.vision}
                  onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] leading-relaxed font-sans text-sm"
                  placeholder="Your overarching vision statement..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Why I Created This Platform (Purpose & Heart)
                </label>
                <textarea
                  rows={6}
                  value={profile.whyCreated}
                  onChange={(e) => setProfile({ ...profile, whyCreated: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] leading-relaxed font-sans text-sm"
                  placeholder="The divine burden and purpose behind creating this platform..."
                />
              </div>
            </div>
          )}

          {/* 5. About The Platform */}
          {activeSection === "platform" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  What is This Platform? (Platform Overview)
                </label>
                <textarea
                  rows={4}
                  value={profile.platformGuide?.whatItIs || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      platformGuide: {
                        ...(profile.platformGuide || {
                          whatItIs: "",
                          coreMission: "",
                          libraryOverview: "",
                          aiDevotionalOverview: "",
                          scriptureFoundation: ""
                        }),
                        whatItIs: e.target.value
                      }
                    })
                  }
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] text-sm"
                  placeholder="Comprehensive description of the platform..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Core Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={profile.platformGuide?.coreMission || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      platformGuide: {
                        ...(profile.platformGuide || {
                          whatItIs: "",
                          coreMission: "",
                          libraryOverview: "",
                          aiDevotionalOverview: "",
                          scriptureFoundation: ""
                        }),
                        coreMission: e.target.value
                      }
                    })
                  }
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] text-sm"
                  placeholder="Mission statement of the platform..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Scripture Foundation & Doctrinal Stance
                </label>
                <textarea
                  rows={3}
                  value={profile.platformGuide?.scriptureFoundation || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      platformGuide: {
                        ...(profile.platformGuide || {
                          whatItIs: "",
                          coreMission: "",
                          libraryOverview: "",
                          aiDevotionalOverview: "",
                          scriptureFoundation: ""
                        }),
                        scriptureFoundation: e.target.value
                      }
                    })
                  }
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] text-sm"
                  placeholder="Scripture foundation..."
                />
              </div>
            </div>
          )}

          {/* 6. Christian Faith */}
          {activeSection === "faith" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Christian Faith & Theological Profile
                </label>
                <textarea
                  rows={10}
                  value={profile.christianFaith}
                  onChange={(e) => setProfile({ ...profile, christianFaith: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] leading-relaxed font-sans text-sm"
                  placeholder="Statement of faith, doctrinal convictions, and core beliefs..."
                />
              </div>
            </div>
          )}

          {/* 7. Work & Daily Focus */}
          {activeSection === "work" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1">
                  Academic, Research & Teaching Work
                </label>
                <textarea
                  rows={6}
                  value={profile.myWork}
                  onChange={(e) => setProfile({ ...profile, myWork: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA] leading-relaxed font-sans text-sm"
                  placeholder="Summary of research, mathematics education, curriculum development..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-2">
                  Daily Focus Principles (Core Practices)
                </label>
                <div className="space-y-2">
                  {profile.dailyFocus?.map((focus, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={focus}
                      onChange={(e) => {
                        const updated = [...(profile.dailyFocus || [])];
                        updated[idx] = e.target.value;
                        setProfile({ ...profile, dailyFocus: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#9333EA]"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 8. Publications & Books */}
          {activeSection === "publications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">
                    Books, Research & Publications
                  </h4>
                  <p className="text-xs text-slate-500">
                    Add or modify books and academic publications
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPublication}
                  className="px-3 py-1.5 rounded-lg bg-[#16235A] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Publication
                </button>
              </div>

              <div className="space-y-3">
                {profile.publications?.map((pub, idx) => (
                  <div
                    key={pub.id || idx}
                    className="p-4 rounded-xl bg-white border border-[#E8E0F0] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={pub.title}
                        onChange={(e) => {
                          const updated = [...profile.publications];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setProfile({ ...profile, publications: updated });
                        }}
                        placeholder="Book / Research Title"
                        className="font-bold text-sm text-[#16235A] border-b border-slate-300 pb-1 flex-1 mr-3 focus:outline-hidden focus:border-[#9333EA]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePublication(pub.id)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete publication"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Field / Category</label>
                        <input
                          type="text"
                          value={pub.field}
                          onChange={(e) => {
                            const updated = [...profile.publications];
                            updated[idx] = { ...updated[idx], field: e.target.value };
                            setProfile({ ...profile, publications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Status</label>
                        <select
                          value={pub.status}
                          onChange={(e) => {
                            const updated = [...profile.publications];
                            updated[idx] = { ...updated[idx], status: e.target.value as any };
                            setProfile({ ...profile, publications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                        >
                          <option value="Published">Published</option>
                          <option value="In Research">In Research</option>
                          <option value="Curriculum">Curriculum</option>
                          <option value="Writing">Writing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Description & Synopsis</label>
                      <textarea
                        rows={2}
                        value={pub.description}
                        onChange={(e) => {
                          const updated = [...profile.publications];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setProfile({ ...profile, publications: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. Power Principles */}
          {activeSection === "principles" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">
                    Power Principles & Pillars
                  </h4>
                  <p className="text-xs text-slate-500">
                    Define the core life and faith principles displayed under Power Principles
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPrinciple}
                  className="px-3 py-1.5 rounded-lg bg-[#16235A] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Principle
                </button>
              </div>

              <div className="space-y-3">
                {(profile.powerPrinciples || []).map((prin, idx) => (
                  <div
                    key={prin.id || idx}
                    className="p-4 rounded-xl bg-white border border-[#E8E0F0] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={prin.title}
                        onChange={(e) => {
                          const updated = [...(profile.powerPrinciples || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setProfile({ ...profile, powerPrinciples: updated });
                        }}
                        placeholder="Principle Title"
                        className="font-bold text-sm text-[#16235A] border-b border-slate-300 pb-1 flex-1 mr-3 focus:outline-hidden focus:border-[#9333EA]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePrinciple(prin.id)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Scripture Reference</label>
                      <input
                        type="text"
                        value={prin.scripture || ""}
                        onChange={(e) => {
                          const updated = [...(profile.powerPrinciples || [])];
                          updated[idx] = { ...updated[idx], scripture: e.target.value };
                          setProfile({ ...profile, powerPrinciples: updated });
                        }}
                        placeholder="e.g. Philippians 4:13"
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={prin.description}
                        onChange={(e) => {
                          const updated = [...(profile.powerPrinciples || [])];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setProfile({ ...profile, powerPrinciples: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#DB2777] hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved & Live Synced!</span>
                </>
              ) : isSaving ? (
                <>
                  <Globe2 className="w-4 h-4 animate-spin text-white" />
                  <span>Saving & Syncing...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" />
                  <span>Save & Live Sync</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
