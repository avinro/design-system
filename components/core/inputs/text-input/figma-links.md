# Text Input — Figma Links

## Component definition

| Sub-component | Node ID | Link |
|---------------|---------|------|
| `TextInput` (wrapper) | `5082:809` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5082-809 |
| `input/field` | `5082:663` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5082-663 |
| `input/label` | `5082:730` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5082-730 |
| `input/feedback-text` | `5082:753` | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5082-753 |

---

## App usage references

| App | Flow | Link |
|-----|------|------|
| Dojo Customer App | Add Card form | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=1366-828 |
| Dojo Driver App | Create Account — Personal Information (filled) | https://www.figma.com/design/tdHwm5RAIg6k9WTW4FQKCX/Dojo-Driver-App-1.0?node-id=2899-8496 |

---

## Usage context notes

**Customer App — Add Card form**
- Dark surface context (`--bg-surface-default: #1d1d23`)
- Field bg: `--input/bg-default: #34353f` — dark variant
- Field border: `--input/border-default: #4b4c5b` — dark variant
- Placeholder color: `--input/text-placeholder: #a3a3bc` — dark variant
- Fields shown: Card number, Expiry date, CVV
- Label shown without description or helper link
- No feedback text visible in this instance
- No icons or inline buttons visible in these instances

**Driver App — Personal Information (filled)**
- Light surface context (`--bg-surface-default: #f1f2f4`)
- Field bg: `--bg-surface-reaised: #e4e5ed`
- Field border (default): `--border-input: #cccdda`
- Field border (focus): `--text-primary: #1d1d23` — active border confirms `--input/border-active` token
- Fields shown: full name, phone number (with country code prefix), emergency contact name, emergency contact phone
- Mix of filled state (value visible) and placeholder state
- One field in focus state (dark border, placeholder still shown)
- Phone prefix field is a narrow input with a dropdown chevron — a custom combination of the field sub-component
- No label sub-component visible in these instances — labels appear inline with section descriptions instead

---

## Confirmed token values by theme

| Token | Light | Dark |
|-------|-------|------|
| `--input/bg-default` | `#e4e5ed` | `#34353f` |
| `--input/border-default` | `#cccdda` | `#4b4c5b` |
| `--input/text-placeholder` | `#636377` | `#a3a3bc` |
