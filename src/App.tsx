import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { AppSidebar } from "./components/AppSidebar";
import { BottomNav } from "./components/BottomNav";
import { HomeTab } from "./components/HomeTab";
import { BibleTab } from "./components/BibleTab";
import { ApostleMathTab } from "./components/ApostleMathTab";
import { MathemaSermonsTab } from "./components/MathemaSermonsTab";
import { RhemaTab } from "./components/RhemaTab";
import { JoyOvercomingTab } from "./components/JoyOvercomingTab";
import { DoctrinesTab } from "./components/DoctrinesTab";
import { QuotesTab } from "./components/QuotesTab";
import { BooksTab } from "./components/BooksTab";
import { PrayersTab } from "./components/PrayersTab";
import { HymnalsTab } from "./components/HymnalsTab";
import { SpiritualPlacesTab } from "./components/SpiritualPlacesTab";
import { AboutCreatorTab } from "./components/AboutCreatorTab";
import { EditCreatorProfileModal, ProfileSectionKey } from "./components/EditCreatorProfileModal";
import { SecureAdminLoginModal } from "./components/SecureAdminLoginModal";
import { AdminDashboardModal } from "./components/AdminDashboardModal";
import { AppFooter } from "./components/AppFooter";
import { DevotionDetailModal } from "./components/DevotionDetailModal";
import { ShareCardModal } from "./components/ShareCardModal";
import { BookmarksModal } from "./components/BookmarksModal";
import { InstallAppModal } from "./components/InstallAppModal";
import { InstallAppBanner } from "./components/InstallAppBanner";
import { QuotePictureModal, QuotePictureItem } from "./components/QuotePictureModal";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { useTimeSchedule } from "./hooks/useTimeSchedule";
import { useBookmarksAndJournal } from "./hooks/useBookmarksAndJournal";
import { Devotion, BookmarkItem, CreatorProfile, AdminSession, TabType } from "./types";
import {
  loadCreatorProfile,
  saveCreatorProfile,
  fetchLiveCreatorProfile,
  syncCreatorProfileToServer
} from "./data/creatorData";
import {
  getStoredAdminSession,
  clearAdminSession,
  checkDeviceAuthorization,
  fetchPublicPublishedContent
} from "./utils/DeviceManager";

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // PWA Cross-Platform Installation & Network Engine
  const {
    isInstalled,
    isInstallable,
    platform,
    isOnline,
    isBannerDismissed,
    promptInstall,
    dismissBanner
  } = usePWAInstall();
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Handle URL Hash Navigation (e.g. from PWA shortcuts /#bible, /#apostle_math, /#prayer)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").trim();
      const validTabs: TabType[] = [
        "home",
        "bible",
        "spiritual_places",
        "apostle_math",
        "mathema_sermons",
        "rhema",
        "joy_overcoming",
        "hymnals",
        "library",
        "prayer",
        "creator",
        "quotes",
        "doctrines"
      ];
      if (hash && validTabs.includes(hash as TabType)) {
        setActiveTab(hash as TabType);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sidebar Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Creator Profile State & Persistence
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>(() => loadCreatorProfile());
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editProfileInitialSection, setEditProfileInitialSection] = useState<ProfileSectionKey | undefined>(undefined);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isSecureAdminLoginOpen, setIsSecureAdminLoginOpen] = useState(false);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getStoredAdminSession());
  const [selectedQuoteForPicture, setSelectedQuoteForPicture] = useState<QuotePictureItem | null>(null);

  // Hidden 3-Touch / Triple-Action Gesture Listener (Gated by Layer 1 Device Authorization)
  useEffect(() => {
    let tapCount = 0;
    let tapResetTimeout: any;

    const triggerAdminFlow = async () => {
      const authStatus = await checkDeviceAuthorization();
      if (authStatus.isAuthorized) {
        if (adminSession) {
          setIsAdminDashboardOpen(true);
        } else {
          setIsSecureAdminLoginOpen(true);
        }
      }
    };

    // Mobile: 3 simultaneous finger touch OR 3 rapid taps
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 3) {
        triggerAdminFlow();
        return;
      }

      tapCount += 1;
      clearTimeout(tapResetTimeout);
      tapResetTimeout = setTimeout(() => {
        tapCount = 0;
      }, 600);

      if (tapCount >= 3) {
        tapCount = 0;
        triggerAdminFlow();
      }
    };

    // Desktop/Touch Triple-Click Stealth Hotkey (Ctrl + Alt + A, or rapid 3-touch sequence)
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") || (e.metaKey && e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        const authStatus = await checkDeviceAuthorization();
        if (authStatus.isAuthorized) {
          if (adminSession) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsSecureAdminLoginOpen(true);
          }
        } else {
          // Allow enrollment modal to open on explicit developer keystroke
          setIsSecureAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(tapResetTimeout);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [adminSession]);

  // Bible Reader targeted chapter navigation
  const [targetBibleBook, setTargetBibleBook] = useState<string>("Genesis");
  const [targetBibleChapter, setTargetBibleChapter] = useState<number>(1);
  const [targetBibleVerse, setTargetBibleVerse] = useState<number | undefined>(undefined);

  // Sync latest creator profile and published content from global backend server
  const syncWithGlobalServer = useCallback(async () => {
    try {
      const [liveProfile, cloudContent] = await Promise.allSettled([
        fetchLiveCreatorProfile(),
        fetchPublicPublishedContent()
      ]);
      if (liveProfile.status === "fulfilled" && liveProfile.value) {
        setCreatorProfile(liveProfile.value);
      }
      if (cloudContent.status === "fulfilled" && cloudContent.value) {
        window.dispatchEvent(new CustomEvent("cloudContentUpdated", { detail: cloudContent.value }));
      }
    } catch (e) {
      console.warn("Global cloud sync check:", e);
    }
  }, []);

  useEffect(() => {
    syncWithGlobalServer();
    // Auto sync on tab focus or visibility change across devices
    const handleFocus = () => syncWithGlobalServer();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("visibilitychange", handleFocus);

    // Periodic sync check every 45 seconds for active sessions
    const interval = setInterval(syncWithGlobalServer, 45000);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("visibilitychange", handleFocus);
      clearInterval(interval);
    };
  }, [syncWithGlobalServer]);

  // Handle saving creator profile with automatic Global Server Sync
  const handleUpdateCreatorProfile = async (updated: CreatorProfile) => {
    // Save locally first
    setCreatorProfile(updated);
    saveCreatorProfile(updated);

    // If authenticated as Admin, sync to backend server
    if (adminSession) {
      const result = await syncCreatorProfileToServer(
        updated,
        adminSession.email,
        adminSession.token
      );
      if (result.success) {
        console.log("Global sync complete:", result.message);
      }
    }
  };

  const handleAdminLoginSuccess = (session: AdminSession) => {
    setAdminSession(session);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    clearAdminSession();
    setAdminSession(null);
    setIsAdminDashboardOpen(false);
    setIsEditProfileOpen(false);
  };

  const handleOpenEditRequest = async (section?: ProfileSectionKey) => {
    if (section) {
      setEditProfileInitialSection(section);
    }
    if (adminSession) {
      if (section) {
        setIsEditProfileOpen(true);
      } else {
        setIsAdminDashboardOpen(true);
      }
    } else {
      const authStatus = await checkDeviceAuthorization();
      setIsSecureAdminLoginOpen(true);
    }
  };

  // Time-based Scheduling Engine
  const {
    scheduleState,
    activeEdition,
    activeDailyScripture,
    activeDevotion,
    activeScheduledVerse,
    setPreviewEdition,
    resetToRealTime
  } = useTimeSchedule();

  // Bookmarks, Journal, Streak, and TTS Audio
  const {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    journal,
    addJournalEntry,
    markPrayerAnswered,
    deleteJournalEntry,
    streakDays,
    completedDevotions,
    completeDevotion,
    isSpeaking,
    speakText,
    stopSpeaking
  } = useBookmarksAndJournal();

  // Modal States
  const [selectedDevotionModal, setSelectedDevotionModal] = useState<Devotion | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [shareCardData, setShareCardData] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    reference?: string;
    subtext?: string;
  }>({
    isOpen: false,
    title: "",
    text: ""
  });

  const handleOpenShare = (title: string, text: string, reference?: string, subtext?: string) => {
    setShareCardData({
      isOpen: true,
      title,
      text,
      reference,
      subtext
    });
  };

  const handleNavigateToBibleChapter = (book: string, chapter: number, verse?: number) => {
    setTargetBibleBook(book);
    setTargetBibleChapter(chapter);
    setTargetBibleVerse(verse);
    setActiveTab("bible");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectBookmark = (bookmark: BookmarkItem) => {
    setIsBookmarksOpen(false);
    if (bookmark.type === "scripture" || bookmark.type === "devotion") {
      setActiveTab("home");
    } else if (bookmark.type === "quote") {
      setActiveTab("quotes");
    } else if (bookmark.type === "book") {
      setActiveTab("library");
    } else if (bookmark.type === "bible") {
      setActiveTab("bible");
    } else if (bookmark.type === "doctrine") {
      setActiveTab("doctrines");
    } else if (bookmark.type === "prayer") {
      setActiveTab("prayer");
    } else if (bookmark.type === "rhema") {
      setActiveTab("rhema");
    } else if (bookmark.type === "sermon") {
      setActiveTab("mathema_sermons");
    } else if (bookmark.type === "joy_overcoming") {
      setActiveTab("joy_overcoming");
    } else if (bookmark.type === "hymn") {
      setActiveTab("hymnals");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFE] text-[#16235A] flex flex-row font-sans selection:bg-[#B48C35]/20 selection:text-[#16235A]">
      {/* 1. Desktop & Mobile Vertical Sidebar Navigation */}
      <AppSidebar
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isFounderLoggedIn={!!adminSession}
        isInstalled={isInstalled}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* 2. Main Body Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          scheduleState={scheduleState}
          onSelectEditionPreview={setPreviewEdition}
          onResetTime={resetToRealTime}
          streakDays={streakDays}
          bookmarksCount={bookmarks.length}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          onOpenScheduleModal={() => {}}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          isInstalled={isInstalled}
          isOnline={isOnline}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
          isSpeaking={isSpeaking}
          onStopSpeaking={stopSpeaking}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
          {activeTab === "home" && (
            <HomeTab
              scheduleState={scheduleState}
              dailyScripture={activeDailyScripture}
              scheduledVerse={activeScheduledVerse}
              devotion={activeDevotion}
              onOpenDevotion={(dev) => setSelectedDevotionModal(dev)}
              onSelectEditionPreview={setPreviewEdition}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              completedDevotions={completedDevotions}
              onCompleteDevotion={completeDevotion}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
              onNavigateToBibleChapter={handleNavigateToBibleChapter}
              profile={creatorProfile}
              onOpenAbout={() => setActiveTab("creator")}
              onOpenQuotePictureModal={(item) => setSelectedQuoteForPicture(item)}
            />
          )}

          {activeTab === "bible" && (
            <BibleTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              targetBookName={targetBibleBook}
              targetChapter={targetBibleChapter}
              targetVerse={targetBibleVerse}
              onExploreMathemaSermon={() => setActiveTab("mathema_sermons")}
              onExploreApostleMath={() => setActiveTab("apostle_math")}
            />
          )}

          {(activeTab === "spiritual_places" || activeTab === "places") && (
            <SpiritualPlacesTab
              onNavigateToBibleChapter={handleNavigateToBibleChapter}
              onOpenDevotion={(dev) => setSelectedDevotionModal(dev)}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
            />
          )}

          {(activeTab === "apostle_math" || activeTab === "math") && (
            <ApostleMathTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              onNavigateToBible={(book, ch, v) => handleNavigateToBibleChapter(book, ch, v)}
            />
          )}

          {activeTab === "mathema_sermons" && (
            <MathemaSermonsTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              onNavigateToBible={(book, ch, v) => handleNavigateToBibleChapter(book, ch, v)}
              onExploreApostleMath={() => setActiveTab("apostle_math")}
            />
          )}

          {activeTab === "rhema" && (
            <RhemaTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              onNavigateToBible={(book, ch, v) => handleNavigateToBibleChapter(book, ch, v)}
              onOpenDevotion={(dev) => setSelectedDevotionModal(dev)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "joy_overcoming" && (
            <JoyOvercomingTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              onNavigateToBible={(book, ch, v) => handleNavigateToBibleChapter(book, ch, v)}
              onOpenDevotion={(dev) => setSelectedDevotionModal(dev)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "hymnals" && (
            <HymnalsTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              onNavigateToBible={(book, ch, v) => handleNavigateToBibleChapter(book, ch, v)}
            />
          )}

          {(activeTab === "library" || activeTab === "books") && (
            <BooksTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
              isAdmin={!!adminSession}
            />
          )}

          {(activeTab === "prayer" || activeTab === "prayers") && (
            <PrayersTab
              activeEdition={activeEdition}
              journal={journal}
              onAddJournalEntry={addJournalEntry}
              onMarkAnswered={markPrayerAnswered}
              onDeleteJournalEntry={deleteJournalEntry}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              isSpeaking={isSpeaking}
              onToggleSpeak={speakText}
            />
          )}

          {(activeTab === "creator" || activeTab === "about") && (
            <AboutCreatorTab
              profile={creatorProfile}
              founderSession={adminSession ? {
                isAuthenticated: true,
                founderEmail: adminSession.email,
                founderName: adminSession.creatorName,
                token: adminSession.token,
                loginTimestamp: Date.now()
              } : null}
              onOpenEditModal={handleOpenEditRequest}
              onOpenFounderLogin={handleOpenEditRequest}
              onFounderLogout={handleAdminLogout}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
              onNavigateToBible={handleNavigateToBibleChapter}
              onShareItem={handleOpenShare}
              onToggleSpeak={speakText}
              isSpeaking={isSpeaking}
            />
          )}

          {activeTab === "quotes" && (
            <QuotesTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              onToggleSpeak={speakText}
              onOpenQuotePictureModal={(item) => setSelectedQuoteForPicture(item)}
            />
          )}

          {activeTab === "doctrines" && (
            <DoctrinesTab
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onShareItem={handleOpenShare}
              onToggleSpeak={speakText}
            />
          )}
        </main>

        {/* Global Professional Footer */}
        <AppFooter
          profile={creatorProfile}
          onNavigateTab={(tab) => setActiveTab(tab as TabType)}
          onOpenAbout={() => setActiveTab("creator")}
          isInstalled={isInstalled}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
        />

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onOpenMore={() => setIsMobileMenuOpen(true)}
        />

        {/* Cross-Platform PWA Installation Floating Banner */}
        <InstallAppBanner
          isInstalled={isInstalled}
          isInstallable={isInstallable}
          platform={platform}
          isDismissed={isBannerDismissed}
          onOpenModal={() => setIsInstallModalOpen(true)}
          onPromptInstall={promptInstall}
          onDismiss={dismissBanner}
        />

        {/* Cross-Platform PWA Installation Modal */}
        <InstallAppModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
          isInstalled={isInstalled}
          isInstallable={isInstallable}
          platform={platform}
          onPromptInstall={promptInstall}
        />

        {/* Secure Layered Admin Login Modal (Device-Gated & Hidden) */}
        <SecureAdminLoginModal
          isOpen={isSecureAdminLoginOpen}
          onClose={() => setIsSecureAdminLoginOpen(false)}
          onLoginSuccess={handleAdminLoginSuccess}
        />

        {/* Creator & Administrator Dashboard Portal */}
        <AdminDashboardModal
          isOpen={isAdminDashboardOpen}
          onClose={() => setIsAdminDashboardOpen(false)}
          adminSession={adminSession}
          currentProfile={creatorProfile}
          onSaveProfile={handleUpdateCreatorProfile}
          onLogout={handleAdminLogout}
          onNavigateTab={(tab) => {
            setIsAdminDashboardOpen(false);
            setActiveTab(tab as TabType);
          }}
        />

        {/* Edit Creator Profile Modal */}
        <EditCreatorProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => {
            setIsEditProfileOpen(false);
            setEditProfileInitialSection(undefined);
          }}
          currentProfile={creatorProfile}
          initialSection={editProfileInitialSection}
          founderSession={adminSession ? {
            isAuthenticated: true,
            founderEmail: adminSession.email,
            founderName: adminSession.creatorName,
            token: adminSession.token,
            loginTimestamp: Date.now()
          } : null}
          onSaveProfile={handleUpdateCreatorProfile}
        />

        {/* High Definition Quote & Scripture Picture Generator Modal */}
        <QuotePictureModal
          isOpen={!!selectedQuoteForPicture}
          onClose={() => setSelectedQuoteForPicture(null)}
          item={selectedQuoteForPicture}
          activeProfile={creatorProfile}
        />

        {/* Full Devotion Detail Reader Modal */}
        <DevotionDetailModal
          devotion={selectedDevotionModal}
          isOpen={!!selectedDevotionModal}
          onClose={() => {
            setSelectedDevotionModal(null);
            stopSpeaking();
          }}
          isBookmarked={selectedDevotionModal ? isBookmarked(selectedDevotionModal.id, "devotion") : false}
          onToggleBookmark={() => {
            if (selectedDevotionModal) {
              toggleBookmark({
                type: "devotion",
                title: selectedDevotionModal.title,
                reference: selectedDevotionModal.keyScripture,
                snippet: selectedDevotionModal.reflection.slice(0, 150) + "...",
                targetId: selectedDevotionModal.id
              });
            }
          }}
          onShare={() => {
            if (selectedDevotionModal) {
              handleOpenShare(
                selectedDevotionModal.title,
                selectedDevotionModal.reflection.slice(0, 300) + "...",
                selectedDevotionModal.keyScripture,
                selectedDevotionModal.guidedPrayer
              );
            }
          }}
          isSpeaking={isSpeaking}
          onToggleSpeak={speakText}
          creatorProfile={creatorProfile}
        />

        {/* Saved Bookmarks Manager Modal */}
        <BookmarksModal
          isOpen={isBookmarksOpen}
          onClose={() => setIsBookmarksOpen(false)}
          bookmarks={bookmarks}
          onSelectBookmark={handleSelectBookmark}
          onRemoveBookmark={(targetId) => toggleBookmark({ targetId })}
        />

        {/* Share Image/Text Export Modal */}
        <ShareCardModal
          isOpen={shareCardData.isOpen}
          onClose={() => setShareCardData({ isOpen: false, title: "", text: "" })}
          title={shareCardData.title}
          text={shareCardData.text}
          reference={shareCardData.reference}
          subtext={shareCardData.subtext}
        />
      </div>
    </div>
  );
}

export default App;
