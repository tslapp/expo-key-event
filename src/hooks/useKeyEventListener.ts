import { useEventListener } from "expo";
import { useCallback, useEffect } from "react";

import { KeyPressEvent } from "../ExpoKeyEvent.types";
import ExpoKeyEventModule from "../ExpoKeyEventModule";
import { unifyKeyCode } from "../utils/unifyKeyCode";

/**
 * This hook is used to listen for key events, but it doesn't keep the track of it.
 * This is useful if you want to handle the state yourself or use the event outside of the react lifecycle.
 * @param listenOnMount Pass 'false' to prevent automatic key event listening
 * - Use startListening/stopListening to control the listener manually
 *
 */
export function useKeyEventListener(
  listener: (event: KeyPressEvent) => void,
  listenOnMount = true
) {
  const onKeyPress = useCallback(
    ({ key }: KeyPressEvent) => listener({ key: unifyKeyCode(key) }),
    [listener]
  );

  useEventListener(ExpoKeyEventModule, "onKeyPress", onKeyPress);

  useEffect(() => {
    if (listenOnMount) ExpoKeyEventModule.startListening();

    return () => {
      ExpoKeyEventModule.stopListening();
    };
  }, [listenOnMount]);

  return {
    /**
     * Start listening for key events
     */
    startListening: () => ExpoKeyEventModule.startListening(),
    /**
     * Stop listening for key events
     */
    stopListening: () => ExpoKeyEventModule.stopListening(),
  };
}
