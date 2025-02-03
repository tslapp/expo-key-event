import { Button, SafeAreaView, Text, View } from "react-native";

import { KeyEventDisplay } from "./KeyEventDisplay";
import { useKeyEvent } from "expo-key-event";

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <KeyEventDisplay />
    </SafeAreaView>
  );
}
