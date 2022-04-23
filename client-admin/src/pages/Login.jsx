import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import { login } from "../actions/authActions";
import { CLEAR_ERROR, SET_ERROR } from "../actions/types/errorTypes";

import BlockSpace from "../components/blocks/BlockSpace";
import PageTitle from "../components/shared/PageTitle";

import { validateEmail, validatePassword } from "../utils/userInputValidation";

const Login = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { user, loading, login, error } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (error) {
      dispatch({ type: CLEAR_ERROR });
    }

    //  validation

    if (validateEmail(userData.email)) {
      return dispatch({
        type: SET_ERROR,
        payload: validateEmail(userData.email),
      });
    }

    if (validatePassword(userData.password)) {
      return dispatch({
        type: SET_ERROR,
        payload: validatePassword(userData.password),
      });
    }

    login(userData);
  };

  const onChange = (e) => {
    if (error) {
      dispatch({ type: CLEAR_ERROR });
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <PageTitle>{intl.formatMessage({ id: "HEADER_REGISTER" })}</PageTitle>

      <BlockSpace layout='after-header' />
      <div className='block'>
        <div className='container container--max--lg'>
          <div className='row'>
            <div className='col-md-8 d-flex mt-4 mt-md-0'>
              <div className='card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4'>
                <div className='card-body card-body--padding--2'>
                  <h3 className='card-title'>
                    <FormattedMessage id='HEADER_LOGIN' />
                  </h3>
                  <form onSubmit={onSubmit}>
                    {error && (
                      <div className='alert alert-sm alert-danger'>
                        {/* <FormattedMessage id={error.message} /> */}
                        <p>{error.message}</p>
                      </div>
                    )}

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
                        value={userData.email}
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
                        value={userData.password}
                        onChange={onChange}
                      />
                      <div className='invalid-feedback'>
                        {error && error.type === "required" && (
                          <FormattedMessage id='ERROR_FORM_REQUIRED' />
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
                        <FormattedMessage id='BUTTON_LOGIN' />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.authState.user,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

const actions = { login };

export default connect(mapStateToProps, actions)(Login);
