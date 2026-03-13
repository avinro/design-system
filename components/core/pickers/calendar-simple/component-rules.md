# Calendar Simple — Component Rules

This file defines the writing and usage rules for the Calendar Simple component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Calendar Simple is a monthly calendar view that allows the user to see and select dates. It displays a single month at a time with a header for navigation and a 7-column day grid. Each day cell can appear in different visual states to communicate availability, selection, and planned activity. The component is composed of two sub-components: **CalendarTitle** (navigation header) and **DayItemSimpleCalendar** (individual day cell).

---

## Variants

No structural variants. Single visual style.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Width | 382px |
| Border radius | 16px |
| Padding (horizontal) | `--spacing-16` (16px) |
| Padding (vertical) | `--spacing-24` (24px) |
| Gap (title → grid) | `--spacing-16` (16px) |

---

## States

Three states are defined in Figma for the composite component.

| State | Description |
|---|---|
| `Default` | Standard calendar view. No date is selected. No today or planned indicator is shown. |
| `Today` | A day in the current month has a planned indicator dot, representing today or a planned event. |
| `Active` | A date has been selected (shown with a filled dark circle). A planned indicator may also be visible on another date. |

Rules:
- `Default` is the initial state when the calendar is first shown with no prior selection.
- `Active` is the state after the user has tapped a day to select it.
- `Today` represents the current calendar state where today's date or a planned day is visually marked.
- TODO: Confirm whether `Today` state is purely informational (auto-set) or user-triggered.
- TODO: Confirm whether the `Today` state highlights the actual current date differently from other planned days.

---

## Anatomy

Calendar Simple is built from the following parts:

### Container

The outer card surface.

| Property | Value |
|---|---|
| Width | 382px |
| Background | `--surface/neutral/default` (`#f1f2f4`) |
| Border radius | 16px (`--spacing-16`) |
| Padding | 16px horizontal / 24px vertical |
| Shadow | `elevation/light/02` — `0px 8px 12px rgba(0,0,0,0.05)` |

### CalendarTitle (sub-component)

The navigation header displayed above the day grid.

| Part | Description |
|---|---|
| Left chevron | 24×24px left arrow icon. Navigates to the previous month. |
| Month/year label | Current month and year (e.g., "February 2023"). Manrope Bold, `--size/base` (14px), `--text/body`. |
| Right chevron | 24×24px right arrow icon. Navigates to the next month. |

Layout: flex row, space-between, full width of the content area.

### Weekday header row

A row of 7 abbreviated day labels: SUM, MON, TUE, WED, THU, FRI, SAT.

