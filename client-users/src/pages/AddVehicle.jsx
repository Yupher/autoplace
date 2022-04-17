import React from "react";

import AddVehicleForm from "../components/Vehicles/AddVehicleForm";

const AddVehicle = () => {
  return (
    <div className='container'>
      <div className='col-10 mr-0 ml-5'>
        <div className='card'>
          <div className='card-header'>
            <h5>Add a vehicle</h5>
          </div>
          <div className='card-divider' />
          <div className='card-body card-body--padding-2'>
            <AddVehicleForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
