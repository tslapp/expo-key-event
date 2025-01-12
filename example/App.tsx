import { SafeAreaView } from "react-native";

import { KeyEventDisplay } from "./KeyEventDisplay";

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
