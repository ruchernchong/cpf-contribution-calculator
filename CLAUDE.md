# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# CPF Contribution Estimator - Development Guide

A Next.js application that calculates CPF (Central Provident Fund) contributions following Singapore's 2023 Budget changes to income ceilings.

## Build and Test Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linting
- `pnpm format` - Format code with Biome
- `pnpm test` - Run tests once with coverage
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## Code Style
- **Language**: Use English (Singapore) spelling across documentation and copy
- **Formatting**: Biome for formatting with 2-space indentation and double quotes
- **Imports**: Organised via Biome, absolute imports with `@/` prefix
- **Tailwind Classes**: Automatically sorted using Biome's `useSortedClasses` rule with `cn`, `clsx`, `cva`, and `tw` functions
- **TypeScript**: Full type coverage, avoid `any` and `as` casts
- **State Management**: Jotai atoms for global state
- **Component Structure**: Functional components with explicit return types
- **File Naming**: kebab-case for all files (e.g., `user-input.tsx`, `calculate-cpf-contribution.ts`)
- **Variable/Function Naming**: camelCase for functions/variables, PascalCase for React component names
- **Error Handling**: Try/catch with helpful error messages, use optional chaining
- **Testing**: Vitest with descriptive test names, use `it.each` for data variations

## Documentation Maintenance
Keep documentation in sync with code changes:
- **Update CLAUDE.md** when making:
  - Architectural changes (new state management patterns, data flow modifications)
  - New build/test commands or workflow changes
  - Changes to code style guidelines or conventions
  - Updates to key data structures or calculation logic
  - Additions of significant new features or components
- **Update README.md** when making:
  - User-facing feature additions or removals
  - Changes to setup/installation instructions
  - Updates to usage examples or API changes
  - Modifications to project description or scope
- **Both files** should be updated together for changes that affect both development workflow and user experience

## Architecture

### State Management (Jotai Atoms)
State is managed through Jotai atoms in `src/atoms/`:
- `result-atom.ts` - Core derived atoms for CPF calculations (`contributionResultAtom`, `distributionResultsAtom`)
- `user-atom.ts` - User-specific data (age, birth date)
- `user-input-atom.ts` - Form input state
- `setting-atom.ts` - User settings (income, storage preferences)
- `income-ceiling-atom.ts` - Income ceiling data and selected timeline date (`latestIncomeCeilingDateAtom`)
- `year-slider-atom.ts` - Timeline year slider state

### CPF Calculation Logic
The core calculation happens in `src/lib/calculate-cpf-contribution.ts`:
- Takes income, year, and optional age group/ceiling preferences
- Uses age groups from `src/data/index.ts` which define contribution and distribution rates by age brackets
- Returns `ComputedResult` with employee/employer contributions and OA/SA/MA distributions
- Income is capped at the ceiling defined in `src/constants/index.ts` based on the year

### Key Data Structures
- **Age Groups** (`src/data/index.ts`): 8 age brackets with varying contribution rates (employee/employer) and distribution rates (OA/SA/MA percentages)
- **Income Ceilings** (`src/constants/index.ts`): Ceiling values by year following the gradual increase from $6000 (pre-Sept 2023) to $8000 (Sept 2026)
- **Types** (`src/types/index.ts`): `AgeGroup`, `ContributionRate`, `DistributionRate`, `ComputedResult`, `ContributionResult`

### Testing Strategy
- Tests use Vitest with jsdom environment
- Coverage excludes: `node_modules`, `.next`, `.d.ts` files, config files, `src/middleware.ts`, and `src/components/ui/**` (UI library components)
- Test files located alongside source in `__tests__` directories
- React component tests exist but are excluded from main test runs

### UI Components
- UI components in `src/components/ui/` are from shadcn/ui (excluded from Biome linting)
- Custom components use Base UI primitives with Tailwind CSS
- Charts use Recharts library for data visualisation

### Route Groups
The application uses Next.js route groups for organisation:
- `(main)` - Main application routes (calculator, about, interest-rates, investments)
- `(docs)` - Developer portal routes powered by Fumadocs

### Developer Portal
Documentation site powered by Fumadocs at `/developer`:
- **Configuration**: `source.config.ts` defines MDX processing with Twoslash support
- **Content**: MDX files in `content/docs/` organised by category (api, examples, changelog)
- **Features**: Interactive API documentation with TypeScript code examples, syntax highlighting with Twoslash

### API Routes
RESTful API endpoints under `/api/cpf/` provide programmatic access to CPF calculations:
- **Calculation**: `/calculate`, `/calculate/batch`, `/projection`
- **Age Groups**: `/age-groups`, `/age-group/find`, `/age/from-birthdate`
- **Income Ceiling**: `/ceiling`, `/ceiling/timeline`
- **Interest Rates**: `/interest-rates`, `/interest-rates/smra`, `/interest-rates/trend`
- **Investment**: `/investment-comparison`

### Key Components
- **CPF Income Ceiling Timeline** (`cpf-income-ceiling-timeline.tsx`): Interactive timeline showing the progression of CPF income ceiling changes from pre-2023 to final 2026 ceiling

## Design System

See `SKILL.md` for complete design system documentation.

### Key Principles

- **Aesthetic:** Refined Financial Simplicity (slate, teal)
- **Colours:** OKLCH colour space via CSS variables in `globals.css`
- **Typography:** Geist font family

### Spacing Rules (IMPORTANT)

- **NO margin-top or padding-top** - Use `mb-*`, `pb-*`, and `gap-*` instead
- **Prefer `gap-*`** over `space-*` for flex/grid containers
- Elements push content down, not pull from above

### Tailwind CSS v4 Conventions

- Use `size-*` instead of `w-* h-*` for square elements
- Use `gap-*` instead of `space-*` where possible
- CSS-first configuration in `globals.css` with `@theme inline`

### Off-Limits

- **DO NOT modify** `src/components/ui/*` - shadcn/ui components are styled via CSS variables
- **Dark mode** - Currently out of scope, do not modify `.dark` selector styles
