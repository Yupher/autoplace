import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { filteredVehicles, getAllVehicles } from "../../actions/vehicleAction";

import Decor from "../shared/Decor";
import VehicleSelect from "../shared/VehicleSelect";

const BlockFinder = (props) => {
  const { filteredVehicles, getAllVehicles } = props;
  const [vehicleState, setVehicle] = useState({
    year: "",
    brand: "",
    model: "",
    energy: "",
  });
  const onChange = (e) => {
    setVehicle({ ...vehicleState, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let params = {};
    if (vehicleState.year !== "") {
      params.year = vehicleState.year;
    }
    if (vehicleState.brand !== "") {
      params.brand = vehicleState.brand;
    }
    if (vehicleState.model !== "") {
      params.model = vehicleState.model;
    }
    if (vehicleState.energy !== "") {
      params.energy = vehicleState.energy;
    }
    const queryString = new URLSearchParams(params).toString();
    e.preventDefault();
    console.log(queryString);
    if (!queryString) {
      return getAllVehicles();
    }
    console.log(vehicleState);
    filteredVehicles(queryString);
  };

  return (
    <div className='block block-finder'>
      <Decor className='block-finder__decor' type='bottom' />
      <div
        className='block-finder__image'
        style={{ backgroundImage: `url(${"/images/finder.jpg"})` }}
      />
      <div className='block-finder__body container container--max--xl'>
        <div className='block-finder__title'>
          <FormattedMessage id='TEXT_BLOCK_FINDER_TITLE' />
        </div>
        <div className='block-finder__subtitle'>
          <FormattedMessage id='TEXT_BLOCK_FINDER_SUBTITLE' />
        </div>
        <form className='block-finder__form' onSubmit={onSubmit}>
          <VehicleSelect
            className='block-finder__select'
            vehicleState={vehicleState}
            onChange={onChange}
          />

          <button className='block-finder__button' type='submit'>
            <FormattedMessage id='BUTTON_BLOCK_FINDER_SEARCH' />
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filtred: state.vehicleState.filtred,
  error: state.errorState.error,
  loading: state.loadingState.loading,
});
const actions = { filteredVehicles, getAllVehicles };

export default connect(mapStateToProps, actions)(BlockFinder);
