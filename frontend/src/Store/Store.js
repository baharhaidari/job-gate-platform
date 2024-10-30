import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import jobOffersReducer from "./Reducers/JobReducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobOffersReducer: jobOffersReducer,
  },
});

export default store;
