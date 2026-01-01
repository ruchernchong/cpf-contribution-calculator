export const BASE_URL =
  `https://${process.env.VERCEL_URL}` || "http://localhost:3000";

export const title: string = "SimplyCPF";
export const description: string =
  "Calculate your CPF contributions with the latest income ceiling changes. Your CPF, simplified.";

export const CPF_TYPE = {
  OA: "OA",
  SA: "SA",
  MA: "MA",
};

export const DEFAULT_EMPLOYEE_CONTRIBUTION_RATE: number = 0.2;
export const DEFAULT_EMPLOYER_CONTRIBUTION_RATE: number = 0.17;
