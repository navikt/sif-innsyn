import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import ErrorGuide from '../../components/error-guide/ErrorGuide';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { PageKey } from '../../config/pageKey';
import intlHelper from '../../utils/intlUtils';

const UnavailablePage = () => {
    const intl = useIntl();
    useLogSidevisning(PageKey.unavailablePage);
    return (
        <InnsynPage title={intlHelper(intl, 'page.unavailable.title')}>
            <ErrorGuide title={intlHelper(intl, 'page.unavailable.title')}>
                <FormattedMessage id="page.unavailable.content" />
            </ErrorGuide>
        </InnsynPage>
    );
};

export default UnavailablePage;
