import { SET_CUURRENT_USER, LOGOUT_USER } from "../actions/types/authTypes";

const initialSate = {
  user: null,
};

const authReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_CUURRENT_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};
export default authReducer;
