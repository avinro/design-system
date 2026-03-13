# Action Menu — Component Rules

This file defines the writing and usage rules for the Action Menu component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Action Menu is a list of contextual actions presented in a contained surface. Each item consists of an icon and a label. The component supports two presentation styles — a bottom sheet that slides up from the screen edge, and a compact popover that floats near a trigger element. It is used in the Dojo Apps to surface contextual options relevant to the current screen or selected element.

---

## Variants

Two variants are defined in Figma, corresponding to different presentation contexts.

### Sheet (Figma: "Variant3")

A full-width action surface with a drag handle at the top. Intended for bottom sheet presentation — it slides up from the bottom of the screen.

- Width: 340px
- Border radius: 12px
- No shadow
- Drag handle: 32×4px pill, centered at the top, `--handler/bg` (`#e4e5ed`)

Use for: primary contextual action sets triggered from a bottom action area. Suitable when there are multiple high-priority options the user needs to choose from.

### Popover (Figma: "Popover-view")

A compact floating menu with a drop shadow. Appears near the element that triggered it — typically anchored to a button or icon.

- Width: 180px
- Border radius: 8px
- Shadow: `elevation/dark/02` — `0px 8px 12px rgba(0,0,0,0.16)`
- No drag handle

Use for: secondary or overflow actions triggered inline — for example, a "more options" menu anchored to a kebab or ellipsis icon.

Rules:
- Do not use the Sheet variant inline in a view. It is for bottom sheet presentation only.
- Do not use the Popover variant as a full-screen overlay. It is for compact inline menus only.
- Choose the variant based on trigger position and action priority, not on the number of items.

---

## Sizes

Two sizes are defined, corresponding to the number of menu items.

| Size | Items | Approximate content height |
|---|---|---|
| `Menu-items-3` | 3 | 3 × 44px = 132px |
| `Menu-items-6` | 6 | 6 × 44px = 264px |

Rules:
- Both sizes are available for both variants.
- Choose the size based on the number of actions to surface. Do not pad with empty or placeholder items.
- If the action count exceeds 6, reconsider the information architecture — surfacing too many options at once reduces usability.
- TODO: Confirm whether item count is flexible beyond 3 and 6 in implementation, or strictly limited to these two values.

---

## States

No interactive states are defined in Figma at the container level.

Individual menu items have no defined hover, pressed, focus, or disabled states in Figma.

- TODO: Confirm item-level hover and pressed states.
- TODO: Confirm disabled item appearance and token values.
- TODO: Confirm focus ring treatment for keyboard navigation.

---

## Anatomy

### Container

| Property | Sheet | Popover |
|---|---|---|
| Width | 340px | 180px |
| Background | `--surface/neutral/default` (`#f1f2f4`) | `--surface/neutral/default` (`#f1f2f4`) |
| Border radius | 12px | 8px |
| Vertical padding | 10px | 10px |
| Shadow | None | `elevation/dark/02` |

### Drag handle (Sheet only)

| Property | Value |
|---|---|
| Width | 32px |
| Height | 4px |
| Border radius | 10px |
| Background | `--handler/bg` (`#e4e5ed`) |
| Position | Top center, 4px from top |

### Menu item (`_base-action-menu-item`)

Each item has a fixed height and a consistent layout of icon + label.

| Property | Value |
|---|---|
| Height | 44px |
| Horizontal padding | 16px |
| Vertical padding | 5px |
| Gap (icon to label) | 16px |
| Icon size | 20×20px |
| Label font | Inter Medium, 16px |
| Label color | `--text/primary` (`#1d1d23`) |
| Label line height | Normal |

Rules:
- Every menu item must have both an icon and a label. Neither can be omitted.
- Icons are 20×20px. Use icons from the `Customer-Icon` set confirmed in Figma. Do not substitute with other icon styles.
- Labels use Inter Medium, 16px — this is the body font, not the headings font.
- Keep labels short: one action verb + optional object (e.g., "Share trip", "Report issue", "Cancel ride").

