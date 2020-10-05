import { getEnvironmentVariable } from './utils/envUtils';

interface Lenker {
    sykdomIFamilien: string;
    saksbehandlingstid: string;
    ettersending: string;
    klageInfo: string;
    regelverkFolketrygden: string;
    dittNAV: string;
    saksoversikt: string;
}

const lenkerBokmål: Lenker = {
    saksbehandlingstid: getEnvironmentVariable('SAKBEHANDLINGSTID_INFO_URL'),
    sykdomIFamilien: getEnvironmentVariable('SYKDOM_I_FAMILIEN_INFO_URL'),
    ettersending: getEnvironmentVariable('ETTERSENDING_PLEIEPENGER_URL'),
    klageInfo: getEnvironmentVariable('KLAGE_INFO_URL'),
    regelverkFolketrygden: getEnvironmentVariable('REGELVERK_INFO_URL'),
    dittNAV: getEnvironmentVariable('DITT_NAV_URL'),
    saksoversikt: 'https://tjenester.nav.no/saksoversikt/',
};

const lenkerNynorsk: Partial<Lenker> = {};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...lenkerBokmål,
                ...lenkerNynorsk,
            };
        default:
            return lenkerBokmål;
    }
};

export default getLenker;
