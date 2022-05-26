import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import { ReactComponent as ArrowRoundedLeft7x11Svg } from "../../svg/arrow-rounded-left-7x11.svg";
import { MobileMenuContext, MobileMenuLevelContext } from "./mobileMenuContext";

const MobileMenuPanelController = (props) => {
  const { label, content, children } = props;
  const level = useContext(MobileMenuLevelContext);
  const conveyor = useContext(MobileMenuContext);
  const [id] = useState(() => {
    conveyor.lastPanelIdRef.current += 1;

    return conveyor.lastPanelIdRef.current;
  });

  const childrenTemplate =
    children(() => {
      conveyor.open(id);
    }) || null;

  const renderPanel = () => {
    if (!conveyor.containerRef || !conveyor.containerRef.current) {
      return null;
    }

    const panel = (
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
              onClick={conveyor.close}
            >
              <ArrowRoundedLeft7x11Svg />
            </button>
          )}
          <div className='mobile-menu__panel-title'>{label}</div>
        </div>
        <div className='mobile-menu__panel-body'>
          <MobileMenuLevelContext.Provider value={level + 1}>
            {content}
          </MobileMenuLevelContext.Provider>
        </div>
      </div>
    );

    return ReactDOM.createPortal(panel, conveyor.containerRef.current);
  };

  return (
    <React.Fragment>
      {(conveyor.stack.includes(id) || conveyor.bin.includes(id)) &&
        renderPanel()}
      {childrenTemplate && React.Children.only(childrenTemplate)}
    </React.Fragment>
  );
};

export default MobileMenuPanelController;
