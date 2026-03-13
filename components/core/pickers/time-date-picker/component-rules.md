# Time Date Picker — Component Rules

This file defines the writing and usage rules for the Time Date Picker component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Time Date Picker is a drum-style (slot-machine/iOS-style) scroll picker used to let users select a date and time simultaneously. It displays four vertical scroll columns: Date, Hour, Minute, and AM/PM. The selected value in each column is centered, displayed at the largest size, and uses the primary text color. Items above and below the selection progressively decrease in size and opacity, creating a depth effect.

It is used in the Dojo Customer App on the "Choose a time" screen, where the user selects either a pickup or drop-off time for a ride.

---

## Variants

Two variants defined by the `AM or PM` prop, representing the currently selected period:

| Variant | Prop value | Description |
|---|---|---|
| AM selected | `Yes` | AM is at the center (selected) position. PM is visible one step below. |
| PM selected | `AM or PM2` | PM is at the center (selected) position. AM is visible one step above. |

> Note: the prop name `amOrPm` with values `"Yes"` / `"AM or PM2"` reflects the Figma layer naming. In implementation, consider replacing with a `period` prop using `"AM"` / `"PM"` values, or driving the full picker state with a single controlled `value`.

---

## Sizes

Single size. No size variants.

| Property | Value |
|---|---|
| Width | 375px |
| Height | 212px |

---

## States

No explicit state variants at the composite level. The visible state is entirely driven by the scroll position of each column (i.e., which item is centered).

---

## Anatomy

1. **Container** — 375×212px panel. Background: `--surface/neutral/default`. No padding applied to the outer surface.
2. **Selection indicator** — a 31px-tall horizontal stripe centered vertically across the full width of the picker. Marks the active selection row. Rendered as an image asset in Figma.
3. **Column group** — centered horizontally, `gap-[27px]` between columns. Contains 4 columns laid out horizontally.
4. **Date column** — right-aligned. Shows abbreviated date labels (e.g., "Sat Feb 12", "Today"). 7 visible items per column.
5. **Hour column** — center-aligned. Shows hours 1–12 (12-hour format).
6. **Minute column** — center-aligned. Shows minutes 00–59.
7. **AM/PM column** — center-aligned. Shows only AM and PM. Items outside the two visible values use `opacity-0`.

### Scroll depth visual system (per column, 7 items)

| Position | Role | Font size | Opacity | Text color |
|---|---|---|---|---|
| 1 (top) | Furthest above | 12px | 40% | `--text/placeholder` |
| 2 | Near-above | 14px | 70% | `--text/placeholder` |
| 3 | Close-above | 18px | 100% | `--text/placeholder` |
| 4 (center) | **Selected** | 23px | 100% | `--text/primary` |
| 5 | Close-below | 18px | 100% | `--text/placeholder` |
| 6 | Near-below | 14px | 70% | `--text/placeholder` |
| 7 (bottom) | Furthest below | 12px | 40% | `--text/placeholder` |

> The AM/PM column uses `opacity-0` for all positions except the two valid values (AM and PM), giving it a shorter visible range than the other three columns.

---

## Usage guidelines

- Use Time Date Picker when the user needs to select both a date and a time within a single interaction — not for date-only or time-only inputs.
- Always display all four columns together (Date, Hour, Minute, AM/PM). Do not show a subset.
- In the Dojo Customer App, Time Date Picker is used below a Segmented Control that switches between "Pickup at" and "Drop-off by" modes. The picker updates to reflect the selected mode.
- Display a summary of the selected time below the picker (e.g., "4:45 pm CDT dropoff time" + estimated travel time).
- Pair with a primary action button (e.g., "Next") below the summary to confirm the selection.
- The "Today" label should appear in the Date column instead of the explicit date when the current day is scrolled to the selection position.

---

## Accessibility

- Each column should be a scrollable region with an accessible role (e.g., `role="listbox"` or a native `<select>` fallback).
- The selected item in each column should be announced by screen readers (e.g., `aria-selected="true"`).
- Provide accessible labels for each column (e.g., `aria-label="Date"`, `aria-label="Hour"`, `aria-label="Minute"`, `aria-label="AM or PM"`).
- The selection indicator is decorative — mark it `aria-hidden="true"`.
- TODO: Confirm keyboard interaction for column scrolling (Up/Down arrow keys to change value, Tab to move between columns).
- TODO: Confirm whether a native time/date input should be used as a fallback for assistive technology.

---

## Do / Don't

**Do:**
- Use this component when both date and time selection are required in a single step.
- Show the "Today" label for the current date in the Date column.
- Display a readable summary of the selected value below the picker.
- Always show the AM/PM column when using 12-hour time format.

**Don't:**
- Don't use this component for date-only or time-only selection.
- Don't hide or remove the AM/PM column unless a 24-hour clock format is confirmed.
- Don't show this component without a confirmation action (button or equivalent) nearby.
- Don't use free-text input to supplement or replace the scroll columns.

---

## Content guidelines

- Date column labels use the format: abbreviated day + abbreviated month + date number (e.g., "Sat Feb 12"). "Today" replaces the date label for the current day.
- Hour values: 1–12 (12-hour format). No leading zeros.
- Minute values: 00–59. Use two-digit format (e.g., "05", "41"). TODO: Confirm whether leading zeros are shown for minutes in implementation.
- AM/PM labels use uppercase: AM, PM.

---

## Notes

- The selection indicator stripe is an image asset in the Figma source — confirm the implementation approach (border-top/bottom, CSS gradient, or SVG).
- The scroll depth visual system (size + opacity gradient) is the core affordance of this component. All 7 positions must be rendered to maintain the illusion of a continuous drum scroll.
- The AM/PM column behaves differently from the other three: only 2 of its 7 visible slots are populated; the rest use `opacity-0`.
- TODO: Confirm whether the scroll is infinite/looping (standard for hour and minute) or bounded (for date).
- TODO: Confirm minute step increment — Figma shows individual minutes (38, 39, 40, 41…) but implementation may use 5- or 15-minute steps.
- TODO: Confirm how far into the past or future the Date column extends.
- TODO: Confirm 24-hour clock variant (AM/PM column hidden).
