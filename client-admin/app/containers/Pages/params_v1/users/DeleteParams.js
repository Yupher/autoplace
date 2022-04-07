import React from 'react'
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';

import {
    PapperBlock
} from 'enl-components';

import AddAdmins from '../../../../components/Forms/AddAdminsForms'

const styles = theme => ({

});

const Account = props => {

    const { classes } = props;
    const title = brand.name + ' - Delete Params';
    const description = brand.desc;

    const titleBlock = "Delete Page Params";
    const descBlock = "󠁥󠁮󠁧󠁿All Your information. You can update them whenever you want";

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
                // title={intl.formatMessage(messages.title)}
                title={titleBlock}
                icon="playlist_add_check"
                noMargin
                whiteBg
                colorMode="light"
                desc={descBlock}
            // desc={intl.formatMessage(messages.subtitle)}
            >

                {/* <AddAdmins /> */}

            </PapperBlock>
        </div>
    )
}


Account.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};



export default withStyles(styles)(injectIntl(Account));
// export default Account;


