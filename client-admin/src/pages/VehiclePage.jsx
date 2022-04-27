import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getVehicle } from "../actions/vehicleAction";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import LoadingSpiner from "../components/shared/LoadingSpiner";
import ProductImageSlider from "../components/Products/ProductImageSlider";

const VehiclePage = ({ loading, error, getVehicle, currentVehicle }) => {
  const { productId } = useParams();

  useEffect(() => {
    getVehicle(productId);
  }, []);

  if (!currentVehicle && !loading) {
    return <h3 style={{ textAlign: "center" }}>No data to display</h3>;
  }
  if (!currentVehicle && loading) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <PageTitle>Products</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 col-sm-12 '>
            <h1 style={{ textTransform: "capitalize" }}>
              {`${currentVehicle.brand} ${currentVehicle.model}`}
            </h1>
          </div>
          <div className='col-md-6  col-sm-12 p-2'>
            <div className='header-btn'>
              <button className='btn btn-primary '>Accept</button>
              <button className='btn btn-primary '>Reject</button>
            </div>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-6 col-sm-12 mt-2 mb-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Firstname: </span>
              <span> {currentVehicle.addedBy.firstname} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Lastname: </span>
              <span> {currentVehicle.addedBy.lastname} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Wilaya: </span>
              <span> {currentVehicle.wilaya} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Commune: </span>
              <span> {currentVehicle.commune} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Phone: </span>
              <span> {currentVehicle.phone} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Email: </span>
              <span> {currentVehicle.email} </span>
            </div>
          </div>
          <div className='col-md-6 col-sm-12 mt-2 mb-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Year: </span>
              <span> {currentVehicle.year} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Color: </span>
              <span> {currentVehicle.color} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Energy: </span>
              <span> {currentVehicle.energy} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Transmission: </span>
              <span> {currentVehicle.transmission} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Kilometrage: </span>
              <span> {currentVehicle.kilometrage} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Paper: </span>
              <span> {currentVehicle.paper} </span>
            </div>
          </div>
          <div className='col-12 mt-2 mb-2'>
            <h6>Description: </h6>
            <p>{currentVehicle.description}</p>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Price: </span>
              <span> {currentVehicle.price} </span>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Type of offer: </span>
              <span> {currentVehicle.offerType} </span>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>Exchange: </span>
              <span> {currentVehicle.exchange ? "Yes" : "No"} </span>
            </div>
          </div>
          <div className='col-12 mt-2'>
            <h5>Options</h5>
            {currentVehicle.options.map((option, index) => (
              <div key={index} className='form-check form-check-inline'>
                <span className='input-check form-check-input'>
                  <span className='input-check__body'>
                    <input
                      className='input-check__input'
                      checked={true}
                      type='checkbox'
                      readOnly
                    />

                    <span className='input-check__box' />

                    <span className='input-check__icon'>
                      <svg width='9px' height='7px'>
                        <path d='M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z' />
                      </svg>
                    </span>
                  </span>
                </span>
                <label className='form-check-label' htmlFor='defaultCheck1'>
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className='col-12 mt-5'>
            <div
              style={{
                width: "100%",
              }}
            >
              <ProductImageSlider images={currentVehicle.images} />
            </div>
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentVehicle: state.vehicleState.currentVehicle,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

const actions = {
  getVehicle,
};

export default connect(mapStateToProps, actions)(VehiclePage);
