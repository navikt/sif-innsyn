import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '../../types/Locale';
import { MessageFileFormat } from '../../dev/intl/devIntlUtils';

const appBokmålstekster = require('../../i18n/nb.json');

export const appTekster: MessageFileFormat = {
    nb: { ...appBokmålstekster },
};

interface Props {
    locale: Locale;
    children: React.ReactNode;
    onError?: (err: any) => void;
}

const IntlProvider: React.FunctionComponent<Props> = ({ locale, children, onError }: Props) => {
    return (
        <Provider locale={locale} messages={appTekster.nb} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
