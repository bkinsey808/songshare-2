import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function RootLayout() {
  // Initialize any web-specific configuration here
  useEffect(() => {
    if (Platform.OS === "web") {
      // This helps with PWA initialization on web platform
      // Additional web-specific initialization can go here
      console.log("Web platform initialized");
    }
  }, []);

  return <Stack />;
}

// Ensure proper error handling
export function ErrorBoundary(props: { error: Error }) {
  return (
    <div style={{ padding: 16 }}>
      <h1>Error</h1>
      <p>{props.error.message}</p>
    </div>
  );
}
