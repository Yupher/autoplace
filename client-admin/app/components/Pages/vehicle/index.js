import React, { Fragment } from 'react'

import Header from './Header'
import Years from './Years';
import Kilometer from './Kilometer';

const Index = (props) => {

    const { current } = props;

    return (
        <div>
            {
                JSON.stringify(current) === JSON.stringify({}) ? "We don't have any data at the moment, please try again later." :
                    <Fragment>
                        <Header energy={current.energy} />
                        <Years family={current.family} colors={current.colors} years={current.years} />
                        <Kilometer gearBox={current.gearBox} power={current.power} kilometer={current.kilometer} />
                    </Fragment>
            }


        </div>
    )
}

export default Index
