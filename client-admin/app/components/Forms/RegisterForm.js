import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.svg';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { CheckboxRedux, TextFieldRedux } from './ReduxFormMUI';
import MessagesForm from './MessagesForm';
import messages from './messages';
import styles from './user-jss';
import Tooltip from '@material-ui/core/Tooltip';

// Version 1 
import { Register, closeMsgAction, loginGoogle, FacebookBtnLogin, authError } from "../../redux/actions/authActions_v1"
import { GoogleLogin } from 'react-google-login';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

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

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});


// Main Functions 

const RegisterForm = (props) => {

  // props 

  const {
    classes,
    pristine,
    submitting,
    intl,
    closeMsg,
    loading,
    user,
    // Added
    messagesAuth,
    Register,
    loginGoogle,
    FacebookBtnLogin,
    authError
  } = props;

  // states


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [emailFr, setEmailFr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");


  const [phone, setPhone] = useState(false);


  // functions 

  const onRegister = async e => {

    e.preventDefault();

    if (!phone && email(emailFr)) {
      authError("signup", "Give us a valid email.");
    } else if (phone && algeriaPhone(number)) {
      authError("signup", "Give us a valid phone.");
    } else {
      await Register({ firstname, lastname, email: emailFr, password, passwordConfirm: passwordConf, phone, number });
    }





  }

  const googleSuccess = async (res) => {


    const result = res.profileObj;
    const token = res.tokenId;

    loginGoogle({ result, token });

  };

  const googleError = () => loginGoogle({ error: 'Google Sign In was unsuccessful. Try again later', type: "signup" });

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
      FacebookBtnLogin({ error: "Facebook Sign In was unsuccessful. Try again later", type: "signup" });
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
          <FormattedMessage {...messages.register} />
        </Typography>
        <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/auths/login">
          <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
          <FormattedMessage {...messages.toAccount} />
        </Button>
      </div>
      {
        messagesAuth !== null && messagesAuth.typeAuth === "signup"
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
      <section>
        <form onSubmit={onRegister}>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="firstname"
                component={TextFieldRedux}
                placeholder="First Name"
                label="First Name"
                required
                className={classes.field}
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="lastname"
                component={TextFieldRedux}
                placeholder="Last Name"
                label="Last Name"
                required
                className={classes.field}
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </FormControl>
          </div>

          <div>

            {
              phone ?
                <FormControl className={classes.formControl}>
                  <Field
                    name="phone"
                    component={TextFieldRedux}
                    placeholder="Your Phone"
                    label="Your Phone"
                    required
                    validate={[required, algeriaPhone]}
                    className={classes.field}
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                  />
                </FormControl> :
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage(messages.loginFieldEmail)}
                    label={intl.formatMessage(messages.loginFieldEmail)}
                    required
                    validate={[required, email]}
                    className={classes.field}
                    value={emailFr}
                    onChange={e => setEmailFr(e.target.value)}
                  />
                </FormControl>
            }


          </div>


          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type="password"
                  label={intl.formatMessage(messages.loginFieldPassword)}
                  required
                  validate={[required, passwordsMatch]}
                  className={classes.field}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="passwordConfirm"
                  component={TextFieldRedux}
                  type="password"
                  label={intl.formatMessage(messages.loginFieldRetypePassword)}
                  required
                  validate={[required, passwordsMatch]}
                  className={classes.field}
                  value={passwordConf}
                  onChange={e => setPasswordConf(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div>

            <FormControlLabel
              control={<Field name="checkbox" component={CheckboxRedux} className={classes.agree}
                checked={phone} onChange={() => setPhone(!phone)} />}
              label="Register With Phone Number" />


          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              <FormattedMessage {...messages.loginButtonContinue} />
              {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />}
            </Button>
          </div>
        </form>
      </section>

      <h5 className={classes.divider}>
        <FormattedMessage {...messages.registerOr} />
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



RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  closeMsg: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // v1
  Register: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired,
  FacebookBtnLogin: PropTypes.func.isRequired,
  messagesAuth: PropTypes.object,
};

RegisterForm.defaultProps = {
  messagesAuth: null
};




const RegisterFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(RegisterForm);

const mapDispatchToProps = {
  closeMsg: closeMsgAction,
  Register,
  loginGoogle,
  FacebookBtnLogin,
  authError
};

const reducerAuth = 'authReducer';


const mapStateToProps = state => ({
  user: state.get("auth").user,
  loading: state.get(reducerAuth).loading,
  messagesAuth: state.get("auth").error,
  ...state,
});




const RegisterFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterFormReduxed);

export default withStyles(styles)(injectIntl(RegisterFormMapped));

