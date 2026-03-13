// Toast — reference component skeleton
// Token values confirmed from Figma node 5247:369 (type=info).
// Icon and icon container color values per type are TODO — see toast.tokens.json.
// The close button uses the Button/only icon component pattern (node 5247:544).
// The Counter sub-component (node 5247:508) represents the auto-dismiss timer.

type ToastType = "info" | "success" | "warning" | "error" | "trip";

type ToastProps = {
  /** Semantic type. Controls the context icon and its container color. */
  type: ToastType;
  /** Short summary of what happened. Single line — truncates on overflow. */
  title: string;
  /** Optional supporting detail. Up to 2 lines. */
  description?: string;
  /** Whether to show the close button. Recommended when toasts may stack. */
  close?: boolean;
  /** Called when the close button is pressed or auto-dismiss fires. */
  onDismiss?: () => void;
};

// TODO: Replace placeholder markup with confirmed layout and token values from toast.tokens.json.
// TODO: Replace icon placeholder with the confirmed icon component per type.
// TODO: Implement the Counter sub-component (auto-dismiss timer bar).
// TODO: Implement auto-dismiss timer logic (duration TBD — see toast.specs.json).
export function Toast({
  type,
  title,
  description,
  close = true,
  onDismiss,
}: ToastProps) {
  return (
    <div
      role={type === "error" || type === "warning" ? "alert" : "status"}
      aria-live={type === "error" || type === "warning" ? "assertive" : "polite"}
      data-name="Toast"
      data-node-id="5247:192"
      data-type={type}
    >
      {/* Context icon container */}
      <div data-name="Context icon" data-node-id="5247:370">
        {/* TODO: Render the correct icon per type */}
      </div>

      {/* Content */}
      <div data-name="Content" data-node-id="5247:373">
        <p data-node-id="5247:375">{title}</p>
        {description && (
          <p data-node-id="5247:376">{description}</p>
        )}
      </div>

      {/* Close button */}
      {close && onDismiss && (
        <button
          aria-label="Dismiss notification"
          onClick={onDismiss}
          data-name="Button/only icon"
          data-node-id="5247:544"
        >
          {/* TODO: Replace with icon component: Customer-Icon/x-close-delete */}
          ✕
        </button>
      )}

      {/* Counter — auto-dismiss progress bar */}
      <div data-name="Counter" data-node-id="5247:508">
        {/* TODO: Implement counter/progress bar animation */}
      </div>
    </div>
  );
}
