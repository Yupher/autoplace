import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { ReactComponent as Heart32Svg } from "../../svg/heart-32.svg";
import { ReactComponent as Person32Svg } from "../../svg/person-32.svg";
import { ReactComponent as Plus32Svg } from "../../svg/plus-32.svg";

import Topbar from "./Topbar";
import MainMenu from "./MainMenu";
import Logo from "./Logo";

import Indicator from "./Indicator";
import AccountMenu from "./AccountMenu";

const Header = ({ wishlist, user }) => {
  const wishlistCounter = wishlist && wishlist.products.length;
  const accountIndicatorLabel = user ? (
    user.firstname
  ) : (
    <FormattedMessage id='TEXT_INDICATOR_ACCOUNT_LABEL' />
  );
  const accountIndicatorValue = (
    <FormattedMessage id='TEXT_INDICATOR_ACCOUNT_VALUE' />
  );
  const accountIndicatorCtrl = useRef(null);
  return (
    <div className='header'>
      <div className='header__megamenu-area megamenu-area' />
      <React.Fragment>
        <div className='header__topbar-start-bg' />
        <div className='header__topbar-start'>
          <Topbar layout='spaceship-start' />
        </div>
        <div className='header__topbar-end-bg' />
        <div className='header__topbar-end'>
          <Topbar layout='spaceship-end' />
        </div>
      </React.Fragment>
      <div className='header__navbar'>
        <div className=' header__navbar-menu'>
          <MainMenu />
        </div>
      </div>
      <Logo className='header__logo' />
      {/* <div className='header__search'>
        <Search />
      </div> */}
      <div className='header__indicators'>
        <Indicator
          href='/favorite'
          icon={<Heart32Svg />}
          counter={wishlistCounter}
        />

        <Indicator href='/add-product' icon={<Plus32Svg />} />

        <Indicator
          href='/account'
          icon={<Person32Svg />}
          label={accountIndicatorLabel}
          value={accountIndicatorValue}
          trigger='click'
          controllerRef={accountIndicatorCtrl}
        >
          <AccountMenu
            onCloseMenu={() => accountIndicatorCtrl.current?.close()}
          />
        </Indicator>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  wishlist: state.wishlistState.wishlist,
  user: state.authState.user,
});
export default connect(mapStateToProps)(Header);
