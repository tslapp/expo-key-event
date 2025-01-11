import { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";

import { KeyEventDisplay } from "./KeyEventDisplay";

export default function App() {
  const [showKeyEvents, setShowKeyEvents] = useState(false);
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Button
        title={showKeyEvents ? "Hide key events" : "Show key events"}
        onPress={() => {
          setShowKeyEvents((_) => !_);
        }}
      />
      <View style={{ width: "100%" }}>
        {showKeyEvents && <KeyEventDisplay />}
      </View>
    </SafeAreaView>
  );
}
