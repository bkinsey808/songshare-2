# Steps

This file contains the steps for the project. It is to be used by Copilot to build the app in smaller, verifiable, and deployable chunks. Always refer to the `docs/TYPESCRIPT_REACT_BEST_PRACTICES.md` for guidance on TypeScript and React best practices.

## Step 1: Scaffold the Project

- Initialize a new Expo.dev project.
- Use the `nativewind` library for styling.
- Ensure no style attributes are used in the initial setup.

## Step 2: setup prettier and eslint files

- Install `prettier` and `eslint` as dev dependencies.
- base it off of the old-project
- remove anything related to next.js

## Step 3: Set Up Project Structure

- Create a `src` directory.
- Add subdirectories for `components`, `features`, `lib`, and `app`.

## Step 3.1: Implement Sections

### Technical Requirements
- Implement state management using Zustand with TypeScript:
  ```typescript
  type SectionState = {
    activeSection: string | null;
    setActiveSection: (sectionId: string | null) => void;
  }
  ```
- Create reusable Section component with props:
  ```typescript
  type SectionProps = {
    id: string;
    title: string;
    children: React.ReactNode;
  }
  ```

### Implementation Details
- Follow the guidelines in `docs/SECTIONS.md` for component structure
- Use NativeWind classes for styling and animations
- Implement nested section support with parent-child relationships
- Add smooth animations for section transitions

### Acceptance Criteria
- Sections can be opened/closed via external state triggers
- Navigation between sections works with proper focus management
- Nested sections render correctly with proper hierarchy
- Animations are smooth and performant
- Components are accessible with proper ARIA attributes

## Step 4: Add Basic Navigation

- Install `react-navigation` and its dependencies.
- Set up a basic navigation structure with a `Home` screen.

## Step 5: Create a Home Screen

- Add a `Home` screen component in the `features/home-page` directory.
- Use a simple layout with placeholder text.

## Step 6: Implement State Management

### Technical Requirements
- Use Zustand for state management with TypeScript
- Implement modular state slices:
  ```typescript
  type AppState = {
    // Theme slice
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    
    // Settings slice
    settings: {
      notifications: boolean;
      autoplay: boolean;
    };
    updateSettings: (settings: Partial<Settings>) => void;
    
    // User slice
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
  }
  ```

### Implementation Details
- Configure AsyncStorage persistence for theme and settings
- Use selective state access to prevent unnecessary re-renders
- Enable devtools only in development mode
- Follow patterns in `docs/STATE_MANAGEMENT_BEST_PRACTICE.md`

### Data Flow Patterns
- Components should only access required state slices
- State updates must be performed through defined actions
- Use computed selectors for derived state
- Implement optimistic updates for better UX

## Step 6.1: Optimize State Management

- Refer to `docs/OPTIMISTIC_UI.md` and `docs/OFFLINE_MUTATIONS.md` for performance optimization strategies.
- Implement optimistic UI updates and offline mutation handling where applicable.

## Step 7: Add Authentication

- Set up Firebase authentication.
- Create a login screen and integrate Firebase authentication.

## Step 7.1: Create a Registration Page

### Technical Requirements
- Form Schema:
  ```typescript
  type RegistrationForm = {
    username: string;     // min length: 3
    acceptTerms: boolean; // must be true
  }
  ```

### Implementation Details
- Create Registration component in `features/auth` directory
- Implement form validation using the RegistrationSchema
- Add username uniqueness check against database
- Handle form submission and user creation
- Set up automatic login post-registration

### Acceptance Criteria
- Form validates all required fields with proper error messages
- Username uniqueness is verified before submission
- Terms acceptance is required
- Successful registration creates user document
- User is automatically logged in after registration
- Session cookie is properly set
- UI follows project's design system

## Step 7.2: Add Full-Screen Mode

### Technical Requirements
- Hook Interface:
  ```typescript
  type FullScreenHook = {
    isFullScreen: boolean;
    enterFullScreen: () => void;
    exitFullScreen: () => void;
  }
  ```

### Implementation Details
- Create useFullScreen custom hook
- Implement FullScreenToggle component
- Add keyboard shortcuts for full-screen toggle
- Support browser's Fullscreen API

