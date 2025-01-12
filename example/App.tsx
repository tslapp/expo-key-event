import { Button, SafeAreaView, Text, View } from "react-native";

import { KeyEventDisplay } from "./KeyEventDisplay";
import { useKeyEvent } from "expo-key-event";

export function MyComponent() {
  const { keyEvent, startListening, stopListening } = useKeyEvent(false);

  return (
    <View>
      <Text>{keyEvent?.key}</Text>
      <Button title="Start listening" onPress={startListening} />
      <Button title="Stop listening" onPress={stopListening} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MyComponent />
      {/* <KeyEventDisplay /> */}
    </SafeAreaView>
  );
}
