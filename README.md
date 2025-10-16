# CPF Contribution Estimator

[![Version](https://img.shields.io/github/package-json/v/ruchernchong/cpf-contribution-estimator)](https://github.com/ruchernchong/cpf-contribution-estimator)
[![License](https://img.shields.io/github/license/ruchernchong/cpf-contribution-estimator)](LICENSE)

A modern web application to calculate CPF (Central Provident Fund) contributions following the 2023 income ceiling changes announced by Singapore's Ministry of Finance.

**[🚀 Live Calculator](https://cpf-contribution-estimator.vercel.app)**

## Features

- 💰 **Accurate CPF Calculations** - Compute employee and employer contributions based on current income ceilings
- 📊 **Age-Based Rates** - Automatic calculation using 8 different age brackets with varying contribution rates
- 📈 **Distribution Breakdown** - View OA (Ordinary Account), SA (Special Account), and MA (MediSave Account) allocations
- 📱 **Mobile-Friendly** - Responsive design with PWA support for offline use
- 🎨 **Modern UI** - Built with Next.js 16, React 19, and Tailwind CSS
- ⚡ **Fast & Lightweight** - Optimized performance with Turbopack

## About

Following the Ministry of Finance announcement at Singapore Budget 2023 (13 February 2023), the CPF income ceiling is being progressively raised:
- **Previous ceiling**: $6,000 (before September 2023)
- **Current target**: $8,000 (by September 2026)

This calculator helps Singaporeans estimate their take-home income after CPF contributions under the new ceiling structure while accounting for age-specific contribution and distribution rates.

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Beta) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x with shadcn/ui components
- **State Management**: [Jotai](https://jotai.org/)
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Testing**: Vitest with React Testing Library
- **Linting**: Biome
- **Package Manager**: pnpm 10.x
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10.x (automatically enforced via `packageManager` field)

### Installation

```bash
# Clone the repository
git clone https://github.com/ruchernchong/cpf-contribution-estimator.git
cd cpf-contribution-estimator

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Project Structure

```
src/
├── app/              # Next.js app directory (routes, layouts)
├── atoms/            # Jotai state atoms
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── data/            # CPF age groups and rates data
├── lib/             # Core calculation logic
├── types/           # TypeScript type definitions
├── constants/       # CPF income ceilings by year
└── utils/           # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- CPF contribution rates and distribution data sourced from [Singapore's CPF Board](https://www.cpf.gov.sg/)
- Income ceiling changes based on Ministry of Finance Budget 2023 announcements

## Author

**Ru Chern Chong**

---

Made with ❤️ for the Singapore community
