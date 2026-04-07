# Header — Component Rules

This file defines the writing and usage rules for the Header component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Header is the top navigation bar for all screens except the Home screen. It uses a three-zone layout: left action, center content, and right actions. Each zone is independently configurable — parts can be shown, hidden, or replaced with alternative content types. The component unifies the header patterns used across both the customer app and the driver app.

Do not use Header on the Home screen of the customer app. Use the `header-home` component (ds-customer) there instead.

---

## Structure

```
[ Left button ]  [ Center content ]  [ Right actions ]
```

All three zones are optional. At minimum, show at least a title or a back button so users have orientation and navigation.

---

## Left button

- Default icon: back arrow (`arrow-back-left`)
- Alternative icons: close (`x-close`), menu (`menu-hamburger`)
- Default behavior: navigates back (`router.back()`)
- Hide when: on root screens with no back navigation
- The button uses the `btn-header` sub-component (44px, circular)

Rules:
- Always pair a back button with a title unless the context is unambiguous (e.g. full-screen auth flows)
- Do not use both `hideLeftButton` and `showBack` at the same time
- Use `leftIcon` only to override the icon — do not replace the back button with a non-navigational icon

---

## Center content

Choose one mode at a time. Do not combine modes.

### Title mode (default)

- Show a single bold label identifying the current screen
- Title is centered by default; use left-aligned when paired with a back button on secondary screens where centering creates visual imbalance
- Keep titles short — one to three words when possible

### Description mode (`description=on`)

- Adds a supporting subtitle below the title
- Use for screens where the title alone is ambiguous (e.g. "New chat" with subtitle "Jun 9 – Jun 15")
- Do not repeat information already visible on the screen

### Date selector mode (`date=on`)

- Shows a month/year label (e.g. "Jun, 2026") with a dropdown chevron
- Tapping opens a date or month picker — it does not expand inline
- Use on calendar views and schedule screens
- Pair with search and add icon buttons on the right

### Search mode (`search=on`)

- Replaces the title with a Search bar
- Use the correct Search type: `Customer` for the customer app, `driver` for the driver app — they differ visually
- Only show search mode when the user has explicitly triggered search
- A back button should always be visible in search mode so users can exit

---

## Right actions

### Icon buttons

- Use 0, 1, or 2 `btn-header` icon buttons
- Always provide an accessible label for each button
- Common right icons: search, plus/add, share, alert, more (vertical dots)
- When using 2 icons, the more destructive or secondary action goes to the right

### Action button (`button=on`)

- Use a text label only (e.g. "Finish", "Save", "Done")
- Replaces icon buttons — do not show both simultaneously
- Uses accent button styling (pill shape, accent background)
- Reserve for screens with a single, primary confirming action

### No right actions (`no icon=on`)

- Hide all right-side elements
- Use on simple screens where no right action is needed and visual cleanliness is the priority

---

## Safe area

Always apply the device safe area top inset as padding so the header does not overlap the status bar. Use `useSafeAreaInsets()` or equivalent platform API.

---

## States

The Header has no interactive states of its own. Interactivity lives inside its sub-components:
- `btn-header`: default and pressed (`:active`)
- `Search`: Default, focused (`:focus-visible`), writing

---

## Accessibility

- The left button must have `aria-label` describing its action (e.g. `"Go back"`, `"Close"`)
- Each right icon button must have an `aria-label` (e.g. `"Search"`, `"Add"`, `"Share"`)
- The action button must have an `aria-label` matching its visible label
- The date selector must have `aria-label="Open date picker"` or equivalent
- Title text does not need an ARIA label — it is read naturally as a heading
- Do not rely on icon alone to convey action — always include an accessible label

---

## Do / Don't

**Do:**
- Show at least a title or a back button — never an empty header
- Use the `Search` sub-component in the correct type (`Customer` or `driver`)
- Apply safe area insets to avoid status bar overlap
- Keep titles to one to three words
- Use the action button for a single confirming action only

**Don't:**
- Don't use Header on the Home screen — use `header-home` (ds-customer)
- Don't combine title mode and search mode simultaneously
- Don't show the action button and icon buttons at the same time
- Don't use more than 2 icon buttons on the right side
- Don't create custom header components for patterns already covered by these variants

---

## Mapping: apps to Header variants

| Screen | left | center | right |
|---|---|---|---|
| Driver: Earnings, Inbox, Safety Hub | close icon (no back) | title | 2 icon buttons |
| Driver: Account | close icon | title | share icon |
| Driver: Personal Information | back arrow | title | hidden |
| Driver: Auth (login, register) | close icon | none | hidden |
| User: Chat | back arrow | title | search + plus icons |
| User: Ride Details | back arrow | title | hidden |
| User: Plan | none | date selector | search + plus icons |
| User: Booking (with action) | back arrow | title | "Finish" button |
| User: New chat | back arrow | title + date description | icon buttons |

---

## Notes

- Figma file: `nGsiItayj12cfi3AKbP1mB` (Dojo_DS Core), node: `5009:2732`
- Sub-components: `btn-header` (node `5009:2787`), `Search` (node `5010:403`)
- Variant axis naming in Figma uses inconsistent casing — treat all as boolean toggles
- Token values for dark/light modes are TODO — pending extraction from Figma variables
