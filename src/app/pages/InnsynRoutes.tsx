import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { InnsynRouteConfig } from '../config/innsynRouteConfig';
import { Søknad } from '../types/apiTypes/søknadTypes';
import { getRedirectRouteFromUrl } from '../utils/routeRedirectUtils';
import DinOversiktPage from './din-oversikt-page/DinOversiktPage';
import PleiepengerEndring from './pleiepenger/pleiepenger-endring/PleiepengerEndring';
import UnknownRoutePage from './support-pages/UnknownRoutePage';
import Søknader from './søknader/Søknader';

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

            <Route exact={true} path={InnsynRouteConfig.SØKNADER} component={() => <Søknader søknader={søknader} />} />

            <Route exact={true} path={InnsynRouteConfig.PLEIEPENGER_ENDRING} component={() => <PleiepengerEndring />} />

            <Route
                exact={false}
                path={`${InnsynRouteConfig.SOKNAD_FRA_LENKE}`}
                component={() => <DinOversiktPage søknader={søknader} />}
            />

            <Route path={'*'} component={UnknownRoutePage} />
        </Switch>
    );
};

export default withRouter(InnsynRoutes);
