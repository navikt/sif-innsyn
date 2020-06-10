import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { allCommonMessages } from '@navikt/sif-common-core/lib/i18n/allCommonMessages';
import '@formatjs/intl-pluralrules/dist/locale-data/nb';
import '@formatjs/intl-pluralrules/dist/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';

const appBokmålstekster = require('../../i18n/nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...appBokmålstekster,
};

export interface IntlProviderProps {
    locale: Locale;
}

export interface IntlProviderProps {
    locale: Locale;
    onError?: (err: any) => void;
}

const IntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, children, onError }) => {
    return (
        <Provider locale={locale} messages={bokmålstekster} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
