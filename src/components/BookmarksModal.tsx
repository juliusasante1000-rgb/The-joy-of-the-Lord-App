import React, { useState } from "react";
import { X, Bookmark, Trash2, ExternalLink, Search, Sparkles } from "lucide-react";
import { BookmarkItem } from "../types";

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (targetId: string, type: string) => void;
  onSelectBookmark: (bookmark: BookmarkItem) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectBookmark
}) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredBookmarks = bookmarks.filter((bm) => {
    const matchesType = filterType === "all" || bm.type === filterType;
    const matchesSearch =
      !searchQuery ||
      bm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bm.reference && bm.reference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] w-full max-w-xl rounded-xl shadow-2xl border-2 border-[#B48C35] max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5D5BC] flex items-center justify-between bg-[#0F172A] text-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#DCC398] fill-[#DCC398]" />
            <h3 className="text-base sm:text-lg font-serif text-white">
              Saved Scriptures & Devotions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 pb-0 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#B48C35] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search saved scriptures, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] focus:outline-hidden focus:border-[#B48C35]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {["all", "hymn", "book", "quote", "scripture", "devotion", "doctrine", "prayer"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded capitalize font-bold uppercase tracking-wider transition-all ${
                  filterType === type
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "bg-white border border-[#E5D5BC] text-[#1A2A44] hover:bg-[#FDFBF7]"
                }`}
              >
                {type === "hymn" ? "Hymns" : type === "book" ? "Books" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Bookmarks List */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-slate-400 bg-white rounded-lg border border-[#E5D5BC]">
              <Bookmark className="w-10 h-10 mx-auto text-[#B48C35] opacity-50 stroke-1" />
              <p className="text-sm font-serif font-bold text-[#0F172A]">No bookmarks found in this category.</p>
              <p className="text-xs text-[#64748B]">Tap the bookmark icon on any scripture, devotion, or doctrine to save it here.</p>
            </div>
          ) : (
            filteredBookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-4 rounded-lg bg-white border border-[#E5D5BC] hover:border-[#B48C35] transition-all space-y-2 group shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C35]">
                      {bm.type} {bm.reference ? `• ${bm.reference}` : ""}
                    </span>
                    <h4 className="text-sm sm:text-base font-serif text-[#0F172A] truncate">
                      {bm.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <button
                      onClick={() => onSelectBookmark(bm)}
                      className="p-1.5 rounded text-[#0F172A] hover:bg-[#F1E6D2] text-xs flex items-center gap-1"
                      title="Open"
                    >
                      <ExternalLink className="w-4 h-4 text-[#B48C35]" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(bm.targetId, bm.type)}
                      className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#334155] line-clamp-2 italic font-serif">
                  "{bm.snippet}"
                </p>

                <p className="text-[10px] text-[#64748B] font-mono">
                  Saved on {new Date(bm.dateAdded).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5D5BC] bg-white flex justify-between items-center text-xs text-[#64748B]">
          <span className="font-mono">{filteredBookmarks.length} item(s) saved</span>
          <button
            onClick={onClose}
            className="py-1.5 px-5 rounded border border-[#E5D5BC] text-[#1A2A44] hover:bg-[#FDFBF7] font-bold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
