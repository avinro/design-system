# Checkbox — Component Rules

This file defines the writing and usage rules for the Checkbox component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Checkbox is a multi-selection input that lets users independently toggle options on or off. Any number of options in a group may be selected at once. It is built from two internal base sub-components: `_base-checkbox` (the square indicator) and `_base-label-checkbox` (the text container, shared with Radio Select).

---

## Variants

- **checkbox-basic** — Checkbox indicator on the left + label text only. No description. Most compact option.
- **check+description** — Checkbox indicator on the left + label + secondary description text below. No border container.
- **check-boxed** — Label + description on the left, checkbox indicator on the **right**, enclosed in a bordered card with drop shadow. Border changes to primary when checked.

Layout difference: in `checkbox-basic` and `check+description` the indicator is left-aligned. In `check-boxed` the indicator is right-aligned — the label area fills the remaining horizontal space.

---

## Sizes

- Single size only. No size variants confirmed.
- Checkbox indicator (outer): `24×24px`
- Checkbox indicator (inner square): `20×20px`, border radius `5px`
- Font size: `14px` (`--size/base`)

---

## States

- **Off** (unchecked) — empty outlined square, neutral border in boxed variant
- **On** (checked) — filled orange square with white checkmark, primary border in boxed variant
- **Intermediate** — filled orange square with white horizontal dash; exposed at `_base-checkbox` level; use only for indeterminate "select all" controls

TODO: Confirm hover, focus, and disabled states and their visual treatments.

---

## Anatomy

1. **Checkbox indicator** (`_base-checkbox`) — 24×24px square control. Three visual states: off, on, intermediate.
2. **Label text** — Primary option text. SemiBold, `--text/primary`. Always present.
3. **Description text** — Secondary clarifying text. Regular, `--text/placeholder`. Present in `check+description` and `check-boxed` only.
4. **Card container** — Bordered box with drop shadow, rounded corners, and `12px` padding. Present in `check-boxed` only. Checkbox indicator is positioned on the right in this variant.

---

## Usage guidelines

- Use when users may select any number of options independently.
- Do not use for mutually exclusive choices — use Radio Select instead.
- Use `checkbox-basic` for short labels with no supplementary context.
- Use `check+description` when a clarifying line improves comprehension without adding visual weight.
- Use `check-boxed` when options benefit from visual containment and a right-aligned indicator suits the layout.
- Use the intermediate state only on a parent "select all" control — never on a regular toggleable item.
- Always pair a checkbox group with a visible group heading or label.
- Do not use to trigger immediate actions — use a Button for that.

---

## Accessibility

- Group items with `<fieldset>`/`<legend>` or `role="group"` + `aria-labelledby`.
- Each item: native `<input type="checkbox">` or `role="checkbox"` + `aria-checked`.
- Intermediate state: set `aria-checked="mixed"`.
- Keyboard: `Space` toggles the focused checkbox; `Tab` moves between items.
- Focus ring must be visible on the active item.
- State must not be conveyed by color alone — indicator shape must also change.

TODO: Confirm focus ring styling and exact ARIA pattern from implementation.

---

## Do / Don't

**Do:**
- Use for multi-selection where any combination of options is valid.
- Keep option labels short (1–5 words).
- Add description text only when it adds meaningful context — do not repeat the label.
- Keep all options in a group visually consistent — same variant throughout.
- Use intermediate state only on "select all" parent controls.

**Don't:**
- Use for mutually exclusive choices (use Radio Select).
- Use intermediate state on a regular selectable option.
- Mix `check-boxed` with unboxed variants in the same group.
- Use long paragraphs as description text — one short sentence maximum.

---

## Content guidelines

- **Option labels**: short noun-based or adjective-based phrases. Avoid starting with verbs.
- **Description text**: one concise sentence that clarifies or qualifies the option. Must add value — do not restate the label.
- Use sentence-style capitalisation for both labels and descriptions.

---

## Notes

- The component is composed of two internal base sub-components: `_base-checkbox` and `_base-label-checkbox`.
- `_base-label-checkbox` is shared with the Radio Select component.
- `_base-checkbox` supports three indicator states: `on`, `off`, and `intermediate`. The master Checkbox component currently exposes only `on` and `off` (`checked: yes/no`). The intermediate state is available at the base component level.
- The `check-boxed` variant places the indicator on the **right** — this is a deliberate layout difference from the other two variants.

TODO: Confirm whether a disabled state exists and what its visual treatment is.
