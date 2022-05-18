import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";

import { ReactComponent as Wishlist16Svg } from "../../svg/wishlist-16.svg";
import { Link, Navigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistActions";
import { connect } from "react-redux";
import { deleteVehicle } from "../../actions/vehicleAction";

function ProductCard(props) {
  const {
    product,
    edit,
    remove,
    layout,
    loading,
    exclude = [],
    className,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    currentUser,
    deleteVehicle,
    ...rootProps
  } = props;
  const intl = useIntl();

  const rootClasses = classNames("product-card", className, {
    [`product-card--layout--${layout}`]: layout,
  });

  const handleWishlist = (id) => {
    if (!currentUser) {
      return;
    }
    let liked =
      wishlist &&
      wishlist.products.find((item) => {
        return item._id === product._id ? true : false;
      });

    liked ? removeFromWishlist(id) : addToWishlist(id);
  };

  const handleDelete = (id) => {
    deleteVehicle(id);
  };

  return (
    <div className={rootClasses} {...rootProps}>
      <div className='product-card__image'>
        <div className='image image--type--product'>
          <Link to={`/product/${product._id}`} className='image__body'>
            <img
              className='image__tag'
              style={{ objectFit: "cover" }}
              src={product.images[0].secure_url}
              alt='vehicle'
            />
          </Link>
        </div>
      </div>
      <div className='product-card__info'>
        <div
          className='product-card__name'
          style={{
            padding: "10px",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to={`/product/${product._id}`}
          >{`${product.brand} ${product.model} ${product.year}`}</Link>
          <Link to={`/product/${product._id}`}>
            <i className='fa fa-arrow-right' style={{ color: "#ff3333" }}></i>
          </Link>
        </div>
        <div className='product-card__name product-wilaya'>
          <i className='fa fa-map-marker' aria-hidden='true'></i>{" "}
          {` ${product.wilaya} ${product.commune}`}
        </div>
      </div>
      <div
        className='product-card__footer'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div className='product-card__prices'>
          <div className='product-card__price product-card__price--current'>
            {`Price: ${product.price} DA`}
          </div>
        </div>

        <div
          className='product-card__actions-list'
          style={{ display: "flex", alignItems: "center" }}
        >
          {edit && (
            <Link
              to={`/product/${product._id}/edit`}
              className='product-card__action product-card__action--wishlist'
              aria-label={intl.formatMessage({ id: "BUTTON_ADD_TO_WISHLIST" })}
            >
              <i className='fas fa-edit'></i>
            </Link>
          )}
          {remove && (
            <button
              type='button'
              className='product-card__action product-card__action--wishlist'
              aria-label={intl.formatMessage({ id: "BUTTON_ADD_TO_WISHLIST" })}
              onClick={() => handleDelete(product._id)}
            >
              <i className='fas fa-trash'></i>
            </button>
          )}
          <button
            type='button'
            className={classNames(
              "product-card__action",
              "product-card__action--wishlist",
              {
                "product-card__action--loading": loading,
                liked:
                  wishlist &&
                  wishlist.products.find((item) =>
                    product._id === item._id ? true : false,
                  ),
              },
            )}
            aria-label={intl.formatMessage({ id: "BUTTON_ADD_TO_WISHLIST" })}
            onClick={() => handleWishlist(product._id)}
          >
            <Wishlist16Svg />
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  wishlist: state.wishlistState.wishlist,
  currentUser: state.authState.user,
});

const actions = {
  addToWishlist,
  removeFromWishlist,
  deleteVehicle,
};

export default connect(mapStateToProps, actions)(ProductCard);
