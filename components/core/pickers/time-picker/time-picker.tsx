// Time Picker — reference component
// Adapted from Figma DS Core node 5146:2125
// A drum-style scroll picker for time-of-day selection (Hour, Minute, AM/PM).
// Uses the same scroll depth visual system as Time Date Picker, Month Year Picker, and Number Picker.
// Distinct from Time Date Picker: has 3 columns (no Date column).
// Stack note: adapt styling tokens and scroll behaviour to your project's system.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TimePeriod = "AM" | "PM";

type DrumPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ColumnItem = {
  value: string;
  position: DrumPosition;
  /** When true, renders the item with opacity: 0. Used for unpopulated AM/PM slots. */
  hidden?: boolean;
};

// ---------------------------------------------------------------------------
// Scroll depth visual system
// Identical to Time Date Picker, Month Year Picker, and Number Picker.
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
// Column builders
// ---------------------------------------------------------------------------

function buildHourItems(selectedHour: number): ColumnItem[] {
  return Array.from({ length: 7 }, (_, i) => {
    const position = (i + 1) as DrumPosition;
    const offset = i - 3; // -3 to +3
    // 12-hour wrap: ((h - 1 + offset + 120) % 12) + 1
    const hour = ((selectedHour - 1 + offset + 120) % 12) + 1;
    return { value: String(hour), position };
  });
}

function buildMinuteItems(selectedMinute: number): ColumnItem[] {
  return Array.from({ length: 7 }, (_, i) => {
    const position = (i + 1) as DrumPosition;
    const offset = i - 3;
    const minute = ((selectedMinute + offset + 600) % 60);
    const label = minute < 10 ? `0${minute}` : String(minute);
    return { value: label, position };
  });
}

/**
 * AM/PM column — only 2 of 7 slots are populated.
 *
 * AM selected: AM at pos 4, PM at pos 5. Positions 1–3 and 6–7 are hidden (opacity: 0).
 * PM selected: AM at pos 3, PM at pos 4. Positions 1–2 and 5–7 are hidden (opacity: 0).
 */
function buildAmPmItems(period: TimePeriod): ColumnItem[] {
  const isAm = period === "AM";
  return [
    { value: "\u00A0", position: 1, hidden: true },
    { value: "\u00A0", position: 2, hidden: true },
    { value: isAm ? "\u00A0" : "AM", position: 3, hidden: isAm },
    { value: isAm ? "AM" : "PM",     position: 4 },
    { value: isAm ? "PM" : "\u00A0", position: 5, hidden: !isAm },
    { value: "\u00A0", position: 6, hidden: true },
    { value: "\u00A0", position: 7, hidden: true },
  ];
}

// ---------------------------------------------------------------------------
// TimePicker
// ---------------------------------------------------------------------------

export type TimePickerProps = {
  /**
   * The selected time period.
   * - "AM" → AM at position 4 (centre); PM visible at position 5.
   * - "PM" → PM at position 4 (centre); AM visible at position 3.
   * Maps to Figma prop PM=off (AM) and PM=on (PM).
   */
  period?: TimePeriod;
  /**
   * The currently selected hour (1–12, 12-hour format).
   * In production, derive column scroll position from this value.
   */
  selectedHour?: number;
  /**
   * The currently selected minute (0–59).
   * In production, derive column scroll position from this value.
   */
  selectedMinute?: number;
  className?: string;
};

/**
 * TimePicker
 *
 * Drum-style scroll picker for time-of-day selection.
 * Displays three columns: Hour, Minute, and AM/PM.
 *
 * Distinct from Time Date Picker (which has an additional Date column).
 * Shares the scroll depth visual system with Time Date Picker, Month Year Picker,
 * and Number Picker.
 *
 * Used inside the "Choose arrive time" bottom-sheet popup in the Customer App.
 * Triggered by the Dojo AI chat assistant in reservation flows.
 *
 * @see components/time-picker/index.mdx
 */
export default function TimePicker({
  period = "AM",
  selectedHour = 9,
  selectedMinute = 41,
  className,
}: TimePickerProps) {
  const hourItems   = buildHourItems(selectedHour);
  const minuteItems = buildMinuteItems(selectedMinute);
  const amPmItems   = buildAmPmItems(period);

  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--surface/neutral/default, #f1f2f4)",
        width: "375px",
        height: "212px",
        position: "relative",
      }}
      data-name="Time_Picker"
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
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: 400,
        }}
      >
        <DrumColumn items={hourItems}   align="center" aria-label="Hour" />
        <DrumColumn items={minuteItems} align="center" aria-label="Minute" />
        <DrumColumn items={amPmItems}   align="center" aria-label="AM or PM" />
      </div>
    </div>
  );
}
