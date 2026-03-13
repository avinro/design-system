// Chat Input — reference component skeleton
// All token values and dimensions confirmed from Figma get_design_context.
//
// Two states:
//   Default (7295:67) — empty input, placeholder visible, send button ghost style
//   Typing  (7295:80) — text + cursor visible, send button filled dark style
//
// Anatomy:
//   - Wrapper: surface bg, px 16px, pt 8px, pb 16px, gap 8px, h 68px
//   - Input pill: flex 1, h 44px, border-radius 120px, px 16px, py 4px
//       Default border: #cccdda (--chat-input/border-default)
//       Typing  border: #1d1d23 (--chat-input/border-active)
//   - Send button: 44×44px circle, icon Customer-Icon/up-top 20×20px
//       Default: ghost (bg rgba(29,29,35,0.05), transparent border)
//       Typing:  filled (bg #1d1d23, border rgba(29,29,35,0.12))
//
// Sub-component: send button uses Button/only icon pattern.
// TODO: Confirm ARIA role for input (textbox) and send button label.
// TODO: Confirm send trigger (button tap only, or also Enter key).
// TODO: Confirm whether input clears after send.
// TODO: Confirm disabled/error state specs.

type ChatInputProps = {
  /** Current text value. */
  value: string;
  /** Called on every keystroke. */
  onChange: (value: string) => void;
  /** Called when the send button is pressed (or Enter, once confirmed). */
  onSend: () => void;
  /** Placeholder text. Recommend "Message [Name]..." */
  placeholder?: string;
  className?: string;
};

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = "Message...",
  className,
}: ChatInputProps) {
  const isTyping = value.length > 0;

  return (
    <div
      className={className}
      data-name="Chat Input"
      data-node-id="7295:66"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        paddingTop: "8px",
        paddingBottom: "16px",
        paddingLeft: "16px",
        paddingRight: "16px",
        backgroundColor: "var(--surface/neutral/sunken, white)",
      }}
    >
      {/* Input pill */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-name="chat imput"
        data-node-id={isTyping ? "7295:82" : "7295:69"}
        style={{
          flex: 1,
          height: "44px",
          borderRadius: "120px",
          border: `1px solid ${isTyping
            ? "var(--chat-input/border-active, #1d1d23)"
            : "var(--chat-input/border-default, #cccdda)"
          }`,
          backgroundColor: "var(--chat-input/bg-default, rgba(29,29,35,0.05))",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "4px",
          paddingBottom: "4px",
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          color: isTyping
            ? "var(--chat-input/text-input, #1d1d23)"
            : "var(--chat-input/text-placeholder, #636377)",
          whiteSpace: "nowrap",
          outline: "none",
          minWidth: 0,
        }}
      />

      {/* Send button */}
      <button
        aria-label="Send message"
        onClick={onSend}
        data-name="action button"
        data-node-id={isTyping ? "7295:85" : "7295:72"}
        style={{
          flexShrink: 0,
          width: "44px",
          height: "44px",
          borderRadius: "120px",
          border: `1px solid ${isTyping
            ? "var(--button/default/border-active, rgba(29,29,35,0.12))"
            : "var(--button/secondary/border-active, rgba(29,29,35,0))"
          }`,
          backgroundColor: isTyping
            ? "var(--button/default/bg-default, #1d1d23)"
            : "var(--button/secondary/bg-default, rgba(29,29,35,0.05))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {/* TODO: Replace with icon component: Customer-Icon/up-top (20×20px) */}
        <div
          data-name="Customer-Icon/up-top"
          data-node-id="I7295:72;5007:1766"
          style={{ width: 20, height: 20 }}
        />
      </button>
    </div>
  );
}
