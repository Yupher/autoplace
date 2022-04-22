import React from "react";
import "./home.scss";

import Widget from "../../components/widgets/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className='home'>
      <div className='homeContainer'>
        <div className='widgets'>
          <Widget type='users' />
          <Widget type='products' />
          <Widget type='ads' />
          <Widget type='visitors' />
        </div>
        <div className='charts'>
          <Featured />
          <Chart aspect={2 / 1} />
        </div>
        <div className='listContainer'>
          <div className='listTitle'>Last Added Product</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
