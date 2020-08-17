import * as React from 'react';
import OversiktView from '../../../oversikt/OversiktView';
import { SøknadApiResponse, søknadRecipe } from '../../../types/apiTypes/søknadTypes';
import LoadingPage from '../loading-page/LoadingPage';
import ReactJsonView from '../../../functional/ReactJsonView';
import Fetcher from '../../../functional/fetcher/Fetcher';
import HandleUnauthorized from '../../../functional/HandleUnauthorized';

const RootPage: React.FC = (): JSX.Element => (
    <Fetcher<SøknadApiResponse>
        recipies={[søknadRecipe]}
        loading={() => <LoadingPage />}
        error={(e: Error) => (
            <HandleUnauthorized
                error={e}
                onWillRedirect={() => <LoadingPage />}
                handleError={() => <ReactJsonView input={e} />} // TODO: Håndter error.
            />
        )}
        success={([søknadApiResponse]: [SøknadApiResponse]) => <OversiktView søknad={søknadApiResponse} />}
    />
);

export default RootPage;
