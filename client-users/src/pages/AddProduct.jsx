import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Car50Svg } from "../svg/car-50.svg";
import BlockSpace from "../components/blocks/BlockSpace";

const AddProduct = ({ user }) => {
  return (
    <Fragment>
      <BlockSpace layout='after-header' />
      <div className='container mb-2'>
        <div className='card'>
          <div className='card-header'>
            <h5>Add a product</h5>
          </div>
          <div className='card-divider' />
          <div className='card-body card-body--padding-2'>
            {user.confirmed ? (
              <Link to='/add-vehicle' className='btn btn-light btn-lg'>
                <div className='btn-icon'>
                  <Car50Svg />
                </div>
                Add vehicle
              </Link>
            ) : (
              <Fragment>
                <h4>Please confirm your email:</h4>
                <Link to='/confirm-email'>Click here to confirm email</Link>
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
