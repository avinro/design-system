/**
 * CalendarRange — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5007:2834
 * Figma frame name: "Calendar - Range"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * COMPOSITE COMPONENT — built from two sub-components:
 * - CalendarTitle        (node 2033:6132) — navigation header: chevron + month/year + chevron (shared with Calendar Simple)
 * - DayItemRangeCalendar (node 5009:1403) — the only day cell used across all states
 *
 * NOTE: Figma names the range sub-component "DayItemRagneCalendar" (typo). Documented here as DayItemRangeCalendar.
 *
 * THREE CONTAINER STATES:
 * - "Default" (5007:2835) — no selection, no today, no planned. Uses DayItemRangeCalendar.
 * - "Today"   (5007:2880) — today indicator shown. Uses DayItemRangeCalendar.
 * - "Range"   (5007:2970) — range selected (start + middle + end). Uses DayItemRangeCalendar.
 *
 * DAY CELL STATE × TYPE × TODAY MATRIX (confirmed from Figma):
 * - Available / No-plan  / today=false  (5009:1403) — plain date, --day-item/text-default
 * - Disable   / No-plan  / today=false  (5009:1406) — grey, --day-item/text-disabled. Out-of-month.
 * - Available / Planned  / today=false  (5009:1413) — date + 6×6px dot indicator below
 * - Available / No-plan  / today=true   (5009:1435) — today: 36px circle ring outline
 * - Selected - Start     / No-plan      (5007:2823) — dark 36px circle + right half-band. Text: inverted (#f1f2f4)
 * - Selected - Middle    / No-plan      (5007:2831) — full-width band only, no circle. Text: dark (#1d1d23), NOT inverted
 * - Selected - End       / No-plan      (5007:2827) — dark 36px circle + left half-band. Text: inverted (#f1f2f4)
 *
 * RANGE BAND MECHANICS:
 * - Band token: --day-item/bg-selected-middle = rgba(29,29,35,0.12)
 * - Band height: 36px (centered in 40px cell)
 * - Start: right half-band (center → right edge) + 36px dark circle on top
 * - Middle: full-width band, no circle
 * - End: left half-band (left edge → center) + 36px dark circle on top
 *
 * CONFIRMED DIMENSIONS:
 * - Container: 374px wide (8px narrower than Calendar Simple 382px), border-radius 16px
 * - Container padding: 16px horizontal / 24px vertical
 * - Day cells: flex: 1 0 0 width (not fixed 40px), 40px height
 * - Selected circle: 36×36px
 * - Band height: 36px
 * - Planned dot: 6×6px
 *
 * TODO: Confirm token for selected circle background color.
 * TODO: Confirm token for today circle ring color.
 * TODO: Confirm token for planned indicator dot color.
 * TODO: Confirm behavior when only one date is selected (awaiting second tap).
 * TODO: Confirm behavior when second tap is earlier than first.
 * TODO: Implement month navigation (prev/next).
 * TODO: Confirm keyboard navigation pattern.
 */

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RangeDayState =
  | "Available"
  | "Disable"
  | "Selected-Start"
  | "Selected-Middle"
  | "Selected-End";

export type DayType = "No-plan" | "Planned";

export interface CalendarRangeProps {
  /**
   * The month to display. Defaults to the current month.
   * Pass a Date object set to the first day of the desired month.
   */
  displayMonth?: Date;
  /** Set of planned dates (as YYYY-MM-DD strings). */
  plannedDates?: string[];
  /** The range start date (as a YYYY-MM-DD string). */
  rangeStart?: string;
  /** The range end date (as a YYYY-MM-DD string). */
  rangeEnd?: string;
  /** Called when the user taps a date. Caller manages range state. */
  onDatePress?: (date: string) => void;
  /** Called when the user navigates to the previous month. */
  onPrevMonth?: () => void;
  /** Called when the user navigates to the next month. */
  onNextMonth?: () => void;
  /** Additional class names. */
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildDayGrid(
  year: number,
  month: number
): Array<{ date: number; isCurrentMonth: boolean; dateStr: string }> {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: Array<{ date: number; isCurrentMonth: boolean; dateStr: string }> = [];

  // Leading overflow days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const [y, m] = month === 0 ? [year - 1, 11] : [year, month - 1];
    cells.push({ date: d, isCurrentMonth: false, dateStr: toDateString(y, m, d) });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, isCurrentMonth: true, dateStr: toDateString(year, month, d) });
  }

  // Trailing overflow days to fill last row
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const [y, m] = month === 11 ? [year + 1, 0] : [year, month + 1];
      cells.push({ date: d, isCurrentMonth: false, dateStr: toDateString(y, m, d) });
    }
  }

  return cells;
}