| Property | Value |
|---|---|
| Cell height | 40px |
| Cell padding | 8px |
| Cell layout | Equal flex distribution (1/7 each) |
| Label font | Manrope Regular, `--size/2xs` (11px), `--text/placeholder` (#636377), text-center |
| Text style | `Body 2xs/Regular` |

### DayItemSimpleCalendar (sub-component)

Each cell in the day grid is a 40×40px square. Visual appearance depends on the combination of `state` and `type` props.

| State | Type | Appearance |
|---|---|---|
| `Available` | `No-plan` | Plain date number. Text: `--day-item/text-default` (#1d1d23). |
| `Disable` | `No-plan` | Greyed date number. Text: `--day-item/text-disabled` (#636377). Used for days outside the current month. |
| `Available` | `Planned` | Date number + small dot indicator (6×6px) below the number. Text: `--day-item/text-default`. |
| `Selected` | `No-plan` | Dark circle background (36×36px) + inverted text. Text: `--day-item/text-selected` (#f1f2f4). |

Day item properties:

| Property | Value |
|---|---|
| Cell size | 40×40px |
| Border radius (Disable, Planned) | 24px |
| Selected background | 36×36px filled circle |
| Indicator dot | 6×6px, centered below date number (at ~29px from top) |
| Text style | `Body md/SemiBold` — Manrope SemiBold, `--size/lg` (16px), line-height 1.4 |

Rules:
- Out-of-month days (days from the previous or next month shown to fill the grid) use the `Disable` state.
- A day with a planned event uses `type="Planned"` regardless of its `state`.
- Only one day can be in the `Selected` state at a time.
- The `today` prop on `DayItemSimpleCalendar` is defined in Figma (`"off"` is the only confirmed value). TODO: Confirm the `"on"` value appearance (likely a different highlight for the current calendar date).
- TODO: Confirm the color token and value for the indicator dot.
- TODO: Confirm the color token for the selected day background circle.

---

## Typography

| Element | Text style | Font | Weight | Size token | Color token |
|---|---|---|---|---|---|
| Month/year label | `Body sm/140/Bold` | `--font-family/body` (Manrope) | `--weight/bold` (700) | `--size/base` (14px) | `--text/body` (#34353f) |
| Weekday abbreviations | `Body 2xs/Regular` | `--font-family/body` (Manrope) | `--weight/regular` (400) | `--size/2xs` (11px) | `--text/placeholder` (#636377) |
| Day number (available) | `Body md/SemiBold` | `--font-family/body` (Manrope) | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-default` (#1d1d23) |
| Day number (disabled) | `Body md/SemiBold` | `--font-family/body` (Manrope) | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-disabled` (#636377) |
| Day number (selected) | `Body md/SemiBold` | `--font-family/body` (Manrope) | `--weight/semibold` (600) | `--size/lg` (16px) | `--day-item/text-selected` (#f1f2f4) |

---

## Usage guidelines

- Use Calendar Simple when the user needs to browse a single month and optionally select a date.
- The component is fixed-width (382px). It is designed for use inside a modal, bottom sheet, or a dedicated screen section.
- Navigation between months is handled by the left and right chevrons in the CalendarTitle.
- Out-of-month days are shown in a disabled style to fill the grid visually — they should not be selectable.
- Use the `Planned` type to indicate that a day has an associated event, trip, or scheduled item.
- Do not stack multiple Calendar Simple components in the same view.
- TODO: Confirm whether range selection (selecting a start and end date) is supported or planned.
- TODO: Confirm whether the component supports multi-month navigation or only single-step prev/next.

---

## Interaction

- Tapping a day in the `Available` state transitions it to `Selected` and clears any previously selected day.
- Tapping the left or right chevron navigates to the previous or next month respectively.
- `Disable` days are not interactive — they cannot be tapped to select.
- TODO: Confirm swipe gesture support for month navigation.
- TODO: Confirm whether a `Planned` day can be selected (i.e., whether `Selected` and `Planned` can coexist).
- TODO: Confirm animation/transition spec for month navigation.

---

## Accessibility

- The month/year heading should be announced as a heading or landmark for screen readers.
- Each day cell should have an accessible label describing the full date (e.g., "February 6, 2023") rather than just the number.
- Disabled day cells should use `aria-disabled="true"` and not receive focus.
- The left and right chevrons should have `aria-label` values: "Previous month" and "Next month".
- Planned days should communicate the indicator to screen readers — e.g., "February 9, 2023, has planned activity".
- TODO: Confirm keyboard navigation pattern (Arrow keys to move between days, Enter to select).
- TODO: Confirm `role` for the calendar grid — `role="grid"` with `role="gridcell"` per day is a common approach.

---

## Do / Don't

**Do:**
- Use Calendar Simple for single-date selection within a single month view.
- Use `Disable` for out-of-month days to fill the grid.
- Use `Planned` to indicate days with associated activities.
- Provide full date labels (not just day numbers) for accessibility.

**Don't:**
- Don't use for date range selection unless a confirmed range variant is defined.
- Don't make `Disable` days interactive.
- Don't display more than one month at a time in this component.
- Don't truncate or hide the month/year heading.

---

## Sub-components

- **CalendarTitle** — Standalone header sub-component: left chevron + month/year text + right chevron. Can be referenced independently.
- **DayItemSimpleCalendar** — Individual day cell sub-component. Accepts `date`, `state`, `type`, and `today` props. All four confirmed visual combinations are documented in the Anatomy section above.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `2034:5802`.
- Three main states: `Default` (2034:5799), `Today` (2034:5800), `Active` (2034:5798).
- Sub-component nodes: `DayItemSimpleCalendar` base node around `2033:6105`–`5007:2766`; `CalendarTitle` node `2033:6132`.
- The weekday row starts with Sunday (SUM). This is the confirmed first day of the week.
- The indicator dot on `Planned` days is an image asset in Figma — the exact color token is not confirmed. TODO: Confirm the indicator dot color token.
- The selected day background is also an image asset in Figma — the exact color token is not confirmed. TODO: Confirm the selected day background color token.
- `today` prop on `DayItemSimpleCalendar` only has `"off"` confirmed in Figma. An `"on"` value presumably exists to mark today's date. TODO: Confirm `today="on"` appearance.
- TODO: Confirm whether range selection is planned as a separate component or variant.
