// Tabs — reference component skeleton
// All token values and dimensions confirmed from Figma get_design_context.
//
// Three variants by item count:
//   Navs-2 (5001:2082) — 2 tabs
//   Navs-3 (5001:2085) — 3 tabs
//   Navs-4 (5001:2089) — 4 tabs
//
// Base component: tab-items (5001:2072)
//   icon=off, Active=on  (5001:2079) — text label, active
//   icon=off, Active=off (5001:2077) — text label, inactive
//   icon=on,  Active=on  (5001:2073) — icon only, active
//   icon=on,  Active=off (5001:2075) — icon only, inactive
//
// Tab bar: px 12px, h 44px, bottom border 1px #e4e5ed (--notification/border-default)
// Tab item: flex 1, h 44px, text centered, Inter Medium 500 15px
// Active indicator: 2px bottom border #1d1d23 (--tab/border-active) via --sds-size-stroke-focus-ring
// Inactive: transparent bottom border, text #636377 (--tab/text-inactive)
//
// Token discrepancies flagged in tabs.tokens.json:
//   - Inactive text: DS Core #636377 vs Driver App #9192af
//   - Tab bar bg: DS Core none vs Driver App #f1f2f4
//   - Token names: DS Core slash notation vs Driver App hyphen + typos
//
// TODO: Confirm ARIA role (tablist / tab).
// TODO: Confirm keyboard arrow-key navigation.
// TODO: Confirm icon + label combination support.
// TODO: Confirm disabled state.

type TabItem = {
  /** Unique identifier for this tab. */
  value: string;
  /** Text label. Used when icon is not provided. */
  label?: string;
  /** Icon element. Used for icon-only tabs. */
  icon?: React.ReactNode;
};

type TabsProps = {
  /** The tab items to render. Between 2 and 4. */
  items: [TabItem, TabItem, ...TabItem[]];
  /** The value of the currently active tab. */
  selectedValue: string;
  /** Called when the user selects a tab. */
  onValueChange: (value: string) => void;
  className?: string;
};

// Figma node IDs for reference
const VARIANT_NODE_IDS: Record<number, string> = {
  2: "5001:2082",
  3: "5001:2085",
  4: "5001:2089",
};

export function Tabs({ items, selectedValue, onValueChange, className }: TabsProps) {
  const count = Math.min(items.length, 4) as 2 | 3 | 4;
  const nodeId = VARIANT_NODE_IDS[count];

  return (
    <div
      role="tablist"
      className={className}
      data-name="Tabs"
      data-node-id={nodeId}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        paddingLeft: "12px",
        paddingRight: "12px",
        borderBottom: "1px solid var(--notification/border-default, #e4e5ed)",
        // Note: DS Core has no background. Some product contexts add a surface bg.
        // Set backgroundColor externally if needed.
      }}
    >
      {items.slice(0, 4).map((item) => {
        const isActive = item.value === selectedValue;
        const hasIcon = Boolean(item.icon);
        const activeNodeId = hasIcon ? "5001:2073" : "5001:2079";
        const inactiveNodeId = hasIcon ? "5001:2075" : "5001:2077";

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onValueChange(item.value)}
            data-name="tab-items"
            data-node-id={isActive ? activeNodeId : inactiveNodeId}
            style={{
              flex: 1,
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: isActive
                ? "2px solid var(--tab/border-active, #1d1d23)"
                : "1px solid var(--tab/border-inactive, rgba(29,29,35,0))",
              backgroundColor: "var(--tab/bg, rgba(29,29,35,0))",
              color: isActive
                ? "var(--tab/text-active, #1d1d23)"
                : "var(--tab/text-inactive, #636377)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              textAlign: "center",
              whiteSpace: "nowrap",
              cursor: "pointer",
              padding: 0,
              minWidth: 0,
            }}
          >
            {hasIcon ? (
              // Icon-only tab
              <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </span>
            ) : (
              // Text-only tab
              item.label
            )}
          </button>
        );
      })}
    </div>
  );
}
