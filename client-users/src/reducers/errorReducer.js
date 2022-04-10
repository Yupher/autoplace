import { SET_ERROR, CLEAR_ERROR } from "../actions/types/errorTypes";

const initialSate = {
  error: null,
};

const errorReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
export default errorReducer;
