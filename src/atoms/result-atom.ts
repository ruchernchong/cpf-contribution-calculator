import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { calculateCpfContribution } from "@/lib/calculate-cpf-contribution";
import type {
  CeilingComparisonResult,
  ComputedResult,
  DistributionResult,
} from "@/types";
import { latestIncomeCeilingDateAtom } from "./income-ceiling-atom";
import { settingsAtom } from "./setting-atom";
import { ageGroupAtom } from "./user-atom";

export const contributionResultAtom = atom<ComputedResult>((get) =>
  calculateCpfContribution(
    get(settingsAtom).monthlyGrossIncome,
    get(latestIncomeCeilingDateAtom),
    { ageGroup: get(ageGroupAtom) },
  ),
);

export const distributionResultsAtom = atom<DistributionResult[]>((get) =>
  Object.entries(get(contributionResultAtom).distribution).map(
    ([name, value]) => ({
      name,
      value,
    }),
  ),
);

export const hasCpfContributionAtom = selectAtom(
  contributionResultAtom,
  (selector) => selector.contribution.totalContribution > 0,
);

export const ceilingComparisonAtom = atom<CeilingComparisonResult>((get) => {
  const currentResult = get(contributionResultAtom);
  const income = get(settingsAtom).monthlyGrossIncome;
  const ageGroup = get(ageGroupAtom);
  const currentCeilingDate = get(latestIncomeCeilingDateAtom);

  const preSept2023Result = calculateCpfContribution(
    income,
    currentCeilingDate,
    { ageGroup, useCeilingBeforeSep2023: true },
  );

  return {
    preSept2023Result,
    takeHomePayDifference:
      preSept2023Result.afterCpfContribution -
      currentResult.afterCpfContribution,
    totalContributionDifference:
      preSept2023Result.contribution.totalContribution -
      currentResult.contribution.totalContribution,
  };
});
