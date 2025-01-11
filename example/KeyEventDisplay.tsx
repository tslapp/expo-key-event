import { useKeyEvent } from "expo-key-event";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  LinearTransition,
  SlideInRight,
} from "react-native-reanimated";

type DisplayedKey = {
  id: string;
  keyCode: string;
};

export function KeyEventDisplay() {
  const { keyEvent } = useKeyEvent();

  const [keys, setKeys] = useState<DisplayedKey[]>([]);

  useEffect(() => {
    if (!keyEvent?.key) return;
    setKeys((_) => {
      if (_.length > 5) _.pop();
      return [
        {
          id: Math.random().toString(),
          keyCode: keyEvent.key,
        },
        ..._,
      ];
    });
  }, [keyEvent, setKeys]);

  return (
    <Animated.FlatList
      contentContainerStyle={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      data={keys}
      renderItem={({ item, index }) => {
        return (
          <Animated.Text
            key={item.id}
            style={[
              index === 0 ? { fontWeight: "bold" } : {},
              { fontSize: 24 },
            ]}
            entering={FadeInLeft}
            // exiting={FadeOut}
          >
            {item.keyCode}
          </Animated.Text>
        );
      }}
      // itemLayoutAnimation={LinearTransition}
    />
  );
}
