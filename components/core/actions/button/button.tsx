/**
 * Button — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 17:14613
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * Confirmed from Figma:
 * - 6 types: Primary, Accent, Secondary, No-fill, Outlined, Destructive
 * - 3 sizes: sm (32px), md (44px), lg (56px)
 * - 5 states: Default, Hover, Pressed, Disabled, Focus
 * - Optional left icon (16×16px)
 * - Optional right icon / dropdown chevron (16×16px)
 * - Pill shape: border-radius var(--rounded-full, 120px)
 * - Font: Manrope SemiBold, 14px (md), line-height 1.4
 */

import React from "react";

export type ButtonType =
  | "Primary"
  | "Accent"
  | "Secondary"
  | "No-fill"
  | "Outlined"
  | "Destructive";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  /** Visual type that determines color and hierarchy. */
  type?: ButtonType;
  /** Height size of the button. */
  size?: ButtonSize;
  /** Button label. Required. */
  label: string;
  /** Optional leading icon element (16×16px recommended). */
  leftIcon?: React.ReactNode;
  /** Optional trailing icon element (16×16px). Use only for dropdown triggers. */
  rightIcon?: React.ReactNode;
  /** Whether the button is disabled. Renders disable state. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional class names for the host element. */
  className?: string;
}

// TODO: Replace inline style values with project design tokens.
const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: "32px", padding: "0 var(--spacing-10, 10px)", fontSize: "var(--size/sm, 12px)" /* TODO: confirm */ },
  md: { height: "44px", padding: "0 var(--spacing-12, 12px)", fontSize: "var(--size/base, 14px)" },
  lg: { height: "56px", padding: "0 var(--spacing-16, 16px)", fontSize: "var(--size/lg, 16px)" /* TODO: confirm */ },
};

export function Button({
  type = "Primary",
  size = "md",
  label,
  leftIcon,
  rightIcon,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      data-button-type={type}
      data-button-size={size}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--spacing-8, 8px)",
        borderRadius: "var(--rounded-full, 120px)",
        borderWidth: "var(--width-1, 1px)",
        borderStyle: "solid",
        fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
        fontWeight: "var(--weight/semibold, 600)",
        lineHeight: 1.4,
        letterSpacing: "var(--letter-spacing/normal, 0px)",
        whiteSpace: "nowrap",
        cursor: disabled ? "not-allowed" : "pointer",
        // TODO: Map background, border-color, and text-color tokens per type and state.
        ...sizeStyles[size],
      }}
    >
      {leftIcon && (
        <span aria-hidden="true" style={{ width: 16, height: 16, flexShrink: 0 }}>
          {leftIcon}
        </span>
      )}
      <span>{label}</span>
      {rightIcon && (
        // TODO: If this is a dropdown trigger, add aria-expanded and aria-haspopup to the parent button.
        <span aria-hidden="true" style={{ width: 16, height: 16, flexShrink: 0 }}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}
