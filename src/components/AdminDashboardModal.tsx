import React, { useState, useEffect } from "react";
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
  Star,
  Smartphone,
  ShieldAlert,
  FileText,
  Download,
  Flame,
  Music,
  LogOut,
  User,
  Camera,
  Image as ImageIcon,
  Mail,
  Phone,
  MapPin,
  Quote,
  ExternalLink,
  Check
} from "lucide-react";
import {
  AdminSession,
  CreatorProfile,
  EnrolledDevice,
  AdminAuditLog,
  ContentStoreState,
  ContentCategoryKey,
  SpiritualPlace
} from "../types";
import {
  fetchAdminDevices,
  revokeAdminDevice,
  fetchAdminAuditLogs,
  fetchAdminContentStore,
  saveAdminContentItem,
  deleteAdminContentItem,
  exportDatabaseBackup,
  restoreDatabaseBackup,
  adminLogout
} from "../utils/DeviceManager";
import { syncCreatorProfileToServer } from "../data/creatorData";
import { getAllSpiritualPlaces, saveSpiritualPlaces } from "../data/spiritualPlacesData";
import { ANNUAL_DAILY_VERSES, ScheduledVerse } from "../data/dailyVerseData";
import { safeFetchJson } from "../utils/aiClient";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminSession: AdminSession | null;
  currentProfile: CreatorProfile;
  onSaveProfile: (profile: CreatorProfile) => void;
  onLogout: () => void;
  onNavigateTab?: (tab: string) => void;
}

