// Age Range Picker — reference component
// Adapted from Figma DS Core node 5147:2258
// A drum-style scroll picker for selecting an age range (from age and to age).
// Displays two drum columns with interleaved "from" and "to" static labels.
// Uses the same scroll depth visual system as Time Picker, Time Date Picker,
// Month Year Picker, and Number Picker.
// Stack note: adapt styling tokens and scroll behaviour to your project's system.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DrumPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ColumnItem = {
  value: string;
  position: DrumPosition;
  /** When true, renders with opacity: 0 (boundary masking). */
  hidden?: boolean;
};

// ---------------------------------------------------------------------------
// Scroll depth visual system
// Identical to Time Picker, Time Date Picker, Month Year Picker, Number Picker.
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
              opacity: item.hidden ? 0 : style.opacity,
              color: style.color,
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
// Column builder
// ---------------------------------------------------------------------------

/**
 * Builds 7 column items centred on the selected age value.
 *
 * @param selectedAge  The age value at position 4 (selected/centre).
 * @param maskStart    When true, positions 1–3 use opacity: 0 (start-of-range boundary).
 */
function buildAgeItems(selectedAge: number, maskStart: boolean): ColumnItem[] {
  return Array.from({ length: 7 }, (_, i) => {
    const position = (i + 1) as DrumPosition;
    const offset = i - 3; // -3 to +3
    const age = selectedAge + offset;
    const isAboveBoundary = maskStart && offset < 0;
    return {
      value: isAboveBoundary ? "\u00A0" : String(Math.max(0, age)),
      position,
      hidden: isAboveBoundary,
    };
  });
}

// ---------------------------------------------------------------------------
// AgeRangePicker
// ---------------------------------------------------------------------------

export type AgeRangePickerProps = {
  /**
   * The currently selected "from" age (minimum of the range).
   * Positions 1–3 of the from-age column are masked with opacity: 0
   * to indicate the start-of-range boundary.
   * In production, derive column scroll position from this value.
   */
  fromAge?: number;
  /**
   * The currently selected "to" age (maximum of the range).
   * All 7 column positions are visible (mid-range behaviour).
   * In production, derive column scroll position from this value.
   */
  toAge?: number;
  className?: string;
};

/**
 * AgeRangePicker
 *
 * Drum-style scroll picker for selecting an age range.
 * Displays two drum columns — "from age" and "to age" — with interleaved
 * "from" and "to" static labels between them.
 *
 * The from-age column always shows start-of-range boundary masking (positions 1–3
 * use opacity: 0). The to-age column shows all 7 positions (mid-range).
 *
 * Shares the scroll depth visual system with Time Picker, Time Date Picker,
 * Month Year Picker, and Number Picker.
 *
 * Used inside the "Select age range" bottom-sheet popup in the Customer App.
 * Triggered by the Dojo AI chat assistant in reservation flows.
 *
 * @see components/age-range-picker/index.mdx
 */
export default function AgeRangePicker({
  fromAge = 18,
  toAge = 41,
  className,
}: AgeRangePickerProps) {
  // From-age column: positions 1–3 masked (start-of-range boundary)
  const fromItems = buildAgeItems(fromAge, true);
  // To-age column: all 7 positions visible (mid-range)
  const toItems = buildAgeItems(toAge, false);

  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--surface/neutral/default, #f1f2f4)",
        width: "375px",
        height: "212px",
        position: "relative",
      }}
      data-name="age-range_picker"
    >
      {/* Selection indicator stripe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "calc(50% + 0.5px)",
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

      {/* Column group — 4px right offset from centre (confirmed from Figma) */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% + 0.5px)",
          left: "calc(50% + 4px)",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "27px",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
        }}
      >
        {/* "from" label — Manrope Medium, 14px, --text/placeholder */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
            fontWeight: "var(--weight/medium, 500)",
            fontSize: "var(--size/base, 14px)",
            letterSpacing: "var(--letter-spacing/normal, 0px)",
            lineHeight: 1.4,
            color: "var(--text/placeholder, #636377)",
          }}
        >
          <p>from</p>
        </div>

        <DrumColumn items={fromItems} aria-label="From age" />

        {/* "to" label — same style as "from" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
            fontWeight: "var(--weight/medium, 500)",
            fontSize: "var(--size/base, 14px)",
            letterSpacing: "var(--letter-spacing/normal, 0px)",
            lineHeight: 1.4,
            color: "var(--text/placeholder, #636377)",
          }}
        >
          <p>to</p>
        </div>

        <DrumColumn items={toItems} aria-label="To age" />
      </div>
    </div>
  );
}
