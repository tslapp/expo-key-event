package expo.modules.keyevent

import android.view.ViewGroup
import android.view.View
import android.content.Context

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import expo.modules.keyevent.ExpoKeyEventView


class ExpoKeyEventModule : Module() {
  private var listenerView: ExpoKeyEventView? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoKeyEvent")
    Events("onKeyDown", "onKeyUp")
    Function("startListening") {
      // currentActivity might be null if the app is backgrounded or not yet ready
      val activity = appContext.currentActivity ?: return@Function null

      activity.runOnUiThread {
        // Get the root view (which is typically a ViewGroup)
        val rootView = activity.findViewById<ViewGroup>(android.R.id.content)

        // Create and add our listener view with callbacks for all three events
        listenerView = ExpoKeyEventView(
          activity,
          appContext,
          // onKeyDown callback
          { eventData: Map<String, String> ->
            sendEvent("onKeyDown", eventData)
          },
          // onKeyUp callback
          { eventData: Map<String, String> ->
            sendEvent("onKeyUp", eventData)
          }
        )

        rootView.addView(listenerView)

        // Make sure our view actually gets focus
        listenerView?.requestFocus()
      }

      return@Function null
    }

    Function("stopListening") {
      // currentActivity might be null if the app is backgrounded or not yet ready
      val activity = appContext.currentActivity ?: return@Function null

      activity.runOnUiThread {
        // Safely remove the view if it exists
        listenerView?.let { view ->
          val parent = view.parent as? ViewGroup
          parent?.removeView(view)
        }
        listenerView = null
      }
    }
  }
}
