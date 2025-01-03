export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://cpf-contribution-calculator.ruchern.xyz";

export const title: string = "CPF Contribution Calculator";
export const description: string =
  "A calculator to compute CPF contributions after the 2023 income ceiling changes following Ministry of Finance announcement at the Singapore Budget 2023";

export const CPF_TYPE = {
  OA: "OA",
  SA: "SA",
  MA: "MA",
};

export const DEFAULT_EMPLOYEE_CONTRIBUTION_RATE: number = 0.2;
export const DEFAULT_EMPLOYER_CONTRIBUTION_RATE: number = 0.17;
