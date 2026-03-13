/**
 * ButtonIcon — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5007:1640
 * Figma frame name: "Button/only icon"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * Confirmed from Figma:
 * - 6 types: Default, Accent, Secondary, Outlined, No-fill, Destructive
 * - 3 sizes: sm (32×32px), md (44×44px), lg (56×56px)
 * - 5 states: Default, Hover, Pressed, Disabled, Focus
 * - Single centered icon slot — no label
 * - Icon size: 20×20px (md confirmed)
 * - Shape: circle (square container + border-radius: var(--rounded-full, 120px))
 *
 * ACCESSIBILITY: aria-label is REQUIRED on every instance.
 * There is no visible label. The icon alone is not accessible.
 */

import React from "react";

export type ButtonIconType =
  | "Default"
  | "Accent"
  | "Secondary"
  | "Outlined"
  | "No-fill"
  | "Destructive";

export type ButtonIconSize = "sm" | "md" | "lg";

export interface ButtonIconProps {
  /** Visual type that determines color and hierarchy. */
  type?: ButtonIconType;
  /** Size of the button. Determines the square dimensions. */
  size?: ButtonIconSize;
  /**
   * Accessible label describing the action.
   * REQUIRED — there is no visible label on this component.
   * Example: "Search", "Delete account", "Edit profile"
   */
  ariaLabel: string;
  /** The icon element to render. Should be a 20×20px SVG or icon component (md). */
  icon: React.ReactNode;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional class names for the host element. */
  className?: string;
}

// TODO: Replace with project design tokens.
const sizeStyles: Record<ButtonIconSize, React.CSSProperties> = {
  sm: { width: "32px", height: "32px" /* TODO: confirm icon size for sm */ },
  md: { width: "44px", height: "44px" },
  lg: { width: "56px", height: "56px" /* TODO: confirm icon size for lg */ },
};

export function ButtonIcon({
  type = "Default",
  size = "md",
  ariaLabel,
  icon,
  disabled = false,
  onClick,
  className,
}: ButtonIconProps) {
  return (
    <button
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      data-button-type={type}
      data-button-size={size}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--rounded-full, 120px)",
        borderWidth: "var(--width-1, 1px)",
        borderStyle: "solid",
        flexShrink: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        padding: 0,
        // TODO: Map background and border-color tokens per type and state.
        ...sizeStyles[size],
      }}
    >
      {/* Icon is hidden from assistive technology — the button's aria-label carries the accessible name. */}
      <span aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </span>
    </button>
  );
}
