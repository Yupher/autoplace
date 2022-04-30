import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { CLEAR_ERROR, SET_ERROR } from "../actions/types/errorTypes";
import { confirmEmail } from "../actions/authActions";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";

const ConfirmEmail = (props) => {
  const { user, loading, error, confirmEmail } = props;
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.confirmed) {
      return navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [success]);

  const onChange = (e) => {
    if (error) {
      dispatch({ type: CLEAR_ERROR });
    }

    setCode(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      return dispatch({
        type: SET_ERROR,
        payload: { type: "code", message: "Invalid" },
      });
    }
    let status = await confirmEmail(code);

    console.log(status);
    if (status === "success") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <React.Fragment>
      <PageTitle>Email Confirmation</PageTitle>

      <BlockSpace layout='after-header' />
      <div className='block'>
        <div className='container container--max--lg'>
          <div className='row'>
            <div className='col-12 d-flex mt-4 mt-md-0'>
              <div className='card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4'>
                <div className='card-body card-body--padding--2'>
                  <h3 className='card-title'>
                    {/* <FormattedMessage id='HEADER_LOGIN' /> */}
                    Confirm Your Email
                  </h3>
                  <form onSubmit={onSubmit}>
                    {error && (
                      <div className='alert alert-sm alert-danger'>
                        {/* <FormattedMessage id={error.message} /> */}
                        <p>{error.message}</p>
                      </div>
                    )}

                    {success && (
                      <div className='alert alert-sm alert-success'>
                        {/* <FormattedMessage id={error.message} /> */}
                        <p>{error.message}</p>
                      </div>
                    )}

                    <div className='form-group'>
                      <label htmlFor='confirmaton-code'>
                        {/* <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' /> */}
                        Enter confirmation code
                      </label>
                      <input
                        id='confirmation-code'
                        type='text'
                        className={classNames("form-control", {
                          "is-invalid": error && error.message,
                        })}
                        placeholder='xxxx'
                        name='code'
                        value={code}
                        onChange={onChange}
                      />
                      <div className='invalid-feedback'>
                        {error && error.type === "required" && (
                          <FormattedMessage id='ERROR_FORM_REQUIRED' />
                        )}
                        {error && error.type === "code" && (
                          //   <FormattedMessage id='ERROR_FORM_INCORRECT_EMAIL' />
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
                        {/* <FormattedMessage id='BUTTON_LOGIN' /> */}
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlockSpace layout='before-footer' />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loadingState.loading,
  user: state.authState.user,
  error: state.errorState.error,
});

const actions = {
  confirmEmail,
};

export default connect(mapStateToProps, actions)(ConfirmEmail);
