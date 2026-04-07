# Offering Card — Figma Links

## Main component set

- **Offering-card** (node `202:873`): https://www.figma.com/design/iYqpx8x8Kxdixf8YSRkiCz/%E2%9D%96-Dojo_DS-Customer-app?node-id=202-873

## Node IDs

- `file-key`: `iYqpx8x8Kxdixf8YSRkiCz`
- `component-set-node-id`: `202:873`
- `doc-frame-node-id`: TODO — create documentation frame in Figma

## Variant nodes (15 of 15 — complete)

| booking | state | Node ID | Status |
|---|---|---|---|
| `free-instant` | `available` | `202:874` | ✓ |
| `free-instant` | `limited` | `202:885` | ⚠️ No "2 left" badge yet (no pills structure) |
| `free-instant` | `sold-out` | `204:1011` | ✓ (placeholder content) |
| `request-quote` | `available` | `202:896` | ✓ |
| `request-quote` | `limited` | `204:1024` | ✓ (placeholder content) |
| `request-quote` | `sold-out` | `204:1037` | ✓ (placeholder content) |
| `request-min-spend` | `available` | `202:907` | ✓ |
| `request-min-spend` | `limited` | `204:1050` | ✓ (placeholder content) |
| `request-min-spend` | `sold-out` | `204:1063` | ✓ (placeholder content) |
| `instant-fixed` | `available` | `202:918` | ✓ |
| `instant-fixed` | `limited` | `202:944` | ⚠️ Badge shows pink "Limited" — should be cyan "Instant" |
| `instant-fixed` | `sold-out` | `202:957` | ✓ |
| `all-day-instant` | `available` | `202:931` | ✓ |
| `all-day-instant` | `limited` | `204:1076` | ⚠️ Badge shows pink "Limited" — should be cyan "Instant" |
| `all-day-instant` | `sold-out` | `204:1089` | ✓ (placeholder content) |

## Visual content updates needed (designer tasks)

- `202:885` (`free-instant, limited`): Add pills structure with "2 left" warning badge; update price to a real value (not FREE).
- `202:944` (`instant-fixed, limited`): Change booking badge from pink "Limited" to cyan "Instant".
- `204:1076` (`all-day-instant, limited`): Change booking badge from pink "Limited" to cyan "Instant".
- All nodes marked "(placeholder content)": Replace Sunbed Cabana / Beach Club Table content with real offerings.

## Usage context

- **Offerings listing screen** (node `202:405`): https://www.figma.com/design/iYqpx8x8Kxdixf8YSRkiCz/%E2%9D%96-Dojo_DS-Customer-app?node-id=202-405
