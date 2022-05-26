import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

import PageTitle from "../components/shared/PageTitle";
import BlockSpace from "../components/blocks/BlockSpace";
import ResetPasswordForm from "../components/resetPassword/ResetPasswordForm";

const ResetPassword = ({ user, error }) => {
  const navigate = useNavigate();

  const intl = useIntl();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <Fragment>
      <PageTitle>
        {intl.formatMessage({ id: "HEADER_RESET_PASSWORD" })}
      </PageTitle>
      <BlockSpace layout='after-header' />
      <div className='block'>
        <div className='container container--max--lg'>
          <div className='row'>
            <div className='col-12 d-flex mt-4 mt-md-0'>
              <div className='card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4'>
                <div className='card-body card-body--padding--2'>
                  <h3 className='card-title'>
                    <FormattedMessage id='HEADER_RESET_PASSWORD' />
                  </h3>
                  {error && (
                    <div className='alert alert-sm alert-danger'>
                      {/* <FormattedMessage id={error.message} /> */}
                      <p>{error.message}</p>
                    </div>
                  )}
                  <ResetPasswordForm />
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
  user: state.authState.user,
  error: state.errorState.error,
});

export default connect(mapStateToProps)(ResetPassword);
