export type ContributionRate = {
  employee: number;
  employer: number;
};

export type AgeGroup = {
  description: string;
  min?: number;
  max?: number;
  contributionRate: ContributionRate;
};

export type CPFIncomeCeiling = {
  year: string;
  ceiling: number;
  current?: boolean;
};

export type IncomeOptions = {
  ageGroup?: AgeGroup;
  useCeilingBeforeSep2023?: boolean;
};

export type ContributionResult = {
  contribution: {
    employee: number;
    employer: number;
    total: number;
  };
  afterCpfContribution: number;
};

export type FAQ = {
  question: string;
  answer: string;
};
