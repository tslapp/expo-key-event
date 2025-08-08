package expo.modules.keyevent

import android.content.Context
import android.view.KeyEvent
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class ExpoKeyEventView(
    context: Context,
    appContext: AppContext,
    private val onKeyDown: (Map<String, String>) -> Unit,
    private val onKeyUp: (Map<String, String>) -> Unit
) : ExpoView(context, appContext) {

  init {
    // Allows the view to receive key events.
    isFocusable = true
    isFocusableInTouchMode = true

    // Optionally request focus immediately, if desired.
    // requestFocus()
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    // Only process the initial key down event, ignore repeats
    if (event?.repeatCount == 0) {
      onKeyDown(mapOf("key" to keyCode.toString()))
    }
    return super.onKeyDown(keyCode, event)
  }

  override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
    // Send onKeyUp event
    onKeyUp(mapOf("key" to keyCode.toString()))
    return super.onKeyUp(keyCode, event)
  }
}
