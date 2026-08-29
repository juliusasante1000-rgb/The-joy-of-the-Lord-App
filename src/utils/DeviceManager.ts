/**
 * Device Authorization, Layered Security & Admin Portal API Client
 */

import { AdminSession, EnrolledDevice, AdminAuditLog, ContentStoreState, ContentCategoryKey } from "../types";
import { safeFetchJson } from "./aiClient";

const DEVICE_ID_STORAGE_KEY = "joy_app_device_id_v2";
const ADMIN_SESSION_STORAGE_KEY = "joy_admin_active_session_v2";

export function getOrGenerateDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
    if (!id) {
      // Generate secure unique device UUID
      id = "dev_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
      localStorage.setItem(DEVICE_ID_STORAGE_KEY, id);
    }
    return id;
  } catch (e) {
    return "dev_fallback_" + Date.now().toString(36);
  }
}

export function getStoredAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveAdminSession(session: AdminSession): void {
  try {
    localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error("Failed to save admin session:", e);
  }
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear admin session:", e);
  }
}

// 1. Silent check if this physical device is authorized (Layer 1 gate)
export async function checkDeviceAuthorization(): Promise<{
  isAuthorized: boolean;
  deviceName?: string;
  authorizedEmail?: string;
}> {
  try {
    const deviceId = getOrGenerateDeviceId();
    const { ok, data } = await safeFetchJson<any>("/api/admin/check-device-status", {
      method: "POST",
      body: JSON.stringify({ deviceId })
    });
    if (!ok || !data) return { isAuthorized: false };
    return {
      isAuthorized: !!data.isAuthorized,
      deviceName: data.deviceName,
      authorizedEmail: data.authorizedEmail
    };
  } catch (e) {
    return { isAuthorized: false };
  }
}

// 2. Enroll a device into the authorized list
export async function enrollDevice(params: {
  deviceName: string;
  email: string;
  enrollmentKey?: string;
  currentPassword?: string;
}): Promise<{ success: boolean; message: string; device?: EnrolledDevice; error?: string }> {
  try {
    const deviceId = getOrGenerateDeviceId();
    const { ok, data, error } = await safeFetchJson<any>("/api/admin/enroll-device", {
      method: "POST",
      body: JSON.stringify({
        deviceId,
        deviceName: params.deviceName,
        email: params.email,
        enrollmentKey: params.enrollmentKey,
        currentPassword: params.currentPassword
      })
    });
    if (ok && data && data.success) {
      return { success: true, message: data.message, device: data.device };
    }
    return { success: false, message: data?.error || error || "Device enrollment failed", error: data?.error || error };
  } catch (err: any) {
    return { success: false, message: "Network connection error during device enrollment." };
  }
}

// 3. Login administrator on authorized device
export async function adminLogin(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  try {
    const deviceId = getOrGenerateDeviceId();
    const { ok, data, error } = await safeFetchJson<any>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({
        email: params.email,
        password: params.password,
        deviceId
      })
    });
    if (ok && data && data.success) {
      const session: AdminSession = {
        token: data.token,
        email: data.email,
        creatorName: data.creatorName || "Bismark Twum",
        role: data.role || "CREATOR_AND_PRIMARY_ADMINISTRATOR",
        deviceId,
        requiresPasswordChange: !!data.requiresPasswordChange,
        loginTimestamp: new Date().toISOString()
      };
      saveAdminSession(session);
      return { success: true, session };
    }
    return { success: false, error: data?.error || error || "Authentication failed" };
  } catch (e: any) {
    return { success: false, error: "Network connection error during authentication." };
  }
}

// 4. Change administrator password
export async function adminChangePassword(params: {
  currentPassword: string;
  newPassword: string;
  session: AdminSession;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const { ok, data, error } = await safeFetchJson<any>("/api/admin/change-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.session.token}`,
        "x-device-id": params.session.deviceId
      },
      body: JSON.stringify({
        currentPassword: params.currentPassword,
        newPassword: params.newPassword,
        deviceId: params.session.deviceId
      })
    });
    if (ok && data && data.success) {
      const updatedSession = { ...params.session, requiresPasswordChange: false };
      saveAdminSession(updatedSession);
      return { success: true, message: data.message };
    }
    return { success: false, error: data?.error || error || "Failed to update password" };
  } catch (e) {
    return { success: false, error: "Network error updating password." };
  }
}

// 5. Logout
export async function adminLogout(session: AdminSession | null): Promise<void> {
  if (session) {
    try {
      await safeFetchJson("/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
          "x-device-id": session.deviceId
        }
      });
    } catch (e) {
      // ignore
    }
  }
  clearAdminSession();
}

