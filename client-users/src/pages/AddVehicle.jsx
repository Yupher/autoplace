import React, { Fragment } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AddVehicleForm from "../components/Vehicles/AddVehicleForm";
import BlockSpace from "../components/blocks/BlockSpace";
import PageTitle from "../components/shared/PageTitle";

const AddVehicle = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "ADD_VEHICLE_TITLE" })}</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container mb-2'>
        <div className='col-10 mr-0 ml-5'>
          <div className='card'>
            <div className='card-header'>
              <h5>
                <FormattedMessage id='ADD_VEHICLE_TITLE' />
              </h5>
            </div>
            <div className='card-divider' />
            <div className='card-body card-body--padding-2'>
              <AddVehicleForm />
            </div>
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

export default AddVehicle;
