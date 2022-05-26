import React, { Fragment } from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const ProductsTable = (props) => {
  const { columns, data } = props;

  const defaultSorted = [
    {
      dataField: "addedAt",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  const { SearchBar, ClearSearchButton } = Search;
  return (
    <Fragment>
      <div className='table-responsive'>
        <ToolkitProvider
          bootstrap4
          keyField='id'
          data={data}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <h6>Input something at below input field:</h6>
              <SearchBar {...props.searchProps} />
              <ClearSearchButton {...props.searchProps} />
              <hr />
              <BootstrapTable
                classes='table '
                defaultSorted={defaultSorted}
                pagination={pagination}
                {...props.baseProps}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    </Fragment>
  );
};

export default ProductsTable;
