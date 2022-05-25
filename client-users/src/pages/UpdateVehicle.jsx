import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getVehicle } from "../actions/vehicleAction";

import UpdateVehicleForm from "../components/Vehicles/UpdateVehicleForm";
import BlockSpace from "../components/blocks/BlockSpace";
import LoadingSpiner from "../components/shared/LoadingSpiner";
import PageTitle from "../components/shared/PageTitle";

const UpdateVehicle = ({ currentVehicle, getVehicle, loading, error }) => {
  const { productId } = useParams();
  useEffect(() => {
    getVehicle(productId);
  }, []);
  if (!currentVehicle && !loading) {
    return null;
  }
  if (loading) {
    return <LoadingSpiner />;
  }
  return (
    <Fragment>
      <PageTitle>Update vehicle</PageTitle>
      <BlockSpace layout='after-header' />
      {error && (
        <div className='alert alert-sm alert-danger'>
          <p>{error.message}</p>
        </div>
      )}
      <div className='container mb-2'>
        <div className='col-10 mr-0 ml-5'>
          <div className='card'>
            <div className='card-header'>
              <h5>Edit Vehicle</h5>
            </div>
            <div className='card-divider' />
            <div className='card-body card-body--padding-2'>
              <UpdateVehicleForm currentVehicle={currentVehicle} />
            </div>
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentVehicle: state.vehicleState.currentVehicle,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});
const actions = {
  getVehicle,
};
export default connect(mapStateToProps, actions)(UpdateVehicle);
