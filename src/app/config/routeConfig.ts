import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum RouteConfig {
    OVERSIKT = '/',
    DINE_PLEIEPENGER = '/dine-pleiepenger',
    DINE_OMSORGSPENGER = '/dine-omsorgspenger',
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
