# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# CPF Contribution Estimator - Development Guide

A Next.js application that calculates CPF (Central Provident Fund) contributions following Singapore's 2023 Budget changes to income ceilings.

## Build and Test Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linting
- `pnpm test` - Run tests once with coverage
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## Code Style
- **Formatting**: Biome for formatting with 2-space indentation and double quotes
- **Imports**: Organized via Biome, absolute imports with `@/` prefix
- **TypeScript**: Full type coverage, avoid `any` and `as` casts
- **State Management**: Jotai atoms for global state
- **Component Structure**: Functional components with explicit return types
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Try/catch with helpful error messages, use optional chaining
- **Testing**: Vitest with descriptive test names, use `it.each` for data variations

## Architecture

### State Management (Jotai Atoms)
State is managed through Jotai atoms in `src/atoms/`:
- `resultAtom.ts` - Core derived atoms for CPF calculations (`contributionResultAtom`, `distributionResultsAtom`)
- `userAtom.ts` - User-specific data (age, birth date)
- `userInputAtom.ts` - Form input state
- `settingAtom.ts` - User settings (income, storage preferences)
- `incomeCeilingAtom.ts` - Income ceiling data by year
- `yearSliderAtom.ts` - Year slider state

### CPF Calculation Logic
The core calculation happens in `src/lib/calculateCpfContribution.ts`:
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
- Custom components use Radix UI primitives with Tailwind CSS
- Charts use Recharts library for data visualization
