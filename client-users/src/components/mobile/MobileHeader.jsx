import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ReactComponent as Menu18x14Svg } from "../../svg/menu-18x14.svg";
import { ReactComponent as Car20Svg } from "../../svg/car-20.svg";
import { ReactComponent as Search20Svg } from "../../svg/search-20.svg";
import { ReactComponent as Cross20Svg } from "../../svg/cross-20.svg";
import { ReactComponent as Person20Svg } from "../../svg/person-20.svg";
import { ReactComponent as Heart20Svg } from "../../svg/heart-20.svg";
import MobileLogo from "./MobileLogo";
import { OPEN_MENU } from "../../actions/types/MobileMenuTypes";
import { connect } from "react-redux";

const MobileHeader = ({ wishlist }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const onOpenMenuClick = () => dispatch({ type: OPEN_MENU });
  const onOpenSearchClick = () => setSearchOpen(!searchOpen);

  const onSearchChange = (e) => setSearch(e.target.value);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const searchPlaceholder = intl.formatMessage({
    id: "INPUT_SEARCH_PLACEHOLDER",
  });

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
          {/* <div
            className={classNames("mobile-header__search mobile-search", {
              "mobile-header__search--open": searchOpen,
            })}
          >
            <form className='mobile-search__body' onSubmit={onSearchSubmit}>
              <label className='sr-only' htmlFor='mobile-site-search'>
                <FormattedMessage id='INPUT_SEARCH_LABEL' />
              </label>
              <input
                name='search'
                value={search}
                onChange={onSearchChange}
                type='text'
                id='mobile-site-search'
                className='mobile-search__input'
                placeholder={searchPlaceholder}
              />
              <button type='button' className='mobile-search__vehicle-picker'>
                <Car20Svg />
                <span className='mobile-search__vehicle-picker-label'>
                  <FormattedMessage id='BUTTON_SEARCH_SELECT_VEHICLE_MOBILE' />
                </span>
              </button>
              <button
                type='submit'
                className='mobile-search__button mobile-search__button--search'
              >
                <Search20Svg />
              </button>
              <button
                type='button'
                className='mobile-search__button mobile-search__button--close'
                onClick={onOpenSearchClick}
              >
                <Cross20Svg />
              </button>
              <div className='mobile-search__field' />
            </form>
          </div> */}
          <div className='mobile-header__indicators'>
            {/* <div className='mobile-indicator d-md-none'>
              <button
                type='button'
                className='mobile-indicator__button'
                onClick={onOpenSearchClick}
              >
                <span className='mobile-indicator__icon'>
                  <Search20Svg />
                </span>
              </button>
            </div> */}
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
