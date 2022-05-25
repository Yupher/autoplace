import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import { useDispatch, connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { CLEAR_ERROR, SET_ERROR } from "../../actions/types/errorTypes";
import { resetPassword } from "../../actions/authActions";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../utils/userInputValidation";

const ResetPasswordInput = ({
  error,
  user,
  setStep,
  loading,
  resetPassword,
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [passwordData, setPasswordData] = useState({
    code: "",
    password: "",
    passwordConfirm: "",
  });
  const onChange = (e) => {
    if (error) {
      dispatch({ type: CLEAR_ERROR });
    }
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: CLEAR_ERROR });
    if (!passwordData.code) {
      return dispatch({
        type: SET_ERROR,
        payload: { type: "code", message: "Invalid" },
      });
    }
    if (validatePassword(passwordData.password)) {
      return dispatch({
        type: SET_ERROR,
        payload: validatePassword(passwordData.password),
      });
    }

    if (
      validatePasswordConfirm(
        passwordData.passwordConfirm,
        passwordData.password,
      )
    ) {
      return dispatch({
        type: SET_ERROR,
        payload: validatePasswordConfirm(
          passwordData.passwordConfirm,
          passwordData.password,
        ),
      });
    }
    resetPassword(passwordData);
    if (user) {
      return <Navigate to='/' />;
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <p>
        <FormattedMessage id='CODE_SENT' />
      </p>
      <div className='form-group'>
        <label htmlFor='confirmaton-code'>
          <FormattedMessage id='INPUT_CONFIRMATION_CODE' />
        </label>
        <input
          id='confirmation-code'
          type='text'
          className={classNames("form-control", {
            "is-invalid": error && error.message,
          })}
          placeholder='xxxx'
          name='code'
          value={passwordData.code}
          onChange={onChange}
        />
        <div className='invalid-feedback'>
          {error && error.type === "required" && (
            <FormattedMessage id='ERROR_FORM_REQUIRED' />
          )}
          {error && error.type === "code" && (
            //   <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
            <p>{error.message}</p>
          )}
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='signup-password'>
          <FormattedMessage id='INPUT_PASSWORD_LABEL' />
        </label>
        <input
          id='signup-password'
          type='password'
          className={classNames("form-control", {
            "is-invalid": error && error.message,
          })}
          placeholder={intl.formatMessage({
            id: "INPUT_PASSWORD_PLACEHOLDER",
          })}
          name='password'
          value={passwordData.password}
          onChange={onChange}
        />
        <div className='invalid-feedback'>
          {error && error.type === "required" && (
            <FormattedMessage id='ERROR_FORM_REQUIRED' />
          )}
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='signup-confirm'>
          <FormattedMessage id='INPUT_PASSWORD_REPEAT_LABEL' />
        </label>
        <input
          id='signup-confirm'
          type='password'
          className={classNames("form-control", {
            "is-invalid": error && error.message,
          })}
          placeholder={intl.formatMessage({
            id: "INPUT_PASSWORD_REPEAT_PLACEHOLDER",
          })}
          name='passwordConfirm'
          value={passwordData.passwordConfirm}
          onChange={onChange}
        />
        <div className='invalid-feedback'>
          {error && error.type === "required" && (
            <FormattedMessage id='ERROR_FORM_REQUIRED' />
          )}
          {error && error.type === "match" && (
            <FormattedMessage id='ERROR_FORM_PASSWORD_DOES_NOT_MATCH' />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className='form-group mb-0'>
          <button
            type='button'
            onClick={() => setStep(1)}
            className='btn btn-primary mt-3'
          >
            {/* <FormattedMessage id='BUTTON_REGISTER' /> */}
            Back
          </button>
        </div>

        <div className='form-group mb-0'>
          <button
            type='submit'
            className={classNames("btn", "btn-primary", "mt-3", {
              "btn-loading": loading,
            })}
          >
            <FormattedMessage id='BUTTON_SUBMIT' />
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  error: state.errorState.error,
  user: state.authState.user,
});

export default connect(mapStateToProps, { resetPassword })(ResetPasswordInput);