---

## Typography

| Property | Token | Value |
|---|---|---|
| Font family | `--font-family/body` | Inter |
| Font weight | — | 500 (Medium) |
| Font size | `--text-base-lg` | 16px |
| Line height | — | Normal |
| Letter spacing | — | 0 (default) |
| Color | `--text/primary` | `#1d1d23` |

---

## Usage guidelines

- Use Action Menu to surface a small set of contextual actions. Keep the list focused — only include actions that are directly relevant to the current state or selected element.
- Choose the **Sheet** variant when the menu is triggered from a bottom action area or when actions are the primary decision point on the screen.
- Choose the **Popover** variant when the menu is triggered inline — for example, from a "more options" icon or an overflow button.
- Use 3 items for tightly scoped contexts. Use 6 items when more options are genuinely needed — but prefer fewer items where possible.
- Write action labels in plain language. Use a verb that describes what happens when the item is tapped: "Cancel ride", "Share location", "Report issue".
- Do not include navigation items or non-action items in the menu. Action Menu is for actions only.
- Do not use Action Menu as a primary navigation surface.
- TODO: Confirm whether destructive actions (e.g., delete, cancel) should appear with a distinct color or icon.

---

## Interaction

- The Sheet variant is expected to be presented as a bottom sheet — sliding up from the screen bottom, typically with a scrim behind it.
- The Popover variant floats above the trigger and should dismiss on tap-outside or on item selection.
- TODO: Confirm dismiss behavior for the Sheet variant (drag to dismiss, tap scrim to dismiss, or button to close).
- TODO: Confirm whether items dismiss the menu on tap, or if the menu stays open (e.g., for multi-select).
- TODO: Confirm animation/transition spec for both Sheet and Popover.
- TODO: Confirm whether the drag handle on the Sheet variant enables drag-to-dismiss gestures.

---

## Accessibility

- Each menu item must have an accessible label matching its visible text.
- The menu container should use `role="menu"` and each item `role="menuitem"`.
- Focus should move into the menu when it opens and return to the trigger when it closes.
- TODO: Confirm keyboard navigation order within the menu (Tab or Arrow keys).
- TODO: Confirm whether the Sheet variant traps focus while open.
- TODO: Confirm ARIA attributes for the popover trigger (e.g., `aria-haspopup`, `aria-expanded`).
- TODO: Confirm `aria-disabled` treatment for disabled items.

---

## Do / Don't

**Do:**
- Use for a focused set of contextual actions (3–6 items).
- Write short, action-oriented labels (verb + object).
- Choose Sheet for bottom-triggered menus; Popover for inline overflow menus.
- Include both an icon and a label on every item.

**Don't:**
- Don't surface more than 6 actions at once — reconsider the architecture.
- Don't use for navigation or non-action items.
- Don't use the Sheet variant inline; don't use the Popover as a full-screen overlay.
- Don't omit the icon or the label from any menu item.
- Don't write vague labels like "More" or "Options" — be specific about the action.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5009:2178`, frame "Action Menu".
- The Figma variant name "Variant3" corresponds to the bottom sheet presentation (it has a drag handle). This appears to be an unnamed variant in Figma. Documented here as "Sheet".
- "Popover-view" is the confirmed Figma variant name for the floating dropdown.
- Both variants share the same item anatomy and background token.
- Icon placeholder in Figma: `Customer-Icon/diamond` (20×20px) — used as sample content. In implementation, each item should receive the appropriate icon for its action.
- Usage confirmed in Dojo Customer App (node `1361:13772`) and Dojo Driver App (node `2007:325`).
- TODO: Confirm item-level interactive states (hover, pressed, disabled).
- TODO: Confirm whether destructive items should be styled differently.
- TODO: Confirm Sheet dismiss behavior and animation spec.
