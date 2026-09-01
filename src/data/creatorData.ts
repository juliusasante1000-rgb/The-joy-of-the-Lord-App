import { CreatorProfile, FounderSession } from "../types";

export const FOUNDER_PRIMARY_EMAIL = "twumbismark90@gmail.com";
export const FOUNDER_SECONDARY_EMAIL = "twumbismark304@gmail.com";
export const AUTHORIZED_FOUNDER_EMAILS = [
  "twumbismark90@gmail.com",
  "twumbismark304@gmail.com"
];

export const DEFAULT_CREATOR_PROFILE: CreatorProfile = {
  name: "Bismark Twum",
  honorific: "Bismark Twum",
  professionalTitle: "Mathematics Educator | Researcher | Writer | Christian",
  roleBadges: [
    "Mathematics Educator",
    "Researcher",
    "Writer",
    "Curriculum Developer",
    "Mentor & Inspirer"
  ],
  tagline: "Empowering Minds. Transforming Education. Building Tomorrow.",
  location: "Ghana",
  phone: "+233 246 320 879",
  email: "twumbismark304@gmail.com",
  photoUrl: "/icon.svg",
  bannerUrl: "/src/assets/images/bismark_banner_official_1786988862290.jpg",
  welcomeMessage:
    "Welcome to this Christian platform. My desire is that this resource will help people grow in their relationship with God, deepen their understanding of Scripture, strengthen their prayer lives, and encourage them in their Christian walk. May the joy of the Lord be your unending strength every day.",
  biography:
    "Bismark Twum is a dedicated Ghanaian Mathematics Educator, Researcher, Author, and Christian leader based in Ghana. Committed to holistic intellectual and spiritual development, Bismark combines academic rigor with a deep devotion to God's Word.\n\nThrough years of classroom leadership, curriculum development, and educational research, he has mentored and inspired students, educators, and believers to strive for excellence, live purposefully, and ground their lives in the unchanging truths of the Holy Scriptures.",
  vision:
    "To harness modern digital technology and rich Christian pedagogical tools to make Scripture, spiritual devotions, prayer frameworks, and sound theological literature universally accessible to every believer across the globe, empowering them to live disciplined, impact-driven lives anchored in Christ.",
  whyCreated:
    "This platform was created out of a passionate conviction that daily spiritual nourishment should be seamless, reverent, and deeply grounded in God's Word. In a fast-paced and distracted world, believers need a sanctified digital sanctuary where they can pause morning, afternoon, and evening to pray, meditate on biblical truths, study classic Christian literature, and draw strength from the joy of the Lord (Nehemiah 8:10).",
  christianFaith:
    "I believe in the Triune God — Father, Son, and Holy Spirit. I believe the Holy Scriptures are the inspired, infallible, and authoritative Word of God, profitable for teaching, reproof, correction, and training in righteousness. Salvation is by grace through faith in Jesus Christ alone, who died for our sins and rose again triumphantly.\n\nMy personal walk with Christ is anchored on Philippians 4:13 ('I can do all things through Christ who strengthens me') and Proverbs 16:3 ('Commit your work to the Lord, and your plans will be established'). Everything we build, teach, and write is for the glory of God.",
  myWork:
    "My professional work spans Mathematics Education, Educational Research, Pedagogical Innovations, Curriculum Development, and Christian Devotional Writing. I focus on developing structured learning frameworks that help students grasp complex concepts with clarity while instilling character, discipline, and purpose. As an author and researcher, I have authored works on Research Methods in Education, Mathematics Pedagogy, Curriculum Design, and Christian Life.",
  dailyFocus: [
    "Pray without ceasing",
    "Plan with intentionality",
    "Work hard with excellence",
    "Stay consistent in discipline",
    "Trust God in every step"
  ],
  powerPrinciples: [
    {
      id: "prep-next-level",
      title: "Preparation for the Next Level",
      description:
        "The preparation for the next level of your life starts right after attaining the previously sought one. Never settle into complacency.",
      scripture: "Philippians 3:14"
    },
    {
      id: "impossible-out",
      title: "Eradicate the Impossible",
      description:
        "The people who change the world are those who have taken 'impossible' out of their vocabulary.",
      scripture: "Luke 1:37"
    },
    {
      id: "value-measure",
      title: "The Three Measures of Value",
      description:
        "Your true value is measured against three fundamental pillars:",
      bulletPoints: [
        "The demand for what you do.",
        "The difficulty in replacing you.",
        "Your proficiency in doing what you do."
      ],
      scripture: "Proverbs 22:29"
    },
    {
      id: "great-gains",
      title: "Progress & Gratitude",
      description:
        "Although I am not where I want to be, I am also not where I used to be. Great gains made.",
      scripture: "1 Timothy 6:6"
    },
    {
      id: "mission-success",
      title: "The Success Formula",
      description:
        "Success is my mission. Discipline is my path. God is my strength.",
      scripture: "Nehemiah 8:10"
    }
  ],
  publications: [
    {
      id: "research-methods",
      title: "Research Methods in Education",
      field: "Academic & Methodological Research",
      description:
        "A comprehensive guide for researchers, educators, and graduate students on educational inquiry, statistical analysis, and empirical methodologies.",
      status: "Published"
    },
    {
      id: "math-education",
      title: "Mathematics Education & Pedagogical Excellence",
      field: "Mathematics & Curriculum Design",
      description:
        "Innovative pedagogical strategies, visual reasoning models, and conceptual mastery pathways for secondary and tertiary mathematics teaching.",
      status: "Published"
    },
    {
      id: "curriculum-dev",
      title: "Curriculum Development & Instructional Leadership",
      field: "Educational Leadership",
      description:
        "A strategic blueprint for modern curriculum evaluation, teacher development, and transformative classroom learning outcomes.",
      status: "Published"
    },
    {
      id: "joy-strength-bk",
      title: "The Joy of the Lord is Our Strength",
      field: "Christian Devotion & Spiritual Warfare",
      description:
        "An exposition of Nehemiah 8:10, exploring how supernatural joy provides impenetrable fortress-strength in trials and spiritual battles.",
      status: "Published"
    },
    {
      id: "gods-generals-lessons",
      title: "Lessons from God's Generals: Faith, Fire, and Pitfalls",
      field: "Church History & Revival Studies",
      description:
        "A profound examination of the great revivalists, miracle ministries, their spiritual secrets, and key lessons for contemporary believers.",
      status: "Published"
    }
  ],
  platformGuide: {
    whatItIs:
      "The Joy of the Lord is a full-featured Christian devotional platform, digital theological library, and spiritual companion engineered to enrich the daily walk of believers worldwide.",
    coreMission:
      "Empowering believers with sound doctrine, structured morning/afternoon/evening devotionals, KJV Scriptures, guided prayer frameworks, and rich Christian literature without distraction.",
    libraryOverview:
      "A comprehensive digital collection including 100 original works by Bismark Twum alongside timeless Christian classics and summaries like God's Generals, Watchman Nee, Andrew Murray, and E.M. Bounds.",
    aiDevotionalOverview:
      "An intelligent scriptural assistant calibrated strictly to orthodox Christian theology, generating personalized devotions with biblical context and guided prayers.",
    scriptureFoundation:
      "Based on Nehemiah 8:10 ('For the joy of the LORD is your strength') and Philippians 4:13 ('I can do all things through Christ which strengtheneth me')."
  },
  socialLinks: [
    {
      label: "Phone / WhatsApp",
      url: "tel:+233246320879",
      type: "phone"
    },
    {
      label: "Primary Email",
      url: "mailto:twumbismark90@gmail.com",
      type: "email"
    },
    {
      label: "Alternate Email",
      url: "mailto:twumbismark304@gmail.com",
      type: "email"
    },
    {
      label: "Location",
      url: "#",
      type: "location"
    }
  ]
};

