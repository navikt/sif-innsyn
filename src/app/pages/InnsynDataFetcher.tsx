import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import Fetcher from '../functional/fetcher/Fetcher';
import HandleUnauthorized, { hasResponseStatus } from '../functional/HandleUnauthorized';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import InnsynRouteConfig from './InnsynRoutes';
import ErrorPage from './support-pages/ErrorPage';
import LoadingPage from './support-pages/LoadingPage';
import { sortSoknad } from '../utils/soknadUtils';
import { isForbidden } from '../utils/apiUtils';
import IkkeTilgangPage from './ikke-tilgang-page/IkkeTilgangPage';

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
                        if (hasResponseStatus(e) && isForbidden(e)) {
                            return <IkkeTilgangPage />;
                        }
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
