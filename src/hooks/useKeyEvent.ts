import { useEvent } from "expo";
import { useEffect, useMemo } from "react";

import ExpoKeyEventModule from "../ExpoKeyEventModule";
import { unifyKeyCode } from "../utils/unifyKeyCode";

export function useKeyEvent() {
  const event = useEvent(ExpoKeyEventModule, "onKeyPress");

  useEffect(() => {
    ExpoKeyEventModule.startListening();

    return () => {
      ExpoKeyEventModule.stopListening();
    };
  }, []);

  const keyEvent = useMemo(() => {
    if (!event) return null;
    return {
      key: unifyKeyCode(event.key),
    };
  }, [event]);

  return {
    startListening: ExpoKeyEventModule.startListening,
    stopListening: ExpoKeyEventModule.stopListening,
    keyEvent,
  };
}
