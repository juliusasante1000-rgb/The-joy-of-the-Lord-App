import React from "react";

interface AppLogoProps {
  variant?: "full-banner" | "compact-header" | "card-badge" | "icon-only" | "hero-emblem";
  className?: string;
  showSubtitle?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  variant = "compact-header",
  className = "",
  showSubtitle = true
}) => {
  // Muscle Arm Flex Vector Component (Left & Right)
  const MuscleArm = ({ flip = false, className: armClassName = "" }: { flip?: boolean; className?: string }) => (
    <svg
      viewBox="0 0 120 120"
      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-sm transition-transform ${flip ? "scale-x-[-1]" : ""} ${armClassName}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`skinGrad-${flip ? "r" : "l"}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8A882" />
          <stop offset="40%" stopColor="#CF835C" />
          <stop offset="80%" stopColor="#A85936" />
          <stop offset="100%" stopColor="#7E3A1C" />
        </linearGradient>
        <linearGradient id={`muscleHighlight-${flip ? "r" : "l"}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F7CDB5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E8A882" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Shoulder base */}
      <path
        d="M20 110 C25 90, 35 80, 48 78 C52 77, 56 82, 58 92 C60 102, 55 112, 50 118 Z"
        fill={`url(#skinGrad-${flip ? "r" : "l"})`}
      />
      {/* Flexed Bicep Peak */}
      <path
        d="M48 78 C42 62, 52 42, 68 44 C82 46, 88 64, 82 78 C76 86, 60 88, 48 78 Z"
        fill={`url(#skinGrad-${flip ? "r" : "l"})`}
      />
      {/* Bicep Muscle Peak Highlight */}
      <path
        d="M56 60 C54 48, 62 46, 72 48 C78 50, 80 58, 76 66 C70 68, 60 68, 56 60 Z"
        fill={`url(#muscleHighlight-${flip ? "r" : "l"})`}
      />
      {/* Forearm & Flexed Fist */}
      <path
        d="M74 52 C82 42, 94 32, 98 18 C100 12, 94 8, 86 10 C78 12, 70 24, 62 38 C60 42, 64 48, 74 52 Z"
        fill={`url(#skinGrad-${flip ? "r" : "l"})`}
      />
      {/* Clenched Fist */}
      <path
        d="M96 18 C98 14, 94 8, 86 10 C82 11, 80 15, 84 19 C88 22, 94 22, 96 18 Z"
        fill={`url(#skinGrad-${flip ? "r" : "l"})`}
      />
      {/* Defined Contour Shadows */}
      <path
        d="M66 46 C74 48, 80 56, 76 68"
        stroke="#5C2610"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M48 78 C54 82, 68 84, 76 76"
        stroke="#5C2610"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );

  // Icon Only (for favicon, mobile drawer header, compact stamps)
  if (variant === "icon-only") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-[#16235A] border-2 border-[#C026D3] text-white overflow-hidden shadow-md ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deep Royal Navy Background */}
          <rect width="100" height="100" rx="10" fill="#16235A" />
          
          {/* Top Honeycomb Mini */}
          <polygon points="12,18 19,14 26,18 26,26 19,30 12,26" fill="#9333EA" />
          <polygon points="26,18 33,14 40,18 40,26 33,30 26,26" fill="#DB2777" />
          
          {/* Central JOY Box */}
          <rect x="15" y="32" width="70" height="36" rx="4" fill="#16235A" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="38" y="32" width="24" height="36" fill="#FFFFFF" />
          <text x="26" y="59" fill="#FFFFFF" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="900" fontSize="26" textAnchor="middle">J</text>
          <text x="50" y="59" fill="#16235A" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="900" fontSize="26" textAnchor="middle">O</text>
          <text x="74" y="59" fill="#FFFFFF" fontFamily="Montserrat, system-ui, sans-serif" fontWeight="900" fontSize="26" textAnchor="middle">Y</text>
          
          {/* Bottom Triple Border */}
          <line x1="10" y1="84" x2="90" y2="84" stroke="#DB2777" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="89" x2="90" y2="89" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="94" x2="90" y2="94" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Compact Header Version (for the sticky app bar)
  if (variant === "compact-header") {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
        {/* Brand Emblem Stamp */}
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#16235A] border-2 border-[#C026D3] flex items-center justify-center shadow-sm overflow-hidden shrink-0 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16235A] via-[#1E293B] to-[#24357D]" />
          
          {/* Mini JOY Block */}
          <div className="relative z-10 flex items-center gap-0.5 px-1 py-0.5 rounded bg-[#16235A] border border-white/40">
            <span className="text-white font-brand-impact font-black text-xs sm:text-sm">J</span>
            <span className="bg-white text-[#16235A] font-brand-impact font-black text-xs sm:text-sm px-0.5 rounded-xs leading-none">O</span>
            <span className="text-white font-brand-impact font-black text-xs sm:text-sm">Y</span>
          </div>

          {/* Bottom stripe badge accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />
        </div>

        {/* Brand Title & Script Typography */}
        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="font-script text-base sm:text-lg text-[#F472B6] font-bold">The</span>
            <span className="font-brand-impact font-black tracking-tight text-white text-sm sm:text-base uppercase">
              JOY OF THE LORD
            </span>
          </div>
          {showSubtitle && (
            <p className="text-[10px] sm:text-[11px] text-[#E0E7FF] font-medium tracking-wide truncate flex items-center gap-1 mt-0.5">
              <span className="font-bold text-[#F472B6] uppercase tracking-wider">IS MY STRENGTH</span>
              <span className="opacity-40">•</span>
              <span className="font-serif italic opacity-90 text-[#FBBF24]">Nehemiah 8:10</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  // Card Badge Variant (for devotions, quotes, and share previews)
  if (variant === "card-badge") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#16235A] text-white border border-[#C026D3]/60 shadow-sm ${className}`}>
        <div className="flex items-center gap-0.5 bg-[#0D1638] px-1.5 py-0.5 rounded border border-white/20">
          <span className="text-white font-brand-impact font-black text-xs">J</span>
          <span className="bg-white text-[#16235A] font-brand-impact font-black text-xs px-0.5 rounded-xs">O</span>
          <span className="text-white font-brand-impact font-black text-xs">Y</span>
        </div>
        <span className="text-[11px] font-brand-impact font-bold tracking-wider text-[#FDFBFE] uppercase">
          of the Lord is my <span className="text-[#F472B6]">Strength</span>
        </span>
      </div>
    );
  }

  // Full Official Personal Brand Logo Banner (Sleek, Compact, High-Density Edition)
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white border border-[#E8E0F0] text-[#16235A] text-center p-3.5 sm:p-4 shadow-xs transition-all ${className}`}
    >
      {/* Top Triple Horizontal Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />

      {/* TOP LEFT: Hexagonal Honeycomb Mini */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-60 hidden sm:block">
        <svg viewBox="0 0 60 60" className="w-6 h-6">
          <polygon points="9,14 15,10 21,14 21,22 15,26 9,22" fill="#7E22CE" />
          <polygon points="21,14 27,10 33,14 33,22 27,26 21,22" fill="#9333EA" />
          <polygon points="15,26 21,22 27,26 27,34 21,38 15,34" fill="#DB2777" />
        </svg>
      </div>

      {/* TOP RIGHT: Diagonal Hatching Mini */}
      <div className="absolute top-2 right-2 pointer-events-none opacity-60 hidden sm:block">
        <svg viewBox="0 0 40 40" className="w-5 h-5">
          <defs>
            <pattern id="diagHatchMin" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="4" stroke="#DB2777" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="36" height="36" fill="url(#diagHatchMin)" rx="2" />
        </svg>
      </div>

      {/* MAIN COMPACT LOGO COMPOSITION */}
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center justify-center space-y-1 py-0.5">
        {/* Row: Cursive "The", Muscle Arm, JOY Box, Muscle Arm, "of the Lord" */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
          <span className="font-script text-xl sm:text-2xl text-[#16235A] font-bold">The</span>

          {/* Left Flexed Bicep */}
          <MuscleArm flip={false} className="!w-7 !h-7 sm:!w-8 sm:!h-8" />

          {/* Central JOY Box Badge */}
          <div className="bg-[#16235A] text-white px-2 sm:px-3 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 border border-[#16235A]">
            <span className="text-lg sm:text-xl font-brand-impact font-black text-white leading-none">J</span>
            <div className="bg-white text-[#16235A] px-1 rounded-xs flex items-center justify-center">
              <span className="text-lg sm:text-xl font-brand-impact font-black leading-none">O</span>
            </div>
            <span className="text-lg sm:text-xl font-brand-impact font-black text-white leading-none">Y</span>
          </div>

          {/* Right Flexed Bicep */}
          <MuscleArm flip={true} className="!w-7 !h-7 sm:!w-8 sm:!h-8" />

          <span className="text-xs sm:text-sm font-brand-impact font-extrabold text-[#16235A] tracking-tight">of the Lord</span>
        </div>

        {/* Bottom Line: is my STRENGTH + scripture */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs">
          <span className="text-[11px] sm:text-xs font-brand-impact font-bold text-[#5B6B8A]">is my</span>
          <span className="text-sm sm:text-base font-brand-impact font-black uppercase text-[#16235A] tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#16235A] via-[#9333EA] to-[#DB2777]">
            STRENGTH
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[10px] sm:text-xs font-serif italic text-[#5B6B8A]">
            Nehemiah 8:10
          </span>
        </div>
      </div>
    </div>
  );
};
