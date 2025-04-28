# Environment Variables

This document outlines the necessary environment variables for the SongShare-2 project. The variables are split into two categories: **Client-Side** and **Server-Side**. Ensure these variables are properly configured in your environment before running the application.

## Client-Side Environment Variables

These variables are exposed to the client and should not contain sensitive information.

### Firebase Configuration

- `FIREBASE_API_KEY`: The API key for Firebase.
- `FIREBASE_AUTH_DOMAIN`: The authentication domain for Firebase.
- `FIREBASE_PROJECT_ID`: The Firebase project ID.
- `FIREBASE_STORAGE_BUCKET`: The storage bucket for Firebase.
- `FIREBASE_MESSAGING_SENDER_ID`: The messaging sender ID for Firebase.
- `FIREBASE_APP_ID`: The Firebase app ID.
- `FIREBASE_MEASUREMENT_ID`: The measurement ID for Firebase Analytics (optional).

### Application Branding

- `DOMAIN`: The domain name of the application.
- `BRAND`: The short brand name of the application.
- `BRAND_LONG`: The full brand name of the application.
- `BRAND_DESC`: A short description of the application.

### Analytics

- `GOOGLE_ANALYTICS_MEASUREMENT_ID`: Google Analytics tracking ID (optional).

## Server-Side Environment Variables

These variables are used only on the server and should be kept secure.

### Authentication

- `SESSION_PRIVATE_KEY`: Private key used for session management.
- `JWT_SECRET`: Secret key used for signing JSON Web Tokens.
- `SESSION_COOKIE_SECRET`: Secret key for session cookies.

### API Configuration

- `API_BASE_URL`: The base URL for the API endpoints.

### Backup and Restore

- `BACKUP_BUCKET_NAME`: The name of the bucket used for storing backups.
- `BACKUP_REGION`: The region of the backup bucket.

### Firestore Configuration

- `FIRESTORE_EMULATOR_HOST`: Host for the Firestore emulator (for local development).

### Miscellaneous

- `NODE_ENV`: The environment mode (`development`, `production`, etc.).
- `PORT`: The port on which the application runs.
- `SKIP_SERVER_PARSE`: Boolean flag to skip server-side parsing (default: `false`).

### Notes

- **Server-Side Variables**: These variables should be stored securely and never exposed to the client.
- Use a `.env` file or a secret management tool to manage these variables.
