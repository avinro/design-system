# Badge — Component Rules

This file defines the writing and usage rules for the Badge component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Badge is a small pill-shaped label used to communicate status, category, or contextual metadata at a glance. It displays a short text string in one of six color types, each conveying a distinct semantic meaning. Badge is a display-only component with no interactive states.

---

## Variants

Six types are defined in Figma via the `type` prop. Each type has a distinct background and text color.

### `default`

Neutral gray. No semantic meaning attached.

- Background: `--badge/default/bg` (`#e4e5ed`)
- Text: `--badge/default/text` (`#34353f`)

Use for: generic labels, categories, or metadata that carries no status meaning.

### `outlined`

No background fill. Bordered outline with the same neutral text color as `default`.

- Border: `--badge/outlined/border` (`#cccdda`)
- Text: `--badge/default/text` (`#34353f`)

Use for: secondary or inactive labels where a filled background would carry too much visual weight — for example, optional filters or de-emphasized tags.

### `error`

Red. Communicates an error, problem, or critical status.

- Background: `--notification/error-bg` (`#fcdcdc`)
- Text: `--notification/error-text` (`#a43636`)

Use for: failed states, validation errors, blocked actions, or any status that requires immediate attention.

### `info`

Blue. Communicates informational or neutral system status.

- Background: `--notification/info-bg` (`#d4e3ff`)
- Text: `--notification/info-text` (`#1a4dac`)

Use for: informational labels, pending states, or system-generated metadata.

### `Success`

Green. Communicates a successful, completed, or positive state.

- Background: `--notification/success-bg` (`#d5f4d6`)
- Text: `--notification/success-text` (`#176719`)

Use for: confirmed, completed, active, or approved statuses.

### `Warning`

Yellow. Communicates a cautionary or attention-required state.

- Background: `--notification/warning--bg` (`#f6e3a4`)
- Text: `--notification/warning-text` (`#775c01`)

Use for: degraded states, expiring items, or situations that need attention but are not yet critical.

Rules:
- Choose the type based on the **semantic meaning** of the status — not its visual appearance.
- Do not use `error` for warnings, or `warning` for errors. The color carries meaning.
- Use `default` or `outlined` for neutral labels that have no status meaning.
- Do not use multiple badge types on the same item unless each communicates a genuinely distinct status dimension.
- TODO: Confirm whether the `Success` and `Warning` type names should be normalized to lowercase (`success`, `warning`) in implementation to follow the naming convention of the other types.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Padding (horizontal) | `--spacing-8` (8px) |
| Padding (vertical) | `--spacing-4` (4px) |
| Border radius | Pill (`9999px`) |

---

## States

No interactive states are defined in Figma. Badge is a display-only component.

- TODO: Confirm whether a dismissible variant (with a close icon) is planned.
- TODO: Confirm whether Badge is ever used as an interactive filter or tag.

---

## Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | Pill-shaped container. Background and border depend on type. Padding: 8px horizontal, 4px vertical. |
| Label | Yes | Short text string. Manrope SemiBold, 12px, `whitespace-nowrap`. Color depends on type. |

Rules:
- The label is always required. Do not render a Badge without visible text content.
- The label must be `whitespace-nowrap` — do not allow it to wrap. Keep labels short.
- No icon support is defined in Figma. Do not add icons unless a separate icon variant is confirmed.
- The border is only applied in the `outlined` type. Do not add a border to other types.

---

## Typography

All types share the same text style.

| Property | Token | Value |
|---|---|---|
| Text style | `Body xs/SemiBold` | — |
| Font family | `--font-family/body` | Manrope |
| Font weight | `--weight/semibold` | 600 |
| Font size | `--size/xs` | 12px |
| Line height | — | 1.2 |
| Letter spacing | `--letter-spacing/normal` | 0px |
| White space | — | `nowrap` |

---

## Content guidelines

- Keep badge labels **as short as possible**: 1–3 words maximum.
- Use nouns or short noun phrases for status labels: "Active", "Pending", "Expired", "Blocked".
- Use sentence case (capitalize only the first word).
- Avoid full sentences or descriptions — if more context is needed, use a different component.
- Do not truncate labels with ellipsis — badge text must always be fully visible.

---

## Usage guidelines

- Use Badge to communicate the **status, category, or type** of an adjacent element at a glance.
- Place Badge near the element it describes: next to a title, alongside a list item, or within a card header.
- Use a single Badge per item unless each badge communicates a genuinely different dimension (e.g., one for status, one for category).
- Do not use Badge as a primary navigation or action element.
- Do not use Badge as a notification counter — see the notification dot or counter component for that pattern.
- TODO: Confirm the specific screen contexts where Badge is used in the Dojo Apps.

---

## Accessibility

- Badge text is informational. Ensure it is readable by screen readers as part of its surrounding context.
- If a Badge appears without adjacent explanatory text, consider adding a visually hidden label or `aria-label` on the parent element to provide full context.
- The color contrast of all six types should meet WCAG AA contrast requirements. TODO: Confirm contrast ratios for all type combinations.
- Do not rely on color alone to communicate status — the label text must carry the meaning independently.

---

## Do / Don't

**Do:**
- Use the type that matches the semantic meaning of the status.
- Keep labels short (1–3 words).
- Pair Badge with a visible label or title that provides full context.
- Use `default` or `outlined` for neutral, non-status labels.

**Don't:**
- Don't use `error` for warnings, or vice versa — color has semantic meaning.
- Don't write long labels — `whitespace-nowrap` is applied.
- Don't add icons unless a confirmed icon variant is defined.
- Don't use Badge as a navigation control or interactive filter without a confirmed interactive variant.
- Don't rely on color alone to communicate status — the label text must be self-explanatory.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5050:816`, frame "Badge".
- Six confirmed types: `error` (5050:817), `info` (5050:819), `Success` (5050:821), `Warning` (5050:823), `default` (5050:825), `outlined` (5050:827).
- Note: `Success` and `Warning` are capitalized in the Figma prop. All other types (`error`, `info`, `default`, `outlined`) are lowercase. Normalize casing in implementation as appropriate.
- The `outlined` type uses a 1px solid border (`--badge/outlined/border`) and no background fill.
- The `--notification/warning--bg` token has a double dash — this is the confirmed Figma token name.
- No interactive states, no size variants, no icon support defined in Figma.
- Usage confirmed in Dojo Customer App (node `1361:13772`) and Dojo Driver App (node `2007:325`).
