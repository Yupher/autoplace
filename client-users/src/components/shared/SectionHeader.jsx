import React from "react";

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
