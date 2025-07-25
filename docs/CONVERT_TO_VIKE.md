# Migrating cap-app to Vike with Dual SSR/SPA Builds

This guide explains how to convert your cap-app to use Vike, enabling both SSR (for PWA/web) and SPA (for Capacitor iOS/Android) builds from a single codebase.

## Overview

- **SSR Build**: For SEO-friendly PWA/web deployment, with server-side rendering.
- **SPA Build**: For embedding in Capacitor native apps (iOS/Android), with client-side rendering only.

---

## Step-by-Step Migration Plan

### 1. Preparation

- Review the [Vike documentation](https://vike.dev/) for SSR/SPA concepts and migration tips.
- Ensure your codebase is committed and backed up.

### 2. Install Vike

- In your `cap-app` directory, install Vike and its peer dependencies:
  ```sh
  pnpm add vike react react-dom
  ```
- Remove any Vite plugins or config that conflict with Vike (see Vike docs).

### 3. Update Project Structure

- Refactor your entry points to follow Vike’s file conventions (e.g., `+Page.tsx`, `+layout.tsx`).
- Move routing logic to Vike’s filesystem-based routing.
- Ensure all assets use relative paths (see MAINTAINING_CAPACITOR_COMPATIBILITY.md).

### 4. Configure Dual Builds

- Update your `vite.config.ts` to support both SSR and SPA builds using Vike’s config options.
- Add two build scripts to your `package.json`:
  - SSR build (for PWA/web):
    ```json
    "build:ssr": "vike build --ssr"
    ```
  - SPA build (for Capacitor):
    ```json
    "build:spa": "vike build --spa"
    ```
- Document these scripts in your README and internal docs.

### 5. Update Capacitor Workflow

- Change your Capacitor sync process to use the SPA build output directory (e.g., `dist/client/`).
- Example:
  ```sh
  pnpm run build:spa
  npx cap sync
  ```

### 6. PWA/SSR Deployment

- Deploy the SSR build output to your web/PWA hosting (see Vike docs for deployment details).

### 7. Testing

- Test the SSR build in the browser for SEO, routing, and PWA compliance.
- Test the SPA build in iOS/Android emulators and devices via Capacitor.
- Ensure all features work in both builds.

### 8. Code Sharing & Best Practices

- Use feature detection or conditional imports for code that differs between SSR and SPA.
- Keep all shared code client-safe for SPA/Capacitor.
- Document any platform-specific code in your docs.

### 9. Documentation

- Update `MAINTAINING_CAPACITOR_COMPATIBILITY.md` and other relevant docs to reflect the new Vike-based workflow.
- Link this migration guide in your main `README.md`.

---

**For more details, see:**

- [Vike Documentation](https://vike.dev/)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---

**Keep this document updated as your build process evolves.**
