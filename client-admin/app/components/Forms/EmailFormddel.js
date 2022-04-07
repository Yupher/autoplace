import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
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



const EmailForm = ({ props }) => {
    const {
        classes,
        pristine,
        submitting,
        intl,
        closeMsg,
        loading,
    } = props;


    return (
        <div> hello</div>
    )
    // <Paper Paper className = { classes.sideWrap } >
    //     <Hidden mdUp>
    //         <div className={classes.headLogo}>
    //             <NavLink to="/" className={classes.brand}>
    //                 <img src={logo} alt={brand.name} />
    //                 {brand.name}
    //             </NavLink>
    //         </div>
    //     </Hidden>
    //     <div className={classes.topBar}>
    //         Hello World 12
    //     </div>

    // </Paper >
}

export default EmailForm;

// EmailForm.propTypes = {
//     classes: PropTypes.object.isRequired,
//     pristine: PropTypes.bool.isRequired,
//     submitting: PropTypes.bool.isRequired,
//     intl: intlShape.isRequired,
//     loading: PropTypes.bool,
//     closeMsg: PropTypes.func.isRequired,
// };

// EmailForm.defaultProps = {
//     messagesAuth: null,
//     loading: false
// };

// const LoginFormReduxed = reduxForm({
//     form: 'immutableExample',
//     enableReinitialize: true,
// })(EmailForm);


// const mapDispatchToProps = {

// };

// // const reducerAuth = 'authReducer';

// const mapStateToProps = state => ({
//     // messagesAuth: state.get("auth").error,
//     // loading: state.get(reducerAuth).loading,
//     ...state,
// });

// const LoginFormMapped = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginFormReduxed);

// export default withStyles(styles)(injectIntl(LoginFormMapped));


