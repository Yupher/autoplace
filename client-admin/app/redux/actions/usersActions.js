import * as types from '../constants/authTypes';
import * as typesUsers from '../constants/infotypes';

import axios from "axios";



export const addAdmin = data => async dispatch => {

    try {


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };


        const res = await axios.post("http://localhost:5000/api/v1/users/add/admin", data, config);


        dispatch({
            type: types.ADD_ADMIN
        })

        dispatch({
            type: typesUsers.ADD_ADMIN_USERS,
            payload: res.data.data
        })

    } catch (err) {

        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.AUTH_ERROR,
            payload: { type: "add admin", message: error.message ? error.message : error }
        })

    }

}


export const deleteAdmin = data => async dispatch => {

    try {


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };


        const res = await axios.post("http://localhost:5000/api/v1/users/delete/admin", data, config);

        dispatch({
            type: types.ADD_ADMIN
        })

        dispatch({
            type: typesUsers.ADD_ADMIN_USERS,
            payload: res.data.data
        })

    } catch (err) {

        let error = "We have an error in our system, please try again later.";

        if (err &&
            err.response &&
            err.response.data) {
            error = err.response.data;
        }


        dispatch({
            type: types.AUTH_ERROR,
            payload: { type: "delete admin", message: error.message ? error.message : error }
        })

    }

}