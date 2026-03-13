// Month Year Picker — reference component
// Adapted from Figma DS Core node 5129:1279
// A drum-style scroll picker for month and year selection.
// Uses the same scroll depth visual system as Time Date Picker.
// Stack note: adapt styling tokens and scroll behaviour to your project's system.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MonthYearPickerType = "end" | "middle";

type DrumPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ColumnItem = {
  value: string;
  position: DrumPosition;
  /** When true, renders as opacity-0 (boundary masking). */
  hidden?: boolean;
};

// ---------------------------------------------------------------------------
// Scroll depth visual system
// Identical to Time Date Picker — both share this system.
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
  align?: "left" | "center" | "right";
  "aria-label": string;
};

function DrumColumn({ items, align = "center", "aria-label": ariaLabel }: DrumColumnProps) {
  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems:
          align === "right" ? "flex-end" : align === "left" ? "flex-start" : "center",
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
              visibility: item.hidden ? "hidden" : "visible",
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
// MonthYearPicker
// ---------------------------------------------------------------------------

export type MonthYearPickerProps = {
  /**
   * Controls the boundary condition of the year column.
   * - "end"    → the selected year is the most recent; positions 5–7 are hidden.
   * - "middle" → the selected year is mid-range; all 7 positions are visible.
   */
  type?: MonthYearPickerType;
  /**
   * The currently selected month (1 = January … 12 = December).
   * In production, derive column scroll positions from this value.
   */
  selectedMonth?: number;
  /**
   * The currently selected year (4-digit, e.g. 2026).
   * In production, derive column scroll positions from this value.
   */
  selectedYear?: number;
  className?: string;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * MonthYearPicker
 *
 * Drum-style scroll picker for month and year selection.
 * Displays two columns: Month (right-aligned) and Year (left-aligned).
 *
 * Used inside the "Month and Year" bottom-sheet popup on the Plan page.
 * Triggered by tapping the month/year label in the Plan page Header.
 * Confirms the selection and updates Calendar Plan Page to the chosen period.
 *
 * Shares the scroll depth visual system with Time Date Picker.
 *
 * @see components/month-year-picker/index.mdx
 */
export default function MonthYearPicker({
  type = "end",
  selectedMonth = 1,   // January
  selectedYear = 2026,
  className,
}: MonthYearPickerProps) {
  const isEnd = type === "end";

  // Build month column: 7 items centred on selectedMonth (position 4).
  // Months wrap cyclically (Dec → Jan).
  const monthItems: ColumnItem[] = Array.from({ length: 7 }, (_, i) => {
    const position = (i + 1) as DrumPosition;
    const offset = i - 3; // positions 1–7 → offsets -3 to +3
    const monthIndex = ((selectedMonth - 1 + offset + 12 * 10) % 12);
    return { value: MONTH_NAMES[monthIndex], position };
  });

  // Build year column: 7 items centred on selectedYear (position 4).
  // In "end" mode, positions 5–7 (future years) are hidden.
  const yearItems: ColumnItem[] = Array.from({ length: 7 }, (_, i) => {
    const position = (i + 1) as DrumPosition;
    const offset = i - 3; // -3 to +3
    const year = selectedYear + offset;
    const isFuture = offset > 0;
    return {
      value: String(year),
      position,
      hidden: isEnd && isFuture,
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
      data-name="Month_Year_Picker"
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

      {/* Column group */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "27px",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: 400,
        }}
      >
        <DrumColumn items={monthItems} align="right" aria-label="Month" />
        <DrumColumn items={yearItems}  align="left"  aria-label="Year" />
      </div>
    </div>
  );
}
