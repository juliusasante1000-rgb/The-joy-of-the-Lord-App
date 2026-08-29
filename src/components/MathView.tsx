import React, { useMemo, useEffect, useRef } from "react";
import katex from "katex";

/**
 * Universal MathJax typesetting helper
 */
export function triggerMathJaxTypeset(containerElement?: HTMLElement | null) {
  if (typeof window !== "undefined" && (window as any).MathJax) {
    try {
      if ((window as any).MathJax.typesetPromise) {
        if (containerElement) {
          (window as any).MathJax.typesetPromise([containerElement]).catch(() => {});
        } else {
          (window as any).MathJax.typesetPromise().catch(() => {});
        }
      } else if ((window as any).MathJax.typeset) {
        (window as any).MathJax.typeset();
      }
    } catch {
      // ignore
    }
  }
}

/**
 * Standardize any mathematical formula, unicode symbols, exponents, subscripts,
 * vectors, inner products, and descriptive text labels into valid, pristine KaTeX-compatible LaTeX.
 */
export function standardizeMathString(input: string): string {
  if (!input) return "";
  let s = input.trim();

  // Strip outer math delimiters if present
  if (s.startsWith("$$") && s.endsWith("$$")) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith("\\[") && s.endsWith("\\]")) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith("$") && s.endsWith("$") && s.length > 2) {
    s = s.slice(1, -1).trim();
  } else if (s.startsWith("\\(") && s.endsWith("\\)")) {
    s = s.slice(2, -2).trim();
  }

  // Handle smart quotes and apostrophes
  s = s.replace(/[“”]/g, "").replace(/[‘’]/g, "'");

  // Handle em-dash (—) and en-dash (–) so KaTeX does not fail in math mode
  s = s.replace(/—/g, " \\text{ --- } ").replace(/–/g, " \\text{ -- } ");

  // Sanitize trailing descriptive brackets or keep mathematical brackets intact:
  // e.g. [The Law of Exponential Compound Interest & Fruitfulness] -> \text{[The Law of Exponential Compound Interest \& Fruitfulness]}
  // while [Grace(t) \cdot e^{\gamma t}] stays as math brackets [Grace(t) \cdot e^{\gamma t}]
  s = s.replace(/\[([\s\S]*?)\]/g, (match, inside) => {
    // If it contains LaTeX commands or mathematical operators, keep as math brackets
    const hasMathCommands = /\\[a-zA-Z]+|[=^_+\-/*\\]|\\int|\\sum|\\cdot|\\vec|\\lim/.test(inside);
    if (hasMathCommands) {
      return `[${inside}]`;
    }
    // Otherwise it is a descriptive English annotation
    let cleanInside = inside
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/&/g, "\\&")
      .replace(/_/g, "\\_")
      .trim();
    return `\\text{[${cleanInside}]}`;
  });

  // 1. Standardize Unicode Greek Letters into LaTeX
  s = s
    .replace(/α/g, "\\alpha ")
    .replace(/β/g, "\\beta ")
    .replace(/γ/g, "\\gamma ")
    .replace(/δ/g, "\\delta ")
    .replace(/ε/g, "\\epsilon ")
    .replace(/θ/g, "\\theta ")
    .replace(/λ/g, "\\lambda ")
    .replace(/μ/g, "\\mu ")
    .replace(/π/g, "\\pi ")
    .replace(/ρ/g, "\\rho ")
    .replace(/σ/g, "\\sigma ")
    .replace(/τ/g, "\\tau ")
    .replace(/φ/g, "\\phi ")
    .replace(/ψ/g, "\\psi ")
    .replace(/ω/g, "\\omega ")
    .replace(/Δ/g, "\\Delta ")
    .replace(/Σ/g, "\\Sigma ")
    .replace(/Ω/g, "\\Omega ")
    .replace(/Γ/g, "\\Gamma ")
    .replace(/Λ/g, "\\Lambda ")
    .replace(/Φ/g, "\\Phi ")
    .replace(/Ψ/g, "\\Psi ");

  // 2. Standardize ASCII approximations & Logic Symbols
  s = s
    .replace(/<==>/g, " \\iff ")
    .replace(/<=>/g, " \\iff ")
    .replace(/==>/g, " \\implies ")
    .replace(/=>/g, " \\implies ")
    .replace(/-->/g, " \\to ")
    .replace(/->/g, " \\to ")
    .replace(/<=/g, " \\le ")
    .replace(/>=/g, " \\ge ")
    .replace(/!=/g, " \\neq ")
    .replace(/\+-/g, " \\pm ")
    .replace(/\btherefore\b/gi, "\\therefore")
    .replace(/\bbecause\b/gi, "\\because")
    .replace(/\bforall\b/gi, "\\forall")
    .replace(/\bexists\b/gi, "\\exists")
    .replace(/\binfinity\b/gi, "\\infty")
    .replace(/\binf\b/gi, "\\infty");

  // 3. Standardize Unicode Math Operators & Set Symbols into LaTeX
  s = s
    .replace(/→/g, " \\to ")
    .replace(/⇒/g, " \\implies ")
    .replace(/⇔/g, " \\iff ")
    .replace(/↔/g, " \\leftrightarrow ")
    .replace(/∈/g, " \\in ")
    .replace(/∉/g, " \\notin ")
    .replace(/⊆/g, " \\subseteq ")
    .replace(/⊂/g, " \\subset ")
    .replace(/∪/g, " \\cup ")
    .replace(/∩/g, " \\cap ")
    .replace(/∅/g, " \\emptyset ")
    .replace(/∑/g, " \\sum ")
    .replace(/∏/g, " \\prod ")
    .replace(/∫/g, " \\int ")
    .replace(/∬/g, " \\iint ")
    .replace(/∭/g, " \\iiint ")
    .replace(/∮/g, " \\oint ")
    .replace(/√/g, " \\sqrt ")
    .replace(/∞/g, " \\infty ")
    .replace(/≠/g, " \\neq ")
    .replace(/≤/g, " \\le ")
    .replace(/≥/g, " \\ge ")
    .replace(/≈/g, " \\approx ")
    .replace(/≡/g, " \\equiv ")
    .replace(/∝/g, " \\propto ")
    .replace(/±/g, " \\pm ")
    .replace(/×/g, " \\times ")
    .replace(/÷/g, " \\div ")
    .replace(/·/g, " \\cdot ")
    .replace(/∇/g, " \\nabla ")
    .replace(/∂/g, " \\partial ")
    .replace(/∠/g, " \\angle ")
    .replace(/⊥/g, " \\perp ")
    .replace(/∥/g, " \\parallel ")
    .replace(/∴/g, " \\therefore ")
    .replace(/∵/g, " \\because ")
    .replace(/∀/g, " \\forall ")
    .replace(/∃/g, " \\exists ")
    .replace(/ℝ/g, " \\mathbb{R} ")
    .replace(/ℤ/g, " \\mathbb{Z} ")
    .replace(/ℕ/g, " \\mathbb{N} ")
    .replace(/ℂ/g, " \\mathbb{C} ")
    .replace(/ℙ/g, " \\mathbb{P} ")
    .replace(/ℚ/g, " \\mathbb{Q} ");

  // 4. Standardize Function names & Shorthands like sqrt(...) -> \sqrt{...}
  s = s.replace(/\bsqrt\(([^)]+)\)/g, "\\sqrt{$1}");
  s = s.replace(/\blim_\{([^}]+)\}/g, "\\lim_{$1}");
  s = s.replace(/\blim\s+([a-zA-Z0-9\\]+)\s*(?:->|\\to|→)\s*([a-zA-Z0-9\\-]+)/g, "\\lim_{$1 \\to $2}");
  s = s.replace(/\bvec\(([^)]+)\)/g, "\\vec{$1}");
  s = s.replace(/\\vec\s+([a-zA-Z0-9])/g, "\\vec{$1}");
  s = s.replace(/\|\|([^|]+)\|\|/g, "\\lVert $1 \\rVert");
  s = s.replace(/<([^,>]+),\s*([^>]+)>/g, "\\langle $1, $2 \\rangle");

  // 5. Standardize Unicode Superscripts & Subscripts
  s = s
    .replace(/⁰/g, "^0")
    .replace(/¹/g, "^1")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/⁴/g, "^4")
    .replace(/⁵/g, "^5")
    .replace(/⁶/g, "^6")
    .replace(/⁷/g, "^7")
    .replace(/⁸/g, "^8")
    .replace(/⁹/g, "^9")
    .replace(/ⁿ/g, "^n")
    .replace(/⁺/g, "^+")
    .replace(/⁻/g, "^-")
    .replace(/₀/g, "_0")
    .replace(/₁/g, "_1")
    .replace(/₂/g, "_2")
    .replace(/₃/g, "_3")
    .replace(/₄/g, "_4")
    .replace(/₅/g, "_5")
    .replace(/₆/g, "_6")
    .replace(/₇/g, "_7")
    .replace(/₈/g, "_8")
    .replace(/₉/g, "_9")
    .replace(/ᵢ/g, "_i")
    .replace(/ⱼ/g, "_j")
    .replace(/ₖ/g, "_k")
    .replace(/ₙ/g, "_n");

  // 6. Standardize Calculus Differentials & ASCII Fractions
  s = s.replace(/\(([^)]+)\)\s*\/\s*\(([^)]+)\)/g, "\\frac{$1}{$2}");
  s = s.replace(/\(([^)]+)\)\s*\/\s*([a-zA-Z0-9\\]+)/g, "\\frac{$1}{$2}");
  s = s.replace(/\b([a-zA-Z0-9\\]+)\s*\/\s*\(([^)]+)\)/g, "\\frac{$1}{$2}");
  s = s.replace(/\\Delta\s*([a-zA-Z])\s*\/\s*\\Delta\s*([a-zA-Z])/g, "\\frac{\\Delta $1}{\\Delta $2}");
  s = s.replace(/\bdy\/dx\b/g, "\\frac{dy}{dx}");
  s = s.replace(/\bdf\/dx\b/g, "\\frac{df}{dx}");
  s = s.replace(/\bdt\/dx\b/g, "\\frac{dt}{dx}");
  s = s.replace(/\bd\(([^)]+)\)\/dt\b/g, "\\frac{d($1)}{dt}");

  // Standardize single-letter limits and sums without braces: \int_0^T -> \int_{0}^{T}
  s = s.replace(/\\int_([0-9a-zA-Z])\^([0-9a-zA-Z])/g, "\\int_{$1}^{$2}");
  s = s.replace(/\\sum_([0-9a-zA-Z])\^([0-9a-zA-Z])/g, "\\sum_{$1}^{$2}");

  // 7. Sanitize raw ampersands not inside aligned/matrix environments
  const hasAlignedEnv = /\\begin\{(?:aligned|matrix|pmatrix|bmatrix|cases|array|align|split)\}/.test(s);
  if (!hasAlignedEnv) {
    s = s.replace(/([^\\])&/g, "$1 \\text{ \\& } ");
  }

  // 8. Standardize unescaped percentage signs
  s = s.replace(/([0-9]+)%/g, "$1\\%");

  // 9. Standardize conditional probability vertical bar: P(A | B) -> P(A \mid B)
  s = s.replace(/\|\s*(?=[a-zA-Z\\])/g, "\\mid ");

  // 10. Standardize asterisks to multiplication dots: a * b -> a \cdot b
  s = s.replace(/([0-9a-zA-Z\\}\)])\s*\*\s*([0-9a-zA-Z\\{\(])/g, "$1 \\cdot $2");

  // 11. Wrap non-LaTeX multi-character word subscripts and superscripts in \text{...}
  s = s.replace(/_\{([a-zA-Z\s]{2,})\}/g, (match, p1) => {
    if (p1.startsWith("\\text") || p1.startsWith("\\mathbb") || p1.startsWith("\\mathbf") || p1.startsWith("\\mathrm")) {
      return match;
    }
    return `_{\\text{${p1.trim()}}}`;
  });

  s = s.replace(/_([a-zA-Z]{2,})(?=\b|[^a-zA-Z0-9_])/g, (match, p1) => {
    return `_{\\text{${p1}}}`;
  });

  s = s.replace(/\^\{([a-zA-Z\s]{2,})\}/g, (match, p1) => {
    if (p1.startsWith("\\text") || p1.startsWith("\\mathbb") || p1.startsWith("\\mathbf") || p1.startsWith("\\mathrm")) {
      return match;
    }
    return `^{\\text{${p1.trim()}}}`;
  });

  // 12. Standardize common theological/mathematical word terms inside formulas so they render as clean text fonts
  const reservedWords = [
    "Grace", "Power", "Faith", "Destiny", "Prayer", "Word", "HolySpirit", "Peace",
    "Trial", "Victory", "Breakthrough", "TotalDeliverance", "Righteousness", "Anointing",
    "Strength", "Joy", "Love", "Glory", "Resurrection", "Acceleration", "Momentum",
    "Force", "Energy", "Work", "Velocity", "Displacement", "Potential", "Capacity"
  ];
  for (const word of reservedWords) {
    const wordRegex = new RegExp(`(?<!\\\\text\\{[^}]*)\\b${word}\\b(?![a-zA-Z0-9_])`, "g");
    s = s.replace(wordRegex, `\\text{${word}}`);
  }

  // 13. Sanitize underscores inside \text{...} so KaTeX does not fail on \text{Origin_Christ}
  s = s.replace(/\\text\{([^}]+)\}/g, (match, inner) => {
    return `\\text{${inner.replace(/(?<!\\)_/g, "\\_")}}`;
  });

  // 14. Clean differential spacing in integrals: dt -> \,dt, dx -> \,dx
  s = s.replace(/([a-zA-Z0-9\\}\)])\s+d([txyzuv\tau\theta])/g, "$1\\,d$2");

  // 15. Check and repair brace balance
  let openBraces = (s.match(/\{/g) || []).length;
  let closeBraces = (s.match(/\}/g) || []).length;
  if (openBraces > closeBraces) {
    s += "}".repeat(openBraces - closeBraces);
  }

  return s;
}

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const html = useMemo(() => {
    if (!math) return "";
    try {
      const cleanMath = standardizeMathString(math);

      const rendered = katex.renderToString(cleanMath, {
        displayMode: block,
        throwOnError: false,
        output: "htmlAndMathml",
        strict: false
      });

      // If KaTeX rendered without error, return immediately
      if (!rendered.includes("katex-error")) {
        return rendered;
      }

      // If KaTeX generated a .katex-error span, attempt targeted recovery:
      const recovered = cleanMath
        .replace(/—/g, "\\text{ --- }")
        .replace(/–/g, "\\text{ -- }")
        .replace(/([^\\])&/g, "$1\\&")
        .replace(/([^\\])%/g, "$1\\%")
        .replace(/\\text\{([^}]+)\}/g, (_, inner) => `\\text{${inner.replace(/(?<!\\)_/g, "\\_")}}`);

      const retryRender = katex.renderToString(recovered, {
        displayMode: block,
        throwOnError: false,
        output: "htmlAndMathml",
        strict: false
      });

      if (!retryRender.includes("katex-error")) {
        return retryRender;
      }

      // If still erroring, safely escape all LaTeX control chars for text fallback
      const safeText = math
        .replace(/\$\$/g, "")
        .replace(/\$/g, "")
        .replace(/\\\[/g, "")
        .replace(/\\\]/g, "")
        .replace(/\\/g, " ")
        .replace(/[{}]/g, " ")
        .replace(/_/g, " ")
        .trim();

      return katex.renderToString(`\\text{${safeText}}`, {
        displayMode: block,
        throwOnError: false,
        output: "htmlAndMathml",
        strict: false
      });
    } catch (err) {
      console.warn("KaTeX render error:", err);
      const safeText = (math || "").replace(/[\\${}]/g, " ").trim();
      return `<span class="font-mono text-amber-300 font-semibold px-2 py-0.5 rounded bg-slate-900/60 inline-block">${safeText}</span>`;
    }
  }, [math, block]);

  useEffect(() => {
    if (containerRef.current) {
      triggerMathJaxTypeset(containerRef.current);
    }
  }, [html]);

  return (
    <span
      ref={containerRef}
      className={`inline-math-container max-w-full ${
        block ? "block my-2 py-1 text-center overflow-x-hidden break-words" : "inline-block align-middle mx-0.5"
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface RichMathContentProps {
  content: string;
  className?: string;
}

/**
 * Intelligent renderer that splits mixed narrative text into paragraphs,
 * detecting display LaTeX blocks, inline equations ($...$, commands with backslashes),
 * bold markdown, and bullet items, rendering every equation seamlessly with KaTeX and MathJax.
 */
export const RichMathContent: React.FC<RichMathContentProps> = ({ content, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      triggerMathJaxTypeset(containerRef.current);
    }
  }, [content]);
  const renderedElements = useMemo(() => {
    if (!content) return null;

    // Normalizing newlines
    const rawText = content.replace(/\r\n/g, "\n");

    // Match multi-line LaTeX blocks like \begin{cases}...\end{cases}, \begin{pmatrix}...\end{pmatrix}, $$...$$, \[...\]
    const tokenRegex = /(\\begin\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\}[\s\S]*?\\end\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\}|\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g;

    const sections: { isBlockMath: boolean; text: string }[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(rawText)) !== null) {
      if (match.index > lastIdx) {
        sections.push({
          isBlockMath: false,
          text: rawText.slice(lastIdx, match.index)
        });
      }
      sections.push({
        isBlockMath: true,
        text: match[0]
      });
      lastIdx = match.index + match[0].length;
    }

    if (lastIdx < rawText.length) {
      sections.push({
        isBlockMath: false,
        text: rawText.slice(lastIdx)
      });
    }

    return sections.map((sec, secIdx) => {
      if (sec.isBlockMath) {
        return (
          <div
            key={`block-math-${secIdx}`}
            className="my-3 p-3.5 bg-white/95 rounded-xl border border-purple-200/90 shadow-2xs overflow-x-hidden max-w-full text-center"
          >
            <MathView math={sec.text} block={true} className="text-sm sm:text-base text-[#16235A]" />
          </div>
        );
      }

      // Break text section into paragraphs
      const paragraphs = sec.text.split(/\n\s*\n/);

      return (
        <div key={`text-sec-${secIdx}`} className="space-y-3">
          {paragraphs.map((para, pIdx) => {
            const trimmed = para.trim();
            if (!trimmed) return null;

            // Check for labeled formula: e.g. "Mathematical Analogy & Law: R_{\text{destiny}} = ..."
            const labeledFormulaMatch = trimmed.match(/^((?:Mathematical\s+Analogy\s+(?:&|and)\s+Law|Mathematical\s+Formula|Formula|Equation|Law|Calculus\s+Model|Theorem)(?:\s*\([^)]+\))?:\s*)(.+)$/i);
            if (labeledFormulaMatch && checkIsStandaloneFormula(labeledFormulaMatch[2])) {
              return (
                <div
                  key={`labeled-formula-${pIdx}`}
                  className="my-3 p-3.5 bg-gradient-to-r from-purple-50/90 to-indigo-50/90 rounded-xl border border-purple-200/90 shadow-2xs overflow-x-hidden max-w-full"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
                    <span>{labeledFormulaMatch[1].replace(/:\s*$/, "")}</span>
                  </div>
                  <div className="p-2.5 bg-white/95 rounded-lg border border-purple-100 text-center overflow-x-hidden">
                    <MathView math={labeledFormulaMatch[2]} block={true} className="text-sm sm:text-base text-[#16235A]" />
                  </div>
                </div>
              );
            }

            // Check if this single paragraph line is a standalone formula line
            const isStandaloneFormula = checkIsStandaloneFormula(trimmed);

            if (isStandaloneFormula) {
              return (
                <div
                  key={`formula-line-${pIdx}`}
                  className="my-2.5 p-3 bg-white/90 rounded-xl border border-purple-200/80 shadow-2xs overflow-x-hidden max-w-full text-center"
                >
                  <MathView math={trimmed} block={true} className="text-sm sm:text-base text-[#16235A]" />
                </div>
              );
            }

            // Regular paragraph containing potential inline math and lines
            const lines = trimmed.split("\n");

            return (
              <div key={`para-${pIdx}`} className="leading-relaxed text-slate-700">
                {lines.map((line, lIdx) => {
                  const lineTrimmed = line.trim();
                  if (!lineTrimmed) return null;

                  const lineLabeledMatch = lineTrimmed.match(/^((?:Mathematical\s+Analogy\s+(?:&|and)\s+Law|Mathematical\s+Formula|Formula|Equation|Law|Calculus\s+Model|Theorem)(?:\s*\([^)]+\))?:\s*)(.+)$/i);
                  if (lineLabeledMatch && checkIsStandaloneFormula(lineLabeledMatch[2])) {
                    return (
                      <div
                        key={`line-labeled-${lIdx}`}
                        className="my-2.5 p-3 bg-purple-50/90 rounded-xl border border-purple-200 shadow-2xs overflow-x-hidden max-w-full"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                          <span>{lineLabeledMatch[1].replace(/:\s*$/, "")}</span>
                        </div>
                        <div className="p-2 bg-white/95 rounded-lg border border-purple-100 text-center">
                          <MathView math={lineLabeledMatch[2]} block={true} className="text-sm text-[#16235A]" />
                        </div>
                      </div>
                    );
                  }

                  const lineIsFormula = checkIsStandaloneFormula(lineTrimmed);

                  if (lineIsFormula) {
                    return (
                      <div
                        key={`line-formula-${lIdx}`}
                        className="my-2 p-2.5 bg-white/95 rounded-lg border border-purple-100 shadow-2xs overflow-x-hidden max-w-full text-center"
                      >
                        <MathView math={lineTrimmed} block={true} className="text-sm text-[#16235A]" />
                      </div>
                    );
                  }

                  const isBullet = lineTrimmed.startsWith("•") || lineTrimmed.startsWith("-") || /^\d+[\.\)]\s/.test(lineTrimmed);
                  const bulletText = isBullet ? lineTrimmed.replace(/^([•-]\s*|\d+[\.\)]\s*)/, "") : lineTrimmed;
                  const bulletNumber = /^\d+[\.\)]\s/.test(lineTrimmed) ? lineTrimmed.match(/^(\d+[\.\)])\s/)?.[1] : null;

                  return (
                    <div
                      key={`line-${lIdx}`}
                      className={isBullet ? "flex items-start gap-2 ml-1 sm:ml-2 my-1" : "my-0.5"}
                    >
                      {isBullet && (
                        <span className="text-[#9333EA] font-bold font-mono select-none shrink-0 text-xs mt-0.5">
                          {bulletNumber || "•"}
                        </span>
                      )}
                      <span className="flex-1 min-w-0">{renderInlineSegments(bulletText)}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    });
  }, [content]);

  return <div className={`rich-math-content font-sans ${className}`}>{renderedElements}</div>;
};

/**
 * Helper to determine if a string is purely or primarily a mathematical formula line
 */
function checkIsStandaloneFormula(line: string): boolean {
  const t = line.trim();
  if (!t || t.length < 2) return false;

  // Exclude narrative sentences that happen to mention a variable
  const narrativeStarters = [
    "in mathematics",
    "however",
    "substituting",
    "the solution",
    "consider",
    "at first glance",
    "we discover",
    "furthermore",
    "the gradient",
    "ask yourself",
    "our journey",
    "when you faithfully",
    "the christian",
    "faith does not",
    "lord",
    "father",
    "blessed",
    "scripture teaches"
  ];
  const lower = t.toLowerCase();
  if (narrativeStarters.some((starter) => lower.startsWith(starter))) {
    return false;
  }

  // Strong LaTeX indicators
  const hasLatexCommands =
    t.includes("\\implies") ||
    t.includes("\\iff") ||
    t.includes("\\frac") ||
    t.includes("\\dfrac") ||
    t.includes("\\tfrac") ||
    t.includes("\\sqrt") ||
    t.includes("\\cdot") ||
    t.includes("\\times") ||
    t.includes("\\sum") ||
    t.includes("\\prod") ||
    t.includes("\\int") ||
    t.includes("\\iint") ||
    t.includes("\\oint") ||
    t.includes("\\lim") ||
    t.includes("\\in") ||
    t.includes("\\subset") ||
    t.includes("\\subseteq") ||
    t.includes("\\cap") ||
    t.includes("\\cup") ||
    t.includes("\\emptyset") ||
    t.includes("\\vec") ||
    t.includes("\\hat") ||
    t.includes("\\mathbf") ||
    t.includes("\\mathbb") ||
    t.includes("\\mathrm") ||
    t.includes("\\text") ||
    t.includes("\\quad") ||
    t.includes("\\qquad") ||
    t.includes("\\alpha") ||
    t.includes("\\beta") ||
    t.includes("\\gamma") ||
    t.includes("\\theta") ||
    t.includes("\\Delta") ||
    t.includes("\\nabla") ||
    t.includes("\\partial") ||
    t.includes("\\pmatrix") ||
    t.includes("\\cases") ||
    t.includes("\\le") ||
    t.includes("\\ge") ||
    t.includes("\\neq") ||
    t.includes("\\approx") ||
    t.includes("\\propto") ||
    t.includes("\\infty");

  if (hasLatexCommands) return true;

  // Equations with algebraic structure and operators
  const isAlgebraicEquation =
    (/^[a-zA-Z0-9_\(\)\s\+\-\*\/\^\=]{3,}$/.test(t) && t.includes("=") && (t.includes("+") || t.includes("-") || t.includes("^") || t.includes("*") || t.includes("/"))) ||
    t.startsWith("x^2") ||
    t.startsWith("y =") ||
    t.startsWith("f(x)") ||
    t.startsWith("g(x)") ||
    t.startsWith("P_") ||
    t.startsWith("T(") ||
    t.startsWith("R_") ||
    t.startsWith("E = mc^2") ||
    t.startsWith("E = m") ||
    t.startsWith("F = m") ||
    /^\(?[xyzmtABCPQ]\s*[\+\-\*\/]\s*[xyzmt0-9\s\+\-\*\/]*\)?\s*=\s*[0-9xyzmtABCPQ\+\-\*\/\(\)]+$/.test(t);

  return isAlgebraicEquation;
}

/**
 * Helper that parses a single line of text for inline math like $...$,
 * expressions with \implies, \frac, (x + y = 10), (x = 6, y = 4), m > 0, etc.,
 * and bold markdown **...**.
 */
function renderInlineSegments(text: string): React.ReactNode[] {
  // Regex to capture:
  // 1. Explicit math delimiters: $...$, \(...\), $$...$$, \[...\]
  // 2. Bold text: **...**
  // 3. Parenthesized equations and math expressions: (x + y = 10), (R_{\text{destiny}} = ...), (\vec{F} = m\vec{a}), (m = \frac{\Delta y}{\Delta x})
  // 4. Standalone equations/tokens: \implies, y = mx + c, m > 0, m < 0, m = 0, x \in A, A \subset U, f(x), \vec{v}, \hat{u}, \Delta, \nabla, \alpha, \theta, \int
  const inlineRegex = /(\$\$[^\$]+?\$\$|\\\[[\s\S]+?\\\]|\$[^\$\n]+?\$|\\\([^\)\n]+?\\\)|(?:\*\*[^*]+?\*\*)|(?:\((?:[a-zA-Z0-9_\^\+\-\*\/\s\\\{\}\(\)]+=[a-zA-Z0-9_\^\+\-\*\/\s\\\{\}\(\)]+|[a-zA-Z0-9_\s\\\{\}]+(?:\\(?:cdot|times|pm|vec|frac|sum|int|lim|Delta|nabla|alpha|beta|gamma|theta|lambda|pi|sigma|omega))[a-zA-Z0-9_\^\+\-\*\/\s\\\{\}\(\)]*)\))|(?:\b(?:y\s*=\s*mx\s*\+\s*c|m\s*[><=]\s*[\d\.\-]+|x\s*\\in\s*[A-Z]|A\s*\\subset\s*[U-Z]|f\(x\)\s*=\s*\w+|y\s*=\s*2\^x|y\s*=\s*x|t\s*=\s*0|a\^2\s*\+\s*b\^2\s*=\s*c\^2|E\s*=\s*mc\^2|F\s*=\s*ma)\b)|(?:\\(?:implies|iff|to|vec\{[^\}]+\}|hat\{[^\}]+\}|mathbf\{[^\}]+\}|mathbb\{[^\}]+\}|mathrm\{[^\}]+\}|text\{[^\}]+\}|frac\{[^\}]+\}\{[^\}]+\}|dfrac\{[^\}]+\}\{[^\}]+\}|tfrac\{[^\}]+\}\{[^\}]+\}|sqrt(?:\[[^\]]+\])?\{[^\}]+\}|int(?:_[^{]+)?(?:\^[^{]+)?|sum(?:_[^{]+)?(?:\^[^{]+)?|prod(?:_[^{]+)?(?:\^[^{]+)?|lim_\{[^\}]+\}|Delta|nabla|partial|alpha|beta|gamma|theta|lambda|pi|sigma|tau|mu|omega|Omega|Sigma|Phi|infty|approx|le|ge|neq|cdot|times|pm)))/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-bold text-[#16235A]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("$") && token.endsWith("$")) {
      parts.push(
        <MathView key={`m-${match.index}`} math={token.slice(1, -1)} block={false} />
      );
    } else if (token.startsWith("\\(") && token.endsWith("\\)")) {
      parts.push(
        <MathView key={`m-${match.index}`} math={token.slice(2, -2)} block={false} />
      );
    } else if (token.startsWith("(") && token.endsWith(")") && token.includes("=")) {
      // e.g. (x + y = 10)
      parts.push(
        <span key={`p-${match.index}`} className="inline-flex items-center">
          (<MathView math={token.slice(1, -1)} block={false} />)
        </span>
      );
    } else {
      // Bare math token like y = mx + c, \implies, etc.
      parts.push(
        <MathView key={`bm-${match.index}`} math={token} block={false} />
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
