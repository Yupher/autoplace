import e from "cors";
import React, { Fragment } from "react";

const AddVehicleStepTwo = (props) => {
  const { vehicleData, vehicleState, setVehicleState, onChange } = props;
  const { color, paper, description } = vehicleState;

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
                  className='form-check form-check-inline col-lg-4 col-sm-6'
                >
                  <input
                    className='form-check-input '
                    checked={vehicleState.isChecked[option.name]}
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
          name='Description'
          value={description}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
};

export default AddVehicleStepTwo;
