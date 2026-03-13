# Text Area — Figma Links

## Component definition

| Sub-component | Node ID | Link |
|---------------|---------|------|
| `TextArea` (wrapper) | `2035:12927` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=2035-12927 |
| `textArea/field` | `2035:12768` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=2035-12768 |
| `input/label` | `5082:730` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5082-730 |
| `input/feedback-text` | `5082:753` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5082-753 |

Note: `input/label` and `input/feedback-text` are shared with the TextInput component.

---

## App usage references

| App | Flow | Link |
|-----|------|------|
| Dojo Customer App | Confirm Reservation — Add special request | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=1100-25880 |
| Dojo Driver App | Cancel Ride — Cancellation reason | https://www.figma.com/design/tdHwm5RAIg6k9WTW4FQKCX/Dojo-Driver-App-1.0?node-id=2278-3314 |

---

## Usage context notes

**Customer App — Confirm Reservation**
- Dark surface context (`--bg-surface-default: #1d1d23`)
- Field bg: `--bg-surface-default (#1d1d23)` in this instance — note: differs from DS Core token `--input/bg-default (#34353f)`; may be a product-level override
- Border: `--input/border-default (#4b4c5b)` — dark variant
- Placeholder text color: `--text-muted (#9192af)` — note: uses `--text-muted` rather than `--input/text-placeholder`
- Label shown: "Add special request (optional)" with help icon
- Field shown in Default state (placeholder visible, no value entered)
- No feedback text shown in this instance

**Driver App — Cancel Ride modal**
- Light surface context (`--bg-surface-default: #f1f2f4`)
- Field bg: `--bg-surface-reaised (#e4e5ed)` — surface raised token (note: "reaised" is the token name as it appears in the design file)
- Border: `--border-input (#cccdda)` — same value as `--input/border-default` light variant
- Text (filled state): `--text-primary (#1d1d23)`
- No label sub-component shown — field purpose communicated by surrounding copy
- Field shown in filled state with user-entered cancellation reason

---

## Confirmed token values by theme

| Token | Light | Dark |
|-------|-------|------|
| `--input/bg-default` | `#e4e5ed` | `#34353f` |
| `--input/bg-disabled` | `#f1f2f4` | — |
| `--input/border-default` | `#cccdda` | `#4b4c5b` |
| `--input/border-active` | `#1d1d23` | — |
| `--input/border-error` | `#c22` | — |
| `--input/text-placeholder` | `#636377` | `#a3a3bc` |
| `--input/text-input` | `#1d1d23` | — |
| `--element/text-muted` (blocked state) | `#929fb1` | — |
