`expo-key-event` provides an interface for reading key events such as from external bluetooth keyboards.

[![iOS](.github/key-event-ios-preview.png|width=100)](.github/key-event-android.mp4|width=100) [![Android](.github/key-event-android-preview.png|width=100)](.github/key-event-android.mp4|width=100) [![Web](.github/key-event-web-preview.png|width=100)](.github/key-event-web.mp4|width=100)

## Getting started

`npm i expo-key-event`

## Usage

```tsx
import { useKeyEvent } from "expo-key-event";
import { Text } from "react-native";

export function MyComponent() {
  const { keyEvent } = useKeyEvent();

  return <Text>{keyEvent?.key}</Text>;
}
```

## Run example app

`cd example`

`npm run ios` / `npm run android` / `npm run web`

## Troubleshooting

### Error: Cannot find native module 'ExpoKeyEvent'

Make sure to use a development build and not `Expo Go`.
See https://docs.expo.dev/guides/local-app-development/ for more details.

In short: Use `npx expo run:ios` instead of `npx expo start` (make sure bundleIdentifier is set in `app.json`).

### Key events are not registered in iOS simulator

Make sure that hardware keyboard is connected to the simulator.
<img src=".github/connect-hardware-keyboard.png" alt="hardware-keyboard-simulator" width="400px" />

### Key events are not registered in Android emulator

Since the Android emulator does not support USB or Bluetooth, you need to use a physical device so that key events can be registered.

Another option is to use `adb` to send key events to the emulator.

e.g. `adb shell input keyevent 10`

## How it works

This module translates the [Apple UIKit](https://developer.apple.com/documentation/uikit/uikeyboardhidusage) and [Android KeyEvent](https://developer.android.com/reference/android/view/KeyEvent) constants to a common set of key event types matching the ones from [Web](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code).
