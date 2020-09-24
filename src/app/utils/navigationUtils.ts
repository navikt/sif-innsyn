import { History } from 'history';
import { getEnvironmentVariable } from './envUtils';
import { getRedirectParam } from './routeRedirectUtils';

const navNoUrl = 'https://www.nav.no/';

export const navigateToLoginPage = () => {
    window.location.href = `${getEnvironmentVariable('LOGIN_URL')}?${getRedirectParam()}`;
};
export const navigateTo = (route: string, history: History): void => history.push(route);
export const navigateToNAVno = (): void => window.location.assign(navNoUrl);
