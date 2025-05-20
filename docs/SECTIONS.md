# Sections Implementation Guide

This document outlines the implementation of sections in the SongShare-2 project in an Expo.dev environment. Sections are designed to be externally openable based on state, navigable, and support nesting.

## Key Features

1. **Externally Openable Sections**:

   - Sections can be opened or closed based on the application state.
   - This allows for deep linking and external triggers to control the visibility of specific sections.

2. **Navigable and Focusable Sections**:

   - Users can jump to and focus on a specific section when the state changes.
   - This is useful for scenarios like navigating to a specific playlist or song log.

3. **Nested Sections**:
   - Sections can be nested to represent hierarchical data or UI structures.
   - For example, a playlist section can contain nested song sections.

## Implementation Steps

### 1. State Management

Use a global state management library like Zustand or React Context to manage the visibility and focus state of sections.

```typescript
import create from "zustand";

// Updated to use `type` instead of `interface` for defining types in TypeScript

type SectionState = {
  activeSection: string | null;
  setActiveSection: (sectionId: string | null) => void;
};

export const useSectionStore = create<SectionState>((set) => ({
  activeSection: null,
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
}));
```

### 2. Section Component

Create a reusable `Section` component using React Native and NativeWind classes.

```tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useSectionStore } from "../path-to-store";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  const { activeSection, setActiveSection } = useSectionStore();

  const isActive = activeSection === id;

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <TouchableOpacity
        className="p-4 border-b border-gray-200 dark:border-gray-700"
        onPress={() => setActiveSection(id)}
      >
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </Text>
      </TouchableOpacity>

      {isActive && <View className="p-4">{children}</View>}
    </View>
  );
}
```

### 3. Navigation and Focus

Implement navigation logic to update the state and focus on specific sections.

```tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useSectionStore } from "../path-to-store";

export function SectionNavigator() {
  const { activeSection, setActiveSection } = useSectionStore();

  return (
    <View className="flex-row bg-white dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700">
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg mr-2 ${
          activeSection === "playlist"
            ? "bg-blue-500 dark:bg-blue-600"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
        onPress={() => setActiveSection("playlist")}
      >
        <Text
          className={`font-medium ${
            activeSection === "playlist"
              ? "text-white"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          Playlists
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          activeSection === "songs"
            ? "bg-blue-500 dark:bg-blue-600"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
        onPress={() => setActiveSection("songs")}
      >
        <Text
          className={`font-medium ${
            activeSection === "songs"
              ? "text-white"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          Songs
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 4. Nested Sections

Support nested sections by rendering child `Section` components within a parent `Section`.

```tsx
<Section id="parent-section">
  <Section id="child-section">
    <Text>Child Section Content</Text>
  </Section>
</Section>
```

### 5. Smooth Animations

Enhance the user experience by adding smooth animations for opening, closing, and scrolling to sections. Use Tailwind CSS animations and transitions for consistency with the project's styling.

#### Implementation

1. **Tailwind Animations**:

   - Define animations in `tailwind.config.ts` for opening and closing sections, such as `accordion-down` and `accordion-up`.
   - Use these animations in the `SectionAccordion` component.

2. **Smooth Scrolling**:

   - Implement smooth scrolling using the `scrollIntoView` method with the `behavior: 'smooth'` option.
   - Adjust the scroll position to account for fixed headers or other UI elements.

3. **Integration**:
   - Update the `SectionAccordion` component to dynamically apply animation classes based on the section's state.
   - Ensure the `sectionToggle` function in the state management slice supports smooth scrolling.

#### Example

```tsx
<SectionAccordion
  sectionId="example-section"
  title="Example Section"
  buttonLabel="Toggle Section"
  buttonVariant="primary"
>
  <Text>Content of the example section.</Text>
</SectionAccordion>
```

This approach ensures a seamless and visually appealing interaction for users.

### Sections from Old Project

The following sections have been migrated from the old project and integrated into the new project:

- **SONG**:

  - Title: `SongTitle`
  - Component: `SongSection`
  - Button Label: `SongButtonLabel`
  - Icon: ![Song Icon](../icons/song.svg)
  - Description: Displays details about a specific song, including metadata and playback options.

- **SONG_LIBRARY**:

  - Title: `SongLibraryTitle`
  - Component: `SongLibrarySection`
  - Button Label: `SongLibraryButtonLabel`
  - Icon: ![Song Library Icon](../icons/song-library.svg)
  - Description: Manages a collection of songs in the user's library.

- **PLAYLIST**:

  - Title: `PlaylistTitle`
  - Component: `PlaylistSection`
  - Button Label: `PlaylistButtonLabel`
  - Icon: ![Playlist Icon](../icons/playlist.svg)
  - Description: Manages a collection of songs grouped into a playlist for easy access and playback.

- **PLAYLIST_LIBRARY**:

  - Title: `PlaylistLibraryTitle`
  - Component: `PlaylistLibrarySection`
  - Button Label: `PlaylistLibraryButtonLabel`
  - Icon: ![Playlist Library Icon](../icons/playlist-library.svg)
  - Description: Manages a collection of playlists in the user's library.

- **LOG**:

  - Title: `LogTitle`
  - Component: `LogSection`
  - Button Label: `LogButtonLabel`
  - Icon: ![Log Icon](../icons/log.svg)
  - Description: Tracks user activity or interactions, such as recently played songs or playlists.

- **SETTINGS**:

  - Title: `Settings`
  - Component: `SettingsSection`
  - Button Label: `SettingsButtonLabel`
  - Icon: ![Settings Icon](../icons/gear.svg)
  - Description: Provides configuration options for user preferences and application behavior.

- **QR**:

  - Title: `QR`
  - Component: `QRSection`
  - Button Label: `QRButtonLabel`
  - Icon: ![QR Icon](../icons/qr.svg)
  - Description: Generates and displays QR codes for sharing content or accessing specific features.

- **ABOUT**:

  - Title: `About`
  - Component: `AboutSection`
  - Button Label: `AboutButtonLabel`
  - Icon: ![About Icon](../icons/about.svg)
  - Description: Provides information about the application, its purpose, and features.

- **USER_LIBRARY**:

  - Title: `UserLibraryTitle`
  - Component: `UserLibrarySection`
  - Button Label: `UserLibraryButtonLabel`
  - Icon: ![User Library Icon](../icons/user-library.svg)
  - Description: Displays a user's personal library of songs and playlists.

- **ADMIN**:
  - Title: `Admin`
  - Component: `AdminSection`
  - Button Label: `AdminButtonLabel`
  - Icon: ![Admin Icon](../icons/admin.svg)
  - Description: Contains administrative tools and settings for managing the application.

Each section is designed to be modular and follows the feature-based structure outlined in the project documentation.

## Best Practices

- **Performance**: Use memoization to optimize rendering of sections.
- **Accessibility**: Ensure sections are accessible by providing appropriate ARIA roles and labels.
- **Testing**: Write unit tests to verify the behavior of sections, including state changes and navigation.

## Example Use Case

A playlist section that can be opened externally and contains nested song sections:

```tsx
<Section id="playlist-section">
  <Text>Playlist Content</Text>
  <Section id="song-section">
    <Text>Song Content</Text>
  </Section>
</Section>
```

This setup ensures a modular and scalable approach to managing sections in the application.
