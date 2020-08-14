import * as React from 'react';
import LoadingPage from '../../components/pages/loading-page/LoadingPage';
import FpError from '../../functional/fetcher/example-usage/FpError';
import Fetcher from '../../functional/fetcher/Fetcher';
import { SøknadApiResponse, søknadRecipe } from '../../types/apiTypes/søknadTypes';
import PleiepengerView from './PleiepengerView';

const PleiepengerRoute: React.FC = (): JSX.Element => (
    <Fetcher<SøknadApiResponse>
        recipies={[søknadRecipe]}
        loading={() => <LoadingPage />}
        error={(e: Error) => <FpError error={e} />}
        success={([søknadApiResponse]: [SøknadApiResponse]) => <PleiepengerView søknader={søknadApiResponse} />}
    />
);

export default PleiepengerRoute;
