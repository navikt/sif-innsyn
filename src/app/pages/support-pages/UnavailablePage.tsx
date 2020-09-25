import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '../../components/elements/box/Box';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import intlHelper from '../../utils/intlUtils';

const UnavailablePage = () => {
    const intl = useIntl();
    return (
        <InnsynPage title={intlHelper(intl, 'page.unavailable.title')}>
            <Box margin="xxxl">
                <FormattedMessage id="page.unavailable.content" />
            </Box>
        </InnsynPage>
    );
};

export default UnavailablePage;
