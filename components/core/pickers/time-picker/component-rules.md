# Time Picker — Component Rules

This file defines the writing and usage rules for the Time Picker component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Time Picker is a drum-style (slot-machine/iOS-style) scroll picker for selecting a time of day. It displays three vertically scrolling columns — Hour, Minute, and AM/PM — using the same scroll depth visual system as Time Date Picker, Month Year Picker, and Number Picker. It is used inside bottom-sheet popups that require the user to choose an arrival or appointment time.

> **Note:** Time Picker (3 columns: Hour, Minute, AM/PM) is distinct from Time Date Picker (4 columns: Date, Hour, Minute, AM/PM). Time Picker does not include a Date column.

---

## Variants

Two variants defined by the `period` prop (Figma: `PM` boolean), representing which AM/PM value is selected:

| Variant | Prop value | Figma name | Description |
|---|---|---|---|
| AM | `"AM"` | `PM=off` | AM is selected at position 4. PM appears at position 5. |
| PM | `"PM"` | `PM=on` | PM is selected at position 4. AM appears at position 3. |

> The `period` prop controls which value is centred in the AM/PM column. Use `"AM"` for morning times and `"PM"` for afternoon and evening times.

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

1. **Container** — 375×212px panel. Background: `--surface/neutral/default`. No border-radius. In-app context uses dark surface (`--bg-surface-default`).
2. **Selection indicator** — 31px-tall horizontal stripe centred vertically across the full width. Marks the active selection row. Decorative — `aria-hidden`.
3. **Column group** — centred horizontally (with a 4px right offset from the component centre). `gap` of 27px between columns. Contains 3 columns.
4. **Hour column** — center-aligned. Shows hours in 12-hour format (1–12). 7 visible items. Wraps cyclically.
5. **Minute column** — center-aligned. Shows minutes (0–59, zero-padded to 2 digits). 7 visible items. Wraps cyclically.
6. **AM/PM column** — center-aligned. Shows only AM and PM. Only 2 of 7 slots are populated; all other positions use `opacity-0`.
   - AM selected: AM at position 4 (selected), PM at position 5.
   - PM selected: AM at position 3, PM at position 4 (selected).

### Scroll depth visual system (per column, 7 items)

Identical to Time Date Picker, Month Year Picker, and Number Picker:

| Position | Role | Font size | Opacity | Text color |
|---|---|---|---|---|
| 1 (top) | Furthest above | 12px | 40% | `--text/placeholder` |
| 2 | Near above | 14px | 70% | `--text/placeholder` |
| 3 | Close above | 18px | 100% | `--text/placeholder` |
| 4 (centre) | **Selected** | 23px | 100% | `--text/primary` |
| 5 | Close below | 18px | 100% | `--text/placeholder` |
| 6 | Near below | 14px | 70% | `--text/placeholder` |
| 7 (bottom) | Furthest below | 12px | 40% | `--text/placeholder` |

### AM/PM column slot layout

The AM/PM column has a fixed layout — only positions 3, 4, and 5 may be populated, all others are `opacity-0`:

| Period selected | Pos 3 | Pos 4 (selected) | Pos 5 |
|---|---|---|---|
| AM | `opacity-0` | **AM** | PM |
| PM | AM | **PM** | `opacity-0` |

---

## Usage guidelines

- Use Time Picker only inside a bottom-sheet popup. Do not embed it directly in a page or form.
- Always pair with a confirm action button. The selection must not be applied until the user explicitly confirms.
- Always include a close button (×) in the popup header to allow dismissal without applying changes.
- Use `period="AM"` for morning times and `period="PM"` for afternoon and evening times.
- Hour values are in 12-hour format (1–12) — not 24-hour.
- Minute values are zero-padded to 2 digits (e.g., "09", "41").

---

## Accessibility

- Each column must be a scrollable region with `role="listbox"` and `role="option"` per item.
- Provide accessible column labels: `aria-label="Hour"`, `aria-label="Minute"`, `aria-label="AM or PM"`.
- The selected item in each column must carry `aria-selected="true"`.
- The selection indicator is decorative — mark it `aria-hidden="true"`.
- The popup containing this picker must have `role="dialog"` and an accessible title matching the popup header.
- The close button must have `aria-label="Close"` or equivalent.
- TODO: Confirm keyboard interaction (Up/Down arrows to scroll columns, Tab to move between columns).
- TODO: Confirm focus management on popup open and close.

---

## Do / Don't

**Do:**
- Always show all three columns (Hour, Minute, AM/PM) together.
- Pair with a confirm action button — do not apply the selection on scroll stop.
- Provide a close button to allow dismissal without changes.
- Use `period="PM"` when the initial time is in the afternoon or evening.

**Don't:**
- Don't use this component outside of a popup context.
- Don't apply the selection automatically on scroll — wait for explicit confirmation.
- Don't show a 24-hour format — the component uses 12-hour format with AM/PM.
- Don't use Time Picker when a date column is also needed — use Time Date Picker instead.

---

## Content guidelines

- Hour values: plain integers, 1–12 (no leading zero).
- Minute values: zero-padded to 2 digits (00–59).
- AM/PM values: uppercase "AM" and "PM" — no variation.
- Popup title: set by the consuming context (e.g., "Choose arrive time").
- Confirm button label: set by the consuming context (e.g., "Confirm Time").

---

## Notes

- The scroll depth visual system is identical to Time Date Picker, Month Year Picker, and Number Picker. If the system ever changes, all four components must be updated together.
- The selection indicator is an image asset in the Figma source — confirm the CSS implementation approach.
- The AM/PM column uses `opacity-0` (not `text-[transparent]`) for unpopulated slots — consistent with Month Year Picker's approach.
- The column group has a 4px right offset from the component's horizontal centre (confirmed from Figma: `left: calc(50% + 4px)`). TODO: Confirm whether this offset is intentional or an artefact.
- Confirmed app context: Dojo Customer App, chat-based reservation flow (node `222:9659`). Triggered by "Select Time" action in a Dojo AI chat message.
- TODO: Confirm whether Time Picker is used in other app contexts beyond the reservation chat flow.
- TODO: Confirm hour range behaviour — does the hour column wrap from 12 back to 1?
