# Setup and Installation

## Prerequisites

- Node.js (v16 or later)
- pnpm (v7 or later)
- Expo CLI (latest version)

## Installation

1. Install Expo CLI globally:

   ```bash
   npm install -g expo-cli
   ```

2. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

3. Navigate to the project directory:

   ```bash
   cd SongShare-2
   ```

4. Install dependencies:

   ```bash
   pnpm install
   ```

## Running the Project

To start the development server with Expo:

```bash
expo start
```

This will open the Expo Developer Tools in your browser. You can scan the QR code with the Expo Go app on your mobile device or run the app on an emulator.

## Building the Project

To build the project for production:

```bash
expo build
```

Follow the Expo documentation for detailed build instructions: [Expo Build](https://docs.expo.dev/build/introduction/).

## Testing

To run tests:

```bash
pnpm test
```

## Deployment

SongShare-2's web application and mobile apps are deployed using Expo's build and hosting services. This ensures high performance, scalability, and global availability.

### Steps for Deployment

1. **Web Application**:

   - Use Expo's `expo export:web` command to build the web version.
   - Deploy the output to a hosting service like Vercel or Netlify.

2. **Mobile Applications**:

   - Use Expo's `eas build` command to create builds for iOS and Android.
   - Submit the builds to the App Store and Play Store.

For detailed instructions, refer to the [Expo documentation](https://docs.expo.dev/).
