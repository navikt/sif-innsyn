import * as React from 'react';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import InformationPoster from '@navikt/sif-common-core/lib/components/information-poster/InformationPoster';
import InnsynPage from '../../innsyn-page/InnsynPage';

const RootPage: React.FC = (): JSX.Element => {
    return (
        <InnsynPage>
            <Box margin="xxxl">
                <InformationPoster>
                    <Box padBottom={'l'}>Sykdom i familien sin innsynsløsning</Box>
                </InformationPoster>
            </Box>
        </InnsynPage>
    );
};

export default RootPage;