function getRangeDayState(
  cell: { isCurrentMonth: boolean; dateStr: string },
  rangeStart?: string,
  rangeEnd?: string
): RangeDayState {
  if (!cell.isCurrentMonth) return "Disable";
  if (rangeStart && cell.dateStr === rangeStart) return "Selected-Start";
  if (rangeEnd && cell.dateStr === rangeEnd) return "Selected-End";
  if (rangeStart && rangeEnd && cell.dateStr > rangeStart && cell.dateStr < rangeEnd) {
    return "Selected-Middle";
  }
  return "Available";
}

function isToday(dateStr: string): boolean {
  const today = new Date();
  return dateStr === toDateString(today.getFullYear(), today.getMonth(), today.getDate());
}

// ─── CalendarTitle ────────────────────────────────────────────────────────────

interface CalendarTitleProps {
  monthLabel: string;
  onPrev?: () => void;
  onNext?: () => void;
}

function CalendarTitle({ monthLabel, onPrev, onNext }: CalendarTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        flexShrink: 0,
      }}
    >
      <button
        aria-label="Previous month"
        onClick={onPrev}
        style={{
          width: 24, height: 24, flexShrink: 0,
          background: "none", border: "none", padding: 0, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="#34353f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p
        style={{
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: "var(--weight/bold, 700)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--size/base, 14px)",
          lineHeight: 1.4,
          letterSpacing: "var(--letter-spacing/normal, 0px)",
          color: "var(--text/body, #34353f)",
          whiteSpace: "nowrap",
          margin: 0,
          flexShrink: 0,
        }}
      >
        {monthLabel}
      </p>

      <button
        aria-label="Next month"
        onClick={onNext}
        style={{
          width: 24, height: 24, flexShrink: 0,
          background: "none", border: "none", padding: 0, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18l6-6-6-6" stroke="#34353f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── DayItemRangeCalendar ─────────────────────────────────────────────────────

interface DayItemRangeProps {
  date: number;
  dayState: RangeDayState;
  dayType: DayType;
  isToday: boolean;
  dateStr: string;
  onPress?: (dateStr: string) => void;
}

function DayItemRangeCalendar({
  date,
  dayState,
  dayType,
  isToday: today,
  dateStr,
  onPress,
}: DayItemRangeProps) {
  const isDisabled = dayState === "Disable";
  const isStart = dayState === "Selected-Start";
  const isMiddle = dayState === "Selected-Middle";
  const isEnd = dayState === "Selected-End";
  const isEndpoint = isStart || isEnd;
  const isPlanned = dayType === "Planned";

  const textColor = isEndpoint
    ? "var(--day-item/text-selected, #f1f2f4)"
    : isMiddle
    ? "var(--day-item/text-selected-middle, #1d1d23)"
    : isDisabled
    ? "var(--day-item/text-disabled, #636377)"
    : "var(--day-item/text-default, #1d1d23)";

  const BAND_BG = "var(--day-item/bg-selected-middle, rgba(29,29,35,0.12))";
  const BAND_HEIGHT = 36;
  const CELL_HEIGHT = 40;
  const BAND_TOP = (CELL_HEIGHT - BAND_HEIGHT) / 2; // 2px

  const ariaLabel = [
    dateStr,
    today ? ", today" : "",
    isStart ? ", range start" : isMiddle ? ", in selected range" : isEnd ? ", range end" : "",
    isPlanned ? ", has planned activity" : "",
  ].join("");

  return (
    <div
      role={isDisabled ? undefined : "button"}
      aria-label={ariaLabel}
      aria-disabled={isDisabled || undefined}
      onClick={isDisabled ? undefined : () => onPress?.(dateStr)}
      style={{
        position: "relative",
        flex: "1 0 0",
        height: CELL_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDisabled ? "default" : "pointer",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      {/* Range band — Middle: full width */}
      {isMiddle && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: BAND_TOP,
            left: 0,
            right: 0,
            height: BAND_HEIGHT,
            background: BAND_BG,
          }}
        />
      )}

      {/* Range band — Start: right half only */}
      {isStart && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: BAND_TOP,
            left: "50%",
            right: 0,
            height: BAND_HEIGHT,
            background: BAND_BG,
          }}
        />
      )}

      {/* Range band — End: left half only */}
      {isEnd && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: BAND_TOP,
            left: 0,
            right: "50%",
            height: BAND_HEIGHT,
            background: BAND_BG,
          }}
        />
      )}

      {/* Selected circle (start and end endpoints) */}
      {isEndpoint && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: "50%",
            // TODO: Replace with confirmed design token for selected circle background.
            background: "#1d1d23",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      )}

      {/* Today indicator — circle ring outline */}
      {today && !isEndpoint && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: "50%",
            // TODO: Replace with confirmed design token for today ring color.
            border: "1.5px solid #1d1d23",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      )}

      {/* Date number */}
      <p
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: "var(--weight/semibold, 600)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--size/lg, 16px)",
          lineHeight: 1.4,
          letterSpacing: "var(--letter-spacing/normal, 0px)",
          color: textColor,
          textAlign: "center",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        {date}
      </p>

      {/* Planned indicator dot */}
      {isPlanned && !isEndpoint && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            // TODO: Replace with confirmed design token for planned indicator dot color.
            background: "#e05a2b",
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}

