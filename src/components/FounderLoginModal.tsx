import React, { useState } from "react";
import {
  X,
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { FounderSession } from "../types";
import {
  FOUNDER_PRIMARY_EMAIL,
  FOUNDER_SECONDARY_EMAIL,
  isAuthorizedFounderEmail,
  saveFounderSession
} from "../data/creatorData";
import { safeFetchJson } from "../utils/aiClient";

interface FounderLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: FounderSession) => void;
}

export const FounderLoginModal: React.FC<FounderLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [rememberDevice, setRememberDevice] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (!isAuthorizedFounderEmail(normalizedEmail)) {
      setIsLoading(false);
      setErrorMsg(
        `Access Denied: "${normalizedEmail}" is not authorized. Only the founder's verified email (${FOUNDER_PRIMARY_EMAIL}) can access creator controls.`
      );
      return;
    }

    try {
      const { ok, data, error } = await safeFetchJson<any>("/api/founder-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, pin: pin.trim() })
      });

      if (ok && data && data.success) {
        const session: FounderSession = {
          isAuthenticated: true,
          founderEmail: data.founderEmail || normalizedEmail,
          founderName: data.founderName || "Bismark Twum",
          token: data.token || `session_${Date.now()}`,
          loginTimestamp: Date.now()
        };

        if (rememberDevice) {
          saveFounderSession(session);
        }

        setSuccessMsg("✓ Welcome back, Bismark! Founder authorization confirmed.");
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(session);
          onClose();
        }, 800);
      } else {
        setIsLoading(false);
        setErrorMsg(data?.error || error || "Authentication failed. Please verify your Founder PIN.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg("Network error connecting to verification server. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border-2 border-[#16235A] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#16235A] to-[#24357D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#9333EA] to-[#DB2777] shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif flex items-center gap-1.5">
                Founder Authentication
              </h3>
              <p className="text-[11px] text-slate-300">
                Bismark Twum • Global Sync Access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm text-[#16235A]">
          <div className="p-3.5 rounded-xl bg-[#FAF8FD] border border-[#E8E0F0] text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-[#16235A] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#9333EA]" />
              Founder Access & Global Synchronization
            </p>
            <p>
              Only edits made by the verified founder (<strong>{FOUNDER_PRIMARY_EMAIL}</strong>) are saved to the global server and synchronized live for all users worldwide.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 flex items-center gap-2 animate-in fade-in font-bold">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1.5">
                Founder Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter authorized founder email"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#16235A] focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6B8A] mb-1.5">
                Founder Security PIN / Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  placeholder="Enter security PIN"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-[#16235A] focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded border-slate-300 text-[#9333EA] focus:ring-[#9333EA]"
                />
                <span>Remember this device (Keep me logged in)</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#16235A] via-[#24357D] to-[#9333EA] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Verify & Enable Founder Mode</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
