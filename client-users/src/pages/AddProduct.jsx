import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Car50Svg } from "../svg/car-50.svg";

const AddProduct = () => {
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <h5>Add a product</h5>
        </div>
        <div className='card-divider' />
        <div className='card-body card-body--padding-2'>
          <Link to='/add-vehicle' className='btn btn-light btn-lg'>
            <div className='btn-icon'>
              <Car50Svg />
            </div>
            Add vehicle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
