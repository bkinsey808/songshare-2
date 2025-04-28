# Authentication

SongShare-2 uses **Firebase Authentication** for user authentication, which integrates seamlessly with Firestore as the database. Firebase Auth provides a robust and scalable authentication solution that works well with modern web applications.

## Key Authentication Goal

On the web platform, the authentication flow is designed to avoid using any popups that could trigger browser popup blockers. All login and authentication processes are fully inline, ensuring a seamless user experience without interruptions.

## Supported Authentication Methods

- Google
- Apple
- Amazon
- Microsoft
- Meta
- Magic links sent to email addresses

Password-based authentication will not be supported.

## Steps to Configure Firebase Auth

1. **Set up a Firebase project**:

   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable Firebase Authentication from the Authentication section.
   - Note down the Firebase configuration details from the project settings.

2. **Install the Firebase client**:

   ```bash
   pnpm install firebase
   ```

3. **Configure Firebase in the project**:

   - Add the following environment variables:
     - `FIREBASE_API_KEY`
     - `FIREBASE_AUTH_DOMAIN`
     - `FIREBASE_PROJECT_ID`
     - `FIREBASE_STORAGE_BUCKET`
     - `FIREBASE_MESSAGING_SENDER_ID`
     - `FIREBASE_APP_ID`

4. **Initialize Firebase Auth in the project**:

   - Create a Firebase configuration file to initialize the Firebase app.
   - Set up the authentication methods in the Firebase console.

5. **Handle Deep Linking for OAuth**:

   - Configure deep linking in Expo by adding a `scheme` to the `app.json` or `app.config.js` file.
   - Use Expo's `Linking` API to handle redirects after authentication.

6. **Test the integration**:
   - Ensure that user sign-up, login, and session management work as expected.

## Session Management with HTTP-Only Cookies

To enhance security and simplify authorization, SongShare-2 uses HTTP-only session cookies. These cookies store a Firebase ID token that contains the payload necessary for authorization. The token includes the following information:

- **User Type**: Specifies the role of the user (e.g., admin, song leader, community member).
- **Subscription Level**: Indicates the user's subscription tier (e.g., free, premium).
- **Session Expiry**: Ensures the token is valid only for a limited duration.

### Benefits of HTTP-Only Cookies

- **Enhanced Security**: HTTP-only cookies are not accessible via JavaScript, reducing the risk of XSS attacks.
- **Simplified Authorization**: The token payload provides all the necessary information for backend services to authorize requests without additional database lookups.

### Implementation Steps

1. **Generate Firebase ID Tokens**:

   - Use Firebase Authentication to generate ID tokens after successful authentication.
   - These tokens can be customized with additional claims for user roles and subscription information.

2. **Set HTTP-Only Cookies**:

   - After successful authentication, set the Firebase ID token as an HTTP-only cookie in the user's browser.
   - Ensure the cookie is marked as `Secure` and `SameSite=Strict` to prevent CSRF attacks.

3. **Validate Tokens**:

   - On each request, validate the Firebase ID token from the session cookie.
   - Use Firebase Admin SDK on the server to verify the token's authenticity.

4. **Handle Token Refresh**:

   - Implement a mechanism to refresh tokens before they expire to maintain a seamless user experience.
   - Firebase tokens typically expire after 1 hour, so implement a refresh mechanism accordingly.

5. **Test the Integration**:
   - Verify that the session cookies are set correctly and cannot be accessed via JavaScript.
   - Ensure that the token payload is correctly parsed and used for authorization.

For more details on using Firebase Authentication, refer to the [Firebase Authentication documentation](https://firebase.google.com/docs/auth) and [Expo Linking documentation](https://docs.expo.dev/guides/linking/).
