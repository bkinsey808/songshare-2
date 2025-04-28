# Form Handling and Validation

This document outlines the form handling and validation practices for the SongShare-2 project, including reset functionality and label positioning guidelines.

## Installation

```bash
npx expo install react-hook-form @hookform/resolvers valibot
```

## Form Structure

### Basic Form Component

```typescript
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength } from "valibot";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

type FormValues = {
  name: string;
  email: string;
  // ... other fields
};

type FormFieldProps = {
  label: string;
  error?: string;
  [key: string]: any;
};

type SwitchFieldProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

type ResetButtonProps = {
  isDirty: boolean;
  onPress: () => void;
};

type FormInputProps = {
  error?: string;
  [key: string]: any;
};

type ErrorMessageProps = {
  error?: string;
};

const schema = object({
  name: string([minLength(3, "Name must be at least 3 characters")]),
  email: string([minLength(5, "Email must be at least 5 characters")]),
  // ... other validations
});

export function FormExample() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <View className="p-4 gap-4 bg-white dark:bg-gray-900">
      {/* Label on top */}
      <View className="gap-2">
        <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
          Name
        </Text>
        <TextInput
          className={`p-3 border rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 ${
            errors.name
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholderTextColor="text-gray-500 dark:text-gray-400"
          {...register("name")}
        />
        {errors.name && (
          <Text className="text-red-500 dark:text-red-400 text-sm">
            {errors.name.message}
          </Text>
        )}
      </View>

      {/* Label on top */}
      <View className="gap-2">
        <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
          Email
        </Text>
        <TextInput
          className={`p-3 border rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 ${
            errors.email
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholderTextColor="text-gray-500 dark:text-gray-400"
          {...register("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <Text className="text-red-500 dark:text-red-400 text-sm">
            {errors.email.message}
          </Text>
        )}
      </View>

      {/* Form Actions */}
      <View className="flex-row justify-between gap-4">
        <TouchableOpacity
          onPress={handleReset}
          className={`flex-1 p-3 rounded-lg items-center ${
            isDirty
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
          disabled={!isDirty}
        >
          <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="flex-1 p-3 rounded-lg items-center bg-blue-500 dark:bg-blue-600"
        >
          <Text className="text-base font-medium text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## Label Positioning Guidelines

### 1. Top Labels (Default)

- Use for most form fields
- Provides better readability
- Works well with error messages
- Example:
  ```tsx
  export function FormField({ label, error, ...props }: FormFieldProps) {
    return (
      <View className="gap-2">
        <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
          {label}
        </Text>
        <TextInput
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
          placeholderTextColor="text-gray-500 dark:text-gray-400"
          {...props}
        />
        {error && (
          <Text className="text-red-500 dark:text-red-400 text-sm">
            {error}
          </Text>
        )}
      </View>
    );
  }
  ```

### 2. Side Labels (When Appropriate)

- Use for short forms or compact layouts
- Use for checkbox/radio groups
- Example:
  ```tsx
  export function SwitchField({ label, value, onChange }: SwitchFieldProps) {
    return (
      <View className="flex-row items-center">
        <Switch value={value} onValueChange={onChange} />
        <Text className="ml-2 text-base text-gray-900 dark:text-gray-100">
          {label}
        </Text>
      </View>
    );
  }
  ```

## Reset Functionality

### 1. Basic Reset

```typescript
export function useFormReset() {
  const { reset } = useForm();

  const handleReset = () => {
    reset();
  };

  return handleReset;
}
```

### 2. Reset with Default Values

```typescript
type DefaultValues = {
  [key: string]: any;
};

export function useFormResetWithDefaults(defaultValues: DefaultValues) {
  const { reset } = useForm();

  const handleReset = () => {
    reset(defaultValues);
  };

  return handleReset;
}
```

### 3. Reset with Confirmation

```typescript
import { Alert } from "react-native";

export function useFormResetWithConfirmation() {
  const { reset } = useForm();

  const handleReset = () => {
    Alert.alert("Reset Form", "Are you sure you want to reset the form?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        onPress: () => reset(),
      },
    ]);
  };

  return handleReset;
}
```

### 4. Reset Button States

```tsx
export function ResetButton({ isDirty, onPress }: ResetButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 p-3 rounded-lg items-center ${
        isDirty
          ? "bg-gray-200 dark:bg-gray-700"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
      disabled={!isDirty}
    >
      <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
        Reset
      </Text>
    </TouchableOpacity>
  );
}
```

## Form Validation

### 1. Schema Validation

```typescript
import { object, string, minLength, email } from "valibot";

export const formSchema = object({
  name: string([minLength(3, "Name must be at least 3 characters")]),
  email: string([
    minLength(5, "Email must be at least 5 characters"),
    email("Please enter a valid email"),
  ]),
});
```

### 2. Custom Validation

```typescript
export function validatePassword(value: string) {
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter";
  }
  return true;
}
```

## Error Handling

### 1. Error Messages

```tsx
export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <Text className="text-red-500 dark:text-red-400 text-sm">{error}</Text>
  );
}
```

### 2. Field States

```tsx
export function FormInput({ error, ...props }: FormInputProps) {
  return (
    <TextInput
      className={`p-3 border rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 ${
        error
          ? "border-red-500 dark:border-red-400"
          : "border-gray-300 dark:border-gray-600"
      }`}
      placeholderTextColor="text-gray-500 dark:text-gray-400"
      {...props}
    />
  );
}
```

## Best Practices

1. **Form Structure**

   - Use React Native components with NativeWind classes
   - Group related fields
   - Provide clear labels
   - Include helpful hints
   - Support both light and dark modes

2. **Validation**

   - Validate on blur and submit
   - Show clear error messages
   - Use appropriate keyboard types
   - Implement custom validation when needed

3. **Reset Functionality**

   - Include reset button on all forms
   - Show reset button state
   - Confirm before resetting
   - Reset to appropriate defaults

4. **Accessibility**
   - Use proper accessibility labels
   - Ensure keyboard navigation
   - Provide clear focus states
   - Support screen readers

## Testing

1. **Form Validation**

   - Test required fields
   - Test format validation
   - Test custom validation
   - Test error messages
   - Test dark mode appearance

2. **Reset Functionality**

   - Test reset button
   - Test reset confirmation
   - Test reset states
   - Test default values
   - Test dark mode states

3. **User Experience**
   - Test form submission
   - Test error handling
   - Test accessibility
   - Test mobile responsiveness
   - Test dark mode transitions

## Related Documentation

- [TypeScript and React Best Practices](../TYPESCRIPT_REACT_BEST_PRACTICES.md)
- [Styling Best Practices](../STYLING.md)
- [Testing Guidelines](../TESTING.md)
