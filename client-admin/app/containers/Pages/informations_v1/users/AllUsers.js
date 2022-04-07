import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';


import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';


import styles from '../../../../components/Tables/tableStyle-jss';
import TableEdit from '../../../../components/Tables/infoTables/TableEdit'
import UsersFiltring from '../../../../components/Filtring/InfoUsersFiltring'

import Paginations from '../../../../components/Filtring/paginations';

import { blockUser } from '../../../../redux/actions/infoActions'
import { deleteAdmin } from '../../../../redux/actions/usersActions'

const anchorTable = [
    {
        name: 'users',
        label: 'Users',
        type: 'pic',
        initialValue: '',
        hidden: false,
        width: '70',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'lastname',
        label: 'Lastname',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'firstname',
        label: 'Firstname',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'role',
        label: 'Role',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'createdAt',
        label: 'Created At',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'add_admin',
        label: '',
        type: 'add_admin',
        initialValue: '',
        hidden: false,
        width: '55',
    },
    {
        name: 'block',
        label: '',
        type: 'block',
        initialValue: '',
        hidden: false,
        width: '55',
    },
];



const AllUsers = (props) => {

    const {
        usersApi, loadingUsers, blockUser, token, user, deleteAdmin
    } = props;


    const message = "We don't have any user at the moment, please try again later.";

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = usersApi ? usersApi.slice(indexOfFirstPost, indexOfLastPost) : []


    useEffect(() => {

        if (currentPosts.length === 0) {
            setCurrentPage(1);
        }

    }, [currentPosts])



    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const paginateLeft = () => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    const paginateRight = () => {
        setCurrentPage(usersApi && (currentPage === Math.ceil(usersApi.length / postsPerPage) || usersApi.length === 0) ? currentPage : currentPage + 1)
    };


    return (
        <div>
            {
                loadingUsers ? <h1> Spiner </h1> :
                    usersApi === null ? <h5> We have an error in our system, please try again later. </h5> :
                        <Fragment>
                            <UsersFiltring />
                            <TableEdit anchorTable={anchorTable} dataApi={currentPosts} message={message} blockRow={blockUser} deleteRow={deleteAdmin} token={token} user={user} />
                            <Paginations
                                postsPerPage={postsPerPage}
                                totalPosts={usersApi.length}
                                paginate={paginate}
                                paginateLeft={paginateLeft}
                                paginateRight={paginateRight}
                                currentPage={currentPage}
                            />
                        </Fragment>

            }

        </div>
    )
}




const AllUsersReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(AllUsers);


const mapDispatchToProps = { blockUser, deleteAdmin };

const mapStateToProps = state => ({
    usersApi: state.get("info").usersApi,
    token: state.get("auth").token,
    user: state.get("auth").user,
    ...state,
});

const AllUsersMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUsersReduxed);


export default withWidth()(withStyles(styles)(AllUsersMapped));