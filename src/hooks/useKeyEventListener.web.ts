import { useCallback, useEffect } from 'react';

import { KeyEventListenerOptions } from '../ExpoKeyEvent.types';

/**
 * @param onKeyDown key down event handler
 * @param onKeyUp key up event handler
 * @param listenOnMount Pass 'false' to prevent automatic key event listening
 * - Use startListening/stopListening to control the listener manually
 */
export function useKeyEventListener({
  onKeyDown,
  onKeyUp,
  listenOnMount = true,
}: KeyEventListenerOptions) {

  const onKeyDownCallback = useCallback((event: KeyboardEvent) => {
    onKeyDown?.({ key: event.code });
  }, [onKeyDown]);

  const onKeyUpCallback = useCallback((event: KeyboardEvent) => {
    onKeyUp?.({ key: event.code });
  }, [onKeyUp]);

  const startListening = useCallback(
    () => {
      addEventListener('keydown', onKeyDownCallback);
      addEventListener('keyup', onKeyUpCallback);
    },
    [onKeyDownCallback, onKeyUpCallback],
  );

  const stopListening = useCallback(
    () => {
      addEventListener('keydown', onKeyDownCallback);
      addEventListener('keyup', onKeyUpCallback);
    },
    [onKeyDownCallback, onKeyUpCallback],
  );

  useEffect(() => {
    if (listenOnMount) startListening();
    return () => {
      stopListening();
    };
  }, [listenOnMount, startListening, stopListening]);

  return {
    /**
     * Start listening for key events
     */
    startListening,
    /**
     * Stop listening for key events
     */
    stopListening,
  };
}
