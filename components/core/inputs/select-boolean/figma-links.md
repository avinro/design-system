# Select Boolean — Figma Links

## Component definition

| Resource | Link | Notes |
|----------|------|-------|
| DS Core — input components frame | https://www.figma.com/design/nGsiItayj12cfi3AKbP1mB/%E2%9D%96-Dojo_DS-Core?node-id=5131-1394 | Frame containing related input components. TODO: confirm the exact node ID for `select_boolean` in DS Core. |

---

## App usage references

| App | Flow | Link |
|-----|------|------|
| Dojo Customer App | New Plan form | https://www.figma.com/design/mqnceyvORwnapgycVXLgVE/Dojo-Customer-App-1.0_new-UI?node-id=406-8598 |

---

## Usage context notes

**Customer App — New Plan form**
- Used to answer: "Do you already have accommodation?" with Yes / No options
- Dark surface context (`--bg-surface-default: #1d1d23`)
- "No" is the selected option in the design sample shown
- Full-width within its form container, stacked after two `dropdown_input` fields

---

## Component node references

| Component | File | Node ID | Notes |
|-----------|------|---------|-------|
| `select_boolean` | Dojo Customer App | `417:4036` | Confirmed |
| `select_boolean` | DS Core | TODO | Node ID not confirmed from the provided link |

---

## Related components

| Component | Relationship |
|-----------|-------------|
| [Dropdown Input](/components/core/inputs/dropdown-input) | Sibling input component. Used together in the same form in the Customer App. |
