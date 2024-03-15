import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import type { ComputedResult, DistributionResult } from "../types";
import { calculateCpfContribution } from "../lib/calculateCpfContribution";
import { latestIncomeCeilingDateAtom } from "./incomeCeilingAtom";
import { settingsAtom } from "./settingAtom";
import { ageGroupAtom } from "./userAtom";

export const contributionResultAtom = atom<ComputedResult>((get) =>
  calculateCpfContribution(
    get(settingsAtom).monthlyGrossIncome,
    get(latestIncomeCeilingDateAtom),
    { ageGroup: get(ageGroupAtom) }
  )
);

export const distributionResultsAtom = atom<DistributionResult[]>((get) =>
  Object.entries(get(contributionResultAtom).distribution).map(
    ([name, value]) => ({
      name,
      value,
    })
  )
);

export const hasCpfContributionAtom = selectAtom(
  contributionResultAtom,
  (selector) => selector.contribution.totalContribution > 0
);
