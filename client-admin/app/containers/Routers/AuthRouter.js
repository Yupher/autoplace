import React from 'react'

import { Switch, Route } from 'react-router-dom';
import ThemeWrapper from '../App/ThemeWrapper';

import Auth from '../App/Auth';

const AuthRouter = () => {

    return (
        <ThemeWrapper>
            <Switch>
                <Auth />
            </Switch>
        </ThemeWrapper>
    )
}

export default AuthRouter
