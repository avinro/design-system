import React from "react";

// Sub-component: Annotation / helper text row
export type AnnotationProps = {
  /** Whether to show the info icon. Defaults to true. */
  icon?: boolean;
  /** Helper text content. */
  text?: string;
};

// Sub-component: Select button (pill-shaped trigger)
export type SelectButtonProps = {
  /** Whether to show the optional left icon. Defaults to false. */
  leftIcon?: boolean;
  /** Icon element to render on the left side (16px). */
  leftIconElement?: React.ReactNode;
  /** Displayed value when a selection has been made. */
  value?: string;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
};

// Main component
export type DropdownInputProps = {
  /** Whether to show the label above the select button. Defaults to true. */
  label?: boolean;
  /** Label text. */
  labelText?: string;
  /** Whether to show the annotation row below the select button. Defaults to true. */
  annotation?: boolean;
  /** Annotation helper text. */
  annotationText?: string;
  /** Whether to show the optional left icon inside the select button. Defaults to false. */
  leftIcon?: boolean;
  /** Icon element to render inside the select button (16px). */
  leftIconElement?: React.ReactNode;
  /** Currently selected value. When provided, the select button renders in the preselected state. */
  value?: string;
  /** Placeholder text shown inside the select button when no value is selected. */
  placeholder?: string;
  /** Callback fired when the select button is tapped. Use to open the associated picker or overlay. */
  onPress?: () => void;
};

/**
 * DropdownInput
 *
 * A form field wrapper consisting of an optional label, a pill-shaped select
 * button (select_button), and optional annotation text.
 *
 * This component acts as a trigger only. It does not manage the picker or
 * overlay — the parent screen is responsible for handling `onPress` and
 * opening the appropriate selection UI.
 *
 * Sub-components: select_button, anotation
 * Figma: https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5131-1394
 */
export function DropdownInput({
  label = true,
  labelText = "Label placeholder",
  annotation = true,
  annotationText = "",
  leftIcon = false,
  leftIconElement,
  value,
  placeholder = "Select…",
  onPress,
}: DropdownInputProps) {
  // TODO: implement rendering
  return null;
}
