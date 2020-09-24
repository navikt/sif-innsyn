import { History } from 'history';
import { RouteConfig } from '../config/routeConfig';

const REDIRECT_PARAM_NAME = 'redirect';

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

export const getRedirectParam = () => {
    return `${REDIRECT_PARAM_NAME}=${window.location.href}`;
};

export const getRedirectRouteFromUrl = (history: History): string | undefined => {
    const { search } = history.location;
    const splitStr = search.split(`?${REDIRECT_PARAM_NAME}=`);
    if (splitStr.length === 2) {
        const validRedirecRoute = getValidRedirectRoute(splitStr[1]);
        return validRedirecRoute || RouteConfig.OVERSIKT;
    }
    return undefined;
};
