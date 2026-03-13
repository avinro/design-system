# Month Year Picker — Component Rules

This file defines the writing and usage rules for the Month Year Picker component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Month Year Picker is a drum-style (slot-machine/iOS-style) scroll picker that lets users select a month and year. It displays two vertical columns — Month and Year — using the same visual depth system as the Time Date Picker. It is used inside a "Month and Year" bottom-sheet popup that allows users to navigate the Calendar Plan Page to any month and year.

---

## Variants

Two variants defined by the `type` prop, representing the position of the selected year within the available range:

| Variant | Prop value | Description |
|---|---|---|
| End | `end` | The selected year is the most recent in the range. No future years are visible — positions 5, 6, and 7 in the year column use `opacity-0`. |
| Middle | `middle` | The selected year is mid-range. Years both before and after the selection are visible. All 7 year column positions are populated and visible. |

> The `type` prop reflects the scroll boundary condition of the year column. Use `end` when the user has scrolled to the most recent available year. Use `middle` for any earlier year.

---

## Sizes

Single size. No size variants.

| Property | Value |
|---|---|
| Width | 375px |
| Height | 212px |

---

## States

No explicit state variants at the composite level. Visual state is entirely driven by the scroll position of each column.

---

## Anatomy

1. **Container** — 375×212px panel. Background: `--surface/neutral/default`. No border-radius.
2. **Selection indicator** — 31px-tall horizontal stripe centred vertically across the full width. Marks the active selection row. Decorative — `aria-hidden`.
3. **Column group** — centred horizontally. `gap` of 27px between columns. Contains 2 columns.
4. **Month column** — right-aligned. Shows full month names (e.g., September, November, December, January…). 7 visible items.
5. **Year column** — left-aligned. Shows 4-digit years. 7 visible slots; in `type=end`, positions 5–7 are `opacity-0`.

### Scroll depth visual system (per column, 7 items)

Identical to the Time Date Picker system:

| Position | Role | Font size | Opacity | Text color |
|---|---|---|---|---|
| 1 (top) | Furthest above | 12px | 40% | `--text/placeholder` |
| 2 | Near above | 14px | 70% | `--text/placeholder` |
| 3 | Close above | 18px | 100% | `--text/placeholder` |
| 4 (centre) | **Selected** | 23px | 100% | `--text/primary` |
| 5 | Close below | 18px | 100% | `--text/placeholder` |
| 6 | Near below | 14px | 70% | `--text/placeholder` |
| 7 (bottom) | Furthest below | 12px | 40% | `--text/placeholder` |

> In `type=end`, positions 5, 6, and 7 of the year column use `opacity-0` instead of the above values. The month column is always fully visible.

---

## Usage guidelines

- Use Month Year Picker inside the "Month and Year" popup only — not as a standalone UI element.
- This picker is triggered by tapping the month/year label (e.g., "Jun, 2026 ▾") in the Plan page Header. It allows the user to navigate to a different month and year.
- Always pair the picker with a "Confirm Date" primary action button. The selection is not applied until the user confirms.
- Provide a close (×) button in the popup header to allow dismissal without applying the selection.
- Use `type=end` when the selected year is the most recent in the available range. Use `type=middle` otherwise.
- Month names are displayed in full (e.g., "January", not "Jan").

---

## Accessibility

- Each column should be a scrollable region with an accessible role (e.g., `role="listbox"` per column, `role="option"` per item).
- Provide accessible labels for each column: `aria-label="Month"` and `aria-label="Year"`.
- The selected item in each column should carry `aria-selected="true"`.
- The selection indicator is decorative — mark it `aria-hidden="true"`.
- The popup that contains this picker must have `role="dialog"` and an accessible title matching the header label ("Month and Year").
- The close button must have `aria-label="Close"` or equivalent.
- TODO: Confirm keyboard interaction for column scrolling (Up/Down arrows to change value, Tab to move between columns).
- TODO: Confirm focus management when the popup opens and closes.

---

## Do / Don't

**Do:**
- Always show both Month and Year columns together.
- Use `type=end` when the selected year is the upper boundary of the scroll range.
- Pair with a "Confirm Date" action — do not apply the selection on scroll stop alone.
- Provide a close button to dismiss without applying changes.

**Don't:**
- Don't use this component outside of the Month and Year popup context.
- Don't show a single column (month-only or year-only).
- Don't apply the selection automatically on scroll — wait for explicit confirmation.
- Don't show future years beyond the defined upper boundary.

---

## Content guidelines

- Month labels: full English names, title case (January, February … December).
- Year labels: 4-digit format (e.g., 2023, 2026). No suffix or prefix.

---

## Notes

- The scroll depth visual system is identical to Time Date Picker. If the system ever changes, both components must be updated together.
- The selection indicator is an image asset in the Figma source — confirm the CSS implementation approach (top/bottom border lines or equivalent).
- The `type=end` variant clips future years using `opacity-0` on positions 5–7 of the year column; the month column is unaffected.
- TODO: Confirm the range of available years (how far back and how far forward the year column extends).
- TODO: Confirm scroll boundary behaviour — does the drum stop at the boundary year, or does it use `opacity-0` to visually mask an infinite scroll?
- TODO: Confirm whether a `type=start` (most historical year selected, no past years visible) is needed.
