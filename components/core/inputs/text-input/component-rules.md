# Text Input — Component Rules

This file defines the writing and usage rules for the Text Input component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Text Input is a single-line free-form text field. It composes three sub-components: `input/label`, `input/field`, and `input/feedback-text`. The wrapper manages overall validation state (default, error, succeeded). Sub-components can also be used independently.

---

## Variants

No structural variants. Variation is expressed through props:
- `labelShow` — show/hide the label block
- `message` — show/hide the feedback text
- `leftIcon`, `rightIcon` — optional icons inside the field
- `button` — optional inline action button inside the field

TODO: Confirm whether a multiline/textarea variant exists.

---

## Sizes

One size confirmed. Field height is always `44px`. Border radius is `12px` (rectangular corners — not pill shaped).

TODO: Confirm whether additional sizes exist.

---

## States

### TextInput wrapper (validation states)

| State | Description |
|-------|-------------|
| `default` | Neutral. Default border (1px). Feedback text shows info style if present. |
| `error` | Red border (1.5px, `--input/border-error`). Feedback text shows error style. |
| `succeded` | Green border (1.5px, `--input/border-success`). Feedback text shows success style. Note: "succeded" is the exact Figma prop name (one 'd'). |

### InputField (interaction states)

| State | Description |
|-------|-------------|
| `Default` | Empty, not focused. Placeholder visible. |
| `focus` | Focused, not yet typed. Dark border (`--input/border-active`). Placeholder visible. |
| `typing` | Actively typing. Dark border. Text + cursor visible. |
| `filled` | Has a value, not focused. Default border. Value text visible in `--input/text-input`. |
| `error` | Validation failed. Red border (1.5px). |
| `succeded` | Validation passed. Green border (1.5px). |
| `disable` | Not interactive. Lighter background (`--input/bg-disabled`). Muted text (`--input/text-disabled`). |

---

## Anatomy

### TextInput (wrapper)
| Part | Optional | Description |
|------|----------|-------------|
| Label (`input/label`) | Yes | Label text, help icon, helper link, and description line |
| Field (`input/field`) | No | Interactive input area |
| Feedback text (`input/feedback-text`) | Yes | Single-line text below the field |

### InputField
| Part | Optional | Description |
|------|----------|-------------|
| Left icon | Yes | 24px icon, left of the text area |
| Text content area | No | Placeholder or value + optional cursor |
| Right icon | Yes | 24px icon, right of the text area |
| Inline button | Yes | 32px pill button, right-aligned inside the field |

### InputLabel
| Part | Optional | Description |
|------|----------|-------------|
| Label text | No | Manrope Medium 14px, `--text/primary` |
| Help icon | Yes | 20px question mark icon |
| Helper link | Yes | Right-aligned text link |
| Description | Yes | Sub-label line in `--text/placeholder` |

### InputFeedbackText
| Part | Optional | Description |
|------|----------|-------------|
| Text | No | Single line. Color varies by type: info, error, success |

---

## Usage guidelines

- Use for free-form single-line text entry.
- Always include a label in forms. Only omit in highly constrained layouts where context is unambiguous.
- Use the description line for additional instruction, not for repeating the label.
- Do not combine the description slot and the feedback slot for different purposes simultaneously.
- Use the inline button when a contextual action (clear, apply, verify) is always tied to the field.
- Do not use placeholder text as a substitute for a label.

---

## Accessibility

- The field must have an accessible label via `<label>` or `aria-labelledby`.
- Error feedback must be associated via `aria-describedby`.
- The disabled state must use `aria-disabled="true"` or native `disabled`.
- The help icon must have an `aria-label` or tooltip.
- The inline button must have its own accessible label.

TODO: Confirm focus ring style and keyboard pattern.

---

## Do / Don't

**Do:**
- Write labels as short noun phrases (2–4 words)
- Use placeholder as a format hint when useful ("MM/YY", "1234 5678 9012 3456")
- Show error feedback text immediately on failed validation

**Don't:**
- Use placeholder as the only label
- Use description for error messages
- Combine left icon + right icon + inline button in one field

---

## Content guidelines

- **Label text:** Short noun phrase, sentence case. Example: "Card number", "Emergency contact name"
- **Placeholder text:** Format hint or brief prompt. Example: "1234 5678 9012 3456", "Enter your new number"
- **Description text:** One sentence, plain language. Example: "This information will be shared with riders."
- **Helper link text:** Action-oriented, short. Example: "Forgot password?"
- **Feedback text (error):** Short, specific, actionable. Example: "Validation text of warning"
- **Feedback text (success):** Confirmatory. Example: "Validation text of success"
- **Feedback text (info):** Neutral guidance. Example: "Helper text for data entry"

---

## Notes

- `TextInput` (node `5082:809`) is the composite wrapper.
- `input/field` (node `5082:663`) is the standalone field sub-component with 7 interaction states.
- `input/label` (node `5082:730`) is the standalone label sub-component.
- `input/feedback-text` (node `5082:753`) is the standalone feedback text sub-component.
- "succeded" (one 'd') is the exact spelling used in Figma prop names. Use "succeeded" in documentation.
- Token values differ between light and dark surfaces — see `text-input.tokens.json`.
- The field uses `border-radius: 12px` (rectangular), not the pill shape used in other input components in this library.
