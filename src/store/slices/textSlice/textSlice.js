import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: "",
  reducers: {
    toggleText(state, { payload }) {
      return payload;
    },
    resetText() {
      return "";
    },
  },
});

export const selectText = (state) => state.text;

export const { toggleText, resetText } = textSlice.actions;

export const textReducer = textSlice.reducer;
