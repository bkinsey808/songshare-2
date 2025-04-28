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
