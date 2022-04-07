import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';

import Checkbox from '@material-ui/core/Checkbox';


import Grid from '@material-ui/core/Grid';

import styles from 'enl-components/Tables/tableStyle-jss';

import { setFiltringUsers } from '../../redux/actions/infoActions'

const InfoUsersFiltring = props => {

    const { classes, setFiltringUsers } = props;

    const [path, setPath] = useState(window.location.pathname);
    const [all, setAll] = useState(true);
    const [admin, setAdmin] = useState(true);
    const [vendor, setVendor] = useState(true);
    const [client, setClient] = useState(true);
    const [main, setMain] = useState(true);

    useEffect(() => {
        if (admin && vendor && client && main) {
            setAll(true);
        } else {
            setAll(false);
        }
    }, [admin, vendor, client, main]);


    useEffect(() => {
        const interval = setInterval(() => {
            setPath(window.location.pathname);
        }, 1);
        return () => clearInterval(interval);
    }, []);

    const filterTypes = type => {

        switch (type) {

            case 'all':
                setFiltringUsers('all', { path })
                setMain(true)
                setAdmin(true)
                setVendor(true)
                setClient(true)
                return null;

            case 'main_admin':
                setFiltringUsers('main_admin', { type: !main, path });
                setMain(!main);
                return null;
            case 'admin':
                setFiltringUsers('admin', { type: !admin, path });
                setAdmin(!admin)
                return null;
            case 'vendor':
                setFiltringUsers('vendor', { type: !vendor, path })
                setVendor(!vendor)
                return null;
            case 'client':
                setFiltringUsers('client', { type: !client, path })
                setClient(!client)
                return null;

            default:
                return null;
        }

    }

    return (
        <div>

            <Grid item xs={12}>
                <Grid container className={classes.settings}>

                    <Grid item xs={6} sm={4}>
                        <FormControl component="fieldset">
                            <FormLabel>Types</FormLabel>
                            <FormGroup role="radiogroup" >
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={all}
                                            onChange={() => filterTypes('all')}
                                            value={all}
                                        />
                                    )}
                                    label="All"
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={main}
                                            onChange={() => filterTypes('main_admin')}
                                            value={main}
                                        />
                                    )}
                                    label="Main Admin"
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={admin}
                                            onChange={() => filterTypes('admin')}
                                            value={admin}
                                        />
                                    )}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={vendor}
                                            onChange={() => filterTypes('vendor')}
                                            value={vendor}
                                        />
                                    )}
                                    label="Vendor"
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={client}
                                            onChange={() => filterTypes('client')}
                                            value={client}
                                        />
                                    )}
                                    label="Client"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>


                </Grid>
            </Grid>

        </div>
    )
}


InfoUsersFiltring.propTypes = {
    classes: PropTypes.object.isRequired,
    setFiltringUsers: PropTypes.func.isRequired,

};


const UsersFiltringReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(InfoUsersFiltring);


const mapDispatchToProps = {
    setFiltringUsers: setFiltringUsers
};



const mapStateToProps = state => ({
    ...state,
});

const UsersFiltringMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersFiltringReduxed);


export default withStyles(styles)(injectIntl(UsersFiltringMapped));

