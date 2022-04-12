import React, { useState } from "react";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { CLEAR_ERROR, SET_ERROR } from "../../actions/types/errorTypes";

import {
  login,
  logout,
  facebookAuth,
  googleAuth,
} from "../../actions/authActions";
import {
  validateEmail,
  validatePassword,
} from "../../utils/userInputValidation";

const AccountMenu = (props) => {
  const { onCloseMenu } = props;
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const intl = useIntl();
  const dispatch = useDispatch();
  const { user, loading, error, login, facebookAuth, googleAuth, logout } =
    props;

  const onChange = (e) => {
    if (error) {
      dispatch({ type: CLEAR_ERROR });
    }

    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // to do validation
    validateEmail(userLogin.email) &&
      dispatch({ type: SET_ERROR, payload: validateEmail(userLogin.email) });
    validatePassword(userLogin.password) &&
      dispatch({
        type: SET_ERROR,
        payload: validatePassword(userLogin.password),
      });

    login(userLogin);
  };
  const facebookLogin = () => {
    error && dispatch({ type: CLEAR_ERROR });
    facebookAuth();
  };
  const googleLogin = () => {
    error && dispatch({ type: CLEAR_ERROR });
    googleAuth();
  };
  const onLogout = () => logout();

  return (
    <div className='account-menu' onSubmit={onSubmit}>
      {user === null && (
        <form className='account-menu__form'>
          <div className='account-menu__form-title'>
            <FormattedMessage id='HEADER_LOGIN_TO_YOUR_ACCOUNT' />
          </div>

          {error && error.type === "server" && (
            <div className='alert alert-xs alert-danger mt-n2'>
              <FormattedMessage id={error.message} />
            </div>
          )}

          <div className='form-group'>
            <label htmlFor='header-signin-email' className='sr-only'>
              <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />
            </label>
            <input
              id='header-signin-email'
              type='email'
              className={classNames("form-control", "form-control-sm", {
                "is-invalid": error && error.message,
              })}
              placeholder='customer@example.com'
              name='email'
              value={userLogin.email}
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
            <label htmlFor='header-signin-password' className='sr-only'>
              <FormattedMessage id='INPUT_PASSWORD_LABEL' />
            </label>
            <div
              className={classNames("account-menu__form-forgot", {
                "is-invalid": error && error.message,
              })}
            >
              <input
                id='header-signin-password'
                type='password'
                className={classNames("form-control", "form-control-sm", {
                  "is-invalid": error && error.message,
                })}
                placeholder={intl.formatMessage({
                  id: "INPUT_PASSWORD_PLACEHOLDER",
                })}
                name='password'
                value={userLogin.password}
                onChange={onChange}
              />
              <Link
                to='/reset-password'
                className='account-menu__form-forgot-link'
              >
                <FormattedMessage id='LINK_FORGOT' />
              </Link>
            </div>
            <div className='invalid-feedback'>
              {error && error.type === "required" && (
                <FormattedMessage id='ERROR_FORM_REQUIRED' />
              )}
            </div>
          </div>

          <div className='form-group account-menu__form-button'>
            <button
              type='submit'
              className={classNames("btn", "btn-primary", "btn-block", {
                "btn-loading": loading,
              })}
            >
              <FormattedMessage id='BUTTON_LOGIN' />
            </button>
          </div>

          <div className='form-group account-menu__form-button'>
            <button
              type='button'
              className={classNames(
                "btn",
                "btn-primary",
                "btn-google",
                "btn-block",
                {
                  "btn-loading": loading,
                },
              )}
              onClick={googleLogin}
            >
              Google
            </button>
          </div>
          <div className='form-group account-menu__form-button'>
            <button
              type='button'
              onClick={facebookLogin}
              className={classNames(
                "btn",
                "btn-primary",
                "btn-facebook",
                "btn-block",
                {
                  "btn-loading": loading,
                },
              )}
            >
              Facebook
            </button>
          </div>

          <div className='account-menu__form-link'>
            <Link to='/register' onClick={onCloseMenu}>
              <FormattedMessage id='LINK_CREATE_ACCOUNT' />
            </Link>
          </div>
        </form>
      )}
      {user !== null && (
        <React.Fragment>
          <Link
            to='/dashboard'
            className='account-menu__user'
            onClick={onCloseMenu}
          >
            <div className='account-menu__user-avatar'>
              <img src={user.avatar} alt='profile' />
            </div>
            <div className=' account-menu__user-info'>
              <div className=' account-menu__user-name'>
                {`${user.firstName} ${user.lastName}`}
              </div>
              <div className=' account-menu__user-email'>{user.email}</div>
            </div>
          </Link>
          <div className='account-menu__divider' />
          <ul className='account-menu__links'>
            <li>
              <Link to='/add-product' onClick={onCloseMenu}>
                <FormattedMessage id='LINK_ACCOUNT_GARAGE' />
              </Link>
            </li>
            <li>
              <Link to='/profile' onClick={onCloseMenu}>
                <FormattedMessage id='LINK_ACCOUNT_PROFILE' />
              </Link>
            </li>
            <li>
              <Link to='/' onClick={onCloseMenu}>
                <FormattedMessage id='LINK_ACCOUNT_ORDERS' />
              </Link>
            </li>
            <li>
              <Link to='/' onClick={onCloseMenu}>
                <FormattedMessage id='LINK_ACCOUNT_ADDRESSES' />
              </Link>
            </li>
          </ul>
          <div className='account-menu__divider' />
          <ul className='account-menu__links'>
            <li>
              <button type='button' onClick={onLogout}>
                <FormattedMessage id='LINK_ACCOUNT_LOGOUT' />
              </button>
            </li>
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authState.user,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

const actions = {
  login,
  logout,
  facebookAuth,
  googleAuth,
};

export default connect(mapStateToProps, actions)(AccountMenu);
