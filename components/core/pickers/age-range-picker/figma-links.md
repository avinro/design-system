# Age Range Picker — Figma Links

## DS Core — Component

| Node | Description | URL |
|---|---|---|
| `5147:2258` | age-range_picker — component (single variant) | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/❖-Dojo_DS-Core?node-id=5147-2258 |

## Dojo Customer App — Usage in context

| Node | Description | URL |
|---|---|---|
| `427:8852` | Screen: Chat view — "Blue Marlin Reservation" with "Select age range" popup | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=427-8852 |
| `427:8919` | Bottom-sheet popup overlay ("Select age range") | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=427-8919 |
| `427:8920` | Popup container with Age Range Picker instance | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=427-8920 |

## Related DS Core components

| Component | Node | Relationship |
|---|---|---|
| Time Picker | `5146:2125` | Shares the scroll depth visual system. Appears earlier in the same reservation chat flow. |
| Number Picker | `5132:396` | Shares the scroll depth visual system. |
| Month Year Picker | `5129:1279` | Shares the scroll depth visual system. |
| Time Date Picker | `5121:1330` | Shares the scroll depth visual system. |

## Notes

- The DS Core component has no named variants — a single frame is defined showing `from=18` (start boundary) and `to=41` (mid-range).
- Confirmed popup context: triggered by "Select age range" chat action in a Dojo AI conversation (same reservation flow as Time Picker, next step after time selection).
- Popup title: "Select age range". Confirm button: "Confirm age range".
- The picker renders on a dark background (`--bg-surface-default: #1d1d23`) in the app.
- The "from" and "to" labels use Manrope Medium (weight 500), distinct from the drum column items which use Regular (weight 400).
