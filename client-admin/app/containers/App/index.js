import React, { useEffect, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { loadUser } from "../../redux/actions/authActions_v1"

import AdminRouter from "../Routers/adminRouter"
import PublicRouter from "../Routers/PublicRouter"
import AuthRouter from '../Routers/AuthRouter';

import Spinner from '../Routers/Spinner'


import NotFound from '../Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LandingCorporate from './Landing';
import Public from './Public';


import {
  Login, Register,
  LoginFullstack, RegisterFullstack,
  ResetPassword, ResetPasswordFullstack,
  LockScreen, ComingSoon,
  Maintenance, TermsConditions, ConfirmEmailFullstack, ConfirmPhoneFullstack
} from '../pageListAsync';




import Header from '../../components_redparts/layouts/Header'


const App = (props) => {

  // check auth current user
  useEffect(() => {
    loadUser();
  }, []);

  const {
    loadUser,
    isLoggedIn
  } = props;



  return (
    <Fragment>
      {
        isLoggedIn === null ? <Spinner {...props} /> :
          <Switch>

            {/* <Route path="/" component={PublicRouter} /> */}
            {/* <Route component={NotFound} /> */}


            {/* Dashboard  */}
            <Route path="/app" component={AdminRouter} />
            <Route path="/auths" component={AuthRouter} />

            <Fragment>
              <Header />
              <Switch>
                <Route exact path="/" component={LandingCorporate} />
              </Switch>
            </Fragment>


          </Switch>
      }
    </Fragment>
  );
}



const LoginFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(App);

const mapDispatchToProps = {
  loadUser
};

const mapStateToProps = state => ({
  isLoggedIn: state.get("auth").isLoggedIn,
  ...state,
});

const LoginFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormReduxed);



export default (injectIntl(LoginFormMapped));


