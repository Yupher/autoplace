import { GET_ALL_USERS, GET_USER } from "../actions/types/usersTypes";

const initialSate = {
  allUsers: null,
  user: null,
};

const usersReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
