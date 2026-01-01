import { BASE_URL, description, title } from "@/config";

export const revalidate = false;

const llmsTxt = `# ${title}

> ${description}

SimplyCPF is a Next.js application that calculates CPF (Central Provident Fund) contributions following Singapore's 2023 Budget changes to income ceilings. The income ceiling increases gradually from S$6,000 (pre-September 2023) to S$8,000 (January 2026).

## Main Pages

- [Home](${BASE_URL}): CPF contribution calculator with interactive visualisation
- [Calculator](${BASE_URL}/calculator): Full-featured CPF calculator with age-based contribution rates
- [Interest Rates](${BASE_URL}/interest-rates): CPF interest rates and historical trends
- [Investments](${BASE_URL}/investments): Investment comparison tools
- [About](${BASE_URL}/about): Information about the application

## Developer Portal

- [Developer Portal](${BASE_URL}/developer): API documentation for integrating CPF calculations into applications
- [Getting Started](${BASE_URL}/developer/getting-started): Quick start guide for using the API
- [API Reference](${BASE_URL}/developer/api): Complete API documentation

## API Endpoints

- [Calculate CPF](${BASE_URL}/api/cpf/calculate): Calculate CPF contributions for a given income
- [Batch Calculate](${BASE_URL}/api/cpf/calculate/batch): Calculate CPF contributions for multiple incomes
- [Projection](${BASE_URL}/api/cpf/projection): Multi-year CPF contribution projections
- [Age Groups](${BASE_URL}/api/cpf/age-groups): Get all CPF contribution rates by age bracket
- [Find Age Group](${BASE_URL}/api/cpf/age-group/find): Find the applicable age group for a specific age
- [Age from Birthdate](${BASE_URL}/api/cpf/age/from-birthdate): Calculate age from a birthdate
- [Income Ceiling](${BASE_URL}/api/cpf/ceiling): Get current CPF income ceiling
- [Ceiling Timeline](${BASE_URL}/api/cpf/ceiling/timeline): Get historical income ceiling changes
- [Interest Rates](${BASE_URL}/api/cpf/interest-rates): Get current CPF interest rates
- [SMRA Calculator](${BASE_URL}/api/cpf/interest-rates/smra): Calculate Special/MediSave/Retirement Account weighted average
- [Interest Rate Trend](${BASE_URL}/api/cpf/interest-rates/trend): Get historical interest rate data
- [Investment Comparison](${BASE_URL}/api/cpf/investment-comparison): Compare investment scenarios

## Optional

- [LLMs Full Text](${BASE_URL}/docs/llms-full.txt): Complete documentation content in plain text format for LLMs
`;

export async function GET(): Promise<Response> {
  return new Response(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
