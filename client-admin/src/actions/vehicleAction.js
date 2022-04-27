import axios from "axios";
import {
  GET_VEHICLE_DATA,
  GET_ALL_VEHICLES,
  GET_VEHICLE,
  ADD_VEHICLE,
  UPDATE_VEHICLE,
  DELETE_VEHICLE,
} from "./types/vehicleTypes";
import { SET_LOADING, RESET_LOADING } from "./types/loadingTypes";
import { SET_ERROR, CLEAR_ERROR } from "./types/errorTypes";

import brandsAndModels from "../data/vehicle-data/brandsAndModels.json";
import colors from "../data/vehicle-data/colors.json";
import energies from "../data/vehicle-data/energies.json";
import options from "../data/vehicle-data/options.json";
import papers from "../data/vehicle-data/papers.json";
import transmissions from "../data/vehicle-data/transmissions.json";
import wilayaAndCities from "../data/wilayaAndCities.json";

// loading vehicle data from json i tried loadin normal without async it fails
const loadVehicleData = () => {
  return {
    brandsAndModels: [...brandsAndModels],
    colors: [...colors],
    energies: [...energies],
    options: [...options],
    papers: [...papers],
    transmissions: [...transmissions],
    wilayaAndCities: [...wilayaAndCities],
  };
};

export const getVihecleData = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });

    const res = await loadVehicleData();

    dispatch({ type: GET_VEHICLE_DATA, payload: res });
    dispatch({ type: RESET_LOADING });
  } catch (error) {
    dispatch({ type: RESET_LOADING });
    console.log(error);
  }
};

export const addVehicle = (vehicleForm) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    let res = await axios.post("/api/v1/vehicles", vehicleForm);
    let { data } = res;
    dispatch({ type: RESET_LOADING });
    console.log(data);
    // dispatch({ type: ADD_VEHICLE, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const getAllVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    let res = await axios.get("/api/v1/vehicles");
    let { data } = res;
    dispatch({ type: RESET_LOADING });

    dispatch({ type: GET_ALL_VEHICLES, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};

export const getVehicle = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    let res = await axios.get(`/api/v1/vehicles/${id}`);
    let { data } = res.data;
    dispatch({ type: RESET_LOADING });

    dispatch({ type: GET_VEHICLE, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: SET_ERROR,
      payload: { type: "server", message: error.response.data.message },
    });
  }
};
