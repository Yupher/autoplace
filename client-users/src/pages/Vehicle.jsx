/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useIntl, FormattedMessage } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { CLEAR_ERROR } from "../actions/types/errorTypes";
import { getVehicle } from "../actions/vehicleAction";
import { addToWishlist, removeFromWishlist } from "../actions/wishlistActions";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import LoadingSpiner from "../components/shared/LoadingSpiner";
import ProductImageSlider from "../components/Products/ProductImageSlider";
import { ReactComponent as Wishlist16Svg } from "../svg/wishlist-16.svg";

const Vehicle = ({
  loading,
  error,
  getVehicle,
  currentVehicle,
  wishlist,
  user,
  removeFromWishlist,
  addToWishlist,
}) => {
  const { productId } = useParams();
  const intl = useIntl();
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

  const onAddToFavorite = () => {
    if (!user) {
      return;
    }
    let liked =
      wishlist &&
      wishlist.products.find((item) => {
        return item._id === productId ? true : false;
      });

    liked ? removeFromWishlist(productId) : addToWishlist(productId);
  };

  if (!currentVehicle && !loading) {
    return (
      <h3 style={{ textAlign: "center", height: "200px", marginTop: "20%" }}>
        No data to display
      </h3>
    );
  }
  if (!currentVehicle && loading) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "VEHICLE_TITLE" })}</PageTitle>
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
            <button
              type='button'
              className='btn-add-to-favorite'
              aria-label={intl.formatMessage({ id: "BUTTON_ADD_TO_WISHLIST" })}
              onClick={onAddToFavorite}
            >
              <i
                className={classNames("fas fa-heart", {
                  liked:
                    wishlist &&
                    wishlist.products.find((item) =>
                      productId === item._id ? true : false,
                    ),
                })}
              ></i>{" "}
              <FormattedMessage id='BUTTON_ADD_TO_WISHLIST' />
            </button>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-6 col-sm-12 mt-2 mb-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_FIRST_NAME_LABEL' />:{" "}
              </span>
              <span> {currentVehicle.addedBy.firstname} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_LAST_NAME_LABEL' />:{" "}
              </span>
              <span> {currentVehicle.addedBy.lastname} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='LABEL_WILAYA' />:{" "}
              </span>
              <span> {currentVehicle.wilaya} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='LABEL_COMMUNE' />:{" "}
              </span>
              <span> {currentVehicle.commune} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_PHONE_NUMBER_LABEL' />:{" "}
              </span>
              <span> {currentVehicle.phone} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />:{" "}
              </span>
              <span> {currentVehicle.email} </span>
            </div>
          </div>
          <div className='col-md-6 col-sm-12 mt-2 mb-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='SELECT_YEAR' />:{" "}
              </span>
              <span> {currentVehicle.year} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='SELECT_COLOR' />:{" "}
              </span>
              <span> {currentVehicle.color} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='SELECT_ENERGY' />:{" "}
              </span>
              <span> {currentVehicle.energy} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='SELECT_TRANSMISSION' />:{" "}
              </span>
              <span> {currentVehicle.transmission} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_KILOMETRAGE' />:{" "}
              </span>
              <span> {currentVehicle.kilometrage} </span>
            </div>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='SELECT_PAPER' />:{" "}
              </span>
              <span> {currentVehicle.paper} </span>
            </div>
          </div>
          <div className='col-12 mt-2 mb-2'>
            <h6>
              <FormattedMessage id='INPUT_GENERAL_DESCRIPTION' />:{" "}
            </h6>
            <p>{currentVehicle.description}</p>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_PRICE' />:{" "}
              </span>
              <span> {currentVehicle.price} </span>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_OFFER_TYPE' />:{" "}
              </span>
              <span> {currentVehicle.offerType} </span>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 mt-2'>
            <div className='mb-2'>
              <span style={{ fontWeight: "bold" }}>
                <FormattedMessage id='INPUT_ACCEPT_EXCHANGE' />:{" "}
              </span>
              <span>
                {currentVehicle.exchange ? (
                  <FormattedMessage id='TEXT_YES' />
                ) : (
                  <FormattedMessage id='TEXT_NO' />
                )}{" "}
              </span>
            </div>
          </div>
          <div className='col-12 mt-2'>
            <h5>
              <FormattedMessage id='SELECT_OPTIONS' />
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
              <FormattedMessage id='SELECT_ACCIDENT' />:{" "}
            </span>
            <span>{currentVehicle.accident}</span>
          </div>

          {currentVehicle.accident !== "No accident" && (
            <div className='col-12 mt-2'>
              <h6>
                <FormattedMessage id='INPUT_ACCIDENT_DESCRIPTION' />:{" "}
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
  wishlist: state.wishlistState.wishlist,
  user: state.authState.user,
});

const actions = {
  getVehicle,
  addToWishlist,
  removeFromWishlist,
};

export default connect(mapStateToProps, actions)(Vehicle);
