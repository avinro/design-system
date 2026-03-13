import React from "react";

export type SwitchToggleVariant =
  | "switch-basic"
  | "switch-description"
  | "switch-boxed";

export type SwitchToggleProps = {
  /** Visual layout variant */
  variant?: SwitchToggleVariant;
  /** Whether the switch is on */
  checked?: boolean;
  /** Whether the control is non-interactive */
  disabled?: boolean;
  /** Primary option label */
  label?: string;
  /** Secondary description text — shown in switch-description and switch-boxed only */
  description?: string;
  /**
   * Optional icon element rendered on the far left.
   * Pass a 24×24px icon component or element.
   */
  icon?: React.ReactNode;
  /** Called when the user toggles the switch */
  onChange?: (checked: boolean) => void;
  /** Accessible label for the switch control if the visible label is insufficient */
  "aria-label"?: string;
};

/**
 * SwitchToggle — binary on/off control for immediately-applied settings.
 *
 * Composed of two base sub-components:
 * - `_base-switch`: the pill-shaped toggle indicator (always right-aligned)
 * - `_base-label-checkbox`: the label and optional description (shared with Radio Select and Checkbox)
 *
 * An optional icon can appear on the far left of the row.
 *
 * Variants:
 * - `switch-basic`: icon (optional) + label + switch
 * - `switch-description`: icon (optional) + label + description + switch
 * - `switch-boxed`: icon (optional) + label + description + switch, in a bordered card
 */
export function SwitchToggle({
  variant = "switch-basic",
  checked = false,
  disabled = false,
  label = "Option name",
  description = "Description text below label text",
  icon,
  onChange,
  "aria-label": ariaLabel,
}: SwitchToggleProps) {
  const showDescription =
    variant === "switch-description" || variant === "switch-boxed";
  const isBoxed = variant === "switch-boxed";

  function handleToggle() {
    if (!disabled) {
      onChange?.(!checked);
    }
  }

  // Track background color
  const trackColor = disabled
    ? "var(--selector\\/bg-disabled, #cccdda)"
    : checked
    ? "var(--selector\\/bg-active, #ff6b26)"
    : "var(--selector\\/bg-enable, #7a7b93)";

  // Text color for label and description when disabled
  const labelColor = disabled
    ? "var(--text\\/placeholder, #636377)"
    : "var(--text\\/primary, #1d1d23)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isBoxed ? "8px" : "8px",
        padding: isBoxed ? "12px" : undefined,
        borderRadius: isBoxed ? "8px" : undefined,
        border: isBoxed
          ? `1px solid ${
              disabled
                ? "var(--text\\/placeholder, #636377)"
                : "var(--layout\\/border, #e1e5ea)"
            }`
          : undefined,
        opacity: disabled ? undefined : 1,
      }}
    >
      {/* Optional icon — far left */}
      {icon && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}

      {/* _base-label-checkbox */}
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: showDescription ? "var(--numbers\\/4, 4px)" : undefined,
          paddingTop: "var(--numbers\\/2, 2px)",
          paddingBottom: "var(--numbers\\/2, 2px)",
          flex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-family\\/body, 'Manrope', sans-serif)",
            fontWeight: "var(--weight\\/semibold, 600)",
            fontSize: "var(--size\\/base, 14px)",
            lineHeight: 1.2,
            letterSpacing: "var(--letter-spacing\\/normal, 0px)",
            color: labelColor,
          }}
        >
          {label}
        </span>

        {showDescription && (
          <span
            style={{
              fontFamily: "var(--font-family\\/body, 'Manrope', sans-serif)",
              fontWeight: "var(--weight\\/regular, 400)",
              fontSize: "var(--size\\/base, 14px)",
              lineHeight: 1.2,
              color: "var(--text\\/placeholder, #636377)",
            }}
          >
            {description}
          </span>
        )}
      </span>

      {/* _base-switch — always right-aligned */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleToggle}
        style={{
          display: "block",
          position: "relative",
          width: "44px",
          height: "24px",
          flexShrink: 0,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {/* Track */}
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "22px",
            transform: "translateY(-50%)",
            borderRadius: "125px",
            backgroundColor: trackColor,
            transition: "background-color 150ms ease",
          }}
        />

        {/* Dot */}
        <span
          style={{
            position: "absolute",
            top: "12.5%",
            bottom: "12.5%",
            left: checked ? "54.55%" : "4.55%",
            right: checked ? "4.55%" : "54.55%",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 150ms ease, right 150ms ease",
          }}
        />
      </button>
    </div>
  );
}
