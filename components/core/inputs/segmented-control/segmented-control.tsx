// Segmented Control — reference component skeleton
// All token values and dimensions confirmed from Figma get_design_context.
//
// Three variants by item count:
//   Navs-2 (5001:2010) — 2 items
//   Navs-3 (5001:2013) — 3 items
//   Navs-4 (5001:2017) — 4 items
//
// Base component: segmented-items
//   State=Active   (5001:2006) — bg #f1f2f4, border #f1f2f4, shadow, text #1d1d23
//   State=Inactive (5001:2003) — no bg, no border, no shadow, text #4b4c5b
//
// Track: bg #1d1d23 (DS Core) / rgba(29,29,35,0.05) (Customer App), border-radius 120px, padding 2px, gap 2px
// Item: height 36px, border-radius 6px
// Typography: Inter Medium 500, 15px, text-center, whitespace-nowrap
//
// TODO: Confirm ARIA role (tablist/tab vs radiogroup/radio).
// TODO: Confirm keyboard arrow-key navigation.
// TODO: Confirm disabled state spec.
// TODO: Confirm icon support in item labels.

type SegmentedItem = {
  /** Label displayed inside the item. */
  label: string;
  /** Unique value used to identify this item. */
  value: string;
};

type SegmentedControlProps = {
  /** The items to render. Between 2 and 4 items. */
  items: [SegmentedItem, SegmentedItem, ...SegmentedItem[]];
  /** The value of the currently active item. */
  selectedValue: string;
  /** Called when the user selects a different item. */
  onValueChange: (value: string) => void;
  /**
   * Track background variant.
   * "dark"  — DS Core default (#1d1d23)
   * "light" — Customer App context (rgba(29,29,35,0.05))
   */
  trackVariant?: "dark" | "light";
  className?: string;
};

// Figma node IDs for reference
const VARIANT_NODE_IDS: Record<number, string> = {
  2: "5001:2010",
  3: "5001:2013",
  4: "5001:2017",
};

const TRACK_BG: Record<"dark" | "light", string> = {
  dark:  "#1d1d23",
  light: "rgba(29, 29, 35, 0.05)",
};

export function SegmentedControl({
  items,
  selectedValue,
  onValueChange,
  trackVariant = "dark",
  className,
}: SegmentedControlProps) {
  const count = Math.min(items.length, 4) as 2 | 3 | 4;
  const nodeId = VARIANT_NODE_IDS[count];

  return (
    <div
      role="tablist"
      className={className}
      data-name="segmented-control"
      data-node-id={nodeId}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "2px",
        padding: "2px",
        borderRadius: "120px",
        backgroundColor: TRACK_BG[trackVariant],
        width: "328px", // DS Core fixed width — override to "100%" for full-width contexts
      }}
    >
      {items.slice(0, 4).map((item) => {
        const isActive = item.value === selectedValue;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onValueChange(item.value)}
            data-name={isActive ? "segmented-items/Active" : "segmented-items/Inactive"}
            data-node-id={isActive ? "5001:2006" : "5001:2003"}
            style={{
              flex: 1,
              height: "36px",
              borderRadius: "6px",
              border: isActive ? "1px solid #f1f2f4" : "none",
              backgroundColor: isActive ? "#f1f2f4" : "transparent",
              boxShadow: isActive
                ? "0px 0px 2px rgba(0,0,0,0.04), 0px 4px 4px rgba(0,0,0,0.08)"
                : "none",
              color: isActive ? "#1d1d23" : "#4b4c5b",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              textAlign: "center",
              whiteSpace: "nowrap",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
