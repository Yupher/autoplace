import React from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import LoadingSpiner from "../shared/LoadingSpiner";
import { Link } from "react-router-dom";

const ProductsTable = (props) => {
  const { products, loading, error } = props;

  if (!products && !loading) {
    return (
      <div className='text-align-center'>
        <h3>No data available</h3>
      </div>
    );
  }

  if (!products && loading) {
    return <LoadingSpiner />;
  }

  const data = [
    ...products.data.map((product) => ({
      id: product._id,
      product: `${product.brand} ${product.model}`,
      user: product.addedBy._id,
      status:
        product.accepted.value === undefined
          ? "Pending"
          : product.accepted.value
          ? "Accepted"
          : "Rejected",
    })),
  ];

  const columns = [
    { dataField: "id", text: "Id", sort: true },
    {
      dataField: "product",
      text: "Product",
      formatter: (cell, row) => {
        return (
          <Link to={`/products/${row.id}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      sort: true,
    },
    {
      dataField: "user",
      text: "User",
      sort: true,
      formatter: (cell, row) => {
        return (
          <Link to={`/users/${cell}`} className='table-link'>
            {cell}
          </Link>
        );
      },
    },
    { dataField: "status", text: "Status", sort: true },
  ];

  const defaultSorted = [
    {
      dataField: "name",
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
    <div className='table-responsive-md'>
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
              defaultSorted={defaultSorted}
              pagination={pagination}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default ProductsTable;
