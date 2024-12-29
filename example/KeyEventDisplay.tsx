import { useKeyEvent } from "expo-key-event";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type KeyEventDisplayProps = {};

export function KeyEventDisplay({}: KeyEventDisplayProps) {
  const { keyEvent } = useKeyEvent();

  const [keys, setKeys] = useState<
    {
      id: string;
      keyCode: string;
    }[]
  >([]);

  useEffect(() => {
    if (!keyEvent?.key) return;
    setKeys((_) => [
      {
        id: Math.random().toString(),
        keyCode: keyEvent.key,
      },
      ..._,
    ]);
  }, [keyEvent, setKeys]);

  return (
    <View>
      {keys.slice(0, 5).map((item, i) => {
        return (
          <Text
            key={item.id}
            style={[i === 0 ? { fontWeight: "bold" } : {}, { fontSize: 24 }]}
          >
            {item.keyCode}
          </Text>
        );
      })}
    </View>
  );
}
