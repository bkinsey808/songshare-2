/**
 * hasOAuthEvidence.ts
 *
 * OAuth URL Parameter Detection Utility
 *
 * This module provides functionality to detect OAuth authentication completion
 * by examining URL parameters and hash fragments for OAuth-specific data.
 * Used primarily in redirect-based authentication flows.
 */

/**
 * Check if there's evidence of OAuth completion in URL parameters.
 * Examines both query parameters and URL hash fragments for OAuth-related data.
 *
 * OAuth providers typically add these parameters to the redirect URL after authentication:
 * - 'code': Authorization code (OAuth 2.0 authorization code flow)
 * - 'state': CSRF protection parameter (OAuth 2.0 standard)
 * - 'access_token': Direct access token (OAuth 2.0 implicit flow)
 *
 * These parameters may appear in either the query string (?param=value) or
 * URL hash fragment (#param=value) depending on the OAuth flow type.
 *
 * @returns True if OAuth evidence is found (code, state, or access_token), false otherwise
 */
export const hasOAuthEvidence = (): boolean => {
  if (typeof window === 'undefined') return false;

  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));

  const hasCode = urlParams.has('code') || hashParams.has('code');
  const hasState = urlParams.has('state') || hashParams.has('state');
  const hasAccessToken = urlParams.has('access_token') || hashParams.has('access_token');

  return hasCode || hasState || hasAccessToken;
};
