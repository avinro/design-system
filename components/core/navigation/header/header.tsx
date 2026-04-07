/**
 * Header — Reference implementation
 *
 * Figma file: nGsiItayj12cfi3AKbP1mB (Dojo_DS Core), component set node: 7510:31628
 * Page: ❖ headers
 *
 * Three-zone layout: left (back/close), center (title | date | search), right (icons | action button).
 *
 * Variant axes from Figma (all boolean toggles):
 *   back        — back/close button on the left
 *   Title       — title text in center (default: visible)
 *   button      — accent action button on right (replaces icon buttons)
 *   search      — search bar in center (replaces title/date)
 *   no icon     — hide all right-side buttons
 *   description — subtitle below the title
 *   date        — date/month selector + chevron in center (replaces title)
 *
 * Confirmed from Figma:
 * - Width: 100%, height: 56px content (safe area NOT included — apply paddingTop externally)
 * - Padding: 16px horizontal, 8px vertical
 * - Background: surface/neutral/default (#f1f2f4)
 * - Title: Manrope Bold 24px, color/text/primary (#1d1d23)
 * - Description: Manrope Regular 14px, color/text/secondary (#636377)
 * - btn-header: 44×44px, transparent background, icon 24×24px
 * - Action button: pill (radius.full), height ~34px, 16px H padding, button/accent tokens
 * - Search: pill (radius.full), height 40px, input/bg-default fill
 * - Bottom border: managed by HeaderWrapper, not the header itself
 *
 * Center mode priority: search > date > title
 * Right zone priority: noIcon → nothing | actionButton → pill button | default → icon buttons
 *
 * Light/dark hex values for color tokens are TODO — confirm with design tokens team.
 *
 * TODO: Confirm back button icon variant (arrow_back vs close) per screen type.
 * TODO: Confirm search bar focus ring token.
 * TODO: Confirm date selector chevron rotation when picker is open.
 * TODO: Confirm btn-header pressed/active state token (button/secondary/bg-active).
 * TODO: Confirm action button exact height and padding from Figma.
 */

import React from "react";

export interface HeaderProps {
  // Left zone
  /** Show the back/close icon button on the left. */
  back?: boolean;
  /** Called when the back button is pressed. */
  onBackPress?: () => void;
  /** Override the back button icon. Defaults to a back-arrow SVG. */
  backIcon?: React.ReactNode;

  // Center zone — priority: search > date > title
  /** Title text. Hidden when search or date is active. */
  title?: string;
  /** Subtitle below the title. Only shown when title is also visible. */
  description?: string;

  /** Date/month selector label with a dropdown chevron (replaces title). */
  date?: string;
  /** Called when the date selector is tapped. */
  onDatePress?: () => void;

  /** Show the search bar in the center, replacing title/date. */
  search?: boolean;
  /** Controlled value for the search input. */
  searchValue?: string;
  /** Placeholder for the search input. */
  searchPlaceholder?: string;
  /** Called when the search input value changes. */
  onSearchChange?: (value: string) => void;
  /** Called when the search input is focused. */
  onSearchFocus?: () => void;
  /** Called when the clear (×) button inside the search bar is pressed. */
  onSearchClear?: () => void;

  // Right zone
  /** First right icon (24×24px element). Shows a btn-header wrapper around it. */
  rightIcon1?: React.ReactNode;
  /** Called when the first right icon button is pressed. */
  onRightIcon1Press?: () => void;
  /** Second right icon (24×24px element). */
  rightIcon2?: React.ReactNode;
  /** Called when the second right icon button is pressed. */
  onRightIcon2Press?: () => void;

  /** Accent action button label (e.g. "Finish"). Shows instead of icon buttons when set. */
  actionButton?: string;
  /** Called when the action button is pressed. */
  onActionButtonPress?: () => void;

  /** Hide all right-side buttons (icon buttons and action button). */
  noIcon?: boolean;

  className?: string;
}

// Figma variant node IDs for documentation reference
const VARIANT_NODE_IDS: Record<string, string> = {
  "back=off,title=on,right=icons":           "5009:2733",
  "back=on,title=on,right=icons":            "5010:315",
  "back=on,title=off,right=icons":           "5009:2761",
  "back=on,search=on,right=icons":           "5009:2768",
  "back=on,title=on,desc=on,right=icons":    "5009:2753",
  "back=on,title=on,right=button":           "5009:2749",
  "back=off,title=on,right=button":          "5075:1970",
  "back=off,title=on,date=on,right=icons":   "7510:31573",
  "back=on,title=on,date=on,right=icons":    "7511:31741",
  "back=on,title=on,right=none":             "5030:443",
  "back=off,title=on,right=none":            "5236:939",
};

// Minimal inline SVG icon fallbacks for the reference implementation
function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
    </svg>
  );
}

function SearchIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        fill="currentColor"
      />
    </svg>
  );
}

const iconButtonStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  background: "transparent",
  border: "none",
  borderRadius: "9999px",
  cursor: "pointer",
  color: "var(--color/text/primary, #1d1d23)",
  padding: 0,
};