const STORAGE_KEY = "the_joy_of_the_lord_creator_profile_v3";
const FOUNDER_SESSION_KEY = "the_joy_of_the_lord_founder_session_v3";

export function loadCreatorProfile(): CreatorProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure essential fields exist
      let photoUrl = parsed.photoUrl || DEFAULT_CREATOR_PROFILE.photoUrl;
      if (photoUrl === "/bis.png" || photoUrl === "/creator.jpg" || photoUrl === "/creator.png") {
        photoUrl = "/icon.svg";
      }
      return {
        ...DEFAULT_CREATOR_PROFILE,
        ...parsed,
        photoUrl,
        bannerUrl: parsed.bannerUrl || DEFAULT_CREATOR_PROFILE.bannerUrl,
        location: "Ghana"
      };
    }
  } catch (e) {
    console.error("Error loading creator profile from localStorage:", e);
  }
  return DEFAULT_CREATOR_PROFILE;
}

export function saveCreatorProfile(profile: CreatorProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving creator profile to localStorage:", e);
  }
}

export function resetCreatorProfile(): CreatorProfile {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error resetting creator profile:", e);
  }
  return DEFAULT_CREATOR_PROFILE;
}

// ----------------------------------------------------
// FOUNDER SESSION MANAGEMENT
// ----------------------------------------------------

