import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import Fetcher from '../functional/fetcher/Fetcher';
import HandleUnauthorized from '../functional/HandleUnauthorized';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import { sortSoknad } from '../utils/sortSoknader';
import InnsynRouteConfig from './InnsynRoutes';
import ErrorPage from './support-pages/ErrorPage';
import LoadingPage from './support-pages/LoadingPage';

const InnsynDataFetcher = () => {
    const history = useHistory();
    const { setUserProperties } = useAmplitudeInstance();

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
                setUserProperties({
                    antallSaker: søknadApiResponse.length,
                });
                return <InnsynRouteConfig søknader={søknadApiResponse.sort(sortSoknad)} />;
            }}
        />
    );
};

export default InnsynDataFetcher;
