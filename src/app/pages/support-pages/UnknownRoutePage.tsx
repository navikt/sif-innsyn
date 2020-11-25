import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ErrorGuide from '../../components/error-guide/ErrorGuide';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { PageKey } from '../../config/pageKey';
import useLogSidevisning from '../../sif-amplitude/hooks/useLogSidevisning';
import intlHelper from '../../utils/intlUtils';

const UnknownRoutePage = () => {
    const intl = useIntl();
    useLogSidevisning(PageKey.unknownRoutePage);
    return (
        <InnsynPage title={intlHelper(intl, 'page.404.title')}>
            <ErrorGuide title={intlHelper(intl, 'page.404.title')}>
                <FormattedMessage id="page.404.content" />
            </ErrorGuide>
        </InnsynPage>
    );
};

export default UnknownRoutePage;
