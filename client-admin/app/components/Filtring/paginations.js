import React from 'react'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const paginations = (props) => {

    const pageNumbers = [];

    const { postsPerPage, totalPosts, paginate, paginateLeft, paginateRight, currentPage } = props;

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='info-pagination'>
            <li className='' onClick={() => paginateLeft()}>
                <p href='!#' className=''>
                    <ChevronLeftIcon />
                </p>
            </li>
            {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? 'info-pagination-current' : ''} onClick={() => paginate(number)}>
                    <p href='!#' className=''>
                        {number}
                    </p>
                </li>
            ))}
            <li className='' onClick={() => paginateRight()} >
                <p href='!#' className=''>
                    <ChevronRightIcon />
                </p>
            </li>
        </ul>
    )
}

export default paginations
