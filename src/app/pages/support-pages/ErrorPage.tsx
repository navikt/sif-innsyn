import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '../../components/elements/box/Box';
import PageBannerCompact from '../../components/page-banner-compact/PageBannerCompact';
import Page from '../../components/page/Page';
import intlHelper from '../../utils/intlUtils';

const ErrorPage = () => {
    const intl = useIntl();
    return (
        <Page
            title={intlHelper(intl, 'page.error.title')}
            topContentRenderer={() => <PageBannerCompact title={'Din oversikt - Sykdom i familien'} />}>
            <Box margin="xxxl">
                <FormattedMessage id="page.error.content" />
            </Box>
        </Page>
    );
};

export default ErrorPage;
