// Car Image — reference component
// All dimensions confirmed from Figma get_design_context on all 4 variants.
// This component has no design tokens — it is a pure asset container.
//
// Image assets:
//   default / UI  → taxi-v_diagonal 1       (aspect ratio ~232:152)
//   default / Map → taxi-v_top 1            (aspect ratio ~112:176)
//   van / UI      → black_van-v_diagonal 1  (aspect ratio ~268:212)
//   van / Map     → black_van-v_top 1       (aspect ratio ~116:216)
//
// TODO: Replace imgSrc values with the resolved asset paths from the product's asset pipeline.
// TODO: Confirm production image format (SVG, PNG, WebP).

type CarImageType = "default" | "van";
type CarImageContext = "UI" | "Map";

type CarImageProps = {
  /** Vehicle type. "default" = standard car/sedan. "van" = van. */
  type: CarImageType;
  /**
   * Rendering context.
   * - "UI": diagonal view, 51.65×33px. Use in list rows and selection cards.
   * - "Map": top-down view, 40×41px. Use on live map overlays.
   */
  context: CarImageContext;
  /**
   * Alt text for the vehicle image.
   * - Set to "" (empty) when a visible vehicle label is present (decorative).
   * - Set to a descriptive value ("Standard car", "Van") when no label is visible.
   */
  alt?: string;
  className?: string;
};

// Dimensions confirmed from Figma
const DIMENSIONS: Record<CarImageContext, { width: number; height: number }> = {
  UI:  { width: 51.65, height: 33 },
  Map: { width: 40,    height: 41 },
};

// TODO: Replace with resolved asset paths from the product asset pipeline
const IMAGE_ASSETS: Record<CarImageType, Record<CarImageContext, string>> = {
  default: {
    UI:  "TODO: path/to/taxi-v_diagonal.png",
    Map: "TODO: path/to/taxi-v_top.png",
  },
  van: {
    UI:  "TODO: path/to/black_van-v_diagonal.png",
    Map: "TODO: path/to/black_van-v_top.png",
  },
};

// Figma node IDs for reference
const NODE_IDS: Record<CarImageType, Record<CarImageContext, string>> = {
  default: { UI: "5106:635", Map: "7449:5038" },
  van:     { UI: "5106:638", Map: "7449:5040" },
};

export function CarImage({ type, context, alt = "", className }: CarImageProps) {
  const { width, height } = DIMENSIONS[context];
  const src = IMAGE_ASSETS[type][context];
  const nodeId = NODE_IDS[type][context];

  return (
    <div
      className={className}
      data-name="car_image"
      data-node-id={nodeId}
      style={{ width, height, position: "relative", flexShrink: 0 }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
