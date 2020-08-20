import * as React from 'react';
import LoadingPage from '../../components/pages/loading-page/LoadingPage';
import Fetcher from '../../functional/fetcher/Fetcher';
import { SøknadApiResponse, søknadRecipe } from '../../types/apiTypes/søknadTypes';
import OmsorgspengerView from './OmsorgspengerView';
import HandleUnauthorized from '../../functional/HandleUnauthorized';
import ReactJsonView from '../../functional/ReactJsonView';

const OmsorgspengerRoute: React.FC = (): JSX.Element => (
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
        success={([søknadApiResponse]: [SøknadApiResponse]) => <OmsorgspengerView søknader={søknadApiResponse} />}
    />
);

export default OmsorgspengerRoute;
