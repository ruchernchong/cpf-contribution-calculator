import { useAtomValue } from "jotai";
import {
  contributionResultAtom,
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/result-atom";

export const useCalculatedCpf = () => {
  const contributionResult = useAtomValue(contributionResultAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);

  return {
    contributionResult,
    distributionResults,
    hasCpfContribution,
  };
};
