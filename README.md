# SongShare-2

This README has been split into multiple focused documents for better readability and maintainability. Below is an overview of the new structure:

## Core Documentation

1. **[Project Overview](docs/PROJECT_OVERVIEW.md)**: High-level details about the app's purpose, features, and architecture.
2. **[Setup and Installation](docs/SETUP_AND_INSTALLATION.md)**: Steps to set up the project locally and deploy it.
3. **[Architecture](docs/ARCHITECTURE.md)**: Project-wide architecture guidelines including no-barrel-files policy.
4. **[Feature-Based Code Structure](docs/FEATURE_BASED_CODE_STRUCTURE.md)**: Best practices for organizing code by features.
5. **[TypeScript React Best Practices](docs/TYPESCRIPT_REACT_BEST_PRACTICES.md)**: Best practices for using TypeScript with React.
6. **[State Management Best Practices](docs/STATE_MANAGEMENT_BEST_PRACTICE.md)**: Guidelines for managing application state.

## Development Tools and Libraries

16. **[Libraries and Dependencies](docs/LIBRARIES.md)**: Detailed information about key libraries, including drag and drop functionality and search capabilities.
17. **[Dependencies](docs/DEPENDENCIES.md)**: Information about project dependencies.
18. **[Styling Best Practices](docs/STYLING.md)**: Guidelines for styling the application.
19. **[Color System](docs/COLORS.md)**: Comprehensive guide to the project's color system, including light and dark mode values.
20. **[Storybook for UI Components](docs/STORYBOOK.md)**: Instructions for setting up and using Storybook in the project.
21. **[Testing](docs/TESTING.md)**: Testing strategies and practices.
22. **[JSDoc Best Practices](docs/JSDOC_BEST_PRACTICES.md)**: Comprehensive guidelines for JSDoc documentation standards across the project.
23. **[Copilot Instructions](.github/copilot-instructions.md)**: Guidelines for using Copilot effectively.
24. **[Prettier Configuration](docs/PRETTIER.md)**: Code formatting and import sorting configuration.
25. **[Form Handling and Validation](docs/FORMS.md)**: Guidelines for form implementation, including reset functionality and label positioning.
26. **[Android Build Compatibility](docs/ANDROID_BUILD_COMPATIBILITY.md)**: All customizations required to build the Android app with Capacitor 4.x and Java 11.
27. **[Install APK from WSL2](docs/INSTALL_APK_FROM_WSL2.md)**: Step-by-step guide for installing and running your APK on a physical Android device from WSL2.

## Backend and Data Management

28. **[API Documentation](docs/API.md)**: Details about the necessary Node.js endpoints for authentication, backup, and user management.
29. **[Firestore Collections and Security Rules](docs/FIRESTORE.md)**: Database structure and security configuration.
30. **[Database Backup and Restore](docs/DATABASE_BACKUP_AND_RESTORE.md)**: Information about backup and restore functionality.
31. **[Offline Mutations Strategy](./docs/OFFLINE_MUTATIONS.md)**: Strategy for handling offline mutations.
32. **[Optimistic UI and Firestore Subscriptions](docs/OPTIMISTIC_UI.md)**: Explanation of the optimistic UI approach and Firestore integration.

## User Interface and Experience

33. **[Sections Implementation Guide](docs/SECTIONS.md)**: Learn how to implement and manage sections in the project.
34. **[Projector Mode](docs/PROJECTOR_MODE.md)**: Details about the projector mode feature.
35. **[Full Screen Mode](docs/FULL_SCREEN_MODE.md)**: Learn how to implement and use full-screen mode in the app.
36. **[WakeLock Implementation](docs/WAKELOCK.md)**: Learn how to implement WakeLock to prevent the device screen from dimming or locking while the app is in use.
37. **[QR Code Implementation](docs/QR_CODES.md)**: Learn how to implement QR codes for event following and social sharing.
38. **[Progressive Web App Support](docs/PWA.md)**: Implementation details for PWA features including offline access and installability.

## Authentication and User Management

39. **[Authentication](docs/AUTHENTICATION.md)**: Details about authentication methods and configuration.
40. **[Multi-Provider Authentication](docs/MULTI_PROVIDER_AUTH.md)**: Guide for extending authentication to support multiple OAuth providers (Google, Facebook, GitHub, etc.).
41. **[Apple Sign-In Setup](docs/APPLE_SIGN_IN.md)**: Complete guide for implementing Apple Sign-In with Firebase and Cloudflare Worker proxy.
42. **[Microsoft Sign-In Setup](docs/MICROSOFT_SIGN_IN.md)**: Complete guide for implementing Microsoft Sign-In with Azure AD and Firebase.
43. **[Registration Flow](docs/REGISTRATION.md)**: Details about the registration process and required fields.

## Deployment and Monitoring

44. **[Deploying](docs/DEPLOYING.md)**: Instructions for deploying the application.
45. **[Cloudflare Deployment Guide](docs/CLOUDFLARE.md)**: Instructions for deploying to Cloudflare.
46. **[Google Analytics and Tag Manager](docs/ANALYTICS.md)**: Steps to integrate and configure analytics tools.
47. **[Free Tier Analysis](docs/FREE_TIER.md)**: Evaluation of the project's scalability within free-tier limits.

## Project Management

48. **[Environment Variables](docs/ENV.md)**: Configuration and environment setup.
49. **[Steps to Build the Project](.github/steps.md)**: Step-by-step guide for building the project.
50. **[Contributing](docs/CONTRIBUTING.md)**: Guidelines for contributing to the project.
51. **[Documentation Checklist](docs/DOCUMENTATION_CHECKLIST.md)**: Guidelines for creating and maintaining project documentation.
52. **License**: This project is proprietary. All rights reserved.

For a full list of documentation, explore the `docs/` directory.
