export interface ContributionRate {
  employee: number;
  employer: number;
}

export type DistributionRate = Record<string, number>;

export interface AgeGroup {
  description: string;
  minAge: number;
  maxAge?: number;
  contributionRate: ContributionRate;
  distributionRate: DistributionRate;
}

export interface CPFIncomeCeiling {
  effectiveDate: string;
  ceilingThreshold: number;
}

export interface IncomeOptions {
  age?: number;
  ageGroup?: AgeGroup;
  useCeilingBeforeSep2023?: boolean;
}

export interface ContributionResult {
  totalContribution: number;
  employer: number;
  employee: number;
}

export interface DistributionResult {
  name: string;
  value: number;
}

export interface ComputedResult {
  contribution: ContributionResult;
  distribution: DistributionRate;
  afterCpfContribution: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
