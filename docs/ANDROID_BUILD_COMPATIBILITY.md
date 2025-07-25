# Android Build Compatibility Customizations for Capacitor 4.x

This document lists all customizations required to build the Android app with Capacitor 4.x, Android Gradle Plugin 7.2.2, and Java 11.

## 1. Java Version

- Use **Java 11** for all Android builds.
- Set in `app/build.gradle`:
  ```groovy
  compileOptions {
      sourceCompatibility JavaVersion.VERSION_11
      targetCompatibility JavaVersion.VERSION_11
  }
  ```
- The `android:build` script in `package.json` should export `JAVA_HOME` for Java 11:
  ```json
  "android:build": "export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 && export PATH=\"$JAVA_HOME/bin:$PATH\" && cd android && ./gradlew assembleDebug"
  ```

## 2. Android Gradle Plugin (AGP) and Gradle Wrapper

- **AGP version:** 7.2.2 (in `android/build.gradle`)
- **Gradle wrapper:** 7.5.1 (in `android/gradle/wrapper/gradle-wrapper.properties`)

## 3. SDK Versions

- Set `compileSdkVersion` and `targetSdkVersion` to **33** (in `android/variables.gradle`):
  ```groovy
  compileSdkVersion = 33
  targetSdkVersion = 33
  ```

## 4. AndroidX Dependency Versions

- Downgrade AndroidX libraries to versions compatible with SDK 33:
  ```groovy
  androidxActivityVersion = '1.7.2'
  androidxAppCompatVersion = '1.6.1'
  androidxCoordinatorLayoutVersion = '1.2.0'
  androidxCoreVersion = '1.10.1'
  androidxFragmentVersion = '1.6.2'
  coreSplashScreenVersion = '1.0.1'
  androidxWebkitVersion = '1.7.0'
  ```

## 5. Kotlin Version Conflict Resolution

- Force all Kotlin stdlib dependencies to **1.6.21** in `android/build.gradle`:
  ```groovy
  allprojects {
      configurations.all {
          resolutionStrategy {
              force 'org.jetbrains.kotlin:kotlin-stdlib:1.6.21'
              force 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.21'
              force 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.21'
          }
      }
  }
  ```

## 6. Capacitor and Plugins

- Use Capacitor 4.x for all packages:
  - `@capacitor/core`, `@capacitor/android`, `@capacitor/cli`, and official plugins should be on 4.x versions.

## 7. Notes

- Do **not** use AGP or Gradle versions newer than above, or AndroidX libraries requiring SDK 34+.
- If you see duplicate class errors, check for Kotlin version conflicts and apply the resolution strategy above.
- If you see SDK version errors, ensure all dependencies are compatible with SDK 33.

---

**Last updated:** July 25, 2025
