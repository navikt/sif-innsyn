import * as React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';
import KalkulatorInput from 'omsorgspenger-kalkulator/lib/components/KalkulatorInput';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import { RouteConfig } from './config/routeConfig';
import InnloggetRoute from './oversikt/OversiktRoute';
import { Locale } from './types/Locale';
import { Feature, isFeatureEnabled } from './utils/featureToggleUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import './styles/app.less';

const localeFromSessionStorage = getLocaleFromSessionStorage();
moment.locale('nb');

const App: React.FunctionComponent = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    return (
        <ApplicationWrapper
            locale={locale}
            onChangeLocale={(activeLocale: Locale): void => {
                setLocaleInSessionStorage(activeLocale);
                setLocale(activeLocale);
            }}>
            <>
                {isFeatureEnabled(Feature.UTILGJENGELIG) ? (
                    <UnavailablePage />
                ) : (
                    <Switch>
                        <Route
                            path={RouteConfig.KALKULATOR}
                            exact={true}
                            component={() => {
                                return <KalkulatorInput />;
                            }}
                        />
                        <Route
                            path={RouteConfig.ROOT}
                            component={() => {
                                return <InnloggetRoute />;
                            }}
                        />
                        <Route
                            path={'/'}
                            component={() => {
                                return <div>Root path. ikke innlogget.</div>;
                            }}
                        />
                    </Switch>
                )}
            </>
        </ApplicationWrapper>
    );
};

const root = document.getElementById('app');
render(<App />, root);
