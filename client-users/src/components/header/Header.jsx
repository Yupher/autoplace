import React from "react";
import { FormattedMessage } from "react-intl";

import Topbar from "./Topbar";

const Header = () => {
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
    </div>
  );
};

export default Header;
