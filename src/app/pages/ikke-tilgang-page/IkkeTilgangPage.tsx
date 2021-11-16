import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import ErrorGuide from '../../components/error-guide/ErrorGuide';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import intlHelper from '../../utils/intlUtils';

const IkkeTilgangPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <InnsynPage title={intlHelper(intl, 'page.ikkeTilgang.title')}>
            <ErrorGuide title={intlHelper(intl, 'page.ikkeTilgang.title')}>
                <FormattedMessage id="page.ikkeTilgang.content" />
            </ErrorGuide>
        </InnsynPage>
    );
};

export default IkkeTilgangPage;
