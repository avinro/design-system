# Toast — Component Rules

This file defines the writing and usage rules for the Toast component.
It is used as a source of truth when generating or updating `index.mdx`.

Source of truth: Figma component description (node 5247:192), Figma `get_design_context` extraction, confirmed real-world usage in the Driver App (node 2581:7098).

---

## Overview

Toast is a non-blocking, transient notification. It confirms that something happened or delivers a brief informational update. It auto-dismisses and does not interrupt the user's flow or trap focus. It is not for decisions, corrections, or guidance.

---

## Variants

Confirmed from Figma component set (node 5247:192). Five semantic types:

- **info** (`5247:369`) — neutral informational update. Icon: info circle.
- **error** (`5247:380`) — lightweight recoverable error. Not for blocking errors.
- **warning** (`5247:391`) — non-blocking awareness message.
- **success** (`5247:402`) — completion confirmation.
- **trip** (`5247:358`) — product-specific type for background trip-related events (Driver App context).

All types share the same card layout, dimensions (374×80px), and anatomy. Only the context icon differs per type.

TODO: Confirm icon and icon container color values per type from Figma.

---

## Sizes

Single size: 374×80px (fixed).

---

## States

- **Visible** — mounted and displayed. Auto-dismiss timer running (Counter).
- **Dismissed** — unmounted or hidden. Triggered by timer or manual close.

No interactive states on the Toast shell itself. Close button states follow Button component spec.

---

## Anatomy

Confirmed from Figma `get_design_context` (node 5247:369):

| Part | Required | Description |
|---|---|---|
| Container | Yes | Rounded card (16px radius), drop shadow, 374×80px. |
| Context icon | Yes | 24×24px icon inside a 40×40px pill container. Semantic color per type. |
| Content | Yes | Vertical stack of title + optional description. |
| Title | Yes | 18px Manrope SemiBold, single line, truncates. |
| Description | No | 14px Manrope Medium, up to 2 lines. |
| Close button | No | 32×32px icon button. Recommended when toasts stack or message is important. |
| Counter | Yes | Thin progress bar at bottom edge. Reflects auto-dismiss timer. |

---

## Usage guidelines

### Use Toast for:
1. Success confirmations — "Saved", "Added to plan", "Payment method updated", "Passkey name changed".
2. Neutral informational updates — no action required.
3. Background events — "New trip available".

### Do NOT use Toast for:
1. Errors requiring immediate correction → use Alert Dialog or inline validation.
2. Anything requiring a decision → use Alert Dialog.
3. Lightweight recoverable issues with quick actions (Undo/Retry) → use Snackbar.
4. Multi-step guidance or explanations → use Standard Dialog.
5. Form validation replacement.

---

## Behavior rules

- Auto-dismisses. Do not require the user to dismiss.
- Must not steal or shift focus when appearing.
- Include close button when: message could distract, toasts may stack, or message is important enough to re-read.
- Stack with controlled spacing. Maximum 2–3 simultaneous toasts. No flooding.
- TODO: Confirm auto-dismiss duration from the product implementation.

---

## Placement rules

- Top of screen preferred (confirmed from Driver App usage: positioned at `top: 61px`).
- Must not cover primary actions or navigation controls when possible.

---

## Accessibility

- `role="status"` + `aria-live="polite"` for `info`, `success`, `trip`.
- `role="alert"` + `aria-live="assertive"` for `error`, `warning`.
- Must not trap focus.
- Close button must have `aria-label="Dismiss notification"` (or equivalent).
- Auto-dismiss must respect reduced-motion and accessibility settings.
- TODO: Confirm auto-dismiss duration extension for accessibility settings.

---

## Content guidelines

- **Title:** short and factual. One line. What happened. Examples: "Passkey name changed", "Saved", "New trip available".
- **Description:** optional. Max 2 lines. One specific statement. No paragraphs, no inline links.
- Do not use multi-link content or instructions in a Toast.
- Use semantic type color accents consistently — do not repurpose type colors.

---

## Do / Don't

**Do:**
- Use for success and neutral informational messages.
- Keep the title short and factual.
- Include close button when toasts may stack.
- Position at top of screen, clear of primary actions.
- Use semantic types consistently.

**Don't:**
- Use for errors requiring correction or decisions.
- Write long descriptions or multi-link content.
- Show more than 2–3 toasts simultaneously.
- Steal or shift focus.
- Use as a form validation replacement.

---

## Notes

- Confirmed real-world usage in the Driver App: `type=info` Toast — "Passkey name changed / Your Passkey name has been updated successfully!" — displayed at top of the Account > Personal Information screen after saving a passkey rename. Node: `2581:7098`.
- The Counter sub-component is always present (node `5247:508` / `I5247:508;5247:414`). It renders as a thin progress indicator at the bottom edge of the card.
- The `trip` type is product-specific to the Dojo Driver product context. It is not a generic semantic type.
- TODO: Confirm icon and icon container color tokens per type (success, warning, error, trip).
- TODO: Confirm auto-dismiss duration.
- TODO: Confirm whether the Counter is always visible or only when auto-dismiss is active.
