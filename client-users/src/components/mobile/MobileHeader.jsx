import React from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { ReactComponent as Menu18x14Svg } from "../../svg/menu-18x14.svg";

import { ReactComponent as Person20Svg } from "../../svg/person-20.svg";
import { ReactComponent as Heart20Svg } from "../../svg/heart-20.svg";
import MobileLogo from "./MobileLogo";
import { OPEN_MENU } from "../../actions/types/MobileMenuTypes";
import { connect } from "react-redux";

const MobileHeader = ({ wishlist }) => {
  const dispatch = useDispatch();

  const onOpenMenuClick = () => dispatch({ type: OPEN_MENU });

  return (
    <div className='mobile-header'>
      <div className='container'>
        <div className='mobile-header__body'>
          <button
            className='mobile-header__menu-button'
            type='button'
            onClick={onOpenMenuClick}
          >
            <Menu18x14Svg />
          </button>
          <Link to='/' className='mobile-header__logo '>
            <MobileLogo />
          </Link>
          <div className='mobile-header__indicators'>
            <div className='mobile-indicator d-none d-md-block d-sm-none'>
              <Link to='/dashboard' className='mobile-indicator__button'>
                <span className='mobile-indicator__icon'>
                  <Person20Svg />
                </span>
              </Link>
            </div>
            <div className='mobile-indicator d-none d-md-block d-sm-none'>
              <Link to='/favorite' className='mobile-indicator__button'>
                <span className='mobile-indicator__icon'>
                  <Heart20Svg />

                  {wishlist && (
                    <span className='mobile-indicator__counter'>
                      {wishlist && wishlist.products.length}
                    </span>
                  )}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wishlist: state.wishlistState.wishlist,
});

export default connect(mapStateToProps)(MobileHeader);
