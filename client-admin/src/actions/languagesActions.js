import { SET_CURRENT_LANGUAGE } from "./types/languagesTypes";
import locales from "../i18n/loclaes";

export const setLanguage = (locale) => (dispatch) => {
  localStorage.setItem("language", JSON.stringify(locale));
  return dispatch({ type: SET_CURRENT_LANGUAGE, payload: locale });
};
