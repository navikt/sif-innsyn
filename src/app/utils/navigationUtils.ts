import { History } from 'history';
import { getEnvironmentVariable } from './envUtils';
import { getRedirectParam } from './routeRedirectUtils';

const navNoUrl = 'https://www.nav.no/';

export const navigateToLoginPage = (currentRoute?: string) => {
    const href = `${getEnvironmentVariable('LOGIN_URL')}?${getRedirectParam(currentRoute)}`;
    console.log(href);

    window.location.href = href;
};
export const navigateTo = (route: string, history: History): void => history.push(route);
export const navigateToNAVno = (): void => window.location.assign(navNoUrl);
