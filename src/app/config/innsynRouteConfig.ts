import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum InnsynRouteConfig {
    OVERSIKT = '/',
    DINE_PLEIEPENGER = '/dine-pleiepenger',
}

export const getRouteUrl = (route: InnsynRouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
