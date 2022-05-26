// react
import React from "react";
import { Link } from "react-router-dom";
// third-party
import { FormattedMessage } from "react-intl";
import logo from "./logo.svg";

function Logo(props) {
  return (
    <div {...props}>
      <Link to='/' className='logo'>
        <div className='logo__slogan'>
          <FormattedMessage id='TEXT_SLOGAN' />
        </div>
        <div className='logo__image pt-3'>
          {/* logo */}
          <img src={logo} alt='logo' />
          {/* logo / end */}
        </div>
      </Link>
    </div>
  );
}

export default Logo;
