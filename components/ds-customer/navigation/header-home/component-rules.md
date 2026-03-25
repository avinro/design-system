# Header Home — Component Rules

This file defines the writing and usage rules for the Header Home component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Header Home is the top navigation component exclusive to the Home screen of the customer app. It reflects the user's current plan state in real time, showing one of four states: no active plan (Add event), an event with pickup time, an event with reservation time, or an active ride in progress.

The component provides navigation to three destinations: the chat button (left) opens the Chats page, the central pill is tappable and navigates to the relevant plan or ride detail, and the avatar (right) opens the Account page.

---

## Usage context

- **Only use on the Home screen.** Do not reuse this component on other screens.
- It always appears at the top of the Home screen, below the system status bar.

---

## States

One prop: `State`. Four values: `Add event` (default), `Pick up`, `Reservation`, `Ride`.

### `Add event`
Empty / no active plan. The pill shows "No plans for today" with a directional arrow CTA.
- Icon: calendar
- Pill background: translucent (`app-header/event-pill/bg`)

### `Pick up`
An active event is booked with a pickup time. The pill shows the event name and "Pick up at [time]".
- Icon: calendar
- Pill background: translucent (`app-header/event-pill/bg`)

### `Reservation`
An active event is booked with a table reservation. The pill shows the event name and "Reserve at [time]".
- Icon: calendar
- Pill background: translucent (`app-header/event-pill/bg`)

### `Ride`
A ride is in progress. The pill shows "On the way" and the destination address.
- Icon: car
- Pill background: solid blue (`app-header/ride-pill/bg` → `utility.blue.600`)

Rules:
- Only one state is shown at a time. State is determined by real-time data.
- The Ride state always uses the blue pill background. No other state uses it.
- The icon changes between calendar (event states) and car (Ride state). Do not mix icons.

---

## Anatomy

| Part | Required | Notes |
|---|---|---|
| Chat button | Yes | Left side. Secondary icon-only button, 44px. Navigates to the Chats page. |
| Event pill | Yes | Center. Shows current plan state. Height 44px, full pill border radius. Tappable — navigates to the relevant plan or ride detail. |
| Avatar | Yes | Right side. Circular, size MD (40px). Shows the user's profile photo. Tapping navigates to the Account page. |

Rules:
- All three parts must always be visible.
- Do not reorder parts.
- The pill width is flexible (fills remaining space between chat button and avatar).

---

## Content guidelines

- **Add event state pill title:** "No plans for today" (fixed)
- **Add event state pill subtitle:** "Add a event →" (fixed — do not modify the label or arrow)
- **Pick up/Reservation pill title:** venue or event name (dynamic, from data)
- **Pick up pill subtitle:** "Pick up at [time]" (dynamic time)
- **Reservation pill subtitle:** "Reserve at [time]" (dynamic time)
- **Ride pill title:** "On the way" (fixed)
- **Ride pill subtitle:** destination address (dynamic, from data)

---

## Accessibility

- The chat button must have an accessible label: `aria-label="Open chats"`.
- The event pill, when tappable, must have an accessible label describing the current state (e.g. `aria-label="Dinner at Amante – Pick up at 5pm"`).
- The avatar tap target must have `aria-label="Go to account"`. The avatar image must have `alt` text with the user's name or "Profile photo".
- Do not rely on icon color alone to convey state — always pair with text.

---

## Do / Don't

**Do:**
- Show only one state at a time based on real-time data.
- Use the blue pill background exclusively for the Ride state.
- Keep pill text concise — title + subtitle only.

**Don't:**
- Don't reuse Header Home outside the Home screen.
- Don't change the fixed label text ("No plans for today", "On the way").
- Don't add additional sub-components or rearrange parts.
- Don't show the blue pill background for non-Ride states.

---

## Notes

- Component renamed from "App Header" to "Header Home" to clarify its exclusive use on the Home screen.
- Figma file: `iYqpx8x8Kxdixf8YSRkiCz`, node: `102:274`.
- Four state nodes: Add event (`102:273`), Pick up (`102:272`), Reservation (`102:271`), Ride (`161:2521`).
- Light mode token values are TODO — all extracted values are dark mode.
