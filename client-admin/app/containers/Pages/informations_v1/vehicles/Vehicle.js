import React, { useState, Fragment, useEffect } from 'react'

import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';


import styles from '../../../../components/Tables/tableStyle-jss';

import { Link } from 'react-router-dom';

import Index from '../../../../components/Pages/vehicle'

const Vehicle = (props) => {

    const {
        famsApi, current
    } = props;

    return (
        <div>
            {
                famsApi === null ? <h5> To access to this data you must first &nbsp;
                    <Link to='/app/pages/vehicles' style={{ color: '#283593' }} >choose a category</Link>. </h5> :
                    current === null ? <h5> To access to this data you must first &nbsp;
                        <Link to='/app/pages/families' style={{ color: '#283593' }} >choose a vehicle</Link>. </h5> :
                        <Index current={current} />
            }
        </div>
    )
}




const VehicleReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(Vehicle);


const mapDispatchToProps = {};

const mapStateToProps = state => ({
    // token: state.get("auth").token,
    famsApi: state.get("infoVeh").famsApi,
    current: state.get("infoVeh").current,
    ...state,
});

const AllCatVehMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleReduxed);


export default withWidth()(withStyles(styles)(AllCatVehMapped));
