import React from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { logout } from "../../actions/authActions";

import Logo from "./Logo";

import DropdownLanguage from "./DropdownLanguage";

const Header = ({ logout, user }) => {
  const onLogout = () => logout();
  return (
    <div className='costum-header'>
      <Logo className='header__logo' />
      <div className='navbar-links'>
        {user && (
          <span>
            {user.firstname} {user.lastname}
          </span>
        )}
        {user && (
          <span onClick={onLogout} className='logout-button'>
            <FormattedMessage id='LOGOUT' />
          </span>
        )}
        <DropdownLanguage />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authState.user,
});

export default connect(mapStateToProps, { logout })(Header);
