import { createSlice } from "@reduxjs/toolkit";

const searchResultStore = createSlice({
  name: "searchResult",
  initialState: {
    filters: [],
    products: [],
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setFilters, setProducts } = searchResultStore.actions;
const searchResultReducer = searchResultStore.reducer;
export default searchResultReducer;
