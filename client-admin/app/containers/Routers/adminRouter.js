import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


import ThemeWrapper from '../App/ThemeWrapper';


import Spinner from './Spinner'

import Application from '../App/Application';




const AdminRouter = (props) => {

    const {
        loading, isLoggedIn, user, ...rest
    } = props;


    return (
        <ThemeWrapper>
            {
                isLoggedIn === true && user && (user.role === 'admin' || user.role === 'main_admin') ? <Application {...rest} /> :
                    isLoggedIn === false || (user && user.role !== 'admin') ? <Redirect to='/' /> :
                        <Spinner {...props} />
            }
        </ThemeWrapper>
    )
}




const mapDispatchToProps = {};

const mapStateToProps = state => ({
    loading: state.get("auth").loading,
    isLoggedIn: state.get("auth").isLoggedIn,
    user: state.get("auth").user,
    ...state,
});

const AllUsersMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminRouter);


export default AllUsersMapped;
