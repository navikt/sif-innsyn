import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { RouteConfig } from '../config/routeConfig';
import { Søknad } from '../types/apiTypes/søknadTypes';
import { getRedirectRouteFromUrl } from '../utils/routeRedirectUtils';
import Oversikt from './din-oversikt-page/DinOversiktPage';
import PleiepengeroversiktPage from './pleiepenger/PleiepengeoversiktPage';
import PleiepengesakPage from './pleiepenger/PleiepengesakPage';
import UnknownRoutePage from './support-pages/UnknownRoutePage';

interface OwnProps {
    søknader: Søknad[];
}

type Props = OwnProps & RouteComponentProps;

const InnsynRoutes = ({ history, søknader }: Props) => {
    const redirectToRoute = getRedirectRouteFromUrl(history); // If redirect-parameter is set in url
    return (
        <Switch>
            {redirectToRoute && <Redirect to={redirectToRoute} />}
            <Route exact={true} path={RouteConfig.OVERSIKT} component={() => <Oversikt søknader={søknader} />} />
            <Route
                exact={true}
                path={`${RouteConfig.DINE_PLEIEPENGER}`}
                component={() => <PleiepengeroversiktPage søknader={søknader} />}
            />
            <Route
                exact={true}
                path={`${RouteConfig.DINE_PLEIEPENGER}/:id?`}
                component={({ match: { params } }: RouteComponentProps<{ id: string }>) => (
                    <PleiepengesakPage søknader={søknader} søknadId={params.id} />
                )}
            />
            <Route path={'*'} component={UnknownRoutePage} />
        </Switch>
    );
};

export default withRouter(InnsynRoutes);
