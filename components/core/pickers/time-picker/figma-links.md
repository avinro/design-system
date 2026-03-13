# Time Picker — Figma Links

## DS Core — Component

| Node | Description | URL |
|---|---|---|
| `5146:2125` | Time_Picker — component set (all variants) | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5146-2125 |
| `5146:2126` | Variant: `PM=off` — AM selected | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5146-2126 |
| `5146:2135` | Variant: `PM=on` — PM selected | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5146-2135 |

## Dojo Customer App — Usage in context

| Node | Description | URL |
|---|---|---|
| `222:9659` | Screen: Chat view — "Blue Marlin Reservation" with "Choose arrive time" popup | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=222-9659 |
| `427:8726` | Bottom-sheet popup overlay ("Choose arrive time") | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=427-8726 |
| `427:8727` | Popup container with Time Picker instance | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=427-8727 |

## Related DS Core components

| Component | Node | Relationship |
|---|---|---|
| Time Date Picker | `5121:1330` | Shares the scroll depth visual system. Has 4 columns (Date, Hour, Minute, AM/PM) vs this component's 3 columns (Hour, Minute, AM/PM). |
| Month Year Picker | `5129:1279` | Shares the scroll depth visual system. |
| Number Picker | `5132:396` | Shares the scroll depth visual system. |

## Notes

- Figma prop naming: `PM=off` / `PM=on`. Recommend `period: "AM" | "PM"` in implementation for clarity.
- Confirmed popup context: triggered by "Select Time" chat action in a Dojo AI conversation. Popup title: "Choose arrive time". Confirm button: "Confirm Time".
- The picker renders on a dark background (`--bg-surface-default: #1d1d23`) in the app — token values resolve differently than in the DS Core light-theme preview.
