# Button Vertical — Component Rules

This file defines the writing and usage rules for the Button Vertical component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Button Vertical is a stacked action button used usually in action grids inside bottom sheets. It displays a colored icon-form shape (diamond or circle) with an icon overlaid, and a text label below. It is used in contextual menus where multiple related actions are presented together as a grid — for example, map reporting options or categorized shortcuts.

---

## Variants

The component has one configurable property: **Icon-Form**.

### Icon-Form = diamond

A rotated square (diamond) shape sits behind the icon. 54×54px. The diamond shape is color-coded to communicate the category of the action.

Rules:
- Use when the action belongs to a category that benefits from color-coding (e.g., traffic reports, hazard types).
- The shape color is determined by the icon asset, not a component token.

### Icon-Form = circle

A circle (ellipse) sits behind the icon. 48×48px. Slightly smaller than the diamond form.

Rules:
- Use for actions that do not require category color-coding or that belong to a more neutral context.
- TODO: Confirm specific use cases for circle vs. diamond within the DoJo product.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Container height | 96px |
| Container width | ~120px (content-driven) |
| Diamond shape | 54×54px |
| Circle shape | 48×48px |
| Icon (both forms) | 32×32px |

---

## States

Confirmed from Figma component set. No hover state — designed for touch/mobile contexts.

| State | Trigger |
|---|---|
| `active` | Resting state. The button is available and not interacted with. |
| `pressed` | Button is actively tapped or clicked. |
| `disable` | Action is unavailable. Non-interactive. |
| `focus` | Button receives keyboard focus. |

Rules:
- The resting state is named `active` in Figma (not `default`).
- The `disable` state is a visual variant. Implement `disabled` or `aria-disabled="true"` in code.
- The `focus` state must be visible. Do not suppress the focus ring.
- TODO: Confirm whether a `loading` state is planned.

---

## Anatomy

Confirmed from Figma layer inspection.

| Part | Required | Description |
|---|---|---|
| Container | Yes | Rounded-square tile (~120px × 96px). Gray surface background (`--surface/neutral/default`). Vertical flex layout. |
| Icon-form shape | Yes | Colored background shape (diamond or circle) that sits behind the icon. Communicates action category via color. |
| Icon | Yes | 32×32px action icon overlaid and centered on the icon-form shape. |
| Label | Yes | Text label below the icon-wrapper. Manrope Medium 16px. Center-aligned. Can wrap to two lines. |

Rules:
- All four parts are required. Do not omit the label or the icon-form shape.
- The label must clearly describe the action. Keep it as short as possible — prefer one word, accept two if necessary.
- Labels can wrap to two lines (e.g., "Speed enforcement", "Wrong directions"). Avoid labels that require three lines.

---

## Usage guidelines

- Use Button Vertical in **action grids inside bottom sheets**. Do not use it as a standalone button in a regular layout.
- Arrange instances in a **2-column grid** as the default layout. TODO: Confirm column count and grid spacing.
- Use consistent icon-form types within the same grid. Do not mix diamond and circle forms in the same action sheet without a clear reason.
- Use the diamond form for actions that are color-coded by category (e.g., incident type, hazard level).
- Keep labels concise. One word is preferred. Two short words are acceptable. Avoid full sentences or three-line labels.
- Do not use this component for primary navigation. It is for contextual, situational actions presented as a choice grid.

---

## Accessibility

- The component has a visible label — unlike Button Icon or Button Floating, `aria-label` is not strictly required. However, if the label alone is ambiguous in context, add `aria-label` with a more descriptive name.
- The `focus` state is designed and present. Do not suppress the focus ring.
- Implement `disabled` or `aria-disabled="true"` for disabled instances.
- The icon-form shape and icon should be `aria-hidden="true"` — the label carries the accessible name.
- TODO: Confirm keyboard interaction spec (Enter and Space activate the button; Tab moves focus within the grid).
- TODO: Confirm whether grid navigation (arrow keys) is expected.

---

## Do / Don't

**Do:**
- Use in action grids inside bottom sheets.
- Arrange in a 2-column grid layout.
- Use the diamond form for color-coded category actions.
- Keep labels short — one word preferred, two if necessary.
- Use consistent icon-form types within the same grid.

**Don't:**
- Don't use as a standalone button outside of a grid context.
- Don't mix diamond and circle forms in the same action grid without a clear reason.
- Don't use labels that require more than two lines.
- Don't use this component for primary navigation or persistent UI actions.

---

## Content guidelines

- Labels must be nouns or short verb phrases that name the action or category clearly.
- Examples: "Traffic", "Accident", "Closure", "Speed enforcement", "Wrong directions".
- Avoid vague labels like "Option 1" or "Other".
- Sentence case. No all caps.
- TODO: Confirm casing convention from the design system brand guidelines.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5184:4242`, frame "Button/vertical".
- Usage confirmed in the Dojo Driver App: "Add a map report" bottom sheet (node `2218:3437`).
- The Figma component has a typo in the label prop name (`lable`). Normalised to `label` in all documentation and code.
- Token values confirmed for the `active` state only. Pressed, disabled, and focus state tokens are TODO.
- TODO: Confirm token values for all non-active states.
- TODO: Confirm whether more icon-form types (beyond diamond and circle) are planned.
- TODO: Define canonical grid layout rules (spacing, column count, row count).
