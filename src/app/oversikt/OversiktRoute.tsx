import * as React from 'react';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import Fetcher from '../functional/fetcher/Fetcher';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import OversiktView from './OversiktView';
import HandleUnauthorized from '../functional/HandleUnauthorized';
import { Route, Switch } from 'react-router-dom';
import { RouteConfig } from '../config/routeConfig';
import PleiepengerView from './pleiepenger/PleiepengerView';
import OmsorgspengerView from './omsorgspenger/OmsorgspengerView';
import { erOmsorgspenger, erPleiepenger } from '../utils/SøknadUtils';
import AlertStripe from 'nav-frontend-alertstriper';
import { sortSoknad } from '../utils/sortSoknader';

const OversiktRoute = () => (
    <Fetcher<SøknadApiResponse>
        recipies={[søknadRecipe]}
        loading={() => <LoadingPage />}
        error={(e: Error) => (
            <HandleUnauthorized
                error={e}
                onWillRedirect={() => <LoadingPage />}
                handleError={() => {
                    return (
                        <AlertStripe type="feil">
                            Vi opplever ustablitet med våre søknadstjenester. Vennligst prøv igjen senere.
                        </AlertStripe>
                    );
                }}
            />
        )}
        success={([søknadApiResponse]: [SøknadApiResponse]) => {
            const alleSøknader = søknadApiResponse.sort(sortSoknad);
            const pleiepengesoknader = alleSøknader.filter((søknad) => erPleiepenger(søknad));
            const omsorgspengesoknader = alleSøknader.filter((søknad) => erOmsorgspenger(søknad));
            return (
                <Switch>
                    <Route
                        exact={true}
                        path={RouteConfig.ROOT}
                        component={() => <OversiktView søknader={alleSøknader} />}
                    />
                    <Route
                        exact={true}
                        path={RouteConfig.DINE_PLEIEPENGER}
                        component={() => <PleiepengerView søknader={pleiepengesoknader} />}
                    />
                    <Route
                        exact={true}
                        path={RouteConfig.DINE_OMSORGSPENGER}
                        component={() => <OmsorgspengerView søknader={omsorgspengesoknader} />}
                    />
                    <Route
                        path={'/innlogget'}
                        component={() => {
                            // TODO - hva skjer her?
                            return <div>skal nå redirecte tilbake der bruker var.</div>;
                        }}
                    />
                </Switch>
            );
        }}
    />
);

export default OversiktRoute;
