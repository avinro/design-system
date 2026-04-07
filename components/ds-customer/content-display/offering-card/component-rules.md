# Offering Card — Component Rules

## Source of truth

Figma file: `iYqpx8x8Kxdixf8YSRkiCz` (Dojo DS — Customer App)
Component set node: `202:873`

---

## Purpose

Offering Card displays a bookable venue offering in a list or grid. It communicates the offering's title, description, guest capacity, pricing, booking method, and current availability state at a glance.

Used on: venue detail screens, offering selection flows.

---

## Variant axes

Two independent axes:

### `booking` — how the offering is booked and priced

| Value | Booking flow | Payment model | Badge shown |
|---|---|---|---|
| `free-instant` | Confirmed immediately | Free | Cyan "Instant" |
| `request-quote` | Venue must accept | Price is quoted | Pink "Limited" (request flow) |
| `request-min-spend` | Venue must accept | Minimum spend set | Pink "Limited" (request flow) |
| `instant-fixed` | Confirmed immediately | Fixed price | Cyan "Instant" |
| `all-day-instant` | Confirmed immediately | Fixed price, full-day access | Cyan "Instant" + Success "All day" |

### `state` — current availability of the offering

| Value | Meaning | Visual changes |
|---|---|---|
| `available` | Bookable at full capacity | No availability overlay |
| `limited` | Few spots left | Adds warning "2 left" pill |
| `sold-out` | No availability | Image dimmed (40% overlay), price replaced with "SOLD OUT", badge replaced with gray "Sold out" |

---

## Variant combinations

All 15 combinations are valid. `state` applies on top of any `booking` value.

---

## Anatomy rules

### image
- 128×128px, displayed when present
- In `sold-out` state: show a 40% opacity white overlay on top of the image (do not hide image entirely)
- Image is optional — cards without an image left-align all content

### col.top
- Always includes: **title** + **description**
- In `free-instant`, `instant-fixed`, `all-day-instant`: show Badge/Utility (cyan "Instant") in the top section header area
- In `request-*`: show Badge/Utility (pink "Limited") in the top section to signal request flow
- In `sold-out`: do not show the booking method badge in the top section

### col.pills
- Shows 0–2 badge pills:
  - **Slot 1 (booking type)**: Instant (cyan) or Limited/Request (pink) or All day (success green)
  - **Slot 2 (quantity/duration)**: Warning "2 left" (if `state=limited`) or Success "All day" (if `booking=all-day-instant`)
- In `sold-out`: single gray "Sold out" pill, slots 1 and 2 hidden

### col.bottom
- **Price**: always shown
  - `free-instant`: display "FREE" in primary text
  - `request-quote`: display "Quote" / "required" (two-line)
  - `request-min-spend`, `instant-fixed`, `all-day-instant`: display price as "€{amount}"
  - `sold-out`: display "SOLD OUT" in placeholder/disabled text color
- **Guest count**: always shown (e.g., "2-4 guests", "Up to 12")

---

## Badge usage rules

- **Cyan (Instant)**: use Badge/Utility type `cyan` — signals immediate confirmation
- **Pink (Limited/Request)**: use Badge/Utility type `pink` — signals request-based booking
- **Warning "2 left"**: use Badge type `Warning` — signals low availability count
- **Success "All day"**: use Badge type `Success` — signals full-day duration
- **Gray "Sold out"**: use Badge type `default` — neutral, no action possible

Do not mix Instant and Limited badges on the same card — they are mutually exclusive booking flows.

---

## Content rules

- Title: 1–4 words, sentence case. Do not truncate — the card adapts height.
- Description: 1–2 lines, 40–60 chars. Describes what is included or the main offer.
- Guest count: always show. Format: "2-4 guests" or "Up to {n}".
- Price: never show currency symbols inside the token — use "€" prefix.
- Labels like "FREE", "SOLD OUT" are all-caps. All other text is sentence case.

---

## Do / Don't

**Do:**
- Choose `booking` based on how the venue actually confirms the offering.
- Use `state=limited` only when actual capacity data is available.
- Keep title and description concise — the card is a preview, not a detail page.

**Don't:**
- Don't use `request-*` booking values for offerings that are confirmed instantly.
- Don't show a price in the `request-quote` variant — always use the two-line "Quote / required" display.
- Don't manually override badge colors — use the defined badge types per booking/state combination.
- Don't hide the image in `sold-out` — dim it with the overlay instead.
