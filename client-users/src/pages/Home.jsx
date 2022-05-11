import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";

import { getAllVehicles } from "../actions/vehicleAction";

import BlockFinder from "../components/blocks/BlockFinder";
import LoadingSpiner from "../components/shared/LoadingSpiner";
import BlockSpace from "../components/blocks/BlockSpace";
import BlockProductsCarousel from "../components/blocks/BlockProductsCarousel";

const Home = (props) => {
  const { getAllVehicles, vehicles, error, loading } = props;
  const intl = useIntl();

  useEffect(() => {
    getAllVehicles();
  }, []);

  if (vehicles === null && !loading) {
    return null;
  }

  if (vehicles === null && loading) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <BlockFinder />
      <BlockSpace layout='divider-nl' />
      {vehicles === null && error !== null && error.type === "server" && (
        <div className='d-flex.align-items-center.justify-content-center h-80'>
          Ooops something went wrong...
        </div>
      )}
      {vehicles && vehicles.lenght <= 0 && (
        <div className='d-flex.align-items-center.justify-content-center h-80'>
          No data to display
        </div>
      )}
      <BlockProductsCarousel
        blockTitle={intl.formatMessage({ id: "HEADER_FEATURED_PRODUCTS" })}
        loading={loading}
        products={vehicles}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  vehicles: state.vehicleState.vehicles,
  error: state.errorState.error,
  loading: state.loadingState.loading,
});

const actions = {
  getAllVehicles,
};

export default connect(mapStateToProps, actions)(Home);
