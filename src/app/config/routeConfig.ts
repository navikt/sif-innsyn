import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum RouteConfig {
    ROOT = '/',
    INNLOGGET = '/innlogget',
    DINE_PLEIEPENGER = '/innlogget/dine-pleiepenger',
    DINE_OMSORGSPENGER = '/innlogget/dine-omsorgspenger',
    KALKULATOR = '/kalkulator',
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
