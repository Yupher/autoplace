import React from 'react'

import Spin from '../../../public/images/spinner.gif'

const Spinner = () => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={Spin} alt='spinner' />
        </div>
    )
}

export default Spinner;
