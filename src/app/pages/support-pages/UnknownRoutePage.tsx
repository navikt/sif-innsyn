import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '../../components/elements/box/Box';
import PageBannerCompact from '../../components/page-banner-compact/PageBannerCompact';
import Page from '../../components/page/Page';
import intlHelper from '../../utils/intlUtils';

const UnknownRoutePage = () => {
    const intl = useIntl();
    return (
        <Page
            title={intlHelper(intl, 'page.404.title')}
            topContentRenderer={() => <PageBannerCompact title={'Din oversikt - Sykdom i familien'} />}>
            <Box margin="xxxl">
                <FormattedMessage id="page.404.content" />
            </Box>
        </Page>
    );
};

export default UnknownRoutePage;
