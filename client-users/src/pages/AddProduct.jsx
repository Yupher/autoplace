import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

import { ReactComponent as Car50Svg } from "../svg/car-50.svg";
import BlockSpace from "../components/blocks/BlockSpace";
import PageTitle from "../components/shared/PageTitle";

const AddProduct = ({ user }) => {
  const intl = useIntl();
  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "ADD_PRODUCT_TITLE" })}</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container mb-2'>
        <div className='card'>
          <div className='card-header'>
            <h5>
              <FormattedMessage id='ADD_PRODUCT_TITLE' />
            </h5>
          </div>
          <div className='card-divider' />
          <div className='card-body card-body--padding-2'>
            {user && user.confirmed ? (
              <Link to='/add-vehicle' className='btn btn-light btn-lg'>
                <div className='btn-icon'>
                  <Car50Svg />
                </div>
                <FormattedMessage id='ADD_VEHICLE' />
              </Link>
            ) : (
              <Fragment>
                <h4>
                  <FormattedMessage id='CONFIRM_EMAIL_TITLE' />
                </h4>
                <Link to='/confirm-email'>
                  <FormattedMessage id='LINK_CONFIRM_EMAIL' />
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.authState.user,
});

export default connect(mapStateToProps)(AddProduct);
