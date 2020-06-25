import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum RouteConfig {
    ROOT = '/',
    BRUKER = '/bruker',
    KALKULATOR = '/kalkis',
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    FP = '/fp',
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
