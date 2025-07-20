/**
 * providers.ts
 *
 * OAuth Provider Configuration
 *
 * This module centralizes the configuration of OAuth providers (Google, Microsoft, Apple)
 * for Firebase authentication. Each provider is configured with appropriate scopes
 * and custom parameters for optimal user experience.
 */

import { GoogleAuthProvider, OAuthProvider } from 'utils/firebase';

/**
 * Union type for all supported OAuth providers
 */
export type OAuthProviderType = GoogleAuthProvider | OAuthProvider;

/**
 * Type for the providers object
 */
export type ProvidersType = {
  google: GoogleAuthProvider;
  microsoft: OAuthProvider;
  apple: OAuthProvider;
};

/**
 * Create Google OAuth provider with optimal configuration
 *
 * @returns Configured GoogleAuthProvider instance
 */
export const createGoogleProvider = (): GoogleAuthProvider => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account', // Force account selection for testing/clarity
  });
  return provider;
};

/**
 * Create Microsoft OAuth provider with optimal configuration
 *
 * @returns Configured OAuthProvider instance for Microsoft
 */
export const createMicrosoftProvider = (): OAuthProvider => {
  const provider = new OAuthProvider('microsoft.com');
  provider.setCustomParameters({
    tenant: 'common', // Allow personal and work Microsoft accounts
  });
  provider.addScope('User.Read'); // Read basic profile information
  return provider;
};

/**
 * Create Apple OAuth provider with optimal configuration
 *
 * @returns Configured OAuthProvider instance for Apple
 */
export const createAppleProvider = (): OAuthProvider => {
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  return provider;
};

/**
 * OAuth provider configurations with metadata and factory functions.
 *
 * Contains configuration for all supported OAuth providers including:
 * - Display names for UI
 * - Brand colors for theming
 * - Factory functions to create provider instances
 */
export const PROVIDERS = {
  google: {
    name: 'Google',
    color: '#4285f4',
    createProvider: createGoogleProvider,
  },
  microsoft: {
    name: 'Microsoft',
    color: '#00a1f1',
    createProvider: createMicrosoftProvider,
  },
  apple: {
    name: 'Apple',
    color: '#000',
    createProvider: createAppleProvider,
  },
} as const;

/**
 * Feature flag to enable Apple Sign-In functionality.
 *
 * Set to true when Apple Developer Account is configured and ready.
 * Requires proper Apple Developer Program membership and app configuration.
 */
export const ENABLE_APPLE_SIGNIN = false;
