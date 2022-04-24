import React, { Fragment, useEffect } from "react";
import BlockSpace from "../components/blocks/BlockSpace";

import PageTitle from "../components/shared/PageTitle";
import ProductsTable from "../components/Products/ProductsTable";
import { getAllVehicles } from "../actions/vehicleAction";
import { connect } from "react-redux";

const Products = ({ getAllVehicles, vehicles, loading, error }) => {
  useEffect(() => {
    getAllVehicles();
  }, []);
  return (
    <Fragment>
      <PageTitle>Products</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <ProductsTable
              products={vehicles}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  vehicles: state.vehicleState.vehicles,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});
const actions = { getAllVehicles };
export default connect(mapStateToProps, actions)(Products);
