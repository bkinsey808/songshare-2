// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add resolution for web-specific modules
config.resolver.resolverMainFields = ["browser", "main", "module"];

// Ensure proper handling of web assets and entry points
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

// Enhanced web support
config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [
      ...process.env.RN_SRC_EXT.split(",").filter(Boolean),
      ...config.resolver.sourceExts,
    ]
  : [...config.resolver.sourceExts];

// Add support for the router module resolution
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(__dirname, "./node_modules"),
];

// Ensure expo-router is properly handled
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "expo-router": path.resolve(__dirname, "./node_modules/expo-router"),
};

module.exports = config;
