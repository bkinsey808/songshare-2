# Registration Flow

This document outlines the registration flow and the fields required for user registration.

## Registration Fields

1. **Username**

   - **Type**: String
   - **Validation**:
     - Required
     - Minimum length: 3 characters
     - Error message: "Username is required" or "Username must be at least 3 characters"

2. **Accept Terms and Conditions**
   - **Type**: Boolean
   - **Validation**:
     - Must be `true`
     - Error message: "You must accept the terms and conditions"

## Registration Flow

1. The user fills out the registration form with the following fields:

   - Username
   - Accept Terms and Conditions

2. The form data is validated using the `RegistrationSchema`.

3. If validation passes:

   - The username is checked for uniqueness in the database.
   - A new user document is created in the database with the provided details.

4. If validation fails:

   - Appropriate error messages are displayed to the user.

5. Upon successful registration:
   - The user is logged in automatically.
   - A session cookie is set for the user.

## Notes

- Ensure that the registration form adheres to the validation rules outlined above.
- Use the `registerFormFieldKey` constants to map form fields to their respective keys in the schema.
