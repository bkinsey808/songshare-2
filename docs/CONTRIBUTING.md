# Contributing to SongShare-2

We welcome contributions to SongShare-2! Whether you're fixing bugs, adding new features, or improving documentation, your help is greatly appreciated.

## Getting Started

1. **Fork the Repository**:

   - Create a fork of the SongShare-2 repository on GitHub.

2. **Clone Your Fork**:

   ```bash
   git clone <your-fork-url>
   ```

3. **Set Up the Project**:

   - Follow the [Setup and Installation](SETUP_AND_INSTALLATION.md) guide to set up the project locally.

4. **Create a Branch**:
   - Create a new branch for your changes:
     ```bash
     git checkout -b feature/your-feature-name
     ```

## Making Changes

1. **Code Style**:

   - Follow the existing code style and conventions.
   - Use Prettier and ESLint to format and lint your code.

2. **Write Tests**:

   - Add tests for your changes to ensure they work as expected.

3. **Commit Your Changes**:
   - Write clear and concise commit messages:
     ```bash
     git commit -m "Add feature: your-feature-name"
     ```

## Submitting Your Changes

1. **Push Your Branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**:

   - Open a pull request on GitHub and provide a detailed description of your changes.

3. **Address Feedback**:
   - Be responsive to feedback from maintainers and make necessary changes.

## Code of Conduct

By contributing to SongShare-2, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

# Copilot Instructions

Copilot should carefully consider the documentation in the `docs/` folder for every change. This includes reviewing relevant files to ensure consistency and adherence to the project's guidelines.

## Additional Guidelines

1. **Code Style Guidelines**: Follow the project's coding standards, including naming conventions, formatting rules, and preferred libraries or frameworks.

2. **Testing Requirements**: Ensure all changes include appropriate unit tests, integration tests, or end-to-end tests, as outlined in `docs/TESTING.md`.

3. **Documentation Updates**: Accompany any new features or changes with updates to the relevant documentation in the `docs/` folder.

4. **Dependency Management**: Add new dependencies only if necessary and document them in `docs/DEPENDENCIES.md`.

5. **Security Considerations**: Adhere to security best practices, especially when working with sensitive data, Firestore rules, or authentication mechanisms, as described in `docs/FIRESTORE.md` and `docs/AUTHENTICATION.md`.

6. **Performance Optimization**: Review `docs/OPTIMISTIC_UI.md` and `docs/OFFLINE_MUTATIONS.md` for performance-related best practices.

7. **Feature-Based Structure**: Use the feature-based code structure outlined in `docs/FEATURE_BASED_CODE_STRUCTURE.md`.

8. **Commit Messages**: Write clear and descriptive commit messages to document changes effectively.

9. **TypeScript Only**: All code in this project must be written in TypeScript. Avoid using JavaScript files. Ensure all `.ts` and `.tsx` files adhere to TypeScript best practices.

## Reminder

This is an Expo.dev project, not a Next.js project. Ensure all code suggestions and changes are appropriate for Expo.dev.
