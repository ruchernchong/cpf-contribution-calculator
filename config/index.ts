export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://cpf-contribution-estimator.vercel.app";

export const title: string = "CPF Contribution Estimator";
export const description: string =
  "Calculate your CPF contributions after the 2023 income ceiling changes. Updated with the latest Ministry of Finance announcements from Singapore Budget 2023.";

export const CPF_TYPE = {
  OA: "OA",
  SA: "SA",
  MA: "MA",
};

export const DEFAULT_EMPLOYEE_CONTRIBUTION_RATE: number = 0.2;
export const DEFAULT_EMPLOYER_CONTRIBUTION_RATE: number = 0.17;
