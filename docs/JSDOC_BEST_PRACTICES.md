# JSDoc Best Practices

This document outlines the JSDoc documentation standards and best practices for the SongShare project.

## Table of Contents

- [General Guidelines](#general-guidelines)
- [File-Level Documentation](#file-level-documentation)
- [Function Documentation](#function-documentation)
- [Type Documentation](#type-documentation)
- [React Component Documentation](#react-component-documentation)
- [Hook Documentation](#hook-documentation)
- [Class Documentation](#class-documentation)
- [Constant Documentation](#constant-documentation)
- [Examples](#examples)

## General Guidelines

### Basic Principles

1. **Be Descriptive**: Write clear, concise descriptions that explain what the code does and why
2. **Be Consistent**: Follow the same patterns throughout the codebase
3. **Include Examples**: When helpful, provide usage examples
4. **Document Public APIs**: All exported functions, classes, and types should be documented
5. **Use TypeScript Integration**: Leverage TypeScript types rather than duplicating them in JSDoc

### Format Standards

- Use `/**` to start JSDoc comments (not `/*`)
- Start descriptions with a capital letter
- End descriptions with a period
- Use active voice when possible
- Keep line length reasonable (80-100 characters)

## File-Level Documentation

Every file should start with a file-level JSDoc comment:

```javascript
/**
 * filename.ts
 *
 * Brief description of the file's purpose
 *
 * Longer description explaining the file's role in the application,
 * key concepts, and any important implementation details.
 */
```

### Example

```javascript
/**
 * useRedirectAuth.ts
 *
 * Custom hook for handling OAuth redirect authentication results
 *
 * This hook manages the complex logic of detecting and processing OAuth
 * authentication results after a redirect from providers like Google, Microsoft, etc.
 */
```

## Function Documentation

### Basic Structure

```typescript
/**
 * Brief description of what the function does.
 *
 * Longer description with more details if needed.
 *
 * @param paramName - Description of the parameter
 * @param optionalParam - Description of optional parameter (optional)
 * @returns Description of what is returned
 */
```

### Parameter Documentation

- Use `@param` for each parameter
- Include type information only if not already in TypeScript
- Mark optional parameters with `(optional)` suffix
- Describe what the parameter represents and any constraints

### Return Documentation

For simple returns:

```typescript
@returns The computed result
```

For object returns, document each property:

```javascript
@returns return.user - The authenticated user or null if not authenticated
@returns return.isLoading - True while processing authentication
@returns return.error - Error message if authentication fails, null otherwise
```

### Complete Example

```typescript
/**
 * Handle sign-in with appropriate method based on environment.
 * Uses popup authentication in development and redirect in production.
 *
 * @param provider - The OAuth provider instance (Google, Microsoft, Apple)
 * @param providerName - The name of the provider for logging purposes
 * @returns Promise that resolves to UserCredential in development (popup) or null in production (redirect)
 */
export const signInWithProvider = async (
  provider: OAuthProviderType,
  providerName: string
): Promise<UserCredential | null> => {
  // Implementation
};
```

## Type Documentation

### Type Definitions

```typescript
/**
 * Configuration for OAuth redirect authentication state management.
 */
type RedirectAuthState = {
  /** The authenticated user or null if not authenticated */
  user: User | null;
  /** True while checking for redirect results or processing authentication */
  isLoading: boolean;
  /** Error message if authentication fails, null otherwise */
  error: string | null;
};
```

### Interface Documentation

(prefer `type` over `interface` for defining types in TypeScript)

```typescript
/**
 * Interface for authentication context provided to the application.
 *
 * This context manages user authentication state and provides methods
 * for authentication operations throughout the component tree.
 */
export interface AuthContextType {
  /** Current authenticated user or null if not signed in */
  user: FirebaseUser | null;
  /** Loading state during auth initialization or operations */
  loading: boolean;
  /** Sign out the current user */
  signOut: () => Promise<void>;
  /** Manually update the user state (used by sign-in flow) */
  setUser: (user: FirebaseUser | null) => void;
}
```

## React Component Documentation

### Function Components

```typescript
/**
 * Sign-in page component with comprehensive OAuth provider support.
 *
 * Handles both redirect detection after OAuth completion and initiating
 * new sign-in flows. Provides loading states and error handling.
 *
 * @returns JSX element rendering the sign-in interface
 */
export default function SignInPage(): JSX.Element {
  // Component implementation
}
```

### Component Props

```typescript
/**
 * Props for the Button component.
 */
type ButtonProps = {
  /** The button text content */
  children: React.ReactNode;
  /** Click handler function */
  onPress: () => void;
  /** Whether the button is disabled (optional) */
  disabled?: boolean;
  /** Loading state to show spinner (optional) */
  loading?: boolean;
};

/**
 * Reusable button component with consistent styling and behavior.
 *
 * Supports loading states, disabled states, and accessibility features.
 *
 * @param props - The component props
 * @returns JSX element rendering a styled button
 */
export const Button = ({
  children,
  onPress,
  disabled,
  loading,
}: ButtonProps): JSX.Element => {
  // Component implementation
};
```

## Hook Documentation

### Custom Hooks

```typescript
/**
 * Custom hook for handling OAuth redirect authentication.
 *
 * This hook:
 * 1. Checks for existing redirect results on mount
 * 2. Uses multiple detection methods to catch authentication
 * 3. Handles timeout scenarios gracefully
 * 4. Provides comprehensive error handling
 *
 * @returns return.user - The authenticated user or null if not authenticated
 * @returns return.isLoading - True while checking for redirect results or processing authentication
 * @returns return.error - Error message if authentication fails, null otherwise
 */
export const useRedirectAuth = (): RedirectAuthState => {
  // Hook implementation
};
```

## Class Documentation

(prefer no Class unless necessary, but if needed)

```typescript
/**
 * Service for managing Firebase authentication operations.
 *
 * Provides methods for sign-in, sign-out, and user state management
 * with comprehensive error handling and logging.
 */
export class AuthService {
  /**
   * Initialize the authentication service.
   *
   * @param config - Firebase configuration object
   */
  constructor(config: FirebaseConfig) {
    // Constructor implementation
  }

  /**
   * Sign in a user with the specified OAuth provider.
   *
   * @param provider - The OAuth provider to use for authentication
   * @returns Promise resolving to the authenticated user
   */
  async signIn(provider: OAuthProvider): Promise<User> {
    // Method implementation
  }
}
```

## Constant Documentation

### Simple Constants

```typescript
/** Maximum number of retry attempts for authentication */
const MAX_AUTH_RETRIES = 3;

/** Default timeout for OAuth operations in milliseconds */
const OAUTH_TIMEOUT_MS = 20000;
```

### Complex Constants

```typescript
/**
 * Centralized storage keys for authentication-related data.
 *
 * These keys are used for localStorage and sessionStorage operations
 * to maintain consistency across the authentication system.
 */
export const AUTH_STORAGE_KEYS = {
  /** Indicates a redirect authentication is in progress */
  REDIRECT_PENDING: "auth-redirect-pending",
  /** Timestamp when redirect authentication started */
  REDIRECT_TIMESTAMP: "auth-redirect-timestamp",
  /** The provider name used for the current redirect flow */
  REDIRECT_PROVIDER: "auth-redirect-provider",
} as const;
```

## Examples

### Utility Function

```typescript
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
  if (typeof window === "undefined") return false;

  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));

  const hasCode = urlParams.has("code") || hashParams.has("code");
  const hasState = urlParams.has("state") || hashParams.has("state");
  const hasAccessToken =
    urlParams.has("access_token") || hashParams.has("access_token");

  return hasCode || hasState || hasAccessToken;
};
```

### Complex Hook

```typescript
/**
 * Comprehensive hook for sign-in page functionality.
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
  // Hook implementation
};
```

## Best Practices Summary

1. **Document the Why**: Explain not just what the code does, but why it's needed
2. **Use Examples**: Include usage examples for complex APIs
3. **Keep It Updated**: Update documentation when code changes
4. **Be Specific**: Use precise language and avoid vague terms
5. **Document Edge Cases**: Mention important limitations or special behaviors
6. **Link Related Concepts**: Reference related functions, types, or documentation
7. **Use Consistent Terminology**: Use the same terms throughout the project
8. **Leverage TypeScript**: Don't duplicate type information already in TypeScript
9. **Focus on Public APIs**: Prioritize documentation for exported/public interfaces
10. **Review and Iterate**: Regularly review documentation for clarity and accuracy

## Tools and Validation

- Use TypeScript-aware editors for JSDoc validation
- Consider using `@typescript-eslint/prefer-nullish-coalescing` for consistency
- Use JSDoc linting rules to ensure formatting consistency
- Generate documentation with tools like TypeDoc when needed

## Related Documentation

- [TypeScript React Best Practices](./TYPESCRIPT_REACT_BEST_PRACTICES.md)
- [Naming Conventions](./NAMING_CONVENTIONS.md)
- [Code Style Guidelines](./PRETTIER.md)
