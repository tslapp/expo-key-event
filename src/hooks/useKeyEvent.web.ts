import { useCallback, useEffect, useState } from "react";
import { KeyPressEvent } from "../ExpoKeyEvent.types";

/**
 *
 * @param listenOnMount Pass 'false' to prevent automatic key event listening
 * - Use startListening/stopListening to control the listener manually
 * @returns
 *
 */
export function useKeyEvent(listenOnMount = true) {
  const [keyEvent, setKeyEvent] = useState<KeyPressEvent | null>(null);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    setKeyEvent({ key: event.code });
  }, []);

  useEffect(() => {
    if (listenOnMount) addEventListener("keydown", onKeyDown);

    return () => {
      removeEventListener("keydown", onKeyDown);
    };
  }, [listenOnMount]);

  return {
    /**
     * Start listening for key events
     */
    startListening: () => addEventListener("keydown", onKeyDown),
    /**
     * Stop listening for key events
     */
    stopListening: () => removeEventListener("keydown", onKeyDown),
    keyEvent,
  };
}
