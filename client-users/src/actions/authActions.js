import axios from "axios";
import { SET_CUURRENT_USER, LOGOUT_USER } from "./types/authTypes";
import { SET_ERROR, CLEAR_ERROR } from "./types/errorTypes";
import { SET_LOADING, RESET_LOADING } from "./types/loadingTypes";

export const setLoading = () => (dispatch) => dispatch({ type: SET_LOADING });

export const resetLoading = () => (dispatch) => {
  return dispatch({ type: RESET_LOADING });
};
