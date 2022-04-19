import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, connect } from "react-redux";

import { CLEAR_ERROR } from "../../actions/types/errorTypes";
import { getVihecleData, addVehicle } from "../../actions/vehicleAction";

import AddVehicleStepOne from "./AddVehicleStepOne";
import AddVehicleStepTwo from "./AddVehicleStepTwo";
import AddVehicleFormStepThree from "./AddVehicleFormStepThree";
import AddVehicleFormStepFour from "./AddVehicleFormStepFour";
import AddVehicleFormStepFive from "./AddVehicleFormStepFive";
import AddVehicleFormStepSix from "./AddVehicleFormStepSix";

const AddVehicleForm = (props) => {
  const { loading, user, vehicleData, getVihecleData, addVehicle, error } =
    props;
  const dispatch = useDispatch();
  const [step, setStep] = useState(5);
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
    isChecked: {
      Climatisation: false,
      "Toit ouvrant": false,
      ABS: false,
      ESP: false,
      "Radar de recul": false,
      "Direction assisstee": false,
      "Retroviseurs electriques": false,
      "Phares antibrouillard": false,
      "Radio CD": false,
      Alarme: false,
      "Phares xenon": false,
      "Jantes Alliage": false,
      "Feux du jour": false,
      "Vitres electriques": false,
    },
    photos: [],
    price: "",
    offerType: "",
    exchange: false,
    wilaya: "",
    commune: "",
    email: "",
    phone: user && user.phone ? user.phone : "",
    displayPhone: true,
  });

  useEffect(() => {
    getVihecleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    addVehicle(vehicleState);
  };

  const onChange = (e) => {
    dispatch({ type: CLEAR_ERROR });
    setVehicleState({ ...vehicleState, [e.target.name]: e.target.value });
  };

  //console.log(vehicleState);

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
            setVehicleState={setVehicleState}
          />
        );
      case 3:
        return (
          <AddVehicleFormStepThree
            vehicleData={vehicleData}
            vehicleState={vehicleState}
            onChange={onChange}
            setVehicleState={setVehicleState}
          />
        );
      case 4:
        return (
          <AddVehicleFormStepFour
            vehicleData={vehicleData}
            vehicleState={vehicleState}
            onChange={onChange}
            setVehicleState={setVehicleState}
          />
        );
      case 5:
        return (
          <AddVehicleFormStepFive
            vehicleData={vehicleData}
            vehicleState={vehicleState}
            onChange={onChange}
            setVehicleState={setVehicleState}
          />
        );
      case 6:
        return (
          <AddVehicleFormStepSix
            vehicleData={vehicleData}
            vehicleState={vehicleState}
            onChange={onChange}
            setVehicleState={setVehicleState}
          />
        );
      default:
        return;
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {MultiStepForm()}
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
              "d-none": step > 5,
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
              "d-none": step < 6,
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
  user: state.authState.user,
});

const actions = {
  getVihecleData,
  addVehicle,
};

export default connect(mapStateToProps, actions)(AddVehicleForm);
