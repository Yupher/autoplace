import React from 'react'

import classNames from 'classnames';


const Navbar = () => {


    const rootClasses = classNames('topbar');
    // const rootClasses = classNames('topbar', `topbar--${layout}`);


    return (
        <div className={rootClasses}>
            Topbar
        </div>
    )
}

export default Navbar