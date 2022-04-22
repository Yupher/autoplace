import React from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { userRows, userColumns } from "../../dummyData/usersData";

const DataTable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => (
        <div className='cellAction'>
          <div className='viewButton'>view</div>
          <div className='deleteButton'>delete</div>
        </div>
      ),
    },
  ];
  return (
    <div className='dataTable'>
      <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
