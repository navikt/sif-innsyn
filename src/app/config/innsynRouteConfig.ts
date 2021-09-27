import { getEnvironmentVariable } from '../utils/envUtils';

export enum InnsynRouteConfig {
    OVERSIKT = '/',
    DINE_PLEIEPENGER = '/dine-pleiepenger/soknad',
    SØKNADER = `/dine-pleiepenger/soknader`,
    SØKNADER_SØKNAD = `/dine-pleiepenger/soknader/soknad`,
}

export const getRouteUrl = (route: InnsynRouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
