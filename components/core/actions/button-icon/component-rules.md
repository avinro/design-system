# Button Icon — Component Rules

This file defines the writing and usage rules for the Button Icon component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Button Icon is a compact, label-free action trigger that displays a single icon inside a circular container. It follows the same type hierarchy and size rules as the Button component, but is used when space is too limited for a label or when the icon is universally recognizable in context. Because it has no visible label, an accessible name is required on every instance.

---

## Variants

Confirmed from Figma component set (node 5007:1640). The six types follow the same semantic hierarchy as the Button component.

### Default

The main icon action in a view. Equivalent to Primary in the labeled Button. Uses a dark fill.

Rules:
- Use at most one Default icon button per view at the same hierarchy level.
- Only use when the icon clearly communicates the action without a label.

### Accent

A highlighted icon action for specific, intentional moments — promotions or high-value pushes.

Rules:
- Must not become the visual default. Use sparingly with a clear reason.
- Not a substitute for Default in standard flows.

### Secondary

A supporting icon action. Use alongside a Default button when two relevant options exist.

Rules:
- Use when the action is important but secondary to the Default.

### Outlined

A bordered ghost icon action for tertiary or utility actions.

Rules:
- Can appear multiple times on a page (toolbars, filters, utility controls).

### No-fill

A ghost icon action for low-emphasis actions or dense layouts where visual weight must be minimal.

Rules:
- TODO: Define specific use cases and rules for No-fill within the DoJo product context.

### Destructive

For destructive or irreversible icon actions only. Must always make the risk of the action clear.

Rules:
- Always pair with a confirmation step (modal or confirmation message).
- The icon must unambiguously signal the destructive nature of the action (e.g., a trash/delete icon).

---

## Sizes

Confirmed from Figma component set. Same height values as the Button component; width equals height (square → circle).

### md — Default size

The standard size for icon buttons. Use in most layouts and flows.

Rules:
- Use by default in toolbars, cards, and action bars.
- Icon size: 20×20px (confirmed for md).

### sm — Compact size

For reduced or dense layouts where space is limited.

Rules:
- Use for inline controls, list items, and tight toolbars.
- Do not use as the main action of a screen unless the entire layout is compact.
- TODO: Confirm icon size for sm.

### lg — Highlighted size

For high-impact, prominent icon CTAs only.

Rules:
- Use at most one `lg` icon button per view to preserve emphasis.
- Reserve for hero actions, empty states, or dedicated promotional surfaces.
- TODO: Confirm icon size for lg.

General size rules:
- Match size to the surrounding layout density.
- Do not mix sizes within a single action group.
- TODO: Confirm padding values for sm and lg.

---

## States

Confirmed from Figma component set. All six types implement all five states.

| State | Trigger |
|---|---|
| `Default` | Resting state, no interaction. |
| `Hover` | Pointer enters the button area. |
| `Pressed` | Button is actively clicked or tapped. |
| `Disabled` | Action is unavailable. Non-interactive. |
| `Focus` | Button receives keyboard focus. |

Rules:
- The `Disabled` state is a visual variant in Figma. Implement `disabled` or `aria-disabled="true"` in code.
- The `Focus` state must be visible. Do not remove or suppress the focus ring.
- TODO: Confirm whether a `Loading` state exists.

---

## Anatomy

Confirmed from Figma layer inspection.

| Part | Required | Description |
|---|---|---|
| Container | Yes | Square wrapper (equal width/height). Uses `rounded-full` border-radius — renders as a perfect circle. Carries background fill and border. |
| Icon | Yes | A single centered icon. 20×20px for md. Communicates the action. No visible label. |

Rules:
- The icon is the only content. Do not add a visible label inside this component — use the labeled Button component instead.
- Only use icons that are universally recognizable in their context. If the icon alone is ambiguous, use the labeled Button instead.

---

## Usage guidelines

- Use Button Icon when space is too limited for a labeled button and the icon is unambiguous in its context.
- Prefer the labeled Button over Button Icon whenever space allows — labels reduce cognitive load and improve accessibility.
- Follow the same type hierarchy rules as the Button component: one Default per view, Accent sparingly, Destructive with confirmation.
- Follow the same size rules: md by default, sm in compact layouts, lg for high-impact moments and at most once per view.
- Use a tooltip to expose the button's purpose on hover/focus whenever possible.
- Do not use Button Icon for the main primary action of a screen unless the entire UI is icon-based.

---

## Accessibility

- `aria-label` is **required** on every instance. The component has no visible label. Without `aria-label`, the button has no accessible name and is unusable with assistive technology.
- The icon element should be `aria-hidden="true"` so screen readers use the button's `aria-label` instead of trying to interpret the icon.
- The `Focus` state is designed and present. Keyboard navigation must reach the button in logical DOM order. Do not suppress the focus ring.
- Implement `disabled` attribute or `aria-disabled="true"` for disabled buttons. Visual state alone is insufficient.
- Provide a tooltip that matches the `aria-label` text for sighted users who may not recognize the icon.
- TODO: Confirm minimum contrast ratios per type against their intended background contexts.
- TODO: Confirm keyboard interaction spec (Enter and Space activate the button; Tab moves focus).

---

## Do / Don't

**Do:**
- Always provide an `aria-label` that describes the action (e.g., `aria-label="Delete account"`).
- Use a tooltip to expose the button's purpose on hover and focus.
- Use only icons that clearly communicate the action in their context.
- Follow the same type and size hierarchy rules as the labeled Button.
- Use `Destructive` with a confirmation step — always make the risk clear.

**Don't:**
- Don't use Button Icon without an `aria-label`.
- Don't use an ambiguous icon and expect users to understand the action without context.
- Don't use Button Icon when space allows for a labeled button.
- Don't use `Destructive` without a confirmation step.
- Don't use `lg` more than once per view.
- Don't use `sm` for the main primary action unless the entire layout is compact.

---

## Notes

- This component was extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5007:1640`, frame name "Button/only icon".
- The Figma layer for Destructive is named `Ddestructive` (double 'd' — typo). Normalised to `Destructive` in all documentation.
- Token values are only fully confirmed for `Default / Default / md`. All other type/state combinations are marked as TODO in `button-icon.tokens.json`.
- TODO: Confirm icon sizes for sm and lg.
- TODO: Confirm whether a tooltip is required or only recommended.
- TODO: Confirm whether a loading/spinner state is planned.
