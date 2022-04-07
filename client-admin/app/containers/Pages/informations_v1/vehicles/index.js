import React from 'react'
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';

import { PapperBlock } from 'enl-components';

import AllCatVeh from './AllCatVeh'

const index = () => {

    const title = brand.name + ' - Vehicles';
    const description = brand.desc;

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <PapperBlock
                whiteBg
                icon="border_color"
                title='All Vehicles'
                desc='󠁥󠁮󠁧󠁿󠁥󠁮󠁧󠁿All App Vehicles. You Can See All The Vehicle Companies We Have On Our Site.'
            >
                <div >
                    <AllCatVeh />
                </div>
            </PapperBlock>
        </div>
    )
}

export default index
