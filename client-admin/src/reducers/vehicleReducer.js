import {
  GET_VEHICLE_DATA,
  GET_ALL_VEHICLES,
  GET_VEHICLE,
} from "../actions/types/vehicleTypes";

const initialSate = {
  vehicleData: null,
  vehicles: null,
  currentVehicle: null,
};

const vehicleReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_VEHICLE_DATA:
      return { ...state, vehicleData: action.payload };
    case GET_ALL_VEHICLES:
      return { ...state, vehicles: action.payload };
    case GET_VEHICLE:
      return { ...state, currentVehicle: action.payload };
    default:
      return state;
  }
};
export default vehicleReducer;
