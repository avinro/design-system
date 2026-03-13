# Segmented Control — Component Rules

## What it is

A horizontal tab-strip for switching between a fixed set of mutually exclusive views or filters. Exactly one item is active at all times.

## When to use

- Switching between two to four views or content modes on the same screen.
- The options are parallel and equally weighted (no option is a default that should stand alone).
- All options fit on a single line without wrapping.

## When not to use

- More than four items — use a tab bar or navigation instead.
- Items that trigger actions rather than switch state — use buttons.
- Binary yes/no choices — use a Switch Toggle or Select Boolean.
- Selecting multiple items — use checkboxes or a multi-select input.

## Item count

- Minimum: 2 items (Navs-2).
- Maximum: 4 items (Navs-4).
- Do not mix item counts within a single flow unless the context changes.

## Labels

- Labels must be short and clearly distinct from each other.
- Labels do not wrap — keep them to one or two words.
- TODO: Confirm whether icon-only or icon + label combinations are supported.

## Selection behavior

- Exactly one item must be active at all times.
- There is no unselected or empty state.
- The active item is always visually distinguished by background, border, and shadow.

## Track width

- DS Core specifies a fixed track width of 328px.
- In product contexts (e.g. Customer App), the track may span the full container width. Confirm with the product team which sizing mode applies.

## Token alignment note

- DS Core track background: `#1d1d23` (dark, opaque).
- Customer App track background: `rgba(29,29,35,0.05)` (light, semi-transparent).
- These are different visual treatments, not just a token name difference. Confirm intended usage context before applying.

## Typography

- Labels use Inter Medium 500 at 15px — not Manrope. This is intentional for this component.

## Accessibility

- TODO: Confirm ARIA role (likely `tablist` / `tab` or `radiogroup` / `radio`).
- TODO: Confirm keyboard arrow-key navigation behavior.
- Active item must have sufficient contrast against the track background in both the dark (DS Core) and light (Customer App) contexts.

## Do

- Use for content-switching only (not form submission or destructive actions).
- Keep all item labels consistent in grammatical form (all nouns, all verbs, etc.).
- Ensure the active state is always visible at all supported track background colors.

## Don't

- Don't use more than four items.
- Don't allow the control to wrap to multiple lines.
- Don't use as a substitute for radio buttons in a form — use Radio Select instead.
- Don't change the number of items dynamically after the control has rendered.
