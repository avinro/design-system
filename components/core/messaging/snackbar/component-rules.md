# Snackbar — Component Rules

This file defines the writing and usage rules for the Snackbar component.
It is used as a source of truth when generating or updating `index.mdx`.

Source of truth: Figma get_design_context extraction on all 5 types (nodes 7326:5716, 7326:5689, 7326:5698, 7326:5707, 7326:5680) and Longer action configuration (node 7328:6293).

---

## Overview

Snackbar is a lightweight, transient notification that pairs a brief message with a single quick action. It is non-blocking and does not interrupt the user's flow. It is not for decisions, blocking errors, or passive confirmations with no action needed.

---

## Variants

### Types

Confirmed from Figma component set (node 7326:5679). Five types:

| Type | Icon | Icon container color | Token |
|---|---|---|---|
| `info` | `Customer-Icon/info` | `rgba(29,29,35,0.05)` | `--button/secondary/bg-default` |
| `error` | `Customer-Icon/alert-warn-circle` | `#fcdcdc` | `--notification/error-bg` |
| `warning` | `Customer-Icon/alert-war-triangle` | `#f6e3a4` | `--notification/warning--bg` |
| `success` | `Customer-Icon/check` | `#d5f4d6` | `--notification/success-bg` |
| `neutral - no icon` | None | None | — |

All types share the same card background (`--surface/neutral/sunken`, white), typography, and action button styles.

The `neutral - no icon` type uses `padding-left: --spacing-16 (16px)` instead of `--spacing-12 (12px)` because there is no icon container.

### Configurations

Two layout configurations confirmed from Figma:

| Configuration | Layout | Height | When to use |
|---|---|---|---|
| `Short action` | Single row — content + action button inline | 58px | Action label is 1–2 words |
| `Longer action` | Two rows — content on top, action right-aligned below | 98px | Action label is 3+ words |

Both configurations use the same tokens. The difference is layout direction only (row vs column).

---

## Sizes

- Fixed width: 374px
- Height: 58px (Short action), 98px (Longer action)

---

## States

- **Visible** — mounted and displayed.
- **Dismissed** — unmounted or hidden. Triggered by auto-dismiss, action press, or close button.
- Button states follow the Button component spec.
- TODO: Confirm auto-dismiss duration.

---

## Anatomy

Confirmed from Figma get_design_context:

| Part | Required | Description |
|---|---|---|
| Container | Yes | Rounded card (16px radius), drop shadow, 374px wide. |
| Context icon | No | 16×16px icon (in 24×24px wrapper) inside 32×32px pill container. Absent on `neutral - no icon`. |
| Description | Yes | 14px Manrope Medium (`--text/placeholder`, `#636377`). Up to 2 lines. |
| Action button | Yes | Ghost pill button, 32px height. Single quick action. |
| Close button | No | 32×32px icon button. Optional. |

---

## Usage guidelines

### Use Snackbar for:
1. Recoverable actions — Undo, Retry, View.
2. Lightweight error feedback with a single corrective action.
3. Low-urgency status updates where a follow-up action is available.

### Do NOT use Snackbar for:
1. Passive success or informational messages with no action → use Toast.
2. Decisions or high-risk situations → use Alert Dialog.
3. Blocking errors requiring correction before continuing → use Alert Dialog.
4. Multi-input tasks or forms → use Standard Dialog.

---

## Action button rules

- Exactly one action. Never two.
- Label: concise verb — "Undo", "Retry", "View", "Dismiss".
- The action must be quick and low-effort.
- Not for destructive operations or flows requiring navigation.
- Use `Short action` configuration when label is 1–2 words. Use `Longer action` when 3+ words.

---

## Dismiss behavior

- May auto-dismiss. Provide manual dismiss (close button) when important.
- Do not stack more than one Snackbar at a time.
- TODO: Confirm auto-dismiss duration from product implementation.

---

## Accessibility

- `role="status"` + `aria-live="polite"` for `info`, `success`, `neutral`.
- `role="alert"` + `aria-live="assertive"` for `error`, `warning`.
- Must not trap or shift focus.
- Close button: `aria-label="Dismiss"`.
- Action button label must be self-descriptive.
- TODO: Confirm keyboard interaction for action and close buttons.
- TODO: Confirm auto-dismiss accessibility extension.

---

## Content guidelines

- **Description:** one clear statement. What happened or what went wrong. Max 2 lines.
- **Action label:** verb-only or short verb phrase. "Undo", "Retry", "View all", "Go back".
- No inline links, no multi-sentence copy, no instructions.

---

## Do / Don't

**Do:**
- Use for recoverable actions (Undo, Retry, View).
- Keep description short — one statement.
- Use Short action for 1–2 word labels; Longer action for 3+ word labels.
- Use semantic types consistently.

**Don't:**
- Don't replace Toast when no action is needed.
- Don't use for irreversible actions or decisions.
- Don't add more than one action button.
- Don't write multi-sentence descriptions.
- Don't stack multiple Snackbars.

---

## Notes

- Token name `--notification/warning--bg` has a double dash — this is the exact token name as confirmed in Figma (consistent with Alert Dialog).
- The `neutral - no icon` type omits the icon container entirely and increases padding-left from `--spacing-12` to `--spacing-16`.
- The `Longer action` configuration switches the container from a row to a column layout. The close button moves from the Actions row to the Content row (alongside description).
- All icon container colors match the corresponding Alert Dialog icon background tokens: error, warning share the same tokens.
- TODO: Confirm whether the close button is optional on all types or required on specific ones.
- TODO: Confirm auto-dismiss duration.
