import React, { useState } from 'react'

import { Field, reduxForm } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './user-jss';
import { withStyles } from '@material-ui/core/styles';
import logo from 'enl-images/logo.svg';
import brand from 'enl-api/dummy/brand';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { CheckboxRedux, TextFieldRedux } from './ReduxFormMUI';

import TextField from '@material-ui/core/TextField';

import { confirmEmail, resendEmail, closeMsgAction } from "../../redux/actions/authActions_v1"

import { Redirect, Link } from 'react-router-dom'

import MessagesForm from './MessagesForm';

const EmailForm = (props) => {

    const {
        classes,
        pristine,
        submitting,
        intl,
        closeMsgAction,
        loading,
        token,
        confirmEmail,
        resendEmail,
        messagesAuth,
        loadingEmail,
        user
    } = props;


    const [code, setCode] = useState("");


    if (user.confirmed) {
        return (<Redirect to='/' />)
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
                    Confirm Email
                </Typography>
                <Link to='/'>
                    <Button size="small" className={classes.buttonLink}>
                        <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
                        Go Home
                    </Button>
                </Link>
            </div>

            {
                messagesAuth !== null && messagesAuth.typeAuth === "confirm-email"
                    ? (
                        <MessagesForm
                            variant="error"
                            className={classes.msgUser}
                            message={messagesAuth.messageAuth}
                            onClose={closeMsgAction}
                        />
                    )
                    : ''
            }

            <section className={classes.pageFormSideWrap}>
                <form onSubmit={e => {
                    e.preventDefault();
                    confirmEmail(code, token)
                }} >
                    <div style={{ marginTop: "4rem" }} >

                        <TextField
                            id="outlined-name"
                            type="number"
                            label="code"
                            className={classes.field}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onInput={(e) => {
                                e.target.value = e.target.value === "" ? e.target.value : Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                            }}
                        />

                        <div className={classes.btnArea}>
                            <Button variant="outlined" fullWidth color="primary" size="large" onClick={() => resendEmail(token)}>
                                Resend Code
                            </Button>
                        </div>
                        <div className={classes.btnArea} style={{ marginTop: "0" }} >
                            <Button variant="contained" fullWidth color="primary" size="large" type="submit"
                                disabled={loadingEmail}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </form>
            </section>

        </Paper>
    )
}

const LoginFormReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(EmailForm);


const mapDispatchToProps = {
    confirmEmail, resendEmail, closeMsgAction
};

const mapStateToProps = state => ({
    token: state.get("auth").token,
    user: state.get("auth").user,
    messagesAuth: state.get("auth").error,
    loadingEmail: state.get("auth").loadingEmail,
    ...state,
});

const LoginFormMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormReduxed);

export default withStyles(styles)(injectIntl(LoginFormMapped));


