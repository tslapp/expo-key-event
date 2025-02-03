import {useCallback, useEffect} from 'react';

import {KeyPressEvent} from '../ExpoKeyEvent.types';
import ExpoKeyEventModule from '../ExpoKeyEventModule';

/**
 *
 * @param listenOnMount Pass 'false' to prevent automatic key event listening
 * - Use startListening/stopListening to control the listener manually
 * @returns
 *
 */
export function useKeyEventListener(
  listener: (event: KeyPressEvent) => void,
  listenOnMount = true
) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => listener({key: event.code}),
    [listener]
  );

  useEffect(() => {
    if (listenOnMount) addEventListener('keydown', onKeyDown);

    return () => {
      removeEventListener('keydown', onKeyDown);
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
