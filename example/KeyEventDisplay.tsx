import { useKeyEvent } from "expo-key-event";
import { useEffect, useState } from "react";
import { Button, Switch, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

type DisplayedKey = {
  id: string;
  keyCode: string;
};

export function KeyEventDisplay() {
  const [automaticControl, setAutomaticControl] = useState(true);
  const [listening, setListening] = useState(false);
  const { keyEvent, startListening, stopListening } =
    useKeyEvent(automaticControl);

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

  useEffect(() => {
    if (automaticControl) return;
    if (listening) startListening();
    else stopListening();
  }, [listening, automaticControl]);

  return (
    <View style={{ flex: 1, width: "100%", gap: 8 }}>
      <View
        style={{
          height: 100,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 16,
          alignSelf: "center",
        }}
      >
        <Switch
          onValueChange={() => {
            setAutomaticControl((_) => !_);
          }}
          value={automaticControl}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Control listener automatically
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Listener is added/removed when component mounts/unmounts
          </Text>
        </View>
      </View>
      {automaticControl === false && (
        <View style={{ alignSelf: "center" }}>
          <Button
            title={listening ? "Stop listening" : "Start listening"}
            onPress={() => setListening((_) => !_)}
          />
        </View>
      )}
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
            >
              {item.keyCode}
            </Animated.Text>
          );
        }}
      />
    </View>
  );
}
