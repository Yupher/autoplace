import { combineReducers } from "redux";
import languagesReducer from "./languagesReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  languages: languagesReducer,
  authState: authReducer,
  errorState: errorReducer,
  loadingState: loadingReducer,
});
