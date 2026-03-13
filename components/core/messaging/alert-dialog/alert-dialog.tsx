import React from "react";

export type AlertDialogType = "Warning" | "Error" | "Destructive" | "Info";

export type AlertDialogProps = {
  /** Intent type — controls icon, icon background, and second button styling */
  type?: AlertDialogType;
  /** Dialog heading. Prefer a question format when asking for a decision. */
  title: string;
  /** Body text. 1–3 lines maximum. No paragraphs. */
  description: string;
  /**
   * Label for the primary (safe/neutral) action button.
   * Use explicit, consequence-describing labels.
   */
  primaryActionLabel: string;
  /**
   * Callback for the primary action.
   */
  onPrimaryAction: () => void;
  /**
   * Label for the second action button.
   * Required unless `showSecondaryAction` is false.
   * For Destructive type: use the consequence label ("Cancel booking", "Delete plan").
   * For Warning/Error/Info: use the safe exit label.
   */
  secondaryActionLabel?: string;
  /**
   * Callback for the second action.
   */
  onSecondaryAction?: () => void;
  /**
   * Set to false to render only the primary action.
   * Use for acknowledge-only Info/Warning dialogs with no real choice.
   * @default true
   */
  showSecondaryAction?: boolean;
};

/**
 * AlertDialog — modal interruption for high-stakes decisions.
 *
 * Reserved for:
 * - Destructive confirmations (delete, cancel booking, remove payment method)
 * - Critical mismatch checks (wrong pickup address, conflicting details)
 * - Blocking errors requiring acknowledgement
 * - High-risk warnings where the user must choose explicitly
 *
 * Do NOT use for routine confirmations, forms, or non-urgent messages.
 * See component-rules.md for full decision guidance.
 */
export function AlertDialog({
  type = "Warning",
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  showSecondaryAction = true,
}: AlertDialogProps) {
  const isDestructive = type === "Destructive";
  const isError = type === "Error";
  const isInfo = type === "Info";
  const isWarning = type === "Warning";

  // Icon background color per type
  const iconBgColor =
    isInfo
      ? "var(--notification\\/info-bg, #d4e3ff)"
      : isWarning
      ? "var(--notification\\/warning--bg, #f6e3a4)"
      : "var(--notification\\/error-bg, #fcdcdc)"; // Error + Destructive

  // Second button style
  const secondButtonStyle: React.CSSProperties =
    isDestructive
      ? {
          backgroundColor:
            "var(--button\\/destructive\\/bg-default, #cc2222)",
          border: "1px solid var(--button\\/destructive\\/border-default, rgba(29,29,35,0))",
          color:
            "var(--button\\/destructive\\/text-default, #ffffff)",
        }
      : {
          backgroundColor:
            "var(--button\\/secondary\\/bg-default, rgba(29,29,35,0.05))",
          border: "1px solid var(--button\\/secondary\\/border-active, rgba(29,29,35,0))",
          color:
            "var(--button\\/secondary\\/text-default, #1d1d23)",
        };

  return (
    /* Overlay */
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor:
          "var(--surface\\/neutral\\/overlay, rgba(0,0,0,0.4))",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "16px 16px 32px",
        zIndex: 9999,
      }}
    >
      {/* Dialog card */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          backgroundColor:
            "var(--notification\\/dialog-bg, #f1f2f4)",
          borderRadius: "var(--rounded-24, 24px)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          width: "100%",
          maxWidth: "358px",
          overflowY: "auto",
        }}
      >
        {/* Icon container */}
        <div
          aria-hidden="true"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "var(--rounded-full, 120px)",
            backgroundColor: iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: "20px",
          }}
        >
          {/* 40×40 icon slot — replace with the appropriate product icon */}
          <span
            style={{
              display: "block",
              width: "40px",
              height: "40px",
              flexShrink: 0,
            }}
          >
            {/* TODO: render the correct icon for each type:
              Warning   → alert-war-triangle
              Error     → alert-warn-circle
              Destructive → trash-delete-2
              Info      → info-circle
            */}
          </span>
        </div>

        {/* Content: title + body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <p
            id="alert-dialog-title"
            style={{
              fontFamily:
                "var(--font-family\\/headings, 'Google Sans Flex', sans-serif)",
              fontWeight: "var(--weight\\/semibold, 600)",
              fontSize: "var(--size\\/2xl, 20px)",
              lineHeight: 1.2,
              letterSpacing: "var(--letter-spacing\\/tight, -0.4px)",
              color: "var(--text\\/primary, #1d1d23)",
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            id="alert-dialog-description"
            style={{
              fontFamily:
                "var(--font-family\\/body, 'Manrope', sans-serif)",
              fontWeight: "var(--weight\\/medium, 500)",
              fontSize: "var(--size\\/base, 14px)",
              lineHeight: 1.2,
              letterSpacing: "var(--letter-spacing\\/normal, 0px)",
              color: "var(--text\\/body, #34353f)",
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          {/* Primary (safe/neutral) action */}
          <button
            type="button"
            onClick={onPrimaryAction}
            style={{
              backgroundColor:
                "var(--button\\/default\\/bg-default, #1d1d23)",
              border:
                "1px solid var(--button\\/default\\/border-active, rgba(29,29,35,0.12))",
              color:
                "var(--button\\/default\\/text-default, #f1f2f4)",
              fontFamily:
                "var(--font-family\\/body, 'Manrope', sans-serif)",
              fontWeight: "var(--weight\\/semibold, 600)",
              fontSize: "var(--size\\/base, 14px)",
              lineHeight: 1.4,
              letterSpacing: "var(--letter-spacing\\/normal, 0px)",
              height: "44px",
              width: "100%",
              borderRadius: "var(--rounded-full, 120px)",
              cursor: "pointer",
              padding: "0 12px",
              whiteSpace: "nowrap",
            }}
          >
            {primaryActionLabel}
          </button>

          {/* Second action — secondary or destructive */}
          {showSecondaryAction && secondaryActionLabel && (
            <button
              type="button"
              onClick={onSecondaryAction}
              style={{
                ...secondButtonStyle,
                fontFamily:
                  "var(--font-family\\/body, 'Manrope', sans-serif)",
                fontWeight: "var(--weight\\/semibold, 600)",
                fontSize: "var(--size\\/base, 14px)",
                lineHeight: 1.4,
                letterSpacing: "var(--letter-spacing\\/normal, 0px)",
                height: "44px",
                width: "100%",
                borderRadius: "var(--rounded-full, 120px)",
                cursor: "pointer",
                padding: "0 12px",
                whiteSpace: "nowrap",
              }}
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
