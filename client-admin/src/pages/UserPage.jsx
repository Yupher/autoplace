import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import { connect, useDispatch } from "react-redux";

import {
  getUser,
  addAdmin,
  deleteAdmin,
  blockUser,
  unblockUser,
} from "../actions/usersActions";
import { CLEAR_ERROR } from "../actions/types/errorTypes";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import LoadingSpiner from "../components/shared/LoadingSpiner";

const UserPage = (props) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const intl = useIntl();
  const {
    user,
    loading,
    error,
    getUser,
    authUser,
    addAdmin,
    deleteAdmin,
    blockUser,
    unblockUser,
  } = props;

  useEffect(() => {
    getUser(userId);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 10000);
    }
  }, [error]);

  const addAdminClick = () => {
    const { email, phone } = user;
    addAdmin({ email, phone, role: "admin" });
  };
  const deleteAdminClick = () => {
    const { _id } = user;
    deleteAdmin(_id);
  };
  const blockUserClick = () => {
    const { _id } = user;
    blockUser(_id);
  };
  const unblockUserClick = () => {
    const { _id } = user;
    unblockUser(_id);
  };

  if (!user && !loading) {
    return (
      <h3 style={{ textAlign: "center" }}>
        <FormattedMessage id='NO_DATA' />
      </h3>
    );
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
                  <div className='col-12 mb-3'>
                    {error && (
                      <div className='alert alert-sm alert-danger'>
                        {/* <FormattedMessage id={error.message} /> */}
                        <p>{error.message}</p>
                      </div>
                    )}
                  </div>
                  <div className='manage-user-header'>
                    <h3 className='card-title'>
                      {user.firstname} {user.lastname}
                    </h3>
                    <ul>
                      {authUser.role === "main_admin" && (
                        <Fragment>
                          {user.role === "admin" ? (
                            <li>
                              <button onClick={deleteAdminClick}>
                                <FormattedMessage id='DELETE_ADMIN' />
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button onClick={addAdminClick}>
                                <FormattedMessage id='ADD_ADMIN' />
                              </button>
                            </li>
                          )}
                        </Fragment>
                      )}
                      <li>
                        {user.active ? (
                          <button onClick={blockUserClick}>
                            <FormattedMessage id='BLOCK_USER' />
                          </button>
                        ) : (
                          <button onClick={unblockUserClick}>
                            <FormattedMessage id='UNBLOCK_USER' />
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
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
                    <h6>
                      <FormattedMessage id='ID' />:{" "}
                    </h6>
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
                    <h6>
                      <FormattedMessage id='EMAIL' />:{" "}
                    </h6>
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
                    <h6>
                      <FormattedMessage id='PHONE' />:{" "}
                    </h6>
                    <p>{user.phone}</p>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                    }}
                  >
                    <h6>
                      <FormattedMessage id='FIRST_NAME' />:{" "}
                    </h6>
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
                    <h6>
                      <FormattedMessage id='LAST_NAME' />:{" "}
                    </h6>
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
                    <h6>
                      <FormattedMessage id='ROLE' />:{" "}
                    </h6>
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
                    <h6>
                      <FormattedMessage id='CONFIRMED' />:{" "}
                    </h6>
                    <p>
                      {user.confirmed
                        ? intl.formatMessage({ id: "CONFIRMED" })
                        : intl.formatMessage({ id: "NO" })}
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
                    <h6>
                      <FormattedMessage id='STATUS' />:{" "}
                    </h6>
                    <p>
                      {user.active
                        ? intl.formatMessage({ id: "ACTIVE" })
                        : intl.formatMessage({ id: "BLOCKED" })}
                    </p>
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
  authUser: state.authState.user,
  user: state.usersState.user,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

const actions = {
  getUser,
  addAdmin,
  deleteAdmin,
  blockUser,
  unblockUser,
};

export default connect(mapStateToProps, actions)(UserPage);
