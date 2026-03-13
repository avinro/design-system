# Design System Repository Rules

This repository stores the design system documentation, component-level assets, tokens, and supporting files used to publish documentation with Mintlify.

## Repository structure

- `/foundations` contains foundation pages such as color, spacing, and typography
- `/tokens` contains shared system-level token files
- `/components` contains component folders organized by library and category
- `/templates` contains reusable documentation templates
- `/snippets` contains reusable MDX or React snippets
- `/scripts` contains automation scripts

## Component library structure

Components are organized using a three-level hierarchy:

```
components/{library}/{category}/{component}/
```

### Libraries

- `core` — base components shared across all products. All currently documented components belong to this library.
- `ds-customer` — customer-facing product components. Reserved for future use. Follows the same structure.
- `ds-drivers` — driver-facing product components. Reserved for future use. Follows the same structure.

### Categories (used across all libraries)

- `actions` — components that trigger operations or user events
- `inputs` — form controls for direct data entry
- `pickers` — specialized selection controls for dates, times, and ranges
- `navigation` — components for moving between views or options
- `indicators-and-states` — status indicators and system responses
- `content-display` — visual representation of data and identity
- `messaging` — components rendered above the main UI layer
- `containers-and-design` — structural components that contain, separate, or layer content

## Component folder structure

Each component folder should contain:

- `index.mdx` → the main Mintlify page for the component
- `component-rules.md` → writing and usage rules specific to the component
- `figma-links.md` → links to the relevant Figma nodes and frames
- `{component-name}.tsx` → optional real component code for rendered examples
- `{component-name}.tokens.json` → token values used by the component
- `{component-name}.specs.json` → structured specs such as variants, sizes, states, and anatomy parts
- local image assets such as:
  - `anatomy.png`
  - `states.png`
  - `variants.png`
  - `do-dont.png`
  - `examples.png`

## Documentation generation rules

When generating documentation for a component:

1. Use the universal template at:
   `templates/component-page-template.mdx`

2. Create or update:
   `components/{library}/{category}/{component-name}/index.mdx`

   For current core components, this resolves to:
   `components/core/{category}/{component-name}/index.mdx`

3. Use the following sources of truth in this priority order:
   - `components/{library}/{category}/{component-name}/component-rules.md`
   - `components/{library}/{category}/{component-name}/figma-links.md`
   - `components/{library}/{category}/{component-name}/{component-name}.specs.json`
   - `components/{library}/{category}/{component-name}/{component-name}.tokens.json`
   - Figma MCP tools, if Figma links are available
   - Existing component code, if relevant

4. The component page must include these sections in this order:
   - Overview
   - Anatomy
   - Variants
   - States
   - Tokens & specs
   - Usage guidelines
   - Accessibility
   - Do / Don't
   - Resources

## Writing style

Write for:
- product designers
- UX designers
- frontend developers

Write in a tone that is:
- clear
- concise
- implementation-friendly
- professional
- consistent across components

## Writing constraints

- Do not invent variants, states, sizes, behaviors, or accessibility features that are not present in the sources
- If information is missing, add a short `TODO:` note instead of guessing
- Prefer practical guidance over theory
- Avoid marketing language
- Avoid vague statements such as "easy to use" or "intuitive" unless supported by a real guideline
- When possible, turn design decisions into actionable rules

## Mintlify rules

- Each component should be documented in a single `index.mdx` page unless explicitly requested otherwise
- Use relative local asset paths inside each component folder when possible
- Keep headings stable and reusable across all components
- Assume Mintlify will publish pages from files included in `docs.json` navigation

## Image rules

When referencing images in `index.mdx`, prefer these filenames:

- `./anatomy.png`
- `./states.png`
- `./variants.png`
- `./do-dont.png`
- `./examples.png`

## Component creation rules

These rules are mandatory and apply to every component generation request without exception.

### Required information before creating any component

A component request is only actionable if all three of the following are known:

- **Library** — one of: `core`, `ds-customer`, `ds-drivers`
- **Category** — one of the eight approved categories listed above
- **Component name** — in kebab-case (e.g., `text-field`, `status-badge`)

If library or category is missing or ambiguous, stop and ask. Do not assume a default. Do not fall back to a flat path.

### Path rules

- Every new component must be created inside: `components/{library}/{category}/{component-name}/`
- No component may be created directly under `/components/` or under `/components/{library}/`
- All files for a component — `index.mdx`, `component-rules.md`, `figma-links.md`, `.tsx`, `.specs.json`, `.tokens.json`, and any image assets — must be saved inside that component folder and nowhere else

### Generation flow

When asked to create documentation for a new component:

1. Confirm library, category, and component name — do not proceed without all three
2. Create the component folder at `components/{library}/{category}/{component-name}/`
3. Create all required placeholder files inside that folder
4. Generate starter specs and starter rules
5. Generate `index.mdx` using the universal template
6. Register the new page in `docs.json` under the correct library and category group
7. Leave TODO markers where the source of truth is still missing
