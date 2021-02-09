import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { InnsynRouteConfig } from '../config/innsynRouteConfig';
import { Søknad } from '../types/apiTypes/søknadTypes';
import { getRedirectRouteFromUrl } from '../utils/routeRedirectUtils';
import DinOversiktPage from './din-oversikt-page/DinOversiktPage';
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
            <Route
                exact={true}
                path={InnsynRouteConfig.OVERSIKT}
                component={() => <DinOversiktPage søknader={søknader} />}
            />
            <Route
                exact={true}
                path={`${InnsynRouteConfig.DINE_PLEIEPENGER}/:id?`}
                component={({ match: { params } }: RouteComponentProps<{ id: string }>) => (
                    <PleiepengesakPage søknader={søknader} søknadId={params.id} />
                )}
            />
            <Route path={'*'} component={UnknownRoutePage} />
        </Switch>
    );
};

export default withRouter(InnsynRoutes);
