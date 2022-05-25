import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useIntl, FormattedMessage } from "react-intl";

import LoadingSpiner from "../components/shared/LoadingSpiner";
import BlockSpace from "../components/blocks/BlockSpace";
import { removeFromWishlist } from "../actions/wishlistActions";
import PageTitle from "../components/shared/PageTitle";

const Wishlist = (props) => {
  const { wishlist, loading, user, error, removeFromWishlist } = props;
  const intl = useIntl();

  const removeItem = (id) => {
    removeFromWishlist(id);
  };

  if (!wishlist) {
    return null;
  }

  if (!wishlist && loading) {
    return <LoadingSpiner />;
  }

  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "HEADER_WISHLIST" })}</PageTitle>
      <BlockSpace layout='after-header' />
      {error && error.type === "server" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <h4>{error.message}</h4>
        </div>
      )}
      {wishlist && wishlist.products.length <= 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <h4>
            <FormattedMessage id='HEADER_WISHLIST_EMPTY_TITLE' />!
          </h4>
        </div>
      )}
      {wishlist && (
        <div className='container mb-5'>
          <ul>
            {wishlist.products.map((product) => (
              <li key={product._id} className='wishlist-container'>
                <div className='wishlist-img'>
                  <img src={product.images[0].secure_url} alt='car' />
                </div>
                <div className='wishlist-body'>
                  <i
                    onClick={() => removeItem(product._id)}
                    style={{ color: "red" }}
                    className='fas fa-trash delete-icon'
                  ></i>
                  <h4 className='wishlist-title'>
                    <Link style={{ color: "black" }} to={`/${product._id}`}>
                      {product.brand} {product.model} {product.year}
                    </Link>
                  </h4>
                  <p className='wishlist-address'>
                    {product.wilaya} {product.commune}
                  </p>
                  <p className='wishlist-price'>
                    <FormattedMessage id='INPUT_PRICE' />: {product.price} DA
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  wishlist: state.wishlistState.wishlist,
  loading: state.loadingState.loading,
  user: state.authState.user,
  error: state.errorState.error,
});

export default connect(mapStateToProps, { removeFromWishlist })(Wishlist);
