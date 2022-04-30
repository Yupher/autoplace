import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import {
  getVehicle,
  acceptVehicle,
  rejectVehicle,
} from "../actions/vehicleAction";
import { CLEAR_ERROR } from "../actions/types/errorTypes";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import LoadingSpiner from "../components/shared/LoadingSpiner";
import ProductImageSlider from "../components/Products/ProductImageSlider";

const VehiclePage = ({
  loading,
  error,
  getVehicle,
  currentVehicle,
  acceptVehicle,
  rejectVehicle,
}) => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getVehicle(productId);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 5000);
    }
  }, [error]);

  const onAccept = () => {
    dispatch({ type: CLEAR_ERROR });
    acceptVehicle(productId);
  };
  const onReject = () => {
    dispatch({ type: CLEAR_ERROR });
    rejectVehicle(productId);
  };

  const formatDate = (date) => {
    const dateJS = new Date(date);
    // console.log(dateJS);
    return dateJS.toDateString();
  };

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
          <div className='col-12'>
            {error && (
              <div className='alert alert-sm alert-danger'>
                {/* <FormattedMessage id={error.message} /> */}
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className='col-md-6 col-sm-12 '>
            <h1 style={{ textTransform: "capitalize" }}>
              {`${currentVehicle.brand} ${currentVehicle.model}`}
            </h1>
          </div>
          <div className='col-md-6  col-sm-12 p-2'>
            {currentVehicle.accepted === undefined && (
              <Fragment>
                <button onClick={onAccept} className='btn btn-primary mx-2'>
                  Accept
                </button>
                <button onClick={onReject} className='btn btn-primary  mx-2'>
                  Reject
                </button>
              </Fragment>
            )}
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

          {currentVehicle.accepted !== undefined && (
            <Fragment>
              <div className='col-12 mt-5'>
                <h4>Admin Actions: </h4>
              </div>
              {currentVehicle.accepted.value === true ? (
                <Fragment>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>Accepted by: </span>
                      <span>
                        {" "}
                        {`${currentVehicle.accepted.acceptedBy.firstname} ${currentVehicle.accepted.acceptedBy.lastname}`}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>Accepted at: </span>
                      <span>
                        {" "}
                        {formatDate(currentVehicle.accepted.acceptedAt)}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <button
                      onClick={onReject}
                      className='btn btn-primary ml-auto'
                    >
                      Reject
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>Rejected by: </span>
                      <span>
                        {" "}
                        {`${currentVehicle.accepted.acceptedBy.firstname} ${currentVehicle.accepted.acceptedBy.lastname}`}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>Rejected at: </span>
                      <span>
                        {" "}
                        {formatDate(currentVehicle.accepted.acceptedAt)}{" "}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <button onClick={onAccept} className='btn btn-primary '>
                      Accept
                    </button>
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
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
  acceptVehicle,
  rejectVehicle,
};

export default connect(mapStateToProps, actions)(VehiclePage);
