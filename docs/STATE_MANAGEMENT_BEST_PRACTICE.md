# Zustand Best Practices for Expo.dev Apps

Using Zustand in an Expo.dev app (iOS, Android, Web) is a great choice due to its simplicity, speed, and cross-platform compatibility. This guide summarizes best practices to make your Zustand state management robust and maintainable.

---

## 🧱 1. Use Slices for Modular State

Split your global state into logical "slices" for better scalability and organization.

```typescript
// store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CounterSlice = {
  count: number;
  increment: () => void;
};

type UserSlice = {
  user: string | null;
  setUser: (user: string) => void;
};

type AppState = CounterSlice & UserSlice;

export const useStore = create<AppState>()(
  devtools((set) => ({
    // Counter Slice
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),

    // User Slice
    user: null,
    setUser: (user) => set({ user }),
  }))
);
```

---

## 🧠 2. Selective State Access

Access only the parts of the store you need to avoid unnecessary re-renders.

```typescript
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);
```

---

## 💾 3. Persist State Using AsyncStorage

Persist useful parts of your state (e.g., theme or user preferences) using Zustand's `persist` middleware and `@react-native-async-storage/async-storage`.

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-storage",
      getStorage: () => ({
        getItem: AsyncStorage.getItem,
        setItem: AsyncStorage.setItem,
        removeItem: AsyncStorage.removeItem,
      }),
    }
  )
);
```

---

## 🛠 4. Use Devtools in Development Only

Enable Zustand Devtools only in development mode.

```typescript
import { devtools } from "zustand/middleware";

const useStore = create(
  process.env.NODE_ENV === "development"
    ? devtools((set) => ({
        count: 0,
        increment: () => set((s) => ({ count: s.count + 1 })),
      }))
    : (set) => ({
        count: 0,
        increment: () => set((s) => ({ count: s.count + 1 })),
      })
);
```

---

## ⚙️ 5. Use Derived State Instead of Duplication

Avoid duplicating state unnecessarily. Use derived values when possible.

```typescript
const isLoggedIn = useStore((state) => !!state.user);
```

---

## 📱 6. Avoid Storing Navigation State

Use `react-navigation`'s built-in tools for navigation state. Zustand should manage app logic, not navigation logic.

---

## 🔐 7. Secure Sensitive Data

Use `expo-secure-store` for storing sensitive data like tokens and passwords instead of AsyncStorage.

```bash
npx expo install expo-secure-store
```

---

## 🧪 8. Write Tests for Store Logic

Move logic into the store so it can be tested independently.

```typescript
// store.test.ts
import { useStore } from "./store";

it("increments count", () => {
  useStore.getState().increment();
  expect(useStore.getState().count).toBe(1);
});
```

---

## 🧼 9. Reset Store on Logout

Reset the Zustand store state when logging out or resetting the app.

```typescript
useStore.setState({}, true); // Clears all store state to initial
```

---

## ✅ Summary Table

| Best Practice                   | Benefit                    |
| ------------------------------- | -------------------------- |
| Modular Slices                  | Scalable and readable      |
| Selective Access                | Better performance         |
| Persistent State                | State survives restarts    |
| Devtools in Dev Only            | Debug safely               |
| Avoid Derived State Duplication | Clean and minimal          |
| Keep Nav State Separate         | Avoid complexity/conflicts |
| Secure Sensitive Data           | Avoid leaks                |
| Test Store Logic                | Reliable and maintainable  |
| Reset on Logout                 | Clean user separation      |

---

## 🛠 Bonus: Useful Packages

```bash
npm install zustand
npm install @react-native-async-storage/async-storage
npx expo install expo-secure-store
```

---

Happy hacking with Zustand + Expo! 🚀
