import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum RouteConfig {
    ROOT = '/',
    BRUKER = '/bruker',
    OVERSIKT = '/innlogget/oversikt',
    DINE_PLEIEPENGER = '/innlogget/dine-pleiepenger',
    DINE_OMSORGSPENGER = '/innlogget/dine-omsorgspenger',
    KALKULATOR = '/kalkis',
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    FP = '/fp',
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
