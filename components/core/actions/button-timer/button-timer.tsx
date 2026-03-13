/**
 * ButtonTimer — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5223:3789
 * Figma frame name: "Button/Timer"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * INTERACTION PATTERN: Countdown-to-expire
 * A dark pill button with a fill overlay that grows left to right as time expires.
 * The user must tap to accept before the countdown reaches zero.
 *
 * Confirmed from Figma:
 * - Container: 303×56px, border-radius 120px (full pill), #1d1d23 background
 * - Fill overlay: absolutely positioned, mix-blend-multiply, grows from 0px to 303px (left to right)
 *   - State "full":   overlay width = 0px   (timer start, full time remaining)
 *   - State "middle": overlay width ~147px  (timer ~48.5% elapsed)
 *   - State "state3": overlay width = 303px (timer nearly expired)
 * - Label: Google Sans Flex Regular 16px, mix-blend-difference, text-invert (#f1f2f4), whitespace-nowrap
 *
 * NOTE: mix-blend-multiply on the fill overlay darkens the button progressively.
 *       mix-blend-difference on the label keeps it readable at all fill levels.
 *       Both blend modes are intentional — preserve in all implementations.
 *
 * TODO: Confirm the design token / color value for the fill overlay background.
 * TODO: Implement real countdown logic — drive fillProgress from a timer (0 to 1 over countdown duration).
 * TODO: Confirm animation easing and duration for fill overlay transition.
 * TODO: Confirm what happens when the timer expires without user action (auto-dismiss, disable, etc.).
 * TODO: Implement focus ring and keyboard activation (Enter / Space to accept).
 * TODO: Confirm ARIA approach for communicating countdown progress to screen readers.
 */

import React from "react";

export type ButtonTimerState = "full" | "middle" | "state3";

export interface ButtonTimerProps {
  /** Text label displayed centered over the button. Keep short — whitespace-nowrap applies. */
  label: string;
  /**
   * Static visual state for documentation/preview use.
   * - "full"   → fill overlay at 0% (timer just started)
   * - "middle" → fill overlay at ~48.5% (timer halfway)
   * - "state3" → fill overlay at 100% (timer nearly expired)
   * For interactive use, omit this and use fillProgress instead.
   */
  state?: ButtonTimerState;
  /**
   * Programmatic fill progress (0 to 1). Drives the fill overlay width in real-time.
   * 0 = no fill (timer start), 1 = full fill (timer expired).
   * If state is provided, fillProgress is ignored.
   */
  fillProgress?: number;
  /** Called when the user taps/clicks the button to accept. */
  onAccept?: () => void;
  /** Whether the button is disabled (e.g., after timer expiry). */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
}

// Dimensions confirmed from Figma.
const BUTTON_WIDTH = 303;
const BUTTON_HEIGHT = 56;
const BORDER_RADIUS = 120;

// Fill overlay widths for each named Figma state.
const STATE_FILL: Record<ButtonTimerState, number> = {
  full: 0,
  middle: 147, // ~48.5% of 303px
  state3: BUTTON_WIDTH, // 303px — full width
};

// TODO: Replace with confirmed design token.
const FILL_OVERLAY_COLOR = "#1d1d23";

export function ButtonTimer({
  label,
  state,
  fillProgress,
  onAccept,
  disabled = false,
  className,
}: ButtonTimerProps) {
  // Resolve overlay width from static state or dynamic progress.
  let overlayWidth: number;
  if (state) {
    overlayWidth = STATE_FILL[state];
  } else {
    const progress = Math.max(0, Math.min(fillProgress ?? 0, 1));
    overlayWidth = progress * BUTTON_WIDTH;
  }

  return (
    <button
      className={className}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onAccept}
      style={{
        position: "relative",
        width: `${BUTTON_WIDTH}px`,
        height: `${BUTTON_HEIGHT}px`,
        borderRadius: `${BORDER_RADIUS}px`,
        background: "var(--button/default/bg-default, #1d1d23)",
        border: "none",
        overflow: "hidden",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        // TODO: Apply disabled token when defined.
      }}
    >
      {/* Fill overlay — grows left to right as countdown progresses */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: `${overlayWidth}px`,
          height: "100%",
          background: FILL_OVERLAY_COLOR, // TODO: Replace with confirmed token.
          mixBlendMode: "multiply",
          // TODO: Add transition when animating in real-time (e.g., transition: "width 0.1s linear").
        }}
      />

      {/* Label — absolutely centered, mix-blend-difference for readability at all fill levels */}
      <span
        style={{
          position: "relative", // stacks above the overlay
          fontFamily: "var(--font-family/headings, 'Google Sans Flex', sans-serif)",
          fontWeight: 400, // Regular — confirmed from Figma
          fontSize: "var(--size/lg, 16px)",
          lineHeight: 1,
          letterSpacing: 0,
          color: "var(--text/invert, #f1f2f4)",
          mixBlendMode: "difference",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </span>
    </button>
  );
}
