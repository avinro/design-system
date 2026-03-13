# Calendar Plan Page — Component Rules

This file defines the writing and usage rules for the Calendar Plan Page component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Calendar Plan Page is a compact monthly calendar used inside the Plan page of the Dojo app. It is embedded within a top sheet or drawer surface and supports a collapsible `small` state that shows only the current week row. Days can be individually marked as planned using an indicator dot. Unlike Calendar Simple, this component has no navigation controls of its own — it always coexists with a **Header** component placed above it, which is responsible for month/year display and navigation.

---

## Variants

No structural variants. Single visual style.

---

## Sizes

Two display modes based on the `state` prop:

- **Full** (`Default`, `Today`, `Active`) — full month grid, 390×252px
- **Small** (`small`) — single visible week row, 390×96px, overflow clipped

---

## States

| State | Description |
|---|---|
| `Default` | Full month view. No date selected. No today or planned indicators shown. |
| `Today` | Full month view. Today's date is visually selected by default (dark filled circle). |
| `Active` | Full month view. A day other than today is selected. Today's date shows a lighter circle highlight. |
| `small` | Collapsed view. Only the current week row is visible. The selected day and today highlight are preserved. |

---

## Anatomy

1. **Container** — outer panel surface. 390px wide. Bottom corners rounded (`--rounded-16`, 16px). Background: `--surface/neutral/default`.
2. **Weekday header** — row of 7 abbreviated day labels (SUM, MON, TUE, WED, THU, FRI, SAT). Manrope Regular 11px. Color: `--text/placeholder`.
3. **Day grid** — 5 rows of 7 `DayItemSimpleCalendar` cells. Overflow days from adjacent months use `state=Disable`.
4. **DayItemSimpleCalendar** — individual 40×40px day cell. See sub-component rules below.
5. **Handle** — 32×4px rounded bar at the bottom of the container. Indicates bottom-sheet drag affordance.

### DayItemSimpleCalendar cell rules

| `state` | `type` | `today` | Appearance |
|---|---|---|---|
| `Available` | `No-plan` | `false` | Plain date number. Color: `--day-item/text-default`. |
| `Available` | `No-plan` | `true` | Date number + lighter filled circle background (today highlight). |
| `Disable` | `No-plan` | `false` | Greyed date number. Color: `--day-item/text-disabled`. Not selectable. |
| `Available` | `Planned` | `false` | Date number + 6×6px orange indicator dot below. Color: `--day-item/text-default`. |
| `Selected` | `No-plan` | `false` | Dark filled circle background (36×36px). Inverted date number. Color: `--day-item/text-selected`. |

---

## Usage guidelines

- Use Calendar Plan Page only in the Plan page context — it is designed as an in-page calendar panel, not a standalone date picker.
- Always compose Calendar Plan Page with a **Header** component placed directly above it. The Header is responsible for: displaying the current month and year label, providing the back navigation action, and offering controls to change the month, year, or week. The calendar itself has no navigation controls.
- The calendar responds to the month/year context set by the Header. When the user changes the month or year via the Header, the calendar re-renders to show the selected period.
- In the `small` state, only the current week row is visible. Use this state when the plan page is in a compact or summary mode.
- The `small` and `Active` states coexist: in `small`, the selected day and today highlight are preserved.
- Mark days with the `Planned` type to communicate that a delivery, activity, or job is scheduled.
- Out-of-month days (from the previous or next month) should always use `state=Disable` to fill the grid.

---

## Accessibility

- Each day cell must have an `aria-label` with the full date (e.g., `aria-label="March 9, 2026"`).
- Planned days should include an additional cue in the `aria-label` (e.g., `aria-label="March 9, 2026, has planned activity"`).
- Out-of-month cells must use `aria-disabled="true"` and should not receive keyboard focus.
- The handle at the bottom should have `aria-label="Collapse calendar"` or equivalent.
- The weekday header row is decorative — cells can use `aria-hidden="true"`.
- TODO: Confirm keyboard navigation within the grid (arrow keys, Enter to select).
- TODO: Confirm `role` for the calendar grid (`role="grid"` / `role="gridcell"` pattern).
- TODO: Confirm screen reader announcement for month/year context (no visible header in this component).

---

## Do / Don't

**Do:**
- Use the `small` state to collapse the calendar to the current week when the user scrolls down the plan page.
- Use `Planned` type to show that a job or delivery is scheduled for that day.
- Provide full date `aria-label` values on every day cell.
- Use `Disable` for out-of-month overflow days to maintain the 7-column grid structure.

**Don't:**
- Don't use this component as a general-purpose date picker — use Calendar Simple instead.
- Don't add month navigation controls inside this component — all navigation belongs in the Header above.
- Don't render Calendar Plan Page without a Header above it that displays the current period.
- Don't make `Disable` days interactive or selectable.
- Don't use this component outside of a top sheet or drawer panel context.

---

## Content guidelines

- Weekday labels use abbreviated uppercase names: SUN, MON, TUE, WED, THU, FRI, SAT.
- Date numbers are displayed as plain integers (e.g., `1`, `26`).
- No month/year label is rendered inside this component — the Header component above it displays and controls the current period.

---

## Notes

- This component shares the `DayItemSimpleCalendar` sub-component with Calendar Simple. Any changes to `DayItemSimpleCalendar` affect both.
- The indicator dot (Planned days) and circle backgrounds (today, selected) are image assets in the Figma source. Confirmed token: `--day-item/indicator-planned` (#ff6b26, orange).
- The handle at the bottom is always visible in all four states. It is not interactive in the current design.
- TODO: Confirm whether the `small` state is animated (expand/collapse transition).
- TODO: Confirm whether `Planned` + `Selected` can coexist on the same day cell.
- TODO: Confirm today highlight token — `--day-item/bg-selected` (#1d1d23) is confirmed for `Selected`; today's lighter circle is a separate image asset.
- Confirmed usage context: in the Dojo Customer App, Calendar Plan Page appears in `small` state below a Header showing "Jun, 2026" with a dropdown chevron for month/year navigation, a back arrow, a search button, and an add button. The calendar area is followed by a bookings list (or empty state). Figma reference: node `3028:4306`.
