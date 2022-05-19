import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { CLEAR_ERROR } from "../actions/types/errorTypes";
import { getAllUsers } from "../actions/usersActions";

import BlockSpace from "../components/blocks/BlockSpace";
import PageTitle from "../components/shared/PageTitle";
import UsersTable from "../components/shared/DataTable";
import LoadingSpiner from "../components/shared/LoadingSpiner";

const Users = ({
  allUsers,
  getAllVehicles,
  vehicles,
  loading,
  error,
  getAllUsers,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 5000);
    }
  }, [error]);

  if (!allUsers && !loading) {
    return (
      <div className='text-align-center'>
        <h3>No data available</h3>
      </div>
    );
  }

  if (!allUsers && loading) {
    return <LoadingSpiner />;
  }

  const data = [
    ...allUsers.map((user) => {
      let { _id, firstname, lastname, email, role } = user;
      return {
        id: _id,
        firstname,
        lastname,
        email,
        role,
        status: user.active ? "active" : "blocked",
      };
    }),
  ];

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "firstname",
      text: "First Name",
      formatter: (cell, row) => {
        return (
          <Link to={`/users/${row.id}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "lastname",
      text: "Last Name",
      formatter: (cell, row) => {
        return (
          <Link to={`/users/${row.id}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "email",
      text: "Email",
      formatter: (cell, row) => {
        return (
          <Link to={`/users/${row.id}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "role",
      text: "Role",
      formatter: (cell, row) => {
        return (
          <Link to={`/users/${row.id}`} className='table-link'>
            {cell}
          </Link>
        );
      },
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: {
        whiteSpace: "normal",
        wordBreak: "break-all",
      },
      headerStyle: (colum, colIndex) => {
        return { width: "200px", textAlign: "center" };
      },
    },
  ];

  return (
    <Fragment>
      <PageTitle>Users</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='container'>
        <div className='row'>
          <div className='col-12 mb-3'>
            {error && (
              <div className='alert alert-sm alert-danger'>
                {/* <FormattedMessage id={error.message} /> */}
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className='col-12'>
            <UsersTable data={data} columns={columns} />
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  allUsers: state.usersState.allUsers,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});
const actions = { getAllUsers };
export default connect(mapStateToProps, actions)(Users);
