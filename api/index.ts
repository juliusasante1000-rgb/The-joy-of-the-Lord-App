import app from "../server";
import type { IncomingMessage, ServerResponse } from "http";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // In Vercel serverless environment with rewrites (e.g. /api/(.*) -> /api):
  // The original incoming path is passed in x-matched-path, x-original-url, or query parameters
  const headers = req.headers || {};
  const matchedPath = (headers["x-matched-path"] as string) || (headers["x-original-url"] as string) || (headers["x-forwarded-uri"] as string);

  if (matchedPath && matchedPath.startsWith("/api")) {
    req.url = matchedPath;
  } else if (req.url === "/api" || req.url === "/api/" || req.url?.startsWith("/api?")) {
    const rawUrl = req.url || "";
    const queryPart = rawUrl.includes("?") ? rawUrl.split("?")[1] : "";
    const params = new URLSearchParams(queryPart);
    const subRoute = params.get("0") || params.get("path");
    if (subRoute) {
      req.url = `/api/${subRoute.replace(/^\//, "")}`;
    }
  }

  return (app as any)(req, res);
}

