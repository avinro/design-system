# Age Range Picker — Component Rules

This file defines the writing and usage rules for the Age Range Picker component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Age Range Picker is a drum-style (slot-machine/iOS-style) scroll picker for selecting an age range. It displays two independent vertically scrolling columns — a "from" age and a "to" age — separated by static "from" and "to" labels. The component uses the same scroll depth visual system as Time Picker, Time Date Picker, Month Year Picker, and Number Picker. It is used inside bottom-sheet popups when the user needs to specify a group age range (e.g., for venue reservations).

---

## Variants

No variants. The DS Core component defines a single state. The "from" column always shows a start-of-range boundary (positions 1–3 masked with `opacity: 0`), and the "to" column shows a mid-range value (all 7 positions visible).

---

## Sizes

Single size. No size variants.

| Property | Value |
|---|---|
| Width | 375px |
| Height | 212px |

---

## States

No explicit state variants at the composite level. Visual state is entirely driven by the scroll positions of each column.

---

## Anatomy

1. **Container** — 375×212px panel. Background: `--surface/neutral/default`. No border-radius. In-app context uses dark surface (`--bg-surface-default`).
2. **Selection indicator** — 31px-tall horizontal stripe centred vertically across the full width. Marks the active selection row for both columns simultaneously. Decorative — `aria-hidden`.
3. **Column group** — flex row centred horizontally (with a 4px right offset from component centre). `gap` of 27px between all elements. Contains 4 child elements: "from" label, from-age column, "to" label, to-age column.
4. **"from" label** — static text label. Manrope Medium (500), 14px, `--text/placeholder`. Vertically aligned to the selection centre. Not part of the drum scroll system.
5. **From-age column** — center-aligned drum column. Displays age integers. Positions 1–3 above the selection use `opacity: 0` (start-of-range boundary masking — minimum age cannot be scrolled past).
6. **"to" label** — static text label. Same style as "from" label. Visually separates the two columns.
7. **To-age column** — center-aligned drum column. Displays age integers. All 7 positions are populated and visible (mid-range behaviour).

### Scroll depth visual system (per drum column, 7 items)

Identical to Time Picker, Time Date Picker, Month Year Picker, and Number Picker:

| Position | Role | Font size | Opacity | Text color |
|---|---|---|---|---|
| 1 (top) | Furthest above | 12px | 40% | `--text/placeholder` |
| 2 | Near above | 14px | 70% | `--text/placeholder` |
| 3 | Close above | 18px | 100% | `--text/placeholder` |
| 4 (centre) | **Selected** | 23px | 100% | `--text/primary` |
| 5 | Close below | 18px | 100% | `--text/placeholder` |
| 6 | Near below | 14px | 70% | `--text/placeholder` |
| 7 (bottom) | Furthest below | 12px | 40% | `--text/placeholder` |

> In the from-age column, positions 1, 2, and 3 (above the selection) use `opacity: 0` to mask the start-of-range boundary. The to-age column always shows all 7 positions.

---

## Usage guidelines

- Use Age Range Picker only inside a bottom-sheet popup. Do not embed it directly in a page or form.
- Always pair with a confirm action button. The selection must not be applied until the user explicitly confirms.
- Always include a close button (×) in the popup header to allow dismissal without applying changes.
- The "from" age must always be less than or equal to the "to" age. Validate this constraint on confirmation.
- The from-age column has a lower boundary (minimum age). The `opacity: 0` masking on positions 1–3 communicates this boundary to the user visually.
- TODO: Confirm the minimum and maximum age values for the available range.
- TODO: Confirm whether the "to" column also has an upper boundary condition.

---

## Accessibility

- Each column must be a scrollable region with `role="listbox"` and `role="option"` per item.
- Provide accessible column labels: `aria-label="From age"` and `aria-label="To age"`.
- The selected item in each column must carry `aria-selected="true"`.
- The "from" and "to" text labels are presentational — they clarify the range intent. Consider associating them with their respective columns via `aria-labelledby` or visible label proximity.
- The selection indicator is decorative — mark it `aria-hidden="true"`.
- The popup containing this picker must have `role="dialog"` and an accessible title matching the popup header.
- The close button must have `aria-label="Close"` or equivalent.
- TODO: Confirm keyboard interaction (Up/Down arrows to scroll each column, Tab to move between columns).
- TODO: Confirm focus management on popup open and close.
- TODO: Confirm how range validation (from ≤ to) is communicated to assistive technology.

---

## Do / Don't

**Do:**
- Show both "from" and "to" columns together at all times.
- Pair with a confirm action button — do not apply the selection on scroll stop.
- Provide a close button to allow dismissal without changes.
- Validate that the from-age is not greater than the to-age on confirmation.

**Don't:**
- Don't use this component outside of a popup context.
- Don't apply the selection automatically on scroll — wait for explicit confirmation.
- Don't show ages below the minimum boundary in the from-age column.
- Don't show the from-age and to-age columns separately or independently.

---

## Content guidelines

- Age values: plain integers (e.g., 18, 41). No unit suffix.
- "from" and "to" labels: lowercase, Manrope Medium — do not alter the casing or font weight.
- Popup title: set by the consuming context (e.g., "Select age range").
- Confirm button label: set by the consuming context (e.g., "Confirm age range").

---

## Notes

- The scroll depth visual system is identical to Time Picker, Time Date Picker, Month Year Picker, and Number Picker. If the system changes, all five components must be updated together.
- The selection indicator is an image asset in the Figma source — confirm the CSS implementation approach.
- The from-age column uses `opacity: 0` for start-of-range masking (positions 1–3) — consistent with the approach used in Time Picker's AM/PM column for unpopulated slots.
- The "from" and "to" labels use Manrope Medium (weight 500), not Regular. This distinguishes them visually from the drum column items (Regular, weight 400).
- The column group has a 4px right offset from the component's horizontal centre (confirmed from Figma: `left: calc(50% + 4px)`). TODO: Confirm whether this offset is intentional or an artefact.
- Confirmed app context: Dojo Customer App, chat-based reservation flow (node `427:8852`). Triggered after the user confirms their arrival time. The Dojo AI asks for the group's age range.
- TODO: Confirm whether Age Range Picker is used in other app contexts beyond the reservation chat flow.
- TODO: Confirm the minimum and maximum age values of the available range.
- TODO: Confirm whether a `type=end` condition exists for the to-age column (upper age boundary).
