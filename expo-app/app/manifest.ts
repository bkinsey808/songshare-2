/* eslint-disable camelcase */
/**
 * This file provides manifest generation utilities for PWA support.
 * It's used with app.config.js to provide dynamic manifest generation.
 */

type WebManifest = {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
};

/**
 * Generate manifest content based on environment variables
 */
export function generateManifest(): WebManifest {
  return {
    name: process.env.EXPO_PUBLIC_BRAND_LONG ?? "Song Share",
    short_name: process.env.EXPO_PUBLIC_BRAND ?? "Song Share",
    description:
      process.env.EXPO_PUBLIC_BRAND_DESC ??
      "Song Share lets you share songs with your community.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/assets/images/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/images/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

/**
 * Helper function that can be used by app.config.js
 */
export default function getManifest(): WebManifest {
  return generateManifest();
}
