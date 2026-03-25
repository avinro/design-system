# Venue card — Component Rules

This file defines the writing and usage rules for the Venue card component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Venue card is the main card component used in the customer app to display partner venues. It shows a venue photo, name, category, and rating. When `Partner=True`, a Badge Partner badge is overlaid on the image to communicate booking capability.

It is a display-only component. Tap/press behavior is handled at the container level, not within the card itself.

---

## Variants

One prop: `Partner` (VARIANT). Two values: `True` (default), `False`.

### `Partner=True`

Shows a Badge Partner badge overlaid on the venue image (top-left area). Use for partner venues with a defined booking capability.

### `Partner=False`

No badge. Use for non-partner venues or when booking capability data is unavailable.

Rules:
- The `Partner` prop only controls badge visibility — all other parts are identical.
- Do not show `Partner=True` for venues without confirmed partner status.

---

## Anatomy

| Part | Required | Notes |
|---|---|---|
| Image | Yes | Full-width at top. Handles fallback if no image available (`ImageWithFallback` layer). |
| Badge Partner | Conditional | Overlay on image. Only when `Partner=True`. Controlled by Badge Partner component. |
| Venue name | Yes | Bold. Primary text identifier. Must not be empty. |
| Category | Yes | Subtitle. Describes venue type. Must not be empty. |
| Rating row | Yes | Star icon + numeric rating + review count. |

Rules:
- All required parts must always be visible.
- Do not reorder parts — image always at top, info always below.
- Badge Partner position (overlaid on image) is fixed — do not move it.

---

## Sizes

Single size only. No size variants. Approximate dimensions: `200 × 248px`.

---

## States

No interactive states defined at the component level. Tap/press state is applied by the parent container.

---

## Content guidelines

- **Venue name:** Use the official venue name. Do not truncate.
- **Category:** Use the venue's business category (e.g. "Beach Club & Restaurant"). Do not use generic labels.
- **Rating:** Display the numeric rating and review count as provided by the data layer.
- **Badge Partner labels:** Fixed — "Bookable" and "Request only". Do not modify.

---

## Usage guidelines

- Use Venue card in customer app lists, grids, or carousels showing partner venues.
- Set `Partner=True` only for verified partner venues with booking capability data.
- Set `Partner=False` for non-partner venues.
- Always provide a venue image — the component handles fallback display.
- Do not use Venue card for non-venue content (events, products, etc.).

---

## Accessibility

- Venue image: provide descriptive `alt` text including venue name.
- Badge Partner icon: decorative, must have `aria-hidden="true"`.
- Rating row: use `aria-label` to describe the full rating context (e.g. "4.8 stars, 342 reviews").
- Do not rely on badge color alone to convey booking type — label text is always required.

---

## Do / Don't

**Do:**
- Show `Partner=True` only for venues with confirmed partner status.
- Always display all required parts (name, category, rating).
- Use Badge Partner badge to communicate booking capability clearly.

**Don't:**
- Don't use Venue card for non-partner or non-venue content.
- Don't modify the Badge Partner badge labels.
- Don't truncate the rating row or remove the review count.

---

## Notes

- Component lives in Customer DS: file `iYqpx8x8Kxdixf8YSRkiCz`, node `102:36`.
- Page: `15:383` (↳ Venue cards). Page header updated to "Venue card" (previously "Product cards").
- Two confirmed variants: `Partner=True` (`102:35`) and `Partner=False` (`102:34`).
- Badge Partner badge (node `132:1166`) is used as an instance inside this component.
- Light mode token values are TODO — extracted values are dark mode only.
