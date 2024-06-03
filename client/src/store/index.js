import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./modules/searchResultStore";

const store = configureStore({
  reducer: {
    searchResult: searchResultReducer,
  },
});

export default store;
