/**
 * ActionMenu — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5009:2178
 * Figma frame name: "Action Menu"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * TWO VARIANTS:
 * - "sheet"   (Figma: "Variant3")    — 340px wide, radius 12px, drag handle, no shadow.
 *                                       Intended for bottom sheet presentation.
 * - "popover" (Figma: "Popover-view") — 180px wide, radius 8px, drop shadow, no handle.
 *                                       Intended for floating inline dropdown.
 *
 * Confirmed from Figma:
 * - Container background: var(--surface/neutral/default, #f1f2f4)
 * - Container vertical padding: 10px
 * - Sheet: width 340px, border-radius 12px, no shadow
 * - Popover: width 180px, border-radius 8px, box-shadow 0px 8px 12px rgba(0,0,0,0.16)
 * - Handle (Sheet only): 32×4px pill, background --handler/bg (#e4e5ed), centered at top
 * - Item: height 44px, padding 16px H / 5px V, icon 20×20px, gap 16px
 * - Label: Inter Medium 16px, color --text/primary (#1d1d23)
 *
 * TODO: Implement item-level hover, pressed, and focus states (not defined in Figma).
 * TODO: Implement dismiss behavior for Sheet (drag gesture, scrim tap).
 * TODO: Confirm whether destructive items need distinct styling.
 * TODO: Implement animation/transition for Sheet slide-up and Popover appearance.
 * TODO: Add ARIA role="menu" / role="menuitem" and focus management.
 */

import React from "react";

export type ActionMenuVariant = "sheet" | "popover";

export interface ActionMenuItemDef {
  /** Unique identifier for the item. */
  id: string;
  /** Visible label for the action. Keep short: verb + optional object. */
  label: string;
  /** Icon element (20×20px). Use an icon from the confirmed icon set. */
  icon: React.ReactNode;
  /** Called when the item is tapped/clicked. */
  onPress?: () => void;
  /** Whether the item is disabled. TODO: Confirm disabled appearance. */
  disabled?: boolean;
}

export interface ActionMenuProps {
  /** Presentation variant. "sheet" for bottom sheet; "popover" for floating dropdown. */
  variant?: ActionMenuVariant;
  /** List of action items to display. Confirmed sizes: 3 or 6 items. */
  items: ActionMenuItemDef[];
  /** Additional class names for the container. */
  className?: string;
}

// Dimensions confirmed from Figma.
const VARIANT_STYLES: Record<ActionMenuVariant, React.CSSProperties> = {
  sheet: {
    width: "340px",
    borderRadius: "12px",
    boxShadow: "none",
  },
  popover: {
    width: "180px",
    borderRadius: "8px",
    // elevation/dark/02
    boxShadow: "0px 8px 12px 0px rgba(0, 0, 0, 0.16)",
  },
};

function ActionMenuItem({ item, fullWidth }: { item: ActionMenuItemDef; fullWidth: boolean }) {
  return (
    <div
      role="menuitem"
      aria-disabled={item.disabled}
      onClick={item.disabled ? undefined : item.onPress}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        height: "44px",
        padding: "5px 16px",
        width: fullWidth ? "100%" : "340px",
        cursor: item.disabled ? "not-allowed" : "pointer",
        opacity: item.disabled ? 0.4 : 1,
        // TODO: Apply confirmed hover/pressed background token when defined.
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Icon — 20×20px */}
      <span
        aria-hidden="true"
        style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span
        style={{
          flex: "1 0 0",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "normal",
          letterSpacing: 0,
          color: "var(--text/primary, #1d1d23)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.label}
      </span>
    </div>
  );
}

export function ActionMenu({
  variant = "sheet",
  items,
  className,
}: ActionMenuProps) {
  const isSheet = variant === "sheet";
  const isFullWidth = variant === "popover"; // popover items fill 100% of the narrower container

  return (
    <div
      className={className}
      role="menu"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "10px 0",
        background: "var(--surface/neutral/default, #f1f2f4)",
        ...VARIANT_STYLES[variant],
        boxSizing: "border-box",
      }}
    >
      {/* Drag handle — Sheet variant only */}
      {isSheet && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "32px",
            height: "4px",
            borderRadius: "10px",
            background: "var(--handler/bg, #e4e5ed)",
          }}
        />
      )}

      {/* Menu items */}
      {items.map((item) => (
        <ActionMenuItem key={item.id} item={item} fullWidth={isFullWidth} />
      ))}
    </div>
  );
}
