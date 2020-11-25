import React from 'react';
import { useHistory } from 'react-router-dom';
import { APPLICATION_KEY } from '../App';
import Fetcher from '../functional/fetcher/Fetcher';
import HandleUnauthorized from '../functional/HandleUnauthorized';
import { useAmplitudeInstance } from '../sif-amplitude/amplitude';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import { sortSoknad } from '../utils/sortSoknader';
import InnsynRouteConfig from './InnsynRoutes';
import ErrorPage from './support-pages/ErrorPage';
import LoadingPage from './support-pages/LoadingPage';

const InnsynDataFetcher = () => {
    const history = useHistory();
    const { setUserProperties, logApplicationStartet } = useAmplitudeInstance();

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
                console.log('Fetcher success');
                setUserProperties({
                    antallSaker: søknadApiResponse.length,
                });
                logApplicationStartet(APPLICATION_KEY);
                return <InnsynRouteConfig søknader={søknadApiResponse.sort(sortSoknad)} />;
            }}
        />
    );
};

export default InnsynDataFetcher;
