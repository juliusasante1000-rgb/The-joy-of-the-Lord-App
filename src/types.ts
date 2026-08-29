export interface SpiritualPlace {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  spiritualMeaning: string;
  description: string;
  biblicalReference: string;
  themes: string[];
  scriptureCountDisplay: string;
  isPublished: boolean;
  isFeatured?: boolean;
  displayOrder: number;
  colorGradient?: string;
  badgeText?: string;
  historicalContext?: string;
}

export interface PlaceScripture {
  id: string;
  placeIds: string[];
  book: string;
  chapter: number;
  verse: number;
  verseEnd?: number;
  reference: string;
  text: string;
  testament: "Old Testament" | "New Testament";
  theme: string;
  keywords: string[];
  relevanceScore: number; // 1-100 (top matches prioritized)
  devotionalReflection: string;
  guidedPrayerPrompt?: string;
}

export type DevotionEdition = "morning" | "afternoon" | "evening";

export interface TimeScheduleState {
  currentTime: Date;
  formattedTime: string;
  formattedDate: string;
  activeEdition: DevotionEdition;
  activeBadge: {
    label: string;
    subtext: string;
    icon: string;
    colorScheme: string;
    timeRange: string;
  };
  nextTransitionText: string;
  secondsToNextTransition: number;
  dailyScriptureCycleDate: string;
  isSimulatedTime: boolean;
  simulatedHour?: number;
}

export interface DailyScripture {
  id: string;
  reference: string;
  text: string;
  version: string;
  theme: string;
  reflection: string;
  guidedPrayer: string;
  meditationQuestions: string[];
  refreshedAt: string; // "12:00 PM Daily"
}

export interface Devotion {
  id: string;
  edition: DevotionEdition;
  editionLabel: string;
  title: string;
  keyScripture: string;
  passageText: string;
  introMessage?: string;
  reflection: string;
  practicalApplication: string;
  guidedPrayer: string;
  actionStep: string;
  theme: string;
  category: string;
  readTimeMinutes: number;
}

export interface ChurchTenet {
  id: string;
  number: number;
  title: string;
  category: string;
  statement: string;
  scripturalReferences: { reference: string; text: string }[];
  theologicalBreakdown: string[];
  practicalApplication: string;
}

export interface DoctrineCategory {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  doctrinalFocus: string;
  keyScriptures: { reference: string; text: string }[];
  theologicalSummary: string;
  foundationalDocumentInsights: string[];
}

export interface DoctrineArticle {
  id: string;
  categoryId: string;
  categoryTitle: string;
  title: string;
  subtitle: string;
  theologicalOverview: string;
  keyScriptures: { ref: string; text: string; context: string }[];
  doctrinalPillars: { title: string; explanation: string; scripture: string }[];
  practicalApplication: string[];
  historicalAndConfessionalBasis: string;
  guidedReflection: string;
}

export interface StructuredPrayerSections {
  adoration: string;
  confessionAndSurrender: string;
  thanksgiving: string;
  scripturePromise: string;
  petition: string;
  spiritualWarfare: string;
  declarationInJesusName: string;
}

export interface StructuredPrayer {
  id: string;
  category: string;
  theme: string;
  title: string;
  subtitle: string;
  edition?: DevotionEdition;
  suggestedScriptures: string[];
  sections: StructuredPrayerSections;
  audioDurationSec?: number;
}

export interface PrayerItem {
  id: string;
  category: string;
  theme: string;
  title: string;
  scriptureAnchor: string;
  openingAdoration: string;
  confessionAndSurrender: string;
  thanksgiving: string;
  petition: string;
  warfareAndAuthority: string;
  closingDeclaration: string;
  fullPrayerText: string;
  edition?: DevotionEdition;
  audioDurationSec?: number;
}

export interface PrayerJournalEntry {
  id: string;
  date: string;
  title: string;
  requestText: string;
  category: string;
  scripturePromises: string[];
  isAnswered: boolean;
  answeredDate?: string;
  testimony?: string;
}

export interface BookmarkItem {
  id: string;
  type:
    | "scripture"
    | "devotion"
    | "doctrine"
    | "prayer"
    | "bible"
    | "quote"
    | "book"
    | "rhema"
    | "joy"
    | "joy_overcoming"
    | "mathemasermon"
    | "sermon"
    | "hymn";
  title: string;
  reference?: string;
  snippet: string;
  dateAdded: string;
  targetId: string;
  metadata?: Record<string, string>;
}