export function isAuthorizedFounderEmail(email: string): boolean {
  const normalized = (email || "").trim().toLowerCase();
  return AUTHORIZED_FOUNDER_EMAILS.includes(normalized);
}

export function getFounderSession(): FounderSession | null {
  try {
    const data = localStorage.getItem(FOUNDER_SESSION_KEY);
    if (!data) return null;
    const session: FounderSession = JSON.parse(data);
    if (session && session.isAuthenticated && isAuthorizedFounderEmail(session.founderEmail)) {
      return session;
    }
  } catch (e) {
    console.error("Error parsing founder session:", e);
  }
  return null;
}

export function saveFounderSession(session: FounderSession): void {
  try {
    localStorage.setItem(FOUNDER_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error("Error saving founder session:", e);
  }
}

export function clearFounderSession(): void {
  try {
    localStorage.removeItem(FOUNDER_SESSION_KEY);
  } catch (e) {
    console.error("Error clearing founder session:", e);
  }
}

// ----------------------------------------------------
// GLOBAL SERVER PROFILE SYNCHRONIZATION
// ----------------------------------------------------

/**
 * Fetch the latest globally synchronized creator profile from the backend server.
 * This ensures every user anywhere in the world receives Bismark's live updates.
 */
export async function fetchLiveCreatorProfile(): Promise<CreatorProfile | null> {
  try {
    const res = await fetch("/api/creator-profile", {
      headers: { "Cache-Control": "no-cache" }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success && data.profile) {
      const merged: CreatorProfile = {
        ...DEFAULT_CREATOR_PROFILE,
        ...data.profile,
        location: "Ghana"
      };
      // Cache locally for instant offline rendering on next startup
      saveCreatorProfile(merged);
      return merged;
    }
  } catch (e) {
    console.warn("Could not fetch remote creator profile (offline or network error):", e);
  }
  return null;
}

/**
 * Persist the updated profile to the server so all users globally receive it.
 * Only succeeds if called with valid founder credentials.
 */
export async function syncCreatorProfileToServer(
  profile: CreatorProfile,
  founderEmail: string,
  token: string
): Promise<{ success: boolean; message: string; profile?: CreatorProfile }> {
  try {
    const res = await fetch("/api/creator-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        profile,
        founderEmail,
        token
      })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      // Update local storage as well
      saveCreatorProfile(profile);
      return {
        success: true,
        message: data.message || "Profile successfully synced across all global users!",
        profile: data.profile
      };
    } else {
      return {
        success: false,
        message: data.error || "Failed to sync profile with global server."
      };
    }
  } catch (e: any) {
    console.error("Error syncing creator profile to server:", e);
    return {
      success: false,
      message: e?.message || "Network error while syncing with global server."
    };
  }
}

