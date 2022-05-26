import React, { useState } from "react";
import classNames from "classnames";
import { ReactComponent as ArrowDownSm7x5Svg } from "../../svg/arrow-down-sm-7x5.svg";
const Dropdown = (props) => {
  const { label, title, items = [], onItemClick } = props;
  const [isOpen, setIsOpen] = useState(false);

  const hasLabel = !!label;
  const hasTitle = !!title;

  const classes = classNames("topbar__item-button topbar__menu", {
    "topbar__menu--open": isOpen,
  });

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };
  const handleItemClick = (item) => {
    setIsOpen(false);

    if (onItemClick) {
      onItemClick(item);
    }
  };
  return (
    <div className={classes}>
      <button
        className='topbar__button topbar__button--has-arrow topbar__menu-button'
        type='button'
        onClick={handleButtonClick}
        style={{ color: "#fff" }}
      >
        {hasLabel && <span className='topbar__button-label'>{label}</span>}
        {hasTitle && <span className='topbar__button-title'>{title}</span>}
        <span className='topbar__button-arrow'>
          <ArrowDownSm7x5Svg />
        </span>
      </button>
      <div className='topbar__menu-body'>
        {items.map((item, index) => (
          <button
            key={index}
            className='topbar__menu-item'
            type='button'
            onClick={() => handleItemClick(item)}
          >
            {!!item.image && <img src={item.image} alt={item.title} />}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
