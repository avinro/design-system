# Switch Toggle — Component Rules

This file defines the writing and usage rules for the Switch Toggle component.
It is used as a source of truth when generating or updating `index.mdx`.

---

## Overview

Switch Toggle is a binary on/off control used to enable or disable settings that take immediate effect. The switch indicator is always right-aligned. An optional product icon can appear on the far left. Built from two base sub-components: `_base-switch` (the toggle pill) and `_base-label-checkbox` (the text area, shared with Radio Select and Checkbox).

---

## Variants

- **switch-basic** — Icon (optional) + label only + switch right. Compact single-line row.
- **switch-description** — Icon (optional) + label + description + switch right. No border container.
- **switch-boxed** — Icon (optional) + label + description + switch right, in a bordered card container. Border changes to `--text/placeholder` color when disabled.

---

## Sizes

- Single size only. No size variants confirmed.
- Switch track: `44×22px` (rendered), container: `44×24px`
- Switch dot: `~18×18px`
- Icon: `24×24px`
- Font size: `14px` (`--size/base`)

---

## States

- **Default** — interactive. Label uses `--text/primary`. Track uses `--selector/bg-enable` (off) or `--selector/bg-active` (on).
- **Disabled** — non-interactive. Label and description use `--text/placeholder`. Track uses `--selector/bg-disabled` regardless of checked value. Boxed border uses `--text/placeholder`.

Checked values:
- **Off** — dot at left of track.
- **On** — dot at right of track.

TODO: Confirm hover and focus states.

---

## Anatomy

1. **Icon** (`Icon-wrapper`) — 24×24px product icon at the far left. Optional. Omit or include consistently within a group.
2. **Label text** — SemiBold, `--text/primary` (default) / `--text/placeholder` (disabled). Always present.
3. **Description text** — Regular, `--text/placeholder`. Present in `switch-description` and `switch-boxed` only.
4. **Switch indicator** (`_base-switch`) — 44×24px toggle pill, always right-aligned. White dot slides between left (off) and right (on).
5. **Card container** — Bordered box with rounded corners and `12px` padding. Present in `switch-boxed` only. Border uses `--layout/border` (default) or `--text/placeholder` (disabled).

---

## Usage guidelines

- Use for settings that apply immediately — no save action required.
- Do not use when the choice needs confirmation before applying — use Checkbox + Button instead.
- Use `switch-basic` when the label alone is self-explanatory.
- Use `switch-description` when one line of context reduces ambiguity.
- Use `switch-boxed` when visual separation from surrounding content is needed.
- Include an icon when the list uses icons consistently; omit consistently when it does not.
- Use the disabled state when a setting is temporarily unavailable; always pair with an explanation if the reason is non-obvious.
- Keep labels short: one to four words. Put extra context in the description.

---

## Accessibility

- Implement as `<button role="switch">` with `aria-checked="true|false"`.
- Associate the label via `aria-labelledby` or a wrapping `<label>`.
- Disabled: set `aria-disabled="true"` and block pointer/keyboard events.
- Must be focusable and togglable via `Space` or `Enter`.
- Focus ring must be visible.
- Do not rely on track color alone for state — dot position must also change.

TODO: Confirm exact ARIA pattern and focus ring styling from implementation.

---

## Do / Don't

**Do:**
- Use for immediately-applied settings (dark mode, notifications, feature flags).
- Keep the label to one to four words; use description for clarification.
- Include an icon only when the surrounding list uses icons consistently.

**Don't:**
- Replace a Checkbox with Switch Toggle in forms that require submission.
- Write more than one line of description text.
- Disable without explaining why.
- Mix boxed and unboxed Switch Toggles in the same list.

---

## Content guidelines

- **Labels**: short noun phrases identifying the setting. Avoid starting with verbs ("Enable X" → "X").
- **Description**: one concise sentence that clarifies the impact or scope of the setting.
- Use sentence-style capitalisation for both labels and descriptions.

---

## Notes

- The `_base-switch` sub-component exposes both `checked` and `disabled` props independently.
- The `_base-label-checkbox` sub-component is shared with the Radio Select and Checkbox components.
- In the disabled state, label text and description text both fall back to `--text/placeholder`, producing a visually uniform dimmed appearance.
- The switch indicator is always right-aligned across all variants — this is the defining layout rule of this component vs. Radio Select and Checkbox.
- Confirmed real-world use cases: Security Ride Code, Dark Mode, Notifications (Customer App settings screen).

TODO: Confirm whether a hover state exists for the switch track or the overall row.
