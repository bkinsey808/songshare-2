# Sign-In Feature

This directory contains all sign-in specific functionality for OAuth authentication. The sign-in feature has been broken down into focused, single-responsibility files following clean architecture principles.

## File Structure

```
features/auth/signIn/
├── hasOAuthEvidence.ts    # OAuth evidence detection
├── providers.ts           # OAuth provider configurations
├── redirect-state.ts      # Redirect state management
├── signInWithProvider.ts  # Provider sign-in handler
├── storage-keys.ts        # Centralized storage keys
├── useRedirectAuth.ts     # OAuth redirect handling hook
├── useSignIn.ts           # Sign-in functionality hook
├── useSignInPage.ts       # Comprehensive sign-in page hook
└── README.md             # This documentation file
```

**Note**: The `isDevelopment` utility has been moved to `/utils/isDevelopment.ts` as it's a shared utility.

## Components Overview

### Configuration Files

#### `providers.ts`

Centralizes OAuth provider configuration:

- **Google Provider**: Configured with account selection prompt
- **Microsoft Provider**: Supports both personal and work accounts
- **Apple Provider**: Ready for when Apple Developer Account is configured
- **PROVIDERS**: Configuration object with colors and factory functions
- **ENABLE_APPLE_SIGNIN**: Feature flag for Apple Sign-In
- **Type definitions**: Proper TypeScript types for all providers

### Utility Files

#### `hasOAuthEvidence.ts`

- **OAuth evidence detection**: Checks URL parameters for OAuth completion indicators

#### `redirect-state.ts`

- **Redirect state management**: Manages session storage flags for OAuth redirects
- **State cleanup**: Functions for cleaning up redirect-related session data

#### `storage-keys.ts`

- **Centralized storage keys**: All localStorage/sessionStorage keys used in auth flow
- **Type safety**: Typed constants to prevent typos and ensure consistency

#### `signInWithProvider.ts`

- **Provider sign-in**: Main handler for both popup and redirect authentication flows
- **Environment-aware**: Uses popup for development, redirect for production

### Hook Files

#### `useRedirectAuth.ts`

Custom hook for handling OAuth redirect results:

- **Multi-method detection**: Uses Firebase, manual checks, and fallback detection
- **Comprehensive error handling**: Provides detailed error messages
- **Timeout management**: Prevents infinite loading states
- **Session cleanup**: Manages redirect flags and cached data

#### `useSignIn.ts`

Custom hook for initiating OAuth sign-in:

- **Provider management**: Creates and provides OAuth provider instances
- **Environment-aware**: Uses popup for development, redirect for production
- **Error management**: Provides clear error states and recovery
- **Loading states**: Manages loading indicators during sign-in
- **Navigation**: Automatically redirects on successful authentication

#### `useSignInPage.ts`

Comprehensive hook for the sign-in page:

- **Consolidated logic**: Combines redirect auth, sign-in, and overall state management
- **Unified loading state**: Aggregates loading from auth, redirect, and sign-in
- **Unified error state**: Consolidates errors from redirect and sign-in flows
- **Auto navigation**: Handles redirect user navigation automatically
- **Complete interface**: Provides everything needed for a sign-in page

## Usage Example

The refactored sign-in page is now extremely clean and focused:

```tsx
import { PROVIDERS, ENABLE_APPLE_SIGNIN } from 'features/auth/signIn/providers';
import { useSignInPage } from 'features/auth/signIn/useSignInPage';

export default function SignInPage() {
  // All logic consolidated into one hook
  const { isLoading, error, providers, signIn } = useSignInPage();

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-8 text-center text-2xl font-bold">Sign In</Text>

        {error && (
          <View className="mb-4 w-full max-w-md rounded-lg bg-red-100 p-4">
            <Text className="text-center text-red-700">{error}</Text>
          </View>
        )}

        <View className="w-full max-w-md space-y-4">
          <Button
            title={`Sign in with ${PROVIDERS.google.name}`}
            onPress={() => signIn(providers.google, PROVIDERS.google.name)}
            disabled={isLoading}
            style={{ backgroundColor: PROVIDERS.google.color, marginBottom: 12 }}
          />
          <Button
            title={`Sign in with ${PROVIDERS.microsoft.name}`}
            onPress={() => signIn(providers.microsoft, PROVIDERS.microsoft.name)}
            disabled={isLoading}
            style={{ backgroundColor: PROVIDERS.microsoft.color, marginBottom: 12 }}
          />
        </View>
      </View>
    </Container>
  );
}
```

## Type Safety

The sign-in system uses proper TypeScript types:

- **`OAuthProviderType`**: Union type for all OAuth providers (GoogleAuthProvider | OAuthProvider)
- **`ProvidersType`**: Typed object containing all provider instances
- **Strong typing**: All hook parameters and return values are properly typed
- **No `any` types**: Public APIs avoid `any` types for better developer experience

## Environment Handling

The sign-in system automatically adapts to the environment:

- **Development (localhost)**: Uses `signInWithPopup` for faster iteration
- **Production**: Uses `signInWithRedirect` for better mobile compatibility

## Error Handling

The system provides comprehensive error handling:

- **OAuth completion detection**: Identifies when OAuth succeeds but Firebase fails
- **Timeout management**: Prevents infinite loading with fallback timeouts
- **Clear error messages**: User-friendly error descriptions
- **Recovery mechanisms**: Ability to retry after errors

## Configuration

To enable Apple Sign-In:

1. Set up Apple Developer Account ($99/year)
2. Configure Firebase Console with Apple credentials
3. Change `ENABLE_APPLE_SIGNIN` to `true` in `providers.ts`

## Benefits of This Modular Structure

1. **Single Responsibility**: Each file has one clear purpose
2. **Reusability**: Individual utilities and hooks can be reused
3. **Testability**: Each function can be unit tested in isolation
4. **Maintainability**: Changes are localized to specific files
5. **Type Safety**: Strong TypeScript typing throughout
