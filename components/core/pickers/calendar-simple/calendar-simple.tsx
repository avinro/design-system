/**
 * CalendarSimple — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 2034:5802
 * Figma frame name: "Calendar - Simple"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * COMPOSITE COMPONENT — built from two sub-components:
 * - CalendarTitle    (node 2033:6132) — navigation header: chevron + month/year + chevron
 * - DayItemSimpleCalendar             — individual 40×40px day cell
 *
 * THREE CONTAINER STATES:
 * - "Default" (2034:5799) — no selection, no indicators
 * - "Today"   (2034:5800) — a planned indicator is shown on a day
 * - "Active"  (2034:5798) — a day is selected (dark circle) + optional planned indicator
 *
 * DAY CELL STATE × TYPE MATRIX (confirmed from Figma):
 * - Available / No-plan  (2033:6105) — plain date, --day-item/text-default
 * - Disable  / No-plan   (2033:6108) — grey, --day-item/text-disabled. For out-of-month days.
 * - Available / Planned  (5007:2739) — date + 6×6px dot indicator below
 * - Selected / No-plan   (5007:2766) — 36px dark circle bg, --day-item/text-selected
 *
 * Confirmed from Figma:
 * - Container: 382px wide, border-radius 16px, --surface/neutral/default, elevation/light/02
 * - Container padding: 16px horizontal / 24px vertical
 * - CalendarTitle: chevron 24px | Manrope Bold 14px --text/body
 * - Weekday labels: Manrope Regular 11px --text/placeholder, 40px cell height
 * - Day number: Manrope SemiBold 16px, line-height 1.4
 * - Week starts on Sunday
 *
 * TODO: Confirm token for selected day background circle color.
 * TODO: Confirm token for planned day indicator dot color.
 * TODO: Confirm today="on" day item appearance.
 * TODO: Implement month navigation (prev/next).
 * TODO: Confirm keyboard navigation pattern.
 * TODO: Confirm range selection support.
 */

import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DayState = "Available" | "Disable" | "Selected";
export type DayType = "No-plan" | "Planned";
export type CalendarSimpleState = "Default" | "Today" | "Active";

export interface DayData {
  /** Calendar date number (1–31). */
  date: number;
  /** Whether the day belongs to the displayed month. Out-of-month days use Disable. */
  isCurrentMonth: boolean;
  /** Whether the day has a planned event or activity. */
  isPlanned?: boolean;
  /** Whether this is the currently selected day. */
  isSelected?: boolean;
}

export interface CalendarSimpleProps {
  /**
   * The month to display. Defaults to the current month.
   * Pass a Date object set to the first day of the desired month.
   */
  displayMonth?: Date;
  /** Set of planned dates (as YYYY-MM-DD strings). */
  plannedDates?: string[];
  /** The currently selected date (as a YYYY-MM-DD string). */
  selectedDate?: string;
  /** Called when the user selects a date. */
  onDateSelect?: (date: string) => void;
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

function buildDayGrid(year: number, month: number): Array<{ date: number; isCurrentMonth: boolean; dateStr: string }> {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: Array<{ date: number; isCurrentMonth: boolean; dateStr: string }> = [];

  // Leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const [y, m] = month === 0 ? [year - 1, 11] : [year, month - 1];
    cells.push({ date: d, isCurrentMonth: false, dateStr: toDateString(y, m, d) });
  }

  // Days in current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, isCurrentMonth: true, dateStr: toDateString(year, month, d) });
  }

  // Trailing days from next month to fill last row
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const [y, m] = month === 11 ? [year + 1, 0] : [year, month + 1];
      cells.push({ date: d, isCurrentMonth: false, dateStr: toDateString(y, m, d) });
    }
  }

  return cells;
}

// ─── DayItemSimpleCalendar ────────────────────────────────────────────────────

interface DayItemProps {
  date: number;
  dayState: DayState;
  dayType: DayType;
  dateStr: string;
  onPress?: (dateStr: string) => void;
}

function DayItemSimpleCalendar({ date, dayState, dayType, dateStr, onPress }: DayItemProps) {
  const isDisabled = dayState === "Disable";
  const isSelected = dayState === "Selected";
  const isPlanned = dayType === "Planned";

  const textColor = isSelected
    ? "var(--day-item/text-selected, #f1f2f4)"
    : isDisabled
    ? "var(--day-item/text-disabled, #636377)"
    : "var(--day-item/text-default, #1d1d23)";

  return (
    <div
      role={isDisabled ? undefined : "button"}
      aria-label={`${dateStr}${isPlanned ? ", has planned activity" : ""}`}
      aria-disabled={isDisabled}
      aria-pressed={isSelected}
      onClick={isDisabled ? undefined : () => onPress?.(dateStr)}
      style={{
        position: "relative",
        width: 40,
        height: 40,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDisabled ? "default" : "pointer",
        borderRadius: (isDisabled || isPlanned) ? "24px" : undefined,
        boxSizing: "border-box",
      }}
    >
      {/* Selected background circle */}
      {isSelected && (
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
          }}
        />
      )}

      {/* Date number */}
      <p
        style={{
          position: "absolute",
          top: "calc(50% - 12px)",
          left: "calc(50% + 0.5px)",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-family/body, 'Manrope', sans-serif)",
          fontWeight: "var(--weight/semibold, 600)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--size/lg, 16px)",
          lineHeight: 1.4,
          letterSpacing: "var(--letter-spacing/normal, 0px)",
          color: textColor,
          textAlign: "center",
          whiteSpace: "nowrap",
          margin: 0,
          zIndex: 1,
        }}
      >
        {date}
      </p>

      {/* Planned indicator dot */}
      {isPlanned && !isSelected && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            top: 29,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            // TODO: Replace with confirmed design token for planned indicator dot color.
            background: "#e05a2b",
          }}
        />
      )}
    </div>
  );
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
      {/* Left chevron */}
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

      {/* Month/year label */}
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

      {/* Right chevron */}
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

// ─── CalendarSimple ───────────────────────────────────────────────────────────

export function CalendarSimple({
  displayMonth,
  plannedDates = [],
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  className,
}: CalendarSimpleProps) {
  const today = new Date();
  const base = displayMonth ?? new Date(today.getFullYear(), today.getMonth(), 1);
  const year = base.getFullYear();
  const month = base.getMonth();

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
  const plannedSet = new Set(plannedDates);
  const cells = buildDayGrid(year, month);

  function getDayState(cell: { isCurrentMonth: boolean; dateStr: string }): DayState {
    if (!cell.isCurrentMonth) return "Disable";
    if (selectedDate === cell.dateStr) return "Selected";
    return "Available";
  }

  function getDayType(cell: { dateStr: string }): DayType {
    return plannedSet.has(cell.dateStr) ? "Planned" : "No-plan";
  }

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
        width: "382px",
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
                  flexShrink: 0,
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
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexShrink: 0 }}
            >
              {row.map((cell) => (
                <DayItemSimpleCalendar
                  key={cell.dateStr}
                  date={cell.date}
                  dayState={getDayState(cell)}
                  dayType={getDayType(cell)}
                  dateStr={cell.dateStr}
                  onPress={onDateSelect}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
