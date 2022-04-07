import * as types from '../constants/infotypes';

import axios from "axios";



export const getAllUsers = data => async dispatch => {

    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        dispatch({
            type: types.USERS_LOADING,
        });

        const res = await axios.post("http://localhost:5000/api/v1/users?active=true", data, config);
        const res2 = await axios.post("http://localhost:5000/api/v1/users?active=false", data, config);


        dispatch({
            type: types.GET_ALL_USERS,
            payload: { users: res.data.data, blocked: res2.data.data },
        })

    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        console.log(err);

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USERS_ERROR,
            payload: { type: "users", message: error.message ? error.message : error }
        })
    }

}


export const setFiltringUsers = (filter, params) => dispatch => {

    if (params && params.path === '/app/pages/blocked') {
        dispatch({
            type: types.FILTRING_BLOCK_USERS,
            payload: { filter, type: params.type }
        });

    } else {
        dispatch({
            type: types.FILTRING_USERS,
            payload: { filter, type: params.type }
        });
    }


}


export const setSearchUsers = (search) => dispatch => {

    dispatch({
        type: types.SEARCH_USERS,
        payload: search
    });
}

export const setSearchBlockedUsers = (search) => dispatch => {

    dispatch({
        type: types.SEARCH_BLOCKED_USERS,
        payload: search
    });
}

export const blockUser = (block, token, status) => async dispatch => {

    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };



        await axios.post("http://localhost:5000/api/v1/users/block/one", { id: block, status, token }, config);


        dispatch({
            type: types.BLOCK_USERS,
            payload: { block, status }
        })

    } catch (err) {
        let error = "We have an error in our system, please try again later.";

        console.log(err);

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.USERS_ERROR,
            payload: { type: "block", message: error.message ? error.message : error }
        })
    }

}