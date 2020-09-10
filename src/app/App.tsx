import * as React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import { Feature, isFeatureEnabled } from './utils/featureToggleUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import { Route, Switch } from 'react-router-dom';

import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import '@navikt/sif-common-core/lib/styles/globalStyles.less';
import './app.less';
import InnloggetRoute from './oversikt/OversiktRoute';
import InnsynPage from './components/innsyn-page/InnsynPage';
import KalkulatorInput from 'omsorgspenger-kalkulator/lib/components/KalkulatorInput';
import { RouteConfig } from './config/routeConfig';

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
                    <InnsynPage>
                        <Switch>
                            <Route
                                path={'/kalkulator'}
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
                    </InnsynPage>
                )}
            </div>
        </ApplicationWrapper>
    );
};

const root = document.getElementById('app');
Modal.setAppElement('#app');
render(<App />, root);
