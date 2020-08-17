import * as React from 'react';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import ReactJsonView from '../functional/ReactJsonView';
import Fetcher from '../functional/fetcher/Fetcher';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import OversiktView from './OversiktView';
import HandleUnauthorized from '../functional/HandleUnauthorized';

const OversiktRoute: React.FC = (): JSX.Element => (
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

export default OversiktRoute;
