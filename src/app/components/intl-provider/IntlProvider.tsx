import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '../../types/Locale';

const appBokmålstekster = require('../../i18n/nb.json');

const bokmålstekster = {
    ...appBokmålstekster,
};

interface Props {
    locale: Locale;
    children: React.ReactNode;
    onError?: (err: any) => void;
}

const IntlProvider: React.FunctionComponent<Props> = ({ locale, children, onError }: Props) => {
    return (
        <Provider locale={locale} messages={bokmålstekster} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
