import * as types from '../constants/authTypes';

import axios from "axios";


export const Register = data => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include'
        };

        dispatch({
            type: types.AUTH_USER_LOADING
        })

        let res;

        if (!data.phone) {
            res = await axios.post("http://localhost:5000/api/v1/users/signup", data, config);
        } else {
            res = await axios.post("http://localhost:5000/api/v1/users/signup/phone", data, config);
        }


        localStorage.setItem('AIShop_JWT', res.data.token);


        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {

        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.LOAD_USER_FAIL,
            payload: { type: "signup", message: error.message ? error.message : error }
        })


    }
}

export const Login = data => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include'
        };

        dispatch({
            type: types.AUTH_USER_LOADING
        })


        const res = await axios.post("http://localhost:5000/api/v1/users/login", data, config);

        localStorage.setItem('AIShop_JWT', res.data.token);



        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data
        })



    } catch (err) {

        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.LOAD_USER_FAIL,
            payload: { type: "login", message: error.message ? error.message : error }
        })
    }
}

export const Logout = () => async dispatch => {

    localStorage.setItem('AIShop_JWT', null);

    dispatch({
        type: types.LOGOUT_SUCCESS
    })
}

export const loadUser = () => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        dispatch({
            type: types.AUTH_USER_LOADING
        })

        let data = { token: localStorage.getItem('AIShop_JWT') }


        const res = await axios.post("http://localhost:5000/api/v1/users/loaduser", data, config);


        dispatch({
            type: types.LOAD_USER_SUCCESS,
            payload: { user: res.data.user, token: data.token }
        })

    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.LOAD_USER_FAIL,
            payload: { type: "load user", message: error.message ? error.message : error }
        })
    }
}

export const closeMsgAction = () => async dispatch => {

    dispatch({
        type: types.HIDE_ERROR
    })
}

export const updateMe = data => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        let mydata = {};

        if (data.firstname) {
            mydata.firstname = data.firstname;
        }

        if (data.lastname) {
            mydata.lastname = data.lastname;
        }

        if (data.email) {
            mydata.email = data.email;
        }

        mydata.token = data.token;

        const res = await axios.post("http://localhost:5000/api/v1/users/update/me", mydata, config);

        dispatch({
            type: types.UPDATE_ME,
            payload: { user: res.data.user }
        })

    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USER_ERROR,
            payload: { type: "update me", message: error.message ? error.message : error }
        })
    }

}

export const updatePassword = data => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };


        const res = await axios.post("http://localhost:5000/api/v1/users/update/password", data, config);

        dispatch({
            type: types.UPDATE_ME,
            payload: { user: res.data.user }
        })

    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USER_ERROR,
            payload: { type: "update password", message: error.message ? error.message : error }
        })
    }

}

export const loginGoogle = data => async dispatch => {

    try {


        if (data.error) {
            return dispatch({
                type: types.USER_ERROR,
                payload: { type: data.type, message: data.error }
            })
        }

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include'
        };

        dispatch({
            type: types.AUTH_USER_LOADING
        })


        let obj = {};

        obj.firstname = data.result.givenName;
        obj.lastname = data.result.familyName;
        obj.email = data.result.email;
        obj.photo = data.result.imageUrl;
        obj.password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        obj.passwordConfirm = obj.password;
        obj.token = data.token;
        obj.id = data.result.googleId;

        const res = await axios.post("http://localhost:5000/api/v1/users/google/login", obj, config);

        localStorage.setItem('AIShop_JWT', res.data.token);


        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.LOAD_USER_FAIL,
            payload: { type: "login", message: error.message ? error.message : error }
        })
    }
}

export const FacebookBtnLogin = data => async dispatch => {

    try {


        if (data.error) {
            return dispatch({
                type: types.USER_ERROR,
                payload: { type: data.type, message: data.error }
            })
        }


        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include'
        };

        dispatch({
            type: types.AUTH_USER_LOADING
        })




        data.password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        data.passwordConfirm = data.password;



        const res = await axios.post("http://localhost:5000/api/v1/users/facebook/login", data, config);


        localStorage.setItem('AIShop_JWT', res.data.token);


        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.LOAD_USER_FAIL,
            payload: { type: "login", message: error.message ? error.message : error }
        })
    }
}

export const confirmEmail = (code, token) => async dispatch => {

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        await axios.post("http://localhost:5000/api/v1/users/confirmEmail", { code: parseInt(code), token }, config);


        dispatch({
            type: types.EMAIL_CONFIRM
        })
    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USER_ERROR,
            payload: { type: "confirm-email", message: error.message ? error.message : error }
        })
    }


}

export const resendEmail = token => async dispatch => {
    try {


        dispatch({
            type: types.SET_LOADING_EMAIL
        })


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };


        await axios.post("http://localhost:5000/api/v1/users/resendEmail", { token }, config);


        setTimeout(function () {
            dispatch({
                type: types.EMAIL_RESEND
            })
        }, 500);




    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USER_ERROR,
            payload: { type: "confirm-email", message: error.message ? error.message : error }
        })
    }

}


export const confirmPhone = (code, token) => async dispatch => {

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        await axios.post("http://localhost:5000/api/v1/users/confirmPhone", { code: parseInt(code), token }, config);


        dispatch({
            type: types.EMAIL_CONFIRM
        })


    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USER_ERROR,
            payload: { type: "confirm-phone", message: error.message ? error.message : error }
        })
    }

}


export const resendPhone = token => async dispatch => {

    try {


        dispatch({
            type: types.SET_LOADING_EMAIL
        })


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };


        await axios.post("http://localhost:5000/api/v1/users/resendPhone", { token }, config);


        setTimeout(function () {
            dispatch({
                type: types.EMAIL_RESEND
            })
        }, 500);




    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USER_ERROR,
            payload: { type: "confirm-phone", message: error.message ? error.message : error }
        })
    }

}





export const authError = (type, message) => async dispatch => {

    dispatch({
        type: types.AUTH_ERROR,
        payload: { type, message }
    })

}