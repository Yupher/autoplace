import { combineReducers } from "redux";
import languagesReducer from "./languagesReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";
import mobileMenuReducer from "./mobileMenuReducer";

export default combineReducers({
  languages: languagesReducer,
  mobileMenu: mobileMenuReducer,
  authState: authReducer,
  errorState: errorReducer,
  loadingState: loadingReducer,
});
