import { createSlice } from "@reduxjs/toolkit";
import { findLatestIncomeCeilingDate } from "../../findLatestIncomeCeilingDate";
import { ageGroups } from "../../../data";

const latestIncomeCeilingDate = findLatestIncomeCeilingDate();

const initialState = {
  contributionRate: ageGroups[0].contributionRate,
  latestIncomeCeiling: "",
  latestIncomeCeilingDate,
};

const incomeCeilingSlice = createSlice({
  name: "incomeCeiling",
  initialState,
  reducers: {
    updateIncomeCeiling: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { updateIncomeCeiling } = incomeCeilingSlice.actions;
export default incomeCeilingSlice.reducer;
