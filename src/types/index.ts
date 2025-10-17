// Interface for contribution rates by employee and employer
export interface ContributionRate {
  employee: number;
  employer: number;
}

// Type for distribution rates based on string keys
export type DistributionRate = Record<string, number>;

// Interface for defining age groups and associated rates
export interface AgeGroup {
  description: string;
  minAge: number;
  maxAge?: number;
  contributionRate: ContributionRate;
  distributionRate: DistributionRate;
}

// Type for CPF income ceiling based on string keys
export type CPFIncomeCeiling = Record<string, number>;

// Interface for income options based on age and ceiling usage
export interface IncomeOptions {
  age?: number;
  ageGroup?: AgeGroup;
  useCeilingBeforeSep2023?: boolean;
}

// Interface for contribution result detail
export interface ContributionResult {
  totalContribution: number;
  employer: number;
  employee: number;
}

// Interface for individual distribution result
export interface DistributionResult {
  name: string;
  value: number;
}

// Interface for the computed result summary
export interface ComputedResult {
  contribution: ContributionResult;
  distribution: DistributionRate;
  afterCpfContribution: number;
}

// Interface for FAQ structure
export interface FAQ {
  question: string;
  answer: string;
}

// Interface for user settings
export interface Settings {
  shouldStoreInput: boolean;
  monthlyGrossIncome: number;
  birthDate: string;
}

// Interface for quarterly CPF interest rates
export interface QuarterlyRate {
  quarter: string;
  oa: number;
  sa: number;
  ma: number;
  ra: number;
}

// Interface for monthly SGS yield data
export interface MonthlyYield {
  month: string;
  yield: number;
}

// Interface for interest rate trend data (computed)
export interface InterestRateTrendData {
  month: string;
  sgsYield: number;
  peggedRate: number;
  actualRate: number;
}
