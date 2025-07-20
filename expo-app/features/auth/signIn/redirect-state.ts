/**
 * redirect-state.ts
 *
 * OAuth Redirect State Management
 *
 * This module provides functions for managing OAuth redirect state in session storage.
 * These utilities help track redirect authentication flows, manage timeouts, and
 * clean up state after authentication completion or failure.
 */

import { AUTH_STORAGE_KEYS } from './storage-keys';

/**
 * Check if we're expecting a redirect result from an OAuth provider.
 *
 * Validates that:
 * 1. A redirect is marked as pending in session storage
 * 2. The redirect was initiated recently (within 5 minutes)
 *
 * This prevents stale redirect state from interfering with new authentication attempts.
 *
 * @returns True if expecting a redirect result, false otherwise
 */
export const isExpectingRedirect = (): boolean => {
  if (typeof window === 'undefined') return false;

  const redirectPending = sessionStorage.getItem(AUTH_STORAGE_KEYS.REDIRECT_PENDING);
  const redirectTimestamp = sessionStorage.getItem(AUTH_STORAGE_KEYS.REDIRECT_TIMESTAMP);
  const isRecentRedirect =
    redirectTimestamp && Date.now() - parseInt(redirectTimestamp) < 5 * 60 * 1000;

  return !!(redirectPending && isRecentRedirect);
};

/**
 * Set redirect flags before initiating OAuth authentication.
 *
 * Stores the provider name and timestamp in session storage to track
 * the redirect authentication flow. This helps detect when the user
 * returns from the OAuth provider.
 *
 * @param providerName - Name of the OAuth provider (e.g., 'Google', 'Microsoft')
 */
export const setRedirectFlags = (providerName: string): void => {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem(AUTH_STORAGE_KEYS.REDIRECT_PENDING, providerName);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.REDIRECT_TIMESTAMP, Date.now().toString());
};

/**
 * Clean up redirect-related session storage.
 *
 * Removes all authentication-related flags from session storage.
 * Should be called after successful authentication or when aborting
 * an authentication flow.
 */
export const cleanupRedirectFlags = (): void => {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem(AUTH_STORAGE_KEYS.REDIRECT_PENDING);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.REDIRECT_TIMESTAMP);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.RELOAD_COUNT);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.RESULT_CACHED);
};
