import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/dist/locale-data/nb';
import '@formatjs/intl-pluralrules/dist/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '../../types/Locale';

const appBokmålstekster = require('../../i18n/nb.json');

const bokmålstekster = {
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
