import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.svg';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import { closeMsgAction } from 'enl-redux/actions/authActions';
import { TextFieldRedux } from './ReduxFormMUI';
import MessagesForm from './MessagesForm';
import messages from './messages';
import styles from './user-jss';


// Version 1 
import { Login, closeMsgAction, loginGoogle, FacebookBtnLogin, authError } from "../../redux/actions/authActions_v1"



// validation functions
const required = value => (value === null ? 'Required' : undefined);

const email = value => (
    value && !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || /^0{1}[5-7]{1}[0-9]{8}$/i.test(value))
        ? 'Invalid email'
        : undefined
);


const passwordsMatch = (value, allValues) => {
    if (value !== allValues.get('password')) {
        return 'Passwords dont match';
    }
    return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});





const LoginForm = (props) => {
    const {
        classes,
        pristine,
        submitting,
        intl,
        closeMsg,
        loading,
        // v1
        messagesAuth,
        Login,
        authError
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = event => event.preventDefault();



    // states 

    const [emailFr, setEmailFr] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    // functions 

    const onLogin = e => {


    }


    return (
        <Paper className={classes.sideWrap}>
            <Hidden mdUp>
                <div className={classes.headLogo}>
                    <NavLink to="/" className={classes.brand}>
                        <img src={logo} alt={brand.name} />
                        {brand.name}
                    </NavLink>
                </div>
            </Hidden>
            <div className={classes.topBar}>
                <Typography variant="h4" className={classes.title}>
                    Password
                </Typography>
                <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/auths/login">
                    <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
                    Already have account ?
                </Button>
            </div>
            {
                messagesAuth !== null && messagesAuth.typeAuth === "login"
                    ? (
                        <MessagesForm
                            variant="error"
                            className={classes.msgUser}
                            message={messagesAuth.messageAuth}
                            onClose={closeMsg}
                        />
                    )
                    : ''
            }
            <section className={classes.pageFormSideWrap}>
                <form onSubmit={onLogin}>
                    <div>
                        <FormControl className={classes.formControl}>
                            <Field
                                name="email"
                                component={TextFieldRedux}
                                placeholder="Your Email or Phone"
                                label="Your Email or Phone"
                                required
                                validate={[required, email]}
                                className={classes.field}
                                value={emailFr}
                                onChange={e => setEmailFr(e.target.value)}
                            />
                        </FormControl>
                    </div>

                    <div>
                        <FormControl className={classes.formControl}>
                            <Field
                                name="code"
                                component={TextFieldRedux}
                                placeholder="Code"
                                label="Code"
                                required
                                className={classes.field}
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                onInput={(e) => {
                                    e.target.value = e.target.value === "" ? e.target.value : Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                                }}
                            />
                        </FormControl>
                    </div>

                    {
                        true ?
                            <Fragment>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <Field
                                            name="password"
                                            component={TextFieldRedux}
                                            type={showPassword ? 'text' : 'password'}
                                            label='New Password'
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
                                            className={classes.field}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <Field
                                            name="password confirm"
                                            component={TextFieldRedux}
                                            type={showPassword ? 'text' : 'password'}
                                            label='Password Confirm'
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
                                            validate={[required, passwordsMatch]}
                                            className={classes.field}
                                            value={passwordConf}
                                            onChange={e => setPasswordConf(e.target.value)}
                                        />
                                    </FormControl>
                                </div>
                            </Fragment>
                            : ''
                    }
                    <div className={classes.btnArea}>
                        <Button variant="outlined" fullWidth color="primary" size="large">
                            Resend Code
                        </Button>
                    </div>

                    <div className={classes.btnArea}>
                        <Button variant="contained" disabled={loading} fullWidth color="primary" size="large" type="submit">
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            <FormattedMessage {...messages.loginButtonContinue} />
                            {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />}
                        </Button>
                    </div>
                </form>
            </section>
        </Paper>
    );
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    closeMsg: PropTypes.func.isRequired,
    // v1
    messagesAuth: PropTypes.object,
    Login: PropTypes.func.isRequired,
    loginGoogle: PropTypes.func.isRequired,
    FacebookBtnLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
    messagesAuth: null,
    loading: false
};

const LoginFormReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(LoginForm);


const mapDispatchToProps = {
    closeMsg: closeMsgAction,
    Login,
    authError
};

const reducerAuth = 'authReducer';

const mapStateToProps = state => ({
    messagesAuth: state.get("auth").error,
    loading: state.get(reducerAuth).loading,
    ...state,
});

const LoginFormMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormReduxed);

export default withStyles(styles)(injectIntl(LoginFormMapped));
