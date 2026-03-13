# Chat Input — Component Rules

## What it is

A single-line text input for chat and messaging screens. Composed of a pill-shaped text field and a circular send button. The send button changes appearance when the user has typed text.

## When to use

- In-app chat screens where a user sends messages to another person (rider–driver, driver–rider).
- Any context that requires a lightweight, persistent message entry field at the bottom of a screen.

## When not to use

- Multi-line notes or comments — use Text Area instead.
- Search — use a dedicated search input.
- Structured form data entry — use Text Input.
- Contexts where sending is not the primary action.

## States

- **Default** — no text entered. Placeholder text visible. Send button uses a ghost/secondary style (light background, no visible border).
- **Typing** — user is actively typing. Send button fills with a dark background to indicate it is now actionable.

There is no explicit focus state defined in DS Core beyond the border color change on the input pill. TODO: Confirm keyboard focus ring requirements.

## Send button

The send button is a sub-component following the Button/only icon pattern (`components/core/actions/button-icon`). The icon is `Customer-Icon/up-top` at 20×20px.

- In the **Default** state the send button uses `--button/secondary` tokens (ghost appearance).
- In the **Typing** state the send button uses `--button/default` tokens (dark filled appearance).

Do not replace or remove the send button. It is a required part of the component.

## Input pill

- The pill is always pill-shaped (`--rounded-full` / 120px border-radius).
- The background is always `--chat-input/bg-default` regardless of state.
- The border changes: `--chat-input/border-default` (#cccdda light) in Default; `--chat-input/border-active` (#1d1d23 dark) in Typing.

## Typography

- Font: Manrope Medium 500, 14px.
- Both placeholder and typed text use the same font — only color differs.
- Text does not wrap. This is a single-line input.

## Placeholder text

- Placeholder should be contextual: e.g. "Message [name]..." to indicate who the user is messaging.
- Do not use generic placeholder text like "Type here" when a recipient name is available.

## Layout and sizing

- The wrapper has fixed vertical padding (pt 8px, pb 16px) and horizontal padding (px 16px).
- The input pill takes all remaining width (flex: 1). The send button is fixed at 44×44px.
- The overall wrapper height is 68px.
- Do not reduce padding or change the send button size.

## Token alignment note

DS Core wrapper uses `--surface/neutral/sunken`. The Driver App uses `--surface/neutral/bg-sunken` for the same visual value. Confirm token name to use before implementing.

## Accessibility

- TODO: Confirm ARIA role for the input field (`role="textbox"` or native `<input type="text">`).
- TODO: Confirm ARIA label for the send button — should describe the action, not just "button".
- TODO: Confirm keyboard send trigger (Enter key on web/desktop contexts).
- TODO: Confirm screen reader announcement when a message is sent.

## Do

- Use in chat screens where a user sends a message to a specific recipient.
- Show the recipient name in the placeholder when available.
- Keep the full wrapper padding — do not reduce pb-16 to gain vertical space.

## Don't

- Don't use for search inputs.
- Don't use for multi-line content — use Text Area.
- Don't hide or disable the send button when the input is empty; use the Default state styling instead.
- Don't change the border-radius of the input pill or send button.
