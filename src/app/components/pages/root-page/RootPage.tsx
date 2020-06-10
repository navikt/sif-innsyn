import * as React from 'react';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import InformationPoster from '@navikt/sif-common-core/lib/components/information-poster/InformationPoster';

const bem = bemUtils('rootPage');

const RootPage: React.FC = (): JSX.Element => {
    const intl = useIntl();

    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'innsyn.root.tittel')}
            topContentRenderer={(): JSX.Element => <StepBanner text={intlHelper(intl, 'innsyn.root.stegTittel')} />}>
            <Box margin="xxxl">
                <InformationPoster>
                    <Box padBottom={'l'}>Sykdom i familien sin innsynsløsning</Box>
                </InformationPoster>
            </Box>
        </Page>
    );
};

export default RootPage;
