import React from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import DropdownLanguage from "./DropdownLanguage";

const Topbar = (props) => {
  const { layout } = props;
  const rootClasses = classNames("topbar", `topbar--${layout}`);
  return (
    <div className={rootClasses}>
      <div className='topbar__item-text'>
        <a href='#!' className='topbar__link'>
          <FormattedMessage id='LINK_ABOUT_US' />
        </a>
      </div>
      <div className='topbar__item-text'>
        <a href='#!' className='topbar__link'>
          <FormattedMessage id='LINK_CONTACTS' />
        </a>
      </div>
      <div className='topbar__item-text'>
        <a href='#!' className='topbar__link'>
          <FormattedMessage id='LINK_TRACK_ORDER' />
        </a>
      </div>

      <DropdownLanguage />
    </div>
  );
};

export default Topbar;
