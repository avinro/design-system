# Car Image — Component Rules

This file defines the writing and usage rules for the Car Image component.
It is used as a source of truth when generating or updating `index.mdx`.

Source of truth: Figma get_design_context on all 4 variants (nodes 5106:635, 7449:5038, 5106:638, 7449:5040). Real-world usage confirmed in Customer App (node 3073:7464).

---

## Overview

Car Image is a pure asset container that renders a vehicle illustration. It carries no tokens, no interactive states, and no sub-components. Its sole purpose is to visually identify a vehicle category in ride selection lists (UI context) and on live maps (Map context).

---

## Variants

Two independent variant dimensions. All four combinations are confirmed in Figma.

### Type

| Type | Vehicle | Figma node (UI) | Figma node (Map) |
|---|---|---|---|
| `default` | Standard car (sedan/taxi) | `5106:635` | `7449:5038` |
| `van` | Van | `5106:638` | `7449:5040` |

### Context

| Context | Perspective | Dimensions | Use |
|---|---|---|---|
| `UI` | Diagonal / three-quarter | 51.65 × 33px | In-app list rows, selection cards |
| `Map` | Top-down / bird's-eye | 40 × 41px | Live map vehicle markers |

---

## Sizes

All dimensions confirmed from Figma get_design_context:

| Variant | Width | Height | Image asset name |
|---|---|---|---|
| default / UI | 51.65px | 33px | `taxi-v_diagonal 1` |
| default / Map | 40px | 41px | `taxi-v_top 1` |
| van / UI | 51.65px | 33px | `black_van-v_diagonal 1` |
| van / Map | 40px | 41px | `black_van-v_top 1` |

---

## States

No interactive states. Static rendering only.

---

## Anatomy

Single-part component:
1. **Container** — fixed-size wrapper, no background/border/shadow.
2. **Vehicle illustration** — image asset, `object-cover`, positioned precisely within the container.

---

## Usage guidelines

### Use Car Image for:
1. Ride selection list rows — visual identifier for the vehicle category the user is choosing.
2. Live map markers — top-down vehicle representation on a map overlay.

### Do NOT use Car Image for:
1. Using `Context=UI` as a map marker.
2. Using `Context=Map` inside list rows or cards.
3. Decorative or generic vehicle illustrations in non-ride contexts.

### Pairing rules (UI context):
- Always place `Context=UI` as the leading element of a ride option row.
- The row must also show the vehicle type name, capacity/ETA details, and price.
- Always match `type` to the vehicle category displayed in the row.

---

## Accessibility

- Decorative in most contexts. Set `alt=""` when a visible vehicle label is present.
- Set a descriptive `alt` (e.g. "Standard car", "Van") when used without a visible label.
- TODO: Confirm the product's standard for alt text on vehicle images.

---

## Do / Don't

**Do:**
- Use `Context=UI` in lists and cards.
- Use `Context=Map` on live map overlays.
- Match `type` to the actual vehicle category.
- Pair with a visible vehicle type label in selection contexts.

**Don't:**
- Don't use UI images on the map or Map images in lists.
- Don't resize outside defined dimensions.
- Don't add background fill, border, or shadow.
- Don't use in contexts unrelated to vehicle selection or tracking.

---

## Notes

- The component has no design tokens — it is a pure image container.
- Confirmed real-world usage: `Type=default, Context=UI` appears in ride option rows on the Customer App home screen (node `3073:7464`). Each option row shows two car images (one per option) side by side with vehicle name and price.
- The Customer App also has a local version of the component (`3094:10467`, `Type=default`) which shows a colourful/orange-tinted car image — this appears to be a product-specific override of the DS Core asset.
- TODO: Confirm whether additional vehicle types beyond `default` and `van` are planned.
- TODO: Confirm whether the image assets are SVGs, PNGs, or another format in the production implementation.
- TODO: Confirm the alt text convention for map context usage (decorative vs descriptive).
