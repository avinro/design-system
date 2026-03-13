# Button Slider — Component Rules

This file defines the writing and usage rules for the Button Slider component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Button Slider is a slide-to-confirm interaction component. The user drags a dark pill-shaped thumb from left to right across a light track to trigger an action. It is used for high-stakes, intentional actions that must not be triggered accidentally — for example, going online as a driver in the Dojo Driver App.

---

## Variants

No structural variants. However, the thumb color can be changed to communicate the nature of the action.

### Default color (dark)

The standard appearance. Dark thumb (`--button/default/bg-default`, `#1d1d23`).

Use for: standard high-stakes confirmations with no danger connotation.

Examples: "Slide to go online", "Confirm ride".

### Danger color (red)

A red thumb used for emergency or destructive actions where the risk must be visually reinforced.

Use for: actions with serious real-world consequences — emergency calls, irreversible operations, or situations where the user must be clearly warned before confirming.

Examples: "Swipe to call 112" in the 112 emergency assistance flow.

Rules:
- Only use the danger color when the action is genuinely emergency-level or destructive. Do not use it for standard confirmation flows.
- The track background and label styling remain unchanged. Only the thumb fill color changes.
- TODO: Confirm the exact design token for the danger/red thumb color.

---

## Sizes

Single size only. No size variants.

| Property | Value |
|---|---|
| Track width | 366px |
| Track height | 64px |
| Thumb (default) | 80×56px |
| Thumb (filled) | 358×56px |
| Track padding | 4px |
| Arrow icon | 24×24px |

---

## States

Only two visual states are defined in Figma.

| State | Description |
|---|---|
| `default` | Initial state. Thumb is at the left of the track. Action has not been triggered. |
| `filled` | Completed state. Thumb has expanded to fill the full track. Action has been confirmed. |

Rules:
- The `default` state represents the initial resting position — thumb at the start.
- The `filled` state represents a completed confirmation — it is not interactive after reaching this state.
- No disabled, hover, pressed, or focus states are defined in Figma. See TODOs.
- TODO: Confirm whether a processing/loading state follows the `filled` state.
- TODO: Confirm disabled state appearance and tokens.

---

## Anatomy

Confirmed from Figma layer inspection.

| Part | Required | Description |
|---|---|---|
| Track | Yes | Full-width pill container (366×64px). Subtle transparent background. Acts as the slide rail. |
| Thumb | Yes | Dark pill-shaped handle the user slides. Starts at 80px width; expands to 358px at completion. |
| Icon | Yes | Right-arrow icon (24×24px) inside the thumb. Always positioned at the thumb's trailing edge. |
| Label | Yes | Text centered over the track. Always visible. Uses `mix-blend-difference` for readability at all thumb positions. |

Rules:
- All four parts are required. None can be omitted.
- The label must be short enough to fit on one line — `whitespace-nowrap` is applied. Avoid labels longer than ~20 characters.
- The label uses `mix-blend-difference` blend mode — do not apply a solid color background behind it.
- The arrow icon communicates directionality. Always point right. Do not swap for a different icon.

---

## Typography

The label uses the **headings font family**, not the body font. This is distinct from all other button components.

| Property | Token | Value |
|---|---|---|
| Font family | `--font-family/headings` | Google Sans Flex |
| Font weight | `--weight/semibold` | 600 |
| Font size | `--size/lg` | 16px |
| Line height | — | 1.2 |
| Letter spacing | `--letter-spacing/tight` | -0.4px |

---

## Usage guidelines

- Use Button Slider **only for high-stakes actions** that must not be triggered accidentally. The slide gesture adds intentional friction.
- Use only **one Button Slider per screen**. It represents the primary, defining action of that context.
- Do not use Button Slider for reversible actions. Reserve it for confirmations with significant consequences (e.g., going online, starting a trip, accepting a high-value action).
- Write labels that clearly describe what will happen when the action is confirmed: "Slide to go online", "Confirm ride". Avoid vague labels.
- Keep labels short. `whitespace-nowrap` is applied — labels that overflow will be clipped.
- The component is full-width (366px). It is designed to span the usable width of a mobile screen with standard horizontal margins.
- Do not stack multiple Button Sliders or combine them with other primary action buttons on the same screen.

**Color usage:**
- Use the **default dark color** for standard high-stakes confirmations (e.g., going online, confirming a ride).
- Use the **danger red color** only for emergency or destructive actions where the severity must be visually communicated (e.g., calling emergency services, triggering a safety alert).
- Do not use the danger color for standard confirmation flows — it must retain its meaning as a signal of real risk.

---

## Interaction

Confirmed from Figma visual states. Animation and threshold behavior are not specified in Figma.

- The user drags the dark thumb from left to right.
- When the thumb reaches the end of the track, the `filled` state is triggered.
- TODO: Confirm the drag threshold percentage at which the action is triggered (e.g., 90% of the track).
- TODO: Confirm snap-back behavior when the user releases before the threshold.
- TODO: Confirm transition/animation spec for the thumb expanding from 80px to 358px.
- TODO: Confirm whether the `filled` state can be reset (e.g., for a toggle-style use case).

---

## Accessibility

- The label is the accessible name of the component. Ensure it clearly describes the action.
- `mix-blend-difference` is applied to the label for visual readability — screen readers receive the text directly.
- TODO: Confirm keyboard accessibility approach. The drag gesture has no native keyboard equivalent. Consider: Enter or Space as an alternative activation method.
- TODO: Confirm whether `role="slider"` or `role="button"` is more appropriate for the final implementation.
- TODO: Confirm disabled state behavior and ARIA attributes.
- TODO: Confirm focus ring treatment.

---

## Do / Don't

**Do:**
- Use for a single, high-stakes confirmation per screen.
- Write a short, action-specific label (e.g., "Slide to go online", "Swipe to call 112").
- Use as the sole primary action on the screen.
- Use the danger (red) color when the action involves a genuine emergency or irreversible risk.

**Don't:**
- Don't use for reversible or low-stakes actions.
- Don't use more than one Button Slider per screen.
- Don't write long labels — `whitespace-nowrap` is applied.
- Don't use alongside other primary action buttons at the same hierarchy level.
- Don't change the direction of the arrow icon.
- Don't use the danger color for standard flows — reserve it for truly emergency or destructive actions.

---

## Notes

- Extracted from Figma file `nGsiItayj12cfi3AKbP1mB`, node `5227:800`, frame "Button/Slider".
- Usage confirmed in Dojo Driver App: bottom of the map screen when the driver is online (node `2040:703`); and in the 112 emergency assistance flow with the danger red color (nodes `2530:3551` and `2530:3915`).
- Only two visual states are defined in Figma (`default`, `filled`). All interaction and animation specs are TODO.
- The label uses `--font-family/headings` (Google Sans Flex), not `--font-family/body` (Manrope). This is the only button component in this system that uses the headings font.
- The `mix-blend-difference` blend mode on the label is intentional and load-bearing — it must be preserved in all implementations.
