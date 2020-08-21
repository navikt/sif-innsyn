import { History } from 'history';
import { getEnvironmentVariable } from './envUtils';

// const loginUrl = getEnvironmentVariable('LOGIN_URL');
const navNoUrl = 'https://www.nav.no/';

export const navigateToLoginPage = () => {
    window.location.href = getEnvironmentVariable('LOGIN_URL');
};

export const navigateTo = (route: string, history: History): void => history.push(route);
// export const navigateToLoginPage = (): void => window.location.assign(loginUrl);
export const navigateToNAVno = (): void => window.location.assign(navNoUrl);
