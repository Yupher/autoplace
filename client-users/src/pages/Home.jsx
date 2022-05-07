import React, { Fragment, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { getAllVehicles } from "../actions/vehicleAction";

import BlockFinder from "../components/blocks/BlockFinder";
import LoadingSpiner from "../components/shared/LoadingSpiner";

const Home = (props) => {
  const { getAllVehicles, vehicles } = props;

  useEffect(() => {
    getAllVehicles();
  }, []);

  if (vehicles === null) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <BlockFinder />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  vehicles: state.vehicleState.vehicles,
});

const actions = {
  getAllVehicles,
};

export default connect(mapStateToProps, actions)(Home);
