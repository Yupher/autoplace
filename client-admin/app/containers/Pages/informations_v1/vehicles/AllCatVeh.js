import React, { useState, Fragment, useEffect } from 'react'



import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';


import styles from '../../../../components/Tables/tableStyle-jss';
import TableEdit from '../../../../components/Tables/infoTables/TableEdit'
import CatsFiltring from '../../../../components/Filtring/InfoCatsVehFiltring'

import Paginations from '../../../../components/Filtring/paginations';

import { setCurrentFamilies } from '../../../../redux/actions/infoVehActions'

const anchorTable = [
    {
        name: 'categories',
        label: 'Cats',
        type: 'pic',
        initialValue: '',
        hidden: false,
        width: '70',
    },
    {
        name: 'brand',
        label: 'Brand',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'cars',
        label: 'Cars',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'family',
        label: 'Family',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'years',
        label: 'Last Years',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'km',
        label: 'Kilometer',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    // {
    //     name: 'gasoline',
    //     label: 'Gasoline',
    //     type: 'text',
    //     initialValue: '',
    //     hidden: false
    // },
    // {
    //     name: 'diesel',
    //     label: 'Diesel',
    //     type: 'text',
    //     initialValue: '',
    //     hidden: false,
    // },
    {
        name: 'colors',
        label: 'Colors',
        type: 'text',
        initialValue: '',
        hidden: false,
    },
    {
        name: 'block',
        label: '',
        type: 'link',
        initialValue: '',
        to: '/app/pages/families',
        hidden: false,
        width: '55',
    },
];


const AllCatVeh = (props) => {

    const {
        // catsApi, loadingUsers, blockUser, token
        loadingCats, catsApi, setCurrentFamilies
    } = props;

    const message = "We don't have any user at the moment, please try again later.";

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = catsApi ? catsApi.slice(indexOfFirstPost, indexOfLastPost) : [];


    useEffect(() => {

        if (currentPosts.length === 0) {
            setCurrentPage(1);
        }

    }, [currentPosts])


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const paginateLeft = () => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    const paginateRight = () => {
        setCurrentPage(catsApi && (currentPage === Math.ceil(catsApi.length / postsPerPage) || catsApi.length === 0) ? currentPage : currentPage + 1)
    };


    return (
        <div>
            {
                loadingCats ? <h1> Spiner </h1> :
                    catsApi === null ? <h5> We have an error in our system, please try again later. </h5> :
                        <Fragment>
                            <CatsFiltring />
                            <TableEdit anchorTable={anchorTable} dataApi={currentPosts} message={message} setCurrentFamilies={setCurrentFamilies} />
                            <Paginations
                                postsPerPage={postsPerPage}
                                totalPosts={catsApi.length}
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





const AllCatVehReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(AllCatVeh);


const mapDispatchToProps = { setCurrentFamilies };

const mapStateToProps = state => ({
    // catsApi: state.get("info").catsApi,
    // token: state.get("auth").token,
    loadingCats: state.get("infoVeh").loadingCats,
    catsApi: state.get("infoVeh").catsApi,
    ...state,
});

const AllCatVehMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCatVehReduxed);


export default withWidth()(withStyles(styles)(AllCatVehMapped));
