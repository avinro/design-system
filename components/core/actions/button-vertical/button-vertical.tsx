/**
 * ButtonVertical — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5184:4242
 * Figma frame name: "Button/vertical"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * Confirmed from Figma:
 * - Vertical layout: icon-form shape + icon (stacked) above a text label
 * - Two icon-form shapes: diamond (54×54px) and circle (48×48px)
 * - Icon size: 32×32px for both forms
 * - Container: ~120px wide, 96px tall, rounded-24, gray surface background
 * - Single size only — no size variants
 * - 4 states: active (resting), pressed, disabled, focus — NO hover state
 * - Label: Manrope Medium 16px, center-aligned, can wrap to 2 lines
 * - Used in action grids inside bottom sheets (e.g., Map Report)
 *
 * NOTE: The Figma component has a typo in the label prop name ("lable").
 * This implementation uses the correct spelling: "label".
 */

import React from "react";

export type ButtonVerticalIconForm = "diamond" | "circle";

export type ButtonVerticalState = "active" | "pressed" | "disabled" | "focus";

export interface ButtonVerticalProps {
  /** Shape of the icon container. "diamond" = rotated square (54×54px). "circle" = ellipse (48×48px). */
  iconForm?: ButtonVerticalIconForm;
  /** The icon element to render inside the icon-form shape. Should be 32×32px. */
  icon: React.ReactNode;
  /**
   * The icon-form background element (the colored diamond or circle shape).
   * Pass the appropriate colored shape asset for the action category.
   */
  iconFormBackground: React.ReactNode;
  /** Text label displayed below the icon. Can wrap to two lines. */
  label: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional class names. */
  className?: string;
}

// Icon-form size constants (confirmed from Figma).
const iconFormSizes: Record<ButtonVerticalIconForm, { shape: number; iconOffset: number }> = {
  diamond: { shape: 54, iconOffset: 11 },
  circle:  { shape: 48, iconOffset: 8  },
};

export function ButtonVertical({
  iconForm = "diamond",
  icon,
  iconFormBackground,
  label,
  disabled = false,
  onClick,
  className,
}: ButtonVerticalProps) {
  const { shape, iconOffset } = iconFormSizes[iconForm];

  return (
    <button
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      data-icon-form={iconForm}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--spacing-2, 2px)",
        height: "96px",
        padding: "var(--spacing-12, 12px) var(--spacing-8, 8px)",
        background: "var(--surface/neutral/default, #f1f2f4)",
        borderRadius: "var(--rounded-24, 24px)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        // TODO: Apply pressed, disabled, and focus state styles via CSS or state-based logic.
      }}
    >
      {/* Icon wrapper: overlays icon on top of the icon-form background shape */}
      <div
        style={{
          position: "relative",
          width: `${shape}px`,
          height: `${shape}px`,
          flexShrink: 0,
        }}
      >
        {/* Icon-form background (colored diamond or circle asset) */}
        <div style={{ position: "absolute", inset: 0 }} aria-hidden="true">
          {iconFormBackground}
        </div>
        {/* Action icon centered on the shape */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: `${iconOffset}px`,
            left: `${iconOffset}px`,
            width: "32px",
            height: "32px",
            overflow: "hidden",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: "var(--weight/medium, 500)",
          fontSize: "var(--size/lg, 16px)",
          lineHeight: 1.4,
          letterSpacing: "var(--letter-spacing/normal, 0px)",
          color: disabled ? "var(--text/disabled, currentColor)" : "var(--text/primary, #1d1d23)",
          textAlign: "center",
          // Width is content-driven; parent container controls max-width.
        }}
      >
        {label}
      </span>
    </button>
  );
}
