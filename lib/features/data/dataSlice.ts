import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldStoreInput: false,
  monthlyGrossIncome: 0,
  birthDate: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action) => ({ ...state, ...action.payload }),
    resetData: () => initialState,
  },
});

export const { updateData, resetData } = dataSlice.actions;

export default dataSlice.reducer;
