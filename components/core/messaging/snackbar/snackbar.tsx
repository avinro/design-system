// Snackbar — reference component skeleton
// All token values confirmed from Figma nodes 7326:5716, 7326:5689, 7326:5698,
// 7326:5707, 7326:5680 and 7328:6293.
// Sub-components: action button uses Button (outlined/ghost), close button uses Button/only icon.

type SnackbarType = "info" | "error" | "warning" | "success" | "neutral";

type SnackbarConfiguration = "short-action" | "longer-action";

type SnackbarProps = {
  /** Semantic type. Controls icon and icon container color. Use "neutral" for no icon. */
  type: SnackbarType;
  /**
   * Layout configuration.
   * - "short-action": single row, description + action inline. Use for 1–2 word labels.
   * - "longer-action": two rows, action right-aligned below. Use for 3+ word labels.
   */
  configuration?: SnackbarConfiguration;
  /** Brief message text. One clear statement. Max 2 lines. */
  description: string;
  /** Label for the single action button. Verb or short verb phrase: "Undo", "Retry", "View". */
  actionLabel: string;
  /** Handler for the action button. */
  onAction: () => void;
  /** Whether to show the close button. */
  showCloseIcon?: boolean;
  /** Called when the close button is pressed or auto-dismiss fires. */
  onDismiss?: () => void;
};

// TODO: Replace placeholder markup with confirmed layout and token values from snackbar.tokens.json.
// TODO: Replace icon placeholders with the confirmed icon component per type.
// TODO: Implement auto-dismiss timer logic (duration TBD — see snackbar.specs.json).
export function Snackbar({
  type,
  configuration = "short-action",
  description,
  actionLabel,
  onAction,
  showCloseIcon = false,
  onDismiss,
}: SnackbarProps) {
  const isLongerAction = configuration === "longer-action";
  const ariaRole = type === "error" || type === "warning" ? "alert" : "status";
  const ariaLive = type === "error" || type === "warning" ? "assertive" : "polite";

  return (
    <div
      role={ariaRole}
      aria-live={ariaLive}
      data-name="Snackbar"
      data-node-id="7326:5679"
      data-type={type}
      data-configuration={configuration}
    >
      {/* Short action: single row layout */}
      {/* Longer action: column layout — Content row on top, Actions row below */}

      {/* Content row */}
      <div data-name="Content" data-node-id={type === "info" ? "7328:5758" : undefined}>

        {/* Context icon — absent on neutral type */}
        {type !== "neutral" && (
          <div
            data-name="Context icon"
            data-node-id={
              type === "info"     ? "7326:5717" :
              type === "error"    ? "7326:5690" :
              type === "warning"  ? "7326:5699" :
                                    "7326:5708"
            }
          >
            {/* TODO: Render correct icon per type:
              info:    Customer-Icon/info
              error:   Customer-Icon/alert-warn-circle
              warning: Customer-Icon/alert-war-triangle
              success: Customer-Icon/check
            */}
          </div>
        )}

        {/* Description */}
        <p data-node-id={type === "info" ? "7328:5759" : undefined}>
          {description}
        </p>

        {/* Close button — in Content row for Longer action configuration */}
        {isLongerAction && showCloseIcon && onDismiss && (
          <button
            aria-label="Dismiss"
            onClick={onDismiss}
            data-name="Button/only icon"
            data-node-id="7328:6300"
          >
            {/* TODO: Replace with icon component: Customer-Icon/x-close-delete */}
            ✕
          </button>
        )}
      </div>

      {/* Actions row */}
      <div data-name="Actions" data-node-id={type === "info" ? "7328:6206" : undefined}>

        {/* Action button */}
        <button
          onClick={onAction}
          data-name="Button"
          data-node-id={
            type === "info"     ? "7328:5821" :
            type === "error"    ? "7326:5697" :
            type === "warning"  ? "7326:5706" :
            type === "success"  ? "7326:5715" :
                                  "7326:5687"
          }
        >
          {actionLabel}
        </button>

        {/* Close button — in Actions row for Short action configuration */}
        {!isLongerAction && showCloseIcon && onDismiss && (
          <button
            aria-label="Dismiss"
            onClick={onDismiss}
            data-name="Button/only icon"
            data-node-id="7328:6186"
          >
            {/* TODO: Replace with icon component: Customer-Icon/x-close-delete */}
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
