import { SET_LOADING, RESET_LOADING } from "../actions/types/loadingTypes";

const initialSate = {
  loading: false,
};

const loadingReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case RESET_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default loadingReducer;
