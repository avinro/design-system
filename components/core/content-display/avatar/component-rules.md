# Avatar — Component Rules

This file defines the writing and usage rules for the Avatar component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Avatar is a circular component that displays a user's profile photo. When no photo is available, it shows a placeholder silhouette. It is a display-only component used throughout the Dojo Apps to represent users and drivers in context — profile screens, trip summaries, ratings, and chat headers.

---

## Variants

No structural variants. The component renders either a **user photo** or a **placeholder silhouette** depending on whether a photo is provided.

The Figma component includes 5 sample avatars (`pic1`–`pic5`) for documentation preview purposes. These are not product variants — they are example images used to show the component across sizes. `pic1` is the placeholder/no-photo state.

In implementation, the component accepts a dynamic image source and falls back to the placeholder when no image is available.

---

## Sizes

7 sizes are confirmed from Figma. All sizes are square and fully circular.

| Size token | Dimensions |
|---|---|
| `XS` | 24×24px |
| `SM` | 32×32px |
| `MD` | 40×40px |
| `LG` | 48×48px |
| `XL` | 56×56px |
| `XXL` | 72×72px |
| `Largest` | 96×96px |

Rules:
- Choose the size based on the visual weight and importance of the avatar in context. Larger sizes for primary profile displays; smaller for secondary or list contexts.
- TODO: Confirm the recommended default size per use case (e.g., list item vs. profile header vs. trip card).
- TODO: Confirm whether a named alias (e.g., `profile`, `list-item`) exists for common size pairings.

---

## States

No interactive states are defined in Figma. Avatar is a display-only component.

Visual states are determined by content, not interaction:

| State | Description |
|---|---|
| With photo | User has a profile photo. Photo is clipped to a circle. |
| Placeholder | No photo available. Shows a silhouette icon on a neutral background. |

Rules:
- Always display the placeholder when no photo is provided. Do not display a broken image or empty circle.
- TODO: Confirm placeholder background color and silhouette icon token values.
- TODO: Confirm loading state behavior — whether a skeleton or blur-up animation is expected.

---

## Anatomy

Confirmed from Figma layer inspection.

| Part | Required | Description |
|---|---|---|
| Container | Yes | Fully circular frame sized to the chosen size token. Clips the photo or placeholder to a circle. |
| Photo | Conditional | User's profile photo, clipped to fill the circular container. Shown when a valid image source is available. |
| Placeholder | Conditional | Silhouette icon on a neutral background. Shown when no photo is available. |

Rules:
- The container is always fully circular (border-radius: 50%).
- Photo and placeholder are mutually exclusive. Exactly one must be shown at all times.
- The photo fills the container (`object-cover`) — do not letterbox or add padding.
- Do not add borders, outlines, or decorative rings unless explicitly specified for a context (e.g., online indicator). See TODOs.
- TODO: Confirm whether an online/offline indicator dot is part of this component or a separate overlay.
- TODO: Confirm placeholder background color token.

---

## Usage guidelines

- Use Avatar to represent a specific person: a user, a driver, or a customer.
- Choose the **size** based on the information hierarchy of the screen:
  - Use `Largest` (96px) or `XXL` (72px) for primary profile displays or large driver/user cards.
  - Use `XL` (56px) or `LG` (48px) for trip summaries, ratings, and secondary cards.
  - Use `MD` (40px) or `SM` (32px) for list rows, chat items, or compact contexts.
  - Use `XS` (24px) for inline or dense UI where only a small visual identifier is needed.
- Always provide the placeholder when a photo is not available. Never display an empty frame.
- Do not display text initials inside the avatar unless a separate initials variant is defined. Use the placeholder silhouette instead.
- Do not crop or reshape the avatar — it is always circular.
- TODO: Confirm whether an initials-based fallback variant is planned or in use in the apps.

---

## Accessibility

- Avatar is a display element. If it represents a named person in context, wrap it in an element with `aria-label` set to that person's name, or use an associated visible label nearby.
- The `<img>` element must include an `alt` attribute. For user photos, `alt` should be the person's name (e.g., `alt="Maria García"`). For placeholder avatars, `alt=""` (decorative) is acceptable when a visible label is present.
- Do not rely on the avatar alone to communicate identity — always pair it with a name label where possible.
- TODO: Confirm screen reader behavior in the context of trip cards, ratings, and profile headers.
- TODO: Confirm focus management — avatar is display-only and should not be focusable unless it is interactive (e.g., tapping opens a profile).

---

## Do / Don't

**Do:**
- Use to represent a specific person in context.
- Always show the placeholder silhouette when no photo is available.
- Choose the size appropriate to the visual hierarchy.
- Provide a meaningful `alt` attribute when the photo represents a named person.

**Don't:**
- Don't display an empty or broken image — always fall back to the placeholder.
- Don't reshape the avatar (e.g., square or rounded-square crop). It is always circular.
- Don't display text initials unless an initials variant is confirmed.
- Don't add decorative borders or rings unless a specific context requires it and it is confirmed in Figma.
- Don't use Avatar to represent non-person entities (e.g., brands, products) without a confirmed design decision.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5009:2266`, frame "Avatar".
- The Figma `avatar` prop (`pic1`–`pic5`) represents sample content for documentation, not product variants. `pic1` is the placeholder/no-photo silhouette.
- 7 sizes confirmed: XS (24px), SM (32px), MD (40px), LG (48px), XL (56px), XXL (72px), Largest (96px).
- No interactive states defined in Figma. Avatar is a display-only component.
- Usage confirmed in Dojo Customer App (node `84:93`) and Dojo Driver App (node `2007:325`).
- TODO: Confirm design token for placeholder background color.
- TODO: Confirm whether an online indicator, badge, or ring variant is part of this component.
- TODO: Confirm recommended size per use case context.
