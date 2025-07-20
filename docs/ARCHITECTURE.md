# Architecture

## Overview

SongShare-2 is built using the Expo framework, a React-based framework for building cross-platform mobile and web applications. Expo provides a powerful set of tools and libraries to streamline development and deployment, making it an ideal choice for this project.

## Key Features of the Architecture

1. **File-Based Routing**:

   - The `src/app` directory contains the layout and page files that define the application's routes.
   - Dynamic routes are implemented using square brackets (e.g., `[fuid]` for dynamic folder-based routing).

2. **Cross-Platform Development**:

   - Expo enables the development of applications that run seamlessly on iOS, Android, and the web.
   - Shared codebases and components ensure consistency across platforms.

3. **API Integration**:

   - The `src/app/api` directory contains serverless functions that handle backend logic.
   - These routes are used for tasks like pinging the server or managing user data.

4. **Component-Based Design**:

   - The `src/components` directory contains reusable UI components, such as buttons, cards, and alerts.
   - These components follow a modular design pattern to ensure consistency and reusability.

5. **State Management**:

   - State is managed using React's built-in hooks and context API.
   - Custom hooks, such as `useTimeout` and `useIsomorphicLayoutEffect`, are defined in the `src/lib` directory.

6. **Styling**:

   - NativeWind is used for styling, which builds upon Tailwind CSS to provide a seamless integration with React Native and web projects.
   - Tailwind configurations are defined in `tailwind.config.ts`.
   - Global styles are included in `src/app/globals.css`.

7. **Testing**:

   - Jest is used for unit testing, with configurations in `jest.config.mjs`.
   - Test setup files are located in the root directory.

8. **Public Assets**:
   - Static assets like icons and images are stored in the `public` directory.
   - These assets are directly accessible via the `/public` path.

## Folder Structure

- `src/app`: Contains the main application logic, including layouts, pages, and API routes.
- `src/components`: Houses reusable UI components.
- `src/lib`: Includes utility functions and custom hooks.
- `assets`: Stores images, fonts, and other static resources used in the app.
- `docs`: Contains documentation files, including this architecture overview.
- `app.json` or `app.config.js`: Expo configuration file for defining app metadata and settings.
- `package.json`: Manages dependencies and scripts for the project.

## Import Strategy: No Barrel Files Policy

This project **strictly avoids barrel files** (`index.ts`/`index.js`) throughout the entire codebase to prevent:

1. **Circular dependency issues**
2. **Bundle size bloat** (importing more than needed)
3. **Hot reload complications**
4. **Dependency tracking complexity**
5. **TypeScript performance degradation**

### Direct Imports Required

**❌ Avoid:**

```typescript
// Don't create index.ts files that re-export everything
export * from "./component1";
export * from "./component2";

// Don't use barrel imports
import { Button, Container } from "../components";
import { useAuth } from "../features/auth";
```

**✅ Instead:**

```typescript
// Import directly from source files
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { useAuth } from "../features/auth/useAuth";
```

### Benefits

- **Zero circular dependencies** - Import cycles become impossible
- **Tree shaking** - Bundle only includes code that's actually used
- **Better TypeScript performance** - Faster compilation and IntelliSense
- **Clear dependency tracking** - Easy to see what depends on what
- **Improved debugging** - Clearer stack traces and error messages
- **Better refactoring** - IDEs can safely rename and move files

### Enforcement

- Code reviews reject any PRs introducing barrel files
- All imports must point directly to specific files
- Feature modules maintain clear, acyclic dependency graphs

## Conclusion

The architecture of SongShare-2 is designed to be modular, scalable, and maintainable, leveraging the powerful features of Expo and NativeWind to deliver a high-quality cross-platform user experience. The strict no-barrel-files policy ensures a clean, performant, and maintainable codebase.
