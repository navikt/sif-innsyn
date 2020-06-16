import { getEnvironmentVariable } from 'app/utils/envUtils';

export enum RouteConfig {
    ROOT = '/',
    LOGGED_IN = '/logged-in',
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    KALKULATOR = '/kalkulator',
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
