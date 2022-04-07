import React from 'react'
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';

import { PapperBlock } from 'enl-components';

import Vehicle from './Vehicle'

const index = () => {

    const title = brand.name + ' - Vehicle';
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
                title='One Vehicle'
                desc='󠁥󠁮󠁧󠁿󠁥󠁮󠁧󠁿All Vehicle Information . You Can See All The Vehicle Information We Have On Our Site.'
            >
                <div >
                    <Vehicle />
                </div>
            </PapperBlock>
        </div>
    )
}

export default index
