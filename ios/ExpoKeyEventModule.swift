import ExpoModulesCore

public class ExpoKeyEventModule: Module {
  private var keyboardListenerView: KeyboardListenerView?

  public func definition() -> ModuleDefinition {
    Name("ExpoKeyEvent")
    Events("onKeyDown", "onKeyUp")
    Function("startListening") { [weak self] in
      guard let self = self else { return }

      // We must manipulate UI on the main thread
      DispatchQueue.main.async {
        // If we haven't already added the listener view, create one and add it.
        if self.keyboardListenerView == nil {
          let listenerView = KeyboardListenerView(
            onKeyDown: { key in
              self.sendEvent("onKeyDown", [
                "key": key
              ])
            },
            onKeyUp: { key in
              self.sendEvent("onKeyUp", [
                "key": key
              ])
            }
          )

          if let window = UIApplication.shared.delegate?.window,
             let rootView = window?.rootViewController?.view {
            rootView.addSubview(listenerView)
            listenerView.becomeFirstResponder() // crucial for receiving hardware key events
            self.keyboardListenerView = listenerView
          }
        }
      }
    }

    Function("stopListening") { [weak self] in
        guard let self = self else { return }

        DispatchQueue.main.async {
            // Remove the listener view if it exists
            self.keyboardListenerView?.removeFromSuperview()
            self.keyboardListenerView = nil
        }
    }
  }
}


/// A custom hidden view that can become first responder and intercept hardware key events.
class KeyboardListenerView: UIView {
  private let onKeyDown: (String) -> Void
  private let onKeyUp: (String) -> Void

  init(onKeyDown: @escaping (String) -> Void, onKeyUp: @escaping (String) -> Void) {
    self.onKeyDown = onKeyDown
    self.onKeyUp = onKeyUp
    super.init(frame: .zero)

    // Hide this view; we only need it to intercept events.
    self.isHidden = true
    self.isUserInteractionEnabled = true
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override var canBecomeFirstResponder: Bool {
    return true
  }

  override func pressesBegan(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
    super.pressesBegan(presses, with: event)
    guard let uiKey = presses.first?.key else { return }
    onKeyDown(String(uiKey.keyCode.rawValue))
  }

  override func pressesEnded(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
    super.pressesEnded(presses, with: event)
    guard let uiKey = presses.first?.key else { return }
    onKeyUp(String(uiKey.keyCode.rawValue))
  }
}
