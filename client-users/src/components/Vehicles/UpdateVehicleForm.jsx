import React, { useState, useEffect, Fragment } from "react";
import classNames from "classnames";
import { useDispatch, connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { CLEAR_ERROR, SET_ERROR } from "../../actions/types/errorTypes";
import { getVihecleData, updateVehicle } from "../../actions/vehicleAction";
import addVehicleValidation from "../../utils/addVehicleValidation";
import AddVehicleFormStepSix from "./AddVehicleFormStepSix";
import AddVehicleFormStepFive from "./AddVehicleFormStepFive";
import AddVehicleFormStepFour from "./AddVehicleFormStepFour";
import AddVehicleFormStepThree from "./AddVehicleFormStepThree";
import AddVehicleStepTwo from "./AddVehicleStepTwo";
import AddVehicleStepOne from "./AddVehicleStepOne";

const UpdateVehicleForm = (props) => {
  const {
    loading,
    user,
    vehicleData,
    getVihecleData,
    updateVehicle,
    error,
    currentVehicle,
  } = props;
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [vehicleState, setVehicleState] = useState({
    year: currentVehicle.year,
    brand: currentVehicle.brand,
    model: currentVehicle.model,
    color: currentVehicle.color,
    energy: currentVehicle.energy,
    options: [...currentVehicle.options],
    accident: currentVehicle.accident,
    accidentDescription: currentVehicle.accidentDescription,
    paper: currentVehicle.paper,
    transmission: currentVehicle.transmission,
    description: currentVehicle.description,
    kilometrage: currentVehicle.kilometrage,
    isChecked: {
      Climatisation: currentVehicle.options.includes("Climatisation"),
      "Toit ouvrant": currentVehicle.options.includes("Toit ouvrant"),
      ABS: currentVehicle.options.includes("ABS"),
      ESP: currentVehicle.options.includes("ESP"),
      "Radar de recul": currentVehicle.options.includes("Radar de recul"),
      "Direction assisstee": currentVehicle.options.includes(
        "Direction assisstee",
      ),
      "Retroviseurs electriques": currentVehicle.options.includes(
        "Retroviseurs electriques",
      ),
      "Phares antibrouillard": currentVehicle.options.includes(
        "Phares antibrouillard",
      ),
      "Radio CD": currentVehicle.options.includes("Radio CD"),
      Alarme: currentVehicle.options.includes("Alarme"),
      "Phares xenon": currentVehicle.options.includes("Phares xenon"),
      "Jantes Alliage": currentVehicle.options.includes("Jantes Alliage"),
      "Feux du jour": currentVehicle.options.includes("Feux du jour"),
      "Vitres electriques":
        currentVehicle.options.includes("Vitres electriques"),
    },
    photos: [...currentVehicle.images.map((p) => p.secure_url)],
    price: currentVehicle.price,
    offerType: currentVehicle.offerType,
    exchange: currentVehicle.exchange,
    wilaya: currentVehicle.wilaya,
    commune: currentVehicle.commune,
    email: currentVehicle.email,
    phone: currentVehicle.phone,
    displayPhone: currentVehicle.displayPhone,
  });

  useEffect(() => {
    if (!vehicleData) {
      getVihecleData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleData]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    dispatch({ type: CLEAR_ERROR });
    updateVehicle(vehicleState, currentVehicle._id);
    if (!error) {
      return <Navigate to='/dashbord' />;
    }
  };

  const onChange = (e) => {
    dispatch({ type: CLEAR_ERROR });
    setVehicleState({ ...vehicleState, [e.target.name]: e.target.value });
  };

  const onClickNext = () => {
    let message = addVehicleValidation(vehicleState, step);
    if (message) {
      dispatch({
        type: SET_ERROR,
        payload: {
          type: "required",
          message: message,
        },
      });
      return;
    }
    setStep(step + 1);
  };
  const onClickPrev = () => {
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
        return null;
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        {error && (
          <div className='alert alert-sm alert-danger'>
            {/* <FormattedMessage id={error.message} /> */}
            <p>{error.message}</p>
          </div>
        )}
        {MultiStepForm()}
        <div className='form-group play-buttons'>
          <button
            type='button'
            disabled={loading}
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
            disabled={loading || error}
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
            disabled={error}
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
            Submit
          </button>
        </div>
      </form>
    </Fragment>
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
  updateVehicle,
};

export default connect(mapStateToProps, actions)(UpdateVehicleForm);
