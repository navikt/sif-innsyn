import React from 'react';
import { useIntl } from 'react-intl';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import Page from '../../components/page/Page';
import intlHelper from '../../utils/intlUtils';

const LoadingPage: React.FunctionComponent = (): React.ReactElement => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.loading.title')}>
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '15rem', alignItems: 'center' }}>
                <LoadingSpinner type="XXL" />
            </div>
        </Page>
    );
};

export default LoadingPage;
