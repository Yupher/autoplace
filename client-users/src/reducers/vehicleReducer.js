import {
  GET_VEHICLE_DATA,
  GET_ALL_VEHICLES,
  GET_VEHICLE,
  GET_FILTRED_VEHICLES,
  CLEAR_FILTRED_VEHICLES,
  GET_MY_VEHICLE,
  DELETE_VEHICLE,
} from "../actions/types/vehicleTypes";

const initialSate = {
  vehicleData: null,
  vehicles: null,
  currentVehicle: null,
  myVehicles: null,
};

const vehicleReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_VEHICLE_DATA:
      return { ...state, vehicleData: action.payload };

    case GET_ALL_VEHICLES:
      return { ...state, vehicles: action.payload };
    case GET_VEHICLE:
      return { ...state, currentVehicle: action.payload };
    case GET_FILTRED_VEHICLES:
      return { ...state, vehicles: action.payload };

    case GET_MY_VEHICLE:
      return { ...state, myVehicles: action.payload };

    case DELETE_VEHICLE:
      let filteredVehicles = state.vehicles && [
        ...state.vehicles.filter((veh) => veh._id !== action.payload),
      ];
      let filteredMyVehicles = state.myVehicles && [
        ...state.myVehicles.filter((veh) => veh._id !== action.payload),
      ];

      console.log(filteredMyVehicles);
      return {
        ...state,
        currentVehicle: null,
        vehicles: filteredVehicles,
        myVehicles: filteredMyVehicles,
      };
    default:
      return state;
  }
};
export default vehicleReducer;
