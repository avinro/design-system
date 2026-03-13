// Standard Dialog — reference component skeleton
// TODO: Implement using confirmed token values from standard-dialog.tokens.json
// TODO: Confirm whether this uses the Button component or local button instances

type StandardDialogProps = {
  /** Controls whether the dialog is open or closed. */
  open: boolean;
  /** Layout type. Compact for short forms; Full page for longer flows. */
  type?: "compact" | "full-page";
  /** Dialog title. Short task label, e.g. "Edit pickup address". */
  title: string;
  /** Content area — form fields, instructions, or structured content. */
  children: React.ReactNode;
  /** Label for the primary action button. */
  primaryLabel: string;
  /** Handler for the primary action. */
  onPrimary: () => void;
  /** Label for the secondary/cancel button. Optional — use when a cancel path exists. */
  secondaryLabel?: string;
  /** Handler for the secondary/cancel action. */
  onSecondary?: () => void;
  /** Called when the dialog is dismissed (close icon, overlay tap, Escape). */
  onDismiss: () => void;
  /** Whether to show a close icon in the header. Defaults to true. */
  showCloseIcon?: boolean;
};

// TODO: Replace placeholder markup with confirmed layout and token values.
export function StandardDialog({
  open,
  type = "compact",
  title,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  onDismiss,
  showCloseIcon = true,
}: StandardDialogProps) {
  if (!open) return null;

  return (
    <div
      data-name="overlay"
      data-node-id="7314:623"
      role="presentation"
      onClick={onDismiss}
      style={{ position: "fixed", inset: 0 }}
    >
      <div
        data-name={type === "full-page" ? "Type=Full page" : "Type=Compact"}
        data-node-id={type === "full-page" ? "7314:634" : "7314:624"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="standard-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div data-name="header">
          <p id="standard-dialog-title">{title}</p>
          {showCloseIcon && (
            <button aria-label="Close" onClick={onDismiss}>
              {/* TODO: Replace with icon component */}
              ✕
            </button>
          )}
        </div>

        {/* Content area */}
        <div data-name="content-area">
          {children}
        </div>

        {/* Footer */}
        <div data-name="footer">
          <button onClick={onPrimary}>{primaryLabel}</button>
          {secondaryLabel && onSecondary && (
            <button onClick={onSecondary}>{secondaryLabel}</button>
          )}
        </div>
      </div>
    </div>
  );
}
