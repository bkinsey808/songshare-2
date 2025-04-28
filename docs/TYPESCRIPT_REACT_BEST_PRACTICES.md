# TypeScript and React Best Practices

This document outlines best practices for using TypeScript and React in the SongShare-2 project.

---

## Type Definitions

1. **Prefer `type` over `interface`**:

   - Use `type` for all type definitions
   - Only use `interface` when extending or implementing is required
   - Example:

     ```typescript
     type User = {
       id: string;
       name: string;
       email: string;
     };

     type AuthState = {
       user: User | null;
       isAuthenticated: boolean;
     };
     ```

2. **Type Composition**:

   - Use union types for multiple possible types
   - Use intersection types for combining types
   - Example:

     ```typescript
     type Status = "loading" | "success" | "error";

     type WithLoading<T> = T & {
       status: Status;
     };
     ```

3. **Type Utilities**:
   - Use built-in type utilities when possible
   - Create custom type utilities for common patterns
   - Example:
     ```typescript
     type PartialUser = Partial<User>;
     type ReadonlyUser = Readonly<User>;
     ```

---

## General TypeScript Best Practices

1. **Use `readonly` for immutability**:

   - Mark properties as `readonly` to prevent accidental mutations.
   - Example:
     ```typescript
     type Config = {
       readonly apiUrl: string;
     };
     ```

2. **Avoid `any`**:

   - Use `unknown` or specific types instead of `any`.
   - Example:
     ```typescript
     function handleInput(input: unknown): void {
       if (typeof input === "string") {
         console.log(input.toUpperCase());
       }
     }
     ```

3. **Leverage Utility Types**:
   - Use built-in utility types like `Partial`, `Pick`, `Omit`, and `
