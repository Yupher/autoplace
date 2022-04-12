import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import { signup } from "../actions/authActions";

import BlockSpace from "../components/blocks/BlockSpace";
import PageTitle from "../components/shared/PageTitle";

const Register = (props) => {
  const intl = useIntl();
  const { user, loading, signup, error } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [userData, setUserData] = useState({
    Firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onSubmit = (e) => {};
  const onChange = (e) => {};

  return (
    <React.Fragment>
      <PageTitle>{intl.formatMessage({ id: "HEADER_REGISTER" })}</PageTitle>

      <BlockSpace layout='after-header' />
      <div className='block'>
        <div className='col-md-6 d-flex mt-4 mt-md-0'>
          <div className='card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4'>
            <div className='card-body card-body--padding--2'>
              <h3 className='card-title'>
                <FormattedMessage id='HEADER_REGISTER' />
              </h3>
              <form onSubmit={onSubmit}>
                {error && error.type === "server" && (
                  <div className='alert alert-sm alert-danger'>
                    <FormattedMessage id={error.message} />
                  </div>
                )}
                <div className='form-group'>
                  <label htmlFor='signup-firstname'>
                    <FormattedMessage id='INPUT_FIRSTNAME_LABEL' />
                  </label>
                  <input
                    id='signup-firstname'
                    type='text'
                    className={classNames("form-control", {
                      "is-invalid": error && error.type === "firstname",
                    })}
                    placeholder={intl.formatMessage({
                      id: "INPUT_FIRSTNAME_LABEL",
                    })}
                    name='firstname'
                    value={userData.firstname}
                    onChange={onChange}
                  />
                  <div className='invalid-feedback'>
                    {error && error.type === "required" && (
                      <FormattedMessage id='ERROR_FORM_REQUIRED' />
                    )}
                    {error && error.type === "firstname" && (
                      <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                    )}
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='signup-lastname'>
                    <FormattedMessage id='INPUT_LASTNAME_LABEL' />
                  </label>
                  <input
                    id='signup-lastname'
                    type='text'
                    className={classNames("form-control", {
                      "is-invalid": error && error.type === "lastname",
                    })}
                    placeholder={intl.formatMessage({
                      id: "INPUT_LASTNAME_LABEL",
                    })}
                    name='lastname'
                    value={userData.lastname}
                    onChange={onChange}
                  />
                  <div className='invalid-feedback'>
                    {error && error.type === "required" && (
                      <FormattedMessage id='ERROR_FORM_REQUIRED' />
                    )}
                    {error && error.type === "lastname" && (
                      <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                    )}
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='signup-email'>
                    <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />
                  </label>
                  <input
                    id='signup-email'
                    type='email'
                    className={classNames("form-control", {
                      "is-invalid": error && error.type === "email",
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
                      "is-invalid": error && error.type === "password",
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
                <div className='form-group'>
                  <label htmlFor='signup-confirm'>
                    <FormattedMessage id='INPUT_PASSWORD_REPEAT_LABEL' />
                  </label>
                  <input
                    id='signup-confirm'
                    type='password'
                    className={classNames("form-control", {
                      "is-invalid": error && error.type === "passwordConfirm",
                    })}
                    placeholder={intl.formatMessage({
                      id: "INPUT_PASSWORD_REPEAT_PLACEHOLDER",
                    })}
                    name='passwordConfirm'
                    value={userData.passwordConfirm}
                    onChange={onChange}
                  />
                  <div className='invalid-feedback'>
                    {error && error.passwordConfirm.type === "required" && (
                      <FormattedMessage id='ERROR_FORM_REQUIRED' />
                    )}
                    {error && error.passwordConfirm.type === "match" && (
                      <FormattedMessage id='ERROR_FORM_PASSWORD_DOES_NOT_MATCH' />
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
                    <FormattedMessage id='BUTTON_REGISTER' />
                  </button>
                </div>
              </form>
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

const actions = { signup };

export default connect(mapStateToProps, { actions })(Register);
