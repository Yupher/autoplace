import React from "react";
import classNames from "classnames";
import MobileMenuPanelController from "./MobileMenuPanelController";
import { ReactComponent as ArrowRoundedRight7x11Svg } from "../../svg/arrow-rounded-right-7x11.svg";
import { Link } from "react-router-dom";

const MobileMenuLinks = (props) => {
  const { items = [], onItemClick } = props;
  const onInnerItemClick = (event, item) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    if (hasSubmenu) {
      event.preventDefault();
    }

    if (onItemClick) {
      onItemClick(item);
    }
  };
  return (
    <div className='mobile-menu__links'>
      <ul>
        {items.map((item, itemIdx) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const highlighted = item.customFields?.highlight === true;

          const content = (
            <React.Fragment>
              {item.image !== undefined && (
                <div className='mobile-menu__links-image'>
                  <img src={item.image} alt='language' />
                </div>
              )}
              {item.title}
              {hasSubmenu && <ArrowRoundedRight7x11Svg />}
            </React.Fragment>
          );

          const renderLink = (onItemClickInner) => (
            <React.Fragment>
              {item.url !== undefined && (
                <Link
                  to={item.url}
                  anchor={hasSubmenu}
                  className={classNames({ highlight: highlighted })}
                  onClick={(event) => onItemClickInner(event, item)}
                  {...item.customFields?.anchorProps}
                >
                  {content}
                </Link>
              )}

              {item.url === undefined && (
                <button
                  type='button'
                  className={classNames({ highlight: highlighted })}
                  onClick={(event) => onItemClickInner(event, item)}
                >
                  {content}
                </button>
              )}
            </React.Fragment>
          );

          return (
            <li key={itemIdx}>
              {hasSubmenu && (
                <MobileMenuPanelController
                  label={item.title}
                  content={
                    <MobileMenuLinks
                      items={item.submenu}
                      onItemClick={onItemClick}
                    />
                  }
                >
                  {(open) =>
                    renderLink((event, item) => {
                      open();
                      onInnerItemClick(event, item);
                    })
                  }
                </MobileMenuPanelController>
              )}

              {!hasSubmenu && renderLink(onInnerItemClick)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenuLinks;
