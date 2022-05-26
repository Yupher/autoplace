import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import BlockSpace from "../components/blocks/BlockSpace";
import PageTitle from "../components/shared/PageTitle";
import { ReactComponent as Car50Svg } from "../svg/car-50.svg";
import { ReactComponent as Person50Svg } from "../svg/person-50.svg";

const Home = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "HOME" })}</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='card'>
        <div className='card-header'>
          <h5>
            <FormattedMessage id='MANAGING' />
          </h5>
        </div>
        <div className='card-divider' />
        <div className='card-body card-body--padding-2'>
          <Link to='/products' className='btn btn-light btn-lg'>
            <div className='btn-icon'>
              <Car50Svg />
            </div>
            <FormattedMessage id='MANAGE_PRODUCTS' />
          </Link>
          <Link to='/users' className='btn btn-light btn-lg'>
            <div className='btn-icon'>
              <Person50Svg />
            </div>
            <FormattedMessage id='MANAGE_USERS' />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
