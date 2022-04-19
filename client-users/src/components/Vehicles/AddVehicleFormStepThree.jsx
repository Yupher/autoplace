import React, { Fragment } from "react";

const AddVehicleFormStepThree = (props) => {
  const { vehicleData, vehicleState, setVehicleState, onChange } = props;
  const { price, offerType, exchange } = vehicleState;
  return (
    <Fragment>
      <div className='form-group'>
        <label htmlFor='price'>Price</label>
        <input
          type='text'
          className='form-control'
          placeholder='Price'
          name='price'
          value={price}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='offerType'>Type of the offer</label>
        <select
          name='offerType'
          value={offerType}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select an offer </option>
          <option value='fixed'> Fixed </option>
          <option value='negotiable'> Negotiable </option>
          <option value='offered'> Offered </option>
        </select>
      </div>
      <div className='form-group'>
        <div className='form-check'>
          <span className='input-check form-check-input'>
            <span className='input-check__body'>
              <input
                checked={exchange}
                className='input-check__input'
                type='checkbox'
                onChange={(e) => {
                  setVehicleState({
                    ...vehicleState,
                    exchange: e.target.checked,
                  });
                }}
              />
              <span className='input-check__box' />
              <span className='input-check__icon'>
                <svg width='9px' height='7px'>
                  <path d='M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z' />
                </svg>
              </span>
            </span>
          </span>
          <label className='form-check-label' htmlFor='exchange'>
            Accept exchange
          </label>
        </div>
      </div>
    </Fragment>
  );
};

export default AddVehicleFormStepThree;
