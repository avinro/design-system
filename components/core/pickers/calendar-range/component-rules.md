# Calendar Range — Component Rules

This file defines the writing and usage rules for the Calendar Range component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Calendar Range is a monthly calendar that supports selecting a continuous date range. The user taps a start date and an end date; all days between them are highlighted with a semi-transparent band, while the start and end dates receive a solid dark circle. It also supports a today indicator (circle ring on the current date) and planned activity indicators (dot below the day number). The component is a composite built from **CalendarTitle** and **DayItemRangeCalendar**, which is used for all day cells across all states.

---

## Variants

No structural variants. Single visual style.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Width | 374px |
| Border radius | 16px (`--spacing-16`) |
| Padding (horizontal) | `--spacing-16` (16px) |
| Padding (vertical) | `--spacing-24` (24px) |
| Gap (title → grid) | `--spacing-16` (16px) |

> Note: Calendar Range is 374px wide. Calendar Simple is 382px wide. They are not interchangeable at a fixed width.

---

## States

Three states are defined in Figma for the composite component.

| State | Description |
|---|---|
| `Default` | Standard view. No selection, no today indicator, no planned indicators. Uses `DayItemRangeCalendar` cells. |
| `Today` | The current date is marked with a today indicator. Planned activity indicators may appear on certain days. Uses `DayItemRangeCalendar` cells. |
| `Range` | A date range is selected: start and end dates have a dark circle; all days between them have a semi-transparent highlight band. The today indicator may also appear simultaneously. Uses `DayItemRangeCalendar` cells. |

Rules:
- `Default` is the initial state when no date has been selected.
- `Today` represents the calendar on or around the current date, with activity indicators but no range selected.
- `Range` is the state after both a start and end date have been chosen.
- TODO: Confirm intermediate state when only the start date has been selected (awaiting end date tap).

---

## Anatomy

Calendar Range is built from the following parts:

### Container

| Property | Value |
|---|---|
| Width | 374px |
| Background | `--surface/neutral/default` (`#f1f2f4`) |
| Border radius | 16px |
| Padding | 16px horizontal / 24px vertical |
| Shadow | `elevation/light/02` — `0px 8px 12px rgba(0,0,0,0.05)` |

### CalendarTitle (shared sub-component)

Identical to the CalendarTitle used in Calendar Simple. Navigation header: left chevron (24px) + month/year label + right chevron (24px). See [Calendar Simple](/components/calendar-simple) for full details.

### Weekday header row

7 equally distributed cells: SUM, MON, TUE, WED, THU, FRI, SAT.

