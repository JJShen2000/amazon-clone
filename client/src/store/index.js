import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./modules/searchResultStore";
import userReducer from "./modules/userStore";

const store = configureStore({
  reducer: {
    searchResult: searchResultReducer,
    user: userReducer,
  },
});

export default store;
