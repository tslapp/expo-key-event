`expo-key-event` provides an interface for reading key events such as from external bluetooth keyboards on Android, iOS and Web.

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

## Troubleshooting

### Error: Cannot find native module 'ExpoKeyEvent'

Make sure to use a development build and not `Expo Go`.
See https://docs.expo.dev/guides/local-app-development/ for more details.

In short: Use `npx expo run:ios` instead of `npx expo start` (make sure bundleIdentifier is set in `app.json`).

### Key events are not registered in iOS simulator

Make sure that hardware keyboard is connected to the simulator.
![hardware-keyboard-simulator](.github/connect-hardware-keyboard.png)

## How it works

This module translates the [Apple UIKit](https://developer.apple.com/documentation/uikit/uikeyboardhidusage) and [Android KeyEvent](https://developer.android.com/reference/android/view/KeyEvent) constants to a common set of key event types matching the ones from [Web](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code).
