import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";

import {
  validateEmail,
  validatePassword,
  validateFirstname,
  validateLastname,
  validatePasswordConfirm,
} from "../utils/userInputValidation";
import { CLEAR_ERROR, SET_ERROR } from "../actions/types/errorTypes";

const Profile = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { user, loading, error } = props;

  const [userData, setUserData] = useState({
    firstname: user && user.firstname,
    lastname: user && user.lastname,
    email: user && user.email,
    phone: user && user.phone,
    address: user && user.address,
    image:
      user && user.photo[0].secure_url
        ? user.photo[0].secure_url
        : "/images/avatars/avatar-1.jpg",
  });

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    dispatch({ type: CLEAR_ERROR });

    if (rejectedFiles && rejectedFiles.length > 0) {
      dispatch({
        type: SET_ERROR,
        payload: { type: "file", message: "Files are not supported" },
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUserData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(acceptedFiles[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const onChange = (e) => {
    dispatch({ type: CLEAR_ERROR });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {};

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        {error && (
          <div className='alert alert-sm alert-danger'>
            {/* <FormattedMessage id={error.message} /> */}
            <p>{error.message}</p>
          </div>
        )}
        <div className='col-md-4 col-sm-6 '>
          <div {...getRootProps()}>
            <input className='d-none' {...getInputProps} />
            <img
              style={{ height: "200px", width: "200px", borderRadius: "10px" }}
              src={userData.image}
              alt='profile'
            />
          </div>
        </div>
        <div className='col-md-8 col-sm-6'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='signup-firstname'>
                <FormattedMessage id='INPUT_FIRSTNAME_LABEL' />
              </label>
              <input
                id='signup-firstname'
                type='text'
                className={classNames("form-control", {
                  "is-invalid": error && error.message,
                })}
                placeholder={intl.formatMessage({
                  id: "INPUT_FIRSTNAME_LABEL",
                })}
                name='firstname'
                value={userData.firstname}
                onChange={onChange}
              />
              <div className='invalid-feedback'>
                {error && error.type === "required" && (
                  <FormattedMessage id='ERROR_FORM_REQUIRED' />
                )}
                {error && error.type === "firstname" && (
                  // to do translaton <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                  <p>{error.message}</p>
                )}
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='signup-lastname'>
                <FormattedMessage id='INPUT_LASTNAME_LABEL' />
              </label>
              <input
                id='signup-lastname'
                type='text'
                className={classNames("form-control", {
                  "is-invalid": error && error.message,
                })}
                placeholder={intl.formatMessage({
                  id: "INPUT_LASTNAME_LABEL",
                })}
                name='lastname'
                value={userData.lastname}
                onChange={onChange}
              />
              <div className='invalid-feedback'>
                {error && error.type === "required" && (
                  <FormattedMessage id='ERROR_FORM_REQUIRED' />
                )}
                {error && error.type === "lastname" && (
                  // <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                  <p>{error.message}</p>
                )}
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='signup-email'>
                <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />
              </label>
              <input
                id='signup-email'
                type='email'
                className={classNames("form-control", {
                  "is-invalid": error && error.message,
                })}
                placeholder='customer@example.com'
                name='email'
                value={userData.email}
                onChange={onChange}
              />
              <div className='invalid-feedback'>
                {error && error.type === "required" && (
                  <FormattedMessage id='ERROR_FORM_REQUIRED' />
                )}
                {error && error.type === "email" && (
                  <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                )}
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='signup-phone'>
                {/* <FormattedMessage id='INPUT_LASTNAME_LABEL' /> */}
                Phone
              </label>
              <input
                id='signup-phone'
                type='text'
                className={classNames("form-control", {
                  "is-invalid": error && error.message,
                })}
                placeholder={intl.formatMessage({
                  id: "INPUT_LASTNAME_LABEL",
                })}
                name='phone'
                value={userData.phone}
                onChange={onChange}
              />
              <div className='invalid-feedback'>
                {error && error.type === "required" && (
                  <FormattedMessage id='ERROR_FORM_REQUIRED' />
                )}
                {error && error.type === "phone" && (
                  // <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                  <p>{error.message}</p>
                )}
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='signup-address'>
                {/* <FormattedMessage id='INPUT_LASTNAME_LABEL' /> */}
                Adress
              </label>
              <input
                id='signup-address'
                type='text'
                className={classNames("form-control", {
                  "is-invalid": error && error.message,
                })}
                /* placeholder={intl.formatMessage({
                  id: "INPUT_address_LABEL",
                })}*/
                name='address'
                value={userData.address}
                onChange={onChange}
              />
              <div className='invalid-feedback'>
                {error && error.type === "required" && (
                  <FormattedMessage id='ERROR_FORM_REQUIRED' />
                )}
                {error && error.type === "address" && (
                  // <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
                  <p>{error.message}</p>
                )}
              </div>
            </div>
            <div className='form-group mb-0'>
              <button
                type='submit'
                className={classNames("btn", "btn-primary", "mt-3", {
                  "btn-loading": loading,
                })}
              >
                {/* <FormattedMessage id='BUTTON_REGISTER' /> */}
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authState.user,
  loading: state.loadingState.loading,
  error: state.errorState.error,
});

export default connect(mapStateToProps)(Profile);