| Property | Value |
|---|---|
| Cell height | 40px |
| Cell padding | 8px |
| Label font | Manrope Regular, `--size/2xs` (11px), `--text/placeholder` (#636377) |
| Text style | `Body 2xs/Regular` |

### DayItemRangeCalendar (sub-component)

The range-capable day cell. Width is flexible (`flex: 1 0 0`) — cells fill the row equally rather than being fixed 40px squares. Height: 40px.

Day appearance is determined by `state` × `type` × `today`:

| State | Type | today | Appearance |
|---|---|---|---|
| `Available` | `No-plan` | `false` | Plain date number. Text: `--day-item/text-default`. |
| `Disable` | `No-plan` | `false` | Greyed date number. Text: `--day-item/text-disabled`. Not selectable. |
| `Available` | `Planned` | `false` | Date number + 6×6px dot indicator below. Text: `--day-item/text-default`. |
| `Available` | `No-plan` | `true` | Today indicator: 36×36px circle ring outline centered. Text: `--day-item/text-default`. |
| `Selected - Start` | `No-plan` | `false` | Dark 36px circle + right-side half band (left-half → right edge). Text: `--day-item/text-selected` (inverted). |
| `Selected - Middle` | `No-plan` | `false` | Full-width band only (no circle). Text: `--day-item/text-selected-middle` (dark, NOT inverted). |
| `Selected - End` | `No-plan` | `false` | Dark 36px circle + left-side half band (left edge → right-half). Text: `--day-item/text-selected` (inverted). |

### Range band mechanics

The date range is visualized using a combination of a solid dark circle (endpoints) and a semi-transparent band (the span between them):

- **Band token**: `--day-item/bg-selected-middle` = `rgba(29,29,35,0.12)`
- **Band height**: 36px (same height as the day circle), centered vertically in the 40px cell
- **Start cell**: half-band from center to right edge + dark 36px circle on top
- **Middle cells**: full-width band, no circle
- **End cell**: half-band from left edge to center + dark 36px circle on top
- The band creates a visual connection across the row, including across row breaks

Rules:
- The band height is always 36px regardless of the cell height.
- The selected circle is 36×36px, centered within the 40px cell.
- Middle-of-range text uses `--day-item/text-selected-middle` (#1d1d23) — it is **not** inverted.
- Start and end text uses `--day-item/text-selected` (#f1f2f4) — it **is** inverted (light on dark).
- Do not use the today indicator simultaneously with a selected state on the same day. TODO: Confirm behavior if today is also the range start or end.

---

## Typography

Identical to Calendar Simple.

| Element | Text style | Font | Weight | Size token | Color token |
|---|---|---|---|---|---|
| Month/year label | `Body sm/140/Bold` | Manrope | `--weight/bold` (700) | `--size/base` (14px) | `--text/body` (#34353f) |
| Weekday abbreviations | `Body 2xs/Regular` | Manrope | `--weight/regular` (400) | `--size/2xs` (11px) | `--text/placeholder` (#636377) |
| Day number (available / today / middle) | `Body md/SemiBold` | Manrope | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-default` (#1d1d23) |
| Day number (disabled) | `Body md/SemiBold` | Manrope | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-disabled` (#636377) |
| Day number (start / end) | `Body md/SemiBold` | Manrope | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-selected` (#f1f2f4) |
| Day number (middle) | `Body md/SemiBold` | Manrope | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-selected-middle` (#1d1d23) |

---

## Usage guidelines

- Use Calendar Range when the user needs to select a start and end date defining a continuous period.
- The component is confirmed for use in the Dojo Customer App for date range filtering (e.g., filtering by booking or activity dates).
- The component is fixed-width (374px). Use it inside a modal, bottom sheet, or a dedicated screen section.
- Out-of-month overflow days use `Disable` state to fill the 7-column grid — they are not selectable.
- Use the `Planned` type to mark days that have associated activities.
- The today indicator (`today=true`) communicates the current calendar date independently from the selection state.
- Do not use Calendar Range for single-date selection — use Calendar Simple instead.
- TODO: Confirm the maximum selectable range length (e.g., whether multi-month ranges spanning multiple calendar views are supported).

---

## Interaction

- The user taps the first date to set the range start, then taps a second date to set the range end.
- All days between start and end become `Selected - Middle`.
- The start date becomes `Selected - Start`; the end date becomes `Selected - End`.
- `Disable` days are not interactive.
- TODO: Confirm behavior when the user taps a second date that is before the first — does the selection swap, or is it cancelled?
- TODO: Confirm whether tapping outside the calendar or tapping the same date twice resets the selection.
- TODO: Confirm the intermediate state when only one date has been tapped (awaiting second date).
- TODO: Confirm swipe gesture support for month navigation.
- TODO: Confirm animation/transition spec for range highlighting.

---

## Accessibility

- The month/year heading should be announced as a landmark or heading.
- Each day cell should have an accessible label with the full date (e.g., `aria-label="July 23, 2023"`).
- Range-selected days should communicate their role: "July 23, 2023, range start", "July 24, 2023, in selected range", "July 31, 2023, range end".
- The today indicator should be reflected in the accessible label: "July 9, 2023, today".
- `Disable` days should use `aria-disabled="true"` and not receive focus.
- TODO: Confirm keyboard navigation — likely Arrow keys to move focus, Enter/Space to set range start and end.
- TODO: Confirm `role` for the grid — `role="grid"` with `role="gridcell"` per day.

---

## Do / Don't

**Do:**
- Use for date range selection where the user needs a start and end date.
- Clearly differentiate the start, middle, and end states visually.
- Show the today indicator to help the user orient within the month.
- Use `Planned` indicators to surface relevant activity information.

**Don't:**
- Don't use for single-date selection — use Calendar Simple instead.
- Don't make `Disable` days selectable.
- Don't omit the band connection between start and end — the visual continuity is critical for communicating the range.
- Don't use inverted text on middle-of-range days — they use `--day-item/text-selected-middle` (#1d1d23), not the inverted white.

---

## Sub-components

- **CalendarTitle** (node `2033:6132`) — shared with Calendar Simple. Navigation header: left chevron + month/year + right chevron.
- **DayItemRangeCalendar** (node `5009:1403` base) — the only day cell used across all states. Supports 5 selection states + today indicator + planned type.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5007:2834`.
- Three main states: `Default` (5007:2835), `Today` (5007:2880), `Range` (5007:2970).
- Width is 374px — 8px narrower than Calendar Simple (382px).
- The sub-component is named `DayItemRagneCalendar` in Figma (with a typo: "Raagne"). Documented here as `DayItemRangeCalendar`.
- Middle-of-range days use `--day-item/text-selected-middle` (#1d1d23) — dark text, not inverted. This is distinct from start/end which use `--day-item/text-selected` (#f1f2f4).
- Today indicator uses a circle ring outline (image asset in Figma). TODO: Confirm the exact color token.
- Selected circle (start/end) and selected band tokens are confirmed: circle is 36px dark fill; band token is `--day-item/bg-selected-middle` (rgba(29,29,35,0.12)).
- Usage confirmed in Dojo Customer App (node `316:1281`) for date range filtering flows.
- TODO: Confirm today circle ring color token.
- TODO: Confirm selected circle background color token.
- TODO: Confirm interaction flow for selecting a range (first tap vs. second tap).
