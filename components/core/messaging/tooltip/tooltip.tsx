// Tooltip — reference component skeleton
// All token values and dimensions confirmed from Figma get_design_context.
//
// Two structural sub-types:
//   Arrow variants (right, left, top, bottom):
//     - Single message text (Medium 500, line-height 1.4)
//     - Close icon (Customer-Icon/x-close-delete, 24×24px)
//     - Directional arrow polygon (24×12px, rotated per direction)
//
//   no_arrow:
//     - Bold title (Bold 700, line-height 1.2)
//     - Regular body text (Regular 400, line-height 1.2)
//     - No close icon, no arrow
//
// Sub-components: close icon uses Button/only icon pattern.
// TODO: Replace arrow polygon placeholder with the confirmed SVG/image asset.
// TODO: Implement positioning logic (recommend Floating UI or Popper.js).
// TODO: Confirm auto-dismiss timeout from product implementation.

type TooltipArrowPosition = "right" | "left" | "top" | "bottom" | "no_arrow";

type TooltipArrowProps = {
  arrowPosition: Exclude<TooltipArrowPosition, "no_arrow">;
  /** Single message string. Max 1–2 lines. */
  message: string;
  /** Called when the close icon is pressed. */
  onDismiss: () => void;
  className?: string;
};

type TooltipNoArrowProps = {
  arrowPosition: "no_arrow";
  /** Bold title line. */
  title: string;
  /** Body text below the title. */
  body: string;
  className?: string;
};

type TooltipProps = TooltipArrowProps | TooltipNoArrowProps;

// Arrow rotation per direction (applied to the polygon asset)
const ARROW_ROTATION: Record<Exclude<TooltipArrowPosition, "no_arrow">, string> = {
  right:  "rotate(90deg)",
  bottom: "rotate(180deg)",
  left:   "rotate(270deg)",
  top:    "rotate(0deg)",
};

// Figma node IDs for reference
const NODE_IDS: Record<TooltipArrowPosition, string> = {
  right:    "5110:664",
  left:     "5276:121",
  bottom:   "5276:109",
  top:      "5276:127",
  no_arrow: "5307:699",
};

export function Tooltip(props: TooltipProps) {
  const { arrowPosition, className } = props;
  const nodeId = NODE_IDS[arrowPosition];

  // no_arrow variant — two-level text, no close icon, no arrow
  if (arrowPosition === "no_arrow") {
    const { title, body } = props as TooltipNoArrowProps;
    return (
      <div
        role="tooltip"
        className={className}
        data-name="tooltip"
        data-node-id={nodeId}
      >
        {/* Container */}
        <div data-name="tooltip_container" data-node-id="5307:701">
          <p data-node-id="5307:702">{title}</p>
          <p data-node-id="5308:181">{body}</p>
        </div>
      </div>
    );
  }

  // Arrow variants — single message, close icon, directional arrow
  const { message, onDismiss } = props as TooltipArrowProps;
  const isHorizontal = arrowPosition === "right" || arrowPosition === "left";
  const arrowTransform = ARROW_ROTATION[arrowPosition];

  return (
    <div
      role="tooltip"
      className={className}
      data-name="tooltip"
      data-node-id={nodeId}
      style={{ display: "flex", flexDirection: isHorizontal ? "row" : "column", alignItems: "center" }}
    >
      {/* Arrow — top or left position: render before container */}
      {(arrowPosition === "top" || arrowPosition === "left") && (
        <div
          data-name="arrow"
          style={{ width: 24, height: 12, flexShrink: 0, transform: arrowTransform }}
        >
          {/* TODO: Replace with confirmed polygon SVG/image asset */}
        </div>
      )}

      {/* Container */}
      <div
        data-name="tooltip_container"
        data-node-id={
          arrowPosition === "right"  ? "5110:665" :
          arrowPosition === "bottom" ? "5276:110" :
          undefined
        }
        style={{ flex: 1 }}
      >
        {/* Message */}
        <p
          data-node-id={
            arrowPosition === "right"  ? "5110:666" :
            arrowPosition === "bottom" ? "5276:111" :
            undefined
          }
        >
          {message}
        </p>

        {/* Close icon */}
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          data-name="Customer-Icon/x-close-delete"
          data-node-id={
            arrowPosition === "right"  ? "5110:667" :
            arrowPosition === "bottom" ? "5276:112" :
            undefined
          }
        >
          {/* TODO: Replace with icon component: Customer-Icon/x-close-delete */}
          ✕
        </button>
      </div>

      {/* Arrow — bottom or right position: render after container */}
      {(arrowPosition === "bottom" || arrowPosition === "right") && (
        <div
          data-name="arrow"
          data-node-id={
            arrowPosition === "right"  ? "5110:668" :
            arrowPosition === "bottom" ? "5276:113" :
            undefined
          }
          style={{ width: 24, height: 12, flexShrink: 0, transform: arrowTransform }}
        >
          {/* TODO: Replace with confirmed polygon SVG/image asset */}
        </div>
      )}
    </div>
  );
}
