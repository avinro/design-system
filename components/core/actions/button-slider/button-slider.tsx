/**
 * ButtonSlider — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5227:800
 * Figma frame name: "Button/Slider"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * INTERACTION PATTERN: Slide-to-confirm
 * The user drags the dark thumb from left to right across the track.
 * Reaching the end triggers the confirmation action.
 *
 * Confirmed from Figma:
 * - Track: 366×64px, pill (border-radius 100px), rgba(29,29,35,0.05) background, 4px inner padding
 * - Thumb (default): 80×56px, #1d1d23, pill, right-arrow icon (24×24px)
 * - Thumb (filled): 358×56px (full inner width), same background, icon at trailing edge
 * - Label: Google Sans Flex SemiBold, 16px, mix-blend-difference, always centered on track
 * - Letter-spacing: -0.4px (tight). Line-height: 1.2.
 *
 * NOTE: The label uses mix-blend-difference so it reads as light text over the dark thumb
 * and dark text over the light track, at all intermediate drag positions.
 *
 * TODO: Implement drag interaction (pointer/touch events, thumb position clamping).
 * TODO: Implement snap-back if released before threshold.
 * TODO: Confirm threshold percentage for triggering the filled/confirmed state.
 * TODO: Implement focus/keyboard alternative for accessibility (e.g., Enter/Space to confirm).
 * TODO: Define and implement disabled state.
 */

import React, { useState, useRef, useCallback } from "react";

export type ButtonSliderState = "default" | "filled";

export interface ButtonSliderProps {
  /** Text label displayed centered over the track. Keep short — whitespace-nowrap applies. */
  label: string;
  /**
   * Controlled visual state.
   * "default" = thumb at start. "filled" = thumb fully extended, action confirmed.
   * If provided, the component renders the given state statically (for documentation/preview use).
   * For interactive use, omit this and handle via onConfirm.
   */
  state?: ButtonSliderState;
  /** Called when the user slides the thumb to the end of the track. */
  onConfirm?: () => void;
  /** Whether the slider is disabled. TODO: Confirm disabled state appearance. */
  disabled?: boolean;
  /** The arrow icon element. Should be 24×24px. */
  icon?: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

// Dimensions confirmed from Figma.
const TRACK_WIDTH = 366;
const TRACK_HEIGHT = 64;
const TRACK_PADDING = 4;
const THUMB_DEFAULT_WIDTH = 80;
const THUMB_INNER_HEIGHT = 56; // TRACK_HEIGHT - TRACK_PADDING * 2
const THUMB_FILLED_WIDTH = TRACK_WIDTH - TRACK_PADDING * 2; // 358
// TODO: Confirm the threshold (e.g., 90%) at which the slider snaps to filled.
const CONFIRM_THRESHOLD = 0.9;

export function ButtonSlider({
  label,
  state: controlledState,
  onConfirm,
  disabled = false,
  icon,
  className,
}: ButtonSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [thumbX, setThumbX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // If a controlled state is provided, use it for static rendering.
  const isStaticFilled = controlledState === "filled";
  const isFilled = isStaticFilled || confirmed;

  const currentThumbWidth = isFilled
    ? THUMB_FILLED_WIDTH
    : THUMB_DEFAULT_WIDTH + thumbX;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || isFilled || controlledState) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
    },
    [disabled, isFilled, controlledState]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const maxDrag = THUMB_FILLED_WIDTH - THUMB_DEFAULT_WIDTH;
      const raw = e.clientX - rect.left - TRACK_PADDING - THUMB_DEFAULT_WIDTH / 2;
      const clamped = Math.max(0, Math.min(raw, maxDrag));
      setThumbX(clamped);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const maxDrag = THUMB_FILLED_WIDTH - THUMB_DEFAULT_WIDTH;
    if (thumbX / maxDrag >= CONFIRM_THRESHOLD) {
      setConfirmed(true);
      onConfirm?.();
    } else {
      // Snap back if threshold not reached.
      setThumbX(0);
    }
  }, [isDragging, thumbX, onConfirm]);

  return (
    <div
      ref={trackRef}
      className={className}
      role="button"
      aria-label={label}
      aria-pressed={isFilled}
      aria-disabled={disabled}
      style={{
        position: "relative",
        width: `${TRACK_WIDTH}px`,
        height: `${TRACK_HEIGHT}px`,
        padding: `${TRACK_PADDING}px`,
        background: "var(--button/secondary/bg-default, rgba(29,29,35,0.05))",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        cursor: disabled ? "not-allowed" : isFilled ? "default" : "grab",
        opacity: disabled ? 0.4 : 1,
        // TODO: Apply disabled token when defined.
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Thumb */}
      <div
        style={{
          width: `${currentThumbWidth}px`,
          height: `${THUMB_INNER_HEIGHT}px`,
          background: "var(--button/default/bg-default, #1d1d23)",
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
          flexShrink: 0,
          transition: isDragging ? "none" : "width 0.2s ease",
        }}
      >
        {/* Arrow icon — always at trailing edge of thumb */}
        <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>
          {icon ?? (
            // Fallback inline arrow if no icon prop provided.
            <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#f1f2f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </div>

      {/* Label — absolutely centered, mix-blend-difference for readability */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-family/headings, 'Google Sans Flex', sans-serif)",
          fontWeight: "var(--weight/semibold, 600)",
          fontSize: "var(--size/lg, 16px)",
          lineHeight: 1.2,
          letterSpacing: "var(--letter-spacing/tight, -0.4px)",
          color: "var(--text/invert, #f1f2f4)",
          mixBlendMode: "difference",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}
