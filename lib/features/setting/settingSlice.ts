import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldStoreInput: false,
  monthlyGrossIncome: 0,
  birthDate: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateSetting: (state, action) => ({ ...state, ...action.payload }),
    resetSetting: () => initialState,
  },
});

export const { updateSetting, resetSetting } = settingSlice.actions;
export default settingSlice.reducer;
