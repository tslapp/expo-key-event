`expo-key-event` provides an interface for reading key events such as from external bluetooth keyboards on Android, iOS and Web.

## Installation

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

## Further details

This module maps the UIKit (https://developer.apple.com/documentation/uikit/uikeyboardhidusage) and Android (https://developer.android.com/reference/android/view/KeyEvent) constants to a common set of key event types matching the ones from Web (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code).
