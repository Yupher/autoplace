import { GET_VEHICLE_DATA } from "./types/vehicleTypes";
import { SET_LOADING, RESET_LOADING } from "./types/loadingTypes";
import { SET_ERROR, CLEAR_ERROR } from "./types/errorTypes";

import brandsAndModels from "../data/vehicle-data/brandsAndModels.json";
import colors from "../data/vehicle-data/colors.json";
import energies from "../data/vehicle-data/energies.json";
import options from "../data/vehicle-data/options.json";
import papers from "../data/vehicle-data/papers.json";
import transmissions from "../data/vehicle-data/transmissions.json";

// loading vehicle data from json i tried loadin normal without async it fails
const loadVehicleData = () => {
  return {
    brandsAndModels: [...brandsAndModels],
    colors: [...colors],
    energies: [...energies],
    options: [...options],
    papers: [...papers],
    transmissions: [...transmissions],
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
