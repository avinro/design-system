# Dropdown Input — Component Rules

This file defines the writing and usage rules for the Dropdown Input component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Dropdown Input is a form field wrapper that combines an optional label, a pill-shaped select button (`select_button`), and optional annotation text. It acts as a trigger for a separate picker or overlay — it does not contain the selection UI itself.

It is the standard way to represent a selectable field in forms across the Dojo apps.

---

## Variants

Variation is expressed through props, not named component variants:

- **With left icon** — the `select_button` includes a 16px icon to the left of the value text. Used when the field type benefits from a visual icon cue.
- **Without left icon** — the `select_button` shows only the text and chevron.

The inner `select_button` sub-component has named type variants (confirmed: `preselected`). Full enumeration requires verification against all Figma frames.

TODO: List all named type variants of `select_button`.

---

## Sizes

One size confirmed: the select button is always `44px` tall with `--rounded-full` (120px) border radius.

TODO: Confirm whether any size variants exist for the select button.

---

## States

| State | Trigger | Text style |
|-------|---------|------------|
| Placeholder | No value selected | `--text/placeholder` (muted) |
| Preselected / Filled | Value selected | `--button/secondary/text-default` (body color) |

TODO: Confirm whether a disabled state exists and how it is styled.
TODO: Confirm whether an error/invalid state exists.

---

## Anatomy

| Part | Optional | Description |
|------|----------|-------------|
| Label | Yes | Short field label above the select button |
| SelectButton | No | Pill-shaped tap target. Contains left icon (optional), text, and chevron |
| Left Icon | Yes | 16px icon inside the select button, left of the text |
| Value / Placeholder Text | No | Shows selected value or placeholder hint |
| Chevron Icon | No | 24px dropdown chevron, always right-aligned |
| Annotation | Yes | Helper text row below the button, prefixed with a 16px info icon |

The `select_button` and `anotation` are named sub-components in Figma and can be used independently.

---

## Usage guidelines

- Use Dropdown Input whenever a field requires a picker, bottom sheet, or overlay to select a value.
- Always include a label in multi-field forms. Omit only when the placeholder is unambiguous and the form context is clear.
- Use annotation text for helper guidance, constraints, or examples. Do not use it for error feedback.
- The component does not manage tap interaction or open any overlay — the parent screen handles that behavior.
- Fields should be full-width within their container and stacked vertically in forms.

---

## Accessibility

- The select button must have an accessible label matching the visible field label.
- When a value is selected, the button's accessible name must reflect the selected value.
- The annotation text must be linked to the button using `aria-describedby`.
- The chevron and decorative icons must be marked `aria-hidden`.

TODO: Confirm keyboard navigation and focus behavior for web implementations.

---

## Do / Don't

**Do:**
- Use a concise label (2–4 words) that clearly names the field
- Show meaningful placeholder text that hints at the expected value
- Use annotation text to provide constraints, examples, or context

**Don't:**
- Use Dropdown Input for free-form text — use a text input instead
- Mix icon presence inconsistently across fields in the same form without a clear reason
- Use the annotation slot for validation errors

---

## Content guidelines

- **Label text:** Short noun phrase, title case. Example: "Travel Dates", "Number of Travelers", "Vehicle Type"
- **Placeholder text:** Start with a verb or "Select". Example: "Select dates…", "Select vehicle type", "Enter text here…"
- **Annotation text:** One sentence. Factual, not promotional. Example: "We'll use this to match you with available routes."

---

## Notes

- The component is identified as `dropdown_input` in Figma (kebab variant: `dropdown-input`).
- Sub-components: `select_button` (node `5131:1331`) and `anotation` (node `5144:2119`).
- Used in both light and dark surface contexts. Token values differ by theme — see `dropdown-input.tokens.json`.
- The icon used inside the select button varies by context (alert-war-triangle icon observed in app usage) — the specific icon is not part of the component definition and is passed by the consumer.
