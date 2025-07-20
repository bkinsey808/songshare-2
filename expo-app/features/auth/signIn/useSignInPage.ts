/**
 * useSignInPage.ts
 *
 * Comprehensive hook for the sign-in page
 *
 * This hook consolidates all sign-in page logic including redirect handling,
 * sign-in actions, loading states, error management, and navigation.
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from 'features/auth/useAuth';
import { useRedirectAuth } from './useRedirectAuth';
import { useSignIn } from './useSignIn';
import type { OAuthProviderType, ProvidersType } from './providers';

/**
 * State object returned by the useSignInPage hook.
 */
type SignInPageState = {
  /** Overall loading state from all auth operations */
  isLoading: boolean;

  /** Consolidated error state from all auth operations */
  error: string | null;

  /** OAuth provider instances for sign-in */
  providers: ProvidersType;

  /** Function to initiate sign-in with a provider */
  signIn: (provider: OAuthProviderType, providerName: string) => Promise<void>;

  /** Function to clear any error state */
  clearError: () => void;
};

/**
 * Comprehensive hook for sign-in page functionality
 *
 * This hook:
 * 1. Manages OAuth redirect detection and processing
 * 2. Handles sign-in actions with all providers
 * 3. Consolidates loading states from auth, redirect, and sign-in
 * 4. Consolidates error states from redirect and sign-in
 * 5. Automatically navigates on successful redirect authentication
 * 6. Provides provider instances and actions
 *
 * @returns return.isLoading - Overall loading state from all auth operations
 * @returns return.error - Consolidated error state from all auth operations
 * @returns return.providers - OAuth provider instances for sign-in
 * @returns return.signIn - Function to initiate sign-in with a provider
 * @returns return.clearError - Function to clear any error state
 */
export const useSignInPage = (): SignInPageState => {
  const { loading: authLoading } = useAuth();
  const router = useRouter();

  // Handle OAuth redirect results
  const {
    user: redirectUser,
    isLoading: redirectLoading,
    error: redirectError,
  } = useRedirectAuth();

  // Handle sign-in actions
  const {
    isLoading: signInLoading,
    error: signInError,
    providers,
    signIn,
    clearError,
  } = useSignIn();

  // Navigate to sign-in-landing if user is authenticated via redirect
  useEffect(() => {
    if (redirectUser) {
      router.replace('/sign-in-landing');
    }
  }, [redirectUser, router]);

  // Determine overall loading and error states
  const isLoading = authLoading || redirectLoading || signInLoading;
  const error = redirectError || signInError;

  return {
    isLoading,
    error,
    providers,
    signIn,
    clearError,
  };
};
