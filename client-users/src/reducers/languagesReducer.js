import locales from "../i18n/loclaes";
import { SET_CURRENT_LANGUAGE } from "../actions/types/languagesTypes";
const initialState = {
  locales,
  currentLocale: null,
};

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default languagesReducer;
