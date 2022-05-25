import React from "react";
import { FormattedMessage } from "react-intl";

const AddVehicleFormStepSix = (props) => {
  const { vehicleState } = props;
  return (
    <div className='block'>
      <h3 className='card-title'>
        <FormattedMessage id='TITLE_CONFIRM_ADD_VEHICLE' />
        Confirm your informations
      </h3>
      <p>
        <FormattedMessage id='TEXT_CONFIRM_ADD_VEHICLE' />
      </p>
    </div>
  );
};

export default AddVehicleFormStepSix;
