# Design System Documentation Repository

This repository stores the source files for the design system documentation site.

## Purpose

It contains:

- component documentation pages
- component-level images
- component rules
- token files
- foundation pages
- templates for automated documentation generation
- scripts to support Figma export and token synchronization

## Publishing model

This repository follows a docs-as-code workflow:

1. source files are created or updated locally
2. changes are committed to Git
3. changes are pushed to GitHub
4. Mintlify reads the repository and publishes the documentation site

## Main folders

- `foundations/` → foundational documentation pages
- `tokens/` → shared design tokens
- `components/` → one folder per component
- `templates/` → reusable documentation templates
- `snippets/` → reusable MDX or React snippets
- `scripts/` → automation scripts

## Component structure

Each component folder should contain:

- `index.mdx`
- `component-rules.md`
- `figma-links.md`
- `{component-name}.tsx` (optional)
- `{component-name}.tokens.json`
- `{component-name}.specs.json`
- local assets such as:
  - `anatomy.png`
  - `states.png`
  - `variants.png`
  - `do-dont.png`
  - `examples.png`

## Documentation workflow

Typical workflow for a component:

1. define or update the component in Figma
2. export or sync tokens
3. export visual assets such as anatomy and states
4. generate or update `index.mdx`
5. review content
6. commit and push changes
7. Mintlify publishes the updated page

## Automation workflow

Claude Code is used to:

- create component folders
- generate `index.mdx`
- generate starter rules
- use Figma MCP tools when available
- update component documentation from structured sources

## Naming conventions

- folders: lowercase kebab-case
- images: lowercase kebab-case
- one main page per component: `index.mdx`

## Status

This repository is intended to become the long-term source of truth for the design system documentation.
