import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm, SelectLanguage } from 'enl-components';
import logo from 'enl-images/logo.svg';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styles from 'enl-components/Forms/user-jss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function Login(props) {
  const { classes, user } = props;
  const title = brand.name + ' - Login';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);

  const submitForm = (values) => setValueForm(values);

  useEffect(() => {
    if (valueForm) {
      console.log(`You submitted:\n\n${valueForm}`);
      window.location.href = '/app';
    }
  }, [valueForm]);



  return (
    <div className={classes.rootFull}>
      {
        // user && user.confirmed ? <Redirect to='/' /> :
        // user && !user.confirmed && user.email ? <Redirect to='/confirm-email' /> :
        // user && !user.confirmed && user.number ? <Redirect to='/confirm-phone' /> :
        false ? '' :
          <Fragment>
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="twitter:title" content={title} />
              <meta property="twitter:description" content={description} />
            </Helmet>
            <div className={classes.containerSide}>
              <Hidden smDown>
                <div className={classes.opening}>
                  <div className={classes.openingWrap}>
                    <div className={classes.openingHead}>
                      <NavLink to="/" className={classes.brand}>
                        <img src={logo} alt={brand.name} />
                        {brand.name}
                      </NavLink>
                    </div>
                    <Typography variant="h3" component="h1" gutterBottom>
                      <FormattedMessage {...messages.welcomeTitle} />
                      &nbsp;
                      {brand.name}
                    </Typography>
                    <Typography variant="h6" component="p" className={classes.subpening}>
                      <FormattedMessage {...messages.welcomeSubtitle} />
                    </Typography>
                  </div>
                  <div className={classes.openingFooter}>
                    <NavLink to="/" className={classes.back}>
                      <ArrowBack />
                      &nbsp;back to site
                    </NavLink>
                    <div className={classes.lang}>
                      <SelectLanguage />
                    </div>
                  </div>
                </div>
              </Hidden>
              <div className={classes.sideFormWrap}>
                <LoginForm onSubmit={(values) => submitForm(values)} />
              </div>
            </div>
          </Fragment>
      }
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = {};

const mapStateToProps = state => ({
  user: state.get("auth").user,
  ...state,
});

const LoginMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);



export default withStyles(styles)(LoginMapped);
