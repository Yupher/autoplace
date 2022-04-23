import { GET_VEHICLE_DATA } from "../actions/types/vehicleTypes";

const initialSate = {
  vehicleData: null,
};

const vehicleReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_VEHICLE_DATA:
      return { ...state, vehicleData: action.payload };

    default:
      return state;
  }
};
export default vehicleReducer;
