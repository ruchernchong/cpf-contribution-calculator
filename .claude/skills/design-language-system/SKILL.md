# Design System - CPF Contribution Estimator

This document defines the design system for the CPF Contribution Estimator application.

## Aesthetic Direction

**Refined Financial Simplicity** - A clean, professional aesthetic with cool slate tones and teal accents that conveys trust and clarity.

## Colour Palette

All colours use OKLCH colour space for perceptual uniformity. The palette uses two core colours: **Slate** (primary) and **Teal** (accent).

### Semantic Colours

| Token | OKLCH Value | Purpose |
|-------|-------------|---------|
| `--primary` | `oklch(0.25 0.02 250)` | Cool slate - Trust, authority |
| `--primary-foreground` | `oklch(0.98 0.005 250)` | Text on primary |
| `--secondary` | `oklch(0.92 0.01 250)` | Light slate - Subtle backgrounds |
| `--secondary-foreground` | `oklch(0.25 0.02 250)` | Text on secondary |
| `--accent` | `oklch(0.55 0.15 180)` | Teal - Interactive, emphasis |
| `--background` | `oklch(0.985 0.003 250)` | Cool off-white |
| `--foreground` | `oklch(0.20 0.02 250)` | Slate text |
| `--muted` | `oklch(0.94 0.008 250)` | Light slate gray |
| `--muted-foreground` | `oklch(0.50 0.02 250)` | Secondary text |

### Chart Colours

| Token | OKLCH Value | Purpose |
|-------|-------------|---------|
| `--chart-1` | `oklch(0.55 0.15 180)` | Teal - OA Account |
| `--chart-2` | `oklch(0.45 0.12 200)` | Dark cyan - SA Account |
| `--chart-3` | `oklch(0.65 0.10 180)` | Light teal - MA Account |
| `--chart-4` | `oklch(0.50 0.02 250)` | Slate |
| `--chart-5` | `oklch(0.70 0.08 200)` | Light cyan |

## Typography

**Font Family:** Geist (via `next/font/google`)

### Font Usage

- **Headings:** `font-semibold` or `font-bold`
- **Body:** Default weight
- **Currency/Data:** `font-mono` for tabular numbers

## Spacing Guidelines

### Philosophy: "Push Down, Not Pull Up"

Elements push content below them rather than pulling from above. This creates predictable, one-directional spacing flow.

### Key Rules

1. **NO `mt-*` or `pt-*`** — Use `mb-*`, `pb-*`, and `gap-*` instead
2. **Use `gap-*`** for flex/grid containers
3. **Exception:** `pt-*` allowed only for sticky elements offsetting fixed headers

### When to Use Each Utility

| Utility | Use When |
|---------|----------|
| `gap-*` | Flex/grid containers (preferred) |
| `mb-*` | Spacing between siblings in non-flex/grid contexts |
| `pb-*` | Internal padding at bottom of containers |

### Spacing Scale (8px Grid System)

This project follows the **8px grid system** used by Apple and Google design systems. All spacing values must be multiples of 8px.

| Token | Pixels | Use Case |
|-------|--------|----------|
| `2` | 8px | Tight spacing (related items, icon gaps) |
| `4` | 16px | Default spacing (form fields, list items) |
| `6` | 24px | Section spacing (card content, groups) |
| `8` | 32px | Large gaps (between cards, sections) |
| `12` | 48px | Page sections (major content blocks) |

**Allowed tokens:** `2`, `4`, `6`, `8`, `12`, `16`, `20`, `24`...

**Avoid:** `1`, `3`, `5`, `7` (these are 4px, 12px, 20px, 28px — not 8px multiples)

### Spacing Principles

**Internal ≤ External Rule:**
Padding inside a component should never exceed the margin around it. This creates clear visual hierarchy and grouping.

```
❌ Card with p-8 but gap-4 between cards
✅ Card with p-4 and gap-6 between cards
```

**Container-Based Sizing:**

| Container Size | Padding | Example |
|----------------|---------|---------|
| Large (page sections) | `p-6` to `p-8` | Layout containers, modals |
| Medium (cards, panels) | `p-4` to `p-6` | Cards, popovers, dropdowns |
| Small (buttons, labels) | `p-2` to `p-3` | Buttons, badges, chips |

**Gestalt Proximity:**
- Related items → smaller spacing (gap-2, gap-4)
- Unrelated items → larger spacing (gap-6, gap-8)

## Tailwind CSS v4 Conventions

- Use CSS-first configuration in `globals.css` with `@theme inline`
- Use `size-*` instead of `w-* h-*` for square elements
- Use `gap-*` instead of `space-*` where possible
- Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`) for RTL support

## Component Patterns

### Cards

```tsx
// Standard card with shadow
<Card className="shadow-md">

// Themed info card (teal)
<div className="rounded-lg border border-accent/20 bg-accent/5 p-4">

// Themed info card (slate)
<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
```

### Accent Highlights

```tsx
// Teal highlight for contributions
<p className="font-mono font-medium text-accent">

// Current/active indicator
<span className="animate-pulse rounded-full bg-accent" />
```

### Layout

```tsx
// Vertical layout with gap (instead of space-y)
<div className="flex flex-col gap-6">

// Grid with gap
<div className="grid gap-6 md:grid-cols-2">
```

## File Structure

Key styling files:
- `src/app/globals.css` - CSS variables and theme configuration
- `src/components/ui/*` - shadcn/ui components (DO NOT MODIFY)
- `src/components/layout/*` - Layout components (header, footer, banner)

## Do Not Modify

- `src/components/ui/*` - These are shadcn/ui components
- Dark mode styles in `.dark` selector - Out of scope for current revamp
