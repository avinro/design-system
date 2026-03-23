# Badge Partner — Component Rules

This file defines the writing and usage rules for the Badge Partner component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Badge Partner is a small pill-shaped label with a leading icon used exclusively on Venue partner cards. It communicates whether a venue is fully bookable or accepts requests only. It is a display-only component with no interactive states.

It is structurally distinct from the main Badge component: it adds a leading icon slot and uses domain-specific color types not shared with the main Badge palette.

---

## Types

Two types are defined in Figma via the `type` prop.

### `bookable`

Cyan/mint. Communicates that the venue accepts direct bookings.

- Background: `--chart-pair/cyan-secondary` (`#d9f4ff`)
- Text: `--chart-pair/cyan-primary` (`#38a9d5`)
- Icon: `Customer-Icon/check`, 16px, decorative (`aria-hidden`), color `--chart-pair/cyan-primary`
- Label: **"Bookable"** (fixed — do not change)
- Padding: left `--spacing-8` (8px), right `--spacing-12` (12px), top/bottom `--spacing-4` (4px)

Use for: venues where users can complete a booking immediately without waiting for confirmation.

### `request only`

Pink. Communicates that the venue requires a booking request.

- Background: `--chart-pair/pink-secondary` (`#ffdbe8`)
- Text: `--chart-pair/pink-primary` (`#ff498b`)
- Icon: `Customer-Icon/chat-message`, 16px, decorative (`aria-hidden`), color `--chart-pair/pink-primary`
- Label: **"Request only"** (fixed — do not change)
- Padding: horizontal `--spacing-8` (8px), vertical `--spacing-4` (4px)

Use for: venues where users submit a request and the venue must confirm availability before a booking is complete.

Rules:
- The type must match the **actual venue capability** — do not swap types for visual reasons.
- The labels "Bookable" and "Request only" are fixed. Do not substitute custom text.
- Do not add a third type without a confirmed Figma design.

---

## Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | Pill-shaped (9999px border-radius). Padding: 8px horizontal, 4px vertical. Height: 24px. |
| Icon | Yes | Leading, 16px, decorative — must be `aria-hidden`. |
| Label | Yes | Fixed text. Manrope SemiBold, 12px, `whitespace-nowrap`. |

Rules:
- The icon always precedes the label — do not reverse the order.
- The label must not wrap — keep it short. The two defined labels are short by design.
- No additional icon or trailing element is defined.
- Do not render Badge Partner without both icon and label.

---

## Sizes

Single size only — height 24px. No size variants.

| Property | Value |
|---|---|
| Height | 24px |
| Padding (horizontal) | `--spacing-8` (8px) |
| Padding (vertical) | `--spacing-4` (4px) |
| Border radius | Pill (`9999px`) |
| Icon size | 16px |
| Gap (icon → label) | `--spacing-4` (4px) |

---

## States

No interactive states. Display-only component.

---

## Typography

Both types share the same text style as the main Badge.

| Property | Token | Value |
|---|---|---|
| Text style | `Body xs/SemiBold` | — |
| Font family | `--font-family/body` | Manrope |
| Font weight | `--weight/semibold` | 600 |
| Font size | `--size/xs` | 12px |
| Line height | — | 1.2 |
| Letter spacing | `--letter-spacing/normal` | 0px |
| White space | — | `nowrap` |

---

## Content guidelines

- Labels are fixed: **"Bookable"** and **"Request only"**.
- Use title case as shown: capitalize "Bookable", use "Request only" with only the first word capitalized.
- Do not abbreviate or shorten the labels.
- Do not add extra words or descriptors.

---

## Usage guidelines

- Use Badge Partner **only on Venue partner cards** — it is not a general-purpose status label.
- Display **one badge per venue card** — do not show both types on the same card.
- Use the type that matches the venue's actual booking model.
- For general status or category labels, use the main Badge component.

---

## Accessibility

- The leading icon is decorative. Set `aria-hidden="true"` on it.
- The label text must carry the full meaning (screen readers will read it as part of the card context).
- Do not rely on icon or color alone to convey the booking type — the label is always required.
- TODO: Confirm WCAG contrast ratios for both types.

---

## Do / Don't

**Do:**
- Use on Venue partner cards only.
- Match the type to the venue's actual booking capability.
- Keep labels fixed as designed.

**Don't:**
- Don't reuse Badge Partner outside of the Venue card context.
- Don't display both types simultaneously on the same card.
- Don't modify labels or introduce custom text.
- Don't add icons to the main Badge or modify Badge Partner icons without a confirmed Figma update.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, frame "Badge/Partner", node `7477:1865`.
- Two confirmed types: `bookable` (7477:1866) and `request only` (7477:1878).
- Both types: height 24px, pill shape, Manrope SemiBold 12px label.
- All color tokens confirmed from Figma MCP (get_variable_defs + get_design_context). See `badge-partner.tokens.json`.
- Both types use `chart-pair` tokens — distinct from the `notification` and `badge` tokens used by the main Badge.
- Badge Partner is distinct from the main Badge (6 types, configurable icon) — see `components/core/indicators-and-states/badge/`.
