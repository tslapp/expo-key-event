import { useEventListener } from 'expo';
import { useCallback, useEffect } from 'react';

import { KeyEvent, KeyEventListenerOptions } from '../ExpoKeyEvent.types';
import ExpoKeyEventModule from '../ExpoKeyEventModule';
import { unifyKeyCode } from '../utils/unifyKeyCode';

/**
 * This hook is used to listen for key events, but it doesn't keep the track of it.
 * This is useful if you want to handle the state yourself or use the event outside of the react lifecycle.
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
  const onKeyDownCallback = useCallback(
    ({ key }: KeyEvent) => {
      const uniKey = unifyKeyCode(key);
      onKeyDown?.({ key: uniKey });
    },
    [onKeyDown],
  );

  const onKeyUpCallback = useCallback(
    ({ key }: KeyEvent) => {
      const uniKey = unifyKeyCode(key);
      onKeyUp?.({ key: uniKey });
    },
    [onKeyUp],
  );

  useEventListener(ExpoKeyEventModule, 'onKeyDown', onKeyDownCallback);
  useEventListener(ExpoKeyEventModule, 'onKeyUp', onKeyUpCallback);

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
    startListening: ExpoKeyEventModule.startListening,
    /**
     * Stop listening for key events
     */
    stopListening: ExpoKeyEventModule.stopListening,
  };
}
