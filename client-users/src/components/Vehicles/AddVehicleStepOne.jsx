import React, { Fragment } from "react";

const AddVehicleStepOne = (props) => {
  const { vehicleData, vehicleState, onChange } = props;

  const {
    year,
    brand,
    model,
    energy,
    transmission,
    color,
    options,
    paper,
    kilometrage,
    description,
  } = vehicleState;
  return (
    <Fragment>
      <div className='form-group'>
        <label htmlFor='year'>Year</label>
        <input
          type='text'
          className='form-control'
          placeholder='year'
          name='year'
          value={year}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>Brand</label>
        <select
          name='brand'
          value={brand}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select brand </option>
          {vehicleData &&
            vehicleData.brandsAndModels.map((brandAndModel, index) => (
              <option
                key={brandAndModel.name + index}
                vlaue={brandAndModel.name}
              >
                {brandAndModel.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='model'>Model</label>
        <select
          name='model'
          value={model}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select Select model </option>
          {!brand ? (
            <option value='0'>Please Select a brand</option>
          ) : (
            vehicleData &&
            vehicleData.brandsAndModels.map(
              (brandAndModel) =>
                brandAndModel.name === brand &&
                brandAndModel.models.map((model, index) => (
                  <option key={model + index} vlaue={model}>
                    {model}
                  </option>
                )),
            )
          )}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='enery'>Energy</label>
        <select
          name='energy'
          value={energy}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select energy </option>
          {vehicleData &&
            vehicleData.energies.map((energy, index) => (
              <option key={energy.name + index} vlaue={energy.name}>
                {energy.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='transmission'>Transmission</label>
        <select
          name='transmission'
          value={transmission}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select transmission </option>
          {vehicleData &&
            vehicleData.transmissions.map((trans, index) => (
              <option key={trans.name + index} vlaue={trans.name}>
                {trans.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='kilometrage'>Kilometrage</label>
        <input
          type='text'
          className='form-control'
          placeholder='Kilometrage'
          name='kilometrage'
          value={kilometrage}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
};

export default AddVehicleStepOne;
