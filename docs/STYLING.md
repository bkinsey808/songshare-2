# Styling Best Practices for Expo.dev Projects with NativeWind/Tailwind

This document outlines best practices for styling in Expo.dev projects using NativeWind/Tailwind. It emphasizes the use of design tokens for consistent and maintainable styling.

## Why Use NativeWind/Tailwind?

NativeWind/Tailwind provides a utility-first approach to styling, enabling rapid development and consistent design. It integrates seamlessly with Expo.dev, making it a great choice for React Native projects.

## Best Practices

### 1. Use Design Tokens

- **What are Design Tokens?**
  Design tokens are named entities that store visual design attributes such as colors, spacing, and typography. They ensure consistency across the application.

### Example Tailwind Configuration for Light and Dark Mode

To support design tokens for colors and light/dark mode, you can set up your `tailwind.config.ts` file as follows:

```javascript
module.exports = {
  darkMode: "class", // Enables dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#1E40AF", // Light mode primary color
          dark: "#3B82F6", // Dark mode primary color
        },
        secondary: {
          light: "#9333EA", // Light mode secondary color
          dark: "#7C3AED", // Dark mode secondary color
        },
        background: {
          light: "#FFFFFF", // Light mode background
          dark: "#1A202C", // Dark mode background
        },
        text: {
          light: "#000000", // Light mode text color
          dark: "#FFFFFF", // Dark mode text color
        },
      },
    },
  },
  plugins: [],
};
```

### How to Use the Configuration

1. Add the `class` attribute to the root element of your app to toggle between light and dark mode.
2. Use the `dark:` prefix in your Tailwind classes to apply dark mode styles.

Example:

```javascript
<View className="bg-background-light dark:bg-background-dark">
  <Text className="text-text-light dark:text-text-dark">Hello, World!</Text>
</View>
```

### 2. Leverage Utility Classes

- Use Tailwind's utility classes for common styling needs.
- Avoid creating custom styles unless absolutely necessary.

### 3. Responsive Design

- Use Tailwind's responsive utilities to ensure the app looks great on all screen sizes.
- Example:
  ```javascript
  <View className="p-4 md:p-8 lg:p-12">
    <Text className="text-sm md:text-lg lg:text-xl">Responsive Text</Text>
  </View>
  ```

### 4. Dark Mode Support

- Configure dark mode in `tailwind.config.ts`.
- Use the `dark:` prefix for dark mode styles.

  Example:

  ```javascript
  <View className="bg-white dark:bg-black">
    <Text className="text-black dark:text-white">Dark Mode Text</Text>
  </View>
  ```

### 5. Consistent Naming Conventions

- Use meaningful and consistent class names.
- Group related styles together for better readability.

### 6. Testing and Debugging

- Use tools like Tailwind's IntelliSense for VS Code to get class name suggestions and error checking.
- Test styles on multiple devices and screen sizes.

## Additional Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Expo.dev Documentation](https://docs.expo.dev/)

By following these best practices, you can create a visually consistent and maintainable application using NativeWind/Tailwind in your Expo.dev project.
