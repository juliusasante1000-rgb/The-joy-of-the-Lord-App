import { useState, useEffect, useCallback } from "react";
import { ContentCategoryKey } from "../types";
import { fetchPublicPublishedContent } from "./DeviceManager";

/**
 * Universal Hook that seamlessly returns live-synchronized content.
 * Merges local fallback data with cloud database state from server.ts and localStorage,
 * and reactively updates whenever an admin edits, publishes, or syncs content.
 */
export function useSyncedContent<T extends { id: string; status?: string }>(
  categoryKey: ContentCategoryKey,
  baseData: T[]
): {
  items: T[];
  isSynced: boolean;
  refresh: () => Promise<void>;
} {
  const getMergedData = useCallback((): T[] => {
    try {
      const stored = localStorage.getItem("joy_lord_public_cloud_content");
      if (!stored) return baseData;
      const parsed = JSON.parse(stored);
      const cloudItems: any[] = parsed[categoryKey];
      if (!cloudItems || !Array.isArray(cloudItems) || cloudItems.length === 0) {
        return baseData;
      }

      // Map base data by ID
      const itemMap = new Map<string, T>();
      baseData.forEach((item) => itemMap.set(item.id, item));

      // Merge or add cloud items
      cloudItems.forEach((cloudItem) => {
        if (cloudItem.status === "ARCHIVED") {
          itemMap.delete(cloudItem.id);
        } else {
          const existing = itemMap.get(cloudItem.id);
          itemMap.set(cloudItem.id, {
            ...(existing || {}),
            ...cloudItem
          } as T);
        }
      });

      return Array.from(itemMap.values());
    } catch {
      return baseData;
    }
  }, [categoryKey, baseData]);

  const [items, setItems] = useState<T[]>(() => getMergedData());
  const [isSynced, setIsSynced] = useState<boolean>(false);

  const refresh = useCallback(async () => {
    try {
      const cloudContent = await fetchPublicPublishedContent();
      if (cloudContent && cloudContent[categoryKey]) {
        setItems(getMergedData());
        setIsSynced(true);
      }
    } catch {
      // Fallback to local
      setItems(getMergedData());
    }
  }, [categoryKey, getMergedData]);

  useEffect(() => {
    // Initial merge
    setItems(getMergedData());

    // Fetch latest cloud data immediately on mount
    fetchPublicPublishedContent()
      .then((cloudContent) => {
        if (cloudContent) {
          setItems(getMergedData());
          setIsSynced(true);
        }
      })
      .catch(() => {});

    const handleUpdate = () => {
      setItems(getMergedData());
      setIsSynced(true);
    };

    // Auto-sync when window or tab regains focus
    const handleFocus = () => {
      fetchPublicPublishedContent()
        .then((cloudContent) => {
          if (cloudContent) {
            setItems(getMergedData());
            setIsSynced(true);
          }
        })
        .catch(() => {});
    };

    // Background interval sync every 25 seconds
    const intervalId = setInterval(() => {
      fetchPublicPublishedContent()
        .then((cloudContent) => {
          if (cloudContent) {
            setItems(getMergedData());
            setIsSynced(true);
          }
        })
        .catch(() => {});
    }, 25000);

    window.addEventListener("cloudContentUpdated", handleUpdate);
    window.addEventListener("joy_lord_cloud_content_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("cloudContentUpdated", handleUpdate);
      window.removeEventListener("joy_lord_cloud_content_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("focus", handleFocus);
    };
  }, [getMergedData]);

  return { items, isSynced, refresh };
}
