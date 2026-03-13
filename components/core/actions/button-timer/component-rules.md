# Button Timer — Component Rules

This file defines the writing and usage rules for the Button Timer component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Button Timer is a pill-shaped dark button that visualizes a countdown through a progressive fill overlay. A dark fill layer grows from left to right over the button surface as time expires, communicating urgency to the user. The component is used in the Dojo Driver App to prompt the driver to accept a new trip offer or add a map Report within a limited time window.

---

## Variants

No structural variants. Single visual style.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Width | 303px |
| Height | 56px |
| Border radius | 120px (full pill) |

---

## States

Three visual states are defined in Figma, representing snapshots of the countdown fill animation.

| State | Fill overlay width | Description |
|---|---|---|
| `full` | 0px | Timer just started. No fill overlay. Full time remaining. |
| `middle` | ~147px (~48.5%) | Timer halfway through. Left half of button is darkened by overlay. |
| `state3` | 303px (full) | Timer nearly expired. Entire button is darkened by the overlay. |

Rules:
- The `full` state is the initial state — no fill overlay is visible.
- The `middle` and `state3` states are intermediate and final snapshots of a continuous animation.
- The actual animation between states is not specified in Figma. See TODOs.
- No hover, pressed, disabled, or focus states are defined in Figma.
- TODO: Confirm animation spec: duration, easing, frame rate for the fill overlay transition.
- TODO: Confirm whether the component can be reset (e.g., if a new trip is offered again).
- TODO: Confirm disabled state appearance if the countdown expires without user action.

---

## Anatomy

Confirmed from Figma layer inspection.

| Part | Required | Description |
|---|---|---|
| Container | Yes | Dark pill-shaped button (303×56px). Background: `--button/default/bg-default` (`#1d1d23`). |
| Fill overlay | Yes | Absolutely positioned dark layer on top of the container. Grows from left to right. Uses `mix-blend-multiply`. Width represents elapsed time. |
| Label | Yes | Text centered over the button. "Accept" in the Driver App context. Uses `mix-blend-difference` for readability over both the unfilled and filled areas at all animation positions. |

Rules:
- All three parts are required. The fill overlay is integral to the countdown visualization — do not omit it.
- The label must remain centered and readable at all fill levels. `mix-blend-difference` achieves this automatically.
- Do not replace the fill overlay with a border, progress bar, or other treatment. The full-surface fill is the confirmed visual mechanic.

---

## Fill overlay mechanics

The countdown is communicated through a dark fill overlay that grows from left to right.

- The overlay uses `mix-blend-multiply`. Applied over the dark button background, this progressively darkens the button as the overlay expands.
- At `full` state (timer start): overlay width = 0px — the button appears at its normal dark background color.
- At `state3` (timer end): overlay width = 303px — the full button surface is darkened by the overlay.
- The effect is a visual urgency cue: as the overlay fills the button, the driver understands that time is running out.

Rules:
- The fill overlay must use `mix-blend-multiply`, not `mix-blend-difference`.
- The label must use `mix-blend-difference` so it remains readable throughout the animation.
- The fill direction is always left to right. Do not reverse.
- TODO: Confirm the exact overlay background color/token used for the fill layer.

---

## Typography

The label uses the **headings font family** and **Regular** weight (not SemiBold). This differs from other button components.

| Property | Token | Value |
|---|---|---|
| Font family | `--font-family/headings` | Google Sans Flex |
| Font weight | — | 400 (Regular) |
| Font size | `--size/lg` | 16px |
| Line height | — | 1 (leading-none) |
| Letter spacing | — | 0 (default) |

Note: The font weight is Regular, confirmed from Figma. This is different from Button Slider, which uses SemiBold.

---

## Usage guidelines

- Use Button Timer **only** for timed action prompts where the user must act within a limited window.
- The component communicates urgency through the fill animation — do not use it for actions without a real countdown.
- Use a single Button Timer per screen. It represents the primary timed action of that context.
- Write a short, clear label that names the action: "Accept", "Confirm", "Start". Avoid vague labels.
- The component is fixed-width (303px). It is narrower than the full screen width — do not stretch it to fill.
- The countdown is communicated visually. Ensure the associated timer logic controls the fill overlay width in real time.
- TODO: Confirm whether additional urgency signals (haptics, sound, color change) are expected alongside the visual fill.

---

## Interaction

The Button Timer is a prompt component, not a repeating interactive control.

- The user taps the button to accept the trip offer before the timer expires.
- The fill overlay grows continuously as the countdown progresses — this is driven by a timer, not user interaction.
- TODO: Confirm what happens when the timer reaches `state3` and the user has not acted: dismiss, auto-decline, or hold.
- TODO: Confirm whether the button is tappable at all fill levels, including when fully darkened.
- TODO: Confirm animation easing and frame rate for the fill overlay transition.

---

## Accessibility

- The label is the accessible name of the component ("Accept" in the Driver App).
- `mix-blend-difference` on the label is visual only — screen readers receive the text directly.
- The countdown state is not communicated through ARIA in the current Figma spec. See TODOs.
- TODO: Confirm whether a live region or `aria-valuenow` should communicate countdown progress to screen readers.
- TODO: Confirm whether `role="button"` or `role="timer"` is more appropriate.
- TODO: Confirm keyboard interaction — tap on mobile has a natural keyboard equivalent (Enter or Space on desktop).
- TODO: Confirm focus ring treatment.

---

## Do / Don't

**Do:**
- Use for a single, timed acceptance prompt per screen.
- Write a short, action-specific label ("Accept", "Confirm").
- Drive the fill overlay width from a real countdown timer.
- Preserve `mix-blend-multiply` on the fill overlay and `mix-blend-difference` on the label.

**Don't:**
- Don't use without an actual countdown. The fill animation must correspond to real elapsed time.
- Don't use more than one Button Timer per screen.
- Don't reverse the fill direction.
- Don't replace the fill overlay with a separate progress bar or ring indicator.
- Don't use for actions without a time limit.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5223:3789`, frame "Button/Timer".
- Three visual states in Figma: `full` (node `5223:3788`), `middle` (node `5223:3793`), `state3` (node `5223:3801`).
- Usage confirmed in Dojo Driver App: "Finding a trip → New trip flow" (node `2007:8976`). Shown when a new trip is offered to the driver, with a countdown to accept.
- The label font weight is **Regular** (400), confirmed from Figma. Unlike Button Slider, which uses SemiBold.
- The fill overlay uses `mix-blend-multiply`. The label uses `mix-blend-difference`. Both are intentional and load-bearing — do not change.
- No type variants, no size variants, no interactive states (hover, pressed, disabled, focus) are defined in Figma.
- TODO: Confirm the design token for the fill overlay background color.
- TODO: Confirm animation/transition spec for the fill overlay growth.
