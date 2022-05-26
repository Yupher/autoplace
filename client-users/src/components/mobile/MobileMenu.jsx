import React, { useRef } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";

import { OPEN_MENU, CLOSE_MENU } from "../../actions/types/MobileMenuTypes";
import { ReactComponent as Cross12Svg } from "../../svg/cross-12.svg";
import MobileMenuConveyor from "./MobileMenuConveyor";
import MobileMenuPanel from "./MobileMenuPanel";
import MobileMenuSettings from "./MobileMenuSettings";
import MobileMenuIndicators from "./MobileMenuIndicators";
import MobileMenuLinks from "./MobileMenuLinks";

const MobileMenu = ({ isOpen }) => {
  const dispatch = useDispatch();
  const mobileMenuClose = () => dispatch({ type: CLOSE_MENU });
  const bodyRef = useRef(null);
  const conveyorRef = useRef(null);
  const intl = useIntl();

  const rootClasses = classNames("mobile-menu", {
    "mobile-menu--open": isOpen,
  });

  const onMenuClosed = () => {
    if (conveyorRef.current) {
      conveyorRef.current.reset();
    }
  };
  const onTransitionEnd = (event) => {
    if (
      event.target === bodyRef.current &&
      event.propertyName === "transform" &&
      !isOpen
    ) {
      onMenuClosed();
    }
  };

  const dataMobileMenuLinks = [
    {
      title: intl.formatMessage({ id: "NAVBAR_HOME_LINK" }),
      url: "/",
    },
    {
      title: intl.formatMessage({ id: "NAVBAR_PROFILE_LINK" }),
      url: "/profile",
    },
    {
      title: intl.formatMessage({ id: "NAVBAR_DASHBOARD_LINK" }),
      url: "/dashboard",
    },
    {
      title: intl.formatMessage({ id: "NAVBAR_TRENDING_LINK" }),
      url: "/trending",
    },
  ];

  return (
    <div className={rootClasses}>
      <div className='mobile-menu__backdrop' onClick={mobileMenuClose} />
      <div
        className='mobile-menu__body'
        ref={bodyRef}
        onTransitionEnd={onTransitionEnd}
      >
        <button
          className='mobile-menu__close'
          type='button'
          onClick={mobileMenuClose}
        >
          <Cross12Svg />
        </button>

        <MobileMenuConveyor controllerRef={conveyorRef}>
          <MobileMenuPanel label='Menu'>
            <MobileMenuSettings />
            <div className='mobile-menu__divider' />
            <MobileMenuIndicators />
            <div className='mobile-menu__divider' />
            <MobileMenuLinks items={dataMobileMenuLinks} />
            <div className='mobile-menu__spring' />
            <div className='mobile-menu__divider' />
            <Link to='/contact-us' className='mobile-menu__contacts'>
              <div className='mobile-menu__contacts-subtitle'>
                <FormattedMessage id='TEXT_MOBILE_MENU_PHONE_TITLE' />
              </div>
              <div className='mobile-menu__contacts-title'>Coming soon...</div>
            </Link>
          </MobileMenuPanel>
        </MobileMenuConveyor>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.mobileMenu.isOpen,
});
export default connect(mapStateToProps)(MobileMenu);
