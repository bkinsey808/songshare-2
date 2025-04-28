# Color System

This document outlines the color system used in the SongShare-2 project, including light and dark mode values and their intended uses.

## Background Colors

### Primary Background

- **Light Mode**: `bg-white` (`#FFFFFF`)
  - Used for main app background
  - Default background for screens and sections
- **Dark Mode**: `dark:bg-gray-900` (`#111827`)
  - Dark mode equivalent for main app background
  - Ensures good contrast in dark mode

### Secondary Background

- **Light Mode**: `bg-gray-100` (`#F3F4F6`)
  - Used for inactive elements
  - Secondary buttons
  - Subtle backgrounds
- **Dark Mode**: `dark:bg-gray-800` (`#1F2937`)
  - Dark mode equivalent for secondary backgrounds
  - Used for inactive elements in dark mode

### Input Background

- **Light Mode**: `bg-white` (`#FFFFFF`)
  - Used for input fields
  - Form elements
- **Dark Mode**: `dark:bg-gray-800` (`#1F2937`)
  - Dark mode equivalent for input fields
  - Ensures readability in dark mode

## Text Colors

### Primary Text

- **Light Mode**: `text-gray-900` (`#111827`)
  - Main text color
  - Headings
  - Important content
- **Dark Mode**: `dark:text-gray-100` (`#F3F4F6`)
  - Dark mode equivalent for main text
  - Ensures readability in dark mode

### Secondary Text

- **Light Mode**: `text-gray-700` (`#374151`)
  - Secondary text
  - Descriptions
  - Less important content
- **Dark Mode**: `dark:text-gray-300` (`#D1D5DB`)
  - Dark mode equivalent for secondary text
  - Used for descriptions in dark mode

### Placeholder Text

- **Light Mode**: `text-gray-500` (`#6B7280`)
  - Input placeholders
  - Disabled text
- **Dark Mode**: `dark:text-gray-400` (`#9CA3AF`)
  - Dark mode equivalent for placeholders
  - Ensures visibility in dark mode

## Interactive Elements

### Primary Buttons

- **Light Mode**: `bg-blue-500` (`#3B82F6`)
  - Primary action buttons
  - Main CTAs
  - Important interactions
- **Dark Mode**: `dark:bg-blue-600` (`#2563EB`)
  - Dark mode equivalent for primary buttons
  - Slightly darker for better contrast

### Secondary Buttons

- **Light Mode**: `bg-gray-200` (`#E5E7EB`)
  - Secondary action buttons
  - Less important interactions
- **Dark Mode**: `dark:bg-gray-700` (`#374151`)
  - Dark mode equivalent for secondary buttons
  - Ensures visibility in dark mode

### Button Text

- **Light Mode**: `text-white` (`#FFFFFF`)
  - Text on primary buttons
  - Ensures contrast against blue background
- **Dark Mode**: `text-gray-900 dark:text-gray-100`
  - Text on secondary buttons
  - Adapts to light/dark mode

## Borders and Dividers

### Primary Borders

- **Light Mode**: `border-gray-300` (`#D1D5DB`)
  - Input field borders
  - Section dividers
  - Card borders
- **Dark Mode**: `dark:border-gray-600` (`#4B5563`)
  - Dark mode equivalent for borders
  - Ensures visibility in dark mode

### Error States

- **Light Mode**: `border-red-500` (`#EF4444`)
  - Error states
  - Invalid input fields
- **Dark Mode**: `dark:border-red-400` (`#F87171`)
  - Dark mode equivalent for error states
  - Slightly lighter for better visibility

## Error Messages

### Error Text

- **Light Mode**: `text-red-500` (`#EF4444`)
  - Error messages
  - Validation feedback
- **Dark Mode**: `dark:text-red-400` (`#F87171`)
  - Dark mode equivalent for error messages
  - Slightly lighter for better visibility

## Usage Guidelines

1. **Consistency**

   - Use the predefined color classes consistently across the application
   - Maintain the same color meanings throughout the app

2. **Accessibility**

   - Ensure sufficient contrast between text and background colors
   - Test color combinations for WCAG compliance
   - Use semantic colors for interactive elements

3. **Dark Mode**

   - Always provide dark mode alternatives using the `dark:` prefix
   - Test dark mode colors for readability and contrast
   - Use system preferences for initial theme detection

4. **State Management**
   - Store theme preference in AsyncStorage
   - Use Zustand for theme state management
   - Provide smooth transitions between themes

## Implementation Example

```tsx
import { View, Text, TouchableOpacity } from "react-native";

export function ExampleComponent() {
  return (
    <View className="flex-1 p-4 bg-white dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Example Title
      </Text>

      <TouchableOpacity
        className="bg-blue-500 dark:bg-blue-600 p-3 rounded-lg"
        onPress={() => {}}
      >
        <Text className="text-white text-center font-medium">
          Primary Action
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Related Documentation

- [Styling Best Practices](../STYLING.md)
- [Dark Mode Implementation](../DARK_MODE.md)
- [Accessibility Guidelines](../ACCESSIBILITY.md)
