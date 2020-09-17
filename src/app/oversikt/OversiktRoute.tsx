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

const OversiktRoute: React.FC = (): JSX.Element => (
    <Fetcher<SøknadApiResponse>
        recipies={[søknadRecipe]}
        loading={() => <LoadingPage />}
        error={(e: Error) => (
            <HandleUnauthorized
                error={e}
                onWillRedirect={() => <LoadingPage />}
                handleError={(error) => {
                    console.error(error);
                    return (
                        <AlertStripe type="feil">
                            Vi opplever ustablitet med våre søknadstjenester. Vennligst prøv igjen senere.
                        </AlertStripe>
                    );
                }}
            />
        )}
        success={([søknadApiResponse]: [SøknadApiResponse]) => {
            const søknader = søknadApiResponse.sort((a, b) => {
                const dateA: Date = new Date(a.opprettet);
                const dateB: Date = new Date(b.opprettet);
                if (dateA < dateB) return 1;
                else return -1;
            });
            console.log(søknader);
            return (
                <Switch>
                    <Route exact={true} path={RouteConfig.ROOT} component={() => <OversiktView søknad={søknader} />} />
                    <Route
                        exact={true}
                        path={RouteConfig.DINE_PLEIEPENGER}
                        component={() => (
                            <PleiepengerView søknader={søknader.filter((søknad) => erPleiepenger(søknad))} />
                        )}
                    />
                    <Route
                        exact={true}
                        path={RouteConfig.DINE_OMSORGSPENGER}
                        component={() => (
                            <OmsorgspengerView søknader={søknader.filter((søknad) => erOmsorgspenger(søknad))} />
                        )}
                    />
                    <Route
                        path={'/innlogget'}
                        component={() => {
                            return <div>skal nå redirecte tilbake der bruker var.</div>;
                        }}
                    />
                </Switch>
            );
        }}
    />
);

export default OversiktRoute;
