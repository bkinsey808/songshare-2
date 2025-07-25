# Installing and Running APKs from WSL2 on a Physical Android Device

This guide explains how to install and run your built APK on a physical Android device when working in WSL2, without requiring admin rights or Android Studio on Windows.

## 1. Build the APK in WSL2

- Run your build command in WSL2:
  ```sh
  pnpm run android:build
  ```
- The APK will be generated at:
  ```
  /home/bkinsey/bkinsey808/songshare-2/vike-app/android/app/build/outputs/apk/debug/app-debug.apk
  ```

## 2. Access the APK from Windows

- Open Windows File Explorer.
- Navigate to the APK using the WSL2 network path:
  ```
  \\wsl$\Ubuntu\home\bkinsey\bkinsey808\songshare-2\vike-app\android\app\build\outputs\apk\debug\app-debug.apk
  ```
- Copy the APK to a convenient location on your Windows filesystem (e.g., Desktop).

## 3. Prepare Your Android Device

- Enable **Developer Options** on your device.
- Enable **USB Debugging** in Developer Options.
- Connect your device to your Windows machine via USB.
- On your device, accept any prompt to allow USB debugging from your computer.

## 4. Install Android Platform Tools (adb) on Windows

- Download the latest Platform Tools zip from:
  https://developer.android.com/studio/releases/platform-tools
- Extract the zip to a folder (e.g., `C:\Users\yourname\platform-tools`).
- Open a PowerShell or Command Prompt in that folder.

## 5. Verify Device Connection

- In PowerShell or Command Prompt, run:
  ```
  adb devices
  ```
- You should see your device listed. If not, check your cable, USB mode, and device prompts.

## 6. Install the APK

- Run the following command, replacing the path as needed:
  ```
  adb install "C:\Users\yourname\Desktop\app-debug.apk"
  ```
- You should see `Success` if the install worked.

## 7. Open the App

- Find the app icon on your device and launch it!

---

**Troubleshooting:**

- If your device does not appear, try a different cable or USB port, or check that USB Debugging is enabled.
- If you see `INSTALL_FAILED_VERSION_DOWNGRADE`, uninstall the previous version of the app from your device first.

**Last updated:** July 25, 2025
