export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  `https://${process.env.VERCEL_URL}` ||
  `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const title = "SimplyCPF";
export const description =
  "Calculate your CPF contributions with the latest income ceiling changes. Your CPF, simplified.";

export const CPF_TYPE = {
  OA: "OA",
  SA: "SA",
  MA: "MA",
};

export const DEFAULT_EMPLOYEE_CONTRIBUTION_RATE: number = 0.2;
export const DEFAULT_EMPLOYER_CONTRIBUTION_RATE: number = 0.17;
