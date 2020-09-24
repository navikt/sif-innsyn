import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import AlertStripe from 'nav-frontend-alertstriper';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { RouteConfig } from '../config/routeConfig';
import Fetcher from '../functional/fetcher/Fetcher';
import HandleUnauthorized from '../functional/HandleUnauthorized';
import { SøknadApiResponse, søknadRecipe } from '../types/apiTypes/søknadTypes';
import { sortSoknad } from '../utils/sortSoknader';
import { erPleiepenger } from '../utils/soknadUtils';
import Oversikt from './Oversikt';
import Pleiepenger from './pleiepenger/Pleiepenger';
import { getRedirectRouteFromUrl } from '../utils/routeRedirectUtils';

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

                const redirectToRoute = getRedirectRouteFromUrl(history); // If redirect parameter is set in url

                return (
                    <Switch>
                        {redirectToRoute && <Redirect to={redirectToRoute} />}
                        <Route
                            exact={true}
                            path={RouteConfig.OVERSIKT}
                            component={() => <Oversikt søknader={alleSøknader} />}
                        />
                        <Route
                            exact={false}
                            path={`${RouteConfig.DINE_PLEIEPENGER}/:id?`}
                            component={(routeProps: RouteComponentProps) => (
                                <Pleiepenger søknader={pleiepengesoknader} {...routeProps} />
                            )}
                        />
                    </Switch>
                );
            }}
        />
    );
};

export default withRouter(OversiktRoute);
