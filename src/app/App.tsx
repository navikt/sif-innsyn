import * as React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import AppStatusWrapper from './components/app-status-wrapper/AppStatusWrapper';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import InnsynFetcher from './pages/InnsynFetcher';
import UnavailablePage from './pages/support-pages/UnavailablePage';
import { Locale } from './types/Locale';
import { getEnvironmentVariable } from './utils/envUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import './styles/app.less';

const localeFromSessionStorage = getLocaleFromSessionStorage();
moment.locale('nb');

const APPLICATION_KEY = 'sif-innsyn';

const getAppStatusSanityConfig = () => {
    const projectId = getEnvironmentVariable('APPSTATUS_PROJECT_ID');
    const dataset = getEnvironmentVariable('APPSTATUS_DATASET');
    return !projectId || !dataset ? undefined : { projectId, dataset };
};

const App: React.FunctionComponent = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);

    const appStatusSanityConfig = getAppStatusSanityConfig();

    return (
        <ApplicationWrapper
            locale={locale}
            onChangeLocale={(activeLocale: Locale): void => {
                setLocaleInSessionStorage(activeLocale);
                setLocale(activeLocale);
            }}>
            {appStatusSanityConfig ? (
                <AppStatusWrapper
                    applicationKey={APPLICATION_KEY}
                    unavailableContentRenderer={() => <UnavailablePage />}
                    sanityConfig={appStatusSanityConfig}
                    contentRenderer={() => <InnsynFetcher />}
                />
            ) : (
                <InnsynFetcher />
            )}
        </ApplicationWrapper>
    );
};

const root = document.getElementById('app');
render(<App />, root);
