import React, { useContext } from "react";

import { ReactComponent as ArrowRoundedLeft7x11Svg } from "../../svg/arrow-rounded-left-7x11.svg";
import { MobileMenuLevelContext } from "./mobileMenuContext";

const MobileMenuPanel = (props) => {
  const { label, onCloseCurrentPanel, children } = props;
  const level = useContext(MobileMenuLevelContext);

  return (
    <div
      className='mobile-menu__panel'
      style={{
        transform: `translateX(${level * 100}%)`,
      }}
    >
      <div className='mobile-menu__panel-header'>
        {level > 0 && (
          <button
            className='mobile-menu__panel-back'
            type='button'
            onClick={onCloseCurrentPanel}
          >
            <ArrowRoundedLeft7x11Svg />
          </button>
        )}
        <div className='mobile-menu__panel-title'>{label}</div>
      </div>
      <div className='mobile-menu__panel-body'>
        <MobileMenuLevelContext.Provider value={level + 1}>
          {children}
        </MobileMenuLevelContext.Provider>
      </div>
    </div>
  );
};

export default MobileMenuPanel;
