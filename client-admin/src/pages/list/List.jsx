import React from "react";
import "./list.scss";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DataTable from "../../components/datatable/DataTable";

const List = () => {
  return (
    <div className='list'>
      <div className='listContainer'>
        <DataTable />
      </div>
    </div>
  );
};

export default List;
