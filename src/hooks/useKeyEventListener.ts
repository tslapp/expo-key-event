import {useEventListener} from 'expo';
import {useCallback, useEffect} from 'react';

import {KeyPressEvent} from '../ExpoKeyEvent.types';
import ExpoKeyEventModule from '../ExpoKeyEventModule';
import {unifyKeyCode} from '../utils/unifyKeyCode';

/**
 *
 * @param listenOnMount Pass 'false' to prevent automatic key event listening
 * - Use startListening/stopListening to control the listener manually
 *
 */
export function useKeyEventListener(
  listener: (event: KeyPressEvent) => void,
  listenOnMount = true
) {
  const onKeyPress = useCallback(
    ({key}: KeyPressEvent) => listener({key: unifyKeyCode(key)}),
    [listener]
  );

  useEventListener(ExpoKeyEventModule, 'onKeyPress', onKeyPress);

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
