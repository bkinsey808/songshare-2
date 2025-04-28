# WakeLock Implementation

This document outlines how to implement WakeLock in the SongShare-2 project to prevent the device screen from dimming or locking while the app is in use. This feature is particularly useful for scenarios like playing music or displaying QR codes.

## Key Features

1. **Prevent Screen Lock**:

   - Ensures the screen remains active while the app is in use.
   - Useful for uninterrupted user experiences during critical tasks.

2. **Dynamic Control**:
   - WakeLock can be enabled or disabled programmatically based on user actions or app state.

## Implementation Steps

### 1. Install the `expo-keep-awake` Package

Run the following command to install the package:

```bash
expo install expo-keep-awake
```

### 2. Use the `useKeepAwake` Hook

To keep the screen awake while a component is mounted, use the `useKeepAwake` hook from the `expo-keep-awake` package.

Example:

```tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

export function WakeLockScreen() {
  useKeepAwake();

  return (
    <View className="flex-1 p-4 bg-white dark:bg-gray-900">
      <Text className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Screen will stay awake while this component is mounted.
      </Text>

      <TouchableOpacity
        className="bg-blue-500 dark:bg-blue-600 p-3 rounded-lg"
        onPress={() => {}}
      >
        <Text className="text-white text-center font-medium">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 3. Programmatically Enable/Disable WakeLock

If you need to enable or disable WakeLock dynamically, use the `activateKeepAwake` and `deactivateKeepAwake` functions.

Example:

```tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

export function WakeLockControls() {
  return (
    <View className="flex-1 p-4 bg-white dark:bg-gray-900">
      <Text className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        WakeLock Controls
      </Text>

      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 bg-blue-500 dark:bg-blue-600 p-3 rounded-lg"
          onPress={activateKeepAwake}
        >
          <Text className="text-white text-center font-medium">Activate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg"
          onPress={deactivateKeepAwake}
        >
          <Text className="text-gray-900 dark:text-gray-100 text-center font-medium">
            Deactivate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

### 4. Integrate WakeLock with Sections

To ensure WakeLock is active only when specific sections are in use, integrate it with the section state management.

Example:

```tsx
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSectionStore } from "../path-to-store";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

type SectionWithWakeLockProps = {
  id: string;
  children: React.ReactNode;
};

export function SectionWithWakeLock({
  id,
  children,
}: SectionWithWakeLockProps) {
  const { activeSection } = useSectionStore();

  useEffect(() => {
    if (activeSection === id) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }

    return () => deactivateKeepAwake();
  }, [activeSection, id]);

  return <View className="flex-1 bg-white dark:bg-gray-900">{children}</View>;
}
```

## Best Practices

- **Performance**: Ensure WakeLock is activated only when necessary to conserve battery life.
- **Testing**: Verify that WakeLock behaves as expected during different app states and transitions.
- **Accessibility**: Inform users when WakeLock is active to avoid unexpected behavior.

## Example Use Case

A QR code section that keeps the screen awake while displayed:

```tsx
<SectionWithWakeLock id="qr-section">
  <Text>QR Code Content</Text>
</SectionWithWakeLock>
```
