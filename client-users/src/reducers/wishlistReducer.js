import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST,
} from "../actions/types/wishlistTypes";

const initialState = {
  wishlist: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST:
      console.log(action.payload);
      return { ...state, wishlist: action.payload };
    case ADD_TO_WISHLIST:
      return { ...state, wishlist: action.payload };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          products: state.wishlist && [
            ...state.wishlist.products.filter(
              (product) => product._id !== action.payload,
            ),
          ],
        },
      };
    default:
      return state;
  }
};

export default wishlistReducer;
