# Header Wrapper — Component Rules

This file defines the writing and usage rules for the Header Wrapper component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Header Wrapper defines how the `Header` component renders according to the background color of the page beneath it. It has a single `bg` prop with two values that control whether the header has rounded bottom corners.

The `bg` prop describes the **page background color below the header** — not the header's own color. The header's background is always `surface/neutral/default`. What changes is how the header's bottom edge meets the page content beneath it.

---

## Variants

### `bg=sunken`

**When the page background below the header is `surface/sunken`** (a darker, recessed color).

The header sits on top of a visually lower background. To create a clear separation between the header and the page content, the wrapper applies **24px rounded bottom corners** (bottom-left and bottom-right only). This makes the header appear to float above the sunken content.

The wrapper uses `clipsContent: true` to enforce the rounded clip. The inner `Header` instance fills to the edges of the wrapper.

Token: `VariableID:5001:1944` → `radius.2xl` → 24px (bottom corners only)

**Use on:** screens where the content area has a `surface/sunken` background — typically chat screens, detail screens, or any screen with inset/card-style content below the navigation bar.

### `bg=surface`

**When the page background below the header is `surface/default`** (the same color as the header).

The header and the page content share the same background tone. No rounding is needed — the transition from header to content is seamless and flush.

Token: `VariableID:5001:1953` → `radius.0` → 0px (no corners)

**Use on:** screens with a flat `surface/default` page background — typically list screens, settings pages, or any screen where the content starts immediately below the header at the same visual level.

---

## What the wrapper controls

The wrapper only controls **border-radius on the bottom corners**. It does not:
- Change the header's background color
- Add padding or spacing
- Modify the inner Header's variant or props
- Add shadows or elevation effects

---

## Anatomy

A single slot containing one `Header` instance (any variant from the `Header` component set). The wrapper clips the header to the defined border-radius shape.

---

## Rules

- Always use this wrapper when placing a `Header` on a screen. Do not place the `Header` component directly without the wrapper — the corner treatment will be missing.
- Choose `bg` based on the actual background color of the page content below the header — not based on visual preference.
- `bg=sunken` → page background is `surface/sunken`
- `bg=surface` → page background is `surface/default`
- Do not manually override border-radius on the inner `Header` instance — let the wrapper handle it.
- The `Header` instance inside can be any variant of the `Header` component set.

---

## Stroke

Both variants have a bottom stroke bound to `VariableID:7013:32`. This is the separator line between the header and the page content. It is always 1px and uses the `notification/border-default` color token.

---

## Notes

- Figma component set node: `7511:31768` (Dojo_DS Core, page "headers")
- Previously named `heade-wrapper` (typo). Renamed to `header-wrapper`.
- Bottom-left and bottom-right corner radii for `bg=sunken` are bound to variable `VariableID:5001:1944`.
- All corner radii for `bg=surface` are bound to variable `VariableID:5001:1953` (0px / no rounding).
- `clipsContent: true` is set on both variants — the inner Header instance is clipped to the wrapper's shape.
