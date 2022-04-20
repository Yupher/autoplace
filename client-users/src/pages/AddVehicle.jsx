import React, { Fragment } from "react";

import AddVehicleForm from "../components/Vehicles/AddVehicleForm";
import BlockSpace from "../components/blocks/BlockSpace";

const AddVehicle = () => {
  return (
    <Fragment>
      <BlockSpace layout='after-header' />
      <div className='container mb-2'>
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
    </Fragment>
  );
};

export default AddVehicle;
