import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getVehicle } from "../actions/vehicleAction";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import { connect } from "react-redux";

const VehiclePage = ({ loading, error, getVehicle, currentVehicle }) => {
  const { productId } = useParams();

  // console.log(typeof productId);

  useEffect(() => {
    getVehicle(productId);
  }, []);

  return (
    <Fragment>
      <PageTitle>Products</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container'>
        <div className='row'>
          <div className='col-12'>product layout</div>
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

export default connect(mapStateToProps, actions)(VehiclePage);
