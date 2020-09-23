import { getEnvironmentVariable } from './utils/envUtils';

interface Lenker {
    sykdomIFamilien: string;
    saksbehandlingstid: string;
    ettersending: string;
    klageInfo: string;
    regelverkFolketrygden: string;
    dittNAV: string;
}

const lenkerBokmål: Lenker = {
    saksbehandlingstid: getEnvironmentVariable('SAKBEHANDLINGSTID_INFO_URL'),
    sykdomIFamilien: getEnvironmentVariable('SYKDOM_I_FAMILIEN_INFO_URL'),
    ettersending: getEnvironmentVariable('ETTERSENDING_URL'),
    klageInfo: getEnvironmentVariable('KLAGE_INFO_URL'),
    regelverkFolketrygden: getEnvironmentVariable('REGELVERK_INFO_URL'),
    dittNAV: getEnvironmentVariable('DITT_NAV_URL'),
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
