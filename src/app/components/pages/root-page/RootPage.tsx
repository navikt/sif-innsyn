import * as React from 'react';
import InnsynPage from '../../innsyn-page/InnsynPage';
import OversiktView from '../../../oversikt/OversiktView';
import { SøknadApiResponse, søknadRecipe } from '../../../types/apiTypes/søknadTypes';
import LoadingPage from '../loading-page/LoadingPage';
import FpError from '../../../functional/fetcher/example-usage/FpError';
import Fetcher from '../../../functional/fetcher/Fetcher';

const RootPage: React.FC = (): JSX.Element => {
    return (
        <InnsynPage>
            <Fetcher<SøknadApiResponse>
                recipies={[søknadRecipe]}
                loading={() => <LoadingPage />}
                error={(e: Error) => <FpError error={e} />}
                success={([søknadApiResponse]: [SøknadApiResponse]) => <OversiktView søknad={søknadApiResponse} />}
            />
        </InnsynPage>
    );
};

export default RootPage;
