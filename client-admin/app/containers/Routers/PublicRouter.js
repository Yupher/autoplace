import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Spinner from './Spinner'


import Public from '../App/Public';

const PublicRouter = (props) => {

    const {
        Application, loading, isLoggedIn, user, ...rest
    } = props;

    // console.log(user);


    return (
        isLoggedIn ? <Public /> :
            isLoggedIn === false ? <Redirect to='/' /> :
                <Spinner {...props} />
    )
}




const mapDispatchToProps = {};

const mapStateToProps = state => ({
    loading: state.get("auth").loading,
    isLoggedIn: state.get("auth").isLoggedIn,
    user: state.get("auth").user,
    ...state,
});

const PublicRouterMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublicRouter);


export default PublicRouterMapped;
