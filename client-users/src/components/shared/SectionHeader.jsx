import React from "react";
import classNames from "classnames";

import { ReactComponent as ArrowRoundedLeft7x11Svg } from "../../svg/arrow-rounded-left-7x11.svg";
import { ReactComponent as ArrowRoundedRight7x11Svg } from "../../svg/arrow-rounded-right-7x11.svg";

function SectionHeader(props) {
  const { sectionTitle } = props;

  return (
    <div className='section-header'>
      <div className='section-header__body'>
        {sectionTitle && (
          <h2 className='section-header__title'>{sectionTitle}</h2>
        )}
        <div className='section-header__spring' />

        <div className='section-header__divider' />
      </div>
    </div>
  );
}

export default SectionHeader;
