import { NativeModule, requireNativeModule } from "expo";

import { ExpoKeyEventModuleEvents } from "./ExpoKeyEvent.types";

declare class ExpoKeyEventModule extends NativeModule<ExpoKeyEventModuleEvents> {
  startListening(): void;
  stopListening(): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoKeyEventModule>("ExpoKeyEvent");