export type BibleVersionCode =
  | "KJV"
  | "NKJV"
  | "NIV"
  | "AMP"
  | "ESV"
  | "NLT"
  | "NASB"
  | "CSB"
  | "MSG"
  | "TPT"
  | "ASV"
  | "NET"
  | "WEB"
  | "YLT"
  | "CEV"
  | "BSB";

export interface BibleVersionInfo {
  code: BibleVersionCode;
  name: string;
  description: string;
  year?: string;
  badge: string;
}

export interface MathemaSermonItem {
  id: string;
  title: string;
  subtitle: string;
  mathematicalConcept: string;
  formula: string;
  keyScripture: {
    reference: string;
    text: string;
  };
  sermonSeries: string;
  estimatedPreachTimeMinutes: number;
  sermonOutline: {
    pointNumber: number;
    title: string;
    mathApplication: string;
    biblicalExegesis: string;
    illustration: string;
  }[];
  fullManuscript: string;
  homileticPillars: string[];
  altarCallPrayer: string;
  tags: string[];
}

export type RhemaSeasonCategory =
  | "Breakthrough"
  | "Transition"
  | "Spiritual Warfare"
  | "Divine Acceleration"
  | "Supernatural Peace"
  | "Open Doors"
  | "Healing & Restoration"
  | "Covenant Abundance"
  | "Divine Awakening"
  | "Holiness & Consecration"
  | "Family Restoration"
  | "Wisdom & Discernment"
  | "Eternal Reward"
  | "Unspeakable Joy"
  | "Kingdom Dominion";

export interface RhemaWordItem {
  id: string;
  title: string;
  seasonCategory: RhemaSeasonCategory | string;
  propheticDeclaration: string;
  nowWordText: string;
  scriptureAnchor: {
    reference: string;
    text: string;
  };
  actionCommandment: string;
  propheticDecree: string;
  dailyActivationGuide: string[];
  spiritualAtmosphere: string;
  isAuthorFavourite?: boolean;
}

export type JoyBattleCategory =
  | "Grief & Sorrow"
  | "Grief & Bereavement"
  | "Anxiety & Fear"
  | "Financial Strain"
  | "Depression & Heaviness"
  | "Spiritual Warfare"
  | "Marital & Family Storms"
  | "Physical Sickness & Fatigue"
  | "Physical Affliction"
  | "Delay & Discouragement"
  | "Emotional Battles"
  | "Addiction & Deliverance"
  | "Spiritual Formation"
  | "Destiny & Career"
  | "Self-Worth & Calling"
  | "Workplace & Society"
  | "Heart Healing";

export interface JoyOvercomingChallenge {
  id: string;
  challengeTitle: string;
  category: JoyBattleCategory | string;
  rootDeception: string;
  scripturalTruth: string;
  anchorVerses: {
    reference: string;
    text: string;
    version?: string;
  }[];
  joyStrategySteps: string[];
  fortressDeclaration: string;
  deliverancePrayer: string;
  praisePrescription: string;
  testimonyOfVictory: string;
  isAuthorFavourite?: boolean;
}

export interface BookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle?: string;
  content: string;
  estimatedMinutes?: number;
}

export interface BookNote {
  id: string;
  bookId: string;
  chapterId: string;
  selectedText?: string;
  note: string;
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverColor: string;
  coverBadge?: string;
  year?: string;
  chapters: BookChapter[];
  totalChapters: number;
  isCustomUpload?: boolean;
  uploadedAt?: string;
  fileType?: string;
  tags?: string[];
  savedProgress?: {
    chapterId: string;
    chapterNumber: number;
    scrollPercentage: number;
    lastReadDate: string;
  };
}

export interface BibleVerse {
  verse: number;
  text: string;
  isRedLetter?: boolean;
}

export interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  name: string;
  abbreviation: string;
  testament: "Old Testament" | "New Testament";
  group:
    | "Law"
    | "Law & Pentateuch"
    | "History"
    | "Historical"
    | "Poetry & Wisdom"
    | "Prophets"
    | "Major Prophets"
    | "Minor Prophets"
    | "Gospels"
    | "Acts"
    | "Epistles"
    | "Pauline Epistles"
    | "General Epistles"
    | "Prophecy"
    | string;
  chapterCount: number;
  chapters: Record<number, BibleVerse[]>;
  summary: string;
}

