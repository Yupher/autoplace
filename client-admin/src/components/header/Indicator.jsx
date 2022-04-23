import React, { useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Indicator = (props) => {
  const {
    icon,
    href,
    label,
    value,
    counter,
    trigger = "none",
    children,
    controllerRef,
  } = props;

  const hasLabel = label !== undefined && label !== null;
  const hasValue = value !== undefined && value !== null;
  const buttonType = href !== undefined ? "link" : "button";
  const showCounter = counter !== undefined && counter !== null;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const controller = useMemo(
    () => ({
      close: () => setIsOpen(false),
    }),
    [setIsOpen],
  );

  if (controllerRef) {
    controllerRef.current = controller;
  }

  const handleButtonClick = (event) => {
    if (trigger === "click") {
      event.preventDefault();
      setIsOpen((prevState) => !prevState);
    }
  };

  const buttonContent = (
    <React.Fragment>
      <span className='indicator__icon'>
        {icon}
        {showCounter && <span className='indicator__counter'>{counter}</span>}
      </span>

      {hasLabel && <span className='indicator__title'>{label}</span>}
      {hasValue && <span className='indicator__value'>{value}</span>}
    </React.Fragment>
  );

  const rootClasses = classNames(
    "indicator",
    `indicator--trigger--${trigger}`,
    {
      "indicator--open": isOpen,
    },
  );

  return (
    <div className={rootClasses} ref={rootRef}>
      {buttonType === "button" && (
        <button
          className='indicator__button'
          type='button'
          onClick={handleButtonClick}
        >
          {buttonContent}
        </button>
      )}
      {buttonType === "link" && (
        <Link
          to={href}
          className='indicator__button'
          onClick={handleButtonClick}
        >
          {buttonContent}
        </Link>
      )}
      <div className='indicator__content'>{children}</div>
    </div>
  );
};

export default Indicator;
