# API Documentation

This document outlines the necessary Node.js endpoints for authentication and other features in SongShare-2.

## Authentication Endpoints

### POST /api/auth/signin

- **Description**: Authenticates a user and returns a session token.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string"
    }
  }
  ```

### POST /api/auth/signout

- **Description**: Logs out the current user by invalidating the session token.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**: None
- **Response**:
  ```json
  {
    "message": "Successfully signed out."
  }
  ```

### POST /api/auth/register

- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "id": "string",
      "username": "string"
    }
  }
  ```

## Backup Endpoints

### POST /api/backup

- **Description**: Initiates a manual backup of the database.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**: None
- **Response**:
  ```json
  {
    "message": "Backup initiated successfully."
  }
  ```

### POST /api/restore

- **Description**: Restores the database from a backup.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "backupId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Restore initiated successfully."
  }
  ```

## User Management Endpoints

### GET /api/users/:id

- **Description**: Retrieves user details by ID.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "username": "string",
    "email": "string"
  }
  ```

## Additional Endpoints for Actions

### POST /api/account/delete

- **Description**: Deletes a user account.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "userId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Account deleted successfully."
  }
  ```

### POST /api/playlist/active-set

- **Description**: Sets the active playlist.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "playlistId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Active playlist set successfully."
  }
  ```

### POST /api/song/save

- **Description**: Saves a song to the database.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "songData": {
      "title": "string",
      "artist": "string",
      "album": "string"
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "Song saved successfully."
  }
  ```

### POST /api/user/active-set

- **Description**: Sets the active user.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "userId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Active user set successfully."
  }
  ```

### POST /api/user/public-doc-get

- **Description**: Retrieves a public document for a user.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <session_token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "username": "string"
  }
  ```
- **Response**:
  ```json
  {
    "document": {
      "id": "string",
      "content": "string"
    }
  }
  ```
