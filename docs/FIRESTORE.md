# Firestore Collections and Security Rules

## Collections and Fields

### Users

- **Fields**:
  - `id` (string, unique identifier)
  - `username` (string, unique)
  - `email` (string, unique)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### Playlists

- **Fields**:
  - `id` (string, unique identifier)
  - `name` (string)
  - `userId` (string, reference to Users)
  - `songs` (array of song IDs)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### Songs

- **Fields**:
  - `id` (string, unique identifier)
  - `title` (string)
  - `artist` (string)
  - `album` (string)
  - `duration` (number, in seconds)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### Backups

- **Fields**:
  - `id` (string, unique identifier)
  - `userId` (string, reference to Users)
  - `backupData` (object, contains backup details)
  - `createdAt` (timestamp)

### Logs

- **Fields**:
  - `id` (string, unique identifier)
  - `linkedId` (string, reference to a Playlist or Song)
  - `type` (string, either "playlist" or "song")
  - `isPublic` (boolean, indicates if the log is public or private)
  - `duration` (number, in seconds, optional)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

## Security Rules

### General Principles

1. **Server-Side Operations**: All write operations (create, update, delete) should only be allowed from server endpoints. Clients should not have direct write access to Firestore.
2. **Read Access**: Clients can only subscribe to specific documents or collections they are authorized to access.
3. **Authentication**: Ensure all requests are authenticated using Firebase Authentication.

### Creating Secure Rules to Restrict Client Access

To ensure that clients can only access Firestore data securely and as intended, follow these steps:

1. **Restrict Write Access**:

   - Deny all write operations from the client by default.
   - Only allow writes through server-side operations using the Firebase Admin SDK.

2. **Restrict Read Access**:

   - Allow clients to read only the data they are authorized to access.
   - Use `request.auth` to verify that the user is authenticated and authorized to access the specific document or collection.

3. **Use Custom Claims**:

   - Assign custom claims to users during authentication to manage roles and permissions.
   - Use these claims in your security rules to enforce role-based access control.

4. **Validate Data**:

   - Use Firestore rules to validate the structure and content of data being read or written.
   - For example, ensure that a `userId` field in a document matches the authenticated user's ID.

5. **Minimize Data Exposure**:
   - Only expose the fields necessary for the client to function.
   - Avoid exposing sensitive information like email addresses or internal IDs.

### Updated Example Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // No direct writes from the client
    }

    // Playlists collection
    match /playlists/{playlistId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if false; // No direct writes from the client
    }

    // Songs collection
    match /songs/{songId} {
      allow read: if request.auth != null;
      allow write: if false; // No direct writes from the client
    }

    // Backups collection
    match /backups/{backupId} {
      allow read: if false; // No direct reads from the client
      allow write: if false; // No direct writes from the client
    }
  }
}
```

### Implementation Notes

- **Server-Side Enforcement**: Use Firebase Admin SDK on the server to perform all write operations. This ensures that only authorized server endpoints can modify Firestore data.
- **Client Subscriptions**: Clients can subscribe to specific documents or collections using Firestore's real-time listeners, but their access should be restricted by the security rules.
- **Testing**: Regularly test your security rules using Firebase's built-in rule simulator to ensure they work as intended.

### Additional Recommendations

- **Minimize Data Exposure**: Only expose the fields necessary for the client to function. For example, avoid exposing sensitive user information like email addresses.
- **Logging**: Implement logging for all server-side operations to monitor and audit changes to Firestore data.
- **Rate Limiting**: Use Firebase's built-in rate-limiting features to prevent abuse of your Firestore database.

### Additional Best Practices

1. **Server-Side Enforcement**:

   - Use the Firebase Admin SDK on the server to perform all write operations. This ensures that only authorized server endpoints can modify Firestore data.

2. **Testing Security Rules**:

   - Regularly test your security rules using Firebase's built-in rule simulator to ensure they work as intended.
   - Write automated tests to validate your security rules against various scenarios.

3. **Rate Limiting**:

   - Use Firebase's built-in rate-limiting features to prevent abuse of your Firestore database.

4. **Logging and Monitoring**:

   - Implement logging for all server-side operations to monitor and audit changes to Firestore data.
   - Use Firebase's monitoring tools to track database usage and identify potential security issues.

5. **Data Encryption**:

   - Ensure that all data is encrypted in transit and at rest. Firebase handles this by default, but verify compliance with your security requirements.

6. **Principle of Least Privilege**:
   - Grant the minimum permissions necessary for each user or role to perform their tasks.
   - Regularly review and update permissions to ensure they align with current requirements.

## AI Interaction Guidelines

These guidelines describe how AI tools (like code completion assistants) should interact with this Firestore database.

### Data Integrity

*   **New Songs:** When adding a new song to the `songs` collection, always include the `title`, `artist`, and `duration` fields. The `duration` should be a number (in seconds).
*   **Playlists:** When adding a new playlist, it should be associated with a `userId` field that references a user in the `users` collection.
*   **Song Logs:** When creating song logs, `linkedId` should refer to a valid ID in the `playlist` or `song` collection. The `type` field must be either "playlist" or "song".
*   **Backups:** Do not modify the backups collection directly. Backups are created by admin actions only.

### Security

*   **No Direct Client Writes:** Never generate code that allows clients to write directly to Firestore. All writes must be done server-side using the Firebase Admin SDK.
*   **User Authorization:** When modifying a playlist, only allow changes if the authenticated user ID matches the `userId` of the playlist.
*   **No data exposure:** Never suggest adding code that exposes sensitive user information, like email address.
*   **Error Handling:** If a Firestore operation fails due to a security rule, do not retry it automatically. Report the error to the developer and provide details about the rule violation.
* **Never**: Never suggest using wildcards to access the data.
* **Admin**: Suggest using admin access when the context is admin.

### Best Practices for AI

*   **Follow Naming:** Adhere to the exact naming conventions used for collections and fields in this document.
*   **Security First:** When generating code, always consider security rules. Avoid suggesting code that could violate security.
*   **Validation:** Before suggesting code that writes to Firestore, consider what validation rules are in place and ensure the data will conform to them.
*   **Server side:** When in doubt, suggest server side changes.
