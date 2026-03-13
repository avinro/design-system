# Tooltip — Component Rules

This file defines the writing and usage rules for the Tooltip component.
It is used as a source of truth when generating or updating `index.mdx`.

Source of truth: Figma get_design_context on nodes 5110:664 (right), 5276:109 (bottom), 5307:699 (no_arrow). Real-world usage confirmed in Customer App (node 763:5077).

---

## Overview

Tooltip is a small dark overlay that surfaces a brief contextual message near a UI element. Non-blocking. Passive. Does not require a user response. Not for decisions, errors, or confirmations.

---

## Variants

Single dimension: `arrow_position`. Five values confirmed from Figma (node 5276:108):

| Value | Arrow | Layout | Total width | Total height |
|---|---|---|---|---|
| `right` | Points right | Row: container + arrow | 316px | 56px |
| `left` | Points left | Row: arrow + container | 316px | 56px |
| `bottom` | Points down | Column: container + arrow | 305px | 68px |
| `top` | Points up | Column: arrow + container | 305px | 68px |
| `no_arrow` | None | Column: title + body only | 304px | 69px |

**Structural difference between arrow variants and `no_arrow`:**

Arrow variants:
- Single `message` text (Manrope Medium 500, line-height 1.4)
- Close icon (`Customer-Icon/x-close-delete`, 24×24px)
- Directional arrow (24×12px polygon, rotated per direction)

`no_arrow`:
- Bold `title` text (Manrope Bold 700, line-height 1.2)
- Regular `body` text (Manrope Regular 400, line-height 1.2)
- Gap between title and body: `--spacing-2` (2px)
- No close icon. No arrow.

---

## Sizes

No size scale. Fixed dimensions per variant — see table above.

---

## States

- `Visible` — mounted and shown.
- `Dismissed` — unmounted/hidden. Triggered by close icon (arrow variants) or programmatic control (`no_arrow`).
- No hover/pressed/focus states on the container. Close icon follows Button/only icon spec.

---

## Anatomy

### Arrow variants

1. **Container** — dark rounded background with padding and gap.
2. **Message text** — single string, Medium weight, max-width 240px.
3. **Close icon** — 24×24px dismissal control.
4. **Arrow** — 24×12px polygon, rotated per direction.

### `no_arrow`

1. **Container** — dark rounded background with padding.
2. **Title** — 14px Bold.
3. **Body text** — 14px Regular.
(No close icon, no arrow.)

---

## Usage guidelines

### Use Tooltip for:
1. Brief contextual explanation of a specific UI element.
2. Passive background state notification near a relevant control.
3. Non-blocking in-context guidance (1–2 lines max).

### Do NOT use Tooltip for:
1. Decisions or user choices → use Alert Dialog.
2. Confirmations ("Saved!") → use Toast.
3. Recoverable errors with quick actions → use Snackbar.
4. Long explanations or instructions → use Standard Dialog or inline text.

### Arrow position rules:
- Arrow must always point toward the element being described.
- `right` → tooltip is to the left of the target, arrow points right toward it.
- `left` → tooltip is to the right of the target, arrow points left toward it.
- `bottom` → tooltip is above the target, arrow points down toward it.
- `top` → tooltip is below the target, arrow points up toward it.
- `no_arrow` → tooltip is not anchored to a specific point; use when positional context is clear from layout alone.

### Dismiss:
- Arrow variants: close icon required. User can always dismiss.
- `no_arrow`: no close icon. Dismiss is programmatic (timeout or deactivation).
- TODO: Confirm auto-dismiss timeout in the product.

---

## Accessibility

- `role="tooltip"` on the container.
- Triggering element: `aria-describedby` → tooltip `id`.
- Close icon: `aria-label="Dismiss"`.
- Must not be the sole source of critical information.
- Must be dismissible without a pointer.
- TODO: Confirm keyboard trigger/dismiss behavior (Escape key, focus-triggered).
- TODO: Confirm trigger mechanism in mobile (tap vs hover vs programmatic).

---

## Content guidelines

- **Arrow variants:** one message string. 1–2 lines. No title. No headings. No inline links.
- **`no_arrow`:** short bold title + concise body. Both required. No close icon.
- Messages must be factual and specific. No vague copy.

---

## Do / Don't

**Do:**
- Use for brief contextual explanation near a specific element.
- Point the arrow at the element being described.
- Keep to 1–2 lines.
- Provide a dismiss path (close icon) in arrow variants.

**Don't:**
- Use for decisions, errors, or confirmations.
- Write long or multi-paragraph copy.
- Cover the element being described.
- Include inline links or actions inside the text.
- Show multiple tooltips at once.

---

## Notes

- Confirmed real-world usage: `arrow_position=right` — "Sharing live location with your driver to help them find you" — appears on the Customer App home screen during an active ride, anchored to map action controls on the right side. Node `763:5077`.
- The Customer App instance uses token `--surface/neutral/bg-invert` (#1d1d23) while the DS Core component uses `--surface/neutral/invert` (#1d1d23). Same value, different token name — flag for alignment.
- The arrow is a polygon asset (not a CSS triangle). Rotation per direction: right=90°, bottom=180°, left=270°, top=0°.
- TODO: Confirm whether `left` and `top` variants were extracted (only right, bottom, and no_arrow were directly sampled).
- TODO: Confirm auto-dismiss timeout.
- TODO: Confirm keyboard and touch trigger behavior.
