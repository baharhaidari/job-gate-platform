import { combineReducers } from "redux";
import authReducer from "../auth/authSlice";
import jobOffersReducer from "./JobReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  jobOffersReducer: jobOffersReducer,
});

export default rootReducer;
