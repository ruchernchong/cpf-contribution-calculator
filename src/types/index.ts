export type ContributionRate = {
  employee: number;
  employer: number;
};

export type DistributionRate = Record<string, number>;

export type AgeGroup = {
  description: string;
  min: number;
  max?: number;
  contributionRate: ContributionRate;
  distributionRate: DistributionRate;
};

export type CPFIncomeCeiling = {
  effectiveDate: string;
  ceiling: number;
};

export type IncomeOptions = {
  age?: number;
  ageGroup?: AgeGroup;
  useCeilingBeforeSep2023?: boolean;
};

export type ContributionResult = {
  total: number;
  employer: number;
  employee: number;
};

export type DistributionResult = {
  name: string;
  value: number;
};

export type ComputedResult = {
  contribution: ContributionResult;
  distribution: DistributionRate;
  afterCpfContribution: number;
};

export type FAQ = {
  question: string;
  answer: string;
};
