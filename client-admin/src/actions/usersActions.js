import { GET_ALL_USERS, GET_USER } from "./types/usersTypes";
import { SET_ERROR, CLEAR_ERROR } from "./types/errorTypes";
import { SET_LOADING, RESET_LOADING } from "./types/loadingTypes";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/v1/users");
    dispatch(resetLoading());
    return dispatch({ type: GET_ALL_USERS, payload: res.data.data });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`/api/v1/users/${id}`);

    let { data } = res.data;
    dispatch(resetLoading());
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const resetLoading = () => {
  return { type: RESET_LOADING };
};
