import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import { CLOSE_MENU } from "../../actions/types/MobileMenuTypes";

import { logout } from "../../actions/authActions";

import { ReactComponent as Plus20Svg } from "../../svg/plus-20.svg";
import { ReactComponent as Heart20Svg } from "../../svg/heart-20.svg";
import { ReactComponent as Person20Svg } from "../../svg/person-20.svg";
import { ReactComponent as Logout20Svg } from "../../svg/logout-20.svg";

const MobileMenuIndicators = (props) => {
  const { user, logout, wishlist } = props;

  const dispatch = useDispatch();
  const mobileMenuClose = () => {
    dispatch({ type: CLOSE_MENU });
  };

  const wishlistCounter = wishlist && wishlist.products.length;

  return (
    <div className='mobile-menu__indicators'>
      <Link
        to='/favorite'
        className='mobile-menu__indicator'
        onClick={mobileMenuClose}
      >
        <span className='mobile-menu__indicator-icon'>
          <Heart20Svg />
          {wishlistCounter > 0 && (
            <span className='mobile-menu__indicator-counter'>
              {wishlistCounter}
            </span>
          )}
        </span>
        <span className='mobile-menu__indicator-title'>
          <FormattedMessage id='TEXT_MOBILE_INDICATOR_WISHLIST' />
        </span>
      </Link>
      <Link
        to={user ? "/dashboard" : "/login"}
        className='mobile-menu__indicator'
        onClick={mobileMenuClose}
      >
        <span className='mobile-menu__indicator-icon'>
          <Person20Svg />
        </span>
        <span className='mobile-menu__indicator-title'>
          <FormattedMessage id='TEXT_MOBILE_INDICATOR_ACCOUNT' />
        </span>
      </Link>
      <Link
        to='/add-product'
        className='mobile-menu__indicator'
        onClick={mobileMenuClose}
      >
        <span className='mobile-menu__indicator-icon'>
          <Plus20Svg />
        </span>
        <span className='mobile-menu__indicator-title'>
          <FormattedMessage id='TEXT_MOBILE_INDICATOR_ADD_PRODUCT' />
        </span>
      </Link>
      {user && (
        <Link
          ref-attribute='logout'
          to='/'
          className='mobile-menu__indicator'
          onClick={() => {
            logout();
            dispatch({ type: CLOSE_MENU });
          }}
        >
          <span className='mobile-menu__indicator-icon'>
            <Logout20Svg />
          </span>
          <span className='mobile-menu__indicator-title'>
            <FormattedMessage id='TEXT_MOBILE_INDICATOR_LOGOUT' />
          </span>
        </Link>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.authState.user,
  wishlist: state.wishlistState.wishlist,
});
export default connect(mapStateToProps, { logout })(MobileMenuIndicators);
