import { useState, useEffect, useMemo, useCallback } from "react";
import { DevotionEdition, TimeScheduleState, DailyScripture, Devotion } from "../types";
import { getDailyScriptureForDate, getDevotionForDateAndEdition } from "../data/devotionsData";
import { getScheduledVerseForDate, ScheduledVerse } from "../data/dailyVerseData";

export function useTimeSchedule() {
  // Option for user to manually preview or test an edition or custom hour
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [simulatedDate, setSimulatedDate] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute effective date & time
  const effectiveDate = useMemo(() => {
    const d = new Date(now);
    if (simulatedHour !== null) {
      d.setHours(simulatedHour, 30, 0, 0);
    }
    return d;
  }, [now, simulatedHour]);

  const hours = effectiveDate.getHours();
  const minutes = effectiveDate.getMinutes();
  const seconds = effectiveDate.getSeconds();

  // Determine active edition according to prompt specifications:
  // - Morning Edition: Activates at 12:00 AM (00:00 to 11:59:59)
  // - Afternoon Edition: Activates at 12:00 PM (12:00 to 16:59:59)
  // - Evening Edition: Activates at 5:00 PM (17:00 to 23:59:59)
  const activeEdition: DevotionEdition = useMemo(() => {
    if (hours >= 0 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 17) {
      return "afternoon";
    } else {
      return "evening";
    }
  }, [hours]);

  // Today calendar date string - flips at exactly 12:00 AM Midnight
  const todayDateString = useMemo(() => {
    if (simulatedDate) return simulatedDate;
    const yyyy = effectiveDate.getFullYear();
    const mm = String(effectiveDate.getMonth() + 1).padStart(2, "0");
    const dd = String(effectiveDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, [effectiveDate, simulatedDate]);

  // Daily Scripture 24-hour cycle anchored at 12:00 PM (Noon)
  const dailyScriptureCycleDate = useMemo(() => {
    if (simulatedDate) return simulatedDate;

    const targetDate = new Date(effectiveDate);
    if (hours < 12) {
      // Prior to noon, scripture is from yesterday's noon
      targetDate.setDate(targetDate.getDate() - 1);
    }
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
    const dd = String(targetDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, [effectiveDate, hours, simulatedDate]);

  // Verse of the Day: Strictly anchored to calendar date, changes at 12:00 AM midnight
  const activeScheduledVerse: ScheduledVerse = useMemo(() => {
    return getScheduledVerseForDate(todayDateString);
  }, [todayDateString]);

  // Calculate time remaining to next transition
  const { nextTransitionText, secondsToNextTransition } = useMemo(() => {
    let nextTargetHour = 12; // default
    let targetLabel = "Afternoon Devotion & Daily Scripture (12:00 PM)";

    if (hours < 12) {
      nextTargetHour = 12;
      targetLabel = "Afternoon Devotion & Noon Scripture (12:00 PM)";
    } else if (hours < 17) {
      nextTargetHour = 17;
      targetLabel = "Evening Prayer Edition (5:00 PM)";
    } else {
      nextTargetHour = 24; // midnight
      targetLabel = "Morning Devotion Edition (12:00 AM)";
    }

    const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    const targetTotalSeconds = nextTargetHour * 3600;
    const diffSeconds = targetTotalSeconds - currentTotalSeconds;

    const h = Math.floor(diffSeconds / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = diffSeconds % 60;

    const timeString = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    return {
      nextTransitionText: `Next update in ${timeString} (${targetLabel})`,
      secondsToNextTransition: diffSeconds
    };
  }, [hours, minutes, seconds]);

  // Active Badge metadata
  const activeBadge = useMemo(() => {
    switch (activeEdition) {
      case "morning":
        return {
          label: "Morning Devotion",
          subtext: "Firstfruits of Praise & Alignment",
          icon: "Sunrise",
          colorScheme: "from-amber-500/20 to-amber-600/10 text-amber-900 dark:text-amber-300 border-amber-500/30",
          timeRange: "12:00 AM – 12:00 PM"
        };
      case "afternoon":
        return {
          label: "Afternoon Devotion",
          subtext: "Midday Renewal & Sovereign Strength",
          icon: "Sun",
          colorScheme: "from-yellow-500/20 to-amber-500/10 text-amber-900 dark:text-amber-200 border-yellow-500/30",
          timeRange: "12:00 PM – 5:00 PM"
        };
      case "evening":
        return {
          label: "Evening Prayer",
          subtext: "Nightfall Rest & Angelic Shelter",
          icon: "Moon",
          colorScheme: "from-indigo-900/30 to-slate-900/30 text-indigo-900 dark:text-indigo-200 border-indigo-500/30",
          timeRange: "5:00 PM – 12:00 AM"
        };
    }
  }, [activeEdition]);

  // Formatted date and time strings for UI
  const formattedTime = useMemo(() => {
    return effectiveDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" });
  }, [effectiveDate]);

  const formattedDate = useMemo(() => {
    return effectiveDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }, [effectiveDate]);

  // Active Daily Scripture (synchronized with 12 PM cycle)
  const activeDailyScripture: DailyScripture = useMemo(() => {
    return getDailyScriptureForDate(dailyScriptureCycleDate);
  }, [dailyScriptureCycleDate]);

  // Active Devotion
  const activeDevotion: Devotion = useMemo(() => {
    return getDevotionForDateAndEdition(todayDateString, activeEdition);
  }, [todayDateString, activeEdition]);

  // Helper functions to manually switch or reset preview
  const setPreviewEdition = useCallback((edition: DevotionEdition) => {
    if (edition === "morning") setSimulatedHour(8);
    if (edition === "afternoon") setSimulatedHour(13);
    if (edition === "evening") setSimulatedHour(19);
  }, []);

  const resetToRealTime = useCallback(() => {
    setSimulatedHour(null);
    setSimulatedDate(null);
  }, []);

  const scheduleState: TimeScheduleState = {
    currentTime: effectiveDate,
    formattedTime,
    formattedDate,
    activeEdition,
    activeBadge,
    nextTransitionText,
    secondsToNextTransition,
    dailyScriptureCycleDate,
    isSimulatedTime: simulatedHour !== null,
    simulatedHour: simulatedHour ?? undefined
  };

  return {
    scheduleState,
    activeEdition,
    activeBadge,
    activeDailyScripture,
    activeDevotion,
    activeScheduledVerse,
    setPreviewEdition,
    resetToRealTime,
    setSimulatedDate,
    todayDateString
  };
}
