// app.config.js - Dynamic configuration for Expo
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

module.exports = ({ config }) => {
  // Read environment variables for manifest generation
  const brandLong = process.env.EXPO_PUBLIC_BRAND_LONG || "Song Share";
  const brandShort = process.env.EXPO_PUBLIC_BRAND || "Song Share";
  const brandDesc =
    process.env.EXPO_PUBLIC_BRAND_DESC || "Share songs with your community";

  // Create manifest content dynamically
  const manifestContent = {
    name: brandLong,
    short_name: brandShort,
    description: brandDesc,
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

  return {
    ...config,
    name: brandLong,
    web: {
      ...config.web,
      name: brandLong,
      shortName: brandShort,
      description: brandDesc,
      themeColor: manifestContent.theme_color,
      backgroundColor: manifestContent.background_color,
      // Configure the manifest for the build process
      config: {
        ...config.web?.config,
        // This ensures the manifest.json is properly generated with our values
        manifestJsonContent: manifestContent,
      },
    },
  };
};
