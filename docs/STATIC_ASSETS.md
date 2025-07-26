# Static Assets in PWA and Capacitor Apps

**As of July 2025, all static assets (images, icons, SVGs, manifest files, etc.) must be placed in the `public/` directory. Do not use `src/assets/` for any static files that need to be available by URL at runtime.**

This document explains how static assets (such as images, icons, and manifest files) are deployed and served in both Progressive Web Apps (PWA) and Capacitor-based native apps, and provides examples for using static assets in React source code.

## How Static Assets Are Deployed

### 1. PWA (Web)

- All files placed in the `public/` directory of your project are automatically copied to the root of the build output and served at the root URL (e.g., `/icon-192.png`).
- During deployment, these files are included in the output directory (e.g., `dist/cloudflare/`) and are served by your Cloudflare Worker.
- Example: `public/icon-192.png` is available at `https://your-domain.com/icon-192.png`.

### 2. Capacitor (Native iOS/Android)

- Capacitor copies the contents of the `public/` directory into the native app's web assets directory.
- Assets in `public/` are accessible at the root of the webview, just like in the browser.
- Example: `<img src="icon-192.png" />` will work in both the browser and the native app.

## Best Practices for Asset URLs

- **Use relative URLs** (e.g., `"icon-192.png"` or `"./icon-192.png"`) for referencing static assets in your code and manifest files. This ensures compatibility across web and native platforms.
- **Do not use absolute URLs** (e.g., `"/icon-192.png"`) in Capacitor apps, as they may not resolve correctly in the native webview.

## Example: Using a Static Image in React

Suppose you have an image `icon-192.png` in your `public/` folder.

```tsx
// Good: Relative URL (works in PWA and Capacitor)
<img src="icon-192.png" alt="App Icon" width={96} height={96} />
```

You can also use this approach for other static assets, such as manifest files or additional images.

## Summary

- Place all static assets in the `public/` directory.
- Do not use `src/assets/` for static files.
- Use relative URLs to reference assets in your React code and manifest files.
- This approach ensures your assets are available and work correctly in both PWA and Capacitor native apps.
