# Feature-Based Code Structure

This document outlines the recommended structure for organizing code in the SongShare-2 project. The structure is designed to promote modularity, scalability, and maintainability.

## Why Feature-Based Structure?

Organizing code by features rather than by file type (e.g., separating components, hooks, and utilities into different folders) allows for better encapsulation and easier navigation. Each feature folder contains everything related to that feature, making it easier to understand and modify.

## Folder Structure

Each feature should have its own folder under the `features/` directory. The folder should contain all the necessary files for that feature, such as components, hooks, utilities, and styles. Avoid creating subdirectories inside a feature folder, except for nested features.

### Example Structure

```
features/
  auth/
    SignInForm.tsx
    SignOutButton.tsx
    useAuth.ts
    validateCredentials.ts
    authSlice.ts
  dashboard/
    Dashboard.tsx
    useDashboard.ts
    dashboardSlice.ts
  music/
    MusicPlayer.tsx
    useMusic.ts
    musicSlice.ts
    nested-feature/
      NestedFeatureComponent.tsx
      nestedFeatureSlice.ts
```

### Key Points:

1. **Encapsulation**: All files related to a feature should reside in its folder.
2. **Flat Structure**: Avoid subdirectories inside a feature folder, except for nested features.
3. **Reusability**: Shared components or utilities should be moved to a common folder (e.g., `components/` or `lib/`).
4. **Scalability**: Adding new features is straightforward—just create a new folder.

## Rule of Thumb for Adding Nested Feature Directories

To maintain clarity and organization within the feature-based structure, follow this rule of thumb:

- **Add a Nested Feature Directory**: If the number of files directly inside a feature folder exceeds about a dozen, consider creating a nested directory to group related files. This helps avoid clutter and ensures that the feature remains easy to navigate.

### Example

If the `music/` feature folder contains more than a dozen files, you might organize it like this:

```
features/
  music/
    MusicPlayer.tsx
    useMusic.ts
    musicSlice.ts
    nested-feature/
      NestedFeatureComponent.tsx
      nestedFeatureSlice.ts
```

This approach keeps the feature folder manageable and improves readability.

## State Management

Each feature should manage its own state using a single slice file. This ensures that state logic is encapsulated and easy to maintain.

### Example Slice File

```typescript
// features/auth/authSlice.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "auth-storage",
      storage: AsyncStorage,
    }
  )
);

export default useAuthStore;
```

### Best Practices for Slices

1. **Single Slice File**: Each feature should have at most one slice file to manage its state.
2. **Encapsulation**: Keep state logic specific to the feature.
3. **Avoid Overloading**: Do not include unrelated state or actions in a slice.

## Shared Resources

For shared resources like common components, hooks, or utilities, use the `components/`, `lib/`, or `hooks/` directories at the root level. For example:

```
components/
  Button.tsx
  Modal.tsx
lib/
  utils.ts
  composeRefs.ts
hooks/
  useTimeout.ts
  useIsomorphicLayoutEffect.ts
```

## Testing

Each feature should include tests for its components, hooks, and state management. Place test files alongside the files they test, using the `.test.ts` or `.test.tsx` extension.

### Example

```
features/
  auth/
    SignInForm.tsx
    SignInForm.test.tsx
    useAuth.ts
    useAuth.test.ts
    authSlice.ts
    authSlice.test.ts
```

## Node.js API Endpoints

Since this project uses Node.js for backend operations, API endpoints should be organized in a feature-based manner. Each feature should have its own folder containing related API endpoints, utilities, and tests.

### Example Structure

```
src/
  api/
    users/
      createUser.ts
      getUser.ts
      updateUser.ts
      deleteUser.ts
      __tests__/
        createUser.test.ts
        getUser.test.ts
    playlists/
      createPlaylist.ts
      getPlaylist.ts
      updatePlaylist.ts
      deletePlaylist.ts
      __tests__/
        createPlaylist.test.ts
        getPlaylist.test.ts
    songs/
      createSong.ts
      getSong.ts
      updateSong.ts
      deleteSong.ts
      __tests__/
        createSong.test.ts
        getSong.test.ts
```

### Guidelines

1. **File Naming**: Use descriptive names for files and folders to indicate their purpose.
2. **Testing**: Include a `__tests__` folder within each feature folder for unit and integration tests.
3. **Modularity**: Keep each file focused on a single responsibility to improve readability and maintainability.
4. **Documentation**: Add comments and documentation for each API endpoint to explain its purpose and usage.

