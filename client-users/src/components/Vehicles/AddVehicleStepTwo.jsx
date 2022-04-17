import React, { Fragment, useState } from "react";

const AddVehicleStepTwo = (props) => {
  const { vehicleData, vehicleState, onChange } = props;
  const { color, paper, options, description } = vehicleState;
  const [checked, setChecked] = useState(false);

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
            vehicleData.options.map((option, index) => (
              <div
                key={option.name + index}
                className='form-check form-check-inline col-lg-4 col-sm-6'
              >
                <input
                  className='form-check-input '
                  type='checkbox'
                  name='options'
                  value={option.name}
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                    onChange();
                  }}
                />
                <label className='form-check-label' htmlFor='defaultCheck1'>
                  {option.name}
                </label>
              </div>
            ))}
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
