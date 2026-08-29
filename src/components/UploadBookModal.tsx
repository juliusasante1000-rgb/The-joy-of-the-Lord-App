import React, { useState, useRef } from "react";
import { X, Upload, BookOpen, Plus, FileText, CheckCircle2, AlertCircle, Sparkles, Trash2 } from "lucide-react";
import { Book, BookChapter } from "../types";

interface UploadBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
}

export const UploadBookModal: React.FC<UploadBookModalProps> = ({
  isOpen,
  onClose,
  onAddBook,
}) => {
  const [activeMode, setActiveMode] = useState<"upload" | "manual">("upload");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Spiritual Growth & Devotion");
  const [description, setDescription] = useState("");
  const [coverColor, setCoverColor] = useState("from-amber-800 via-amber-950 to-stone-900");
  const [tagsInput, setTagsInput] = useState("Christian, Spiritual Growth, Faith");
  const [chapters, setChapters] = useState<{ title: string; subtitle?: string; content: string }[]>([
    { title: "Chapter 1: The Beginning of Faith", subtitle: "Walking in Divine Light", content: "" }
  ]);
  const [rawTextFile, setRawTextFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const colorOptions = [
    { label: "Royal Amber", value: "from-amber-800 via-amber-950 to-stone-900" },
    { label: "Deep Emerald", value: "from-emerald-900 via-teal-950 to-slate-900" },
    { label: "Regal Navy", value: "from-blue-900 via-indigo-950 to-slate-900" },
    { label: "Burgundy Wine", value: "from-rose-900 via-stone-900 to-amber-950" },
    { label: "Midnight Crimson", value: "from-stone-900 via-red-950 to-neutral-900" },
    { label: "Imperial Purple", value: "from-purple-900 via-slate-900 to-stone-900" }
  ];

  const handleFileProcess = (file: File) => {
    setErrorMsg(null);
    setIsProcessing(true);
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + " KB");

    // Suggest title from filename
    const suggestedTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    if (!title) {
      setTitle(suggestedTitle);
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (!text || text.trim().length === 0) {
          setErrorMsg("The selected file is empty. Please choose a valid text or document file.");
          setIsProcessing(false);
          return;
        }

        setRawTextFile(text);

        // Auto parse chapters from text
        const parsedChapters = parseChaptersFromRawText(text, suggestedTitle);
        if (parsedChapters.length > 0) {
          setChapters(parsedChapters);
        }

        setIsProcessing(false);
      } catch (err: any) {
        setErrorMsg("Failed to parse file: " + (err?.message || "Unknown error"));
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setErrorMsg("Error reading file. Please try again or paste text manually.");
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const parseChaptersFromRawText = (text: string, defaultTitle: string) => {
    // Look for chapter headers like "Chapter 1", "CHAPTER I", "Section 1", "Part 1", "# Chapter"
    const chapterRegex = /(?:(?:^|\n)(?:#{1,3}\s+)?(?:Chapter|CHAPTER|Section|SECTION|Part|PART|Book|BOOK)\s+([0-9IVXLCDM]+|[A-Za-z\s]+)[:.\-–—]?\s*([^\n]*))/g;
    
    const matches: { index: number; title: string; fullMatch: string }[] = [];
    let match: RegExpExecArray | null;

    while ((match = chapterRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        title: match[0].trim().replace(/^#{1,3}\s*/, ""),
        fullMatch: match[0]
      });
    }

    if (matches.length > 1) {
      const parsed: { title: string; subtitle?: string; content: string }[] = [];
      for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index + matches[i].fullMatch.length;
        const end = i < matches.length - 1 ? matches[i + 1].index : text.length;
        const content = text.slice(start, end).trim();
        parsed.push({
          title: matches[i].title,
          content: content || "Content for this chapter."
        });
      }
      return parsed;
    }

    // Fallback: If text is long, split by ~1200 words into readable chapters
    const paragraphs = text.split(/\n\s*\n/);
    if (paragraphs.length > 6) {
      const parsed: { title: string; subtitle?: string; content: string }[] = [];
      const chunkSize = Math.max(3, Math.ceil(paragraphs.length / 5));
      for (let i = 0; i < paragraphs.length; i += chunkSize) {
        const chunk = paragraphs.slice(i, i + chunkSize).join("\n\n");
        const chapNum = Math.floor(i / chunkSize) + 1;
        parsed.push({
          title: `Chapter ${chapNum}: ${defaultTitle} (Part ${chapNum})`,
          content: chunk
        });
      }
      return parsed;
    }

    // Single chapter fallback
    return [
      {
        title: `Chapter 1: ${defaultTitle || "Complete Book"}`,
        subtitle: "Full Text",
        content: text
      }
    ];
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleAddChapterRow = () => {
    setChapters(prev => [
      ...prev,
      {
        title: `Chapter ${prev.length + 1}: New Chapter`,
        subtitle: "",
        content: ""
      }
    ]);
  };

  const handleRemoveChapterRow = (index: number) => {
    if (chapters.length <= 1) return;
    setChapters(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveBook = () => {
    if (!title.trim()) {
      setErrorMsg("Please enter a book title.");
      return;
    }

    const finalChapters: BookChapter[] = chapters
      .filter(ch => ch.title.trim() && ch.content.trim())
      .map((ch, idx) => {
        const wordCount = ch.content.split(/\s+/).length;
        const estMin = Math.max(1, Math.ceil(wordCount / 180));
        return {
          id: `ch-custom-${Date.now()}-${idx + 1}`,
          chapterNumber: idx + 1,
          title: ch.title.trim(),
          subtitle: ch.subtitle?.trim() || undefined,
          content: ch.content.trim(),
          estimatedMinutes: estMin
        };
      });

    if (finalChapters.length === 0) {
      setErrorMsg("Please provide at least one chapter with readable content.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newBook: Book = {
      id: `book-user-${Date.now()}`,
      title: title.trim(),
      author: author.trim() || "Beloved Contributor",
      category: category.trim() || "Christian Writings",
      description: description.trim() || `A faithful Christian document uploaded to the library on ${new Date().toLocaleDateString()}.`,
      coverColor,
      coverBadge: "Uploaded Work",
      year: new Date().getFullYear().toString(),
      chapters: finalChapters,
      totalChapters: finalChapters.length,
      isCustomUpload: true,
      uploadedAt: new Date().toISOString(),
      tags: tags.length > 0 ? tags : ["Uploaded", "Spiritual Growth"]
    };

    onAddBook(newBook);
    onClose();
  };

  const loadSampleDocument = () => {
    setTitle("Walking in the Light of Christ");
    setAuthor("Bismark");
    setCategory("Spiritual Growth & Devotion");
    setDescription("A timely Christian book exploring sanctification, continuous communion with the Lord, spiritual fruitfulness, and the triumphant joy of the believer.");
    setTagsInput("Holy Living, Light of Christ, Grace, Fruit of the Spirit");
    setChapters([
      {
        title: "Chapter 1: The Call to Holy Walk",
        subtitle: "Stepping Out of Darkness",
        content: `“This then is the message which we have heard of him, and declare unto you, that God is light, and in him is no darkness at all. If we say that we have fellowship with him, and walk in darkness, we lie, and do not the truth: But if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus Christ his Son cleanseth us from all sin.” (1 John 1:5-7)\n\nWalking in the light is not an impossible demand of perfectionism; it is the posture of complete honesty before God. When a disciple walks in the light, they hide nothing from their Heavenly Father. All faults are brought immediately to the fountain of Christ's cleansing blood, and the heart is continually renewed in divine peace.`
      },
      {
        title: "Chapter 2: The Ministry of the Comforter",
        subtitle: "Empowered by the Holy Spirit",
        content: `“Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come.” (John 16:13)\n\nThe Holy Spirit is not an abstract force; He is God Himself dwelling inside every believer. He comforts in affliction, convicts in love, and gives boldness to proclaim the Gospel of Jesus Christ. As we yield our thoughts and decisions to His gentle guidance, our lives begin to reflect the very character of Jesus.`
      },
      {
        title: "Chapter 3: The Triumph of the Redeemed",
        subtitle: "Anchored in Eternal Promises",
        content: `“Nay, in all these things we are more than conquerors through him that loved us. For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come... shall be able to separate us from the love of God, which is in Christ Jesus our Lord.” (Romans 8:37-39)\n\nRejoice always in the Lord! No trial or storm can separate you from His eternal love. Stand firm in the joy of the Lord and let your light shine before all men.`
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] border border-[#E5D5BC] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5D5BC] flex items-center justify-between bg-white/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B48C35]/15 text-[#B48C35] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1A2A44] font-serif">
                Upload & Add Book to Library
              </h2>
              <p className="text-xs text-[#1A2A44]/60">
                Share Christian books, transcripts, sermons, or writings for anyone to read
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#1A2A44]/50 hover:text-[#1A2A44] hover:bg-[#1A2A44]/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: File Upload vs Manual Composition */}
        <div className="px-5 pt-3 pb-1 border-b border-[#E5D5BC]/60 flex items-center justify-between bg-[#F7F3EB]/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMode("upload")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === "upload"
                  ? "bg-[#B48C35] text-white shadow-sm"
                  : "bg-white/80 text-[#1A2A44]/70 hover:bg-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Upload Document / File
            </button>
            <button
              onClick={() => setActiveMode("manual")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === "manual"
                  ? "bg-[#B48C35] text-white shadow-sm"
                  : "bg-white/80 text-[#1A2A44]/70 hover:bg-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Write / Edit Chapters
            </button>
          </div>

          <button
            onClick={loadSampleDocument}
            type="button"
            className="text-[11px] font-semibold text-[#B48C35] hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Load Sample Book
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeMode === "upload" && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[#B48C35] bg-[#B48C35]/10 scale-[0.99]"
                  : "border-[#D1C2A5] hover:border-[#B48C35] bg-white/50 hover:bg-white/90"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileProcess(e.target.files[0]);
                  }
                }}
                accept=".txt,.md,.text,.json,.html,.doc,.docx,.pdf"
                className="hidden"
              />
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#B48C35]/15 text-[#B48C35] flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#1A2A44]">
                {fileName ? `File Selected: ${fileName}` : "Click or Drag & Drop Book/Document Here"}
              </p>
              <p className="text-xs text-[#1A2A44]/60 mt-1">
                Supports TXT, Markdown, Document excerpts, Transcripts & E-Books ({fileSize || "Auto-detects chapters"})
              </p>
              {rawTextFile && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Loaded {chapters.length} chapter{chapters.length > 1 ? "s" : ""} successfully!
                </div>
              )}
            </div>
          )}

          {/* Book Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1A2A44] mb-1">
                Book Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Walking in Divine Strength"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D5BC] text-sm text-[#1A2A44] focus:outline-none focus:border-[#B48C35]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2A44] mb-1">
                Author / Speaker *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Bismark, Brother Lawrence, etc."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D5BC] text-sm text-[#1A2A44] focus:outline-none focus:border-[#B48C35]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1A2A44] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D5BC] text-sm text-[#1A2A44] focus:outline-none focus:border-[#B48C35]"
              >
                <option value="Spiritual Growth & Devotion">Spiritual Growth & Devotion</option>
                <option value="Christian Classics">Christian Classics</option>
                <option value="Prayer & Intercession">Prayer & Intercession</option>
                <option value="Spiritual Warfare & Victory">Spiritual Warfare & Victory</option>
                <option value="Faith & Fasting">Faith & Fasting</option>
                <option value="Holy Living & Sanctification">Holy Living & Sanctification</option>
                <option value="Sermons & Transcripts">Sermons & Transcripts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2A44] mb-1">
                Cover Palette
              </label>
              <div className="flex items-center gap-2 pt-0.5">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    title={opt.label}
                    onClick={() => setCoverColor(opt.value)}
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${opt.value} transition-all ${
                      coverColor === opt.value
                        ? "ring-2 ring-[#B48C35] ring-offset-2 scale-110"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A2A44] mb-1">
              Short Description / Summary
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief overview of the theme and biblical focus of this book..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D5BC] text-sm text-[#1A2A44] focus:outline-none focus:border-[#B48C35]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A2A44] mb-1">
              Keywords / Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Prayer, Joy, Victory, Nehemiah 8:10"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D5BC] text-sm text-[#1A2A44] focus:outline-none focus:border-[#B48C35]"
            />
          </div>

          {/* Chapter Manager */}
          <div className="border-t border-[#E5D5BC] pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A2A44] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B48C35]" />
                Book Chapters ({chapters.length})
              </h3>
              <button
                type="button"
                onClick={handleAddChapterRow}
                className="px-2.5 py-1 rounded-lg bg-[#B48C35]/15 text-[#B48C35] hover:bg-[#B48C35]/25 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Chapter
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E5D5BC] space-y-2 relative group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-6 h-6 rounded-full bg-[#B48C35]/15 text-[#B48C35] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={ch.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setChapters(prev => prev.map((c, i) => i === idx ? { ...c, title: val } : c));
                        }}
                        placeholder={`Chapter ${idx + 1} Title`}
                        className="w-full px-2.5 py-1 rounded-lg bg-[#FDFBF7] border border-[#E5D5BC] text-xs font-bold text-[#1A2A44] focus:outline-none focus:border-[#B48C35]"
                      />
                    </div>
                    {chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChapterRow(idx)}
                        className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove Chapter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={ch.subtitle || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setChapters(prev => prev.map((c, i) => i === idx ? { ...c, subtitle: val } : c));
                    }}
                    placeholder="Subtitle or Scripture anchor (optional)"
                    className="w-full px-2.5 py-1 rounded-lg bg-[#FDFBF7] border border-[#E5D5BC] text-xs text-[#1A2A44]/70 focus:outline-none focus:border-[#B48C35]"
                  />

                  <textarea
                    rows={4}
                    value={ch.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      setChapters(prev => prev.map((c, i) => i === idx ? { ...c, content: val } : c));
                    }}
                    placeholder={`Paste or write the text of Chapter ${idx + 1} here...`}
                    className="w-full p-2.5 rounded-lg bg-[#FDFBF7] border border-[#E5D5BC] text-xs text-[#1A2A44] font-serif leading-relaxed focus:outline-none focus:border-[#B48C35]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E5D5BC] bg-white/90 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#1A2A44]/70 hover:bg-[#1A2A44]/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveBook}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B48C35] to-[#8C6D23] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Publish Book to Library
          </button>
        </div>
      </div>
    </div>
  );
};
