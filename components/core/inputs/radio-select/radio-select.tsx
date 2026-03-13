import React from "react";

export type RadioSelectVariant = "radio-basic" | "radio+description" | "radio-boxed";

export type RadioSelectProps = {
  /** Visual layout variant */
  variant?: RadioSelectVariant;
  /** Whether this option is currently selected */
  checked?: boolean;
  /** Primary option label */
  label?: string;
  /** Secondary description text — shown in radio+description and radio-boxed variants only */
  description?: string;
  /** Called when the user selects this option */
  onChange?: () => void;
  /** Shared name for the radio group */
  name?: string;
  /** Value submitted with the form */
  value?: string;
};

/**
 * RadioSelect — single-selection input control.
 *
 * Composed of two base sub-components:
 * - `_base-radio`: the circular selection indicator
 * - `_base-label-checkbox`: the label and optional description text area
 *
 * Variants:
 * - `radio-basic`: radio + label only
 * - `radio+description`: radio + label + description (no border)
 * - `radio-boxed`: radio + label + description enclosed in a bordered card container
 */
export function RadioSelect({
  variant = "radio-basic",
  checked = false,
  label = "Option name",
  description = "Description text below label text",
  onChange,
  name,
  value,
}: RadioSelectProps) {
  const showDescription =
    variant === "radio+description" || variant === "radio-boxed";
  const isBoxed = variant === "radio-boxed";

  return (
    <label
      style={{
        display: "flex",
        alignItems: showDescription ? "flex-start" : "center",
        gap: isBoxed
          ? "var(--numbers\\/gap-md-12, 12px)"
          : "8px",
        padding: isBoxed ? "12px" : undefined,
        borderRadius: isBoxed ? "8px" : undefined,
        border: isBoxed
          ? `1px solid ${
              checked
                ? "var(--main-colors\\/primary, #e65912)"
                : "var(--layout\\/border, #e1e5ea)"
            }`
          : undefined,
        backgroundColor:
          isBoxed && checked
            ? "var(--surface\\/neutral\\/sunken, #ffffff)"
            : undefined,
        boxShadow: isBoxed
          ? "0px 2px 4px 0px rgba(137, 137, 137, 0.12)"
          : undefined,
        cursor: "pointer",
      }}
    >
      {/* Native radio input — hidden, drives accessible state */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />

      {/* _base-radio: circular indicator */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: `2px solid ${
            checked
              ? "var(--main-colors\\/primary, #e65912)"
              : "var(--layout\\/border, #e1e5ea)"
          }`,
          backgroundColor: checked
            ? "var(--main-colors\\/primary, #e65912)"
            : "transparent",
          flexShrink: 0,
        }}
      >
        {checked && (
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
            }}
          />
        )}
      </span>

      {/* _base-label-checkbox: label and optional description */}
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
            fontFamily:
              "var(--font-family\\/body, 'Manrope', sans-serif)",
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
              fontFamily:
                "var(--font-family\\/body, 'Manrope', sans-serif)",
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
    </label>
  );
}
