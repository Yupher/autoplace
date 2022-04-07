import React, { useState } from 'react'
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextFieldRedux } from './ReduxFormMUI';

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import ArrowForward from '@material-ui/icons/ArrowForward';

import Grid from '@material-ui/core/Grid';


import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import MessagesForm from './MessagesForm';

import { closeMsgAction } from '../../redux/actions/authActions_v1'
import { addAdmin } from '../../redux/actions/usersActions'

// validation functions
const required = value => (value === null ? 'Required' : undefined);

const email = value => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email'
        : undefined
);

const algeriaPhone = value => (
    value && !/^0{1}[5-7]{1}[0-9]{8}$/i.test(value)
        ? 'Invalid Phone'
        : undefined
);

const styles = theme => ({
    title: {
        marginTop: 4,
        marginBottom: 20,
        textTransform: 'capitalize',
        fontSize: 18,
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            fontWeight: 600,
            marginBottom: theme.spacing(1)
        }
    },
    titleSeconde: {
        marginTop: 50,
    },
    formControl: {
        width: '100%',
        // background: "#fcfcfe",
        // borderRadius: "10px !important",
        marginBottom: theme.spacing(1)
    },
    field: {
        marginTop: 1,
        marginBottom: 1,
        width: '100%',
        '& svg': {
            color: theme.palette.grey[400],
            fontSize: 18,
        }
    },
    select: {
        marginTop: 16,
        marginBottom: 10,
        padding: '2px',
        background: 'rgba(252, 252, 254, 0.6)',
        width: '100%',
        '& svg': {
            color: theme.palette.grey[400],
            fontSize: 18,
        }
    },
    button: {
        marginTop: '0.4rem !important',

    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    iconSmall: {
        fontSize: 20,
    },
    signArrow: {
        transform: theme.direction === 'rtl' ? 'rotate(180deg)' : 'none',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
});


const AppAcountParamsForm = props => {

    const { classes, addAdmin, token, messagesAuth, closeMsg } = props;



    const [cemail, setCemail] = useState('');
    const [role, setRole] = useState('Role');
    const [number, setNumber] = useState('');


    const onUpdate = e => {
        e.preventDefault();

        addAdmin({ email: cemail, number, role, token });
        setCemail('');
        setRole('Role');
        setNumber('');
    }



    return (
        <div>

            <Typography variant="h6" component="h2" className={classes.title} >
                User Update To Admin
            </Typography>

            {
                messagesAuth && messagesAuth.type === "add admin"
                    ? (
                        <MessagesForm
                            variant="error"
                            className={classes.msgUser}
                            message={messagesAuth.message}
                            onClose={closeMsg}
                        />
                    )
                    : ''
            }


            <section>
                <form onSubmit={onUpdate} className="Grid-vert" >

                    <Grid container spacing={3} alignItems='center'>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <FormControl className={classes.formControl} >
                                    <Field
                                        name="email"
                                        component={TextFieldRedux}
                                        placeholder="Email"
                                        label="Email"
                                        validate={[required, email]}
                                        className={classes.field + ' white-field'}
                                        value={cemail}
                                        onChange={e => setCemail(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <FormControl className={classes.formControl} >
                                    <Field
                                        name="number"
                                        component={TextFieldRedux}
                                        placeholder="Number"
                                        label="Number"
                                        className={classes.field + ' white-field'}
                                        value={number}
                                        onChange={e => setNumber(e.target.value)}
                                        validate={[required, algeriaPhone]}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                className={classes.select}
                            >
                                <MenuItem value='Role'>
                                    Role
                                </MenuItem>
                                <MenuItem value='main_admin'> Main Admin </MenuItem>
                                <MenuItem value='admin'> Admin </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <Button className={classes.button} variant="contained" disabled={false} fullWidth color="primary" size="large" type="submit" >
                                    Update
                                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>


                </form>
            </section>

        </div >
    )
}


AppAcountParamsForm.propTypes = {
    intl: intlShape.isRequired,
    classes: PropTypes.object,
    token: PropTypes.string,
    updateMe: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    messagesAuth: PropTypes.object,
    closeMsg: PropTypes.func.isRequired,
};


const AppAcountReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(AppAcountParamsForm);


const mapDispatchToProps = { addAdmin, closeMsg: closeMsgAction };

const mapStateToProps = state => ({
    token: state.get("auth").token,
    messagesAuth: state.get("auth").error,
    ...state,
});


const AppAcountMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppAcountReduxed);


export default withStyles(styles)(injectIntl(AppAcountMapped));

