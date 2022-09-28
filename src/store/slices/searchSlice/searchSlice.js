import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch(state, { payload }) {
      return payload;
    },
  },
});

export const selectSearch = (state) => state.search;

export const { setSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
