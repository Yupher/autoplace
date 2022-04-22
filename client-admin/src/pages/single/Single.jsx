import React from "react";
import "./single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Single = () => {
  return (
    <div className='single'>
      <div className='singleContainer'>
        <div className='top'>
          <div className='left'>
            <div className='editButton'>Edit</div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src='https://images.pexels.com/photos/11591317/pexels-photo-11591317.jpeg?cs=srgb&dl=pexels-alyona-boytsova-11591317.jpg&fm=jpg'
                alt='item'
                className='itemImg'
              />
              <div className='details'>
                <h1 className='itemTitle'>Jane Doe</h1>
                <div className='detailItem'>
                  <span className='itemKey'>Email: </span>
                  <span className='itemValue'>janedoe@gmail.com</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Phone: </span>
                  <span className='itemValue'>0556 00 00 00</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Address: </span>
                  <span className='itemValue'>27 yamen street yamen</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} />
          </div>
        </div>
        <div className='bottom'>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Single;
