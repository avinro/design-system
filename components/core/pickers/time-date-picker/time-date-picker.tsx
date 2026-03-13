// Time Date Picker — reference component
// Adapted from Figma DS Core node 5121:1330
// A drum-style (slot-machine) scroll picker for simultaneous date and time selection.
// Stack note: adapt styling tokens and scroll behaviour to your project's system.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TimePeriod = "AM" | "PM";

type ColumnItem = {
  value: string;
  /** Position in the 7-slot drum (1 = top, 4 = selected, 7 = bottom) */
  position: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

type DrumColumnProps = {
  items: ColumnItem[];
  align?: "left" | "center" | "right";
  "aria-label": string;
};

// ---------------------------------------------------------------------------
// Scroll depth visual system
// Applied to each item based on its drum position.
// ---------------------------------------------------------------------------

const drumPositionStyles: Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7,
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
              opacity: style.opacity,
              color: style.color,
              fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
              fontWeight: "var(--weight/regular, 400)",
              lineHeight: "normal",
              whiteSpace: "nowrap",
              // Hidden slots (e.g., unused AM/PM positions)
              visibility: item.value === "" ? "hidden" : "visible",
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
// TimeDatePicker
// ---------------------------------------------------------------------------

export type TimeDatePickerProps = {
  /**
   * The currently selected AM/PM period.
   * Corresponds to Figma prop "AM or PM": "Yes" = AM selected, "AM or PM2" = PM selected.
   */
  period?: TimePeriod;
  className?: string;
};

/**
 * TimeDatePicker
 *
 * Drum-style scroll picker for simultaneous date and time selection.
 * Displays four columns: Date, Hour, Minute, AM/PM.
 *
 * Used in the Dojo Customer App on the "Choose a time" screen,
 * paired with a Segmented Control ("Pickup at" / "Drop-off by") above
 * and a time summary + "Next" action below.
 *
 * @see components/time-date-picker/index.mdx
 */
export default function TimeDatePicker({
  period = "AM",
  className,
}: TimeDatePickerProps) {
  const isPM = period === "PM";

  // Example data — in production, derive from current date/time and scroll state.
  const dateItems: ColumnItem[] = [
    { value: "Sat Feb 12", position: 1 },
    { value: "Sun Feb 13", position: 2 },
    { value: "Mon Feb 14", position: 3 },
    { value: "Today",      position: 4 },
    { value: "Weds Feb 16", position: 5 },
    { value: "Thurs Feb 17", position: 6 },
    { value: "Fri Feb 18",  position: 7 },
  ];

  const hourItems: ColumnItem[] = [
    { value: "6",  position: 1 },
    { value: "7",  position: 2 },
    { value: "8",  position: 3 },
    { value: "9",  position: 4 },
    { value: "10", position: 5 },
    { value: "11", position: 6 },
    { value: "12", position: 7 },
  ];

  const minuteItems: ColumnItem[] = [
    { value: "38", position: 1 },
    { value: "39", position: 2 },
    { value: "40", position: 3 },
    { value: "41", position: 4 },
    { value: "42", position: 5 },
    { value: "43", position: 6 },
    { value: "44", position: 7 },
  ];

  // AM/PM column: only 2 active slots; rest are invisible placeholders.
  // AM selected: AM at pos 4, PM at pos 5.
  // PM selected: AM at pos 3, PM at pos 4.
  const amPmItems: ColumnItem[] = isPM
    ? [
        { value: "",   position: 1 },
        { value: "",   position: 2 },
        { value: "AM", position: 3 },
        { value: "PM", position: 4 },
        { value: "",   position: 5 },
        { value: "",   position: 6 },
        { value: "",   position: 7 },
      ]
    : [
        { value: "",   position: 1 },
        { value: "",   position: 2 },
        { value: "",   position: 3 },
        { value: "AM", position: 4 },
        { value: "PM", position: 5 },
        { value: "",   position: 6 },
        { value: "",   position: 7 },
      ];

  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--surface/neutral/default, #f1f2f4)",
        width: "375px",
        height: "212px",
        position: "relative",
      }}
      data-name="Time_Date_Picker"
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
          // TODO: Replace with confirmed CSS implementation (e.g. top/bottom border lines).
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
        <DrumColumn items={dateItems}   align="right"  aria-label="Date" />
        <DrumColumn items={hourItems}   align="center" aria-label="Hour" />
        <DrumColumn items={minuteItems} align="center" aria-label="Minute" />
        <DrumColumn items={amPmItems}   align="center" aria-label="AM or PM" />
      </div>
    </div>
  );
}
