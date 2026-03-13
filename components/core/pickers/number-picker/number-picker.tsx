// Number Picker — reference component
// Adapted from Figma DS Core node 5132:396
// A drum-style scroll picker for selecting a single numeric value.
// Uses the same scroll depth visual system as Time Date Picker and Month Year Picker.
// Stack note: adapt styling tokens and scroll behaviour to your project's system.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NumberPickerType = "end" | "middle" | "travelers";

type DrumPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ColumnItem = {
  value: string;
  position: DrumPosition;
  /**
   * When true, renders the item with transparent text color (boundary masking).
   * Used for start-of-range positions (1–3) in type=end and type=travelers.
   * Differs from Month Year Picker which uses opacity-0 for end-of-range masking.
   */
  transparent?: boolean;
};

// ---------------------------------------------------------------------------
// Scroll depth visual system
// Identical to Time Date Picker and Month Year Picker — all three share this system.
// ---------------------------------------------------------------------------

const drumPositionStyles: Record<
  DrumPosition,
  { fontSize: string; opacity: number; color: string }
> = {
  1: { fontSize: "12px", opacity: 0.4, color: "var(--text/placeholder, #636377)" },
  2: { fontSize: "14px", opacity: 0.7, color: "var(--text/placeholder, #636377)" },
  3: { fontSize: "18px", opacity: 1.0, color: "var(--text/placeholder, #636377)" },
  4: { fontSize: "23px", opacity: 1.0, color: "var(--text/primary, #1d1d23)" },
  5: { fontSize: "18px", opacity: 1.0, color: "var(--text/placeholder, #636377)" },
  6: { fontSize: "14px", opacity: 0.7, color: "var(--text/placeholder, #636377)" },
  7: { fontSize: "12px", opacity: 0.4, color: "var(--text/placeholder, #636377)" },
};

// ---------------------------------------------------------------------------
// DrumColumn — a single scrollable column
// ---------------------------------------------------------------------------

type DrumColumnProps = {
  items: ColumnItem[];
  "aria-label": string;
};

function DrumColumn({ items, "aria-label": ariaLabel }: DrumColumnProps) {
  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {items.map((item, i) => {
        const style = drumPositionStyles[item.position];
        const isSelected = item.position === 4;
        return (
          <div
            key={i}
            role="option"
            aria-selected={isSelected}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: style.fontSize,
              opacity: style.opacity,
              // Boundary masking: transparent text color (not opacity-0)
              color: item.transparent ? "transparent" : style.color,
              fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
              fontWeight: "var(--weight/regular, 400)",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            <p>{item.value || "\u00A0"}</p>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// NumberPicker
// ---------------------------------------------------------------------------

export type NumberPickerProps = {
  /**
   * Controls the boundary condition of the value column.
   * - "end"       → the selected value is the minimum; positions 1–3 use transparent text.
   * - "middle"    → the selected value is mid-range; all 7 positions are visible.
   * - "travelers" → like "end", but the minimum value is labeled "Only me".
   */
  type?: NumberPickerType;
  /**
   * The currently selected value.
   * - For type="end" and type="middle": a number (e.g., 1, 5).
   * - For type="travelers": 0 represents "Only me"; positive integers are numeric values.
   * In production, derive column scroll positions from this value.
   */
  selectedValue?: number;
  /**
   * The minimum available value (inclusive).
   * Defaults to 1. For type=travelers, 0 represents "Only me".
   */
  minValue?: number;
  /**
   * Optional aria-label for the value column.
   * Defaults to "Value". Set this to match the popup context (e.g., "Passenger capacity").
   */
  columnLabel?: string;
  className?: string;
};

function getItemLabel(value: number, type: NumberPickerType, minValue: number): string {
  if (type === "travelers" && value === minValue) {
    return "Only me";
  }
  // Zero-pad single-digit values to match Figma (e.g., "01")
  return value < 10 ? `0${value}` : String(value);
}

/**
 * NumberPicker
 *
 * Drum-style scroll picker for a single numeric value.
 * Displays one center-aligned column.
 *
 * Variants:
 * - type=end       → minimum value selected; positions 1–3 masked with transparent text.
 * - type=middle    → mid-range value selected; all 7 positions visible.
 * - type=travelers → like end, but minimum is labeled "Only me".
 *
 * Shares the scroll depth visual system with Time Date Picker and Month Year Picker.
 *
 * @see components/number-picker/index.mdx
 */
export default function NumberPicker({
  type = "end",
  selectedValue = 1,
  minValue = type === "travelers" ? 0 : 1,
  columnLabel = "Value",
  className,
}: NumberPickerProps) {
  const isStartBoundary = type === "end" || type === "travelers";

  // Build value column: 7 items centred on selectedValue (position 4).
  const columnItems: ColumnItem[] = Array.from({ length: 7 }, (_, i) => {
    const position = (i + 1) as DrumPosition;
    const offset = i - 3; // positions 1–7 → offsets -3 to +3
    const rawValue = selectedValue + offset;
    const isBelowMin = rawValue < minValue;
    // In start-of-range variants, positions 1–3 (offset -3 to -1) are masked.
    const isAboveBoundary = isStartBoundary && offset < 0;

    return {
      value: isBelowMin || isAboveBoundary ? "\u00A0" : getItemLabel(rawValue, type, minValue),
      position,
      transparent: isAboveBoundary,
    };
  });

  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--surface/neutral/default, #f1f2f4)",
        width: "375px",
        height: "212px",
        position: "relative",
      }}
      data-name="Number_Picker"
    >
      {/* Selection indicator stripe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          height: "31px",
          // TODO: Replace with confirmed CSS implementation.
          borderTop: "1px solid var(--divider/default, rgba(29,29,35,0.12))",
          borderBottom: "1px solid var(--divider/default, rgba(29,29,35,0.12))",
          pointerEvents: "none",
        }}
      />

      {/* Value column — centred */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: 400,
        }}
      >
        <DrumColumn items={columnItems} aria-label={columnLabel} />
      </div>
    </div>
  );
}
