import React from "react";
import { Link } from "react-router-dom";

import { FormattedMessage } from "react-intl";

const MainMenu = () => {
  return (
    <div className='main-menu'>
      <ul className='main-menu__list'>
        <li className='main-menu__item'>
          <Link className='main-menu__link' to='/'>
            <FormattedMessage id='NAVBAR_HOME_LINK' />
          </Link>
        </li>
        <li className='main-menu__item'>
          <Link className='main-menu__link' to='/profile'>
            <FormattedMessage id='NAVBAR_PROFILE_LINK' />
          </Link>
        </li>
        <li className='main-menu__item'>
          <Link className='main-menu__link' to='/dashboard'>
            <FormattedMessage id='NAVBAR_DASHBOARD_LINK' />
          </Link>
        </li>
        <li className='main-menu__item'>
          <Link className='main-menu__link' to='/tranding'>
            <FormattedMessage id='NAVBAR_TRENDING_LINK' />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
