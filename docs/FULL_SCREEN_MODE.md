# Full Screen Mode Implementation

This document outlines how to implement and use full-screen mode in the SongShare-2 project. Full-screen mode enhances the user experience by allowing the app to occupy the entire screen, removing browser UI elements.

## Key Features

1. **Maximize Viewport**:

   - Provides an option to maximize the app's viewport for an immersive experience.
   - Useful for presentations, media playback, or focused tasks.

2. **Dynamic Control**:
   - Full-screen mode can be toggled programmatically or via user interaction.

## Implementation Steps

### 1. Add a Full-Screen Icon

Ensure the web app includes an icon to toggle full-screen mode. Place the icon in a prominent location, such as the app's header or toolbar.

Example:

```tsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native-web";
import { useFullScreen } from "../lib/fullScreen";

const FullScreenToggle = () => {
  const { enterFullScreen, exitFullScreen, isFullScreen } = useFullScreen();

  return (
    <View style={{ position: "absolute", top: 10, right: 10 }}>
      <TouchableOpacity
        onPress={isFullScreen ? exitFullScreen : enterFullScreen}
        style={{ padding: 10, backgroundColor: "#ccc", borderRadius: 5 }}
      >
        <Text>{isFullScreen ? "Exit Full Screen" : "Full Screen"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FullScreenToggle;
```

### 2. Implement Full-Screen Logic

Create a utility to handle full-screen mode using the browser's Fullscreen API.

Example:

```tsx
import { useState } from "react";

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return { enterFullScreen, exitFullScreen, isFullScreen };
};
```

### 3. Integrate Full-Screen Toggle

Add the `FullScreenToggle` component to the app's layout or header.

Example:

```tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFullScreen } from "../hooks/useFullScreen";

export function FullScreenToggle() {
  const { isFullScreen, enterFullScreen, exitFullScreen } = useFullScreen();

  return (
    <TouchableOpacity
      className={`p-2 rounded-lg ${
        isFullScreen
          ? "bg-gray-200 dark:bg-gray-700"
          : "bg-blue-500 dark:bg-blue-600"
      }`}
      onPress={isFullScreen ? exitFullScreen : enterFullScreen}
    >
      <Text
        className={`font-medium ${
          isFullScreen ? "text-gray-900 dark:text-gray-100" : "text-white"
        }`}
      >
        {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
      </Text>
    </TouchableOpacity>
  );
}

export function AppLayout({ children }) {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-4 border-b border-gray-200 dark:border-gray-700">
        <FullScreenToggle />
      </View>
      <View className="flex-1">{children}</View>
    </View>
  );
}
```

## Best Practices

- **Accessibility**: Ensure the full-screen toggle is accessible via keyboard and screen readers.
- **User Feedback**: Provide visual feedback when entering or exiting full-screen mode.
- **Testing**: Verify full-screen functionality across different browsers and devices.
- **Dark Mode**: Support dark mode in full-screen mode.

## Example Use Case

A presentation mode that maximizes the viewport:

```tsx
import React from "react";
import { View, Text } from "react-native";
import { FullScreenToggle } from "./FullScreenToggle";

export function PresentationMode() {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-4 border-b border-gray-200 dark:border-gray-700">
        <FullScreenToggle />
      </View>

      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Presentation Content
        </Text>
        <Text className="text-base text-gray-700 dark:text-gray-300">
          Your presentation content goes here.
        </Text>
      </View>
    </View>
  );
}
```
