import * as React from 'react';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import ReactJsonView from '../functional/ReactJsonView';
import Fetcher from '../functional/fetcher/Fetcher';
import InnsynView from './InnsynView';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';

const InnsynRoute: React.FC = (): JSX.Element => (
    <Fetcher<SøknadApiResponse>
        recipies={[søknadRecipe]}
        loading={() => <LoadingPage />}
        error={(e: Error) => <ReactJsonView input={e} />}
        success={([søknadApiResponse]: [SøknadApiResponse]) => <InnsynView søknad={søknadApiResponse} />}
    />
);

export default InnsynRoute;
