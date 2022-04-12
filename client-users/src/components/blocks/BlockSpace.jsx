import React from "react";

import classNames from "classnames";

const BlockSpace = (props) => {
  const { layout, className, ...rootProps } = props;
  const rootClasses = classNames(
    "block-space",
    `block-space--layout--${layout}`,
    className,
  );

  return <div className={rootClasses} {...rootProps} />;
};

export default BlockSpace;
