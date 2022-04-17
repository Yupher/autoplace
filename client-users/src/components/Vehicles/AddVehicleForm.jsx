import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, connect } from "react-redux";

import { CLEAR_ERROR } from "../../actions/types/errorTypes";
import { getVihecleData } from "../../actions/vehicleAction";

import AddVehicleStepOne from "./AddVehicleStepOne";
import AddVehicleStepTwo from "./AddVehicleStepTwo";

const AddVehicleForm = (props) => {
  const { loading, vehicleData, getVihecleData, error } = props;
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [vehicleState, setVehicleState] = useState({
    year: "",
    brand: "",
    model: "",
    color: "",
    energy: "",
    options: [],
    paper: "",
    transmission: "",
    description: "",
    kilometrage: "",
    photos: [],
  });

  useEffect(() => {
    getVihecleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleState);
    console.log("add-vehicle");
  };

  const onChange = (e) => {
    dispatch({ type: CLEAR_ERROR });
    let checked = e.target.checked;
    console.log(checked);
    setVehicleState({
      ...vehicleState,
      [e.target.name]: e.target.value,
      //   options: [...vehicleState.options, e.target.checked && e.target.value],
    });
  };

  const onClickNext = (e) => {
    if (error) {
      return;
    }
    setStep(step + 1);
  };
  const onClickPrev = (e) => {
    if (step <= 1) {
      return;
    }
    setStep(step - 1);
  };

  const MultiStepForm = () => {
    switch (step) {
      case 1:
        return (
          <AddVehicleStepOne
            vehicleData={vehicleData}
            vehicleState={vehicleState}
            onChange={onChange}
          />
        );
      case 2:
        return (
          <AddVehicleStepTwo
            vehicleData={vehicleData}
            vehicleState={vehicleState}
            onChange={onChange}
          />
        );
      default:
        return;
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <MultiStepForm />
      <div className='form-group play-buttons'>
        <button
          type='button'
          onClick={onClickPrev}
          className={classNames(
            "btn",
            "btn-primary",
            "mt-3",
            "btn-vehicle-prev",
            {
              "d-none": step <= 1,
            },
          )}
        >
          Prev
        </button>
        <button
          type='button'
          onClick={onClickNext}
          className={classNames(
            "btn",
            "btn-primary",
            "mt-3",
            "btn-vehicle-next",
            {
              "ml-auto": step <= 1,
            },
          )}
        >
          next
        </button>
        <button
          type='submit'
          className={classNames(
            "btn",
            "btn-primary",
            "mt-3",
            "btn-vehicle-submit",
            {
              "btn-loading": loading,
            },
          )}
        >
          Add vehicle
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  vehicleData: state.vehicleState.vehicleData,
  error: state.errorState.error,
});

export default connect(mapStateToProps, { getVihecleData })(AddVehicleForm);