## Step-by-Step Guide for Adding a New Feature

To ensure consistency and adherence to the feature-based structure, follow these steps when adding a new feature:

1. **Create a New Folder**:

   - Navigate to the `features/` directory.
   - Create a new folder named after the feature (e.g., `features/newFeature/`).

2. **Add Initial Files**:

   - Create the following files inside the new folder:
     - A main component file (e.g., `NewFeatureComponent.tsx`).
     - A state management slice file (e.g., `newFeatureSlice.ts`).
     - A hook file if needed (e.g., `useNewFeature.ts`).
     - A utility file if needed (e.g., `newFeatureUtils.ts`).

3. **Write the Component**:

   - Implement the main component for the feature in the component file.
   - Use TypeScript for type safety and follow the project's coding standards.

4. **Set Up State Management**:

   - Use Zustand to create a slice file for managing the feature's state.
   - Ensure the slice file is focused on the feature's specific state and actions.

5. **Add Tests**:

   - Create test files alongside the files they test, using the `.test.ts` or `.test.tsx` extension.
   - Write unit tests for components, hooks, and state management logic.

6. **Integrate the Feature**:

   - Update the necessary files to integrate the new feature into the app. For example:
     - Add the feature's route to the routing configuration.
     - Include the feature's state in the global state if required.

7. **Document the Feature**:

   - Update the relevant documentation in the `docs/` folder to include details about the new feature.
   - Add comments in the code to explain complex logic or decisions.

8. **Review and Test**:
   - Review the code to ensure it adheres to the project's guidelines.
   - Run tests to verify the feature works as expected.

## Code Templates

To streamline the process, use the following templates for common files:

### Component File Template

```typescript
// features/newFeature/NewFeatureComponent.tsx
import React from "react";

const NewFeatureComponent: React.FC = () => {
  return <div>New Feature</div>;
};

export default NewFeatureComponent;
```

### Slice File Template

```typescript
// features/newFeature/newFeatureSlice.ts
import { create } from "zustand";

type NewFeatureState = {
  data: NewFeatureData[];
  isLoading: boolean;
  error: string | null;
};

const useNewFeatureStore = create<NewFeatureState>((set) => ({
  data: [],
  isLoading: true,
  error: null,
}));

export default useNewFeatureStore;
```

### Test File Template

```typescript
// features/newFeature/NewFeatureComponent.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import NewFeatureComponent from "./NewFeatureComponent";

test("renders New Feature component", () => {
  render(<NewFeatureComponent />);
  expect(screen.getByText("New Feature")).toBeInTheDocument();
});
```

### Best Practices

- Organize stories by feature or component.
- Use descriptive names for stories to make them easy to identify.
- Keep stories simple and focused on a single use case.

## Benefits

- **Scalability**: The feature-based structure makes it easier to add new features without affecting existing code.
- **Maintainability**: Grouping related files together simplifies navigation and reduces the risk of introducing bugs.
- **Collaboration**: A clear structure helps team members understand the codebase and contribute effectively.

## Summary

- Organize code by features for better encapsulation and scalability.
- Each feature should have its own folder under `features/`.
- Avoid subdirectories inside a feature folder, except for nested features.
- Use a single slice file per feature for state management.
- Place shared resources in common directories like `components/` or `lib/`.
- Include tests for all feature-related files.

By following these guidelines, you can maintain a clean and scalable codebase that is easy to navigate and extend.

### Example Component

```tsx
// features/auth/SignInForm.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuthStore } from "./authSlice";

export function SignInForm() {
  const { theme } = useAuthStore();

  return (
    <View className="flex-1 p-4 bg-white dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Sign In
      </Text>

      <View className="mb-4">
        <Text className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
          Email
        </Text>
        <TextInput
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
          placeholder="Enter your email"
          placeholderTextColor="text-gray-500 dark:text-gray-400"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-6">
        <Text className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
          Password
        </Text>
        <TextInput
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
          placeholder="Enter your password"
          placeholderTextColor="text-gray-500 dark:text-gray-400"
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className="bg-blue-500 dark:bg-blue-600 p-3 rounded-lg"
        onPress={() => {}}
      >
        <Text className="text-white text-center font-medium">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
```
