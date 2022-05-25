import React, { Fragment } from "react";
import { useIntl, FormattedMessage } from "react-intl";

const AddVehicleStepOne = (props) => {
  const { vehicleData, vehicleState, onChange } = props;
  const intl = useIntl();

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
        <label style={{ textTransform: "capitalize" }} htmlFor='year'>
          {intl.formatMessage({ id: "SELECT_YEAR" })}
        </label>
        <input
          type='text'
          className='form-control'
          placeholder={intl.formatMessage({ id: "SELECT_YEAR" })}
          name='year'
          value={year}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label style={{ textTransform: "capitalize" }} htmlFor='brand'>
          <FormattedMessage id='SELECT_BRAND' />
        </label>
        <select
          name='brand'
          value={brand}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'>
            <FormattedMessage id='INPUT_SELECT_BRAND' />
          </option>
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
        <label htmlFor='model'>
          <FormattedMessage id='SELECT_MODEL' />
        </label>
        <select
          name='model'
          value={model}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'>
            <FormattedMessage id='INPUT_SELECT_MODEL' />
          </option>
          {!brand ? (
            <option value='0'>
              <FormattedMessage id='SELECT_MODEL_ERROR' />
            </option>
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
        <label htmlFor='enery'>
          <FormattedMessage id='SELECT_ENERGY' />
        </label>
        <select
          name='energy'
          value={energy}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'>
            <FormattedMessage id='INPUT_SELECT_ENERGY' />
          </option>
          {vehicleData &&
            vehicleData.energies.map((energy, index) => (
              <option key={energy.name + index} vlaue={energy.name}>
                {energy.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='transmission'>
          <FormattedMessage id='SELECT_TRANSMISSION' />
        </label>
        <select
          name='transmission'
          value={transmission}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'>
            <FormattedMessage id='INPUT_SELECT_TRANSMISSION' />
          </option>
          {vehicleData &&
            vehicleData.transmissions.map((trans, index) => (
              <option key={trans.name + index} vlaue={trans.name}>
                {trans.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='kilometrage'>
          <FormattedMessage id='INPUT_KILOMETRAGE' />
        </label>
        <input
          type='text'
          className='form-control'
          placeholder={intl.formatMessage({ id: "INPUT_KILOMETRAGE" })}
          name='kilometrage'
          value={kilometrage}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
};

export default AddVehicleStepOne;
