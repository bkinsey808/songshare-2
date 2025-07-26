// Cloudflare Worker entry: serve static assets from dist/cloudflare/ and SSR fallback
import handler from "./dist/cloudflare/server/cloudflare-worker.mjs";

const STATIC_FILES = [
  "icon-192.png",
  "icon-512.png",
  "manifest.json",
  "manifest.webmanifest",
  "registerSW.js",
  // Add more static files as needed
];

const STATIC_PREFIXES = [
  "/assets/", // for assets like CSS, JS, SVG, etc.
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json",
  "/manifest.webmanifest",
  "/registerSW.js",
];

async function serveStatic(request) {
  const url = new URL(request.url);
  let path = url.pathname;
  if (path.startsWith("/")) path = path.slice(1);
  // Try to serve from dist/cloudflare/
  try {
    const file = await fetch(`./dist/cloudflare/${path}`);
    if (file.ok) return file;
  } catch (e) {}
  // Try to serve from dist/cloudflare/assets/
  try {
    const file = await fetch(`./dist/cloudflare/assets${path}`);
    if (file.ok) return file;
  } catch (e) {}
  return null;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Serve static assets
    if (
      STATIC_PREFIXES.some((prefix) => url.pathname.startsWith(prefix)) ||
      STATIC_FILES.includes(url.pathname.replace(/^\//, ""))
    ) {
      const staticResponse = await serveStatic(request);
      if (staticResponse) return staticResponse;
    }
    // Fallback to SSR
    return handler.fetch(request, env, ctx);
  },
};
