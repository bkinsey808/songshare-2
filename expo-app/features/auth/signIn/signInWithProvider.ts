/**
 * signInWithProvider.ts
 *
 * OAuth Provider Sign-In Handler
 *
 * This module provides the main sign-in functionality for OAuth providers.
 * It handles environment-aware authentication (popup in development, redirect in production)
 * and manages the associated state and caching logic.
 */

import { auth } from 'utils/firebase';
import { signInWithPopup, signInWithRedirect, type UserCredential } from 'firebase/auth';
import { debugLog } from 'utils/debug';
import type { OAuthProviderType } from './providers';
import { isDevelopment } from 'utils/isDevelopment';
import { setRedirectFlags, cleanupRedirectFlags } from './redirect-state';
import { AUTH_STORAGE_KEYS } from './storage-keys';

/**
 * Handle sign-in with appropriate method based on environment.
 * Main function for handling OAuth sign-in with different providers.
 *
 * In development: Uses popup authentication for better developer experience
 * In production: Uses redirect authentication for better mobile compatibility
 *
 * @param provider - The OAuth provider instance (Google, Microsoft, Apple)
 * @param providerName - The name of the provider for logging purposes
 * @returns Promise that resolves to UserCredential in development (popup) or null in production (redirect)
 */
export const signInWithProvider = async (
  provider: OAuthProviderType,
  providerName: string
): Promise<UserCredential | null> => {
  if (isDevelopment()) {
    debugLog(
      'auth',
      `sign-in-provider: Using popup authentication for ${providerName} (development)`
    );
    return await signInWithPopup(auth, provider);
  } else {
    debugLog(
      'auth',
      `sign-in-provider: Using redirect authentication for ${providerName} (production)`
    );

    // Set redirect flags
    setRedirectFlags(providerName);

    // Clear any cached results to force fresh authentication
    cleanupRedirectFlags();
    sessionStorage.setItem(AUTH_STORAGE_KEYS.REDIRECT_PENDING, providerName);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.REDIRECT_TIMESTAMP, Date.now().toString());

    // Force browser cache refresh with aggressive cache busting
    const timestamp = Date.now();
    debugLog('auth', `sign-in-provider: AGGRESSIVE Cache bust timestamp: ${timestamp}`);
    debugLog('auth', `sign-in-provider: FORCE RELOAD - Cache invalidation active`);

    // This will navigate away from the current page
    await signInWithRedirect(auth, provider);
    return null; // Redirect doesn't return a result immediately
  }
};
