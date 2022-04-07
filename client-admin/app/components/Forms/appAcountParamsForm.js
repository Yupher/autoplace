import React, { useState } from 'react'
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextFieldRedux } from './ReduxFormMUI';

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import ArrowForward from '@material-ui/icons/ArrowForward';

import Grid from '@material-ui/core/Grid';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import MessagesForm from './MessagesForm';

import { updateMe, updatePassword, closeMsgAction } from '../../redux/actions/authActions_v1'

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email'
        : undefined
);

const passwordsMatch = (value, allValues) => {
    if (value !== allValues.get('password')) {
        return 'Passwords dont match';
    }
    return undefined;
};


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

    const { classes, updateMe, updatePassword, token, messagesAuth, closeMsg } = props;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = event => event.preventDefault();

    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleMouseDownPasswordConfirm = event => event.preventDefault();

    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const handleClickShowPasswordOld = () => setShowPasswordOld(!showPasswordOld);
    const handleMouseDownPasswordOld = event => event.preventDefault();


    const [firstname, setfirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [cemail, setCemail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordOld, setPasswordOld] = useState('');


    const onUpdate = e => {
        e.preventDefault();

        updateMe({ firstname, lastname, email: cemail, token });
    }

    const onUpdatePassword = e => {
        e.preventDefault();

        updatePassword({ password, passwordConfirm, passwordOld, token });
    }

    return (
        <div>

            <Typography variant="h6" component="h2" className={classes.title} >
                Information Update
            </Typography>

            {
                messagesAuth !== null && messagesAuth.type === "update me"
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
                                        name="firstname"
                                        component={TextFieldRedux}
                                        placeholder="First Name"
                                        label="First Name"
                                        className={classes.field + ' white-field'}
                                        value={firstname}
                                        onChange={e => setfirstname(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <FormControl className={classes.formControl} >
                                    <Field
                                        name="lastname"
                                        component={TextFieldRedux}
                                        placeholder="Last Name"
                                        label="Last Name"
                                        className={classes.field + ' white-field'}
                                        value={lastname}
                                        onChange={e => setLastname(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
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
                                <Button variant="contained" disabled={false} fullWidth color="primary" size="large" type="submit" >
                                    Update
                                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                </form>
            </section>

            <Typography variant="h6" component="h2" className={classNames(classes.title, classes.titleSeconde)} >
                Password Update
            </Typography>

            {
                messagesAuth !== null && messagesAuth.type === "update password"
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
                <form onSubmit={onUpdatePassword} className="Grid-vert" >

                    <Grid container spacing={3} alignItems='center'>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <FormControl className={classes.formControl} >
                                    <Field
                                        name="password"
                                        component={TextFieldRedux}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        label="Password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        required
                                        validate={required}
                                        className={classes.field + ' white-field'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div>
                                <FormControl className={classes.formControl} >
                                    <Field
                                        name="passwordConfirm"
                                        component={TextFieldRedux}
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        placeholder="Password Confirm"
                                        label="Password Confirm"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={handleClickShowPasswordConfirm}
                                                        onMouseDown={handleMouseDownPasswordConfirm}
                                                    >
                                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        required
                                        validate={[required, passwordsMatch]}
                                        className={classes.field + ' white-field'}
                                        value={passwordConfirm}
                                        onChange={e => setPasswordConfirm(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div>
                                <FormControl className={classes.formControl} >
                                    <Field
                                        name="passwordOld"
                                        component={TextFieldRedux}
                                        type={showPasswordOld ? 'text' : 'password'}
                                        placeholder="Password Old"
                                        label="Password Old"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={handleClickShowPasswordOld}
                                                        onMouseDown={handleMouseDownPasswordOld}
                                                    >
                                                        {showPasswordOld ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        required
                                        validate={required}
                                        className={classes.field + ' white-field'}
                                        value={passwordOld}
                                        onChange={e => setPasswordOld(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div>
                                <Button variant="contained" disabled={false} fullWidth color="primary" size="large" type="submit" >
                                    Update
                                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                </form>
            </section>

        </div>
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


const mapDispatchToProps = { updateMe, updatePassword, closeMsg: closeMsgAction, };

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

