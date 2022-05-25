// react
import React, { useState } from "react";
// third-party
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { ReactComponent as Car20Svg } from "../../svg/car-20.svg";
import { ReactComponent as Search20Svg } from "../../svg/search-20.svg";

const Search = () => {
  const intl = useIntl();
  const [search, setSearch] = useState("");

  const placeHolder = intl.formatMessage({ id: "INPUT_SEARCH_PLACEHOLDER" });

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='search'>
      <form className='search__body' onSubmit={onSubmit}>
        <div className='search__shadow' />

        <label className='sr-only' htmlFor='site-search'>
          <FormattedMessage id='INPUT_SEARCH_LABEL' />
        </label>

        <input
          type='text'
          className='search__input'
          id='site-search'
          autoCapitalize='off'
          autoComplete='off'
          spellCheck='false'
          name='search'
          value={search}
          placeholder={placeHolder}
          onChange={onChange}
        />

        <button
          type='button'
          className={classNames("search__button search__button--start")}
        >
          <span className='search__button-icon'>
            <Car20Svg />
          </span>
          <span className='search__button-title'>
            <FormattedMessage id='BUTTON_SEARCH_SELECT_VEHICLE_DESKTOP' />
          </span>
        </button>

        <button className='search__button search__button--end' type='submit'>
          <span className='search__button-icon'>
            <Search20Svg />
          </span>
        </button>

        <div className='search__box' />
        <div className='search__decor'>
          <div className='search__decor-start' />
          <div className='search__decor-end' />
        </div>
      </form>
    </div>
  );
};

export default Search;
