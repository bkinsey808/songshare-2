/**
 * storage-keys.ts
 *
 * Centralized Storage Keys for Authentication
 *
 * This module centralizes all localStorage and sessionStorage keys used
 * in the authentication flow to avoid duplication and ensure consistency.
 * These keys manage OAuth redirect state, session tracking, and error handling.
 */

/**
 * Session storage keys used for OAuth redirect flow management.
 *
 * These keys track the state of OAuth authentication flows, particularly
 * for redirect-based authentication where the app needs to maintain state
 * across page navigation and browser reloads.
 */
export const AUTH_STORAGE_KEYS = {
  /** Indicates that an OAuth redirect is pending */
  REDIRECT_PENDING: 'firebase-auth-redirect-pending',

  /** Timestamp when the OAuth redirect was initiated */
  REDIRECT_TIMESTAMP: 'firebase-auth-redirect-timestamp',

  /** Counter for page reload attempts during auth flow */
  RELOAD_COUNT: 'firebase-auth-reload-count',

  /** Cached authentication result data */
  RESULT_CACHED: 'firebase-auth-result-cached',
} as const;

/**
 * Type for the storage key values.
 * Ensures type safety when using AUTH_STORAGE_KEYS.
 */
export type AuthStorageKey = (typeof AUTH_STORAGE_KEYS)[keyof typeof AUTH_STORAGE_KEYS];
