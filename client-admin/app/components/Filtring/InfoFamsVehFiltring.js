import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import Grid from '@material-ui/core/Grid';

import styles from 'enl-components/Tables/tableStyle-jss';

import { setDisplayVehFams, setFilterVehFams } from '../../redux/actions/infoVehActions'

const InfoCatsVehFiltring = (props) => {

    const { classes, setDisplayVehFams, setFilterVehFams } = props;

    const [display, setDisplay] = useState("normal");
    const [filter, setFilter] = useState("cars");

    useEffect(() => {
        setDisplayVehFams(display)
    }, [display]);

    useEffect(() => {
        setFilterVehFams(filter)
    }, [filter]);

    return (
        <div>
            <Grid item xs={12}>
                <Grid container className={classes.settings}>

                    <Grid
                        item
                        md={6}
                        className={classes.demo}
                    >
                        <FormControl component="fieldset" required className={classes.formControl}>
                            <FormLabel component="legend"> Display  </FormLabel>
                            <RadioGroup
                                aria-label="display"
                                name="display"
                                className={classes.group}
                                value={display}
                                onChange={(event) => setDisplay(event.target.value)}
                            >
                                <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                                <FormControlLabel value="asc" control={<Radio />} label="Asc" />
                                <FormControlLabel value="desc" control={<Radio />} label="Desc" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid
                        item
                        md={6}
                        className={classes.demo}
                    >
                        <FormControl component="fieldset" required className={classes.formControl}>
                            <FormLabel component="legend"> Filter By : {filter} </FormLabel>
                            <RadioGroup
                                aria-label="filter"
                                name="filter"
                                className={classes.group}
                                value={filter}
                                onChange={(event) => setFilter(event.target.value)}
                            >
                                <FormControlLabel value="cars" control={<Radio />} label="Cars" disabled={display === 'normal' ? true : false} />
                                <FormControlLabel value="years" control={<Radio />} label="Last Years" disabled={display === 'normal' ? true : false} />

                            </RadioGroup>
                        </FormControl>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

InfoCatsVehFiltring.propTypes = {
    classes: PropTypes.object.isRequired,
    setDisplayVehFams: PropTypes.func.isRequired,
    setFilterVehFams: PropTypes.func.isRequired,

};


const CatsFiltringReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(InfoCatsVehFiltring);


const mapDispatchToProps = { setDisplayVehFams, setFilterVehFams };



const mapStateToProps = state => ({
    ...state,
});

const CatsFiltringMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(CatsFiltringReduxed);


export default withStyles(styles)(injectIntl(CatsFiltringMapped));

