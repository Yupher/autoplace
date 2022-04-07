import React from 'react'
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';

import AllUsers from './AllUsers'

const index = () => {

    const title = brand.name + ' - Users';
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
                title='All Users'
                desc='󠁥󠁮󠁧󠁿󠁥󠁮󠁧󠁿All App Users. You can update them whenever you want'
            >
                <div >
                    <AllUsers />
                </div>
            </PapperBlock>
        </div>
    )
}

export default index
