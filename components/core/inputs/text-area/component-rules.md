# Text Area — Component Rules

This file defines the writing and usage rules for the Text Area component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Text Area is a multiline free-form text field. It composes three sub-components: `input/label`, `textArea/field`, and `input/feedback-text`. The `input/label` and `input/feedback-text` sub-components are shared with TextInput. The `textArea/field` sub-component (node `2035:12768`) is unique to this component.

The wrapper manages overall validation state (Default, error, success). Sub-components can also be used independently.

---

## Variants

No structural variants. Variation is expressed through props:

- `labelShow` — show/hide the label block
- `descriptionShow` — show/hide the feedback text

TODO: Confirm whether additional layout variants exist.

---

## Sizes

One size confirmed. Height is flexible (not fixed). Border radius is `12px` (rectangular corners — not pill shaped).

TODO: Confirm minimum height.
TODO: Confirm whether fixed-height variants exist.

---

## States

### TextArea wrapper (validation states)

| State | Description |
|-------|-------------|
| `Default` | Neutral. Default border (1px). Feedback text shows info style if present. |
| `error` | Red border (1.5px, `--input/border-error`). Feedback text shows error style. |
| `success` | Green feedback text (`--notification/success-text`). Note: spelled correctly as "success", unlike TextInput's wrapper state "succeded". |

### textArea/field (interaction states)

| State | Description |
|-------|-------------|
| `Default` | Empty, not focused. Placeholder visible. |
| `Focus` | Focused. Cursor and text visible. Dark border (`--input/border-active`, 1.5px). |
| `filled` | Has a value, not focused. Default border. Value text visible. |
| `Error` | Validation failed. Red border (1.5px). |
| `blocked` | Not interactive (disabled). Lighter background (`--input/bg-disabled`). Muted text (`--element/text-muted`). |

Note: The disabled state is named `blocked` in Figma (not `disable` as in TextInput's InputField).

---

## Anatomy

### TextArea (wrapper)

| Part | Optional | Description |
|------|----------|-------------|
| Label (`input/label`) | Yes | Label text, help icon, helper link, and description line |
| Field (`textArea/field`) | No | Multiline text input area |
| Feedback text (`input/feedback-text`) | Yes | Single-line text below the field |

### textArea/field

| Part | Optional | Description |
|------|----------|-------------|
| Text content area | No | Placeholder or entered value text |
| Resize handle | No | Visual affordance in the bottom-right corner (4.5px decorative element) |

### input/label (shared with TextInput)

| Part | Optional | Description |
|------|----------|-------------|
| Label text | No | Manrope Medium 14px, `--text/primary` |
| Help icon | Yes | 20px question mark icon |
| Helper link | Yes | Right-aligned text link |
| Description | Yes | Sub-label line in `--text/placeholder` |

### input/feedback-text (shared with TextInput)

| Part | Optional | Description |
|------|----------|-------------|
| Text | No | Single line. Color varies by type: info, error, success |

---

## Usage guidelines

- Use for free-form multiline text entry where the expected response spans more than one line.
- Use TextInput instead when a single line of text is expected.
- Always include a label in forms. Only omit when context is unambiguous from surrounding copy.
- Use the description line for supplementary instruction — not to repeat the label.
- Use feedback text to communicate validation results.
- Do not use placeholder text as a substitute for a label.
- Mark optional fields clearly in the label text when most fields in the form are required.

---

## Accessibility

- The field must have an accessible label via `<label>` or `aria-labelledby`.
- Error feedback must be associated with the field via `aria-describedby`.
- The blocked (disabled) state must use `aria-disabled="true"` or native `disabled` on the `<textarea>` element.
- The help icon must have an `aria-label` or tooltip accessible to screen readers.

TODO: Confirm focus ring style and keyboard interaction pattern.

---

## Do / Don't

**Do:**
- Use for open-ended, multi-sentence input (messages, reasons, descriptions, special requests)
- Write labels as short noun phrases in sentence case
- Show error feedback immediately on failed validation
- Use placeholder text as a brief prompt or format hint

**Don't:**
- Use for single-line input — use TextInput instead
- Use placeholder text as the only field label
- Use the description slot and feedback slot for unrelated content simultaneously
- Use in place of a rich text editor when formatting controls are required

---

## Content guidelines

- **Label text:** Short noun phrase, sentence case. Example: "Add special request (optional)", "Cancellation reason"
- **Placeholder text:** Brief prompt or instruction. Example: "Enter your instructions here...", "Please enter any special request"
- **Description text:** One sentence, plain language. Example: "Note that special requests cannot be guaranteed."
- **Feedback text (error):** Short, specific, actionable. Example: "Validation text of warning"
- **Feedback text (success):** Confirmatory. Example: "Validation text of success"
- **Feedback text (info):** Neutral guidance. Example: "Helper text for data entry"

---

## Notes

- `TextArea` (node `2035:12927`) is the composite wrapper.
- `textArea/field` (node `2035:12768`) is the standalone field sub-component with 5 interaction states.
- `input/label` (node `5082:730`) and `input/feedback-text` (node `5082:753`) are shared with TextInput.
- The disabled state is named `blocked` in Figma (not `disable` as in TextInput).
- The disabled text token is `--element/text-muted (#929fb1)`, not `--input/text-disabled`.
- The wrapper validation states use "success" (correctly spelled), unlike TextInput's "succeded".
- The field uses `border-radius: 12px` (rectangular), not pill shaped.
- A resize affordance is visible in the bottom-right corner of the field.
- Token values differ between light and dark surfaces — see `text-area.tokens.json`.
