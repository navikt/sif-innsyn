import { History } from 'history';
import { RouteConfig } from '../config/routeConfig';
import { getEnvironmentVariable } from './envUtils';

const navNoUrl = 'https://www.nav.no/';
const RedirectRouteParamName = 'redirect';

const getRedirectRoute = (route: string, søknadsId?: string): string => {
    return `${route}${søknadsId ? `/${søknadsId}` : ''}`;
};

const trimRouteForLeadingChar = (route: string) => {
    if (route[0] === '/') {
        return route.substr(1);
    }
    return route;
};

const getValidRedirectRoute = (route: string): string | undefined => {
    const splits = trimRouteForLeadingChar(route).split('/');
    const søknadstypeRoute = splits[0];
    const søknadsId = splits.length === 2 ? splits[1] : undefined;
    switch (`/${søknadstypeRoute}`) {
        case RouteConfig.DINE_PLEIEPENGER:
            return getRedirectRoute(RouteConfig.DINE_PLEIEPENGER, søknadsId);
        default:
            return undefined;
    }
};

export const getRouteFromRedirectParam = (history: History): string | undefined => {
    const { search } = history.location;
    const splitStr = search.split(`?${RedirectRouteParamName}=`);
    if (splitStr.length === 2) {
        return getValidRedirectRoute(splitStr[1]);
    }
    return undefined;
};

export const navigateToLoginPage = () => {
    window.location.href = `${getEnvironmentVariable('LOGIN_URL')}?${RedirectRouteParamName}=${window.location.href}`;
};
export const navigateTo = (route: string, history: History): void => history.push(route);
export const navigateToNAVno = (): void => window.location.assign(navNoUrl);
