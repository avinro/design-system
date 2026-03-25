# Badge Partner — Component Rules

This file defines the writing and usage rules for the Badge Partner component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Badge Partner is a small pill-shaped label with the Dojo logo icon used exclusively on Venue cards. Its presence indicates that the venue is a Dojo partner and the user can make a booking or send a request. Its absence means the venue is not a partner and booking is not available.

It is a single, fixed badge — there are no variants. It is display-only with no interactive states.

---

## Semantics

| Badge state | Meaning |
|---|---|
| Present | Venue is a Dojo partner → user can book or request |
| Absent | Venue is NOT a Dojo partner → no booking available |

This is a binary signal. Do not show the badge on non-partner venues.

---

## Label

Fixed label: **"Dojo Partner"**

> **Note:** The Figma layer currently shows "Dojo Parnet" — this is a typo. The correct label is "Dojo Partner". Confirm with the Figma file owner before shipping.

Rules:
- Do not modify the label.
- Do not abbreviate or substitute custom text.
- Capitalize as shown: "Dojo Partner" (title case).

---

## Icon

Icon: `Customer-Icon/dojo-logo`, 16px, decorative (`aria-hidden="true"`).

Rules:
- The Dojo logo icon is fixed. Do not replace it with another icon.
- The icon is decorative — the label carries the full meaning.
- Icon color matches label color (shared token: `--chart-pair/cyan-primary`).

---

## Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | Pill-shaped (9999px border-radius). Height 24px. Cyan background. |
| Icon | Yes | Dojo logo, 16px, decorative — must be `aria-hidden`. |
| Label | Yes | "Dojo Partner". Manrope SemiBold, 12px, `whitespace-nowrap`. |

Rules:
- Icon always precedes label — do not reverse.
- Do not render Badge Partner without both icon and label.
- No trailing elements or additional icons.

---

## Size

Single size — height 24px. No size variants.

| Property | Token | Value |
|---|---|---|
| Height | — | 24px |
| Padding horizontal | `--spacing-8` | 8px |
| Padding vertical | `--spacing-4` | 4px |
| Border radius | — | 9999px |
| Icon size | — | 16px |
| Gap (icon → label) | `--spacing-4` | 4px |

---

## States

No interactive states. Display-only.

---

## Usage guidelines

- Show Badge Partner **only on confirmed Dojo partner venues**.
- Display **one badge per card** — never repeat it.
- Do not use Badge Partner for non-venue contexts or general status labels.
- Absence of the badge communicates non-partner status implicitly — no additional UI is needed.

---

## Accessibility

- Icon: set `aria-hidden="true"`.
- Label "Dojo Partner" must always be visible — it is the full accessible name.
- Do not rely on color or icon alone.
- TODO: Confirm WCAG contrast ratios for cyan on card background.

---

## Notes

- Component updated in Customer DS: file `iYqpx8x8Kxdixf8YSRkiCz`, node `132:1167`.
- Previously two variants (bookable / request only) — consolidated into one badge.
- Semantics changed: badge now means "Dojo partner" not "booking type".
- Icon changed from check/chat-message to Dojo logo.
- Pink tokens removed — cyan tokens only.
- Figma layer has a typo: "Dojo Parnet" — correct label is "Dojo Partner".
