import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { useDispatch, connect } from "react-redux";
import { CLEAR_ERROR, SET_ERROR } from "../../actions/types/errorTypes";
import { validateEmail } from "../../utils/userInputValidation";
import { forgetPassword } from "../../actions/authActions";

const ResetPaswordEmailInput = ({
  error,
  setStep,
  loading,
  forgetPassword,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    dispatch({ type: CLEAR_ERROR });
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      dispatch({ type: SET_ERROR, payload: validateEmail(email) });
    }
    let status = await forgetPassword(email);

    if (status === "success") {
      setStep(2);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='signup-email'>
          <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />
        </label>
        <input
          id='signup-email'
          type='email'
          className={classNames("form-control", {
            "is-invalid": error && error.message,
          })}
          placeholder='customer@example.com'
          name='email'
          value={email}
          onChange={onChange}
        />
        <div className='invalid-feedback'>
          {error && error.type === "required" && (
            <FormattedMessage id='ERROR_FORM_REQUIRED' />
          )}
          {error && error.type === "email" && (
            <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
          )}
        </div>
      </div>
      <div className='form-group mb-0'>
        <button
          type='submit'
          className={classNames("btn", "btn-primary", "mt-3", {
            "btn-loading": loading,
          })}
        >
          {/* <FormattedMessage id='BUTTON_LOGIN' /> */}
          Submit
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

export default connect(mapStateToProps, { forgetPassword })(
  ResetPaswordEmailInput,
);
