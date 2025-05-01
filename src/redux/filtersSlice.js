import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload.toLowerCase();
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
