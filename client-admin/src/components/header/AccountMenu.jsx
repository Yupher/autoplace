import React, { useState } from "react";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { CLEAR_ERROR, SET_ERROR } from "../../actions/types/errorTypes";

import { logout } from "../../actions/authActions";

const AccountMenu = (props) => {
  const { onCloseMenu } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { user, loading, error, logout } = props;

  const onLogout = () => logout();

  return (
    <div className='account-menu'>
      {user && (
        <React.Fragment>
          <Link
            to='/dashboard'
            className='account-menu__user'
            onClick={onCloseMenu}
          >
            <div className='account-menu__user-avatar'>
              <img
                src={
                  user.photo === "default.jpg"
                    ? "/images/avatars/avatar-1.jpg"
                    : user.photo
                }
                alt='profile'
              />
            </div>
            <div className=' account-menu__user-info'>
              <div className=' account-menu__user-name'>
                {`${user.firstname} ${user.lastname}`}
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
  logout,
};

export default connect(mapStateToProps, actions)(AccountMenu);
