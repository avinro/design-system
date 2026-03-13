# Action Menu Item — Component Rules

This file defines the writing and usage rules for the Action Menu Item component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Action Menu Item is a single interactive row used inside action menus and list surfaces. It supports a left icon, a right icon, and a text area that can display a title only, a title with a description, or a full three-line layout with subtitle, title, and description. It is the individual item unit placed inside the Action Menu container, and may also be used in other list contexts.

---

## Variants

Three content types are defined in Figma via the `type` prop. All types share the same container dimensions and icon slots.

### `only Title`

The minimal layout. Displays a title only (plus optional left and right icons).

Use for: straightforward actions where the label alone is sufficient — no additional context is needed.

### `title + description`

Displays a title and a description below it.

Use for: actions that benefit from a short supporting explanation — for example, when two items have similar titles and the description differentiates them.

### `full`

Displays three lines of text: a subtitle above the title, followed by a description below it.

Use for: items where additional hierarchy or pre-title context is necessary — for example, showing a category or status label above the primary action name.

Rules:
- Choose the simplest type that communicates the action clearly. Default to `only Title` unless additional context is genuinely needed.
- Do not use `full` for simple actions — it adds visual weight that is only justified when all three text levels carry distinct meaning.
- Do not invent a fourth layout. Only the three defined types are confirmed in Figma.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Width | 426px |
| Min-height | 56px |
| Padding (all sides) | `--spacing-8` (8px) |

---

## States

No interactive states are defined in Figma.

- TODO: Confirm hover and pressed state appearance and token values.
- TODO: Confirm disabled state appearance and token values.
- TODO: Confirm focus ring treatment for keyboard navigation.

---

## Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | Outer row surface. Background: `--surface/neutral/default`. Min-height: 56px. Padding: 8px. |
| Left icon | Optional | 24×24px icon at the leading edge. Controlled by `leftIcon` prop. Default: shown. |
| Text container | Yes | Holds title, and optionally subtitle and description. Max-width: 280px. |
| Subtitle | `full` type only | Small label above the title. Manrope Regular, 12px, `--text/placeholder`. |
| Title | Yes | Primary action label. Manrope SemiBold, 14px, `--text/primary`. |
| Description | `title + description` and `full` types | Secondary supporting text below the title. Manrope Regular, 12px, `--text/placeholder`. |
| Right icon | Optional | 22×22px icon at the trailing edge. Controlled by `rightIcon` prop. Default: chevron-right. Can be replaced with a custom element via `rightIconSelector`. |

Rules:
- The left icon is optional but shown by default. Only hide it when the visual context makes it redundant.
- The right icon is optional. Use the default chevron-right when the item navigates or opens something. Replace with a toggle, checkbox, or other control when the interaction differs. Hide it when no trailing action or indicator is needed.
- The text container has a max-width of 280px. Long titles and descriptions are constrained to this width.
- Only Title is `whitespace-nowrap`. Description and subtitle can wrap within the 280px text container.
- Do not mix content levels arbitrarily — use the type that matches the content structure.

---

## Typography

| Element | Text style | Font | Weight | Size token | Color token |
|---|---|---|---|---|---|
| Title | `Body sm/120/SemiBold` | `--font-family/body` (Manrope) | `--weight/semibold` (600) | `--size/base` (14px) | `--text/primary` (#1d1d23) |
| Description | `Body xs/Regular` | `--font-family/body` (Manrope) | `--weight/regular` (400) | `--size/xs` (12px) | `--text/placeholder` (#636377) |
| Subtitle | `Body xs/Regular` | `--font-family/body` (Manrope) | `--weight/regular` (400) | `--size/xs` (12px) | `--text/placeholder` (#636377) |

Text container properties (for multi-line types):
- Gap between text lines: `--spacing-4` (4px)
- Line height: 1.2
- Letter spacing: `--letter-spacing/normal` (0px)

---

## Usage guidelines

- Use Action Menu Item as the individual row unit inside an Action Menu container (Sheet or Popover variant).
- It may also be used in other list-like surfaces where the same row structure applies.
- Choose the **content type** based on the amount of context needed for the action:
  - Use `only Title` by default — it is the simplest and most scannable.
  - Use `title + description` when two or more items have similar titles and need differentiation.
  - Use `full` when a subtitle adds necessary hierarchy above the title.
- Write **titles** as short action phrases: one verb + optional object. Keep them under ~30 characters.
- Write **descriptions** as brief supporting context (one short phrase). Do not repeat the title.
- Write **subtitles** as a category, status, or grouping label — not as a secondary action.
- Do not disable items silently — if an item is not available, consider removing it or explaining why with a description.

---

## Accessibility

- The title is the primary accessible label for the item. It must clearly describe the action.
- If both title and description are present, the full text of both should be available to screen readers.
- Each item should use `role="menuitem"` when inside an Action Menu, or `role="listitem"` / `role="option"` in other list contexts — depending on the container's role.
- The left icon and right icon are decorative and should be `aria-hidden="true"`.
- TODO: Confirm keyboard interaction (Tab, Enter, Arrow key behavior) depending on container role.
- TODO: Confirm `aria-disabled` treatment for disabled items.
- TODO: Confirm focus ring specification.

---

## Do / Don't

**Do:**
- Use `only Title` as the default type — it is the clearest and most compact.
- Write short, action-oriented titles.
- Use the right icon to communicate what happens on tap (navigate → chevron, toggle → switch).
- Hide the right icon when no trailing indicator or action is needed.

**Don't:**
- Don't use `full` for simple actions — reserve three-level text for genuinely complex items.
- Don't write titles longer than ~30 characters.
- Don't repeat the title content in the description.
- Don't use the subtitle as a secondary label for the same action — it signals hierarchy, not repetition.
- Don't hide the left icon without purpose — it aids scannability when the icon set is consistent.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5126:426`, frame "Action Menu Item".
- Three confirmed Figma type nodes: `5086:602` (only Title), `5126:427` (title + description), `5126:437` (full).
- The placeholder left icon in Figma is `Customer-Icon/phone-call` (24×24px). Replace with the appropriate icon per action in implementation.
- The placeholder right icon in Figma is a chevron-right (22×22px). This can be replaced via `rightIconSelector`.
- No interactive states defined in Figma. TODO: Confirm hover, pressed, focus, and disabled states.
- Usage confirmed in Dojo Customer App (node `1361:13772`) and Dojo Driver App (node `2007:325`).
