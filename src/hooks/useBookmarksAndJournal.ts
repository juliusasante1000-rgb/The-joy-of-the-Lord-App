import { useState, useEffect, useCallback } from "react";
import { BookmarkItem, PrayerJournalEntry } from "../types";
import confetti from "canvas-confetti";

const STORAGE_KEYS = {
  BOOKMARKS: "the_joy_of_the_lord_bookmarks_v1",
  JOURNAL: "the_joy_of_the_lord_journal_v1",
  STREAK: "the_joy_of_the_lord_streak_v1",
  COMPLETED_DEVOTIONS: "the_joy_of_the_lord_completed_devotions_v1",
  AUDIO_SETTINGS: "the_joy_of_the_lord_audio_settings_v1"
};

export function useBookmarksAndJournal() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [
        {
          id: "bm-init-1",
          type: "scripture",
          title: "The Joy of the Lord is Your Strength",
          reference: "Nehemiah 8:10",
          snippet: "Neither be ye sorry; for the joy of the Lord is your strength.",
          dateAdded: new Date().toISOString(),
          targetId: "ds-1"
        }
      ];
    } catch {
      return [];
    }
  });

  const [journal, setJournal] = useState<PrayerJournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return saved ? JSON.parse(saved) : [
        {
          id: "pj-1",
          date: new Date().toLocaleDateString(),
          title: "Spiritual Breakthrough & Peace in Family",
          requestText: "Lifting my family before the throne of grace for renewed unity, salvation, and Christ-centered peace in every home.",
          category: "Family & Peace",
          scripturePromises: ["Joshua 24:15", "Philippians 4:6-7"],
          isAnswered: false
        }
      ];
    } catch {
      return [];
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK);
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const [completedDevotions, setCompletedDevotions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_DEVOTIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journal));
    } catch (e) {
      console.error(e);
    }
  }, [journal]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, streakDays.toString());
    } catch (e) {
      console.error(e);
    }
  }, [streakDays]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DEVOTIONS, JSON.stringify(completedDevotions));
    } catch (e) {
      console.error(e);
    }
  }, [completedDevotions]);

  // Bookmark Toggle
  const toggleBookmark = useCallback((item: Omit<BookmarkItem, "id" | "dateAdded">) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.targetId === item.targetId && b.type === item.type);
      if (exists) {
        return prev.filter(b => b.id !== exists.id);
      } else {
        const newBm: BookmarkItem = {
          ...item,
          id: `bm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          dateAdded: new Date().toISOString()
        };
        return [newBm, ...prev];
      }
    });
  }, []);

  const isBookmarked = useCallback((targetId: string, type?: string) => {
    return bookmarks.some(b => b.targetId === targetId && (!type || b.type === type));
  }, [bookmarks]);

  // Journal Actions
  const addJournalEntry = useCallback((entry: Omit<PrayerJournalEntry, "id" | "date" | "isAnswered">) => {
    const newEntry: PrayerJournalEntry = {
      ...entry,
      id: `pj-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      isAnswered: false
    };
    setJournal(prev => [newEntry, ...prev]);
  }, []);

  const markPrayerAnswered = useCallback((id: string, testimony?: string) => {
    setJournal(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            isAnswered: true,
            answeredDate: new Date().toLocaleDateString(),
            testimony: testimony || p.testimony || "God answered with sovereign grace!"
          };
        }
        return p;
      })
    );

    // Fire joyful confetti for answered prayer!
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const deleteJournalEntry = useCallback((id: string) => {
    setJournal(prev => prev.filter(p => p.id !== id));
  }, []);

  // Complete Devotion Action
  const completeDevotion = useCallback((devotionId: string) => {
    if (!completedDevotions.includes(devotionId)) {
      setCompletedDevotions(prev => [...prev, devotionId]);
      setStreakDays(prev => prev + 1);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }
    }
  }, [completedDevotions]);

  // Audio Speech Synthesis Player
  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92; // Reverent, clear, calm pacing
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Premium")));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
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
  };
}
