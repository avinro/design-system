import React from "react";

export type CheckboxVariant = "checkbox-basic" | "check+description" | "check-boxed";

/** Indicator state. "intermediate" is the indeterminate state — use only on "select all" controls. */
export type CheckboxChecked = "on" | "off" | "intermediate";

export type CheckboxProps = {
  /** Visual layout variant */
  variant?: CheckboxVariant;
  /** Selection state of the checkbox indicator */
  checked?: CheckboxChecked;
  /** Primary option label */
  label?: string;
  /** Secondary description text — shown in check+description and check-boxed variants only */
  description?: string;
  /** Called when the user toggles this checkbox */
  onChange?: (checked: boolean) => void;
  /** Accessible name for the checkbox input */
  name?: string;
  /** Value submitted with the form */
  value?: string;
};

/**
 * Checkbox — multi-selection input control.
 *
 * Composed of two base sub-components:
 * - `_base-checkbox`: the square selection indicator (on / off / intermediate)
 * - `_base-label-checkbox`: the label and optional description text area (shared with Radio Select)
 *
 * Variants:
 * - `checkbox-basic`: indicator (left) + label only
 * - `check+description`: indicator (left) + label + description
 * - `check-boxed`: label + description (left) + indicator (right), in a bordered card container
 */
export function Checkbox({
  variant = "checkbox-basic",
  checked = "off",
  label = "Option name",
  description = "Description text below label text",
  onChange,
  name,
  value,
}: CheckboxProps) {
  const isOn = checked === "on";
  const isIntermediate = checked === "intermediate";
  const isActive = isOn || isIntermediate;

  const showDescription =
    variant === "check+description" || variant === "check-boxed";
  const isBoxed = variant === "check-boxed";

  // In check-boxed the indicator is on the right; in the other variants it is on the left.
  const indicatorOnRight = isBoxed;

  function handleChange() {
    onChange?.(checked !== "on");
  }

  const indicator = (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Inner square */}
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "5px",
          border: isActive
            ? "none"
            : `1.5px solid var(--layout\\/border, #e1e5ea)`,
          backgroundColor: isActive
            ? "var(--selector\\/bg-active, #ff6b26)"
            : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Checkmark */}
        {isOn && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 4.5L5 8.5L13 1"
              stroke="var(--selector\\/fg-enable, #ffffff)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {/* Intermediate dash */}
        {isIntermediate && (
          <span
            style={{
              display: "block",
              width: "12px",
              height: "2px",
              borderRadius: "1px",
              backgroundColor: "var(--selector\\/fg-enable, #ffffff)",
            }}
          />
        )}
      </span>
    </span>
  );

  const labelArea = (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        gap: showDescription ? "var(--numbers\\/4, 4px)" : undefined,
        paddingTop: "var(--numbers\\/2, 2px)",
        paddingBottom: "var(--numbers\\/2, 2px)",
        flex: 1,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-family\\/body, 'Manrope', sans-serif)",
          fontWeight: "var(--weight\\/semibold, 600)",
          fontSize: "var(--size\\/base, 14px)",
          lineHeight: 1.2,
          letterSpacing: "var(--letter-spacing\\/normal, 0px)",
          color: "var(--text\\/primary, #1d1d23)",
        }}
      >
        {label}
      </span>

      {showDescription && (
        <span
          style={{
            fontFamily: "var(--font-family\\/body, 'Manrope', sans-serif)",
            fontWeight: "var(--weight\\/regular, 400)",
            fontSize: "var(--size\\/base, 14px)",
            lineHeight: 1.2,
            color: "var(--text\\/placeholder, #636377)",
          }}
        >
          {description}
        </span>
      )}
    </span>
  );

  // Determine native checked value — "mixed" maps to indeterminate
  const nativeChecked = isOn ? true : false;

  return (
    <label
      style={{
        display: "flex",
        alignItems: showDescription && !isBoxed ? "flex-start" : "center",
        gap: isBoxed ? "var(--numbers\\/8, 8px)" : "8px",
        padding: isBoxed ? "var(--numbers\\/12, 12px)" : undefined,
        borderRadius: isBoxed ? "8px" : undefined,
        border: isBoxed
          ? `1px solid ${
              isActive
                ? "var(--main-colors\\/primary, #e65912)"
                : "var(--layout\\/border, #e1e5ea)"
            }`
          : undefined,
        backgroundColor:
          isBoxed && isActive
            ? "var(--surface\\/neutral\\/sunken, #ffffff)"
            : undefined,
        boxShadow: isBoxed
          ? "0px 2px 4px 0px rgba(137, 137, 137, 0.12)"
          : undefined,
        cursor: "pointer",
      }}
    >
      {/* Native checkbox input — hidden, drives accessible state */}
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={nativeChecked}
        ref={(el) => {
          if (el) el.indeterminate = isIntermediate;
        }}
        onChange={handleChange}
        aria-checked={isIntermediate ? "mixed" : nativeChecked}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />

      {/* indicator on left for checkbox-basic and check+description */}
      {!indicatorOnRight && indicator}

      {/* label area */}
      {labelArea}

      {/* indicator on right for check-boxed */}
      {indicatorOnRight && indicator}
    </label>
  );
}
