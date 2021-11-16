import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { InnsynRouteConfig } from '../config/innsynRouteConfig';
import { Søknad } from '../types/apiTypes/søknadTypes';
import { getRedirectRouteFromUrl } from '../utils/routeRedirectUtils';
import DinOversiktPage from './din-oversikt-page/DinOversiktPage';
import IkkeTilgangPage from './ikke-tilgang-page/IkkeTilgangPage';
import PleiepengesakPage from './pleiepenger/PleiepengesakPage';
import UnknownRoutePage from './support-pages/UnknownRoutePage';
import Søknader from './søknader/Søknader';

interface OwnProps {
    søknader: Søknad[];
}

type Props = OwnProps & RouteComponentProps;

const getRoute = (søknadId: string, søknader: Søknad[]) =>
    søknadId === 'soknader' ? (
        <Søknader søknader={søknader} />
    ) : (
        <PleiepengesakPage søknader={søknader} søknadId={søknadId} backRoute={InnsynRouteConfig.OVERSIKT} />
    ); // Til å støtte gamle lenker på dittNAV.

const InnsynRoutes = ({ history, søknader }: Props) => {
    const redirectToRoute = getRedirectRouteFromUrl(history); // If redirect-parameter is set in url
    return (
        <Switch>
            {redirectToRoute && <Redirect to={redirectToRoute} />}
            <Route
                exact={true}
                path={InnsynRouteConfig.OVERSIKT}
                component={() => <DinOversiktPage søknader={søknader} />}
            />
            <Route
                exact={true}
                path={`${InnsynRouteConfig.DINE_PLEIEPENGER}/:id?`}
                component={({ match: { params } }: RouteComponentProps<{ id: string }>) => (
                    <PleiepengesakPage
                        søknader={søknader}
                        søknadId={params.id}
                        backRoute={InnsynRouteConfig.OVERSIKT}
                    />
                )}
            />
            <Route
                exact={true}
                path={`${InnsynRouteConfig.SOKNAD_FRA_LENKE}/:id?`}
                component={
                    ({ match: { params } }: RouteComponentProps<{ id: string }>) => getRoute(params.id, søknader) // Til å støtte gamle lenker på dittNAV vers.
                }
            />
            <Route
                exact={true}
                path={`${InnsynRouteConfig.SØKNADER_SØKNAD}/:id?`}
                component={({ match: { params } }: RouteComponentProps<{ id: string }>) => (
                    <PleiepengesakPage
                        søknader={søknader}
                        søknadId={params.id}
                        backRoute={InnsynRouteConfig.SØKNADER}
                    />
                )}
            />

            <Route exact={true} path={`${InnsynRouteConfig.IKKE_TILGANG}`} component={IkkeTilgangPage} />
            <Route path={'*'} component={UnknownRoutePage} />
        </Switch>
    );
};

export default withRouter(InnsynRoutes);
