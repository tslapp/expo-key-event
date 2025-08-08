export type KeyEvent = {
  key: string;
};

export type ExpoKeyEventModuleEvents = {
  onKeyDown: (event: KeyEvent) => void;
  onKeyUp: (event: KeyEvent) => void;
};

export type KeyEventListenerOptions = {
  onKeyDown?: (event: KeyEvent) => void;
  onKeyUp?: (event: KeyEvent) => void;
  listenOnMount?: boolean;
}
