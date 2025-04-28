# Storybook for UI Components

Storybook is a powerful tool for developing and testing UI components in isolation. It allows developers to visualize and interact with components outside the main application, making it easier to debug and document them.

## Why Use Storybook?

- **Component Isolation**: Develop and test components independently of the app.
- **Documentation**: Automatically generate a visual catalog of components.
- **Collaboration**: Share the component library with designers and stakeholders.

## Setting Up Storybook in Expo.dev

1. **Install Dependencies**:

   ```bash
   npx expo install @storybook/react-native
   npm install --save-dev @storybook/addon-actions @storybook/addon-links
   ```

2. **Initialize Storybook**:
   Run the following command to set up Storybook:

   ```bash
   npx -p @storybook/cli sb init --type react_native
   ```

3. **Configure Storybook**:

   - Create a `storybook` folder in the root of your project.
   - Add a `storybook/index.js` file to configure Storybook:

     ```javascript
     import { getStorybookUI } from "@storybook/react-native";
     import "./rn-addons";

     const StorybookUIRoot = getStorybookUI({});

     export default StorybookUIRoot;
     ```

4. **Add Stories**:

   - Place your stories in the `storybook/stories` folder.
   - Example story for a Button component:

     ```tsx
     import React from "react";
     import { View, Text, TouchableOpacity } from "react-native";
     import { storiesOf } from "@storybook/react-native";

     const Button = ({ title, onPress, variant = "primary" }) => (
       <TouchableOpacity
         className={`p-3 rounded-lg ${
           variant === "primary"
             ? "bg-blue-500 dark:bg-blue-600"
             : "bg-gray-200 dark:bg-gray-700"
         }`}
         onPress={onPress}
       >
         <Text
           className={`text-center font-medium ${
             variant === "primary"
               ? "text-white"
               : "text-gray-900 dark:text-gray-100"
           }`}
         >
           {title}
         </Text>
       </TouchableOpacity>
     );

     storiesOf("Button", module)
       .add("Primary", () => (
         <View className="p-4 bg-white dark:bg-gray-900">
           <Button title="Primary Button" onPress={() => {}} />
         </View>
       ))
       .add("Secondary", () => (
         <View className="p-4 bg-white dark:bg-gray-900">
           <Button
             title="Secondary Button"
             onPress={() => {}}
             variant="secondary"
           />
         </View>
       ));
     ```

5. **Run Storybook**:
   - Start your Expo project as usual.
   - Open Storybook by navigating to the Storybook UI in your app.

## Best Practices

- Organize stories by feature or component.
- Use descriptive names for stories to make them easy to identify.
- Keep stories simple and focused on a single use case.
- Include dark mode variants for all components.
- Use NativeWind classes for consistent styling.

## Additional Resources

- [Storybook for React Native Documentation](https://storybook.js.org/docs/react-native/get-started/introduction)
- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
