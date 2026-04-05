/**
 * Badge — Reference implementation
 *
 * Two component sets:
 *
 * Badge/Main — Figma node 5050:816
 * Semantic status and state labels. Six types:
 * - "error"    (5050:817) — red.    Error, critical status, failed state.
 * - "info"     (5050:819) — blue.   Informational, pending, neutral metadata.
 * - "Success"  (5050:821) — green.  Completed, confirmed, active.
 * - "Warning"  (5050:823) — yellow. Cautionary, attention required.
 * - "default"  (5050:825) — gray.   Neutral label, no status meaning.
 * - "outlined" (5050:827) — border. De-emphasized, no background fill.
 *
 * Badge/Utility — Figma node 7538:204
 * Non-semantic identity/category labels. Five types (chart-pair token collection):
 * - "purple" (7538:205)
 * - "violet" (7538:208)
 * - "cyan"   (7538:211)
 * - "teal"   (7538:214)
 * - "pink"   (7538:217)
 *
 * Shared:
 * - Container: pill shape (border-radius: 9999px), padding 8px / 4px
 * - All types: Manrope SemiBold, 12px, whitespace-nowrap
 *
 * NOTE: 'Success' and 'Warning' are capitalized in the Figma prop.
 * Normalize to lowercase in implementation if preferred.
 *
 * NOTE: The --notification/warning--bg token uses a double dash. Confirmed from Figma.
 *
 * TODO: Confirm WCAG contrast ratios for all type combinations (Main and Utility).
 * TODO: Confirm dark mode resolved values for Badge/Utility types.
 * TODO: Confirm whether the purple variant's right padding (12px) is intentional.
 */

import React from "react";

export type BadgeMainType = "error" | "info" | "Success" | "Warning" | "default" | "outlined";
export type BadgeUtilityType = "purple" | "violet" | "cyan" | "teal" | "pink";
export type BadgeType = BadgeMainType | BadgeUtilityType;

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

// Badge/Main — all token values confirmed from Figma (node 5050:816).
const MAIN_TYPE_STYLES: Record<BadgeMainType, BadgeTypeStyle> = {
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

// Badge/Utility — token values from chart-pair collection (01. component-specific_colors).
// Extracted from Figma node 7538:204. Dark mode values not yet confirmed.
const UTILITY_TYPE_STYLES: Record<BadgeUtilityType, BadgeTypeStyle> = {
  purple: {
    background: "var(--chart-pair/purple-secondary, #e4dbfa)",
    color: "var(--chart-pair/purple-primary, #7749e4)",
  },
  violet: {
    background: "var(--chart-pair/violet-secondary, #f6d9ff)",
    color: "var(--chart-pair/violet-primary, #d243fe)",
  },
  cyan: {
    background: "var(--chart-pair/cyan-secondary, #d9f4ff)",
    color: "var(--chart-pair/cyan-primary, #38a9d5)",
  },
  teal: {
    background: "var(--chart-pair/teal-secondary, #cefaee)",
    color: "var(--chart-pair/teal-primary, #0ac0a1)",
  },
  pink: {
    background: "var(--chart-pair/pink-secondary, #ffdbe8)",
    color: "var(--chart-pair/pink-primary, #ff498b)",
  },
};

const TYPE_STYLES: Record<BadgeType, BadgeTypeStyle> = {
  ...MAIN_TYPE_STYLES,
  ...UTILITY_TYPE_STYLES,
};

const UTILITY_TYPES = new Set<BadgeType>(["purple", "violet", "cyan", "teal", "pink"]);

export function Badge({ type = "default", label, className }: BadgeProps) {
  const styles = TYPE_STYLES[type];
  const isUtility = UTILITY_TYPES.has(type);

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        // Badge/Utility uses icon-gap spacing (4px) matching Figma item-spacing.
        // Both sets share the same container padding.
        gap: isUtility ? "var(--spacing-4, 4px)" : undefined,
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
