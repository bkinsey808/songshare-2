# Dependencies

This document outlines the key dependencies used in the SongShare-2 project, along with their purposes and links to their documentation.

## Frontend

1. **React Native**

   - Purpose: Building mobile applications.
   - Documentation: [React Native Docs](https://reactnative.dev/docs/getting-started)

2. **Expo**

   - Purpose: Framework and platform for universal React applications.
   - Documentation: [Expo Docs](https://docs.expo.dev/)

3. **NativeWind**

   - Purpose: Utility-first styling for React Native using Tailwind CSS.
   - Documentation: [NativeWind Docs](https://www.nativewind.dev/)

4. **Tailwind CSS**

   - Purpose: Utility-first CSS framework for styling.
   - Documentation: [Tailwind CSS Docs](https://tailwindcss.com/docs)

5. **Reanimated**

   - Purpose: High-performance animations and gesture handling for React Native and Expo.
   - Documentation: [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)

6. **Zustand**

   - Purpose: State management library for React.
   - Documentation: [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

## NativeWind Setup

To get NativeWind working in this project, the following command was run:

```bash
npx rn-new@latest
```

This command ensures that NativeWind is properly configured for the project.

## Backend

1. **Firebase Firestore**

   - Purpose: Real-time database for storing and syncing data.
   - Documentation: [Firestore Docs](https://firebase.google.com/docs/firestore)

2. **Firebase Authentication**

   - Purpose: User authentication and authorization.
   - Documentation: [Firebase Auth Docs](https://firebase.google.com/docs/auth)

3. **Firebase Storage**

   - Purpose: Store and serve user-generated content like images and videos.
   - Documentation: [Firebase Storage Docs](https://firebase.google.com/docs/storage)

4. **Cloudflare Workers**

   - Purpose: Serverless platform for running custom code at the edge.
   - Documentation: [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

## Testing

1. **Jest**

   - Purpose: JavaScript testing framework.
   - Documentation: [Jest Docs](https://jestjs.io/docs/getting-started)

2. **React Testing Library**

   - Purpose: Testing React components.
   - Documentation: [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)

3. **@testing-library/user-event**

   - Purpose: Simulate user interactions for testing React components.
   - Documentation: [User Event Docs](https://testing-library.com/docs/user-event/intro)

4. **React Hook Form**

   - Purpose: Performant and flexible form handling for React.
   - Documentation: [React Hook Form Docs](https://react-hook-form.com/get-started)

5. **Playwright**

   - Purpose: End-to-end testing framework for web applications.
   - Documentation: [Playwright Docs](https://playwright.dev/docs/intro)

## Build Tools

1. **PostCSS**

   - Purpose: CSS processing.
   - Documentation: [PostCSS Docs](https://postcss.org/)

2. **ESLint**

   - Purpose: Linting JavaScript and TypeScript code.
   - Documentation: [ESLint Docs](https://eslint.org/docs/latest/)

3. **Prettier**
   - Purpose: Code formatting.
   - Documentation: [Prettier Docs](https://prettier.io/docs/en/)

## Additional Utilities

1. **TypeScript**

   - Purpose: Static typing for JavaScript.
   - Documentation: [TypeScript Docs](https://www.typescriptlang.org/docs/)

2. **PNPM**

   - Purpose: Fast, disk space-efficient package manager.
   - Documentation: [PNPM Docs](https://pnpm.io/)

3. **jose**
   - Purpose: A library for creating, signing, and verifying JSON Web Tokens (JWTs) used in HTTP-only session cookies for secure authorization.
   - Documentation: [jose Docs](https://github.com/panva/jose)

## Validation

1. **Valibot**

   - Purpose: Schema validation and type inference for TypeScript.
   - Documentation: [Valibot Docs](https://valibot.dev/)

Valibot is used across the project for validating forms, Firestore documents, and other data structures.

This list is not exhaustive. Refer to the `package.json` file for a complete list of dependencies.