### Acceptance Criteria
- Full-screen toggle works across major browsers
- Keyboard shortcuts (e.g., F11) are supported
- UI provides clear feedback for full-screen state
- Component is accessible via keyboard and screen readers
- Dark mode is supported in full-screen
- Smooth transitions between modes

## Step 8: Configure Firestore

- Set up Firestore for data storage.
- Add basic Firestore rules for security.

## Step 8.1: Enhance Firestore Security

- Follow the security best practices outlined in `docs/FIRESTORE.md`.
- Audit Firestore rules to ensure data protection and access control.

## Step 9: Add Styling

- Use `nativewind` to style the `Home` and `Login` screens.
- Ensure consistent design patterns are followed.

## Step 9.1: Follow Styling Best Practices

- Refer to `docs/STYLING.md` for consistent design patterns and styling guidelines.
- Ensure all components adhere to the project's styling standards.

## Step 10: Transition from Expo Go to Development Mode

- Install the Expo Development Client.
- Configure the project to use a custom development client.
- Build and test the app in Development Mode to ensure compatibility with custom native modules.
- Update the `docs/SETUP_AND_INSTALLATION.md` with instructions for running the app in Development Mode.

## Step 11: Write Tests

- Add unit tests for the `Home` and `Login` screens.
- Ensure tests cover basic functionality and edge cases.

## Step 11.1: Expand Testing Coverage

- Follow the testing strategies outlined in `docs/TESTING.md`.
- Add integration and end-to-end tests for critical features.
- Ensure tests cover edge cases and accessibility requirements.

## Step 12: Prepare for Deployment

- Configure the app for deployment to Expo Go.
- Test the app on both Android and iOS devices.

## Step 13: Deploy the App

- Deploy the app to Expo.dev.
- Share the project link for testing and feedback.

## Step 14: Set Up Storybook

- Install Storybook for React Native.
- Configure Storybook to work with the Expo project.
- Create a `.storybook` directory and add the necessary configuration files.
- Add a sample story for a UI component in the `components/ui` directory.
- Verify that Storybook runs correctly and displays the sample story.

## Step 14.1: Link Storybook Documentation

- Update `docs/STORYBOOK.md` with any new components added to Storybook.
- Ensure Storybook is configured to reflect the latest project structure.

## Step 15: Set Up Playwright

- Install Playwright for end-to-end testing.
- Configure Playwright to work with the Expo project.
- Create a `tests` directory at the root of the project.
- Add a sample Playwright test for the `Home` screen.
- Verify that Playwright runs correctly and the sample test passes.

## Step 15.1: Document Dependencies

- Update `docs/DEPENDENCIES.md` with any new dependencies added during the setup.
- Provide a brief description of each dependency and its purpose.

## Step 16: Implement Wake Lock

- Add wake lock functionality to keep the screen awake when needed.
- Ensure proper cleanup when the app is backgrounded or closed.

## Step 17: Add Time Zone Support

- Implement time zone handling for proper date/time display.
- Add utilities for time zone conversions and formatting.

## Step 18: Add Music Integration

- Implement music playback functionality.
- Add controls for play, pause, and volume management.
- Ensure proper audio session handling.

## Step 19: Add Math Utilities

- Implement mathematical calculation utilities.
- Add support for complex calculations and data processing.

## Step 20: Implement Grid System

- Add a flexible grid system for layout management.
- Ensure responsive behavior across different screen sizes.

## Step 21: Add Path Management

- Implement path handling for navigation.
- Add utilities for path manipulation and validation.

## Step 22: Implement Following System

- Add user following/follower functionality.
- Implement follow/unfollow actions and status tracking.

## Step 23: Add App Store Integration

- Implement app store related functionality.
- Add utilities for app store interactions and updates.

## Step 24: Implement Design System

- Create a comprehensive design system.
- Add components and utilities for consistent design patterns.

## Step 25: Add Modal System

- Implement modal dialog functionality.
- Add support for different modal types and animations.

## Step 26: Implement Form Handling

- Add form management and validation utilities.
- Implement reusable form components and error handling.

## Step 27: Add Dashboard

- Implement user dashboard functionality.
- Add widgets and components for data visualization.