// ─── CalendarRange ────────────────────────────────────────────────────────────

export function CalendarRange({
  displayMonth,
  plannedDates = [],
  rangeStart,
  rangeEnd,
  onDatePress,
  onPrevMonth,
  onNextMonth,
  className,
}: CalendarRangeProps) {
  const today = new Date();
  const base = displayMonth ?? new Date(today.getFullYear(), today.getMonth(), 1);
  const year = base.getFullYear();
  const month = base.getMonth();

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
  const plannedSet = new Set(plannedDates);
  const cells = buildDayGrid(year, month);

  // Split into rows of 7
  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--spacing-16, 16px)",
        width: "374px",
        padding: "var(--spacing-24, 24px) var(--spacing-16, 16px)",
        background: "var(--surface/neutral/default, #f1f2f4)",
        borderRadius: "var(--spacing-16, 16px)",
        boxShadow: "0px 8px 12px 0px rgba(0, 0, 0, 0.05)", // elevation/light/02
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* CalendarTitle */}
      <CalendarTitle monthLabel={monthLabel} onPrev={onPrevMonth} onNext={onNextMonth} />

      {/* Calendar grid */}
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", flexShrink: 0 }}
      >
        {/* Weekday header row */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", flexShrink: 0 }}>
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              style={{
                flex: "1 0 0",
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
                  fontWeight: "var(--weight/regular, 400)" as React.CSSProperties["fontWeight"],
                  fontSize: "var(--size/2xs, 11px)",
                  lineHeight: 1.2,
                  letterSpacing: "var(--letter-spacing/normal, 0px)",
                  color: "var(--text/placeholder, #636377)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
              >
                {day}
              </p>
            </div>
          ))}
        </div>

        {/* Day rows */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", flexShrink: 0 }}>
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: "flex", alignItems: "center", width: "100%", flexShrink: 0 }}
            >
              {row.map((cell) => (
                <DayItemRangeCalendar
                  key={cell.dateStr}
                  date={cell.date}
                  dayState={getRangeDayState(cell, rangeStart, rangeEnd)}
                  dayType={plannedSet.has(cell.dateStr) ? "Planned" : "No-plan"}
                  isToday={cell.isCurrentMonth && isToday(cell.dateStr)}
                  dateStr={cell.dateStr}
                  onPress={onDatePress}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
