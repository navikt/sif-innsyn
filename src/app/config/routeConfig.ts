import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum RouteConfig {
    ROOT = '/',
    BRUKER = '/bruker',
    OVERSIKT = '/oversikt',
    DINE_PLEIEPENGER = '/dine-pleiepenger',
    DINE_OMSORGSPENGER = '/dine-omsorgspenger',
    KALKULATOR = '/kalkis',
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    FP = '/fp',
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
