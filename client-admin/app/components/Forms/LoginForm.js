import React, { useState } from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.svg';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import { closeMsgAction } from 'enl-redux/actions/authActions';
import { CheckboxRedux, TextFieldRedux } from './ReduxFormMUI';
import MessagesForm from './MessagesForm';
import messages from './messages';
import styles from './user-jss';
import Tooltip from '@material-ui/core/Tooltip';

// Version 1 
import { Login, closeMsgAction, loginGoogle, FacebookBtnLogin, authError } from "../../redux/actions/authActions_v1"
import { GoogleLogin } from 'react-google-login';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'



// validation functions
const required = value => (value === null ? 'Required' : undefined);

const email = value => (
  value && !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || /^0{1}[5-7]{1}[0-9]{8}$/i.test(value))
    ? 'Invalid email'
    : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});


// Main functions 


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
    loginGoogle,
    FacebookBtnLogin,
    authError
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = event => event.preventDefault();



  // states 

  const [emailFr, setEmailFr] = useState("");
  const [password, setPassword] = useState("");


  // functions 

  const onLogin = e => {

    e.preventDefault();


    if (email(emailFr)) {
      authError("login", "Give us a valid email or phone.");
    } else {
      Login({ email: emailFr, password });
    }


  }

  // Google Login 

  const googleSuccess = async (res) => {


    const result = res.profileObj;
    const token = res.tokenId;

    loginGoogle({ result, token });

  };

  const googleError = () => loginGoogle({ error: 'Google Sign In was unsuccessful. Try again later', type: "login" });

  // Facebook Login 

  const facebookSuccess = (res) => {

    if (res.accessToken) {
      const token = res.accessToken;
      const facebook = res.userID;
      const photo = `https://graph.facebook.com/${facebook}/picture`;
      const name = res.name.split(" ");
      const lastname = name[0];
      const firstname = res.name.substr(lastname.length + 1, res.name.length);

      FacebookBtnLogin({ token, facebook, lastname, firstname, photo });
    } else {
      FacebookBtnLogin({ error: "Facebook Sign In was unsuccessful. Try again later", type: "login" });
    }

  };


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
          <FormattedMessage {...messages.login} />
        </Typography>
        <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/auths/register">
          <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
          <FormattedMessage {...messages.createNewAccount} />
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
                name="password"
                component={TextFieldRedux}
                type={showPassword ? 'text' : 'password'}
                label={intl.formatMessage(messages.loginFieldPassword)}
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
          <div className={classes.optArea}>
            <FormControlLabel
              className={classes.label}
              control={<Field name="checkbox" component={CheckboxRedux} />}
              label={intl.formatMessage(messages.loginRemember)}
            />
            <Button size="small" component={LinkBtn} to="/auths/reset-password" className={classes.buttonLink}>
              <FormattedMessage {...messages.loginForgotPassword} />
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
      <h5 className={classes.divider}>
        <FormattedMessage {...messages.loginOr} />
      </h5>
      <section className={classes.socmedSideLogin}>

        {/* Login Google  */}

        <GoogleLogin
          clientId="578851431481-pfijho39klfn47r3rb0bta731qaqgsb5.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              variant="contained"
              className={classes.redBtn}
              type="button"
              size="large"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <i className="ion-social-google" />
              Google
            </Button>

          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />


        {/* Login facebook */}


        <FacebookLogin
          appId="2732217483740418"
          callback={facebookSuccess}
          render={renderProps => (
            <Button
              variant="contained"
              className={classes.blueBtn}
              type="button"
              size="large"
              onClick={renderProps.onClick}
            >
              <i className="ion-social-facebook" />
              Facebook
            </Button>
          )}
        />

        <Tooltip title="It's comming soon." placement="top" arrow>
          <Button
            variant="contained"
            className={classes.cyanBtn}
            type="button"
            size="large"
          >
            <i className="ion-social-twitter" />
            Twitter
          </Button>
        </Tooltip>

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
  loginGoogle,
  FacebookBtnLogin,
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
