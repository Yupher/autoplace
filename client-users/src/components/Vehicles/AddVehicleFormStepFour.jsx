import React, { Fragment } from "react";
import { useIntl, FormattedMessage } from "react-intl";

const AddVehicleFormStepFour = (props) => {
  const intl = useIntl();
  const { vehicleData, vehicleState, setVehicleState, email, onChange } = props;
  const { wilaya, commune, phone, displayPhone } = vehicleState;
  return (
    <Fragment>
      <div className='form-group'>
        <label htmlFor='wilaya'>
          <FormattedMessage id='LABEL_WILAYA' />
        </label>
        <select
          name='wilaya'
          value={wilaya}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'>
            <FormattedMessage id='SELECT_WILAYA' />
          </option>
          {vehicleData &&
            vehicleData.wilayaAndCities.map((wilayaAndCity) => (
              <option key={wilayaAndCity.id} vlaue={wilayaAndCity.name}>
                {wilayaAndCity.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='model'>
          <FormattedMessage id='LABEL_COMMUNE' />
        </label>
        <select
          name='commune'
          value={commune}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'>
            <FormattedMessage id='SELECT_COMMUNE' />
          </option>
          {!wilaya ? (
            <option value='0'>
              <FormattedMessage id='SELECT_COMMUNE_ERROR' />
            </option>
          ) : (
            vehicleData &&
            vehicleData.wilayaAndCities.map(
              (wilayaAndCity) =>
                wilayaAndCity.name === wilaya &&
                wilayaAndCity.cities.map((city) => (
                  <option key={city.id} vlaue={city.name}>
                    {city.name}
                  </option>
                )),
            )
          )}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='phone'>
          <FormattedMessage id='INPUT_PHONE_NUMBER_LABEL' />
        </label>
        <input
          type='text'
          className='form-control'
          placeholder={intl.formatMessage({ id: "INPUT_PHONE_NUMBER_LABEL" })}
          name='phone'
          value={phone}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>
          <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />
        </label>
        <input
          type='email'
          className='form-control'
          placeholder={intl.formatMessage({ id: "INPUT_EMAIL_ADDRESS_LABEL" })}
          name='email'
          value={email}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <div className='form-check'>
          <span className='input-check form-check-input'>
            <span className='input-check__body'>
              <input
                checked={displayPhone}
                className='input-check__input'
                type='checkbox'
                onChange={(e) => {
                  setVehicleState({
                    ...vehicleState,
                    displayPhone: e.target.checked,
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
          <label className='form-check-label' htmlFor='display phone'>
            <FormattedMessage id='DISPLAY_PHONE' />
          </label>
        </div>
      </div>
    </Fragment>
  );
};

export default AddVehicleFormStepFour;
