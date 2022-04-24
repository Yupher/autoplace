import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BlockSpace from "../components/blocks/BlockSpace";
import { ReactComponent as Car50Svg } from "../svg/car-50.svg";

const Home = () => {
  return (
    <div style={{ height: "1500px" }}>
      <Fragment>
        {/* <BlockSpace layout='after-header' /> */}

        <div className='card'>
          <div className='card-header'>
            <h5>Managing</h5>
          </div>
          <div className='card-divider' />
          <div className='card-body card-body--padding-2'>
            <Link to='/products' className='btn btn-light btn-lg'>
              <div className='btn-icon'>
                <Car50Svg />
              </div>
              Manage Products
            </Link>
            <Link to='/users' className='btn btn-light btn-lg'>
              <div className='btn-icon'>
                <Car50Svg />
              </div>
              Manage Users
            </Link>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Home;
