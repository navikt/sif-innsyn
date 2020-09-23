import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import AlertStripe from 'nav-frontend-alertstriper';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { RouteConfig } from '../config/routeConfig';
import Fetcher from '../functional/fetcher/Fetcher';
import HandleUnauthorized from '../functional/HandleUnauthorized';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import { sortSoknad } from '../utils/sortSoknader';
import { erOmsorgspenger, erPleiepenger } from '../utils/SøknadUtils';
import OmsorgspengerPage from './omsorgspenger-page/OmsorgspengerPage';
import OversiktView from './OversiktView';
import Pleiepenger from './pleiepenger-page/Pleiepenger';
import { getRouteFromRedirectParam } from '../utils/navigationUtils';

const OversiktRoute = ({ history }: RouteComponentProps) => {
    return (
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

                // If redirect parameter is set in url
                const redirectToRoute = getRouteFromRedirectParam(history);

                return (
                    <Switch>
                        {redirectToRoute && <Redirect to={redirectToRoute} />}
                        <Route
                            exact={true}
                            path={RouteConfig.OVERSIKT}
                            component={() => <OversiktView søknader={alleSøknader} />}
                        />
                        <Route
                            exact={false}
                            path={`${RouteConfig.DINE_PLEIEPENGER}/:id?`}
                            component={(routeProps: RouteComponentProps) => (
                                <Pleiepenger søknader={pleiepengesoknader} {...routeProps} />
                            )}
                        />
                        <Route
                            path={RouteConfig.DINE_OMSORGSPENGER}
                            component={() => <OmsorgspengerPage søknader={omsorgspengesoknader} />}
                        />
                    </Switch>
                );
            }}
        />
    );
};

export default withRouter(OversiktRoute);
