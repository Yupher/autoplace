import * as types from '../constants/authTypes';


const initialState = {
    token: null,
    user: null,
    isLoggedIn: null,
    loading: false,
    loadingEmail: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.REGISTER_SUCCESS:
        case types.LOAD_USER_SUCCESS:
        case types.LOGIN_SUCCESS:

            return {
                ...state,
                token: action.payload && action.payload.token ? action.payload.token : "",
                user: action.payload && action.payload.user ? action.payload.user : "",
                isLoggedIn: true,
                loading: false,
                error: null,
            };

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
                isLoggedIn: false,
                loading: false,
                error: null
            };

        case types.UPDATE_ME:
        case types.UPDATE_PASSWORD:

            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
                loading: false,
                error: null,
            };

        case types.ADD_ADMIN:

            return {
                ...state,
                loading: false,
                error: null,
            };

        case types.AUTH_USER_LOADING:
            return {
                ...state,
                loading: true
            };

        case types.AUTH_ERROR:

            return {
                ...state,
                // token: null,
                // user: null,
                // isLoggedIn: false,
                loadingEmail: false,
                loading: false,
                error: action.payload,
            };

        case types.LOAD_USER_FAIL:

            return {
                ...state,
                token: null,
                user: null,
                isLoggedIn: false,
                loadingEmail: false,
                loading: false,
                error: action.payload,
            };

        case types.USER_ERROR:

            let message = action.payload && action.payload.message ? action.payload.message : undefined;
            let type = action.payload && action.payload.type ? action.payload.type : undefined;

            if (message && message.includes("E11000") && message.includes("email")) {
                message = "We already have an account with this email, please give us a valid email."
            }

            if (message && message.includes("Passwords are not the same!")) {
                message = "Passwords are not the same!, please give us compatible passwords."
            }

            return {
                ...state,
                // token: null,
                // user: null,
                // isLoggedIn: false,
                loading: false,
                error: { type, message },
            };

        case types.HIDE_ERROR:
            return {
                ...state,
                loading: false,
                error: null
            };

        case types.SET_LOADING_EMAIL:
            return {
                ...state,
                loadingEmail: true,
            };

        case types.EMAIL_RESEND:
            return {
                ...state,
                error: null,
                loadingEmail: false,
            };

        case types.EMAIL_CONFIRM:

            let myUser = state.user;
            myUser.confirmed = true;
            return {
                ...state,
                error: null,
                user: myUser,
            };

        default:
            return state;
    }
};
