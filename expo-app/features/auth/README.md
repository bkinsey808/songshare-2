# Authentication Features

This directory contains the refactored authentication logic for the SongShare application. The authentication functionality has been broken down into modular, reusable components following separation of concerns principles.

## File Structure

```
features/auth/
├── AuthContext.tsx       # Authentication context provider
├── useAuth.ts            # Core authentication context hook
├── README.md            # This documentation file
├── signIn/              # Sign-in specific functionality
│   ├── hasOAuthEvidence.ts    # OAuth evidence detection
│   ├── providers.ts           # OAuth provider configurations
│   ├── redirect-state.ts      # Redirect state management
│   ├── signInWithProvider.ts  # Provider sign-in handler
│   ├── storage-keys.ts        # Centralized storage keys
│   ├── useRedirectAuth.ts     # OAuth redirect handling hook
│   ├── useSignIn.ts           # Sign-in functionality hook
│   ├── useSignInPage.ts       # Comprehensive sign-in page hook
│   └── README.md             # Sign-in documentation
└── registration/        # Registration specific functionality (empty)
    └── README.md        # Registration documentation
```

**Note**: The `isDevelopment` utility has been moved to `/utils/isDevelopment.ts` as it's a shared utility that can be used across multiple features.

## Components Overview

### Core Auth Files

#### `useAuth.ts`

Core authentication context hook:

- **Context access**: Provides access to the AuthContext
- **User state**: Current Firebase user object or null
- **Loading state**: Boolean indicating if auth state is being determined
- **Sign out**: Function to sign out the current user
- **Error handling**: Throws error if used outside AuthProvider

#### `AuthContext.tsx`

Authentication context provider:

- **Firebase integration**: Manages Firebase auth state
- **User management**: Handles user sign-in/sign-out state
- **Loading management**: Provides loading states during auth operations

### Sign-In Feature

The sign-in feature contains all OAuth authentication functionality. See `signIn/README.md` for detailed documentation of the sign-in components.

Key files:

- **providers.ts**: OAuth provider configurations (Google, Microsoft, Apple)
- **useSignInPage.ts**: Comprehensive hook for sign-in pages
- **Multiple utility files**: Split by single responsibility for better maintainability

## Usage Examples

### Using the Auth Context

```tsx
import { useAuth } from 'features/auth/useAuth';

function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <SignInPrompt />;

  return (
    <div>
      <p>Hello, {user.displayName}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Using Sign-In (see signIn/README.md for details)

```tsx
import { useSignInPage } from 'features/auth/signIn/useSignInPage';

export default function SignInPage() {
  const { isLoading, error, providers, signIn } = useSignInPage();
  // Implementation details in signIn/README.md
}
```

## Architecture Overview

This authentication system follows a layered architecture:

1. **Context Layer**: `AuthContext.tsx` and `useAuth.ts` provide app-wide auth state
2. **Feature Layer**: `signIn/` contains all sign-in specific logic
3. **Utility Layer**: Shared utilities in `/utils/` (like `isDevelopment`)

## Benefits of This Structure

1. **Separation of Concerns**: Each feature has its own directory with focused responsibilities
2. **Reusability**: Hooks and utilities can be used across different components
3. **Testability**: Individual functions and hooks can be unit tested in isolation
4. **Maintainability**: Changes are localized to specific features
5. **Scalability**: Easy to add new auth features (registration, password reset, etc.)
6. **Type Safety**: Strong TypeScript typing throughout

## Type Safety

The authentication system uses proper TypeScript types:

- **`User`**: Firebase user type for authenticated users
- **`OAuthProviderType`**: Union type for all OAuth providers
- **Strong typing**: All hook parameters and return values are properly typed
- **No `any` types**: Public APIs avoid `any` types for better developer experience

## Environment Handling

The authentication system automatically adapts to the environment:

- **Development (localhost)**: Uses `signInWithPopup` for faster iteration
- **Production**: Uses `signInWithRedirect` for better mobile compatibility

## Future Enhancements

This modular structure makes it easy to add:

- **Registration feature**: Add files to `registration/` directory
- **Password reset**: New feature directory for password management
- **Biometric authentication**: Platform-specific auth methods
- **Social providers**: Additional OAuth providers
- **Enhanced security**: 2FA, security keys, etc.
