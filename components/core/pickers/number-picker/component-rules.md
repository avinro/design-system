# Number Picker — Component Rules

This file defines the writing and usage rules for the Number Picker component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Number Picker is a drum-style (slot-machine/iOS-style) scroll picker for selecting a single numeric value. It displays one vertically scrolling column — center-aligned — using the same scroll depth visual system as Time Date Picker and Month Year Picker. It is used inside bottom-sheet popups that require the user to pick a quantity or capacity value (e.g., number of passengers).

---

## Variants

Three variants defined by the `type` prop, representing the boundary condition of the value column:

| Variant | Prop value | Description |
|---|---|---|
| End | `end` | The selected value is the minimum (start of range). Positions 1–3 above the selection use `text-[transparent]` to hide out-of-range values. |
| Middle | `middle` | The selected value is mid-range. All 7 positions are populated and visible. |
| Travelers | `travelers` | Like `end`, but the minimum value is labeled "Only me" instead of a number. Positions 1–3 use `text-[transparent]`. |

> Use `type=end` when the user has scrolled to the lowest available value. Use `type=middle` for any value within range. Use `type=travelers` when the first selectable option is a text label rather than a number.

---

## Sizes

Single size. No size variants.

| Property | Value |
|---|---|
| Width | 375px |
| Height | 212px |

---

## States

No explicit state variants at the composite level. Visual state is entirely driven by the scroll position of the column.

---

## Anatomy

1. **Container** — 375×212px panel. Background: `--surface/neutral/default`. No border-radius.
2. **Selection indicator** — 31px-tall horizontal stripe centred vertically across the full width. Marks the active selection row. Decorative — `aria-hidden`.
3. **Value column** — center-aligned. Displays numeric values (or "Only me" as the first label in `type=travelers`). 7 visible slots. Start-of-range boundary masking applied in `type=end` and `type=travelers`.

### Scroll depth visual system (7 items per column)

Identical to the Time Date Picker and Month Year Picker systems:

| Position | Role | Font size | Opacity | Text color |
|---|---|---|---|---|
| 1 (top) | Furthest above | 12px | 40% | `--text/placeholder` |
| 2 | Near above | 14px | 70% | `--text/placeholder` |
| 3 | Close above | 18px | 100% | `--text/placeholder` |
| 4 (centre) | **Selected** | 23px | 100% | `--text/primary` |
| 5 | Close below | 18px | 100% | `--text/placeholder` |
| 6 | Near below | 14px | 70% | `--text/placeholder` |
| 7 (bottom) | Furthest below | 12px | 40% | `--text/placeholder` |

> In `type=end` and `type=travelers`, positions 1, 2, and 3 (above the selection) use `text-[transparent]` to mask out-of-range slots. The values are present in the DOM but invisible. Positions 5–7 remain visible.

---

## Usage guidelines

- Use Number Picker inside a bottom-sheet popup only — not as a standalone UI element.
- Always pair with a confirm action button. The selection must not be applied until the user explicitly confirms.
- Provide a close (×) button in the popup header to allow dismissal without applying the selection.
- Use `type=end` when the selected value is at the minimum of the available range.
- Use `type=middle` when the selected value is within the middle of the range.
- Use `type=travelers` when the minimum value is represented by a text label (e.g., "Only me") rather than a number.
- Value labels may include a unit suffix (e.g., "4 Passenger") — confirmed from Driver App context. TODO: Confirm whether unit suffixes are part of the component or applied externally.

---

## Accessibility

- The column must have a scrollable region with `role="listbox"` and `role="option"` per item.
- Provide an accessible label for the column: `aria-label` matching the popup context (e.g., `aria-label="Passenger capacity"`).
- The selected item must carry `aria-selected="true"`.
- The selection indicator is decorative — mark it `aria-hidden="true"`.
- The popup containing this picker must have `role="dialog"` and an accessible title matching the popup header.
- The close button must have `aria-label="Close"` or equivalent.
- TODO: Confirm keyboard interaction (Up/Down arrows to scroll, Tab to reach confirm button).
- TODO: Confirm focus management on popup open and close.

---

## Do / Don't

**Do:**
- Use `type=end` or `type=travelers` when the selected value is at the minimum boundary.
- Pair with a confirm action button — do not apply the selection on scroll stop.
- Provide a close button to allow dismissal without changes.
- Use `type=travelers` when the first option is a non-numeric label such as "Only me".

**Don't:**
- Don't use this component outside of a popup context.
- Don't apply the selection automatically on scroll — wait for explicit confirmation.
- Don't show values below the defined lower boundary.
- Don't use `type=end` when the minimum is a non-numeric label — use `type=travelers` instead.

---

## Content guidelines

- Numeric values: plain integers (e.g., 01, 02, 03) or with unit suffix (e.g., "4 Passenger").
- Special first-value label: "Only me" (confirmed from Figma `type=travelers`).
- Popup title: set by the consuming context (e.g., "Select Passenger Capacity").
- Confirm button label: set by the consuming context (e.g., "Confirm Vehicle Type").

---

## Notes

- The scroll depth visual system is identical to Time Date Picker and Month Year Picker. If the system ever changes, all three components must be updated together.
- The selection indicator is an image asset in the Figma source — confirm the CSS implementation approach.
- Start-of-range boundary masking uses `text-[transparent]` (not `opacity-0`) — this differs from Month Year Picker's `opacity-0` approach. Both hide the slot but `text-[transparent]` is a Tailwind color class rather than an opacity override.
- `type=travelers` is structurally identical to `type=end` except for the "Only me" label at position 4.
- TODO: Confirm the full range of available numeric values for each use case.
- TODO: Confirm whether unit suffixes (e.g., "Passenger") are embedded in the component or added by the consuming context.
- TODO: Re-inspect Customer App context node `769:12739` when accessible.
- TODO: Confirm scroll boundary behaviour — does the drum stop at the boundary, or does it continue scrolling with transparent masking?
