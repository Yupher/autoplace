import { OPEN_MENU, CLOSE_MENU } from "../actions/types/MobileMenuTypes";

const initialState = {
  isOpen: false,
};
const mobileMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, isOpen: true };
    case CLOSE_MENU:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default mobileMenuReducer;
