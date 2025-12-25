# Design System - CPF Contribution Estimator

This document defines the design system for the CPF Contribution Estimator application.

## Aesthetic Direction

**Refined Financial + Singapore Identity** - A sophisticated, premium aesthetic that conveys trust and authority while maintaining Singapore character.

## Colour Palette

All colours use OKLCH colour space for perceptual uniformity.

### Semantic Colours

| Token | OKLCH Value | Purpose |
|-------|-------------|---------|
| `--primary` | `oklch(0.18 0.04 250)` | Deep navy - Trust, authority |
| `--primary-foreground` | `oklch(0.98 0.01 90)` | Text on primary |
| `--secondary` | `oklch(0.72 0.12 85)` | Warm gold - Premium, success |
| `--secondary-foreground` | `oklch(0.18 0.04 250)` | Text on secondary |
| `--accent` | `oklch(0.55 0.22 25)` | Singapore red - Strategic highlights |
| `--background` | `oklch(0.985 0.005 90)` | Warm off-white |
| `--foreground` | `oklch(0.18 0.03 280)` | Rich charcoal text |
| `--muted` | `oklch(0.94 0.005 90)` | Warm gray |
| `--muted-foreground` | `oklch(0.45 0.02 280)` | Secondary text |

### Chart Colours

| Token | OKLCH Value | Purpose |
|-------|-------------|---------|
| `--chart-1` | `oklch(0.55 0.15 250)` | Navy - OA Account |
| `--chart-2` | `oklch(0.72 0.12 85)` | Gold - SA Account |
| `--chart-3` | `oklch(0.55 0.22 25)` | Singapore red - MA Account |
| `--chart-4` | `oklch(0.65 0.12 170)` | Teal |
| `--chart-5` | `oklch(0.60 0.10 300)` | Purple |

## Typography

**Font Family:** Geist (via `next/font/google`)

### Font Usage

- **Headings:** `font-semibold` or `font-bold`
- **Body:** Default weight
- **Currency/Data:** `font-mono` for tabular numbers

## Spacing Guidelines

### Key Rules

1. **NO margin-top or padding-top** - Use `mb-*`, `pb-*`, and `gap-*` instead
2. **Prefer `gap-*`** over `space-*` for flex/grid containers
3. **Exception:** `pt-*` allowed only for sticky elements offsetting fixed headers

### Spacing Scale

Use Tailwind's default scale: `2`, `4`, `6`, `8`, `12`

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

// Themed info card (navy)
<div className="rounded-lg border border-chart-1/20 bg-chart-1/5 p-4">

// Themed info card (gold)
<div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
```

### Accent Highlights

```tsx
// Gold highlight for contributions
<p className="font-mono font-medium text-secondary">

// Current/active indicator
<span className="animate-pulse rounded-full bg-secondary" />
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
