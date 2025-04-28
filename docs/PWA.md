# Progressive Web App (PWA) Support

This document outlines how Progressive Web App (PWA) functionality is implemented in the SongShare-2 project, allowing the application to be installed on devices and function offline.

## Overview

SongShare-2's PWA support enables users to install the app on their devices directly from the web browser and use it in a manner similar to a native application, with offline capabilities, home screen presence, and immersive full-screen experiences.

## Implementation Details

### Manifest Configuration

The web app manifest is configured in two key locations:

1. **Static Manifest (`web/manifest.json`)**:

   - Used during development for immediate access to PWA features.
   - Contains default values for app identity and appearance.

2. **Dynamic Configuration (`app.config.js`)**:
   - Reads environment variables from `.env.local` to dynamically configure the PWA.
   - Defines manifest properties for production builds based on environment settings.
   - Ensures consistent branding across environments.

### Environment Variables

The PWA configuration uses the following environment variables:

- `EXPO_PUBLIC_BRAND`: Short name of the application (appears on home screens).
- `EXPO_PUBLIC_BRAND_LONG`: Full name of the application.
- `EXPO_PUBLIC_BRAND_DESC`: Description of the application for app stores and install prompts.

These variables are defined in `.env.local` and accessed through Expo's configuration system.

### Icons and Assets

PWA icons are stored in the `assets/images/` directory:

- `web-app-manifest-192x192.png`: Standard PWA icon (192×192 pixels).
- `web-app-manifest-512x512.png`: Larger PWA icon for high-resolution displays (512×512 pixels).
- Various favicon formats for different platforms and color schemes.

### Web Platform Support

For proper web platform support:

1. **HTML Template (`web/index.html`)**:

   - Links to the manifest file and various app icons.
   - Includes the necessary meta tags for PWA support.
   - Uses relative paths to ensure proper asset loading in development and production.

2. **Metro Bundler Configuration**:
   - Enhanced to properly handle module resolution for web.
   - Configured to support the Expo Router in the web environment.

## Testing PWA Features

To test the PWA capabilities:

1. Build the web app:

   ```bash
   expo export -p web
   ```

2. Serve the build directory:

   ```bash
   npx serve web-build
   ```

3. Open Chrome DevTools, navigate to the Application tab, and verify:
   - Manifest is properly loaded
   - Service worker is registered (if implemented)
   - Application can be installed

## Development Guidelines

When modifying PWA functionality:

1. **Environment Variables**: Use the `EXPO_PUBLIC_` prefix for any client-accessible variables.

2. **Asset Paths**: Use relative paths (starting with `./`) in development and absolute paths in production.

3. **Manifest Updates**: When changing manifest properties, update both:
   - The static manifest file for development
   - The dynamic configuration in `app.config.js`

## References

- [Expo PWA Documentation](https://docs.expo.dev/guides/progressive-web-apps/)
- [Web App Manifest Specification](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Builder](https://www.pwabuilder.com/) - Useful for testing and generating assets
