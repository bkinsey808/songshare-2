# NAMING_CONVENTIONS

This document outlines the naming conventions to be followed in the SongShare-2 project. Consistent naming improves code readability, maintainability, and collaboration.

For an overview of the project, refer to the [README.md](../README.md).

## General Guidelines

1. **Descriptive Names**: Use clear and descriptive names for all files, variables, functions, and components.
2. **Case Sensitivity**: Follow the case sensitivity rules outlined below for different types of files and entities.
3. **Avoid Abbreviations**: Use full words unless the abbreviation is widely recognized (e.g., `URL`, `ID`).
4. **Consistency**: Ensure naming is consistent across the codebase.

## File Naming

- **Components**: Use `PascalCase` for React components.
  - Example: `SignInForm.tsx`, `UserProfileCard.tsx`
- **Utilities**: Use `camelCase` for utility files.
  - Example: `validateCredentials.ts`, `formatDate.ts`
- **State Management**: Use `camelCase` for Zustand slice files.
  - Example: `authSlice.ts`, `dashboardSlice.ts`
- **Tests**: Use the same name as the file being tested, with `.test` appended.
  - Example: `SignInForm.test.tsx`, `authSlice.test.ts`
- **Styles**: Use `camelCase` for CSS or style files.
  - Example: `globals.css`, `buttonStyles.ts`

## Variable Naming

- **Constants**: Use `UPPER_SNAKE_CASE` for constants.
  - Example: `API_BASE_URL`, `MAX_RETRY_COUNT`
- **Variables**: Use `camelCase` for variables.
  - Example: `userName`, `isLoggedIn`
- **State Variables**: Use `camelCase` for state variables in React components.
  - Example: `isLoading`, `userDetails`

## Function Naming

- Use `camelCase` for function names.
  - Example: `handleSubmit`, `fetchUserData`
- Use verbs to indicate actions.
  - Example: `getUser`, `setUser`, `updateProfile`

## Component Naming

- Use `PascalCase` for React components.
  - Example: `SignInForm`, `UserProfileCard`
- Use nouns or noun phrases to describe the component.
  - Example: `Dashboard`, `MusicPlayer`

## API Endpoints

- Use `camelCase` for API endpoint files.
  - Example: `createUser.ts`, `getUser.ts`
- Use descriptive names to indicate the purpose of the endpoint.
  - Example: `updatePlaylist.ts`, `deleteSong.ts`

## Directory Naming

- Use `kebab-case` for directory names.
  - Example: `features/auth`, `features/music`
- Keep directory names short and descriptive.

## Type Definitions

- Always use `type` for defining types
- Use PascalCase for type names
- Use descriptive names that indicate the purpose
- Example:

  ```typescript
  type UserProfile = {
    id: string;
    name: string;
    email: string;
  };

  type AuthState = {
    user: UserProfile | null;
    isAuthenticated: boolean;
  };
  ```

## Enum Naming

- Use `PascalCase`
