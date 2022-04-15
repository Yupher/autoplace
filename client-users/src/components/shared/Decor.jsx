import React from "react";

import classNames from "classnames";

function Decor(props) {
  const { type, className } = props;
  const rootClasses = classNames("decor", `decor--type--${type}`, className);

  return (
    <div className={rootClasses}>
      <div className='decor__body'>
        <div className='decor__start' />
        <div className='decor__end' />
        <div className='decor__center' />
      </div>
    </div>
  );
}

export default Decor;
