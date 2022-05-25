import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { CLEAR_ERROR, SET_ERROR } from "../actions/types/errorTypes";
import { confirmEmail, resendEmail } from "../actions/authActions";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";

const ConfirmEmail = (props) => {
  const intl = useIntl();
  const { user, loading, error, confirmEmail, resendEmail } = props;
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.confirmed) {
      dispatch({ type: CLEAR_ERROR });
      return navigate("/");
    }
  }, [user]);

  const onChange = (e) => {
    if (error) {
      dispatch({ type: CLEAR_ERROR });
    }

    setCode(e.target.value);
  };

  const onResend = (e) => {
    e.preventDefault();
    resendEmail();
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    if (!code) {
      return dispatch({
        type: SET_ERROR,
        payload: { type: "code", message: "Invalid" },
      });
    }
    dispatch({ type: CLEAR_ERROR });
    confirmEmail(code);
  };

  return (
    <React.Fragment>
      <PageTitle>
        {intl.formatMessage({ id: "EMAIL_CONFIRMATION_TITLE" })}
      </PageTitle>

      <BlockSpace layout='after-header' />
      <div className='block'>
        <div className='container container--max--lg'>
          <div className='row'>
            <div className='col-12 d-flex mt-4 mt-md-0'>
              <div className='card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4'>
                <div className='card-body card-body--padding--2'>
                  <h3 className='card-title'>
                    {/* <FormattedMessage id='HEADER_LOGIN' /> */}
                    <FormattedMessage id='EMAIL_CONFIRMATION_TITLE' />
                  </h3>
                  <form onSubmit={onSubmit}>
                    {error && (
                      <div className='alert alert-sm alert-danger'>
                        {/* <FormattedMessage id={error.message} /> */}
                        <p>{error.message}</p>
                      </div>
                    )}

                    <div className='form-group'>
                      <label htmlFor='confirmaton-code'>
                        <FormattedMessage id='INPUT_CODE_CONFIRMATION' />
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

                    <div className='account-menu__form-link'>
                      <button
                        type='button'
                        className={classNames("btn-resend", {
                          "btn-loading": loading,
                        })}
                        onClick={onResend}
                      >
                        <FormattedMessage id='BUTTON_RESEND_EMAIL' />
                      </button>
                    </div>

                    <div className='form-group mb-0'>
                      <button
                        type='submit'
                        className={classNames("btn", "btn-primary", "mt-3", {
                          "btn-loading": loading,
                        })}
                      >
                        <FormattedMessage id='BUTTON_SUBMIT' />
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
  resendEmail,
};

export default connect(mapStateToProps, actions)(ConfirmEmail);
