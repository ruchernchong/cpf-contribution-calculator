# CPF Contribution Estimator - Development Guide

## Build and Test Commands
- `pnpm dev` - Start development server with turbo
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm test` - Run tests with Vitest once with coverage (excludes React component tests)
- `pnpm coverage` - Run tests with Vitest in watch mode

## Code Style
- **Formatting**: Biome for formatting with 2-space indentation and double quotes
- **Imports**: Organized via Biome, absolute imports with `@/` prefix
- **TypeScript**: Full type coverage, avoid `any` and `as` casts
- **State Management**: Jotai atoms for global state
- **Component Structure**: Functional components with explicit return types
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Try/catch with helpful error messages, use optional chaining
- **Testing**: Vitest with descriptive test names, use `it.each` for data variations

Remember to run linting before commits to ensure code quality and consistency.
