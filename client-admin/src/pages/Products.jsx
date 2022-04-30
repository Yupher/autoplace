import React, { Fragment, useEffect } from "react";
import BlockSpace from "../components/blocks/BlockSpace";

import PageTitle from "../components/shared/PageTitle";
import ProductsTable from "../components/Products/ProductsTable";
import { getAllVehicles } from "../actions/vehicleAction";
import { connect, useDispatch } from "react-redux";
import { CLEAR_ERROR } from "../actions/types/errorTypes";
import LoadingSpiner from "../components/shared/LoadingSpiner";
import { Link } from "react-router-dom";

const Products = ({ getAllVehicles, vehicles, loading, error }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllVehicles();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 5000);
    }
  }, [error]);

  if (!vehicles && !loading) {
    return (
      <div className='text-align-center'>
        <h3>No data available</h3>
      </div>
    );
  }

  if (!vehicles && loading) {
    return <LoadingSpiner />;
  }

  const formatDate = (date) => {
    const dateJS = new Date(date);
    // console.log(dateJS);
    return dateJS.toDateString();
  };

  const data = [
    ...vehicles.data.map((product) => ({
      id: product._id,
      product: `${product.brand} ${product.model}`,
      user: product.addedBy._id,
      status:
        product.accepted === undefined
          ? "Pending"
          : product.accepted && product.accepted.value
          ? "Accepted"
          : "Rejected",

      addedAt: formatDate(product.createdAt),
    })),
  ];

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "product",
      text: "Product",
      formatter: (cell, row) => {
        return (
          <Link to={`/products/${row.id}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "user",
      text: "User",
      sort: true,
      formatter: (cell, row) => {
        return (
          <Link to={`/users/${cell}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "addedAt",
      text: "Added at",
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
      sortFunction: (a, b, order) => {
        if (order === "asc") {
          return Date.parse(a) - Date.parse(b);
        } else if (order === "desc") {
          return Date.parse(b) - Date.parse(a);
        }
      },
    },
  ];

  return (
    <Fragment>
      <PageTitle>Products</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container'>
        <div className='row'>
          <div className='col-12 mb-3'>
            {error && (
              <div className='alert alert-sm alert-danger'>
                {/* <FormattedMessage id={error.message} /> */}
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className='col-12'>
            <ProductsTable data={data} columns={columns} />
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
