/**
 * Badge — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5050:816
 * Figma frame name: "Badge"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * SIX TYPES:
 * - "error"    (5050:817) — red.    Error, critical status, failed state.
 * - "info"     (5050:819) — blue.   Informational, pending, neutral metadata.
 * - "Success"  (5050:821) — green.  Completed, confirmed, active.
 * - "Warning"  (5050:823) — yellow. Cautionary, attention required.
 * - "default"  (5050:825) — gray.   Neutral label, no status meaning.
 * - "outlined" (5050:827) — border. De-emphasized, no background fill.
 *
 * Confirmed from Figma:
 * - Container: pill shape (border-radius: 9999px), padding 8px / 4px
 * - All types: same text style — Manrope SemiBold, 12px, whitespace-nowrap
 * - outlined type: 1px solid border, no background, text same as default
 *
 * NOTE: 'Success' and 'Warning' are capitalized in the Figma prop.
 * Normalize to lowercase in implementation if preferred.
 *
 * NOTE: The --notification/warning--bg token uses a double dash. Confirmed from Figma.
 *
 * TODO: Confirm whether a dismissible or icon variant is planned.
 * TODO: Confirm WCAG contrast ratios for all type combinations.
 */

import React from "react";

export type BadgeType = "error" | "info" | "Success" | "Warning" | "default" | "outlined";

export interface BadgeProps {
  /** Badge type. Controls background color, text color, and border. */
  type?: BadgeType;
  /** Text label. Keep short (1–3 words). whitespace-nowrap is applied. */
  label: string;
  /** Additional class names. */
  className?: string;
}

type BadgeTypeStyle = {
  background: string;
  color: string;
  border?: string;
};

// All token values confirmed from Figma.
const TYPE_STYLES: Record<BadgeType, BadgeTypeStyle> = {
  error: {
    background: "var(--notification/error-bg, #fcdcdc)",
    color: "var(--notification/error-text, #a43636)",
  },
  info: {
    background: "var(--notification/info-bg, #d4e3ff)",
    color: "var(--notification/info-text, #1a4dac)",
  },
  Success: {
    background: "var(--notification/success-bg, #d5f4d6)",
    color: "var(--notification/success-text, #176719)",
  },
  Warning: {
    // Note: token name uses double dash (warning--bg) — confirmed from Figma.
    background: "var(--notification/warning--bg, #f6e3a4)",
    color: "var(--notification/warning-text, #775c01)",
  },
  default: {
    background: "var(--badge/default/bg, #e4e5ed)",
    color: "var(--badge/default/text, #34353f)",
  },
  outlined: {
    background: "transparent",
    color: "var(--badge/default/text, #34353f)",
    border: "1px solid var(--badge/outlined/border, #cccdda)",
  },
};

export function Badge({ type = "default", label, className }: BadgeProps) {
  const styles = TYPE_STYLES[type];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-4, 4px) var(--spacing-8, 8px)",
        borderRadius: "9999px",
        background: styles.background,
        border: styles.border ?? "none",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: "var(--weight/semibold, 600)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--size/xs, 12px)",
          lineHeight: 1.2,
          letterSpacing: "var(--letter-spacing/normal, 0px)",
          color: styles.color,
          whiteSpace: "nowrap",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
    </div>
  );
}
