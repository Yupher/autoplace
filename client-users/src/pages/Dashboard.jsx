import React, { Fragment, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { getMyVehicles } from "../actions/vehicleAction";

import LoadingSpiner from "../components/shared/LoadingSpiner";
import BlockSpace from "../components/blocks/BlockSpace";
import ProductCard from "../components/shared/ProductCard";
import BlockProductsCarousel from "../components/blocks/BlockProductsCarousel";
import PageTitle from "../components/shared/PageTitle";

const Dashboard = (props) => {
  const intl = useIntl();
  const { getMyVehicles, myVehicles, error, loading } = props;

  useEffect(() => {
    getMyVehicles();
  }, []);

  if (myVehicles === null && !loading) {
    return null;
  }

  if (!myVehicles && loading) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "DASHBORD_TITLE" })}</PageTitle>
      <BlockSpace layout='after-header' />
      {myVehicles === null && error !== null && error.type === "server" && (
        <div className='d-flex.align-items-center.justify-content-center h-80'>
          <FormattedMessage id='SOMETHING_WRONG' />
        </div>
      )}
      {myVehicles && myVehicles.lenght <= 0 && (
        <div className='d-flex.align-items-center.justify-content-center h-80'>
          <FormattedMessage id='NO_DATA' />
        </div>
      )}
      <BlockProductsCarousel
        blockTitle={intl.formatMessage({ id: "HEADER_DASHBOARD_PRODUCTS" })}
        loading={loading}
        products={myVehicles}
        remove={true}
        edit={true}
      />

      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  myVehicles: state.vehicleState.myVehicles,
});

const actions = {
  getMyVehicles,
};

export default connect(mapStateToProps, actions)(Dashboard);
