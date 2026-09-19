/**
 * Mathematical Analogy & Equation Sanitizer for Non-MathemaSermon Content.
 * Strictly enforces user mandate:
 * "When generating AI messages, strictly reserve mathematical analogies and equations for Mathemasermon and do not include them elsewhere.
 * For instance, a normal devotion was found having what I have uploaded, which is not supposed to so.
 * All AI-generated messages from these places should not have anything to do with maths:
 * 'Explain This Verse, Historical Context, Create Devotion, Create Prayer, The Joy of the Lord, prayer point, etc'"
 */

/**
 * Returns true if the actionType or category corresponds to a MathemaSermon or ApostleMath item.
 */
export function isMathAllowedCategory(category?: string, actionType?: string): boolean {
  const combined = `${category || ""} ${actionType || ""}`.toLowerCase();
  return (
    combined.includes("mathemasermon") ||
    combined.includes("apostlemath") ||
    combined.includes("math_lesson") ||
    combined.includes("mathema_sermon")
  );
}

/**
 * Removes mathematical equations, formulas, vectors, and mathematical analogies
 * from non-MathemaSermon content.
 */
export function cleanMathFromNonMathContent(text: string): string {
  if (!text || typeof text !== "string") return "";

  let cleaned = text;

  // 1. Remove display LaTeX equations: $$...$$ and \[...\]
  cleaned = cleaned.replace(/\$\$[\s\S]*?\$\$/g, "");
  cleaned = cleaned.replace(/\\\[[\s\S]*?\\\]/g, "");

  // 2. Remove inline LaTeX formulas: $...$ and \(...\)
  cleaned = cleaned.replace(/\$([^\$\n]+?)\$/g, (match, inner) => {
    // If it's a dollar amount like $50, keep it
    if (/^\s*\d+(?:\.\d+)?\s*$/.test(inner)) {
      return match;
    }
    return "";
  });
  cleaned = cleaned.replace(/\\\(([^\)\n]+?)\\\)/g, "");

  // 3. Remove paragraphs or blocks starting with math headers
  cleaned = cleaned.replace(
    /^[ \t]*(?:[*_#\s-]*)*(?:Mathematical\s+(?:Analogy|Formula|Principle|Law|Model|Equation)|Calculus\s+Model|Physical\s+Law|Vector\s+Model|Force\s+Vector|Formula|Equation|Theorem|Invariant\s+Constant)[:\s][^\n]*\n?/gim,
    ""
  );

  // 4. Remove standalone formula lines (e.g. F = ma, P(t) = P0 e^kt, dx/dt, etc.)
  cleaned = cleaned.replace(
    /^[ \t]*(?:[a-zA-Z0-9_()\\+*^/·\s-]+\s*=\s*[a-zA-Z0-9_()\\+*^/·\s-]+)[ \t]*$/gm,
    ""
  );

  // 5. Remove sentences containing mathematical modeling jargon in normal devotions
  // (e.g. "Mathematically, let ...", "modeled as an antagonistic force vector", "vector of divine grace")
  cleaned = cleaned.replace(
    /(?:Mathematically\s*,?\s*|In\s+mathematical\s+terms\s*,?\s*)[^.!?\n]+[.!?]/gi,
    ""
  );
  cleaned = cleaned.replace(
    /[^.!?\n]*(?:antagonistic\s+force\s+vector|force\s+vector|direction\s+vector|scalar\s+quantity|differential\s+equation|rate\s+of\s+change\s+derivative|tensor\s+field|Cartesian\s+coordinate)[^.!?\n]*[.!?]/gi,
    ""
  );

  // 6. Clean up loose backslashed mathematical symbols
  cleaned = cleaned.replace(/\\(?:vec|frac|sum|int|Delta|cdot|times|approx|le|ge|infty|theta|alpha|beta|sigma|lambda)\b(?:\{[^}]*\}|\[[^\]]*\])?/g, "");

  // 7. Remove any residual orphaned parentheses like () or [] left from formula removal
  cleaned = cleaned.replace(/\(\s*\)/g, "");
  cleaned = cleaned.replace(/\[\s*\]/g, "");

  // 8. Normalize spacing and blank lines
  cleaned = cleaned.replace(/[ \t]{2,}/g, " ");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

/**
 * Deeply sanitizes any JSON object or string if the actionType/category is not math-allowed.
 */
export function sanitizeNonMathResponse<T = any>(obj: T, category?: string, actionType?: string): T {
  if (isMathAllowedCategory(category, actionType)) {
    return obj;
  }

  if (typeof obj === "string") {
    return cleanMathFromNonMathContent(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeNonMathResponse(item, category, actionType)) as unknown as T;
  }

  if (obj !== null && typeof obj === "object") {
    const copy: Record<string, any> = {};
    for (const key of Object.keys(obj as Record<string, any>)) {
      // If the object has a mathematical field in a non-math object, drop it
      if (key === "formula" || key === "mathematicalAnalogy" || key === "mathematicalConcept") {
        continue;
      }
      copy[key] = sanitizeNonMathResponse((obj as Record<string, any>)[key], category, actionType);
    }
    return copy as T;
  }

  return obj;
}