// 6. Device Management (List & Revoke)
export async function fetchAdminDevices(session: AdminSession): Promise<EnrolledDevice[]> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/admin/devices", {
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      }
    });
    if (ok && data && data.success) {
      return data.devices || [];
    }
    return [];
  } catch (e) {
    return [];
  }
}

export async function revokeAdminDevice(session: AdminSession, deviceIdToRevoke: string): Promise<boolean> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/admin/revoke-device", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      },
      body: JSON.stringify({ deviceIdToRevoke })
    });
    return ok && !!data?.success;
  } catch (e) {
    return false;
  }
}

// 7. Audit Logs
export async function fetchAdminAuditLogs(session: AdminSession): Promise<AdminAuditLog[]> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/admin/audit-logs", {
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      }
    });
    if (ok && data && data.success) {
      return data.logs || [];
    }
    return [];
  } catch (e) {
    return [];
  }
}

// 8. Content Store CRUD & Synchronization
export async function fetchAdminContentStore(session: AdminSession): Promise<ContentStoreState | null> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/admin/content-store", {
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      }
    });
    if (ok && data && data.success) {
      return data.store;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function saveAdminContentItem(
  session: AdminSession,
  category: ContentCategoryKey,
  item: any
): Promise<{ success: boolean; item?: any; error?: string }> {
  try {
    const isUpdate = !!item.id;
    const url = isUpdate ? `/api/admin/content/${category}/${item.id}` : `/api/admin/content/${category}`;
    const method = isUpdate ? "PUT" : "POST";

    const { ok, data, error } = await safeFetchJson<any>(url, {
      method,
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      },
      body: JSON.stringify(item)
    });
    if (ok && data && data.success) {
      // Update local cloud content cache immediately
      try {
        const stored = localStorage.getItem("joy_lord_public_cloud_content");
        const cache = stored ? JSON.parse(stored) : {};
        const list = cache[category] || [];
        const index = list.findIndex((i: any) => i.id === data.item.id);
        if (index >= 0) {
          list[index] = data.item;
        } else {
          list.unshift(data.item);
        }
        cache[category] = list;
        localStorage.setItem("joy_lord_public_cloud_content", JSON.stringify(cache));
        window.dispatchEvent(new CustomEvent("joy_lord_cloud_content_updated", { detail: { category, item: data.item } }));
      } catch (err) {}

      return { success: true, item: data.item };
    }
    return { success: false, error: data?.error || error || "Failed to save content" };
  } catch (e: any) {
    return { success: false, error: e.message || "Network error saving content" };
  }
}

export async function deleteAdminContentItem(
  session: AdminSession,
  category: ContentCategoryKey,
  itemId: string
): Promise<boolean> {
  try {
    const { ok, data } = await safeFetchJson<any>(`/api/admin/content/${category}/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      }
    });
    if (ok && !!data?.success) {
      try {
        const stored = localStorage.getItem("joy_lord_public_cloud_content");
        if (stored) {
          const cache = JSON.parse(stored);
          if (cache[category]) {
            cache[category] = cache[category].filter((i: any) => i.id !== itemId);
            localStorage.setItem("joy_lord_public_cloud_content", JSON.stringify(cache));
          }
        }
        window.dispatchEvent(new CustomEvent("joy_lord_cloud_content_updated", { detail: { category, deletedId: itemId } }));
      } catch (err) {}
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// 9. Public Content Fetch for All Devices and Guests
export async function fetchPublicPublishedContent(): Promise<Record<string, any[]> | null> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/public/content");
    if (ok && data && data.success && data.content) {
      // Cache locally for offline resilience
      try {
        localStorage.setItem("joy_lord_public_cloud_content", JSON.stringify(data.content));
      } catch (err) {}
      return data.content;
    }
    return null;
  } catch (e) {
    // Fallback to local cache if offline
    try {
      const cached = localStorage.getItem("joy_lord_public_cloud_content");
      if (cached) return JSON.parse(cached);
    } catch (err) {}
    return null;
  }
}

// 10. Export & Restore
export async function exportDatabaseBackup(session: AdminSession): Promise<any> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/admin/content/bulk-export", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      }
    });
    if (ok && data && data.success) {
      return data.backup;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function restoreDatabaseBackup(session: AdminSession, backupData: any): Promise<boolean> {
  try {
    const { ok, data } = await safeFetchJson<any>("/api/admin/content/bulk-restore", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "x-device-id": session.deviceId
      },
      body: JSON.stringify({ backup: backupData })
    });
    return ok && !!data?.success;
  } catch (e) {
    return false;
  }
}
