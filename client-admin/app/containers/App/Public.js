import React from 'react'

import { Switch, Route } from 'react-router-dom';

import {
    Login, Register,
    LoginFullstack, RegisterFullstack,
    ResetPassword, ResetPasswordFullstack,
    LockScreen, ComingSoon,
    Maintenance, TermsConditions, ConfirmEmailFullstack, ConfirmPhoneFullstack
} from '../pageListAsync';

import Outer from '../Templates/Outer';


const Public = () => {
    return (
        <Switch>
            <Outer>
                <Switch>
                    <Route path="/confirm-email" component={ConfirmEmailFullstack} />
                    <Route exact path="/confirm-phone" component={ConfirmPhoneFullstack} />
                </Switch>
            </Outer>
        </Switch>
    )
}

export default Public
