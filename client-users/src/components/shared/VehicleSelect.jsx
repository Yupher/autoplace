import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

const VehicleSelect = (props) => {
  const { className, vehicleState, onChange, vehicles, loading } = props;
  const rootClasses = classNames("vehicle-select", className);

  const items = [
    { year: [...new Set(vehicles.map((v) => v.year))] },
    { brand: [...new Set(vehicles.map((v) => v.brand))] },
    { model: [...new Set(vehicles.map((v) => v.model))] },
    { energy: [...new Set(vehicles.map((v) => v.energy))] },
  ];

  return (
    <div className={rootClasses}>
      <div className='vehicle-select__list'>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames("vehicle-select__item", {
                "vehicle-select__item--loading": loading,
              })}
            >
              <select
                className='vehicle-select__item-control'
                name={Object.keys(item)[0]}
                value={vehicleState[Object.keys(item)[0]]}
                onChange={onChange}
              >
                <option value=''>{Object.keys(item)[0]}</option>
                <option value=''>All</option>
                {item[Object.keys(item)[0]].map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className='vehicle-select__item-loader' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  vehicles: state.vehicleState.vehicles,
});

export default connect(mapStateToProps)(VehicleSelect);
