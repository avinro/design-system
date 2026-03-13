# Select Boolean — Component Rules

This file defines the writing and usage rules for the Select Boolean component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Select Boolean is a binary choice input presenting a question label and two mutually exclusive pill-shaped buttons. One option is always selected. It uses Default button style (filled) for the selected option and Secondary button style (transparent) for the unselected one.

---

## Variants

No visual variants confirmed. Single layout only.

The option labels are configurable and not fixed to "Yes / No".

TODO: Confirm whether a variant exists where the question label is hidden.

---

## Sizes

One size confirmed: both option buttons are always `44px` tall with `--rounded-full` (120px) border radius.

TODO: Confirm whether size variants exist.

---

## States

| State | Description |
|-------|-------------|
| Option A selected | Left button is filled (Default style). Right button is transparent (Secondary style). |
| Option B selected | Right button is filled (Default style). Left button is transparent (Secondary style). |

There is no empty/unselected state. One option is always active.

TODO: Confirm whether a disabled state exists for individual options or the full component.

---

## Anatomy

| Part | Optional | Description |
|------|----------|-------------|
| Question Label | No | Short text question above the option group. Manrope Medium 14px, `--text/body`. |
| Option Group | No | Horizontal row of two equal-width pill buttons with 4px gap. |
| Option A (left button) | No | First choice. Equal width, `flex: 1`. |
| Option B (right button) | No | Second choice. Equal width, `flex: 1`. |

---

## Usage guidelines

- Use when the question has exactly two mutually exclusive answers.
- Always write the question label as a direct, complete question.
- One option must always be pre-selected — there is no unselected/empty state.
- Do not use for more than two choices. Use a different input pattern (radio group, segmented control) for three or more options.
- Options must be exhaustive and mutually exclusive.
- Keep option labels to 1–2 words.

---

## Accessibility

- Implement as a `radiogroup` with `radio` inputs, or as toggle buttons with `aria-pressed`.
- The question label must be associated with the group via `aria-labelledby` or `fieldset`/`legend`.
- The selected option must be communicated to assistive technology.
- Both options must be keyboard-operable.

TODO: Confirm ARIA implementation pattern.

---

## Do / Don't

**Do:**
- Write the label as a direct question ("Do you have accommodation?")
- Keep option labels short and meaningful (1–2 words)
- Always pre-select a sensible default

**Don't:**
- Use Select Boolean for more than two options
- Use vague labels ("Option A / Option B")
- Leave both options unselected

---

## Content guidelines

- **Question label:** Full question sentence, sentence case. Example: "Do you already have accommodation?"
- **Option labels:** Title case, 1–2 words. Examples: "Yes / No", "With / Without", "One-way / Return"

---

## Notes

- The component is identified as `select_boolean` in Figma (kebab: `select-boolean`), node `417:4036` in the Customer App.
- The selected option uses the same tokens as the Default button type. The unselected option uses the same tokens as the Secondary button type.
- Confirmed usage: Customer App "New Plan" form — "Do you already have accommodation?" (Yes / No).
- TODO: Confirm the exact DS Core component node ID for `select_boolean`.
