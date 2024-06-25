import { createSlice } from "@reduxjs/toolkit";

const searchResultStore = createSlice({
  name: "searchResult",
  initialState: {
    meta: {},
    filters: [],
    products: [],
  },
  reducers: {
    setMeta: (state, action) => {
      state.meta = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setMeta, setFilters, setProducts } = searchResultStore.actions;
const searchResultReducer = searchResultStore.reducer;
export default searchResultReducer;