export interface PersonalQuote {
  id: string;
  quote: string;
  author?: string;
  category: string;
  biblicalAnchor?: string;
  scriptureAnchor?: string;
  keyPrinciple?: string;
  reflectionNote?: string;
  context?: string;
  theme?: string;
  tags?: string[];
}

export interface FounderSession {
  isAuthenticated: boolean;
  founderEmail: string;
  founderName: string;
  token: string;
  loginTimestamp: number;
}

export type TabType =
  | "home"
  | "bible"
  | "spiritual_places"
  | "places"
  | "apostle_math"
  | "mathema_sermons"
  | "rhema"
  | "joy_overcoming"
  | "hymnals"
  | "library"
  | "prayer"
  | "creator"
  | "quotes"
  | "doctrines"
  | "books"
  | "prayers"
  | "about"
  | "math";

export interface HymnStanza {
  number: number;
  text: string;
  isRefrain?: boolean;
}

export interface HymnMelodyNote {
  note: string;
  duration: number;
}

export interface HymnItem {
  id: string;
  hymnNumber: number;
  title: string;
  alternateTitle?: string;
  category:
    | "Old Spirituals & Revival"
    | "Grace & Redemption"
    | "Praise & Adoration"
    | "Faith & Trust"
    | "Cross & Resurrection"
    | "Ancient & Classical"
    | "Prayer & Consecration";
  author: string;
  composer?: string;
  tuneName?: string;
  year?: string;
  meter?: string;
  keySignature?: string;
  scriptureAnchor: {
    reference: string;
    text: string;
    book: string;
    chapter: number;
    verse?: number;
  };
  stanzas: HymnStanza[];
  chorus?: string;
  historicalStory: string;
  theologicalInsight: string;
  devotionalPrayer: string;
  tags: string[];
  melodyNotes?: HymnMelodyNote[];
}

export interface CreatorPublication {
  id: string;
  title: string;
  field: string;
  description: string;
  status: "Published" | "In Research" | "Curriculum" | "Writing";
  iconName?: string;
}

export interface PowerPrinciple {
  id: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  scripture?: string;
}

export interface CreatorProfile {
  name: string;
  honorific?: string;
  professionalTitle: string;
  roleBadges: string[];
  tagline: string;
  location: string;
  phone: string;
  email: string;
  photoUrl: string;
  bannerUrl: string;
  biography: string;
  welcomeMessage: string;
  vision: string;
  whyCreated: string;
  christianFaith: string;
  myWork: string;
  dailyFocus: string[];
  powerPrinciples: PowerPrinciple[];
  publications: CreatorPublication[];
  platformGuide: {
    whatItIs: string;
    coreMission: string;
    libraryOverview: string;
    aiDevotionalOverview: string;
    scriptureFoundation: string;
  };
  socialLinks: {
    label: string;
    url: string;
    type: "email" | "phone" | "website" | "location" | "social";
  }[];
}

export interface EnrolledDevice {
  id: string;
  deviceId: string;
  deviceName: string;
  authorizedEmail: string;
  status: "ACTIVE" | "REVOKED";
  enrolledAt: string;
  lastActiveAt: string;
  enrolledIp?: string;
  revokedAt?: string;
  revokedBy?: string;
}

export interface AdminSession {
  token: string;
  email: string;
  creatorName: string;
  role: string;
  deviceId: string;
  requiresPasswordChange: boolean;
  loginTimestamp: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  userEmail?: string;
  deviceId?: string;
  ip?: string;
  status: "SUCCESS" | "DENIED" | "FAILED" | "SECURITY_ALERT";
}

export type ContentCategoryKey = 
  | "mathema_sermons" 
  | "apostle_math" 
  | "rhema" 
  | "joy_overcoming" 
  | "spiritual_places" 
  | "daily_verses" 
  | "books";

export interface ContentStoreState {
  mathema_sermons: any[];
  apostle_math: any[];
  rhema: any[];
  joy_overcoming: any[];
  spiritual_places: any[];
  daily_verses: any[];
  books: any[];
  lastUpdated?: string;
  updatedBy?: string;
}

