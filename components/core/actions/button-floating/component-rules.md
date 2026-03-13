# Button Floating — Component Rules

This file defines the writing and usage rules for the Button Floating component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Button Floating is a circular icon button that appears elevated above a content surface — such as a map, image, or layered view. It uses a white neutral background and a drop shadow (`elevation/light/01`) to create the visual impression of floating. It has no type variants and no visible label. It is used for a single, contextual action directly related to the surface below it.

---

## Variants

There are no type variants. Button Floating has a single visual style: white surface with an elevation shadow.

This is the key distinction from Button Icon, which supports multiple types (Default, Accent, Secondary, etc.).

---

## Sizes

Confirmed from Figma component set.

### lg — Default size

The standard size for floating buttons. Use in most product views, primarily on map surfaces.

Rules:
- Use by default whenever the floating button appears over a map or full-screen content surface.
- Dimensions: 54×54px. (Note: 54px, not 56px as in Button and Button Icon.)
- TODO: Confirm icon size for lg.

### md — Secondary size

For less important floating actions or contexts where the button should have less visual presence.

Rules:
- Use when the action is secondary or the layout requires a smaller button.
- Dimensions: 44×44px. Icon size: 24×24px.

General size rules:
- Do not mix sizes within the same surface unless there is a clear hierarchy reason.
- TODO: Confirm padding values for lg.

---

## States

Confirmed from Figma component set.

| State | Trigger |
|---|---|
| `Default` | Resting state, no interaction. |
| `Pressed` | Button is actively tapped or clicked. |
| `Disabled` | Action is unavailable. Non-interactive. |
| `Focus` | Button receives keyboard focus. |

Rules:
- There is no hover state. This component is designed primarily for touch/mobile contexts.
- The `Disabled` state is a visual variant in Figma. Implement `disabled` or `aria-disabled="true"` in code.
- The `Focus` state must be visible. Do not suppress the focus ring.
- TODO: Confirm whether the shadow is suppressed or retained in the Disabled state.

---

## Anatomy

Confirmed from Figma layer inspection.

| Part | Required | Description |
|---|---|---|
| Container | Yes | Square wrapper (equal width/height). `rounded-full` border-radius renders as a perfect circle. White neutral background (`--surface/neutral/sunken`). Drop shadow (`elevation/light/01`). |
| Icon | Yes | A single centered icon. 24×24px for md. No visible label. |

Rules:
- The icon is the only visible content. Do not add a label.
- Only use icons that clearly communicate the action in their context.
- The elevation shadow is part of the component's visual identity. Do not remove it.
- TODO: Confirm whether the shadow changes in the Pressed state.

---

## Usage guidelines

- Use Button Floating only for a single, contextual action directly related to the surface it floats above (e.g., re-centering a map, locking GPS position).
- Place only one floating button per surface. Avoid stacking multiple floating buttons in the same area.
- Position the button at a consistent, predictable location within the surface (typically a fixed corner).
- Do not use Button Floating for primary navigation or app-level actions. Use the labeled Button for those.
- Do not use Button Floating when space allows for a labeled button — the label always improves clarity.
- Always provide an `aria-label` describing the action.
- Provide a tooltip matching the `aria-label` when possible, to aid discoverability for sighted users.
- TODO: Define the canonical position (e.g., bottom-right, bottom-left) within the DoJo product.

---

## Accessibility

- `aria-label` is **required** on every instance. The component has no visible label.
- The icon element should be `aria-hidden="true"` so screen readers use the button's `aria-label`.
- The `Focus` state is designed and present. Do not suppress the focus ring.
- Implement `disabled` or `aria-disabled="true"` for disabled instances.
- Provide a tooltip matching the `aria-label` for sighted users.
- TODO: Confirm minimum contrast ratio of the white surface against the content backgrounds it floats over.
- TODO: Confirm keyboard interaction spec (Enter and Space activate; Tab moves focus).

---

## Do / Don't

**Do:**
- Always provide an `aria-label` (e.g., `aria-label="Center map"`).
- Use for a single, surface-specific action.
- Position consistently and predictably within the surface.
- Use a tooltip to expose the button's purpose on hover and focus.

**Don't:**
- Don't place more than one floating button on the same surface unless there is a clear hierarchy reason.
- Don't use Button Floating without an `aria-label`.
- Don't use it for global app actions — it is surface-specific.
- Don't remove the elevation shadow — it is part of the component's identity.
- Don't use it when a labeled button fits in the available layout.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5180:273`, frame "Button/floating".
- Context confirmed via Dojo Driver App file (`tdHwm5RAIg6k9WTW4FQKCX`, node `2007:325`).
- The `Driver-Icon/map-center` icon (24×24px) is the Figma placeholder icon. Any contextually appropriate icon can be used.
- No type variants — this differs from Button Icon, which has six types.
- No hover state — designed for touch/mobile-first contexts.
- lg size is 54×54px. This differs from the 56px lg height used in Button and Button Icon.
- TODO: Confirm icon size and padding for lg.
- TODO: Confirm positioning conventions (corner, offset from edge).
- TODO: Confirm whether multiple floating buttons can coexist on one surface.
- TODO: Confirm shadow behavior in Pressed and Disabled states.
