import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

const VehicleSelect = (props) => {
  const { className, vehicleState, onChange, vehicles, loading } = props;
  const rootClasses = classNames("vehicle-select", className);

  const items = [
    { year: [...vehicles.map((v) => v.year)] },
    { brand: [...vehicles.map((v) => v.brand)] },
    { model: [...vehicles.map((v) => v.model)] },
    { energy: [...vehicles.map((v) => v.energy)] },
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
                <option value='none'>{Object.keys(item)[0]}</option>
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
