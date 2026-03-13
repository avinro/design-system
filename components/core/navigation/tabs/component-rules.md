# Tabs — Component Rules

## What it is

A full-width underline tab bar for switching between content sections on the same screen. Each tab item fills an equal portion of the bar width. Exactly one tab is active at all times, indicated by a 2px dark bottom border.

## When to use

- Switching between two to four parallel content views within the same screen or panel.
- Content sections are co-equal — no tab is a default that should stand apart.
- All tabs are always present and accessible (not conditional or hidden).

## When not to use

- More than four tabs — consider a different navigation pattern.
- Switching between top-level app screens — use a bottom navigation bar instead.
- Filtering a list with multiple simultaneous selections — use chips or checkboxes.
- Binary choices — use a Segmented Control instead.

## Item count

- Minimum: 2 items (Navs-2).
- Maximum: 4 items (Navs-4).

## Tab item content

- **Text only** — confirmed in product usage. Label should be short (one word where possible).
- **Icon only** — confirmed in DS Core base component (`icon=on`). Icon size is 24×24px.
- **Icon + label** — TODO: Confirm whether this combination is supported.

## Labels

- Use short, parallel labels (all nouns or all verbs).
- Labels must not wrap — keep to one word where possible.
- Labels are centered within the tab item.

## Selection behavior

- Exactly one tab is always active.
- There is no empty or unselected state.
- The active tab is indicated by a 2px bottom border in `--tab/border-active` (#1d1d23).
- All tabs maintain a 1px transparent bottom border to preserve layout alignment.

## Tab bar width

- Tab items fill the full width equally (`flex: 1` each).
- The bar has horizontal padding of 12px on each side (`--spacing-12`).

## Tab bar background

- DS Core specifies no background on the tab bar container.
- The Driver App adds a light surface background (`#f1f2f4`) to the bar. Confirm with the product team which behavior is intended before implementing.

## Bottom divider

- The bar has a 1px bottom border (`--notification/border-default` / `#e4e5ed`) that separates the tabs from the content below.
- Token name differs in Driver App (`--border-default`) — same value, alignment needed.

## Inactive text color discrepancy

- DS Core and Customer App use `#636377` for inactive tab text.
- Driver App uses `#9192af` — a lighter, more muted value.
- Confirm the intended token value before implementing.

## Token name discrepancies

DS Core uses slash notation (e.g. `--tab/border-active`). The Driver App uses hyphen notation with a typo in "inactive" (`--tab-border-inative`, `--tab-text-inative`). Use DS Core token names as the source of truth.

## Typography

- Font: Inter Medium 500, 15px — same as Segmented Control.
- Text is centered and does not wrap.

## Accessibility

- TODO: Confirm ARIA role — likely `tablist` / `tab`.
- TODO: Confirm keyboard arrow-key navigation between tabs.
- Active tab indicator must have sufficient contrast against the tab bar background in all product contexts.
- Active and inactive text colors must meet minimum contrast requirements.

## Do

- Use for 2–4 parallel content sections on the same screen.
- Keep labels short and consistent in grammatical form.
- Always show exactly one active tab.

## Don't

- Don't use more than four tabs.
- Don't use as a top-level app navigation pattern.
- Don't allow labels to wrap.
- Don't change the tab item width — all items must be equal width.
- Don't hide or remove tabs dynamically based on state.
