# QR Code Implementation

This document outlines the QR code functionality in the SongShare-2 project, focusing on event following and social sharing features.

## Installation

```bash
npx expo install react-qr-code
```

## QR Code Types

### 1. Event QR Codes

- Used for quick event following
- Contains event ID and basic metadata
- Scannable by any QR code reader
- Links to event details in the app

### 2. User Profile QR Codes

- Used for connecting users
- Contains user ID and basic profile info
- Enables quick friend adding
- Facilitates sharing of songs and playlists

### 3. Song/Playlist QR Codes

- Used for sharing specific songs or playlists
- Contains song/playlist ID and metadata
- Allows quick access to shared content
- Supports offline sharing

## Implementation

### Event QR Code Generation

```typescript
import QRCode from "react-qr-code";

type EventQRData = {
  eventId: string;
  eventName: string;
  timestamp: number;
  type: "event";
};

function EventQRCode({
  eventId,
  eventName,
}: {
  eventId: string;
  eventName: string;
}) {
  const qrData: EventQRData = {
    eventId,
    eventName,
    timestamp: Date.now(),
    type: "event",
  };

  return (
    <QRCode
      value={JSON.stringify(qrData)}
      size={256}
      level="H"
      includeMargin={true}
    />
  );
}
```

### User Profile QR Code Generation

```typescript
type UserQRData = {
  userId: string;
  username: string;
  displayName: string;
  type: "user";
};

function UserQRCode({ user }: { user: User }) {
  const qrData: UserQRData = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    type: "user",
  };

  return (
    <QRCode
      value={JSON.stringify(qrData)}
      size={256}
      level="H"
      includeMargin={true}
    />
  );
}
```

### QR Code Scanning

```typescript
import { BarCodeScanner } from "expo-barcode-scanner";

function QRScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    try {
      const qrData = JSON.parse(data);

      switch (qrData.type) {
        case "event":
          // Handle event following
          break;
        case "user":
          // Handle user connection
          break;
        case "song":
          // Handle song sharing
          break;
        case "playlist":
          // Handle playlist sharing
          break;
      }
    } catch (error) {
      console.error("Invalid QR code data");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  );
}
```

## Security Considerations

1. **Data Validation**

   - Validate QR code data before processing
   - Check timestamps for expiration
   - Verify user permissions

2. **Privacy**

   - Only include necessary data in QR codes
   - Use temporary tokens for sensitive operations
   - Implement rate limiting for scans

3. **Error Handling**
   - Handle invalid QR codes gracefully
   - Provide clear error messages
   - Log scanning attempts

## Best Practices

1. **QR Code Design**

   - Use appropriate size for the context
   - Include error correction
   - Add branding elements
   - Ensure good contrast

2. **User Experience**

   - Provide clear scanning instructions
   - Show preview of scanned data
   - Allow manual entry as fallback
   - Support both light and dark modes

3. **Performance**
   - Optimize QR code generation
   - Cache generated codes
   - Use appropriate error correction level
   - Implement progressive loading

## Testing

1. **QR Code Generation**

   - Test different data sizes
   - Verify error correction
   - Check visual quality
   - Test different themes

2. **QR Code Scanning**

   - Test with various devices
   - Test in different lighting conditions
   - Verify data parsing
   - Test error handling

3. **Integration Tests**
   - Test event following flow
   - Test user connection flow
   - Test song/playlist sharing
   - Test offline functionality

## Related Documentation

- [Event Management](../EVENTS.md)
- [User Management](../USER_MANAGEMENT.md)
- [Playlist Management](../PLAYLISTS.md)
- [Security Best Practices](../SECURITY.md)
