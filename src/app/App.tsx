import * as React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import OversiktRoute from './oversikt/OversiktRoute';
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
            <>{isFeatureEnabled(Feature.UTILGJENGELIG) ? <UnavailablePage /> : <OversiktRoute />}</>
        </ApplicationWrapper>
    );
};

const root = document.getElementById('app');
render(<App />, root);
