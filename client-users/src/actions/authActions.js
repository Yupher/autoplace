import axios from "axios";
import { SET_CURRENT_USER, LOGOUT_USER } from "./types/authTypes";
import { SET_ERROR, CLEAR_ERROR } from "./types/errorTypes";
import { SET_LOADING, RESET_LOADING } from "./types/loadingTypes";

import setAuthToken from "../utils/setAuthToken";

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("/api/v1/users/login", userData);
    dispatch(resetLoading());
    const { token, user } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return dispatch({ type: SET_CURRENT_USER, payload: user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const signup = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/v1/users/signup", userData);
    dispatch(resetLoading());
    const { token, user } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return dispatch({ type: SET_CURRENT_USER, payload: user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const confirmEmail = (code) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("/api/v1/users/confirmEmail", { code });
    dispatch(resetLoading());

    dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);

    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const resendEmail = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.get("/api/v1/users/resendEmail");
    dispatch(resetLoading());
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);

    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const googleAuth = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("/api/v1/users/google/login");
    dispatch(resetLoading());
    const { token, user } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return dispatch({ type: SET_CURRENT_USER, payload: user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};
export const facebookAuth = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("/api/v1/users/facebook/login");
    dispatch(resetLoading());
    const { token, user } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return dispatch({ type: SET_CURRENT_USER, payload: user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const updateUser = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/v1/users/update/me", userData);
    dispatch(resetLoading());

    return dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const updatePassword = (passwordData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/v1/users/update/password", passwordData);
    dispatch(resetLoading());

    return dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/v1/users/forgetPassword", { email });
    dispatch(resetLoading());

    return res.data.status;
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const resetPassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("/api/v1/users/resetPassword", passwordData);
    dispatch(resetLoading());
    const { token, user } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return dispatch({ type: SET_CURRENT_USER, payload: user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/v1/users/loaduser");
    dispatch(resetLoading());
    return dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
  } catch (error) {
    dispatch(resetLoading());
    console.log(error.response.data);
    dispatch({ type: LOGOUT_USER });
    localStorage.removeItem("jwtToken");
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  return dispatch({ type: LOGOUT_USER });
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const resetLoading = () => {
  return { type: RESET_LOADING };
};
