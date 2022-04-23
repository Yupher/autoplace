import locales from "../i18n/loclaes";
import { SET_CURRENT_LANGUAGE } from "../actions/types/languagesTypes";

// get the default language
const storedLang = localStorage.getItem("language");
if (!storedLang) {
  const userLanguage =
    window.navigator.userLanguage || window.navigator.language;

  // this firefox support because navigator.language returns en-US in firefox
  const firefoxSupport = userLanguage.includes("-")
    ? userLanguage.split("-")[0]
    : userLanguage;

  locales.forEach((locale) => {
    if (locale.code === firefoxSupport) {
      localStorage.setItem("language", JSON.stringify(locale));
    }
  });
}

const initialState = {
  locales,
  currentLocale: JSON.parse(localStorage.getItem("language")),
};

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LANGUAGE:
      return { ...state, currentLocale: action.payload };
    default:
      return state;
  }
};

export default languagesReducer;
