// react
import React from "react";
import logo from "./mobileLogo.svg";

function MobileLogo() {
  return (
    <div className='mobile-logo'>
      {/* mobile-logo */}
      <img style={{ width: "100px", height: "80px" }} src={logo} alt='logo' />

      {/* mobile-logo / end */}
    </div>
  );
}

export default MobileLogo;
