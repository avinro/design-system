import React from "react";

export type SelectBooleanOption = {
  /** The option label text displayed inside the button. Keep to 1–2 words. */
  label: string;
  /** The value associated with this option. */
  value: string;
};

export type SelectBooleanProps = {
  /** The question label displayed above the option buttons. Write as a full question. */
  question: string;
  /** The two options to display. Must contain exactly two items. */
  options: [SelectBooleanOption, SelectBooleanOption];
  /** The value of the currently selected option. One option must always be selected. */
  selectedValue: string;
  /** Callback fired when the user selects an option. */
  onChange?: (value: string) => void;
};

/**
 * SelectBoolean
 *
 * A binary choice input presenting a question label and two mutually exclusive
 * pill-shaped option buttons. One option is always selected.
 *
 * Selected option uses Default button style (filled dark background).
 * Unselected option uses Secondary button style (transparent background).
 *
 * Base components: uses Button Default and Button Secondary token sets.
 * Figma: https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5131-1394
 */
export function SelectBoolean({
  question,
  options,
  selectedValue,
  onChange,
}: SelectBooleanProps) {
  // TODO: implement rendering
  return null;
}
