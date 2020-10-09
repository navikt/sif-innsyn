import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { getEnvironmentVariable } from '../../utils/envUtils';
import IntlProvider, { appTekster } from '../intl-provider/IntlProvider';
import { Locale } from '../../types/Locale';
import ApplicationMessages from '../../dev/intl/application-messages/ApplicationMessages';

interface ApplicationWrapperProps {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
    children: React.ReactNode;
}

const ApplicationWrapper: React.FunctionComponent<ApplicationWrapperProps> = ({
    locale,
    children,
}: ApplicationWrapperProps) => {
    return (
        <IntlProvider locale={locale}>
            <Normaltekst tag="div">
                <Router basename={getEnvironmentVariable('PUBLIC_PATH')}>
                    {children}
                    <ApplicationMessages messages={appTekster} title={'Sykdom i familien - innsyn'} />
                </Router>
            </Normaltekst>
        </IntlProvider>
    );
};

export default ApplicationWrapper;
