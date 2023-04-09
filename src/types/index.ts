export type IncomeOptions = {
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
