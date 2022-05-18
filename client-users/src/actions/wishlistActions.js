import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST,
} from "./types/wishlistTypes";
import { RESET_LOADING, SET_LOADING } from "./types/loadingTypes";
import axios from "axios";
import { SET_ERROR } from "./types/errorTypes";

export const getWishlist = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await axios.get("/api/v1/vehicles/wishlist");
    let { data } = res.data;
    //console.log(data);
    dispatch({ type: RESET_LOADING });
    dispatch({ type: GET_WISHLIST, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const addToWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await axios.post(`/api/v1/vehicles/wishlist/${id}`);
    let { data } = res.data;
    console.log(data);
    dispatch({ type: RESET_LOADING });
    dispatch({ type: ADD_TO_WISHLIST, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};
export const removeFromWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    let res = await axios.post(`/api/v1/vehicles/wishlist/${id}`);

    dispatch({ type: RESET_LOADING });
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: id });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};
