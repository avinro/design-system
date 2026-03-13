# Radio Select — Component Rules

This file defines the writing and usage rules for the Radio Select component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Radio Select is a single-selection input component that presents mutually exclusive choices as radio buttons. It supports three visual configurations — basic, with description, and boxed — and is built from two internal base sub-components: `_base-radio` (the circular indicator) and `_base-label-checkbox` (the text container).

---

## Variants

- **radio-basic** — Radio indicator + label text only. No description. Most compact option.
- **radio+description** — Radio indicator + label + secondary description text below the label. No container border.
- **radio-boxed** — Radio indicator + label + description, wrapped in a bordered card container with drop shadow. Border color changes to primary when checked.

---

## Sizes

- Single size only. No size variants confirmed.
- Radio indicator: `24×24px`
- Font size: `14px` (`--size/base`)

---

## States

- **Unchecked** (default) — empty radio ring, neutral border in boxed variant
- **Checked** — filled primary-colored radio, primary border in boxed variant

TODO: Confirm hover, focus, and disabled states and their visual treatments.

---

## Anatomy

1. **Radio indicator** (`_base-radio`) — 24×24px circular control. Renders as empty ring (unchecked) or filled primary circle (checked).
2. **Label text** — Primary option text. SemiBold, `--text/primary`. Always present.
3. **Description text** — Secondary clarifying text below the label. Regular, `--text/placeholder`. Present only in `radio+description` and `radio-boxed`.
4. **Card container** — Bordered box with drop shadow, rounded corners, and 12px padding. Present only in `radio-boxed`.

---

## Usage guidelines

- Use when the user must select exactly one option from a visible, finite list.
- Use `radio-basic` for short option labels with no supplementary context needed.
- Use `radio+description` when a clarifying secondary line improves comprehension.
- Use `radio-boxed` when options represent visually distinct choices (e.g. plan types, delivery methods, payment options).
- Always render at least two items in a group.
- Do not mix variants within the same radio group.
- Do not use for binary yes/no choices — use Select Boolean instead.
- Do not use for multi-selection — use Checkbox instead.

---

## Accessibility

- Group items with `<fieldset>`/`<legend>` or `role="radiogroup"` + `aria-labelledby`.
- Each item: native `<input type="radio">` or `role="radio"` + `aria-checked`.
- Keyboard: arrow keys navigate within the group, Tab exits the group.
- Focus ring must be visible on the active item.
- Checked state must not be conveyed by color alone — the indicator shape must also change.

TODO: Confirm focus ring styling and exact ARIA pattern from implementation.

---

## Do / Don't

**Do:**
- Keep option labels short (1–5 words).
- Add description text when the label alone is not self-explanatory.
- Keep all options within a group visually consistent — same variant, same layout.

**Don't:**
- Use for multi-selection.
- Use a single radio button without at least one sibling option.
- Write long paragraphs as description text — one short sentence is the maximum.
- Mix `radio-boxed` with unboxed variants in the same group.

---

## Content guidelines

- **Option labels**: short noun-based or adjective-based phrases. Avoid starting with verbs.
- **Description text**: one concise sentence that clarifies or qualifies the option. Must add value — do not repeat the label.
- Use sentence-style capitalisation for both labels and descriptions.

---

## Notes

- The component is composed of two internal base sub-components: `_base-radio` and `_base-label-checkbox`. These are not intended to be used independently outside the Radio Select context.
- Used across both Customer and Driver apps for single-select preferences, filter selections, and settings flows.

TODO: Confirm whether a disabled state exists and what its visual treatment is.
