import React, { useState, Fragment, useEffect } from 'react'



import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';


import styles from '../../../../components/Tables/tableStyle-jss';
import TableEdit from '../../../../components/Tables/infoTables/TableEdit'
import FamsFiltring from '../../../../components/Filtring/InfoFamsVehFiltring'

import Paginations from '../../../../components/Filtring/paginations';

import { Link } from 'react-router-dom';

import { setCurrentVehicle } from '../../../../redux/actions/infoVehActions'

const anchorTable = [
    {
        name: 'families',
        label: 'Fams',
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
        name: 'name',
        label: 'Name',
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
    {
        name: 'gasoline',
        label: 'Gasoline',
        type: 'text',
        initialValue: '',
        hidden: false
    },
    {
        name: 'diesel',
        label: 'Diesel',
        type: 'text',
        initialValue: '',
        hidden: false,
    },
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
        to: '/app/pages/vehicle',
        initialValue: '',
        hidden: false,
        width: '55',
    },
];


const AllCatVeh = (props) => {

    const {
        loadingFams, famsApi, setCurrentVehicle
    } = props;

    const message = "We don't have any user at the moment, please try again later.";

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = famsApi ? famsApi.slice(indexOfFirstPost, indexOfLastPost) : [];



    useEffect(() => {
        if (currentPosts.length === 0) {
            setCurrentPage(1);
        }
    }, [currentPosts])


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const paginateLeft = () => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    const paginateRight = () => {
        setCurrentPage(famsApi && (currentPage === Math.ceil(famsApi.length / postsPerPage) || famsApi.length === 0) ? currentPage : currentPage + 1)
    };


    return (
        <div>
            {
                loadingFams ? <h1> Spiner </h1> :
                    famsApi === null ? <h5> To access to this data you must first &nbsp;
                        <Link to='/app/pages/vehicles' style={{ color: '#283593' }} >choose a category</Link>. </h5> :
                        <Fragment>
                            <FamsFiltring />
                            <TableEdit anchorTable={anchorTable} dataApi={currentPosts} message={message} setCurrentVehicle={setCurrentVehicle} />
                            <Paginations
                                postsPerPage={postsPerPage}
                                totalPosts={famsApi.length}
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


const mapDispatchToProps = { setCurrentVehicle };

const mapStateToProps = state => ({
    // famsApi: state.get("info").famsApi,
    // token: state.get("auth").token,
    loadingFams: state.get("infoVeh").loadingFams,
    famsApi: state.get("infoVeh").famsApi,
    ...state,
});

const AllCatVehMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCatVehReduxed);


export default withWidth()(withStyles(styles)(AllCatVehMapped));
