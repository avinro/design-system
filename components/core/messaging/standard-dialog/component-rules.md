# Standard Dialog — Component Rules

This file defines the writing and usage rules for the Standard Dialog component.
It is used as a source of truth when generating or updating `index.mdx`.

Source of truth: Figma component metadata (node 7314:623), confirmed cross-component usage rules from Alert Dialog.

---

## Overview

Standard Dialog is a modal overlay for forms, multi-input tasks, and content that requires dedicated space. It renders a panel with a header, scrollable content area, and a footer with up to two actions. It is the appropriate choice when the task is reversible and more complex than a single-question confirmation.

---

## Variants

Confirmed from Figma component set (node 7314:623):

- **Compact** — partial-screen panel. Use for short forms, single-field inputs, or tasks that fit in limited vertical space.
- **Full page** — full or near-full-screen panel. Use for longer forms, multi-step flows, or tasks where the user needs more space.

---

## Sizes

- TODO: Confirm whether fixed width or height values are defined per type, or whether dimensions are content-driven.

---

## States

- **Open** — dialog panel and overlay are mounted and visible.
- **Closed** — dialog panel and overlay are unmounted or hidden.
- Button states follow the Button component specification.
- TODO: Confirm whether a loading or transitioning state exists on the dialog itself.

---

## Anatomy

Confirmed from Figma metadata (node 7314:623):

| Part | Required | Description |
|---|---|---|
| Overlay | Yes | Semi-transparent full-screen backdrop. Blocks interaction behind. |
| Dialog panel | Yes | Rounded container. Holds all content. |
| Header | Yes | Title of the task. Optional close icon. |
| Content area | Yes | Scrollable area for forms, fields, or structured content. |
| Footer / Actions | Yes | 1–2 action buttons. |

---

## Usage guidelines

### Use Standard Dialog for:
1. Forms with multiple inputs that belong in a focused, dedicated task.
2. Reversible tasks that need more space than can fit inline or in a sheet.
3. Lightweight confirmations that require a text input before proceeding.
4. Any task where the user must complete something before continuing, but the action is not destructive.

### Do NOT use Standard Dialog for:
1. High-risk or irreversible actions → use Alert Dialog.
2. Routine confirmations or success states ("Saved!") → use Toast.
3. Lightweight recoverable issues with quick actions (Undo/Retry) → use Snackbar.
4. Simple acknowledge-only interruptions → use Alert Dialog (Info type).

### Compact vs Full page:
- Use `Compact` when the task fits in a short form.
- Use `Full page` when the task genuinely requires more vertical space.
- Do not default to `Full page` — use `Compact` unless the extra space is needed.

---

## Actions rules

- **1 action** — rare. Use only when no meaningful cancel path exists.
- **2 actions max** — standard pattern: primary action + cancel/dismiss.
- Primary action = the action that completes the task (e.g. "Save", "Apply", "Confirm").
- Secondary action = dismiss/cancel (e.g. "Cancel", "Go back").
- Never add a third button.
- Use explicit, task-specific labels. Avoid "OK", "Yes", "Submit".

---

## Dismiss behavior

- Always provide a way to dismiss: close icon, cancel button, or both.
- Standard Dialog tasks are always reversible — never block dismissal.
- Overlay tap-to-dismiss is optional. Apply consistently if used.
- TODO: Confirm the product's dismiss interaction pattern (overlay tap, Escape key, close icon, or combination).

---

## Accessibility

- `role="dialog"` on the panel.
- `aria-labelledby` → title element.
- `aria-describedby` → introductory body text if present.
- Focus moves to first interactive element on open.
- Focus is trapped inside the dialog while open.
- Overlay is not focusable or interactable.
- `Escape` key should dismiss when a safe dismiss path exists.
- TODO: Confirm `aria-modal="true"` usage.
- TODO: Confirm focus trap implementation and Escape key handling.

---

## Content guidelines

- **Title:** short task label. Describe the task, not the component. Example: "Edit pickup address", "Add stop", "Set schedule".
- **Body / form area:** only the fields and information needed to complete the task. No unrelated content.
- **Button labels:** explicit and action-oriented. "Save changes", "Apply", "Add stop". Not "OK", "Submit", "Proceed".

---

## Do / Don't

**Do:**
- Use for forms, multi-input tasks, and reversible flows.
- Provide a dismiss path — close icon, cancel button, or both.
- Write the title as a short task label.
- Limit footer to two actions.

**Don't:**
- Don't use for irreversible actions — use Alert Dialog.
- Don't use for non-blocking success messages — use Toast.
- Don't use for quick recoverable issues — use Snackbar.
- Don't overload the content area with unrelated content.
- Don't use generic button labels ("OK", "Submit", "Yes/No").
- Don't remove the dismiss path.

---

## Notes

- The two Figma variants are named `Type=Compact` (node 7314:624) and `Type=Full page` (node 7314:634).
- Standard Dialog is referenced in Alert Dialog's "when not to use" table as the correct alternative for forms and multi-control tasks.
- TODO: Confirm whether the Compact type has a fixed height or is fully content-driven.
- TODO: Confirm whether the panel includes a scroll indicator when content overflows.
- TODO: Confirm base component usage — whether the dialog uses Button, or its own local button instances.