export function Header({
  back,
  onBackPress,
  backIcon,
  title,
  description,
  date,
  onDatePress,
  search,
  searchValue = "",
  searchPlaceholder = "Search",
  onSearchChange,
  onSearchFocus,
  onSearchClear,
  rightIcon1,
  onRightIcon1Press,
  rightIcon2,
  onRightIcon2Press,
  actionButton,
  onActionButtonPress,
  noIcon,
  className,
}: HeaderProps) {
  const showSearch = Boolean(search);
  const showDate = !showSearch && Boolean(date);
  const showTitle = !showSearch && !showDate;

  const rightZone = noIcon ? "none" : actionButton ? "button" : "icons";

  // Build a key for the data-node-id lookup
  const nodeKey = [
    back ? "back=on" : "back=off",
    showSearch
      ? "search=on"
      : showDate
      ? "date=on"
      : title
      ? "title=on"
      : "title=off",
    description && showTitle ? "desc=on" : null,
    `right=${rightZone}`,
  ]
    .filter(Boolean)
    .join(",");

  // Add invisible spacers to keep the title optically centered:
  //   - Left spacer: when back=off and right icons are visible (balances the 44px right zone).
  //   - Right spacer: when back=on and noIcon=on (balances the 44px back button).
  // Note: when actionButton is set, the right zone is wider than 44px so the title
  // will not be perfectly centered. This is an accepted limitation of the 3-zone layout.
  const leftSpacer = !back && rightZone === "icons";
  const rightSpacer = Boolean(back) && rightZone === "none";

  return (
    <div
      className={className}
      data-name="Header"
      data-node-id={VARIANT_NODE_IDS[nodeKey] ?? "7510:31628"}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 56,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 8,
        boxSizing: "border-box",
        background: "var(--surface/neutral/default, #f1f2f4)",
        // Bottom border is handled by HeaderWrapper — not applied here.
      }}
    >
      {/* ── Left zone ── */}
      {back ? (
        <button
          aria-label="Go back"
          onClick={onBackPress}
          data-name="btn-header"
          data-node-id="5009:2787"
          style={iconButtonStyle}
        >
          {backIcon ?? <BackArrow />}
        </button>
      ) : leftSpacer ? (
        // Invisible spacer keeps title centered when right icons are present
        <div aria-hidden="true" style={{ width: 44, flexShrink: 0 }} />
      ) : null}

      {/* ── Center zone ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {showSearch && (
          // Search bar — Figma node: 5010:403
          <div
            data-name="Search"
            data-node-id="5010:403"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              width: "100%",
              height: 40,
              paddingLeft: 12,
              paddingRight: 12,
              background: "var(--input/bg-default, #e4e5ed)",
              borderRadius: "9999px",
              boxSizing: "border-box",
            }}
          >
            <SearchIconSvg />
            <input
              type="text"
              value={searchValue}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onFocus={onSearchFocus}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontFamily: "Manrope, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "var(--color/text/primary, #1d1d23)",
                outline: "none",
                minWidth: 0,
              }}
            />
            {searchValue && (
              <button
                aria-label="Clear search"
                onClick={onSearchClear}
                style={{ ...iconButtonStyle, width: 24, height: 24 }}
              >
                <CloseIconSvg />
              </button>
            )}
          </div>
        )}

        {showDate && (
          // Date/month selector — label + chevron, tapping opens a date picker
          <button
            aria-label="Open date picker"
            onClick={onDatePress}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "var(--color/text/primary, #1d1d23)",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 24,
                fontWeight: 700,
                lineHeight: "normal",
                color: "var(--color/text/primary, #1d1d23)",
              }}
            >
              {date}
            </span>
            <ChevronDown />
          </button>
        )}

        {showTitle && (
          <>
            {title && (
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: "normal",
                  color: "var(--color/text/primary, #1d1d23)",
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {title}
              </span>
            )}
            {title && description && (
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "normal",
                  color: "var(--color/text/secondary, #636377)",
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {description}
              </span>
            )}
          </>
        )}
      </div>

      {/* ── Right zone ── */}
      {rightZone === "none" ? (
        // Invisible spacer keeps title centered when back is on but no right content
        rightSpacer ? <div aria-hidden="true" style={{ width: 44, flexShrink: 0 }} /> : null
      ) : rightZone === "button" ? (
        <button
          onClick={onActionButtonPress}
          style={{
            height: 34,
            paddingLeft: 16,
            paddingRight: 16,
            background: "var(--button/accent/bg-active, #f97316)",
            border: "1px solid var(--button/accent/border-active, #f97316)",
            borderRadius: "9999px",
            fontFamily: "Manrope, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--button/accent/text-active, #ffffff)",
            cursor: "pointer",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {actionButton}
        </button>
      ) : (
        // Up to 2 icon buttons — btn-header pattern (44×44px, transparent bg)
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {rightIcon1 && (
            <button
              aria-label="Right action"
              onClick={onRightIcon1Press}
              data-name="btn-header"
              data-node-id="5009:2787"
              style={iconButtonStyle}
            >
              {rightIcon1}
            </button>
          )}
          {rightIcon2 && (
            <button
              aria-label="Second right action"
              onClick={onRightIcon2Press}
              data-name="btn-header"
              data-node-id="5009:2787"
              style={iconButtonStyle}
            >
              {rightIcon2}
            </button>
          )}
          {/* If no icons are provided but right zone is "icons", render a 44px spacer */}
          {!rightIcon1 && !rightIcon2 && (
            <div aria-hidden="true" style={{ width: 44, flexShrink: 0 }} />
          )}
        </div>
      )}
    </div>
  );
}
