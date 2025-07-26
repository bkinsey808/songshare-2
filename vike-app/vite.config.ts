import { pages } from "vike-cloudflare";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import path from "path";
import svgr from "vite-plugin-svgr";
import vike from "vike/plugin";
import { VitePWA } from "vite-plugin-pwa";

import manifestJson from "./public/manifest.json" with { type: "json" };
import type { ManifestOptions } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vike(),
    react(),
    tailwindcss(),
    pages(),
    // @ts-expect-error: Plugin type mismatch is safe to ignore, see vite-plugin-svgr docs
    svgr(),
    // @ts-expect-error: Plugin type mismatch is safe to ignore, see vite-plugin-pwa docs
    VitePWA({
      registerType: "autoUpdate",
      manifest: manifestJson as Partial<ManifestOptions>,
      workbox: {
        // You can customize Workbox options here
      },
    }),
  ],
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
