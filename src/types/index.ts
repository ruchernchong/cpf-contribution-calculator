export type ContributionRate = {
  employee: number;
  employer: number;
};

export type DistributionRate = {
  OA: number;
  SA: number;
  MA: number;
};

export type AgeGroup = {
  description: string;
  min: number;
  max?: number;
  contributionRate: ContributionRate;
  distributionRate: DistributionRate;
};

export type CPFIncomeCeiling = {
  year: string;
  ceiling: number;
  current?: boolean;
};

export type IncomeOptions = {
  age?: number;
  ageGroup?: AgeGroup;
  useCeilingBeforeSep2023?: boolean;
};

export type ContributionResult = {
  contribution: { total: number; employer: number; employee: number };
  distribution: { [key: string]: number };
  afterCpfContribution: number;
};

export type FAQ = {
  question: string;
  answer: string;
};
