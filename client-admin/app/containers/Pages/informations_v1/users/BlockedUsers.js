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
        name: 'unlock',
        label: '',
        type: 'unblock',
        initialValue: '',
        hidden: false,
        width: '70',
    },
];



const BlockedUsers = (props) => {

    const {
        // usersApi, loadingUsers, , token
        blockedApi, loadingUsers, blockUser, token
    } = props;


    const message = "We don't have any user at the moment, please try again later.";

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blockedApi ? blockedApi.slice(indexOfFirstPost, indexOfLastPost) : [];


    useEffect(() => {

        if (currentPosts.length === 0) {
            setCurrentPage(1);
        }

    }, [currentPosts])


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const paginateLeft = () => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    const paginateRight = () => {
        setCurrentPage(blockedApi && (currentPage === Math.ceil(blockedApi.length / postsPerPage) || blockedApi.length === 0) ? currentPage : currentPage + 1)
    };


    return (
        <div>
            {
                loadingUsers ? <h1> Spiner </h1> :
                    blockedApi === null ? <h5> We have an error in our system, please try again later. </h5> :
                        <Fragment>
                            <UsersFiltring />
                            <TableEdit anchorTable={anchorTable} dataApi={currentPosts} message={message} blockRow={blockUser} token={token} />
                            <Paginations
                                postsPerPage={postsPerPage}
                                totalPosts={blockedApi.length}
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

const BlockedUsersReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(BlockedUsers);


const mapDispatchToProps = { blockUser };

const mapStateToProps = state => ({
    blockedApi: state.get("info").blockedApi,
    token: state.get("auth").token,
    loadingUsers: state.get("info").loadingUsers,
    ...state,
});

const BlockedUsersMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockedUsersReduxed);


export default withWidth()(withStyles(styles)(BlockedUsersMapped));
