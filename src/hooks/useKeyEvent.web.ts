import { useCallback, useEffect, useState } from "react";
import { KeyPressEvent } from "../ExpoKeyEvent.types";

export function useKeyEvent() {
  const [keyEvent, setKeyEvent] = useState<KeyPressEvent | null>(null);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    setKeyEvent({ key: event.code });
  }, []);

  useEffect(() => {
    addEventListener("keydown", onKeyDown);

    return () => {
      removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return {
    startListening: () => addEventListener("keydown", onKeyDown),
    stopListening: () => removeEventListener("keydown", onKeyDown),
    keyEvent,
  };
}
