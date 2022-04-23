import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types/authTypes";

const initialSate = {
  user: undefined,
};

const authReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};
export default authReducer;
