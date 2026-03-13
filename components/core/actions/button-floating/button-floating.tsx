/**
 * ButtonFloating — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5180:273
 * Figma frame name: "Button/floating"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * Confirmed from Figma:
 * - Single visual style — no type variants
 * - 2 sizes: md (44×44px), lg (54×54px)
 * - 4 states: Default, Pressed, Disabled, Focus — NO hover state
 * - Single centered icon slot — no label
 * - Icon size: 24×24px (md confirmed)
 * - Shape: circle (square container + border-radius: var(--rounded-full, 120px))
 * - Background: var(--surface/neutral/sunken, white) — white surface
 * - Shadow: elevation/light/01 → 0px 2px 4px 0px rgba(0,0,0,0.1)
 * - Transparent border at rest
 *
 * ACCESSIBILITY: aria-label is REQUIRED on every instance.
 * There is no visible label. The icon alone is not accessible.
 *
 * USAGE: Floats over a map, image, or content surface. Typically fixed-positioned
 * at a corner of the content area. Used for a single contextual action.
 */

import React from "react";

export type ButtonFloatingSize = "md" | "lg";

export interface ButtonFloatingProps {
  /** Size of the button. md = 44×44px, lg = 54×54px. */
  size?: ButtonFloatingSize;
  /**
   * Accessible label describing the action.
   * REQUIRED — there is no visible label on this component.
   * Example: "Center map", "Go to my location"
   */
  ariaLabel: string;
  /** The icon element to render. Should be a 24×24px SVG or icon component (md). */
  icon: React.ReactNode;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional class names for positioning the floating button (e.g. fixed bottom-right). */
  className?: string;
}

// TODO: Replace with project design tokens.
const sizeStyles: Record<ButtonFloatingSize, React.CSSProperties> = {
  md: { width: "44px", height: "44px" },
  lg: { width: "54px", height: "54px" /* TODO: confirm icon size for lg */ },
};

export function ButtonFloating({
  size = "md",
  ariaLabel,
  icon,
  disabled = false,
  onClick,
  className,
}: ButtonFloatingProps) {
  return (
    <button
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      data-button-size={size}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface/neutral/sunken, white)",
        borderRadius: "var(--rounded-full, 120px)",
        borderWidth: "var(--width-1, 1px)",
        borderStyle: "solid",
        borderColor: "var(--button/secondary/border-active, rgba(29,29,35,0))",
        // elevation/light/01 — suppress shadow when disabled
        boxShadow: disabled ? "none" : "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
        flexShrink: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        padding: 0,
        // TODO: Map pressed and focus state styles.
        ...sizeStyles[size],
      }}
    >
      {/* Icon is hidden from assistive technology — the button's aria-label carries the accessible name. */}
      <span
        aria-hidden="true"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {icon}
      </span>
    </button>
  );
}