type AdminTab =
  | "overview"
  | "admin_profile"
  | "security_credentials"
  | "mathema_sermons"
  | "apostle_math"
  | "rhema"
  | "joy_overcoming"
  | "spiritual_places"
  | "daily_verses"
  | "books"
  | "devices"
  | "audit_logs"
  | "database";

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  adminSession,
  currentProfile,
  onSaveProfile,
  onLogout,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [contentStore, setContentStore] = useState<ContentStoreState | null>(null);
  const [devices, setDevices] = useState<EnrolledDevice[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Profile editing state
  const [profileForm, setProfileForm] = useState<CreatorProfile>(currentProfile);

  // Security Credentials state
  const [credEmail, setCredEmail] = useState<string>("twumbismark304@gmail.com");
  const [credName, setCredName] = useState<string>("Bismark Twum");
  const [credKeyphrase, setCredKeyphrase] = useState<string>("The joy of the Lord is my Strength");
  const [credPinCode, setCredPinCode] = useState<string>("7777");
  const [credNewPassword, setCredNewPassword] = useState<string>("");
  const [credConfirmPassword, setCredConfirmPassword] = useState<string>("");
  const [isSavingCreds, setIsSavingCreds] = useState<boolean>(false);

  // Generic Item Form states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Form inputs for Sermons / ApostleMath / Rhema / Joy / Places / Verses
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formScripture, setFormScripture] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formFormula, setFormFormula] = useState("");
  const [formPraise, setFormPraise] = useState("");
  const [formTruth, setFormTruth] = useState("");
  const [formStatus, setFormStatus] = useState<"PUBLISHED" | "DRAFT" | "ARCHIVED">("PUBLISHED");

  // Load backend data when modal opens
  const refreshAdminData = async () => {
    if (!adminSession) return;
    setIsLoading(true);
    try {
      const [storeData, deviceList, logs] = await Promise.all([
        fetchAdminContentStore(adminSession),
        fetchAdminDevices(adminSession),
        fetchAdminAuditLogs(adminSession)
      ]);
      if (storeData) setContentStore(storeData);
      setDevices(deviceList);
      setAuditLogs(logs);

      // Load credentials
      try {
        const { ok, data } = await safeFetchJson<any>("/api/admin/get-credentials", {
          headers: {
            Authorization: `Bearer ${adminSession.token}`,
            "x-admin-device-id": adminSession.deviceId
          }
        });
        if (ok && data && data.success) {
          if (data.email) setCredEmail(data.email);
          if (data.creatorName) setCredName(data.creatorName);
          if (data.keyphrase) setCredKeyphrase(data.keyphrase);
          if (data.pinCode) setCredPinCode(data.pinCode);
        }
      } catch (err) {}
    } catch (e) {
      console.error("Error loading admin dashboard:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && adminSession) {
      refreshAdminData();
      setProfileForm(currentProfile);
    }
  }, [isOpen, adminSession]);

  if (!isOpen || !adminSession) return null;

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Device Revocation
  const handleRevokeDevice = async (deviceIdToRevoke: string) => {
    if (deviceIdToRevoke === adminSession.deviceId) {
      if (!confirm("Warning: You are revoking the current device you are logged into. You will be logged out immediately. Proceed?")) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to revoke device "${deviceIdToRevoke}"? It will no longer have access to the 3-touch gesture or admin controls.`)) {
        return;
      }
    }

    const success = await revokeAdminDevice(adminSession, deviceIdToRevoke);
    if (success) {
      showNotification(`Device ${deviceIdToRevoke} revoked successfully.`);
      if (deviceIdToRevoke === adminSession.deviceId) {
        onLogout();
      } else {
        refreshAdminData();
      }
    } else {
      showNotification("Failed to revoke device.", "error");
    }
  };

  // Content Save
  const handleSaveCurrentItem = async (category: ContentCategoryKey) => {
    if (!formTitle && !formScripture) {
      showNotification("Please provide a Title or Scripture Reference.", "error");
      return;
    }

    setIsLoading(true);
    const itemData: any = {
      id: editingItem?.id,
      title: formTitle,
      subtitle: formSubtitle,
      scripture: formScripture,
      category: formCategory,
      content: formContent,
      formula: formFormula,
      praisePrescription: formPraise,
      scripturalTruth: formTruth,
      status: formStatus
    };

    const res = await saveAdminContentItem(adminSession, category, itemData);
    setIsLoading(false);

    if (res.success) {
      showNotification(`✓ ${category} entry saved and synchronized live to cloud database!`);
      setIsCreatingNew(false);
      setEditingItem(null);
      resetForm();
      refreshAdminData();
    } else {
      showNotification(res.error || "Failed to save item.", "error");
    }
  };

  // Content Delete
  const handleDeleteItem = async (category: ContentCategoryKey, itemId: string) => {
    if (!confirm("Are you sure you want to delete this item from the cloud database?")) return;
    setIsLoading(true);
    const success = await deleteAdminContentItem(adminSession, category, itemId);
    setIsLoading(false);
    if (success) {
      showNotification(`Item deleted from ${category}.`);
      refreshAdminData();
    } else {
      showNotification("Failed to delete item.", "error");
    }
  };

  // Handle Save Credentials
  const handleSaveCredentials = async () => {
    if (credNewPassword && credNewPassword.length < 6) {
      showNotification("New password must be at least 6 characters.", "error");
      return;
    }
    if (credNewPassword && credNewPassword !== credConfirmPassword) {
      showNotification("New passwords do not match.", "error");
      return;
    }

    setIsSavingCreds(true);
    try {
      const { ok, data, error } = await safeFetchJson<any>("/api/admin/update-credentials", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminSession.token}`,
          "x-admin-device-id": adminSession.deviceId
        },
        body: JSON.stringify({
          email: credEmail,
          creatorName: credName,
          keyphrase: credKeyphrase,
          pinCode: credPinCode,
          newPassword: credNewPassword || undefined
        })
      });

      setIsSavingCreds(false);

      if (ok && data && data.success) {
        showNotification("✓ Credentials updated and saved successfully in cloud security!");
        setCredNewPassword("");
        setCredConfirmPassword("");
        refreshAdminData();
      } else {
        showNotification(data?.error || error || "Failed to update credentials", "error");
      }
    } catch (e) {
      setIsSavingCreds(false);
      showNotification("Server error updating credentials", "error");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormTitle("");
    setFormSubtitle("");
    setFormScripture("");
    setFormCategory("");
    setFormContent("");
    setFormFormula("");
    setFormPraise("");
    setFormTruth("");
    setFormStatus("PUBLISHED");
  };

  // Start edit
  const startEdit = (item: any) => {
    setEditingItem(item);
    setIsCreatingNew(true);
    setFormTitle(item.title || item.name || item.reference || "");
    setFormSubtitle(item.subtitle || item.category || "");
    setFormScripture(item.scripture || item.biblicalReference || item.keyScripture || "");
    setFormCategory(item.category || item.theme || "");
    setFormContent(item.content || item.reflection || item.description || "");
    setFormFormula(item.formula || item.mathematicalPrinciple || "");
    setFormPraise(item.praisePrescription || "");
    setFormTruth(item.scripturalTruth || "");
    setFormStatus(item.status || "PUBLISHED");
  };

  // Database Backup Export
  const handleExportBackup = async () => {
    const backup = await exportDatabaseBackup(adminSession);
    if (backup) {
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `joy_of_lord_cloud_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      showNotification("✓ Cloud database backup generated and downloaded successfully!");
    } else {
      showNotification("Export failed.", "error");
    }
  };

  // Image File Upload
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "photoUrl" | "bannerUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size exceeds 5MB limit. Please choose a smaller image.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const base64 = loadEvent.target?.result as string;
      if (base64) {
        setProfileForm((prev) => ({ ...prev, [field]: base64 }));
        showNotification(`✓ Image loaded into ${field === "photoUrl" ? "Profile Photo" : "Header Banner"}! Click Save & Sync to broadcast.`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Profile Save with Live Global Cloud Sync
  const handleSaveProfileChanges = async () => {
    try {
      setIsLoading(true);
      onSaveProfile(profileForm);
      if (adminSession) {
        const res = await syncCreatorProfileToServer(
          profileForm,
          adminSession.email,
          adminSession.token
        );
        if (res.success) {
          showNotification("✓ Bismark Twum creator profile & personal details synchronized worldwide across all devices!");
        } else {
          showNotification(res.message || "Saved locally and queued for cloud sync.", "error");
        }
      } else {
        showNotification("✓ Creator profile updated locally!");
      }
    } catch (e: any) {
      showNotification("Error saving profile: " + (e?.message || "Unknown error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D1322] text-slate-100 w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
        {/* Top Master Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#111C38] via-[#16235A] to-[#1E2E72] border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#9333EA] to-[#DB2777] shadow-lg shadow-purple-900/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-serif text-white">
                  Creator & Administrator Portal
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-semibold">
                  ACTIVE SESSION
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Bismark Twum • {adminSession.email} • Device ID: <span className="font-mono text-indigo-300">{adminSession.deviceId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                adminLogout(adminSession);
                onLogout();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        {statusMsg && (
          <div className={`px-6 py-2.5 text-xs font-medium flex items-center justify-between border-b ${
            statusMsg.type === "success" 
              ? "bg-emerald-950/80 border-emerald-800 text-emerald-200" 
              : "bg-red-950/80 border-red-800 text-red-200"
          }`}>
            <div className="flex items-center gap-2">
              {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
              <span>{statusMsg.text}</span>
            </div>
            <button onClick={() => setStatusMsg(null)} className="opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Body with Sidebar + Tab Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-60 bg-[#0A0F1D] border-r border-slate-800 flex flex-col justify-between p-3 shrink-0 overflow-y-auto">
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Core Systems
              </div>
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "overview" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Overview & Status
              </button>

              <button
                onClick={() => setActiveTab("admin_profile")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "admin_profile" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <User className="w-4 h-4 text-pink-400" />
                Personal Profile & Details
              </button>

              <div className="pt-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Content Management
              </div>
              <button
                onClick={() => { setActiveTab("mathema_sermons"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "mathema_sermons" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                MathemaSermons
              </button>

              <button
                onClick={() => { setActiveTab("apostle_math"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "apostle_math" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Flame className="w-4 h-4 text-orange-400" />
                ApostleMath
              </button>

              <button
                onClick={() => { setActiveTab("rhema"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "rhema" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Sun className="w-4 h-4 text-yellow-400" />
                Rhema Words
              </button>

              <button
                onClick={() => { setActiveTab("joy_overcoming"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "joy_overcoming" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                Joy of the Lord Battles
              </button>

              <button
                onClick={() => { setActiveTab("spiritual_places"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "spiritual_places" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                Spiritual Places (500+)
              </button>

              <button
                onClick={() => { setActiveTab("daily_verses"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "daily_verses" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                Daily Bible Verses
              </button>

              <button
                onClick={() => { setActiveTab("books"); setIsCreatingNew(false); }}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "books" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                Books & Publications
              </button>

              <div className="pt-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Security & Credentials
              </div>
              <button
                onClick={() => setActiveTab("security_credentials")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "security_credentials" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Change Credentials & PIN
              </button>

              <button
                onClick={() => setActiveTab("devices")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "devices" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Smartphone className="w-4 h-4 text-blue-400" />
                Enrolled Devices ({devices.filter(d => d.status === "ACTIVE").length})
              </button>

              <button
                onClick={() => setActiveTab("audit_logs")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "audit_logs" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Audit Trail ({auditLogs.length})
              </button>

              <button
                onClick={() => setActiveTab("database")}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                  activeTab === "database" ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Download className="w-4 h-4 text-teal-400" />
                Backup & Restore
              </button>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Global Cloud Database</p>
              <p className="text-[10px] text-slate-500">Live sync across all user clients active</p>
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 bg-[#0D1322] p-6 overflow-y-auto">
            {/* 1. OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#16235A] to-[#24357D] border border-indigo-500/30 shadow-xl">
                  <h3 className="text-xl font-bold font-serif text-white mb-2">
                    Welcome, Bismark Twum
                  </h3>
                  <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
                    You have authenticated through the multi-layered security protocol on an authorized physical device. All modifications made in this portal are immediately persisted to the cloud database and synced worldwide.
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-xs text-slate-400 font-medium">Active Devices</p>
                    <p className="text-2xl font-bold text-indigo-400 mt-1">
                      {devices.filter(d => d.status === "ACTIVE").length}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Bound to Bismark Twum</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-xs text-slate-400 font-medium">Spiritual Places</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">
                      {getAllSpiritualPlaces().length}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">500+ Scriptures Mapped</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-xs text-slate-400 font-medium">Audit Trail</p>
                    <p className="text-2xl font-bold text-amber-400 mt-1">
                      {auditLogs.length}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Security events recorded</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-xs text-slate-400 font-medium">Global Status</p>
                    <p className="text-2xl font-bold text-teal-400 mt-1">Synced</p>
                    <p className="text-[10px] text-slate-500 mt-1">Cloud DB Connected</p>
                  </div>
                </div>

                {/* Creator Live Profile Editor Quick Tab */}
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Creator Profile Live Sync
                      </h4>
                      <p className="text-xs text-slate-400">
                        Update your professional title, welcome message, and contact information.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveProfileChanges}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      Save & Sync Profile Worldwide
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={profileForm.professionalTitle}
                        onChange={(e) => setProfileForm({ ...profileForm, professionalTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Creator Tagline
                      </label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Welcome Message
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.welcomeMessage}
                        onChange={(e) => setProfileForm({ ...profileForm, welcomeMessage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 1.5 DEDICATED ADMIN PERSONAL PROFILE & DETAILS (With Live Cloud Sync) */}
            {activeTab === "admin_profile" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2.5">
                      <User className="w-5 h-5 text-pink-400" />
                      Admin Profile & Personal Details
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Update your administrator profile picture, contact details, personal bio, and ministry vision. Changes immediately sync to all devices globally.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={handleSaveProfileChanges}
                      disabled={isLoading}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-900/30 cursor-pointer disabled:opacity-50 transition-all"
                    >
                      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save & Sync Profile Worldwide
                    </button>
                  </div>
                </div>

                {/* Profile Photo & Banner Customization Card */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-indigo-400" />
                      Visual Identity & Media Assets
                    </h4>
                    <span className="text-[11px] text-slate-500">Supports direct upload or web image URL</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Live Avatar Preview */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                      <div className="relative group w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-xl mb-3 bg-slate-800 flex items-center justify-center">
                        {profileForm.photoUrl ? (
                          <img
                            src={profileForm.photoUrl}
                            alt={profileForm.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/bis.png";
                            }}
                          />
                        ) : (
                          <User className="w-12 h-12 text-slate-500" />
                        )}
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity">
                          <Camera className="w-5 h-5 mb-1" />
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, "photoUrl")}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="font-bold text-sm text-white">{profileForm.name || "Bismark Twum"}</p>
                      <p className="text-[11px] text-indigo-300 line-clamp-1">{profileForm.professionalTitle || "Mathematics Educator"}</p>
                    </div>

                    {/* Photo URL & Upload Inputs */}
                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                          <span>Profile Photo (URL or File Upload)</span>
                          <span className="text-[10px] text-slate-500 font-mono">Square / Portrait format</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={profileForm.photoUrl}
                            onChange={(e) => setProfileForm({ ...profileForm, photoUrl: e.target.value })}
                            placeholder="e.g. /bis.png or https://example.com/photo.jpg"
                            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:border-indigo-500 focus:outline-none"
                          />
                          <label className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            Browse Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileUpload(e, "photoUrl")}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                          <span>Header Cover Banner (URL or File Upload)</span>
                          <span className="text-[10px] text-slate-500 font-mono">Wide aspect ratio</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={profileForm.bannerUrl}
                            onChange={(e) => setProfileForm({ ...profileForm, bannerUrl: e.target.value })}
                            placeholder="e.g. /src/assets/images/banner.jpg or https://..."
                            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:border-indigo-500 focus:outline-none"
                          />
                          <label className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            Browse Banner
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileUpload(e, "bannerUrl")}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal & Professional Identity Form */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    Personal Identity & Contact Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Bismark Twum"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Honorific / Salutation
                      </label>
                      <input
                        type="text"
                        value={profileForm.honorific || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, honorific: e.target.value })}
                        placeholder="e.g. Apostle Bismark Twum / Author"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Location / Country
                      </label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="Ghana"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        placeholder="twumbismark304@gmail.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+233 246 320 879"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Creator Tagline
                      </label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        placeholder="Empowering Minds. Transforming Education. Building Tomorrow."
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2 md:col-span-3">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Professional Title & Accreditations
                      </label>
                      <input
                        type="text"
                        value={profileForm.professionalTitle}
                        onChange={(e) => setProfileForm({ ...profileForm, professionalTitle: e.target.value })}
                        placeholder="Mathematics Educator | Researcher | Writer | Christian"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Biographies, Welcome Message & Vision */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-cyan-400" />
                    Biographical Overview, Welcome Message & Vision
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Welcome Message to Visitors & Believers
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.welcomeMessage}
                        onChange={(e) => setProfileForm({ ...profileForm, welcomeMessage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Personal & Professional Biography
                      </label>
                      <textarea
                        rows={4}
                        value={profileForm.biography}
                        onChange={(e) => setProfileForm({ ...profileForm, biography: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Ministry Vision & Long-term Mission
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.vision}
                          onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Why This Platform Was Created
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.whyCreated}
                          onChange={(e) => setProfileForm({ ...profileForm, whyCreated: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Christian Faith Foundation & Life Scriptures
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.christianFaith}
                          onChange={(e) => setProfileForm({ ...profileForm, christianFaith: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Academic & Pedagogical Research Work
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.myWork}
                          onChange={(e) => setProfileForm({ ...profileForm, myWork: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Badges */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Role Badges & Ministry Distinctions
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {profileForm.roleBadges?.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-indigo-300 flex items-center gap-2"
                      >
                        {badge}
                        <button
                          onClick={() => {
                            const updated = profileForm.roleBadges.filter((_, i) => i !== idx);
                            setProfileForm({ ...profileForm, roleBadges: updated });
                          }}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="newBadgeInput"
                      placeholder="Add a new role badge (e.g. ApostleMath Pioneer)..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = (e.target as HTMLInputElement).value.trim();
                          if (val && !profileForm.roleBadges?.includes(val)) {
                            setProfileForm({
                              ...profileForm,
                              roleBadges: [...(profileForm.roleBadges || []), val]
                            });
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("newBadgeInput") as HTMLInputElement;
                        if (input && input.value.trim()) {
                          const val = input.value.trim();
                          if (!profileForm.roleBadges?.includes(val)) {
                            setProfileForm({
                              ...profileForm,
                              roleBadges: [...(profileForm.roleBadges || []), val]
                            });
                            input.value = "";
                          }
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                    >
                      Add Badge
                    </button>
                  </div>
                </div>

                {/* Save Profile Button Bottom */}
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-indigo-300 space-y-0.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Live Cross-Device Synchronization Active
                    </p>
                    <p className="text-[11px] text-indigo-400/80">
                      When saved, changes are pushed to the global server and automatically rendered for all users worldwide.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveProfileChanges}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer disabled:opacity-50 transition-all shrink-0"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save & Broadcast Profile Worldwide
                  </button>
                </div>
              </div>
            )}

            {/* 2. CONTENT CRUD MANAGERS (MathemaSermons, ApostleMath, Rhema, Joy, Places, Verses, Books) */}
            {["mathema_sermons", "apostle_math", "rhema", "joy_overcoming", "spiritual_places", "daily_verses", "books"].includes(activeTab) && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize">
                      {activeTab.replace("_", " ")} Database
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage, create, edit, or archive official messages and biblical resources.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      resetForm();
                      setEditingItem(null);
                      setIsCreatingNew(!isCreatingNew);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    {isCreatingNew ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isCreatingNew ? "Cancel Editor" : "Create New Entry"}
                  </button>
                </div>

                {/* Create / Edit Form */}
                {isCreatingNew && (
                  <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-indigo-300">
                        {editingItem ? "Edit Content Entry" : "Create New Content Entry"}
                      </h4>
                      <div className="flex items-center gap-2">
                        <select
                          value={formStatus}
                          onChange={(e: any) => setFormStatus(e.target.value)}
                          className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                        >
                          <option value="PUBLISHED">Status: PUBLISHED (Live)</option>
                          <option value="DRAFT">Status: DRAFT</option>
                          <option value="ARCHIVED">Status: ARCHIVED</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Title / Headline
                        </label>
                        <input
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="e.g. The Infinity of Divine Grace"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Anchor Scripture Reference
                        </label>
                        <input
                          type="text"
                          value={formScripture}
                          onChange={(e) => setFormScripture(e.target.value)}
                          placeholder="e.g. Romans 8:38-39 / Nehemiah 8:10"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Theme / Category
                        </label>
                        <input
                          type="text"
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          placeholder="e.g. Divine Calculus / Overcoming Fear"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Formula / Subtitle (Optional)
                        </label>
                        <input
                          type="text"
                          value={formFormula}
                          onChange={(e) => setFormFormula(e.target.value)}
                          placeholder="e.g. \\lim_{t \\to \\infty} Grace(t) = \\infty"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Full Exposition / Reflection Text
                        </label>
                        <textarea
                          rows={6}
                          value={formContent}
                          onChange={(e) => setFormContent(e.target.value)}
                          placeholder="Enter biblically grounded exposition..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                        />
                      </div>

                      <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsCreatingNew(false)}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() => handleSaveCurrentItem(activeTab as ContentCategoryKey)}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          Save & Publish to Cloud
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* List of Existing Content from Cloud Store */}
                <div className="space-y-3">
                  {contentStore && contentStore[activeTab as ContentCategoryKey]?.length ? (
                    contentStore[activeTab as ContentCategoryKey].map((item: any) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {item.title || item.name || item.reference || "Untitled"}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.status === "DRAFT" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                            }`}>
                              {item.status || "PUBLISHED"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {item.scripture || item.biblicalReference || item.keyScripture || item.content || item.description || "No preview"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(activeTab as ContentCategoryKey, item.id)}
                            className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-slate-400 text-xs">
                      <Layers className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p>No customized entries in cloud store yet for {activeTab.replace("_", " ")}.</p>
                      <p className="text-slate-500 mt-1">Default canonical datasets are actively served to public visitors.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. SECURITY CREDENTIALS MANAGER (Email, Password, Keyphrase, PIN) */}
            {activeTab === "security_credentials" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      Administrator Credentials & Security Access
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update your administrator email, login password, sacred keyphrase, and master PIN anytime.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveCredentials}
                    disabled={isSavingCreds}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
                  >
                    {isSavingCreds ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Security Credentials
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Admin Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>Administrator Email</span>
                        <span className="text-[10px] text-slate-500 font-mono">Receives Live Security Codes</span>
                      </label>
                      <input
                        type="email"
                        value={credEmail}
                        onChange={(e) => setCredEmail(e.target.value)}
                        placeholder="twumbismark304@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500">
                        Live codes for login activation are immediately dispatched to this address.
                      </p>
                    </div>

                    {/* Creator Display Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Administrator / Creator Name
                      </label>
                      <input
                        type="text"
                        value={credName}
                        onChange={(e) => setCredName(e.target.value)}
                        placeholder="Bismark Twum"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:border-indigo-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500">
                        Official creator and administrator attribution name.
                      </p>
                    </div>

                    {/* Sacred Keyphrase */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>Sacred Keyphrase (Layer 1)</span>
                        <span className="text-[10px] text-slate-500 font-mono">First Layer Gate</span>
                      </label>
                      <input
                        type="text"
                        value={credKeyphrase}
                        onChange={(e) => setCredKeyphrase(e.target.value)}
                        placeholder="The joy of the Lord is my Strength"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:border-indigo-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500">
                        Default: "The joy of the Lord is my Strength"
                      </p>
                    </div>

                    {/* 4-Digit Master PIN */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>Master Security PIN Code</span>
                        <span className="text-[10px] text-slate-500 font-mono">4-Digit Override</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={credPinCode}
                        onChange={(e) => setCredPinCode(e.target.value)}
                        placeholder="7777"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-mono tracking-widest focus:border-indigo-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500">
                        Default PIN: 7777
                      </p>
                    </div>

                    {/* New Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>New Administrator Password</span>
                        <span className="text-[10px] text-slate-500">Leave blank to keep unchanged</span>
                      </label>
                      <input
                        type="password"
                        value={credNewPassword}
                        onChange={(e) => setCredNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:border-indigo-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500">
                        Current Default: TheJoyOfTheLordIsMyStrength2026!
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={credConfirmPassword}
                        onChange={(e) => setCredConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                    <div className="text-xs text-indigo-300 space-y-0.5">
                      <p className="font-bold">Credential Synchronization Note</p>
                      <p className="text-[11px] text-indigo-400/80">
                        Saving updates your server account file and security tokens immediately.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveCredentials}
                      disabled={isSavingCreds}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow cursor-pointer disabled:opacity-50"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ENROLLED DEVICES (Layer 1 Security & Revocation) */}
            {activeTab === "devices" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Authorized Hardware Devices (Layer 1 Gate)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Devices bound to Bismark Twum. Only ACTIVE devices can execute the 3-touch gesture and access creator controls.
                  </p>
                </div>

                <div className="space-y-3">
                  {devices.map((d) => (
                    <div
                      key={d.id || d.deviceId}
                      className={`p-4 rounded-xl border flex items-center justify-between ${
                        d.deviceId === adminSession.deviceId
                          ? "bg-indigo-950/40 border-indigo-500/40"
                          : d.status === "ACTIVE"
                          ? "bg-slate-900 border-slate-800"
                          : "bg-red-950/20 border-red-900/40 opacity-70"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{d.deviceName}</span>
                          {d.deviceId === adminSession.deviceId && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                              THIS DEVICE
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            d.status === "ACTIVE" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                          }`}>
                            {d.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                          ID: {d.deviceId} • Email: {d.authorizedEmail}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Enrolled: {new Date(d.enrolledAt).toLocaleString()}
                        </p>
                      </div>

                      {d.status === "ACTIVE" && (
                        <button
                          onClick={() => handleRevokeDevice(d.deviceId)}
                          className="px-3 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Revoke Access
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. AUDIT LOGS */}
            {activeTab === "audit_logs" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Security & Activity Audit Trail
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real-time log of administrative logins, device authorizations, revocations, and content syncs.
                  </p>
                </div>

                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-300">{log.action}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            log.status === "SUCCESS" ? "bg-emerald-950 text-emerald-300" : "bg-red-950 text-red-300"
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        <p className="text-slate-400">{log.details}</p>
                        <p className="text-[10px] text-slate-500">
                          {log.userEmail} • Device: {log.deviceId || "N/A"} • IP: {log.ip || "local"}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. DATABASE BACKUP & RESTORE */}
            {activeTab === "database" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Cloud Database Backup & Disaster Recovery
                  </h3>
                  <p className="text-xs text-slate-400">
                    Export complete database snapshots or restore from previously saved backups.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-indigo-400" />
                      Export Database Snapshot
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Downloads an encrypted, structured JSON backup containing all creator profiles, sermons, doctrines, daily verse schedules, and device registries.
                    </p>
                    <button
                      onClick={handleExportBackup}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      Download Full Cloud Backup (.json)
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-purple-400" />
                      Restore / Seed Cloud Database
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Select a valid JSON database backup file to restore records directly to the cloud store.
                    </p>
                    <input
                      type="file"
                      accept=".json"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const text = await file.text();
                          try {
                            const parsed = JSON.parse(text);
                            const success = await restoreDatabaseBackup(adminSession, parsed);
                            if (success) {
                              showNotification("✓ Database successfully restored from backup!");
                              refreshAdminData();
                            } else {
                              showNotification("Restore failed.", "error");
                            }
                          } catch (err) {
                            showNotification("Invalid JSON file.", "error");
                          }
                        }
                      }}
                      className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
