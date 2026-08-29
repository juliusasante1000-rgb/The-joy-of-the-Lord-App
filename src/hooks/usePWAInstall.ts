import { useState, useEffect, useCallback } from "react";

export type PlatformType = "ios" | "android" | "windows" | "macos" | "other";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [platform, setPlatform] = useState<PlatformType>("other");
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    return localStorage.getItem("joy_pwa_banner_dismissed") === "true";
  });

  // Detect Platform
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
    } else if (/android/.test(userAgent)) {
      setPlatform("android");
    } else if (/windows/.test(userAgent)) {
      setPlatform("windows");
    } else if (/macintosh|mac os x/.test(userAgent)) {
      setPlatform("macos");
    } else {
      setPlatform("other");
    }

    // Check if app is already running in standalone display mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes("android-app://");

    setIsInstalled(isStandalone);

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleDisplayModeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleDisplayModeChange);
      }
    };
  }, []);

  // Listen for BeforeInstallPrompt event (Chrome, Edge, Android, Desktop)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log("[PWA] 'The Joy of the Lord' was installed successfully!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Register Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV !== "development") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[PWA] Service Worker registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration:", err);
        });
    } else if ("serviceWorker" in navigator) {
      // In dev mode, register sw.js safely for offline testing
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[PWA Dev] Service Worker active:", reg.scope);
        })
        .catch((err) => {
          console.log("[PWA Dev] SW registration note:", err);
        });
    }
  }, []);

  // Track Network Online/Offline Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Trigger Native Install Prompt
  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (err) {
      console.error("[PWA] Install prompt failed:", err);
      return false;
    }
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    setIsBannerDismissed(true);
    localStorage.setItem("joy_pwa_banner_dismissed", "true");
  }, []);

  const resetBannerDismiss = useCallback(() => {
    setIsBannerDismissed(false);
    localStorage.removeItem("joy_pwa_banner_dismissed");
  }, []);

  return {
    isInstalled,
    isInstallable,
    deferredPrompt,
    platform,
    isOnline,
    isBannerDismissed,
    promptInstall,
    dismissBanner,
    resetBannerDismiss
  };
}
