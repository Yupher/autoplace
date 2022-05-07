import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import Decor from "../shared/Decor";
import VehicleSelect from "../shared/VehicleSelect";

const BlockFinder = () => {
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
    console.log(vehicleState);
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
          {/* <FormattedMessage id='TEXT_BLOCK_FINDER_TITLE' /> */}
          Find A Vehicle With Our Advanced Search
        </div>
        <div className='block-finder__subtitle'>
          {/* <FormattedMessage id='TEXT_BLOCK_FINDER_SUBTITLE' /> */}
          Over hundred of thousands of vehicles
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

export default BlockFinder;
