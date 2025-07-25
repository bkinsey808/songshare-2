# Maintaining Capacitor Compatibility in cap-app

This guide explains how to keep your Vite + React project compatible with Capacitor for building web, iOS, and Android apps.

## 1. Project Structure

## 1a. Asset Path Best Practices

- Always use **relative paths** for public assets (images, icons, etc.) in your code. This ensures assets load correctly in web, iOS, and Android builds.
  - Example: `<img src="assets/logo.png" />` instead of `<img src="/assets/logo.png" />`.
- Avoid absolute paths (starting with `/`) for static files, as they may not resolve correctly in native builds.
- For dynamic imports or asset references, use Vite's `import.meta.url` or `new URL('./path', import.meta.url)` pattern if needed.

## 1b. Other Best Practices

- Avoid using browser-only APIs without feature detection or polyfills, as native builds may not support them.
- Test your app in all target environments (web, iOS, Android) regularly to catch platform-specific issues early.
- When using Capacitor plugins, always check for platform support and handle cases where a plugin may not be available (e.g., web fallback).
- Keep dependencies up to date and review plugin documentation for breaking changes or native setup steps.

### PWA Asset Paths

- In your `manifest.json`, use relative paths for icons and other assets (e.g., `"icons/logo-192.png"`).
- Register your service worker using a relative path (e.g., `./service-worker.js`).

2. **Build** the app:
   ```sh
   npm run build
   ```
3. **Sync** with Capacitor:
   ```sh
   npx cap sync
   ```
   This copies the latest web build to the native projects.
4. **Open** the native project:
   - iOS: `npx cap open ios`
   - Android: `npx cap open android`

## 3. PWA Support

- Ensure you have a valid `manifest.json` and service worker in your `public/` directory.
- See `docs/PWA.md` for project-specific PWA requirements.

## 4. Native Plugins

- Use Capacitor plugins for native features (camera, filesystem, etc.).
- Install plugins with npm/yarn/pnpm and run `npx cap sync` after installing.
- Configure plugins as needed in `capacitor.config.json` or native code.

## 5. Testing

- Test the web build for PWA compliance.
- Test iOS/Android builds in emulators or on devices.

## 6. Troubleshooting

- If changes are not reflected in the native app, ensure you have run both `npm run build` and `npx cap sync`.
- For plugin issues, check plugin documentation and ensure native dependencies are installed.

## 7. Documentation

- For more details, see:
  - [Capacitor Docs](https://capacitorjs.com/docs)
  - [Vite Docs](https://vitejs.dev/)
  - `docs/PWA.md` in this repo

---

**Keep this document updated if the build process or project structure changes.**
