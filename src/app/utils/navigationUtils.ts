import { History } from 'history';
import { RouteConfig } from '../config/routeConfig';
import { getEnvironmentVariable } from './envUtils';

const navNoUrl = 'https://www.nav.no/';
const RedirectRouteParamName = 'redirect';

const getValidRedirectRoute = (route: string): string | undefined => {
    switch (`/${route}`) {
        case RouteConfig.DINE_PLEIEPENGER:
            return RouteConfig.DINE_PLEIEPENGER;
        case RouteConfig.DINE_OMSORGSPENGER:
            return RouteConfig.DINE_OMSORGSPENGER;
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
