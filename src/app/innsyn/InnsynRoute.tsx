import * as React from 'react';
import { SøkerApiResponse, SøkerP, søkerRecipe } from '../types/apiTypes/søkerTypes';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import FpError from '../functional/fetcher/example-usage/FpError';
import Fetcher from '../functional/fetcher/Fetcher';
import InnsynView from './InnsynView';

const InnsynRoute: React.FC = (): JSX.Element => (
    <Fetcher<SøkerP, SøkerApiResponse>
        recipies={[søkerRecipe]}
        loading={() => <LoadingPage />}
        error={(e: Error) => <FpError error={e} />}
        success={([søkerApiResponse]: [SøkerApiResponse]) => <InnsynView bruker={søkerApiResponse} />}
    />
);

export default InnsynRoute;
