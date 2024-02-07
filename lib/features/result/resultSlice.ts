import { createSlice } from "@reduxjs/toolkit";
import type { ComputedResult, DistributionResult } from "../../../types";

interface ResultState {
  contributionResult: ComputedResult | null;
  distributionResults: DistributionResult[] | null;
}

const initialState: ResultState = {
  contributionResult: null,
  distributionResults: null,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    updateResult: (state, actions) => ({ ...state, ...actions.payload }),
  },
});

export const { updateResult } = resultSlice.actions;
export default resultSlice.reducer;
