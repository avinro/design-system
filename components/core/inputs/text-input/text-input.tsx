import React from "react";

// ─── Sub-component: input/label ───────────────────────────────────────────────

export type InputLabelProps = {
  /** The field label text. */
  inputText?: string;
  /** Whether to show the help icon and helper link. Defaults to true. */
  labelHelpShow?: boolean;
  /** Text for the right-aligned helper link. */
  helperLinkText?: string;
  /** Whether to show the description line below the label. Defaults to true. */
  labelDescription?: boolean;
  /** Description text shown below the label. */
  description?: string;
};

// ─── Sub-component: input/field ───────────────────────────────────────────────

export type InputFieldType =
  | "Default"
  | "focus"
  | "typing"
  | "filled"
  | "error"
  | "succeded" // Figma prop name — one 'd'
  | "disable";

export type InputFieldProps = {
  /** Interaction / validation state of the field. Defaults to "Default". */
  type?: InputFieldType;
  /** Whether to show the optional left icon. Defaults to false. */
  leftIcon?: boolean;
  /** Icon element rendered on the left (24px). */
  leftIconElement?: React.ReactNode;
  /** Whether to show the optional right icon. Defaults to false. */
  rightIcon?: boolean;
  /** Icon element rendered on the right (24px). */
  rightIconElement?: React.ReactNode;
  /** Whether to show the optional inline action button. Defaults to false. */
  button?: boolean;
  /** Label text for the inline button. */
  buttonLabel?: string;
  /** Callback for the inline button press. */
  onButtonPress?: () => void;
  /** Placeholder text shown when the field is empty. */
  placeholder?: string;
  /** Current value shown in filled/typing/error/succeeded states. */
  value?: string;
};

// ─── Sub-component: input/feedback-text ──────────────────────────────────────

export type InputFeedbackTextType = "info" | "error" | "success";

export type InputFeedbackTextProps = {
  /** Feedback message type. Controls text color. Defaults to "info". */
  type?: InputFeedbackTextType;
  /** The feedback message to display. */
  text?: string;
};

// ─── Wrapper: TextInput ───────────────────────────────────────────────────────

export type TextInputValidationType = "default" | "error" | "succeded"; // "succeded" matches Figma prop

export type TextInputProps = {
  /** Validation state of the field. Controls border color and feedback text style. Defaults to "default". */
  type?: TextInputValidationType;
  /** Whether to show the label block. Defaults to true. */
  labelShow?: boolean;
  /** Label text. */
  labelText?: string;
  /** Whether to show the help icon and helper link in the label. */
  labelHelpShow?: boolean;
  /** Whether to show the description line in the label. */
  labelDescription?: boolean;
  /** Description text in the label. */
  description?: string;
  /** Whether to show the feedback text below the field. Defaults to true. */
  message?: boolean;
  /** Feedback message text. */
  feedbackText?: string;
  /** Whether to show a left icon inside the field. */
  leftIcon?: boolean;
  /** Icon element rendered on the left of the field (24px). */
  leftIconElement?: React.ReactNode;
  /** Whether to show a right icon inside the field. */
  rightIcon?: boolean;
  /** Icon element rendered on the right of the field (24px). */
  rightIconElement?: React.ReactNode;
  /** Whether to show the inline action button inside the field. */
  button?: boolean;
  /** Label text for the inline action button. */
  buttonLabel?: string;
  /** Callback for the inline button press. */
  onButtonPress?: () => void;
  /** Placeholder text for the field. */
  placeholder?: string;
  /** Current value of the field. */
  value?: string;
  /** Callback fired when the field value changes. */
  onChange?: (value: string) => void;
};

/**
 * TextInput
 *
 * A single-line free-form text field. Composes three sub-components:
 * - input/label (InputLabel) — optional label, help icon, helper link, description
 * - input/field (InputField) — the interactive text field
 * - input/feedback-text (InputFeedbackText) — optional validation/helper message
 *
 * Sub-components can also be used independently.
 *
 * Figma (wrapper):     https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5082-809
 * Figma (field):       https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5082-663
 * Figma (label):       https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5082-730
 * Figma (feedback):    https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5082-753
 */
export function TextInput({
  type = "default",
  labelShow = true,
  labelText = "Label",
  labelHelpShow = false,
  labelDescription = false,
  description = "",
  message = true,
  feedbackText = "",
  leftIcon = false,
  leftIconElement,
  rightIcon = false,
  rightIconElement,
  button = false,
  buttonLabel = "",
  onButtonPress,
  placeholder = "Enter your placeholder",
  value,
  onChange,
}: TextInputProps) {
  // TODO: implement rendering
  return null;
}
