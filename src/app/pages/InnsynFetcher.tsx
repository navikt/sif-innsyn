import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Fetcher from '../functional/fetcher/Fetcher';
import HandleUnauthorized from '../functional/HandleUnauthorized';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import { sortSoknad } from '../utils/sortSoknader';
import InnsynRoutes from './InnsynRoutes';
import ErrorPage from './support-pages/ErrorPage';
import LoadingPage from './support-pages/LoadingPage';

const InnsynFetcher = () => {
    const history = useHistory();
    return (
        <Fetcher<SøknadApiResponse>
            recipies={[søknadRecipe]}
            loading={() => <LoadingPage />}
            error={(e: Error) => (
                <HandleUnauthorized
                    currentRoute={history.location.pathname}
                    error={e}
                    onWillRedirect={() => <LoadingPage />}
                    handleError={() => {
                        return <ErrorPage />;
                    }}
                />
            )}
            success={([søknadApiResponse]: [SøknadApiResponse]) => {
                return <InnsynRoutes søknader={søknadApiResponse.sort(sortSoknad)} />;
            }}
        />
    );
};

export default InnsynFetcher;
