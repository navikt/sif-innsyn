import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ErrorGuide from '../../components/error-guide/ErrorGuide';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import intlHelper from '../../utils/intlUtils';

const ErrorPage = () => {
    const intl = useIntl();
    return (
        <InnsynPage title={intlHelper(intl, 'page.error.title')}>
            <ErrorGuide title={intlHelper(intl, 'page.error.title')}>
                <FormattedMessage id="page.error.content" />
            </ErrorGuide>
        </InnsynPage>
    );
};

export default ErrorPage;
