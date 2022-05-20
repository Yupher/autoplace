import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { getUser } from "../actions/usersActions";
import { CLEAR_ERROR } from "../actions/types/errorTypes";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import LoadingSpiner from "../components/shared/LoadingSpiner";

const UserPage = ({ user, loading, error, getUser }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(userId);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 5000);
    }
  }, [error]);

  if (!user && !loading) {
    return <h3 style={{ textAlign: "center" }}>No data to display</h3>;
  }
  if (!user && loading) {
    return <LoadingSpiner />;
  }
  return (
    <Fragment>
      <PageTitle>Users</PageTitle>
      <BlockSpace layout='after-header' />
      <div className='block'>
        <div className='container container--max--lg'>
          <div className='row'>
            <div className='col-md-10 d-flex mt-4 mt-md-0'>
              <div className='card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4'>
                <div className='card-body card-body--padding--2'>
                  <h3 className='card-title'>
                    {user.firstname} {user.lastname}
                  </h3>
                  <div
                    style={{
                      marginTop: "7px",
                      marginBottom: "25px",
                    }}
                  >
                    <img
                      src={user.photo}
                      alt='profile'
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        // borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>Id: </h6>
                    <p>{user._id}</p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>Email: </h6>
                    <p>{user.email}</p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>First name: </h6>
                    <p>{user.firstname}</p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>Last name: </h6>
                    <p>{user.lastname}</p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>role: </h6>
                    <p>
                      {user.role === "main_admin" ? "Main admin" : user.role}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>Confirmed: </h6>
                    <p>{user.confirmed ? "Confirmed" : "No"}</p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>Status: </h6>
                    <p>{user.active ? "Active" : "Blocked"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.usersState.user,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

const actions = {
  getUser,
};

export default connect(mapStateToProps, actions)(UserPage);
