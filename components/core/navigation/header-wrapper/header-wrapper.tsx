/**
 * HeaderWrapper — Reference implementation
 *
 * Figma file: nGsiItayj12cfi3AKbP1mB (Dojo_DS Core), component set node: 7511:31768
 * Page: ❖ headers
 *
 * Single-prop wrapper that controls whether the Header has rounded bottom corners.
 *
 * The `bg` prop describes the background color of the PAGE CONTENT BELOW the header —
 * not the header's own background. The header background is always surface/neutral/default.
 *
 * bg="sunken"
 *   The page below uses the surface/sunken color token (darker, recessed background).
 *   The wrapper applies 24px rounded bottom-left and bottom-right corners so the header
 *   visually floats above the lower content.
 *   Figma node: 7511:31767 — radius.2xl (VariableID:5001:1944)
 *
 * bg="surface"
 *   The page below uses the surface/default color token (same tone as the header).
 *   No rounding — the header is flush with the page content.
 *   Figma node: 7511:31769 — radius.none (VariableID:5001:1953)
 *
 * Both variants share a 1px bottom stroke: notification/border-default (VariableID:7013:32).
 * The wrapper uses overflow:hidden to clip the inner Header to the border-radius shape,
 * matching Figma's clipsContent: true behavior.
 *
 * Always wrap a Header instance in HeaderWrapper when placing it on a screen.
 * Never apply corner-radius overrides directly on the inner Header.
 *
 * Light/dark hex values for color tokens are TODO — confirm with design tokens team.
 *
 * TODO: Confirm notification/border-default hex fallback for dark mode.
 */

import React from "react";

export interface HeaderWrapperProps {
  /**
   * The background color token used by the page content BELOW the header.
   *   "sunken"  → surface/sunken below → 24px bottom corners (header floats)
   *   "surface" → surface/default below → 0px corners (header is flush)
   */
  bg: "sunken" | "surface";
  /** Should be a <Header /> instance. */
  children: React.ReactNode;
  className?: string;
}

// Figma node IDs for the two variants
const VARIANT_NODE_IDS: Record<HeaderWrapperProps["bg"], string> = {
  sunken:  "7511:31767",
  surface: "7511:31769",
};

export function HeaderWrapper({ bg, children, className }: HeaderWrapperProps) {
  const isSunken = bg === "sunken";

  return (
    <div
      className={className}
      data-name="header-wrapper"
      data-node-id={VARIANT_NODE_IDS[bg]}
      style={{
        // Bottom corners: 24px for sunken, 0 for surface
        borderBottomLeftRadius:  isSunken ? "var(--radius-2xl, 24px)" : "var(--radius-none, 0px)",
        borderBottomRightRadius: isSunken ? "var(--radius-2xl, 24px)" : "var(--radius-none, 0px)",
        borderTopLeftRadius:  0,
        borderTopRightRadius: 0,
        // Clip inner Header to the border-radius shape (Figma: clipsContent: true)
        overflow: "hidden",
        // Bottom stroke separating header from page content — both variants
        borderBottom: "1px solid var(--notification/border-default, #e4e5ed)",
        // Width matches the screen
        width: "100%",
        // Height is determined by the inner Header instance
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
