import { createSlice } from "@reduxjs/toolkit";
import { findAgeGroup } from "../../findAgeGroup";

const MIN_AGE: number = 0;
const defaultAgeGroup = findAgeGroup(MIN_AGE);

const initialState = {
  age: MIN_AGE,
  ageGroup: defaultAgeGroup,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, actions) => ({ ...state, ...actions.payload }),
  },
});

export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
