import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useIntl, FormattedMessage } from "react-intl";

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
  const intl = useIntl();

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
    return (
      <h3 style={{ textAlign: "center" }}>
        <FormattedMessage id='NO_DATA' />
      </h3>
    );
  }
  if (!currentVehicle && loading) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "PRODUCTS" })}</PageTitle>
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
                  <FormattedMessage id='ACCEPT' />
                </button>
                <button onClick={onReject} className='btn btn-primary  mx-2'>
                  <FormattedMessage id='REJECT' />
                </button>
              </Fragment>
            )}
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-6 col-sm-12 mt-2 mb-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='FIRST_NAME' />:{" "}
              </span>
              <span> {currentVehicle.addedBy.firstname} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='LAST_NAME' />:{" "}
              </span>
              <span> {currentVehicle.addedBy.lastname} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='WILAYA' />:{" "}
              </span>
              <span> {currentVehicle.wilaya} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='COMMUNE' />:{" "}
              </span>
              <span> {currentVehicle.commune} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='PHONE' />:{" "}
              </span>
              <span> {currentVehicle.phone} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='EMAIL' />:{" "}
              </span>
              <span> {currentVehicle.email} </span>
            </div>
          </div>
          <div className='col-md-6 col-sm-12 mt-2 mb-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='YEAR' />:{" "}
              </span>
              <span> {currentVehicle.year} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='COLOR' />:{" "}
              </span>
              <span> {currentVehicle.color} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='ENERGY' />:{" "}
              </span>
              <span> {currentVehicle.energy} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='TRANSMISSION' />:{" "}
              </span>
              <span> {currentVehicle.transmission} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='KILOMETRAGE' />:{" "}
              </span>
              <span> {currentVehicle.kilometrage} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='PAPER' />:{" "}
              </span>
              <span> {currentVehicle.paper} </span>
            </div>
          </div>
          <div className='col-12 mt-2 mb-2'>
            <h6>
              <FormattedMessage id='DESCRIPTION' />:{" "}
            </h6>
            <p>{currentVehicle.description}</p>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='PRICE' />:{" "}
              </span>
              <span> {currentVehicle.price} </span>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='TYPE_OF_OFFER' />:{" "}
              </span>
              <span> {currentVehicle.offerType} </span>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='EXCHANGE' />:{" "}
              </span>
              <span>
                {" "}
                {currentVehicle.exchange
                  ? intl.formatMessage({ id: "YES" })
                  : intl.formatMessage({ id: "NO" })}{" "}
              </span>
            </div>
          </div>
          <div className='col-12 mt-2'>
            <h5>
              <FormattedMessage id='OPTIONS' />
            </h5>
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

          <div className='col-12 mt-3'>
            <span style={{ fontWeight: "bold" }}>
              <FormattedMessage id='ACCIDENT' />:{" "}
            </span>
            <span>{currentVehicle.accident}</span>
          </div>

          {currentVehicle.accident !== "No accident" && (
            <div className='col-12 mt-2'>
              <h6>
                <FormattedMessage id='ACCIDENT_DESCRIPTION' />:{" "}
              </h6>
              <p>{currentVehicle.accidentDescription}</p>
            </div>
          )}

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
                <h4>
                  <FormattedMessage id='ADMIN_ACTIONS' />:{" "}
                </h4>
              </div>
              {currentVehicle.accepted.value === true ? (
                <Fragment>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>
                        <FormattedMessage id='ACCEPTED_BY' />:{" "}
                      </span>
                      <span>
                        {" "}
                        {`${currentVehicle.accepted.acceptedBy.firstname} ${currentVehicle.accepted.acceptedBy.lastname}`}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>
                        <FormattedMessage id='ACCEPTED_AT' />:{" "}
                      </span>
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
                      <FormattedMessage id='REJECT' />
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>
                        <FormattedMessage id='REJECTED_BY' />:{" "}
                      </span>
                      <span>
                        {" "}
                        {`${currentVehicle.accepted.acceptedBy.firstname} ${currentVehicle.accepted.acceptedBy.lastname}`}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6 mt-2'>
                    <div className='mb-2'>
                      <span style={{ fontWeight: "bold" }}>
                        <FormattedMessage id='REJECTED_AT' />:{" "}
                      </span>
                      <span>
                        {" "}
                        {formatDate(currentVehicle.accepted.acceptedAt)}{" "}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <button onClick={onAccept} className='btn btn-primary '>
                      <FormattedMessage id='ACCEPT' />
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
