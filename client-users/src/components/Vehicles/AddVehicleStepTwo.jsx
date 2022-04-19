import React, { Fragment } from "react";

const AddVehicleStepTwo = (props) => {
  const { vehicleData, vehicleState, setVehicleState, onChange } = props;
  const { color, paper, description, isChecked } = vehicleState;

  //console.log(checked);
  return (
    <Fragment>
      <div className='form-group'>
        <label htmlFor='color'>Color</label>
        <select
          name='color'
          value={color}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select color </option>
          {vehicleData &&
            vehicleData.colors.map((color, index) => (
              <option key={color.name + index} vlaue={color.name}>
                {color.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='paper'>Paper</label>
        <select
          name='paper'
          value={paper}
          className='form-control'
          onChange={onChange}
        >
          <option value='0'> Select paper </option>
          {vehicleData &&
            vehicleData.papers.map((paper, index) => (
              <option key={paper.name + index} vlaue={paper.name}>
                {paper.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='option'>Options</label>
        <div>
          {vehicleData &&
            vehicleData.options.map((option, index) => {
              return (
                <div
                  key={option.name + index}
                  className='form-check form-check-inline col-lg-4 mr-0  col-sm-6 col-xs-12'
                >
                  <span className='input-check form-check-input'>
                    <span className='input-check__body'>
                      <input
                        className='input-check__input'
                        checked={isChecked[option.name]}
                        type='checkbox'
                        name='options'
                        value={option.name}
                        onChange={(e) => {
                          setVehicleState({
                            ...vehicleState,
                            isChecked: {
                              ...vehicleState.isChecked,
                              [e.target.value]: e.target.checked ? true : false,
                            },
                            options:
                              e.target.checked === true
                                ? [...vehicleState.options, e.target.value]
                                : vehicleState.options.filter(
                                    (ch) => ch !== e.target.value,
                                  ),
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

                  <label className='form-check-label' htmlFor='defaultCheck1'>
                    {option.name}
                  </label>
                </div>
              );
            })}
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          type='text'
          className='form-control'
          placeholder='description'
          name='description'
          value={description}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
};

export default AddVehicleStepTwo;
