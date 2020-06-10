import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederLokal from './VeilederLokal';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import appSentryLogger from '../../../utils/appSentryLogger';
import './generalErrorPage.less';

export interface Props {
    payload: string | undefined;
}

const GeneralErrorPage: React.FC<Props> = ({ payload }: Props): JSX.Element => {
    const intl = useIntl();

    useEffect(() => {
        appSentryLogger.logError(`User on GeneralErrorPage.`, payload);
    });

    return (
        <Page title={intlHelper(intl, 'page.generalErrorPage.sidetittel')}>
            <div className={'generalErrorPage'}>
                <Veilederpanel type="plakat" kompakt={true} fargetema="normal" svg={<VeilederLokal mood="uncertain" />}>
                    <Systemtittel tag="h2">
                        <FormattedMessage id="page.generalErrorPage.tittel" />
                    </Systemtittel>
                    <Box margin="m" padBottom="l">
                        <Ingress>
                            <FormattedMessage id="page.generalErrorPage.tekst" />
                        </Ingress>
                    </Box>
                </Veilederpanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
