# Testing Best Practices

Testing is a critical part of the development process to ensure the reliability, maintainability, and scalability of the application. This document outlines the best practices for testing in the SongShare-2 project.

## Table of Contents

1. [Types of Tests](#types-of-tests)
2. [Tools and Frameworks](#tools-and-frameworks)
3. [Best Practices](#best-practices)
   - [General Guidelines](#general-guidelines)
   - [Unit Testing](#unit-testing)
   - [Integration Testing](#integration-testing)
   - [End-to-End Testing](#end-to-end-testing)
   - [Code Coverage](#code-coverage)
   - [Debugging and Maintenance](#debugging-and-maintenance)
4. [Example Test Structure](#example-test-structure)
5. [Running Tests](#running-tests)
6. [Playwright for End-to-End Testing](#playwright-for-end-to-end-testing)
   - [Why Use Playwright?](#why-use-playwright)
   - [Setting Up Playwright](#setting-up-playwright)
   - [Writing Playwright Tests](#writing-playwright-tests)
   - [Running Playwright Tests](#running-playwright-tests)
   - [Best Practices for Playwright](#best-practices-for-playwright)
7. [Testing Expo.dev Projects](#testing-expodev-projects)
8. [Conclusion](#conclusion)

## Types of Tests

1. **Unit Tests**:

   - Test individual functions, methods, or components in isolation.
   - Ensure that each unit of the codebase behaves as expected.

2. **Integration Tests**:

   - Test the interaction between multiple units or modules.
   - Ensure that different parts of the system work together correctly.

3. **End-to-End (E2E) Tests**:

   - Simulate real user scenarios to test the entire application flow.
   - Ensure that the application behaves as expected from the user's perspective.

4. **Regression Tests**:
   - Ensure that new changes do not break existing functionality.

## Tools and Frameworks

- **Jest**: For unit and integration testing.
- **React Testing Library**: For testing React components.
- **Playwright**: For anyend-to-end testing.

## Best Practices

### General Guidelines

1. **Write Tests for All Features**:

   - Ensure that every feature has corresponding tests.
   - Prioritize critical features and edge cases.

2. **Follow the Testing Pyramid**:

   - Focus on unit tests as the foundation.
   - Add integration tests for module interactions.
   - Use E2E tests sparingly for critical user flows.

3. **Automate Tests**:

   - Use CI/CD pipelines to run tests automatically on every commit.

4. **Mock External Dependencies**:

   - Use mocks and stubs to isolate the code under test.
   - Avoid making real API calls in unit and integration tests.

5. **Test Edge Cases**:
   - Include tests for edge cases, such as invalid inputs and error scenarios.

### Unit Testing

- Test one thing at a time.
- Use descriptive test names to explain the purpose of the test.
- Keep tests small and focused.

### Integration Testing

- Test the interaction between modules, such as API calls and database queries.
- Use in-memory databases or mock services to simulate real interactions.

### End-to-End Testing

- Focus on critical user flows, such as login, playlist management, and song sharing.
- Use realistic test data to simulate real-world scenarios.
- Run E2E tests in a clean environment to avoid side effects.

### Code Coverage

- Aim for high code coverage, but do not sacrifice quality for quantity.
- Focus on covering critical paths and edge cases.

### Debugging and Maintenance

- Use clear and consistent naming conventions for test files and test cases.
- Regularly review and update tests to match changes in the codebase.
- Remove outdated or redundant tests.

## Example Test Structure

```
src/
  __tests__/
    components/
      Button.test.tsx
    features/
      music/
        Playlist.test.tsx
  integration-tests/
    api/
      PlaylistAPI.test.ts
  e2e-tests/
    playlist-management.spec.ts
```

## Running Tests

1. **Unit and Integration Tests**:

   ```bash
   pnpm test
   ```

2. **End-to-End Tests**:

   ```bash
   pnpm e2e
   ```

3. **Code Coverage**:
   ```bash
   pnpm test --coverage
   ```

## Playwright for End-to-End Testing

Playwright is a powerful tool for end-to-end (E2E) testing, offering cross-browser support and advanced features. It is an excellent choice for testing real-world user scenarios in SongShare-2.

### Why Use Playwright?

1. **Cross-Browser Testing**:

   - Supports Chromium, Firefox, and WebKit, ensuring compatibility across different platforms.

2. **Advanced Features**:

   - Handles multiple tabs, pop-ups, and network conditions.
   - Provides powerful APIs for simulating user interactions.

3. **Parallel Execution**:

   - Runs tests in parallel to reduce execution time.

4. **Built-In Test Runner**:
   - Simplifies setup and execution with its integrated test runner.

### Setting Up Playwright

1. **Install Playwright**:

   ```bash
   pnpm add -D @playwright/test
   ```

2. **Initialize Playwright**:
   Run the following command to set up Playwright in the project:

   ```bash
   npx playwright install
   ```

3. **Configure Playwright**:
   Create a `playwright.config.ts` file in the root directory with the following content:

   ```typescript
   import { defineConfig } from "@playwright/test";

   export default defineConfig({
     testDir: "./e2e-tests",
     timeout: 30000,
     retries: 2,
     use: {
       headless: true,
       baseURL: "http://localhost:3000",
       trace: "on-first-retry",
     },
   });
   ```

### Writing Playwright Tests

1. **Create a Test File**:
   Place your test files in the `e2e-tests/` directory. For example, `e2e-tests/playlist-management.spec.ts`.

2. **Example Test**:

   ```typescript
   import { test, expect } from "@playwright/test";

   test("Playlist management flow", async ({ page }) => {
     await page.goto("/");
     await page.click("text=Login");
     await page.fill("#username", "testuser");
     await page.fill("#password", "password123");
     await page.click("text=Submit");

     await expect(page).toHaveURL("/dashboard");

     await page.click("text=Create Playlist");
     await page.fill("#playlist-name", "My Playlist");
     await page.click("text=Save");

     await expect(page.locator("text=My Playlist")).toBeVisible();
   });
   ```

### Running Playwright Tests

1. **Run All Tests**:

   ```bash
   pnpm playwright test
   ```

2. **Run a Specific Test**:

   ```bash
   pnpm playwright test e2e-tests/playlist-management.spec.ts
   ```

3. **View Test Report**:
   ```bash
   pnpm playwright show-report
   ```

### Best Practices for Playwright

- Use realistic test data to simulate real-world scenarios.
- Run tests in a clean environment to avoid side effects.
- Use Playwright's tracing and debugging tools to identify and fix issues quickly.

By integrating Playwright into the testing strategy, SongShare-2 can ensure robust and reliable end-to-end testing for critical user flows.

## Testing Expo.dev Projects

Expo.dev projects require specific testing strategies to ensure reliability across platforms. Below are best practices for testing Expo.dev applications:

### 1. Use Expo's Testing Library

- Install the necessary dependencies:
  ```bash
  pnpm add -D @testing-library/react-native jest-expo
  ```
- Use `jest-expo` for Jest configuration, as it is tailored for Expo projects.

### 2. Mock Native Modules

- Mock native modules that are not available in the testing environment. For example:
  ```typescript
  jest.mock("expo-constants", () => ({
    manifest: {
      extra: {
        apiUrl: "https://api.example.com",
      },
    },
  }));
  ```
- Mock other Expo modules like `expo-location`, `expo-camera`, or `expo-permissions` as needed.

### 3. Test on Multiple Platforms

- Ensure your tests cover both iOS and Android platforms, as there may be platform-specific behaviors.
- Use `Platform.OS` in your tests to simulate platform-specific logic.

### 4. Snapshot Testing

- Use snapshot testing for UI components to ensure consistent rendering across updates:

  ```typescript
  import { render } from "@testing-library/react-native";
  import MyComponent from "../MyComponent";

  test("renders correctly", () => {
    const { toJSON } = render(<MyComponent />);
    expect(toJSON()).toMatchSnapshot();
  });
  ```

### 5. End-to-End Testing with Playwright

- Use Playwright for E2E testing to simulate real user interactions.
- For Expo projects, ensure the app is built in development mode for testing:
  ```bash
  expo build:android --type apk
  expo build:ios --type simulator
  ```

### 6. Handle Asynchronous Code

- Use `async/await` to handle asynchronous operations in your tests.
- Use `waitFor` from React Native Testing Library to wait for UI updates:

  ```typescript
  import { render, waitFor } from "@testing-library/react-native";

  test("fetches and displays data", async () => {
    const { getByText } = render(<MyComponent />);
    await waitFor(() => expect(getByText("Data Loaded")).toBeTruthy());
  });
  ```

### 7. Environment-Specific Configurations

- Use `.env` files or Expo's `app.config.js` to manage environment-specific configurations.
- Mock these configurations in your tests to simulate different environments.

### 8. Testing Push Notifications

- Use Expo's push notification testing tools to simulate notifications in development.
- Mock the `expo-notifications` module in your tests.

### 9. Code Coverage

- Use Jest's code coverage tools to ensure your tests cover critical parts of the codebase:
  ```bash
  pnpm test --coverage
  ```

### 10. CI/CD Integration

- Integrate your tests into a CI/CD pipeline to run them automatically on every commit.
- Use Expo's managed workflow to build and test your app in CI environments.

By following these best practices, you can ensure that your Expo.dev project is thoroughly tested and reliable across all supported platforms.

## Conclusion

By following these best practices, we can ensure that the SongShare-2 application remains robust, reliable, and maintainable. Testing is an ongoing process, and the team should continuously strive to improve test quality and coverage.
