import React from 'react'
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';

import BlockedUsers from './BlockedUsers'

const BlockedUsersIndex = () => {

    const title = brand.name + ' - Blocked Users';
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
                title='All Blocked Users'
                desc='󠁥󠁮󠁧󠁿󠁥󠁮󠁧󠁿All App Blocked Users. You can update them whenever you want'
            >
                <div >
                    <BlockedUsers />
                </div>
            </PapperBlock>

        </div>
    )
}

export default BlockedUsersIndex
