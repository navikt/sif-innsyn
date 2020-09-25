import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '../../components/elements/box/Box';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import intlHelper from '../../utils/intlUtils';

const UnknownRoutePage = () => {
    const intl = useIntl();
    return (
        <InnsynPage title={intlHelper(intl, 'page.404.title')}>
            <Box margin="xxxl">
                <FormattedMessage id="page.404.content" />
            </Box>
        </InnsynPage>
    );
};

export default UnknownRoutePage;
