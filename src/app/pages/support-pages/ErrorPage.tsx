import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import ErrorGuide from '../../components/error-guide/ErrorGuide';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { PageKey } from '../../config/pageKey';
import intlHelper from '../../utils/intlUtils';

const ErrorPage = () => {
    const intl = useIntl();
    useLogSidevisning(PageKey.errorPage);
    return (
        <InnsynPage title={intlHelper(intl, 'page.error.title')}>
            <ErrorGuide title={intlHelper(intl, 'page.error.title')}>
                <FormattedMessage id="page.error.content" />
            </ErrorGuide>
        </InnsynPage>
    );
};

export default ErrorPage;
