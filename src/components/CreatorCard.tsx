import React from "react";
import { ArrowRight, BookOpen, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { CreatorProfile } from "../types";

interface CreatorCardProps {
  profile: CreatorProfile;
  onOpenAbout: () => void;
  className?: string;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  profile,
  onOpenAbout,
  className = ""
}) => {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm relative overflow-hidden transition-all hover:shadow-md ${className}`}
    >
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
        {/* Creator Photo with Royal Ring */}
        <div className="relative shrink-0 mx-auto sm:mx-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#2563EB] via-[#9333EA] to-[#DB2777] shadow-md">
            <img
              src={profile.photoUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover bg-slate-100"
              onError={(e) => {
                // Fallback avatar if local file path fails
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#16235A] text-[#FBBF24] p-1 rounded-full border-2 border-white shadow-xs" title="Verified Creator">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
              Created by
            </span>
            <span className="text-[11px] text-[#5B6B8A] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#DB2777]" /> {profile.location}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#16235A] leading-tight">
            {profile.name}
            {profile.honorific && (
              <span className="text-sm font-sans font-normal text-[#5B6B8A] ml-1.5">
                ({profile.honorific})
              </span>
            )}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-[#7C3AED] leading-snug">
            {profile.professionalTitle}
          </p>

          <p className="text-xs text-[#5B6B8A] italic line-clamp-2 pt-0.5">
            "{profile.tagline}"
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
          <button
            id="home-creator-card-learn-more-btn"
            onClick={onOpenAbout}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#16235A] to-[#24357D] hover:from-[#9333EA] hover:to-[#DB2777] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
