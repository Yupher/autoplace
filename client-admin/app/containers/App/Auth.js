import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Outer from '../Templates/Outer';
import {
  Login, Register,
  LoginFullstack, RegisterFullstack,
  ResetPassword, ResetPasswordFullstack,
  LockScreen, ComingSoon,
  Maintenance, TermsConditions, Password
} from '../pageListAsync';

const Auth = () => {
  return (
    <Outer>
      <Switch>
        <Route exact path="/auths/login" component={Login} />
        <Route exact path="/auths/register" component={Register} />
        <Route exact path="/auths/reset-password" component={Password} />
        <Route exact path="/auths/login-firebase" component={LoginFullstack} />
        <Route exact path="/auths/register-firebase" component={RegisterFullstack} />
        <Route exact path="/auths/reset-firebase" component={ResetPasswordFullstack} />
        <Route exact path="/auths/lock-screen" component={LockScreen} />
        <Route exact path="/auths/maintenance" component={Maintenance} />
        <Route exact path="/auths/coming-soon" component={ComingSoon} />
        <Route exact path="/auths/terms-conditions" component={TermsConditions} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
