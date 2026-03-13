# Alert Dialog — Component Rules

This file defines the writing and usage rules for the Alert Dialog component.
It is used as a source of truth when generating or updating `index.mdx`.

Source of truth: Figma component description (node 7303:104), confirmed app usage.

---

## Overview

Alert Dialog is a modal interruption used to stop the user and capture an explicit response. It is intentionally constrained: short copy, a single icon, and a maximum of two actions. Reserved for risk, irreversible consequences, blocking errors, and critical mismatches where proceeding without a decision could cause harm or confusion.

---

## Variants

Four intent types, each with a different icon, icon background, and second-button style:

- **Warning** — triangle icon, `--notification/warning--bg` background. Use to prevent mistakes. Second button: neutral secondary.
- **Error** — circle exclamation icon, `--notification/error-bg` background. Use for blocking failures. Second button: neutral secondary.
- **Destructive** — trash/delete icon, `--notification/error-bg` background. Use for irreversible actions. Second button: destructive red (`--button/destructive/bg-default`).
- **Info** — info circle icon, `--notification/info-bg` background. Use for acknowledge-only interruptions. Second button: neutral secondary (or omitted).

---

## Sizes

- Single size. Card fills available width minus `16px` horizontal padding each side.
- Card height is driven by content.

---

## States

- Open / closed (mount/unmount).
- No variant-level interactive states beyond the button states (see Button component).
- `primaryAction` prop: `true` = two buttons, `false` = one button (acknowledge only).

---

## Anatomy

1. **Overlay** — full-screen semi-transparent backdrop. Blocks interaction with content behind.
2. **Dialog card** — rounded sheet anchored to bottom. Contains all content. Scrollable if content overflows.
3. **Icon container** — 80×80px circle, type-specific background, holds the 40×40px icon.
4. **Title** — short, explicit heading. Prefer question format for decisions.
5. **Body** — 1–3 line description. No paragraphs.
6. **Actions** — vertical stack of 1–2 full-width pill buttons.

---

## Usage guidelines

### Use Alert Dialog for:
1. Destructive confirmations — delete, cancel booking, remove payment method.
2. Critical mismatch checks — wrong pickup address, conflicting details.
3. Blocking errors requiring acknowledgement before proceeding.
4. High-risk warnings where the user must explicitly choose next steps.

### Do NOT use Alert Dialog for:
1. Forms or multi-control tasks → use Standard Dialog.
2. Routine confirmations ("Saved!") → use Toast.
3. Lightweight, recoverable issues with quick actions (Undo/Retry) → use Snackbar.
4. Non-urgent informational content → use Toast or inline message.

---

## Actions rules (critical)

- **1 action** for acknowledge-only dialogs (Info/Warning with no real choice).
- **2 actions max** for confirmation or safe-vs-risk choices. Never 3.
- Safe/recommended action = **primary button** (neutral dark).
- Risky/irreversible action = **second button** (destructive styling for Destructive type; neutral secondary for Error/Warning).
- Use destructive button styling **only** for the action that causes loss or irreversibility.
- Destructive CTAs must describe the consequence explicitly:
  - ✅ "Cancel booking", "Delete plan", "Remove card"
  - ❌ "Yes", "Confirm", "Proceed"

---

## Dismiss behavior

Two governance modes — choose one and apply consistently:
1. **Strict (recommended):** no close icon; user must choose an action.
2. **Permissive:** close icon/gesture allowed on Info/Warning only. Never allowed on Destructive or Error.

---

## Accessibility

- `role="alertdialog"` on the card.
- `aria-labelledby` → title element.
- `aria-describedby` → body text element.
- Focus moves to first action on open. Focus is trapped.
- Overlay is not focusable or interactable.
- `Escape` behavior follows the dismiss governance rule.

---

## Content guidelines

- **Title:** short and explicit. Use a question when the user must decide. Max one sentence.
- **Body:** 1–3 lines only. No paragraphs, no inline links. One clear statement of what will happen.
- **Button labels:** explicit and consequence-describing. No "OK", "Yes", "Confirm" when stakes are real.

---

## Do / Don't

**Do:**
- Use only for high-stakes interruptions.
- Title as a direct question when a decision is needed.
- Safe action as primary button, risky action as second.
- Max 2 actions.
- Explicit, consequence-describing CTA labels.

**Don't:**
- Use for informational messages with no required decision.
- Use generic button labels when consequences exist.
- Include form fields or multi-step content.
- Apply destructive button styling to the safe/cancel action.
- Show 3 or more actions.

---

## Notes

- The component is a standalone composite — it includes its own icon, overlay, card, and buttons. It uses no separately documented base sub-components.
- Confirmed real-world usage: Warning type for pickup address mismatch check in the Customer App. Title: "Pickup address correct?" with two actions: "Yes, continue" (primary) and "No, cancel" (secondary).
- The Dialog card uses `--notification/dialog-bg` which is `#f1f2f4` in light mode and `#1d1d23` in the dark-themed app.
- Token name: `--notification/warning--bg` has a double dash — this is the exact token name as confirmed in Figma.
