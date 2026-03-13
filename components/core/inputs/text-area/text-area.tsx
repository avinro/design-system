import React from "react";

// ─── Sub-component: textArea/field ───────────────────────────────────────────

export type TextAreaFieldState =
  | "Default"
  | "Focus"
  | "filled"
  | "Error"
  | "blocked"; // Figma prop name — "blocked" = disabled state

export type TextAreaFieldProps = {
  /** Interaction / validation state of the field. Defaults to "Default". */
  state?: TextAreaFieldState;
  /** Placeholder text shown when the field is empty. */
  placeholder?: string;
  /** Current value shown in filled/focus/error states. */
  value?: string;
};

// ─── Wrapper: TextArea ────────────────────────────────────────────────────────

export type TextAreaValidationType = "Default" | "error" | "success";

export type TextAreaProps = {
  /** Validation state. Controls border color and feedback text style. Defaults to "Default". */
  status?: TextAreaValidationType;
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
  descriptionShow?: boolean;
  /** Feedback message text. */
  feedbackText?: string;
  /** Placeholder text for the field. */
  placeholder?: string;
  /** Current value of the field. */
  value?: string;
  /** Callback fired when the field value changes. */
  onChange?: (value: string) => void;
};

/**
 * TextArea
 *
 * A multiline free-form text field. Composes three sub-components:
 * - input/label (InputLabel) — optional label, help icon, helper link, description (shared with TextInput)
 * - textArea/field — the multiline text area field
 * - input/feedback-text (InputFeedbackText) — optional validation/helper message (shared with TextInput)
 *
 * Sub-components can also be used independently.
 *
 * Figma (wrapper):   https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=2035-12927
 * Figma (field):     https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=2035-12768
 * Figma (label):     https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5082-730
 * Figma (feedback):  https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5082-753
 */
export function TextArea({
  status = "Default",
  labelShow = true,
  labelText = "Label",
  labelHelpShow = false,
  labelDescription = false,
  description = "",
  descriptionShow = true,
  feedbackText = "",
  placeholder = "Enter your instructions here...",
  value,
  onChange,
}: TextAreaProps) {
  // TODO: implement rendering
  return null;
}
