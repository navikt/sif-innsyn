import { getEnvironmentVariable } from '../utils/envUtils';

export enum InnsynRouteConfig {
    OVERSIKT = '/',
    IKKE_TILGANG = '/ikke-tilgang', // Bruker har ikke tilgang til tjenesten
    SOKNAD_FRA_LENKE = '/dine-pleiepenger', // Til å støtte gamle lenker på dittNAV(Min side).
    DINE_PLEIEPENGER = '/dine-pleiepenger/soknad',
    PLEIEPENGER_ENDRING = '/dine-pleiepenger/endring',
    SØKNADER = `/dine-pleiepenger/soknader`,
    SØKNADER_SØKNAD = `/dine-pleiepenger/soknader/soknad`,
}

export const getRouteUrl = (route: InnsynRouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
