/**
 * ActionMenuItem — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5126:426
 * Figma frame name: "Action Menu Item"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * THREE CONTENT TYPES:
 * - "only Title"           (node 5086:602)  — icon + title + right icon
 * - "title + description"  (node 5126:427)  — icon + title + description + right icon
 * - "full"                 (node 5126:437)  — icon + subtitle + title + description + right icon
 *
 * Confirmed from Figma:
 * - Container: 426px wide, min-height 56px, padding 8px, background --surface/neutral/default (#f1f2f4)
 * - Gap between icon and text container: --spacing-12 (12px)
 * - Text container max-width: 280px; line gap (multi-line): --spacing-4 (4px)
 * - Left icon: 24×24px, optional (default: shown). Placeholder: Customer-Icon/phone-call
 * - Right icon: 22×22px, optional (default: chevron-right). Replaceable via rightIconElement
 * - Title: Manrope SemiBold, --size/base (14px), --text/primary (#1d1d23), line-height 1.2
 * - Description / Subtitle: Manrope Regular, --size/xs (12px), --text/placeholder (#636377), line-height 1.2
 *
 * TODO: Implement item-level hover, pressed, and focus states (not defined in Figma).
 * TODO: Implement disabled state appearance.
 * TODO: Confirm ARIA role — menuitem (inside Action Menu) or listitem (other list contexts).
 */

import React from "react";

export type ActionMenuItemType = "only Title" | "title + description" | "full";

export interface ActionMenuItemProps {
  /** Content type. Controls which text elements are displayed. Default: "only Title". */
  type?: ActionMenuItemType;
  /** Primary action label. Always required. Keep short: verb + optional object. */
  title: string;
  /** Supporting text below the title. Shown in "title + description" and "full" types. */
  description?: string;
  /** Small label above the title. Shown in "full" type only. */
  subtitle?: string;
  /** Whether to show the left icon. Default: true. */
  leftIcon?: boolean;
  /** Left icon element (24×24px). Provide an icon from the confirmed icon set. */
  leftIconElement?: React.ReactNode;
  /** Whether to show the right icon. Default: true. */
  rightIcon?: boolean;
  /** Custom right icon element (22×22px). Defaults to a chevron-right. */
  rightIconElement?: React.ReactNode;
  /** Called when the item is tapped/clicked. */
  onPress?: () => void;
  /** Whether the item is disabled. TODO: Confirm disabled appearance. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
}

/** Default chevron-right icon. Replace with confirmed icon component. */
function DefaultRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M8.5 5.5L14 11L8.5 16.5"
        stroke="#1d1d23"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ActionMenuItem({
  type = "only Title",
  title,
  description,
  subtitle,
  leftIcon = true,
  leftIconElement,
  rightIcon = true,
  rightIconElement,
  onPress,
  disabled = false,
  className,
}: ActionMenuItemProps) {
  const isMultiLine = type === "title + description" || type === "full";
  const isFull = type === "full";

  // Shared text styles
  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
    fontWeight: "var(--weight/semibold, 600)" as React.CSSProperties["fontWeight"],
    fontSize: "var(--size/base, 14px)",
    lineHeight: 1.2,
    letterSpacing: "var(--letter-spacing/normal, 0px)",
    color: "var(--text/primary, #1d1d23)",
    whiteSpace: type === "only Title" ? "nowrap" : undefined,
    flexShrink: 0,
    position: "relative",
    minWidth: isMultiLine ? "100%" : undefined,
  };

  const secondaryTextStyle: React.CSSProperties = {
    fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
    fontWeight: "var(--weight/regular, 400)" as React.CSSProperties["fontWeight"],
    fontSize: "var(--size/xs, 12px)",
    lineHeight: 1.2,
    letterSpacing: "var(--letter-spacing/normal, 0px)",
    color: "var(--text/placeholder, #636377)",
    flexShrink: 0,
    position: "relative",
    minWidth: isMultiLine ? "100%" : undefined,
  };

  return (
    <div
      className={className}
      role="menuitem"
      aria-disabled={disabled}
      onClick={disabled ? undefined : onPress}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-12, 12px)",
        minHeight: "56px",
        padding: "var(--spacing-8, 8px)",
        width: "426px",
        background: "var(--surface/neutral/default, #f1f2f4)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        boxSizing: "border-box",
        position: "relative",
        // TODO: Apply confirmed hover/pressed background token when defined.
      }}
    >
      {/* Left icon — 24×24px, optional */}
      {leftIcon && (
        <span
          aria-hidden="true"
          style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {leftIconElement ?? (
            // Placeholder — replace with the appropriate Customer-Icon component.
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="#1d1d23" strokeWidth="1.5" />
            </svg>
          )}
        </span>
      )}

      {/* Text container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          flex: "1 0 0",
          gap: isMultiLine ? "var(--spacing-4, 4px)" : undefined,
          maxWidth: "280px",
          minWidth: 0,
          position: "relative",
          lineHeight: isMultiLine ? 1.2 : undefined,
          letterSpacing: isMultiLine ? "var(--letter-spacing/normal, 0px)" : undefined,
        }}
      >
        {/* Subtitle — "full" type only, shown above title */}
        {isFull && subtitle && (
          <p style={{ ...secondaryTextStyle, whiteSpace: "nowrap" }}>{subtitle}</p>
        )}

        {/* Title — always shown */}
        <p style={titleStyle}>{title}</p>

        {/* Description — "title + description" and "full" types */}
        {(type === "title + description" || isFull) && description && (
          <p style={secondaryTextStyle}>{description}</p>
        )}
      </div>

      {/* Right icon — 22×22px, optional */}
      {rightIcon && (
        <span
          aria-hidden="true"
          style={{ width: 22, height: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
        >
          {rightIconElement ?? <DefaultRightIcon />}
        </span>
      )}
    </div>
  );
}
