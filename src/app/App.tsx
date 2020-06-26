import * as React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import RootPageRoute from './components/pages/root-page/RootPage';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import { Feature, isFeatureEnabled } from './utils/featureToggleUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { RouteConfig } from './config/routeConfig';
import InnsynRoute from './innsyn/InnsynRoute';
import KalkulatorRoute from './kalkulator/KalkulatorRoute';
import NotFoundRoute from './components/pages/not-found-route/NotFoundRoute';
import '@navikt/sif-common-core/lib/styles/globalStyles.less';
import './app.less';

const localeFromSessionStorage = getLocaleFromSessionStorage();
moment.locale(localeFromSessionStorage);

const App: React.FunctionComponent = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    return (
        <ApplicationWrapper
            locale={locale}
            onChangeLocale={(activeLocale: Locale): void => {
                setLocaleInSessionStorage(activeLocale);
                setLocale(activeLocale);
            }}>
            <div id={'app-content-wrapper'}>
                {isFeatureEnabled(Feature.UTILGJENGELIG) ? (
                    <UnavailablePage />
                ) : (
                    <Switch>
                        <Route exact={true} path={RouteConfig.ROOT} component={RootPageRoute} />
                        <Route exact={true} path={RouteConfig.BRUKER} component={InnsynRoute} />
                        <Route exact={true} path={RouteConfig.KALKULATOR} component={KalkulatorRoute} />
                        <Route exact={false} path={RouteConfig.ROOT} component={NotFoundRoute} />
                    </Switch>
                )}
            </div>
        </ApplicationWrapper>
    );
};

const root = document.getElementById('app');
Modal.setAppElement('#app');
render(<App />, root);
