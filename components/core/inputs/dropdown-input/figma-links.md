# Dropdown Input — Figma Links

## Component definition

| Resource | Link |
|----------|------|
| DS Core — dropdown_input | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5131-1394 |

---

## App usage references

| App | Flow | Link |
|-----|------|------|
| Dojo Customer App | New Plan form | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=406-8598 |
| Dojo Driver App | Create Account — Vehicle Details | https://www.figma.com/design/tdHwm5RAIg6k9WTW4FQKCX/Dojo-Driver-App-1.0?node-id=2899-8595 |

---

## Usage context notes

**Customer App — New Plan form**
- Used to select travel dates (triggers a date picker)
- Used to select number of travelers (triggers a number picker)
- Dark surface context (`--bg-surface-default: #1d1d23`)
- Full-width, with label and annotation visible

**Driver App — Vehicle Details form**
- Used to select vehicle type
- Used to select passenger capacity
- Light surface context (`--bg-surface-default: #f1f2f4`)
- No label or annotation visible in this usage — select button used standalone within the form layout

---

## Sub-component Figma nodes

| Sub-component | Node ID | Notes |
|---------------|---------|-------|
| `select_button` | `5131:1331` | Pill-shaped trigger. Can be used independently. |
| `anotation` | `5144:2119` | Helper text with info icon. |

---

## Related components

| Component | Relationship |
|-----------|-------------|
| [Time Date Picker](/components/core/pickers/time-date-picker) | Commonly triggered by this component in date/time flows |
| [Calendar Range](/components/core/pickers/calendar-range) | Used with Dropdown Input for date range selection |
| [Number Picker](/components/core/pickers/number-picker) | Used with Dropdown Input for numeric value selection |
| [Age Range Picker](/components/core/pickers/age-range-picker) | Another picker triggered via Dropdown Input |
