# Prettier Configuration

This document outlines the Prettier configuration and import sorting setup for the SongShare-2 project.

## Installation

```bash
npx expo install prettier @trivago/prettier-plugin-sort-imports prettier-plugin-tailwindcss
```

## Configuration

### Base Configuration

Create a `prettier.config.js` file in the root directory:

```javascript
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "lf",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
```

### Import Sorting Configuration

The import sorting plugin (`@trivago/prettier-plugin-sort-imports`) can be configured in the `prettier.config.js`:

```javascript
module.exports = {
  // ... other Prettier options ...
  importOrder: [
    "^react$",
    "^react-native$",
    "^@react-navigation/(.*)$",
    "^@dnd-kit/(.*)$",
    "^@/components/(.*)$",
    "^@/features/(.*)$",
    "^@/lib/(.*)$",
    "^@/app/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
```

## Import Order Explanation

The import order is structured as follows:

1. **React and React Native Core**

   - `react`
   - `react-native`

2. **Third-party Libraries**

   - Navigation libraries
   - UI libraries
   - Utility libraries

3. **Internal Modules**

   - Components
   - Features
   - Library utilities
   - App-specific code

4. **Relative Imports**
   - Local files

## VSCode Integration

Add the following to your VSCode settings (`settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## ESLint Integration

Ensure ESLint and Prettier work together by adding the following to your ESLint config:

```javascript
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier", // Make sure this is last
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
```

## Git Hooks

To ensure consistent formatting, add a pre-commit hook using Husky:

```bash
npx expo install husky lint-staged
```

Add to `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install",
    "format": "prettier --write ."
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"]
  }
}
```

## Common Issues and Solutions

### 1. Import Sorting Conflicts

If you encounter issues with import sorting, ensure:

- The import order is correctly specified
- The parser plugins are properly configured
- There are no conflicting ESLint rules

### 2. TypeScript Path Aliases

For TypeScript path aliases to work with import sorting:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 3. Performance Issues

For large projects, you might want to:

- Exclude certain directories from formatting
- Use `.prettierignore`
- Configure specific file patterns

## Best Practices

1. **Consistent Configuration**

   - Share the same Prettier config across the team
   - Use a shared ESLint config
   - Document any project-specific rules

2. **Import Organization**

   - Group imports logically
   - Separate third-party from internal imports
   - Use absolute imports for internal modules

3. **Formatting Rules**

   - Keep line length reasonable (100 characters)
   - Use consistent quote style
   - Maintain consistent spacing

4. **Automation**
   - Use pre-commit hooks
   - Configure CI/CD to check formatting
   - Use editor integration

## Related Documentation

- [TypeScript and React Best Practices](../TYPESCRIPT_REACT_BEST_PRACTICES.md)
- [ESLint Configuration](../.eslintrc.js)
- [Project Structure](../FEATURE_BASED_CODE_STRUCTURE.md)
