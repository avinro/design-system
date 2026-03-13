# Button — Component Rules

This file defines the writing and usage rules for the Button component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Button is the primary interactive trigger used to initiate actions in the interface. It supports six visual types to express hierarchy and intent, three sizes to match layout density, and five states for full interaction coverage. The label is required; leading icon and trailing dropdown icon are optional slots.

---

## Variants

Confirmed from Figma component set (node 17:14613). Use the exact names below.

### Primary

The main button in any view. Represents the most important action or the key next step in a flow.

Rules:
- Use at most one Primary button per view at the same hierarchy level.
- Examples: "Confirm booking", "Save changes", "Continue".

### Secondary

For important but non-primary actions. Appears alongside a Primary button when two relevant options exist.

Rules:
- Use when the user has two meaningful options and neither should be hidden.
- Visually lighter than Primary but clearly actionable.
- Examples: "Cancel" alongside "Save", "View details" alongside "Book now", "Edit" alongside "Confirm".

### Outlined

For tertiary or supporting actions that must be available but should not compete with Primary or Secondary.

Rules:
- Can appear multiple times on a page (filters, utility actions, secondary navigation).
- Examples: "View all plans", "Manage payment methods", "Filter results".

### Accent

A special variant for specific, intentional contexts. Use only when you need to highlight an action in a very specific moment — such as a temporary promotion or a high-value action.

Rules:
- Must not become the visual default of the product. Use sparingly with a clear reason.
- Not a substitute for Primary in standard flows.
- Examples: "Apply upgrade" in a limited-time offer, "Redeem reward" in a loyalty context.

### No-fill

A ghost variant for low-emphasis actions or dense layouts where visual weight must be minimal.

Rules:
- TODO: Define specific use cases and rules for No-fill within the DoJo product context.

### Destructive

For destructive or irreversible actions only. Must always make the risk of the action clear.

Rules:
- Always pair with a confirmation step (modal or confirmation message).
- Examples: Permanently deleting a user account, canceling a booking with a penalty, deleting a full plan, removing a saved payment method, resetting advanced settings to defaults.

---

## Sizes

Confirmed from Figma component set.

### md — Default size

The standard size for buttons in the product. Use in most layouts and flows.

Rules:
- Use by default in forms, cards, and detail pages.
- Appropriate for Primary, Secondary, and Outlined in standard contexts.
- Examples: "Save changes" on a booking details page, "Continue" in a multi-step flow, "Confirm ride" in a ride request view.

### sm — Compact size

For reduced or dense layouts where vertical space is limited.

Rules:
- Use for utility actions, inline controls, and list items.
- Do not use for the main primary action of a screen unless the entire layout is compact.
- Examples: "Edit" in a list item or table row, filter/sort actions in a toolbar, "View details" inside a tight card layout.

### lg — Highlighted size

For high-impact, prominent CTAs only.

Rules:
- Use at most one `lg` button per view to preserve emphasis.
- Use in hero sections, onboarding screens, or dedicated promotional surfaces.
- Examples: "Start planning your trip" on an empty state screen, "Book now" on a key in-app marketing surface, "Upgrade experience" in a premium promotion section.

General size rules:
- Match size to the density and importance of the surrounding layout.
- Do not mix sizes within a single action group.
- TODO: Confirm font size and padding values for `sm` and `lg`.

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
| Container | Yes | Pill-shaped wrapper with background, border, and border-radius. |
| Left icon | No | 16×16px leading icon. Renders before the label. |
| Label | Yes | Short, action-oriented text. Single line. No wrapping. |
| Right icon | No | 16×16px trailing chevron. Use only for dropdown or expandable actions. |

Rules:
- The label is always required. Do not use the button without a visible label.
- TODO: Confirm whether an icon-only (no label) configuration is supported.
- Use the right icon slot only when the button triggers a dropdown or expandable panel. Do not use it for decoration.

---

## Usage guidelines

- Use one `Primary` button per view as the dominant action. Do not place two at the same hierarchy level.
- Use `Secondary` alongside `Primary` when two relevant options are available and neither should be hidden.
- Use `Outlined` for tertiary or repeatable utility actions. It can appear multiple times on a page.
- Use `Accent` only for specific, intentional moments (promotions, high-value pushes). Have a clear reason. It must not become the product's visual default.
- Use `Destructive` only for irreversible actions. Always pair with a confirmation step.
- Use `No-fill` for low-emphasis actions or dense contexts. TODO: Define specific product cases.
- Use `md` by default. Use `sm` in compact or dense layouts. Use `lg` for high-impact CTAs only — at most once per view.
- Do not use `sm` for the main primary action unless the entire layout is compact.
- Keep labels short, specific, and action-oriented. Prefer verb phrases: "Save changes", "Confirm ride", "Delete account".
- Do not truncate or wrap labels. Write them short enough to fit at the target size.

---

## Accessibility

- Focus state is designed and present. Keyboard navigation must reach the button in logical DOM order.
- Implement `disabled` attribute or `aria-disabled="true"` for disabled buttons. Visual state alone is insufficient.
- TODO: Confirm minimum contrast ratios per type and background context.
- TODO: Confirm whether `aria-label` is required for icon-only configurations (if supported).
- TODO: Confirm keyboard interaction spec: Enter and Space should activate the button; Tab moves focus.
- TODO: Confirm screen reader behavior for the right icon (dropdown chevron). Determine whether it should be `aria-hidden` or announced. If it signals dropdown behavior, add `aria-haspopup` and `aria-expanded` to the button.

---

## Do / Don't

**Do:**
- Use one `Primary` button per view as the dominant action.
- Pair `Secondary` with `Primary` when two relevant options need to be presented.
- Use `Outlined` for repeatable utility actions (filters, secondary navigation, etc.).
- Use `Destructive` with a confirmation step — always make the risk clear.
- Use `Accent` only in specific, intentional moments with a clear reason.
- Use `lg` for hero CTAs and high-impact onboarding moments. Use `sm` for compact layouts and inline controls.

**Don't:**
- Don't place two `Primary` buttons at the same hierarchy level.
- Don't use `Accent` as a visual default or substitute for `Primary` in standard flows.
- Don't use `lg` more than once per view — it loses emphasis if overused.
- Don't use `sm` for the main primary action unless the entire layout is compact.
- Don't use the right icon (chevron) unless the button opens a dropdown or expandable panel.
- Don't use `Destructive` without a confirmation step.
- Don't truncate or wrap button labels.

---

## Content guidelines

- Labels must be action verbs or verb phrases. Example: "Save", "Delete file", "Add member".
- Avoid vague labels such as "Click here", "Submit", or "OK" unless the context makes the action unambiguous.
- Labels should be sentence case, not all caps or title case, unless the design system specifies otherwise.
- TODO: Confirm casing convention from the design system brand guidelines.

---

## Notes

- The component was extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `17:14613`.
- Token values are only fully confirmed for `Primary / Default / md`. All other type/state combinations are marked as TODO in `button.tokens.json`.
- TODO: Confirm whether icon-only button is a supported pattern or requires a separate component.
- TODO: Confirm whether a loading/spinner state is planned.
