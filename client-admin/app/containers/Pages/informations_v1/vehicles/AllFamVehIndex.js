import React from 'react'
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';

import { PapperBlock } from 'enl-components';

import AllFamVeh from './AllFamVeh'

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
                title='All Families'
                desc='󠁥󠁮󠁧󠁿󠁥󠁮󠁧󠁿All Vehicle Families. You Can See All The Vehicle Families We Have On Our Site.'
            >
                <div >
                    <AllFamVeh />
                </div>
            </PapperBlock>
        </div>
    )
}

export default index
